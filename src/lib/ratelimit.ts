import { supabase } from "./supabase";

// Fixed-window rate limiter backed by Supabase (serverless-safe — no in-memory
// state). Fails OPEN: if the database is unavailable, we allow the request
// rather than blocking real customers.
export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const now = new Date();
    const { data, error } = await supabase
      .from("rate_limits")
      .select("count, window_start")
      .eq("key", key)
      .maybeSingle();
    if (error) throw error;

    // No record, or the window has expired → start a fresh window.
    const expired =
      !data ||
      now.getTime() - new Date(data.window_start).getTime() > windowSeconds * 1000;

    if (expired) {
      const { error: upErr } = await supabase
        .from("rate_limits")
        .upsert({ key, count: 1, window_start: now.toISOString() });
      if (upErr) throw upErr;
      return { allowed: true, remaining: limit - 1 };
    }

    if (data.count >= limit) {
      return { allowed: false, remaining: 0 };
    }

    const { error: incErr } = await supabase
      .from("rate_limits")
      .update({ count: data.count + 1 })
      .eq("key", key);
    if (incErr) throw incErr;

    return { allowed: true, remaining: limit - data.count - 1 };
  } catch (e) {
    // Fail open — never block a real customer because our counter is down.
    console.error("Rate limit check failed (allowing request):", e);
    return { allowed: true, remaining: 0 };
  }
}
