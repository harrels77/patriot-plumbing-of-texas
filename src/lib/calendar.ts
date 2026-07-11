import crypto from "crypto";

const TZ = "America/Chicago";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/calendar";

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

// Mint a short-lived Google access token using the service account's signed JWT.
async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!clientEmail || !rawKey) throw new Error("Missing Google credentials");
  const privateKey = rawKey.replace(/\\n/g, "\n"); // un-escape literal \n from .env

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: clientEmail,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };

  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claim))}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  const signature = base64url(signer.sign(privateKey));
  const jwt = `${unsigned}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Google token error: " + JSON.stringify(data));
  return data.access_token as string;
}

const calendarId = () => process.env.GOOGLE_CALENDAR_ID || "";

export interface BusyInterval { start: string; end: string; }

// Return busy intervals on the booking calendar between two ISO datetimes.
export async function getBusy(timeMinISO: string, timeMaxISO: string): Promise<BusyInterval[]> {
  const token = await getAccessToken();
  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({
      timeMin: timeMinISO,
      timeMax: timeMaxISO,
      timeZone: TZ,
      items: [{ id: calendarId() }],
    }),
  });
  const data = await res.json();
  const cal = data.calendars?.[calendarId()];
  return (cal?.busy ?? []) as BusyInterval[];
}

export interface CreatedEvent { id: string; htmlLink: string; }

// Create a booking event. start/end are ISO datetimes (with offset or Z).
export async function createEvent(args: {
  summary: string;
  description: string;
  startISO: string;
  endISO: string;
}): Promise<CreatedEvent> {
  const token = await getAccessToken();
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId())}/events`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        summary: args.summary,
        description: args.description,
        start: { dateTime: args.startISO, timeZone: TZ },
        end: { dateTime: args.endISO, timeZone: TZ },
      }),
    },
  );
  const data = await res.json();
  if (!data.id) throw new Error("Calendar createEvent error: " + JSON.stringify(data));
  return { id: data.id, htmlLink: data.htmlLink };
}
