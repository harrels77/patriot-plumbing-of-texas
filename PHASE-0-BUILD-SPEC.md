# PHASE 0 — Visual Triage Assistant (Patriot Plumbing) — v2

**But :** un assistant de chat *sur le site Patriot* qui qualifie le lead, reconnaît un client connu, prend des photos, fait un pré-diagnostic IA (pièces à vérifier pour le tech), book dans Google Calendar et alerte le plombier sur Telegram. Bilingue EN/ES. **Zéro coût de téléphonie.**

> v2 : intègre les concepts de workflow (dédup par clé unique, routage nouveau/connu, règles conditionnelles, normalisation) — **en code, pas via Make.com/n8n.** L'app est déjà en code et c'est ton portfolio DevOps : l'orchestrateur, c'est ton code.

---

## 1. Architecture

```
Navigateur (widget chat sur le site)
        │  texte + photos
        ▼
Next.js API route  (server-side — la clé API ne sort JAMAIS du serveur)
        │
        ├─► Supabase (table `leads`)  → mémoire : dédup, nouveau vs connu     (free)
        ├─► Anthropic API
        │     • conversation  → claude-haiku-4-5-20251001                     (bon marché)
        │     • analyse photo → claude-sonnet-4-6                             (plus précis)
        ├─► Google Calendar API   → créneaux libres + écriture du RDV          (gratuit)
        └─► Telegram Bot API      → rapport au plombier                        (gratuit)
```

Tout en free tier. Seul coût réel = tokens Anthropic.

---

## 2. Le modèle de données — *ton idée « Search Rows + Router add/update », en code*

