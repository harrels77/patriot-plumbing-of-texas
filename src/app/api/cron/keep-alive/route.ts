import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Daily cron: touch Supabase so the free-tier project never pauses for
// inactivity. A paused database would silently lose real customer leads.
// Vercel sends CRON_SECRET as an Authorization bearer token; reject anything else
// so the endpoint cannot be triggered by strangers.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    // A tiny read is enough to count as activity.
    const { error } = await supabase.from("leads").select("id").limit(1);
    if (error) throw error;
    return NextResponse.json({ ok: true, at: new Date().toISOString() });
  } catch (e) {
    console.error("keep-alive ping failed:", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
