"use client";

import { useState } from "react";
import { services } from "@/data/services";

// Contact form shell. Full UI, but the submit handler does NOT send an email —
// Resend integration is deferred (see KNOWN-LIMITATIONS.md). On submit we show
// a "coming soon" message and route the visitor to the phone instead.
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceSlug: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Email backend is not wired up yet — we only flip to the success state.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-lg bg-navy text-cream p-8 sm:p-12 text-center">
        <h3
          className="font-serif text-2xl sm:text-3xl font-semibold text-cream mb-4"
          style={{ fontVariationSettings: "'opsz' 96, 'SOFT' 50" }}
        >
          Email coming soon.
        </h3>
        <p className="font-sans text-lg leading-relaxed text-cream/90 max-w-md mx-auto mb-6">
          We&apos;re not quite ready to receive emails yet. Please call us
          instead — we&apos;ll answer and we&apos;ll help.
        </p>
        <a
          href="tel:+12108571727"
          className="inline-flex items-center justify-center rounded-full bg-rust px-8 py-4 font-sans text-base font-medium text-cream transition-colors hover:bg-rust/90 sm:text-lg"
        >
          Call (210) 857-1727
        </a>
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
            Name
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

        {/* Email (required) */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-mono text-xs uppercase tracking-[0.2em] text-tan"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-cream border border-tan/40 rounded-md px-4 py-3 font-sans text-base text-navy placeholder:text-navy/40 focus:outline-none focus:border-rust transition-colors"
            placeholder="your@email.com"
          />
        </div>

        {/* Phone (optional) */}
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 font-mono text-xs uppercase tracking-[0.2em] text-tan"
          >
            Phone (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
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

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-rust px-8 py-4 font-sans text-base font-medium text-cream transition-colors hover:bg-rust/90 sm:text-lg"
        >
          Send message
        </button>
      </form>
    </>
  );
}
