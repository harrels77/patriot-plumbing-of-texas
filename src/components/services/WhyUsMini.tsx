// WhyUsMini — a condensed trust section for service pages, pointing to the
// full editorial About page. Reinforces the multi-generational family story.

type WhyUsMiniProps = {
  eyebrow: string;
  title: string;
  body: string;
  aboutHref: string;
};

export default function WhyUsMini({
  eyebrow,
  title,
  body,
  aboutHref,
}: WhyUsMiniProps) {
  // Support optional multi-paragraph bodies (split on double line-breaks).
  const paragraphs = body.split("\n\n").filter((p) => p.trim().length > 0);

  return (
    <section
      aria-label="Why us"
      className="mx-auto max-w-3xl bg-cream px-6 py-20 sm:px-10 sm:py-24"
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
        {eyebrow}
      </p>
      <h2
        className="mb-8 font-serif text-4xl font-semibold text-navy sm:text-5xl"
        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
      >
        {title}
      </h2>

      <div className="mb-8 space-y-6">
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="font-sans text-lg leading-relaxed text-navy/90"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <a
        href={aboutHref}
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-navy"
      >
        Learn more about us
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </section>
  );
}
