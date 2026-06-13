// ServicePageHero — the top section of every individual service page.
// Mirrors the home hero's asymmetric editorial layout, but slightly shorter
// (70vh vs 85vh) so it reads as a section header rather than a landing splash.

type ServicePageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export default function ServicePageHero({
  eyebrow,
  title,
  subtitle,
}: ServicePageHeroProps) {
  // Split the eyebrow into the SERVICES label (rust) and the section number (tan),
  // e.g. "SERVICES · 02" -> "SERVICES" + "02".
  const [label, ...rest] = eyebrow.split(" · ");
  const tail = rest.join(" · ");

  return (
    <section
      aria-label="Service hero"
      className="mx-auto grid min-h-[70vh] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-16"
    >
      {/* Left column — eyebrow, headline, subtitle, CTA */}
      <div className="flex max-w-xl flex-col">
        {/* Eyebrow + headline grouped tight, same pattern as the home hero */}
        <div>
          <div className="mb-6 flex items-center gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em]">
              <span className="text-rust">{label}</span>
              {tail && <span className="text-tan"> · {tail}</span>}
            </p>
            <div aria-hidden="true" className="h-px flex-1 bg-tan" />
          </div>
          <h1
            className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-6xl lg:text-7xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            {title}
          </h1>
        </div>

        <p className="mt-8 max-w-md font-sans text-lg leading-relaxed text-navy sm:text-xl">
          {subtitle}
        </p>

        <a
          href="tel:+12108571727"
          className="mt-8 inline-flex items-center justify-center self-start rounded-full bg-rust px-6 py-3 font-sans text-base font-medium text-cream transition-colors hover:bg-rust/90"
        >
          Call (210) 857-1727
        </a>
      </div>

      {/* Right column — documentary photo placeholder (real photo to come) */}
      <div
        aria-hidden="true"
        className="h-64 w-full rounded-lg bg-charcoal sm:h-96 lg:h-[70vh]"
      />
    </section>
  );
}
