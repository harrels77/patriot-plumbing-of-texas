export default function Home() {
  return (
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
            Honest plumbing. Three generations.
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
  );
}
