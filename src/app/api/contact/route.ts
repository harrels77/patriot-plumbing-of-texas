import { NextResponse } from "next/server";
import { upsertLead, normPhone } from "@/lib/leads";
import { sendContactAlert } from "@/lib/telegram";
import { checkRateLimit } from "@/lib/ratelimit";

interface ContactBody {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;

    const name = (body.name ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const email = (body.email ?? "").trim();
    const service = (body.service ?? "").trim();
    const message = (body.message ?? "").trim();

    // Validation. Phone is required — without it we cannot call the customer back
    // or dedupe them against an existing lead.
    if (!name) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
    if (normPhone(phone).length !== 10) {
      return NextResponse.json({ ok: false, error: "Please enter a valid 10-digit phone number." }, { status: 400 });
    }
    if (message.length > 3000) {
      return NextResponse.json({ ok: false, error: "That message is too long." }, { status: 400 });
    }

    // Rate limit — this endpoint writes to the database and pings Telegram, so
    // protect it from bots. Fails open by design (see ratelimit.ts).
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const limit = await checkRateLimit(`contact:ip:${ip}`, 5, 3600);
    if (!limit.allowed) {
      return NextResponse.json(
        { ok: false, error: "You've sent several messages already. Please call us at (210) 857-1727." },
        { status: 429 },
      );
    }

    // Save the lead (deduped by phone, same table Alan uses).
    let saved = false;
    try {
      const problem = [service, message].filter(Boolean).join(" — ").slice(0, 1000);
      await upsertLead({ phone, name, problem: problem || undefined });
      saved = true;
    } catch (e) {
      console.error("contact: upsertLead failed (database unavailable?):", e);
    }

    // Alert the plumber — this must work even if the database is down.
    try {
      await sendContactAlert({ name, phone, email, service, message });
    } catch (e) {
      console.error("contact: telegram alert failed:", e);
    }

    // The customer's message reached a human either way.
    return NextResponse.json({ ok: true, saved });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please call us at (210) 857-1727." },
      { status: 500 },
    );
  }
}
