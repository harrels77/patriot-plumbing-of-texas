import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { services } from "@/data/services";
import { business } from "@/data/business";
import { serviceAreas } from "@/data/service-areas";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Patriot Plumbing of Texas. Family-owned, serving South-Central Texas since 1983. Call (210) 857-1727 or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      {/* 01 — Hero (editorial, minimal, left-aligned) */}
      <section
        aria-label="Contact hero"
        className="bg-cream py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          {/* Editorial eyebrow row */}
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust">
              CONTACT
            </span>
            <span aria-hidden className="h-px flex-1 bg-tan" />
          </div>

          <h1
            className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-6xl lg:text-7xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Get in touch.
          </h1>

          <p className="mt-8 max-w-xl font-sans text-lg text-navy sm:text-xl">
            Call us, write us, or stop by. We answer Monday through Friday
            during business hours, and we read every message that comes in.
          </p>
        </div>
      </section>

      {/* 02 — Direct contact (phone + hours + address) */}
      <section aria-label="Direct contact" className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            01 · CALL OR VISIT
          </p>

          <a
            href={`tel:${business.telephone}`}
            className="mb-4 block font-serif text-5xl font-semibold text-navy transition-colors hover:text-rust sm:text-6xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            {business.telephoneDisplay}
          </a>

          <p className="mb-12 font-sans text-lg text-navy/80">
            {business.hours.display}
          </p>

          {/* Secondary path — quiet pointer to the online booking chat */}
          <p className="mb-12 font-sans text-base text-navy/80">
            Prefer to schedule online?{" "}
            <Link
              href="/book"
              className="font-medium text-navy transition-colors hover:text-rust"
            >
              Book a visit
            </Link>
          </p>

          {/* Subtle divider */}
          <span
            aria-hidden
            className="mx-auto mb-12 block h-px max-w-xs bg-tan/30"
          />

          {/* Address block */}
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            VISIT
          </p>
          <p className="mb-2 font-serif text-xl text-navy">
            {business.address.street}
          </p>
          <p className="font-sans text-base text-navy/80">
            {`${business.address.city}, ${business.address.state} ${business.address.zip}`}
          </p>
        </div>
      </section>

      {/* 03 — Contact form (client component, cream-on-cream) */}
      <section aria-label="Contact form" className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 sm:px-10">
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            02 · SEND A MESSAGE
          </p>
          <ContactForm />
        </div>
      </section>

      {/* 04 — Service areas mention */}
      <section aria-label="Service areas" className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            03 · WHERE WE WORK
          </p>
          <h2
            className="mb-6 font-serif text-2xl font-semibold text-navy sm:text-3xl"
            style={{ fontVariationSettings: "'opsz' 96, 'SOFT' 50" }}
          >
            South-Central Texas, four counties.
          </h2>
          <p className="mx-auto max-w-xl font-sans text-base leading-relaxed text-navy/90 sm:text-lg">
            {serviceAreas.map((a) => a.city).join(" · ")}
          </p>
        </div>
      </section>

      {/* 05 — Footer */}
      <Footer services={services} />
    </>
  );
}
