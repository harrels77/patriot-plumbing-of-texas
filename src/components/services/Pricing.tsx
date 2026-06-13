// Pricing — the "what it costs" section. A narrow prose column for honest,
// quality-focused pricing language (no discount/"cheap" framing).

type PricingProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export default function Pricing({ eyebrow, title, body }: PricingProps) {
  // Double line-breaks delimit paragraphs.
  const paragraphs = body.split("\n\n").filter((p) => p.trim().length > 0);

  return (
    <section
      aria-label="Pricing and estimates"
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

      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className="mb-6 font-sans text-lg leading-relaxed text-navy/90"
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
}
