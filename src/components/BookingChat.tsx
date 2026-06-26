"use client";

import { useState, useRef, useEffect } from "react";
import { fileToResizedJpeg, type ProcessedPhoto } from "@/lib/photo";

// Mirrors the message shape the /api/chat route accepts. imageUrl is a
// display-only field for the transcript — it is stripped before the API call.
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
};

// Seeded opening line — sets a warm, bilingual tone before the customer types.
const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm Alan with Patriot Plumbing. I can help you get a visit scheduled — what's going on with your plumbing? (Se habla español.)",
};

const SNAG_REPLY = "Sorry, we hit a snag. Please call us at (210) 857-1727.";

// Light scan of the conversation for a 10-digit phone, so a photo can be tied
// to the right lead row server-side. Best-effort only — returns undefined if no
// plausible number is present yet.
function findPhone(msgs: { content: string }[]): string | undefined {
  const joined = msgs.map((m) => m.content).join(" ");
  const match = joined.match(/(\d[\d\s().-]{8,}\d)/);
  if (!match) return undefined;
  const digits = match[0].replace(/\D/g, "");
  return digits.length >= 10 ? digits.slice(-10) : undefined;
}

export default function BookingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Stable per-mount session id. Anchors anonymous data and the photo diagnosis
  // to this conversation server-side, so they're kept and promoted once a phone
  // arrives. Stays constant for the life of this chat widget.
  const sessionIdRef = useRef<string>(
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );

  // Photo attachment: upload → HEIC→JPEG conversion → preview → sent with the
  // next message. The server diagnoses it for the plumber only; the customer
  // never sees the diagnosis.
  const [attachedPhoto, setAttachedPhoto] = useState<ProcessedPhoto | null>(null);
  const [photoProcessing, setPhotoProcessing] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sentinel at the bottom of the scroll area — keep the latest turn in view.
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError(null);
    setPhotoProcessing(true);
    try {
      const processed = await fileToResizedJpeg(file);
      setAttachedPhoto(processed);
    } catch {
      setPhotoError("Couldn't read that image — please try another photo.");
    } finally {
      setPhotoProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSend() {
    const trimmed = input.trim();
    // Allow sending with a photo even when there's no typed text.
    if ((!trimmed && !attachedPhoto) || loading) return;

    // Send the full visible history (including the seeded greeting) so the
    // model has the whole conversation context. If a photo is attached, keep its
    // dataUrl on the message FOR DISPLAY only — it's stripped before the API call.
    const userMessage: ChatMessage = {
      role: "user",
      content: trimmed || "📷 Photo attached",
      ...(attachedPhoto ? { imageUrl: attachedPhoto.dataUrl } : {}),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // Capture the photo for this turn, then clear it from the composer.
    const photoForSend = attachedPhoto;
    setAttachedPhoto(null);

    try {
      // Sanitized role+content array for the API — no client-only fields.
      const apiMessages = updatedMessages.map(({ role, content }) => ({ role, content }));
      const body: {
        messages: { role: string; content: string }[];
        sessionId: string;
        photo?: { base64: string; mediaType: string };
        phone?: string;
      } = { messages: apiMessages, sessionId: sessionIdRef.current };
      if (photoForSend) {
        body.photo = { base64: photoForSend.base64, mediaType: photoForSend.mediaType };
        body.phone = findPhone(updatedMessages);
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data: { reply?: string } = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? SNAG_REPLY },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: SNAG_REPLY },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-lg border border-tan/40 bg-cream">
      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={
                message.role === "user"
                  ? "max-w-[80%] rounded-2xl bg-navy px-4 py-3 font-sans text-base text-cream"
                  : "max-w-[80%] whitespace-pre-wrap rounded-2xl bg-tan/15 px-4 py-3 font-sans text-base text-navy"
              }
            >
              {message.imageUrl && (
                <div
                  className="mb-2 aspect-[4/3] w-48 max-w-full rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${message.imageUrl})` }}
                  aria-label="Photo you sent"
                />
              )}
              {!(message.imageUrl && message.content === "📷 Photo attached") &&
                message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] animate-pulse rounded-2xl bg-tan/15 px-4 py-3 font-sans text-base text-navy">
              …
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-tan/40 p-4">
        {/* Hidden picker: pick → HEIC→JPEG convert → preview (handled above). */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.heic,.heif"
          className="hidden"
          onChange={handlePhotoSelect}
        />

        {photoError && (
          <p className="mb-3 font-mono text-xs text-rust">{photoError}</p>
        )}

        {/* Attached-photo preview sits above the input row. */}
        {attachedPhoto && (
          <div className="relative mb-3 inline-block">
            <div
              className="h-20 w-20 rounded-md border border-tan/40 bg-cover bg-center"
              style={{ backgroundImage: `url(${attachedPhoto.dataUrl})` }}
              aria-label="Attached photo preview"
            />
            <button
              type="button"
              onClick={() => setAttachedPhoto(null)}
              aria-label="Remove photo"
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-tan/40 bg-cream text-sm leading-none text-navy/70 shadow-sm transition-colors hover:border-rust hover:text-rust"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={photoProcessing}
            aria-label="Add a photo"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-tan/40 text-2xl leading-none text-navy/70 transition-colors hover:border-rust hover:text-rust disabled:opacity-50"
          >
            {photoProcessing ? "…" : "+"}
          </button>
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              // Enter sends; Shift+Enter inserts a newline.
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message…"
            className="flex-1 resize-none bg-cream border border-tan/40 rounded-md px-4 py-3 font-sans text-base text-navy placeholder:text-navy/40 focus:outline-none focus:border-rust transition-colors"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={loading || (!input.trim() && !attachedPhoto)}
            className="rounded-full bg-rust px-6 py-3 font-sans text-base font-medium text-cream transition-colors hover:bg-rust/90 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
