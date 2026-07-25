# CLAUDE.md — Patriot Plumbing of Texas

## Directive

This file is the single source of truth for the Patriot Plumbing of Texas project. When any instruction in chat conflicts with what is written here, this file wins. Follow the Always and Never rules below without exception.

## Project Identity

**Title**: Patriot Plumbing of Texas — local plumbing services website.

**Purpose**: A production-quality showcase website for a family-owned plumbing business based in Stockdale, Texas. It also serves as a DevOps portfolio project for the developer.

**Primary CTA**: drive visitors to call the business. Booking and contact form are secondary paths.

## Always / Never Rules

**Always:**
- Use color tokens from the Tailwind config (`bg-cream`, `text-navy`, `bg-rust`, `text-charcoal`, `border-tan`). Never use raw hex values inline.
- Use Fraunces for display headings, Inter for body text, IBM Plex Mono for section numbers and small labels.
- Write English content first, then provide Spanish translations on the chatbot and key user-facing strings.
- Ask for explicit approval before running `git commit` or `git push`.
- Write commit messages using Conventional Commits format: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`.
- Use documentary-style photography (real Patriot Plumbing technicians, real Texas environments, golden-hour lighting). When real photos are not yet available, use charcoal rectangle placeholders (bg-charcoal) — documented in KNOWN-LIMITATIONS.md.
- Reference the real business hours (Mon–Fri 8AM–5PM, closed weekends) everywhere availability is mentioned.
- Use next/link for internal navigation. Raw `<a>` is only for `tel:` and external URLs.
- Keep every page reachable from the nav and/or footer, and listed in `src/app/sitemap.ts`. (Both /book and /contact shipped as orphan pages once — never again.)

**Never:**
- Use any color outside the Warm Heritage palette (Cream, Navy, Rust Red, Charcoal, Tan).
- Claim 24/7 availability anywhere on the site. The business is closed on weekends.
- Use stock plumber photos, smiling-plumber-thumbs-up stock imagery, or AI-generated photography on the website.
- Push code to the remote repository without explicit user approval.
- Include explicit religious references (God, prayer, faith, Bible verses) or political content on the site. The family's values are expressed through behavior and tone, not statements.
- Use the word "cheap" or pricing-based selling. Emphasize honest work and quality instead.
- Add features, libraries, or integrations not listed in the Tech Stack section without prior discussion.
- Implement Resend or any email-sending integration in the MVP. The contact form sends NO email: it POSTs to `/api/contact`, which saves the lead to Supabase (deduped by phone — the same `leads` table Alan uses) and alerts the plumber on Telegram. Only name and phone are required (email is optional). The phone number remains the primary contact path until the email backend is unblocked.

## Tech Stack

- **Frontend + Backend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- **Database**: Supabase (Postgres) — free tier
- **AI / Chatbot**: Anthropic API, model Claude Haiku 4.5 — called directly, no SDK abstraction layer
- **Booking calendar**: Google Calendar API via a service account (free/busy lookup + event creation), used by the /book assistant
- **Plumber notifications**: Telegram Bot API — booking alerts, customer photos, and the database-failure lead fallback
- **Maps**: Mapbox GL JS with custom brand-matched style (planned — not yet integrated)
- **Transactional Email**: NONE for MVP. see chat for context
  See KNOWN-LIMITATIONS.md for the why and the unblock plan.
- **Hosting + CI/CD + CDN + SSL**: Vercel (Hobby tier)
- **Domain registrar**: Cloudflare
- **Code repository**: GitHub
- **CI extras**: GitHub Actions for lint / type-check / build verification

Budget cap: ~$15–18 total (domain + Anthropic API headroom). Hard spending cap of $20/month must be set on the Anthropic console.

## Direction of Project

The brand voice is humble, hardworking, and rooted in community. The business is a family operation with over 40 years of plumbing experience in Wilson County. The site should feel like a quiet, confident artisan brand — not a corporate plumbing chain, not an edgy outlaw aesthetic. Visitors should leave thinking "these people respect their craft and I can trust them with my home."

## Brand Positioning — The 40-Year Story

The business is a **family-owned, family-run plumbing operation** with forty years of work serving Wilson County. This is the heart of the brand and must be reflected everywhere — especially on the About page, which is structured as an editorial profile rather than a corporate "team" page. The About page mission is centered on the family's own words about building something lasting. The brand claim — always stated in terms of "forty years" and "family-owned," never as a generational claim — should appear at key conversion moments (Home hero, About, Footer). The Home hero claim is "Honest plumbing. Forty years."

## Theme & Visual Identity

**Aesthetic direction**: Heritage Western × Editorial Modern.

- **Heritage Western**: warm, artisan, family-owned, rooted. Reference brands: Tecovas, Filson, Yeti.
- **Editorial Modern**: magazine-style layouts, generous whitespace, large serif display typography. Reference: Texas Monthly, contemporary editorial design.

**Warm Heritage Palette** (locked):

| Role | Name | Hex |
|---|---|---|
| Background primary | Cream | `#F5F1E8` |
| Dominant text & structure | Navy | `#1B2A3C` |
| CTAs & accents | Rust Red | `#A8323A` |
| Max-contrast text | Charcoal | `#1A1614` |
| Subtle accents & dividers | Tan / Leather | `#8B6F47` |

