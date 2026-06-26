// Current business-time context in Patriot's timezone (Central / America/Chicago).
// The model has no clock, so the server injects this every request — Alan must
// never guess the day, time, or whether we're open.
export function businessTimeContext(): string {
  const tz = "America/Chicago";
  const now = new Date();

  const dateStr = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, weekday: "long", month: "long", day: "numeric", year: "numeric",
  }).format(now);

  const timeStr = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hour: "numeric", minute: "2-digit", hour12: true,
  }).format(now);

  const hour =
    parseInt(
      new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", hour12: false }).format(now),
      10,
    ) % 24;

  const dows = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dow = dows.indexOf(
    new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short" }).format(now),
  );

  const isWeekday = dow >= 1 && dow <= 5;
  const isOpen = isWeekday && hour >= 8 && hour < 17;

  const full = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let nextOpen = "";
  if (!isOpen) {
    if (isWeekday && hour < 8) {
      nextOpen = "later today at 8am";
    } else {
      let nd = dow;
      for (let i = 1; i <= 7; i++) {
        nd = (dow + i) % 7;
        if (nd >= 1 && nd <= 5) break;
      }
      nextOpen = `${full[nd]} at 8am`;
    }
  }

  return `\n\n[CURRENT TIME — Central Time, Patriot's timezone] Right now it is ${dateStr}, ${timeStr}. The shop is currently ${isOpen ? "OPEN" : "CLOSED"} (hours: Monday-Friday, 8am-5pm). ${isOpen ? "" : `The next time we open is ${nextOpen}.`} Use this for anything time-related (today, tomorrow, this week, weekend, whether we are open now, the next business day) — never guess the date or time.`;
}
