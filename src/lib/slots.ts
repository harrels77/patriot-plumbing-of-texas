import { getBusy, type BusyInterval } from "./calendar";

const TZ_OFFSET = "-05:00"; // America/Chicago, CDT (summer). Acceptable for Phase 0.

// The two daily slots (start hour, end hour) in 24h Central time.
const DAILY_SLOTS: Array<{ startHour: number; endHour: number }> = [
  { startHour: 8, endHour: 11 },
  { startHour: 13, endHour: 16 },
];

export interface Slot {
  startISO: string;   // e.g. 2026-06-29T08:00:00-05:00
  endISO: string;
  label: string;      // human label, e.g. "Monday, June 29 · 8:00–11:00 AM"
}

function ymd(d: Date): { y: number; m: number; d: number } {
  return { y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate() };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function isoFor(y: number, m: number, d: number, hour: number): string {
  return `${y}-${pad(m)}-${pad(d)}T${pad(hour)}:00:00${TZ_OFFSET}`;
}

// Day-of-week and a readable label in Central time, independent of server TZ.
function centralParts(y: number, m: number, d: number, hour: number) {
  const dt = new Date(isoFor(y, m, d, hour));
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", weekday: "long" }).format(dt);
  const monthName = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", month: "long" }).format(dt);
  const dayNum = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", day: "numeric" }).format(dt);
  return { weekday, monthName, dayNum };
}

function overlapsBusy(startISO: string, endISO: string, busy: BusyInterval[]): boolean {
  const s = new Date(startISO).getTime();
  const e = new Date(endISO).getTime();
  return busy.some((b) => {
    const bs = new Date(b.start).getTime();
    const be = new Date(b.end).getTime();
    return s < be && bs < e; // standard interval overlap
  });
}

// Generate up to `count` upcoming bookable slots, starting from the next
// business day, skipping weekends and any slot overlapping a busy interval.
export async function getAvailableSlots(count = 4, lookAheadDays = 10): Promise<Slot[]> {
  // Window for the busy query: from tomorrow 00:00 to lookAhead end.
  const now = new Date();
  const startDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const endDay = new Date(now.getTime() + (lookAheadDays + 1) * 24 * 60 * 60 * 1000);
  const sp = ymd(startDay);
  const ep = ymd(endDay);
  const busy = await getBusy(isoFor(sp.y, sp.m, sp.d, 0), isoFor(ep.y, ep.m, ep.d, 23));

  const slots: Slot[] = [];
  for (let i = 1; i <= lookAheadDays && slots.length < count; i++) {
    const day = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const { y, m, d } = ymd(day);
    // Skip weekends (check the weekday in Central time).
    const wd = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", weekday: "short" }).format(
      new Date(isoFor(y, m, d, 12)),
    );
    if (wd === "Sat" || wd === "Sun") continue;

    for (const { startHour, endHour } of DAILY_SLOTS) {
      if (slots.length >= count) break;
      const startISO = isoFor(y, m, d, startHour);
      const endISO = isoFor(y, m, d, endHour);
      if (overlapsBusy(startISO, endISO, busy)) continue;
      const { weekday, monthName, dayNum } = centralParts(y, m, d, startHour);
      const startLabel = startHour < 12 ? `${startHour}:00 AM` : startHour === 12 ? "12:00 PM" : `${startHour - 12}:00 PM`;
      const endLabel = endHour < 12 ? `${endHour}:00 AM` : endHour === 12 ? "12:00 PM" : `${endHour - 12}:00 PM`;
      slots.push({
        startISO,
        endISO,
        label: `${weekday}, ${monthName} ${dayNum} · ${startLabel}–${endLabel}`,
      });
    }
  }
  return slots;
}

// Validate that a proposed startISO is a real bookable slot (weekday, one of the
// two daily start hours, in the future) AND still free. Returns the matching Slot
// or null.
export async function validateSlot(startISO: string): Promise<Slot | null> {
  const dt = new Date(startISO);
  if (isNaN(dt.getTime())) return null;
  if (dt.getTime() <= Date.now()) return null;

  const hourStr = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "numeric", hour12: false }).format(dt);
  const hour = parseInt(hourStr, 10) % 24;
  const match = DAILY_SLOTS.find((s) => s.startHour === hour);
  if (!match) return null;

  const wd = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", weekday: "short" }).format(dt);
  if (wd === "Sat" || wd === "Sun") return null;

  const y = parseInt(new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric" }).format(dt), 10);
  const mName = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", month: "2-digit" }).format(dt);
  const dNum = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", day: "2-digit" }).format(dt);
  const realStartISO = `${y}-${mName}-${dNum}T${pad(hour)}:00:00${TZ_OFFSET}`;
  const realEndISO = `${y}-${mName}-${dNum}T${pad(match.endHour)}:00:00${TZ_OFFSET}`;

  const busy = await getBusy(realStartISO, realEndISO);
  if (overlapsBusy(realStartISO, realEndISO, busy)) return null;

  const { weekday, monthName, dayNum } = centralParts(y, parseInt(mName, 10), parseInt(dNum, 10), hour);
  const startLabel = hour < 12 ? `${hour}:00 AM` : hour === 12 ? "12:00 PM" : `${hour - 12}:00 PM`;
  const endLabel = match.endHour < 12 ? `${match.endHour}:00 AM` : `${match.endHour - 12}:00 PM`;
  return { startISO: realStartISO, endISO: realEndISO, label: `${weekday}, ${monthName} ${dayNum} · ${startLabel}–${endLabel}` };
}
