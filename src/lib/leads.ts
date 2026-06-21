import { supabase } from "./supabase";

// A lead row as stored in Supabase.
export interface Lead {
  id: string;
  created_at: string;
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

// The fields a conversation can provide about a lead.
export interface LeadInput {
  phone: string;
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

// Search by normalized phone, then branch:
//   - exists  → returning customer; update last_contact and merge any NEW
//               non-empty fields (never overwrite existing data with blanks)
//   - missing → new customer; insert
// Phone is the UNIQUE key, so this can never create a duplicate.
export async function upsertLead(input: LeadInput): Promise<UpsertResult> {
  const phone = normPhone(input.phone);

  const { data: existing } = await supabase
    .from("leads")
    .select("*")
    .eq("phone", phone)
    .maybeSingle();

  // Build a patch of only the provided, non-empty fields.
  const patch: Record<string, string> = {};
  if (input.name && input.name.trim()) patch.name = input.name.trim();
  if (input.city && input.city.trim()) patch.city = normCity(input.city);
  if (input.problem && input.problem.trim()) patch.problem = input.problem.trim();
  if (input.urgency && input.urgency.trim()) patch.urgency = input.urgency.trim();
  if (input.language && input.language.trim()) patch.language = input.language.trim();

  if (existing) {
    const { data: updated, error } = await supabase
      .from("leads")
      .update({ ...patch, last_contact: new Date().toISOString() })
      .eq("id", existing.id)
      .select("*")
      .single();
    if (error) throw error;
    return { returning: true, lead: updated as Lead };
  }

  const { data: inserted, error } = await supabase
    .from("leads")
    .insert({ phone, ...patch })
    .select("*")
    .single();
  if (error) throw error;
  return { returning: false, lead: inserted as Lead };
}