**Guiding principle for the palette**: nothing is pure. No pure white background, no pure black text, no bright saturated red. Everything is slightly warmed to feel artisan rather than corporate.

**Typography**:
- **Fraunces** — display serif, used for headlines and pull quotes
- **Inter** — sans-serif, used for body text and UI
- **IBM Plex Mono** — used for section numbers ("01.", "02.") and small labels

**Photography direction**:
- Documentary, not posed
- Golden hour lighting, warm tones, subtle filmic grain
- Real people working, real Texan environments
- Close-ups on craftsmanship (hands soldering copper, tools on workbenches)
- Wide environmental shots (pickup trucks, ranch homes, Wilson County landscapes)
- Never generic plumber stock photos

**UI/UX principles**:
- Generous whitespace; when in doubt, more air
- Asymmetric grids over centered layouts
- Section numbering as a recurring visual motif ("01. What we do / 02. Why families choose us")
- Pull quotes in large Fraunces italic, occasionally in Rust Red
- Full-bleed photographs for cinematic moments
- Long-form storytelling on About and individual service pages — not bullet-point brochures

**Animation principles**:
- Subtle, slow, weighted — nothing bouncy
- Fade-in on scroll for text and images
- Light parallax on large photos
- Discrete hover states (thin underline or color shift), never aggressive scaling
- If an animation does not add meaning, remove it

## Business Facts

- **Business name**: Patriot Plumbing of Texas
- **Headquarters**: 202 Cannon Lane, Stockdale, TX 78160
- **Phone**: (210) 857-1727
- **Hours**: Monday–Friday, 8:00 AM – 5:00 PM. Closed weekends.
- **Experience**: 40+ years, family-owned and family-run business
- **Languages**: English and Spanish

## Geographic Scope

The business operates across **four counties** in South-Central Texas: Wilson, Guadalupe, Hays, and Comal.

**Cities served (9 total)**, in geographic order from the Stockdale HQ:
- **Wilson County**: Stockdale (HQ), Sutherland Springs, Floresville, La Vernia
- **Guadalupe County**: Geronimo, McQueeney, Seguin
- **Hays County**: San Marcos
- **Comal County**: New Braunfels

The region is described as "South-Central Texas" in the copyright and other broad references. New Braunfels (San Antonio metro) and San Marcos (Austin orbit) are intentionally inside the service area.

**Source of truth**: `src/data/service-areas.ts`. Import the city/county list from there — never hardcode service areas in components or pages.

## Pages on the Website

Pages currently live:
- Home
- Services Overview (`/services`) — array-driven grid of all nine services
- Nine individual service pages: Emergency Plumbing (reframed for business-hours response), Water Heaters, Drain Cleaning, Repiping, Sewer Repair, Commercial Plumbing, Slab Leak, Water Softener, Gas Line Repair
- About (editorial 40-year family story)
- Work — public record of jobs, array-driven from `src/data/projects.ts` (editorial empty state until real projects are added)
- Book — the Phase 0 booking assistant chat (see Phase 0 section)
- Contact
- Privacy — plain-English privacy page (linked from the footer copyright bar)
- 404

