import Link from "next/link";
import Footer from "@/components/Footer";
import { services } from "@/data/services";
import { business } from "@/data/business";

export default function NotFound() {
  return (
    <>
      {/* 01 — Hero (editorial, centered) */}
      <section
        aria-label="Page not found"
        className="bg-cream py-24 sm:py-32 lg:py-40"
      >
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-rust">
            404 · NOT FOUND
          </p>

          <h1
            className="mb-8 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-6xl lg:text-7xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            We can&apos;t find that page.
          </h1>

          <p className="mx-auto mb-12 max-w-xl font-sans text-lg leading-relaxed text-navy/90 sm:text-xl">
            It might have moved, or maybe it never existed. Either way, let&apos;s
            get you back on track.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-rust px-8 py-4 font-sans text-base font-medium text-cream transition-colors hover:bg-rust/90 sm:text-lg"
            >
              Back to home
            </Link>

            <a
              href={`tel:${business.telephone}`}
              className="inline-flex items-center justify-center rounded-full border border-navy/30 px-8 py-4 font-sans text-base font-medium text-navy transition-colors hover:border-rust hover:text-rust sm:text-lg"
            >
              Call {business.telephoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* 02 — Footer */}
      <Footer services={services} />
    </>
  );
}
