import Footer from "@/components/Footer";
import { services } from "@/data/services";
import { business } from "@/data/business";

// Tier-2 services — mentioned on the home page only, no cards or detail pages.
const additionalServices = [
  "Tankless water heater installation",
  "Toilet repair",
  "Leak detection",
  "Water filtration",
  "Faucet repair",
  "Garbage disposal",
  "Bathroom plumbing remodel",
  "Water well systems",
];

export default function Home() {
  return (
    <>
    <section className="mx-auto grid min-h-[85vh] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-16 lg:py-0">
      {/* Left column — headline, subtitle, CTAs, service line */}
      <div className="flex max-w-xl flex-col gap-10">
        {/* Editorial eyebrow + headline — grouped so the eyebrow sits tight above the h1 */}
        <div>
          <div className="mb-6 flex items-center gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em]">
              <span className="text-rust">EST. 1983</span>{" "}
              <span className="text-tan">· STOCKDALE, TEXAS</span>
            </p>
            <div aria-hidden="true" className="h-px flex-1 bg-tan" />
          </div>
          <h1
            className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-6xl lg:text-7xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Honest plumbing. Forty years.
          </h1>
        </div>

        <p className="max-w-md font-sans text-lg leading-relaxed text-navy sm:text-xl">
          Family-owned, Wilson County-rooted. Trusted plumbing since 1983.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="tel:+12108571727"
            className="inline-flex items-center justify-center rounded-full bg-rust px-6 py-3 font-sans text-base font-medium text-cream transition-colors hover:bg-rust/90"
          >
            Call (210) 857-1727
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-navy px-6 py-3 font-sans text-base font-medium text-navy transition-colors hover:bg-navy hover:text-cream"
          >
            Book Online
          </button>
        </div>

        <p className="font-mono text-xs tracking-tight text-tan sm:text-sm">
          Currently serving Stockdale · La Vernia · Seguin · Floresville +
          surrounding communities
        </p>
      </div>

      {/* Right column — photo placeholder (real documentary photo to come) */}
      <div
        aria-hidden="true"
        className="h-64 w-full rounded-xl bg-charcoal sm:h-96 lg:h-[70vh]"
      />
    </section>

    {/* Mission encart — rupture navy, the family's mission statement */}
    <section aria-label="Our mission" className="bg-navy py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
        <p className="mb-12 font-mono text-xs uppercase tracking-[0.2em] text-tan">
          02 · OUR MISSION
        </p>
        <blockquote
          className="font-serif text-3xl font-medium leading-[1.2] text-cream sm:text-4xl lg:text-5xl"
          style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
        >
          <span className="text-tan text-[1.2em]">&ldquo;</span>
          {business.mission.quote}
          <span className="text-tan text-[1.2em]">&rdquo;</span>
        </blockquote>
        <p className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-tan">
          {`— ${business.mission.attribution}`}
        </p>
      </div>
    </section>

    {/* Services Overview — array-driven grid of the six core services */}
    <section aria-label="Our services" className="bg-cream py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Heading block */}
        <div className="mb-12 lg:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-tan">
            03 · OUR SERVICES
          </p>
          <h2
            className="mt-6 font-serif text-4xl font-semibold text-navy sm:text-5xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Our Services
          </h2>
        </div>

        {/* Card grid — rendered by mapping over the services array */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {services.map((service) => (
            <a
              key={service.number}
              href={service.href}
              aria-label={`Learn more about ${service.title}`}
              className="group flex flex-col gap-6"
            >
              {/* Photo placeholder — documentary photo to come */}
              <div
                aria-hidden="true"
                className="aspect-[4/3] w-full rounded-lg bg-charcoal"
              />

              {/* Section number */}
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust">
                {service.number}
              </span>

              {/* Service title */}
              <h3
                className="font-serif text-2xl font-semibold text-navy sm:text-3xl"
                style={{ fontVariationSettings: "'opsz' 96, 'SOFT' 50" }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-base leading-relaxed text-navy/80">
                {service.description}
              </p>

              {/* Learn more affordance — arrow shifts on hover */}
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-navy">
                Learn more
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* Also Handled — tier-2 services, a lighter editorial beat (no cards, no detail pages) */}
    <section aria-label="Additional services" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial eyebrow */}
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-tan">
          04 · ALSO HANDLED
        </p>

        {/* Intro line — intentionally smaller than the main Services Overview heading */}
        <p
          className="mb-8 font-serif text-2xl font-semibold text-navy sm:text-3xl"
          style={{ fontVariationSettings: "'opsz' 96, 'SOFT' 50" }}
        >
          We also handle
        </p>

        {/* Tier-2 services rendered as a single flowing block, middot-separated */}
        <p className="mb-8 max-w-3xl font-sans text-lg leading-relaxed text-navy/90 sm:text-xl">
          {additionalServices.join(" · ")}
        </p>

        {/* Editorial closing line — arrow shifts on hover, same pattern as the service cards */}
        <a
          href="tel:+12108571727"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-navy"
        >
          Call us with any plumbing need
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>
    </section>

    {/* About teaser — asymmetric cream, photo on LEFT, text on RIGHT (inverse of hero) */}
    <section aria-label="About teaser" className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        {/* Left column — documentary photo placeholder (real photo to come) */}
        <div
          aria-hidden="true"
          className="aspect-square w-full rounded-lg bg-charcoal"
        />

        {/* Right column — eyebrow, headline, body, link */}
        <div className="flex flex-col">
          <div className="mb-6 flex items-center gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-tan">
              05 · ABOUT US
            </p>
            <div aria-hidden="true" className="h-px flex-1 bg-tan" />
          </div>
          <h2
            className="font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl lg:text-5xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Family-owned. Forty years strong.
          </h2>
          <p className="mt-8 mb-8 max-w-md font-sans text-lg leading-relaxed text-navy/90">
            Patriot Plumbing started in 1983 as one plumber&apos;s commitment to
            doing the work right. Today, it&apos;s a family operation — a father,
            a daughter, and her husband — still rooted in Stockdale.
          </p>
          <a
            href="/about"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-navy hover:text-rust transition-colors"
          >
            Read our story
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>

    {/* Work teaser — centered cream, no cards */}
    <section aria-label="Work teaser" className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-tan">
          06 · OUR WORK
        </p>
        <h2
          className="mb-6 font-serif text-3xl font-semibold text-navy sm:text-4xl lg:text-5xl"
          style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
        >
          A record, kept in writing.
        </h2>
        <p className="mb-8 font-sans text-lg leading-relaxed text-navy/90 sm:text-xl">
          We&apos;re building a public record of the jobs we do — so future
          clients can see what they&apos;re getting before they call.
        </p>
        <a
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-navy hover:text-rust transition-colors"
        >
          See our work
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>
    </section>

    {/* Final CTA — closing call-to-action driving phone calls */}
    <section aria-label="Get in touch" className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        {/* Editorial eyebrow */}
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-tan">
          07 · GET IN TOUCH
        </p>

        {/* Headline */}
        <h2
          className="mb-6 font-serif text-4xl font-semibold text-navy sm:text-5xl lg:text-6xl"
          style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
        >
          Need a plumber? We&apos;re here.
        </h2>

        {/* Subtitle */}
        <p className="mb-10 font-sans text-lg text-navy sm:text-xl">
          Family-owned, Wilson County-rooted. Mon–Fri 8 AM–5 PM.
        </p>

        {/* CTA button — slightly more generous padding than the hero button */}
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
