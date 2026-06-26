export interface Diagnosis {
  fixture: string;            // what the photo shows
  likely_issues: string[];    // problems worth checking
  parts_to_bring: string[];   // parts/tools to load on the truck
  confidence: "low" | "medium" | "high"; // a WORD, never a number
  urgency: "low" | "normal" | "urgent";
  notes: string;              // any extra context for the plumber
}

export type DiagnoseResult = Diagnosis | { error: string; raw?: string };

const SYSTEM_PROMPT = `You are an expert plumber's assistant. A customer uploaded a photo of a plumbing fixture or problem. Produce a concise technical assessment FOR THE PLUMBER ONLY — it is never shown to the customer.

Identify the fixture, list the most likely issues to check, and list parts or tools worth bringing on the truck. Give an HONEST confidence level: a wrong confident guess wastes a truck roll. If the photo is blurry, partial, or not plumbing-related, set confidence to "low" and say so in notes.

Return ONLY a JSON object — no markdown, no backticks, no preamble — with exactly these keys:
- fixture: short string
- likely_issues: array of short strings
- parts_to_bring: array of short strings
- confidence: one of "low", "medium", "high" (a WORD — never a number or percentage)
- urgency: one of "low", "normal", "urgent"
- notes: short string`;

export async function diagnosePhoto(base64: string, mediaType: string): Promise<DiagnoseResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { error: "Server not configured" };

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
              { type: "text", text: "Analyze this plumbing photo for the plumber." },
            ],
          },
        ],
      }),
    });

    const data = await res.json();
    const text =
      data.content?.find((b: { type: string; text?: string }) => b.type === "text")?.text ?? "";
    const clean = text.replace(/```json|```/g, "").trim();
    try {
      return JSON.parse(clean) as Diagnosis;
    } catch {
      return { error: "Could not parse diagnosis JSON", raw: text };
    }
  } catch {
    return { error: "Diagnosis request failed" };
  }
}
