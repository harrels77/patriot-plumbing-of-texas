"use client";

import { useState, useRef, useEffect } from "react";

// Mirrors the message shape the /api/chat route accepts.
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// Seeded opening line — sets a warm, bilingual tone before the customer types.
const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm Alan with Patriot Plumbing. I can help you get a visit scheduled — what's going on with your plumbing? (Se habla español.)",
};

const SNAG_REPLY = "Sorry, we hit a snag. Please call us at (210) 857-1727.";

export default function BookingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Sentinel at the bottom of the scroll area — keep the latest turn in view.
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    // Send the full visible history (including the seeded greeting) so the
    // model has the whole conversation context.
    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
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
              {message.content}
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
        <div className="flex gap-3">
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
            disabled={loading || !input.trim()}
            className="rounded-full bg-rust px-6 py-3 font-sans text-base font-medium text-cream transition-colors hover:bg-rust/90 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
