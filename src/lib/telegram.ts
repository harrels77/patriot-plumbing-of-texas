// Telegram alert to the plumber. Server-only — the bot token never reaches the
// client. Failures are swallowed by the caller: a Telegram outage must never
// break a booking that already succeeded.

export interface BookingAlert {
  name?: string;
  phone?: string;
  city?: string;
  problem?: string;
  urgency?: string;
  when: string;              // human slot label, e.g. "Monday, July 13 · 8:00 AM–11:00 AM"
  diagnosis?: unknown;       // the plumber-only photo diagnosis, if any
}

// Escape the few characters Telegram's HTML parse_mode cares about.
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatAlert(a: BookingAlert): string {
  const lines: string[] = [];
  lines.push("<b>New booking — Patriot Plumbing</b>");
  lines.push("");
  lines.push(`<b>When:</b> ${esc(a.when)}`);
  if (a.name) lines.push(`<b>Name:</b> ${esc(a.name)}`);
  if (a.phone) lines.push(`<b>Phone:</b> ${esc(a.phone)}`);
  if (a.city) lines.push(`<b>City:</b> ${esc(a.city)}`);
  if (a.problem) lines.push(`<b>Problem:</b> ${esc(a.problem)}`);
  if (a.urgency) lines.push(`<b>Urgency:</b> ${esc(a.urgency)}`);

  // Photo pre-diagnosis, if the customer sent one. Plumber-only information.
  const d = a.diagnosis as
    | { fixture?: string; likely_issues?: string[]; parts_to_bring?: string[]; confidence?: string; notes?: string }
    | undefined;
  if (d && typeof d === "object") {
    lines.push("");
    lines.push("<b>Photo pre-diagnosis</b>");
    if (d.fixture) lines.push(`<b>Fixture:</b> ${esc(d.fixture)}`);
    if (d.confidence) lines.push(`<b>Confidence:</b> ${esc(d.confidence)}`);
    if (d.likely_issues?.length) {
      lines.push("<b>Check:</b>");
      for (const i of d.likely_issues.slice(0, 6)) lines.push(`• ${esc(i)}`);
    }
    if (d.parts_to_bring?.length) {
      lines.push("<b>Bring:</b>");
      for (const p of d.parts_to_bring.slice(0, 8)) lines.push(`• ${esc(p)}`);
    }
    if (d.notes) lines.push(`<b>Notes:</b> ${esc(d.notes)}`);
  }
  return lines.join("\n");
}

// Send the alert. Returns true on success, false on any failure — never throws.
export async function sendBookingAlert(alert: BookingAlert): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatAlert(alert),
        parse_mode: "HTML",
      }),
    });
    const data = await res.json();
    return data.ok === true;
  } catch {
    return false;
  }
}
