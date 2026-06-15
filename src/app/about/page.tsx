import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "Family-owned plumbing in Stockdale, Texas since 1983. Our mission, our family, our work, our promise.",
};

// The six promises rendered in Section 6 — kept in order, in one place.
const promises = [
  "A real person on the phone — not an auto-router",
  "A free in-home estimate before any work begins",
  "A written quote with no fine print",
  "The right materials and the right permits",
  "A written warranty on every install",
  "An invoice that matches what we quoted",
];

export default function AboutPage() {
  return (
    <>
      {/* SECTION 1 — Page hero (asymmetric, no CTA) */}
      <section
        aria-label="About hero"
        className="mx-auto grid min-h-[70vh] max-w-7xl grid-cols-1 items-center gap-12 bg-cream px-6 py-16 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-16"
      >
        {/* Left column — eyebrow, headline, subtitle */}
        <div className="flex flex-col">
          <div className="mb-6 flex items-center gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-rust">
              ABOUT
            </p>
            <div aria-hidden="true" className="h-px flex-1 bg-tan" />
          </div>
          <h1
            className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-6xl lg:text-7xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Forty years of honest plumbing.
          </h1>
          <p className="mt-8 max-w-md font-sans text-lg text-navy sm:text-xl">
            A family business rooted in Stockdale, Texas. We pick up the phone,
            we show up when we say we will, and we do the work right.
          </p>
        </div>

        {/* Right column — documentary photo placeholder (real photo to come) */}
        <div
          aria-hidden="true"
          className="h-64 w-full rounded-lg bg-charcoal sm:h-96 lg:h-[70vh]"
        />
      </section>

      {/* SECTION 2 — The Mission (rupture visuelle: dark, centered, generous) */}
      <section
        aria-label="Our mission"
        className="bg-navy py-24 text-cream sm:py-32"
      >
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
          <p className="mb-12 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            01 · OUR MISSION
          </p>
          <blockquote
            className="font-serif text-3xl font-medium leading-[1.2] text-cream sm:text-4xl lg:text-5xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            <span className="text-tan text-[1.2em]">&ldquo;</span>We were born
            out of a desire to build something lasting for our family — to show
            the value of perseverance and good, quality, precise work.
            <span className="text-tan text-[1.2em]">&rdquo;</span>
          </blockquote>
          <p className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            — The Patriot Plumbing family
          </p>
        </div>
      </section>

      {/* SECTION 3 — The Family */}
      <section
        aria-label="The family"
        className="bg-cream py-20 sm:py-24"
      >
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            02 · THE FAMILY
          </p>
          <h2
            className="mb-8 font-serif text-3xl font-semibold text-navy sm:text-4xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            A father, a daughter, and a son-in-law.
          </h2>
          <div className="space-y-6 font-sans text-lg leading-relaxed text-navy/90">
            <p>
              Patriot Plumbing has been a family business since 1983. What
              started as one plumber&apos;s commitment to doing the work right
              has grown into a family operation — a father, a daughter, and her
              husband, working side by side in the business they&apos;re
              building together.
            </p>
            <p>
              Family-owned means decisions stay close. There&apos;s no corporate
              office to call. There&apos;s no franchise model to follow. When
              you call us, you reach the same family that&apos;s served Wilson
              County for over forty years.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — The Work */}
      <section
        aria-label="The work"
        className="bg-cream py-20 sm:py-24"
      >
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            03 · THE WORK
          </p>
          <h2
            className="mb-8 font-serif text-3xl font-semibold text-navy sm:text-4xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            How we do what we do.
          </h2>
          <div className="space-y-6 font-sans text-lg leading-relaxed text-navy/90">
            <p>
              We approach plumbing the way our father approached it — and his
              work has been our north star since 1983.
            </p>
            <p>
              First : we diagnose before we fix. A symptom isn&apos;t the
              problem. We find the root cause and explain it before we quote.
            </p>
            <p>
              Second : we don&apos;t upsell. If a repair is the right answer, we
              won&apos;t pitch a replacement. If a part doesn&apos;t need
              replacing, we won&apos;t replace it. That&apos;s how we sleep at
              night.
            </p>
            <p>
              Third : we put it in writing. Every estimate, every warranty,
              every recommendation. If we say it, we sign it.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — The Place */}
      <section
        aria-label="The place"
        className="bg-cream py-20 sm:py-24"
      >
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            04 · THE PLACE
          </p>
          <h2
            className="mb-8 font-serif text-3xl font-semibold text-navy sm:text-4xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Stockdale, Texas.
          </h2>
          <div className="space-y-6 font-sans text-lg leading-relaxed text-navy/90">
            <p>
              Our roots are in Stockdale — a small town in Wilson County, about
              an hour southeast of San Antonio. We know the soil, we know the
              slabs, we know the wells, and we know the families who built this
              place.
            </p>
            <p>
              We serve South-Central Texas — Stockdale, Sutherland Springs,
              Floresville, La Vernia, Geronimo, McQueeney, Seguin, San Marcos,
              and New Braunfels. If you&apos;re somewhere in between, call us. We
              probably get there.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — The Promise */}
      <section
        aria-label="Our promise"
        className="bg-cream py-20 sm:py-24"
      >
        <div className="mx-auto max-w-2xl px-6 sm:px-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
            05 · OUR PROMISE
          </p>
          <h2
            className="mb-12 font-serif text-3xl font-semibold text-navy sm:text-4xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            What you get when you call us.
          </h2>
          <ul className="list-none space-y-4">
            {promises.map((promise) => (
              <li key={promise} className="flex items-start gap-4">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-1 h-[18px] w-[18px] shrink-0 text-rust"
                >
                  <path d="m9 6 6 6-6 6" />
                </svg>
                <span className="font-sans text-lg leading-relaxed text-navy">
                  {promise}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 7 — Final CTA (narrative-style, centered) */}
      <section
        aria-label="Ready to call"
        className="bg-cream py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <h2
            className="mb-6 font-serif text-4xl font-semibold text-navy sm:text-5xl lg:text-6xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Ready when you are.
          </h2>
          <p className="mb-10 font-sans text-lg text-navy sm:text-xl">
            We answer the phone Monday through Friday, 8 AM to 5 PM.
          </p>
          <a
            href="tel:+12108571727"
            className="inline-flex items-center justify-center rounded-full bg-rust px-8 py-4 font-sans text-base font-medium text-cream transition-colors hover:bg-rust/90 sm:text-lg"
          >
            Call (210) 857-1727
          </a>
        </div>
      </section>

      <Footer services={services} />
    </>
  );
}
