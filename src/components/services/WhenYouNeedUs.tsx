// WhenYouNeedUs — the "signs it's time to call" section. A scannable list of
// homeowner-facing symptoms, each prefixed with a small rust chevron.

import type { Signal } from "@/types/service-page";

type WhenYouNeedUsProps = {
  eyebrow: string;
  title: string;
  signals: Signal[];
};

export default function WhenYouNeedUs({
  eyebrow,
  title,
  signals,
}: WhenYouNeedUsProps) {
  return (
    <section
      aria-label="When to call us"
      className="mx-auto max-w-7xl bg-cream px-6 py-20 sm:px-10 sm:py-24"
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-tan">
        {eyebrow}
      </p>
      <h2
        className="mb-12 font-serif text-4xl font-semibold text-navy sm:text-5xl"
        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
      >
        {title}
      </h2>

      <ul className="max-w-2xl list-none space-y-4">
        {signals.map((signal, i) => (
          <li key={i} className="flex items-start gap-4">
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
              {signal}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
