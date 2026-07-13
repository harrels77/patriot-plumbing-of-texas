"use client";

import { useState } from "react";
import Link from "next/link";
import { services } from "@/data/services";

// Contact form. No email is sent (Resend is still deferred — see
// KNOWN-LIMITATIONS.md): submissions POST to /api/contact, which saves the
// lead to Supabase (deduped by phone) and alerts the plumber on Telegram.
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceSlug: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Client-side sanity checks — mirror the API's validation so most visitors
    // get instant feedback without a round-trip.
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (formData.phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);
    try {
      // Send the human-readable service title, not the slug.
      const serviceTitle = services.find(
        (s) => s.href.replace("/services/", "") === formData.serviceSlug,
      )?.title;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: serviceTitle,
          message: formData.message,
        }),
      });
      const data: { ok?: boolean; error?: string } = await res.json();
      if (data.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", serviceSlug: "", message: "" });
      } else {
        // Keep the form filled so the visitor doesn't lose their work.
        setError(data.error || "Something went wrong. Please call us at (210) 857-1727.");
      }
    } catch {
      setError("Something went wrong. Please call us at (210) 857-1727.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg bg-navy text-cream p-8 sm:p-12 text-center">
        <h3
          className="font-serif text-2xl sm:text-3xl font-semibold text-cream mb-4"
          style={{ fontVariationSettings: "'opsz' 96, 'SOFT' 50" }}
        >
          Message received.
        </h3>
        <p className="font-sans text-lg leading-relaxed text-cream/90 max-w-md mx-auto mb-6">
          Your message reached our team — we&apos;ll call you back during
          business hours. Need us sooner?
        </p>
        <a
          href="tel:+12108571727"
          className="inline-flex items-center justify-center rounded-full bg-rust px-8 py-4 font-sans text-base font-medium text-cream transition-colors hover:bg-rust/90 sm:text-lg"
        >
          Call (210) 857-1727
        </a>
        <Link
          href="/book"
          className="mt-4 block font-sans text-base text-cream/80 transition-colors hover:text-rust"
        >
          Or book a visit online
        </Link>
      </div>
    );
  }

  return (
    <>
      <h3
        className="font-serif text-2xl sm:text-3xl font-semibold text-navy mb-6"
        style={{ fontVariationSettings: "'opsz' 96, 'SOFT' 50" }}
      >
        Send us a message
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name (required) */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 font-mono text-xs uppercase tracking-[0.2em] text-tan"
          >
            Name (required)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-cream border border-tan/40 rounded-md px-4 py-3 font-sans text-base text-navy placeholder:text-navy/40 focus:outline-none focus:border-rust transition-colors"
            placeholder="Your name"
          />
        </div>

        {/* Email (optional — only name and phone are required server-side) */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-mono text-xs uppercase tracking-[0.2em] text-tan"
          >
            Email (optional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-cream border border-tan/40 rounded-md px-4 py-3 font-sans text-base text-navy placeholder:text-navy/40 focus:outline-none focus:border-rust transition-colors"
            placeholder="your@email.com"
          />
        </div>

        {/* Phone (required — it's how we call the customer back, and the lead dedup key) */}
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 font-mono text-xs uppercase tracking-[0.2em] text-tan"
          >
            Phone (required)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-cream border border-tan/40 rounded-md px-4 py-3 font-sans text-base text-navy placeholder:text-navy/40 focus:outline-none focus:border-rust transition-colors"
            placeholder="(555) 555-5555"
          />
        </div>

        {/* Service (optional select) */}
        <div>
          <label
            htmlFor="serviceSlug"
            className="block mb-2 font-mono text-xs uppercase tracking-[0.2em] text-tan"
          >
            What&apos;s this about?
          </label>
          <select
            id="serviceSlug"
            name="serviceSlug"
            value={formData.serviceSlug}
            onChange={handleChange}
            className="w-full bg-cream border border-tan/40 rounded-md px-4 py-3 font-sans text-base text-navy placeholder:text-navy/40 focus:outline-none focus:border-rust transition-colors"
          >
            <option value="">Choose a service…</option>
            {services.map((service) => (
              <option
                key={service.href}
                value={service.href.replace("/services/", "")}
              >
                {service.title}
              </option>
            ))}
          </select>
        </div>

        {/* Message (required) */}
        <div>
          <label
            htmlFor="message"
            className="block mb-2 font-mono text-xs uppercase tracking-[0.2em] text-tan"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-cream border border-tan/40 rounded-md px-4 py-3 font-sans text-base text-navy placeholder:text-navy/40 focus:outline-none focus:border-rust transition-colors resize-y"
            placeholder="Tell us what you need help with…"
          />
        </div>

        {error && <p className="font-mono text-xs text-rust">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-full bg-rust px-8 py-4 font-sans text-base font-medium text-cream transition-colors hover:bg-rust/90 disabled:opacity-50 sm:text-lg"
        >
          {submitting ? "Sending…" : "Send message"}
        </button>
      </form>
    </>
  );
}
