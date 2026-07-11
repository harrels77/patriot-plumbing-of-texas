import { supabase } from "./supabase";

// A lead row as stored in Supabase.
export interface Lead {
  id: string;
  created_at: string;
  session_id: string | null;
  phone: string;
  name: string | null;
  city: string | null;
  email: string | null;
  problem: string | null;
  urgency: string | null;
  language: string;
  status: string;
  last_contact: string;
  last_diagnosis: unknown | null;
  booking_event_id: string | null;
}

// The fields a conversation can provide about a lead. A conversation is anchored
// by sessionId; phone may arrive later (or be looked up for a returning customer).
export interface LeadInput {
  sessionId?: string;
  phone?: string;
  name?: string;
  city?: string;
  problem?: string;
  urgency?: string;
  language?: string;
}

// Normalize a phone to the last 10 digits (US). This is the dedup key.
export const normPhone = (s: string): string => s.replace(/\D/g, "").slice(-10);

// Normalize a city for matching: trimmed, lowercased.
export const normCity = (s: string): string => s.trim().toLowerCase();

// The result of an upsert: whether the lead already existed, and the row.
export interface UpsertResult {
  returning: boolean;
  lead: Lead;
}

// Anchor a conversation by sessionId so data collected before the phone is known
// is still stored, then promoted/merged when the phone arrives. Branches:
//   - No sessionId (legacy): pure phone upsert (find by phone → update-or-insert).
//   - sessionId, no phone yet: anonymous upsert against the session row.
//   - sessionId + phone: promote the session row, or merge into an existing phone
//     lead (returning customer) and delete the session row — never a duplicate.
export async function upsertLead(input: LeadInput): Promise<UpsertResult> {
  const sessionId = input.sessionId?.trim() || "";
  const phone = input.phone ? normPhone(input.phone) : "";

  const patch: Record<string, string> = {};
  if (input.name && input.name.trim()) patch.name = input.name.trim();
  if (input.city && input.city.trim()) patch.city = normCity(input.city);
  if (input.problem && input.problem.trim()) patch.problem = input.problem.trim();
  if (input.urgency && input.urgency.trim()) patch.urgency = input.urgency.trim();
  if (input.language && input.language.trim()) patch.language = input.language.trim();

  const now = () => new Date().toISOString();

  // --- Legacy path: no session anchor → pure phone upsert (back-compat) ---
  if (!sessionId) {
    if (!phone) throw new Error("upsertLead requires a sessionId or a phone");
    const { data: existing } = await supabase.from("leads").select("*").eq("phone", phone).maybeSingle();
    if (existing) {
      const { data: updated, error } = await supabase.from("leads")
        .update({ ...patch, last_contact: now() }).eq("id", existing.id).select("*").single();
      if (error) throw error;
      return { returning: true, lead: updated as Lead };
    }
    const { data: inserted, error } = await supabase.from("leads")
      .insert({ phone, ...patch }).select("*").single();
    if (error) throw error;
    return { returning: false, lead: inserted as Lead };
  }

  // --- Session path ---
  const { data: bySession } = await supabase.from("leads").select("*").eq("session_id", sessionId).maybeSingle();

  if (phone) {
    const { data: byPhone } = await supabase.from("leads").select("*").eq("phone", phone).maybeSingle();

    // Existing identified lead for this phone, on a different row → merge + dedup.
    if (byPhone && (!bySession || byPhone.id !== bySession.id)) {
      const merged: Record<string, unknown> = { ...patch, last_contact: now() };
      if (bySession) {
        for (const k of ["name", "city", "problem", "urgency", "language"] as const) {
          if (!byPhone[k] && bySession[k]) merged[k] = bySession[k];
        }
        if (!byPhone.last_diagnosis && bySession.last_diagnosis) merged.last_diagnosis = bySession.last_diagnosis;
        await supabase.from("leads").delete().eq("id", bySession.id);
      }
      const { data: updated, error } = await supabase.from("leads")
        .update(merged).eq("id", byPhone.id).select("*").single();
      if (error) throw error;
      return { returning: true, lead: updated as Lead };
    }

    // Promote the existing session row with the phone, or insert a new identified row.
    if (bySession) {
      const { data: updated, error } = await supabase.from("leads")
        .update({ ...patch, phone, last_contact: now() }).eq("id", bySession.id).select("*").single();
      if (error) throw error;
      return { returning: false, lead: updated as Lead };
    }
    const { data: inserted, error } = await supabase.from("leads")
      .insert({ session_id: sessionId, phone, ...patch }).select("*").single();
    if (error) throw error;
    return { returning: false, lead: inserted as Lead };
  }

  // No phone yet → anonymous upsert by session.
  if (bySession) {
    const { data: updated, error } = await supabase.from("leads")
      .update({ ...patch, last_contact: now() }).eq("id", bySession.id).select("*").single();
    if (error) throw error;
    return { returning: false, lead: updated as Lead };
  }
  const { data: inserted, error } = await supabase.from("leads")
    .insert({ session_id: sessionId, ...patch }).select("*").single();
  if (error) throw error;
  return { returning: false, lead: inserted as Lead };
}

// Save the photo diagnosis JSON onto an existing lead row, keyed by phone.
// The diagnosis is for the plumber only — it is stored, never returned to the
// customer. If no row matches that phone yet, the update is a no-op, which is
// fine: the diagnosis still reaches the plumber via this turn's chat context.
export async function saveDiagnosis(phone: string, diagnosis: unknown): Promise<void> {
  const p = normPhone(phone);
  if (!p) return;
  await supabase
    .from("leads")
    .update({ last_diagnosis: diagnosis, last_contact: new Date().toISOString() })
    .eq("phone", p);
}

// Save the photo diagnosis against the conversation's session row, creating
// the row if needed — so the diagnosis is stored even before a phone is known.
export async function saveDiagnosisBySession(sessionId: string, diagnosis: unknown): Promise<void> {
  const s = sessionId?.trim();
  if (!s) return;
  const { data: bySession } = await supabase.from("leads").select("id").eq("session_id", s).maybeSingle();
  if (bySession) {
    await supabase.from("leads")
      .update({ last_diagnosis: diagnosis, last_contact: new Date().toISOString() })
      .eq("id", bySession.id);
  } else {
    await supabase.from("leads").insert({ session_id: s, last_diagnosis: diagnosis });
  }
}

// Store a confirmed booking on the lead: the Google Calendar event id and a
// "booked" status. Prefer the session anchor (works even before a phone is on
// file); fall back to phone. A no-op if neither matches an existing row.
export async function saveBooking(sessionId: string | undefined, phone: string | undefined, eventId: string): Promise<void> {
  if (sessionId) {
    const { data } = await supabase.from("leads").select("id").eq("session_id", sessionId).maybeSingle();
    if (data) {
      await supabase.from("leads").update({ booking_event_id: eventId, status: "booked", last_contact: new Date().toISOString() }).eq("id", data.id);
      return;
    }
  }
  if (phone) {
    const p = normPhone(phone);
    if (p) {
      await supabase.from("leads").update({ booking_event_id: eventId, status: "booked", last_contact: new Date().toISOString() }).eq("phone", p);
    }
  }
}
