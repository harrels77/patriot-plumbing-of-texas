import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Patriot Plumbing of Texas handles the information you share with us.",
};

export default function PrivacyPage() {
  return (
    <>
      {/* 01 — Hero (editorial, minimal, left-aligned — same pattern as Contact) */}
      <section
        aria-label="Privacy hero"
        className="bg-cream py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          {/* Editorial eyebrow row */}
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust">
              PRIVACY
            </span>
            <span aria-hidden className="h-px flex-1 bg-tan" />
          </div>

          <h1
            className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-6xl lg:text-7xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            What we do with your information.
          </h1>

          <p className="mt-8 max-w-xl font-sans text-lg text-navy sm:text-xl">
            Plain answers, no legal fog. This page says exactly what we
            collect, why we collect it, and who else sees it.
          </p>
        </div>
      </section>

      {/* 02 — What we collect */}
      <section aria-label="What we collect" className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            01 · WHAT WE COLLECT
          </p>
          <h2
            className="mb-8 font-serif text-3xl font-semibold text-navy sm:text-4xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            What we collect.
          </h2>
          <div className="space-y-6 font-sans text-lg leading-relaxed text-navy/90">
            <p>
              When you call us or fill out the contact form, we get your name,
              your phone number, your email if you choose to give it, and
              whatever you tell us about your plumbing problem.
            </p>
            <p>
              When you use our online booking assistant, we collect the same
              details — plus any photo you choose to send.
            </p>
            <p>Photos are optional. You never have to send one.</p>
          </div>
        </div>
      </section>

      {/* 03 — Why */}
      <section aria-label="Why we collect it" className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            02 · WHY
          </p>
          <h2
            className="mb-8 font-serif text-3xl font-semibold text-navy sm:text-4xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Why we collect it.
          </h2>
          <div className="space-y-6 font-sans text-lg leading-relaxed text-navy/90">
            <p>
              To understand the problem, schedule a visit, and let our
              technician arrive prepared with the right parts. That&apos;s the
              whole reason.
            </p>
            <p>
              We do not sell your information. We do not send marketing emails.
              We do not share it with anyone outside the services listed below.
            </p>
          </div>
        </div>
      </section>

      {/* 04 — Who else sees it */}
      <section aria-label="Who else sees it" className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            03 · WHO ELSE SEES IT
          </p>
          <h2
            className="mb-8 font-serif text-3xl font-semibold text-navy sm:text-4xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Who else sees it.
          </h2>
          <div className="space-y-6 font-sans text-lg leading-relaxed text-navy/90">
            <p>
              Running a small business means using a few tools. Here is each
              one, and exactly what it receives:
            </p>
            <ul className="list-none space-y-4">
              <li>
                <span className="font-medium text-navy">Anthropic</span> — the
                AI that powers our booking assistant. It receives the
                conversation, and any photo you send, in order to help schedule
                your visit and prepare our technician.
              </li>
              <li>
                <span className="font-medium text-navy">Supabase</span> —
                stores your contact details and job notes so we can serve you
                when you come back.
              </li>
              <li>
                <span className="font-medium text-navy">Google Calendar</span>{" "}
                — receives your appointment details so our technician knows
                when to arrive.
              </li>
              <li>
                <span className="font-medium text-navy">Telegram</span> — sends
                the details to our plumber&apos;s phone so they see your
                request.
              </li>
            </ul>
            <p>
              We chose these tools to run a small family business well — not to
              build a data profile of you.
            </p>
          </div>
        </div>
      </section>

      {/* 05 — Photos */}
      <section aria-label="About photos" className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            04 · PHOTOS
          </p>
          <h2
            className="mb-8 font-serif text-3xl font-semibold text-navy sm:text-4xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            About photos.
          </h2>
          <div className="space-y-6 font-sans text-lg leading-relaxed text-navy/90">
            <p>
              A photo you send is used for one thing: helping our technician
              show up prepared. Our AI assistant reviews it and passes it to
              our plumber.
            </p>
            <p>
              To be plain about it: the photo is sent to Anthropic&apos;s API
              for analysis and to our plumber via Telegram. It is not published
              anywhere, not used for advertising, and not shared with anyone
              else.
            </p>
          </div>
        </div>
      </section>

      {/* 06 — How long we keep it */}
      <section aria-label="How long we keep it" className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            05 · HOW LONG WE KEEP IT
          </p>
          <h2
            className="mb-8 font-serif text-3xl font-semibold text-navy sm:text-4xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            How long we keep it.
          </h2>
          <div className="space-y-6 font-sans text-lg leading-relaxed text-navy/90">
            <p>
              We keep your contact details and job history so we can serve you
              better next time — a returning customer shouldn&apos;t have to
              start from zero.
            </p>
            <p>
              If you want your information deleted, call us at{" "}
              <a
                href="tel:+12108571727"
                className="font-medium text-navy transition-colors hover:text-rust"
              >
                (210) 857-1727
              </a>{" "}
              and ask. We will remove it.
            </p>
          </div>
        </div>
      </section>

      {/* 07 — Children */}
      <section aria-label="Children" className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            06 · CHILDREN
          </p>
          <h2
            className="mb-8 font-serif text-3xl font-semibold text-navy sm:text-4xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Children.
          </h2>
          <div className="space-y-6 font-sans text-lg leading-relaxed text-navy/90">
            <p>
              Our services are for homeowners and businesses. We do not
              knowingly collect information from children.
            </p>
          </div>
        </div>
      </section>

      {/* 08 — Questions */}
      <section aria-label="Questions" className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            07 · QUESTIONS
          </p>
          <h2
            className="mb-8 font-serif text-3xl font-semibold text-navy sm:text-4xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Questions?
          </h2>
          <div className="space-y-6 font-sans text-lg leading-relaxed text-navy/90">
            <p>
              Call us at{" "}
              <a
                href="tel:+12108571727"
                className="font-medium text-navy transition-colors hover:text-rust"
              >
                (210) 857-1727
              </a>
              . A real person will answer during business hours — Monday
              through Friday, 8 AM to 5 PM.
            </p>
          </div>

          <p className="mt-12 font-mono text-xs tracking-tight text-tan">
            Last updated: July 2026
          </p>
        </div>
      </section>

      <Footer services={services} />
    </>
  );
}