Planned, not yet built:
- Service Areas page (with the interactive Mapbox map)

There is no dedicated Reviews page. Social proof on the Home is reframed as "Forty Years of Trust" until real Google Reviews exist.

## Wow Features

**MVP**:
- Bilingual chatbot (EN/ES) powered by Anthropic Claude Haiku 4.5, with rate-limiting and cost caps — LIVE at /book (see Phase 0)
- Interactive Service Area Map (Mapbox GL JS, custom brand styling, ZIP-code lookup) — planned, not yet built

**V2 (future)**:
- Live "available now" indicator
- Real-time technician tracking (WebSockets)

## Phase 0 — Visual Triage Assistant (in progress)

### Spec files (read these before working on the agent)
- `PHASE-0-BUILD-SPEC.md` — architecture, milestones J0–J5, technical details
- `PHASE-0-EVALS.md` — the eval cases that define "correct". These are FIXED targets written by Simon. NEVER generate, modify, or grade against self-written tests — build TOWARD the eval file, re-run after every change.

### Hard constraints (the agent must NEVER break these)
- Service area is the 9 cities in `src/data/service-areas.ts` (Stockdale, Sutherland Springs, Floresville, La Vernia, Geronimo, McQueeney, Seguin, San Marcos, New Braunfels). The agent's served-city list MUST be imported from that data module, never hardcoded separately. If outside the area, politely decline and do not book.
- Hours: Monday–Friday 8am–5pm. Closed weekends. NEVER claim 24/7 emergency service.
- NEVER quote a price, range, or estimate. Redirect: the technician assesses on site.
- NEVER use the word "cheap"; never sell on price.
- No religious or political statements.
- Bilingual EN/ES — always reply in the language the customer writes in.
- Phone shown to customers: (210) 857-1727 (matches the site, until reveal day).
- Tone: honest, family-owned, forty years. Never "three generations".

### Models
- Conversation/intake: `claude-haiku-4-5-20251001` (fast, cheap)
- Photo diagnosis (J3): `claude-sonnet-4-6` (more precise)
- All Anthropic calls go through a Next.js API route server-side. The API key NEVER reaches the client. Use direct fetch to https://api.anthropic.com/v1/messages (no SDK), consistent with the rest of this project.

### Cost guardrail (implemented in /api/chat)
- Anthropic console monthly cap is set to $20.
- Kill switch: set `CHAT_DISABLED=true` in Vercel to stop all AI calls instantly (friendly reply pointing to the phone).
- Payload guards: photo base64 capped at ~3 MB, conversations capped at 60 messages.
- Rate limiting (`src/lib/ratelimit.ts`, Supabase table `rate_limits`, fixed-window): 15 messages/min and 60 messages/hour per IP; photos (expensive Sonnet vision calls) capped at 3/hour per session and 5/hour per IP.
- All limits FAIL OPEN if the database is down — a blocked assistant is worse than a cost risk. Limit responses are HTTP 200 with a friendly `reply` (the chat UI expects that shape).
- `/api/contact` (the contact form endpoint) is rate-limited too: 5 submissions/hour per IP — it writes to the database and pings Telegram, so it must not be bot-farmable.

### Resilience (a lead must never be silently lost)
- Every Supabase call in `src/lib/leads.ts` checks its `{ error }` and throws — the Supabase client does NOT throw on its own, so unchecked errors would fail silently.
- If the database write fails during intake, `sendLeadFallback` (`src/lib/telegram.ts`) sends whatever we know to the plumber on Telegram so a human can follow up.
- The booking Telegram alert is independent of the diagnosis lookup — a database outage never suppresses it. All Telegram sends are fire-and-forget: they never throw or block the reply.
- A daily Vercel cron (`vercel.json` → `/api/cron/keep-alive`, 09:00 UTC, read-only, `CRON_SECRET` bearer auth) touches Supabase so the free-tier project never pauses for inactivity.

## File Reading Order

This file is structured so that the most important context comes first. If only the first 50 lines are read, Claude Code should still understand: (1) what the project is, (2) the unbreakable rules, (3) the tech stack. Everything below provides depth.

