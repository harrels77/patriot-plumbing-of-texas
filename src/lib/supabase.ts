import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error("Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)");
}

// Server-side client. Uses the service_role key — NEVER import this into a
// client component. It bypasses Row Level Security for trusted server writes.
export const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});
