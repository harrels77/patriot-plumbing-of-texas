// WhatWeDo — the "scope" section. An editorial grid of sub-services, each
// numbered and described, so homeowners understand what's covered.

import type { WhatWeDoItem } from "@/types/service-page";

type WhatWeDoProps = {
  eyebrow: string;
  title: string;
  items: WhatWeDoItem[];
};

export default function WhatWeDo({ eyebrow, title, items }: WhatWeDoProps) {
  return (
    <section
      aria-label="What we cover"
      className="mx-auto max-w-7xl bg-cream px-6 py-20 sm:px-10 sm:py-24"
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
        {eyebrow}
      </p>
      <h2
        className="mb-16 font-serif text-4xl font-semibold text-navy sm:text-5xl"
        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
      >
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              className="font-serif text-2xl font-semibold text-navy"
              style={{ fontVariationSettings: "'opsz' 96, 'SOFT' 50" }}
            >
              {item.title}
            </h3>
            <p className="font-sans text-base leading-relaxed text-navy/80">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