Table Supabase `leads`. **Clé unique = téléphone normalisé** (plus fiable que l'email pour un client de plombier).

À chaque conversation, le flux est : normaliser → chercher → brancher.

```ts
// lib/leads.ts
export const normPhone = (s: string) => s.replace(/\D/g, "").slice(-10); // 10 chiffres
export const normCity  = (s: string) => s.trim().toLowerCase();

const { data: existing } = await supabase
  .from("leads").select("*").eq("phone", normPhone(phone)).maybeSingle();

if (existing) {
  // CLIENT CONNU → on le salue par son nom, on met à jour la ligne
  await supabase.from("leads")
    .update({ last_contact: new Date().toISOString(), ...patch })
    .eq("id", existing.id);
} else {
  // NOUVEAU → qualification complète, on insère
  await supabase.from("leads")
    .insert({ phone: normPhone(phone), name, city: normCity(city), /* ... */ });
}
```

C'est exactement ton « éviter les doublons » de Make.com — sans Make.com.

---

## 3. La couche règles déterministes — *ton idée « if budget<1000 → reject »*

Avant tout booking, **en code** (jamais le modèle seul). Le modèle propose, le code tranche.

```ts
const SERVED = ["stockdale","sutherland springs","la vernia","floresville","seguin","geronimo","mcqueeney"];

function canBook(city: string, slot: Date) {
  if (!SERVED.includes(normCity(city)))            return { ok: false, reason: "out_of_area" };
  const day = slot.getDay(), hr = slot.getHours();
  if (day === 0 || day === 6 || hr < 8 || hr >= 17) return { ok: false, reason: "out_of_hours" };
  return { ok: true };
}
```

C'est ça qui empêche un client malin de te faire booker un dimanche à San Antonio.

---

## 4. Ordre de construction (jalons — chacun testable seul)

**J0 — Les évals (AVANT le code).** 12–15 conversations de test EN *et* ES, incluant les pièges : hors zone (San Antonio/Austin), demande de prix, « ouvert dimanche/24h ? », client connu qui revient, flux normal complet. **C'est la définition de “ça marche”.**

**J1 — Squelette de chat.** UI + API route + *prompt conversation* (§6) sur Haiku. Qualifie (nom, téléphone, ville, problème, urgence) et ne casse jamais les règles « Never ». Fais passer les évals ici avant d'avancer.

**J2 — Mémoire & dédup.** Table `leads` + `normPhone/normCity` + recherche → branche nouveau/connu (§2). Un client qui revient est reconnu et salué par son nom.

**J3 — Photo + vision.** Upload d'image → Sonnet 4.6 avec le *prompt diagnostic* (§6) → JSON structuré. ⚠️ Rapport **pour le plombier seulement**, jamais montré au client comme un diagnostic. Au client : « Merci, ça aide notre technicien à préparer le matériel. »

**J4 — Booking.** `canBook()` (§3) → créneaux libres Lun–Ven 8h–17h via Google Calendar → propose 2 → `events.insert` avec le diagnostic dans la description.

**J5 — Alerte Telegram + garde-fou budget.** Rapport structuré au plombier sur Telegram. Réutilise ton pattern de budget-guard de HookViral (cache-first, cap, flag de désactivation) pour qu'un spam de photos ne crame pas tes 20 $.

---

## 5. Les morceaux techniques qui piègent

### a) Appel vision (fetch direct, pas de SDK — conforme à ton CLAUDE.md)

```ts
const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": process.env.ANTHROPIC_API_KEY!,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-6",
    max_tokens: 600,
    system: DIAGNOSIS_PROMPT,
    messages: [{
      role: "user",
      content: [
        { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64Image } },
        { type: "text", text: "Analyze this photo. Return ONLY the JSON object." },
      ],
    }],
  }),
});
const data = await res.json();
let report;
try { report = JSON.parse(data.content[0].text); } catch { report = null; } // book quand même si null
```

JSON attendu (le `confidence` est un **mot**, jamais un faux %) :
```json
{ "appliance": "electric water heater", "brand_or_model": "Rheem ~40gal (likely)",
  "likely_issue": "leak at the T&P / safety group", "confidence": "probable",
  "parts_to_check": ["3/4\" T&P valve", "dielectric unions", "thread sealant"],
  "notes_for_tech": "confirm tank vs fitting on site", "image_quality_ok": true }
```

### b) Telegram (alerte plombier)
```ts
await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ chat_id: process.env.PLUMBER_CHAT_ID, text: reportText, parse_mode: "Markdown" }),
});
```
Setup : `@BotFather` → token. Le plombier écrit une fois au bot pour récupérer son `chat_id`.

### c) Google Calendar
Compte de service Google → partage le calendrier du plombier avec son email `...@...iam.gserviceaccount.com`. Lecture des dispos : `freebusy.query`. Écriture : `events.insert`.

---

## 6. Prompts de départ

**Conversation (Haiku) :**
```
You are the bilingual (English/Spanish) intake assistant for Patriot Plumbing of
Texas, a family-run plumbing business. Reply in the language the customer writes in.
If the customer is a returning one (you will be told their name), greet them by name.

Your job: greet, confirm the job is in our service area, understand the problem,
gauge urgency, ask for a photo, and book a visit.

Hard rules — never break:
- Service area is ONLY: Stockdale, Sutherland Springs, La Vernia, Floresville,
  Seguin, Geronimo, McQueeney. If outside, politely say so and do not book.
- Hours are Monday–Friday 8am–5pm. Closed weekends. NEVER claim 24/7.
- NEVER quote a price. If asked, say the technician reviews that on the visit and
  the team can discuss it by phone.
- Warm, plain-spoken, respectful. No religious or political talk. Never say "cheap".

When you have name + phone + in-area address + problem + a photo, propose two
available slots and confirm the booking.
```

**Diagnostic photo (Sonnet 4.6) :**
```
You are an apprentice plumbing technician helping a master plumber prep before a job.
From the customer's photo, identify the appliance, brand/model if visible, the most
likely issue, and 3–5 parts/tools to put on the truck to fix it in one visit. You
often work from imperfect photos — never overstate certainty. Use the plumber's trade
vocabulary. If the image is too unclear, say so and request a better photo.

Return ONLY: {appliance, brand_or_model, likely_issue,
confidence (uncertain|probable|likely), parts_to_check[], notes_for_tech, image_quality_ok}

This report is for the technician only and is never shown to the customer.
```

---

## 7. QUI FAIT QUOI

| Domaine | **Toi (Simon)** | **Claude Code** |
|---|---|---|
| Comptes & clés | Crée : clé Anthropic + **cap 20 $**, compte de service Google + partage calendrier, bot Telegram + `chat_id`, projet Supabase, déploiement Vercel. Mets les valeurs dans `.env.local`. | Écrit le code qui lit `.env`. Ne touche jamais aux secrets. |
| Évals (J0) | **Tu les possèdes** — c'est ton jugement de « correct ». | Peut rédiger un premier jet que tu corriges. |
| Code (J1–J5) | Lis les diffs, comprends la structure, ne dis pas juste « ok ». | Scaffold routes, UI (selon tes design tokens), intégrations, fonctions dédup/normalize, garde-fous. |
| Tests | Lance l'app, fais passer les évals, donne des bugs **concrets**. | Écrit les tests unitaires, fait tourner le harness, corrige ce que tu remontes. |
| Photos de test | Fournis 5–10 **vraies** photos de problèmes connus. | Câble l'analyse, mais ne peut pas juger si le diagnostic est juste. |
| Espagnol | Fais **relire les évals ES par un hispanophone** — ni toi ni moi ne devrions supposer que le ton est bon. | Génère EN/ES, sans garantie sur la justesse culturelle de l'ES. |
| Commits / push | **Approuves** (ton CLAUDE.md l'exige). | Propose, n'exécute jamais sans ton OK. |
| Décisions produit | « Le diagnostic est-il assez bon ? Le booking est-il fluide ? » → c'est toi. | Implémente tes décisions. |

---

## 8. Coût réel

| Élément | Coût |
|---|---|
| Conversation Haiku (par lead) | fraction de centime |
| 1 appel vision Sonnet (par photo) | ~1–2 ¢ |
| Calendar / Telegram / Supabase / Vercel | gratuit |

Cap 20 $ sur la console Anthropic = des **centaines** de leads. Mets-le **avant** d'écrire une ligne.

---

## 9. Hors-scope Phase 0 (= Phase 1, plus tard)

SMS/MMS, missed-call-text-back, numéro Twilio, relance sortante, email — tout ça dépend de Twilio + A2P 10DLC (~20 $ one-time + ~5 $/mois). À ajouter quand le business le justifie.

---

## 10. Première action, maintenant

1. Mets le cap 20 $/mois sur la console Anthropic.
2. Écris le J0 (évals EN/ES).
3. Attaque le J1 (squelette + prompt), fais-le passer les évals.

Le widget devra respecter tes tokens verrouillés (Fraunces / Inter / IBM Plex Mono, palette Warm Heritage) — on le câble au J1.
