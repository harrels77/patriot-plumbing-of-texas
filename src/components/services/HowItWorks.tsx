// HowItWorks — the "process" section. Rendered on a navy background as a
// deliberate visual rupture from the surrounding cream sections.

import type { HowItWorksStep } from "@/types/service-page";

type HowItWorksProps = {
  eyebrow: string;
  title: string;
  steps: HowItWorksStep[];
};

export default function HowItWorks({ eyebrow, title, steps }: HowItWorksProps) {
  return (
    <section
      aria-label="How it works"
      className="bg-navy py-20 text-cream sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
          {eyebrow}
        </p>
        <h2
          className="mb-12 font-serif text-4xl font-semibold text-cream sm:text-5xl lg:mb-16"
          style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col gap-3">
              <span className="font-mono text-3xl font-semibold text-rust">
                {step.number}
              </span>
              <h3 className="font-serif text-xl font-semibold text-cream">
                {step.title}
              </h3>
              <p className="font-sans text-base leading-relaxed text-cream/80">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
