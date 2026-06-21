import type { Metadata } from "next";
import Footer from "@/components/Footer";
import BookingChat from "@/components/BookingChat";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Book a Visit",
  description:
    "Schedule a plumbing visit with Patriot Plumbing of Texas. Family-owned, serving South-Central Texas. We answer Monday through Friday.",
};

export default function BookPage() {
  return (
    <>
      {/* Section 1 — Hero (editorial) */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust">
              BOOK ONLINE
            </span>
            <div aria-hidden="true" className="h-px flex-1 bg-tan" />
          </div>
          <h1
            className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Let&apos;s get you scheduled.
          </h1>
          <p className="mt-6 max-w-xl font-sans text-lg text-navy/90">
            Tell us what&apos;s going on and where you are. We serve South-Central
            Texas, Monday through Friday. Se habla español.
          </p>
        </div>
      </section>

      {/* Section 2 — Chat */}
      <section className="bg-cream pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <BookingChat />
        </div>
      </section>

      {/* Section 3 — Footer */}
      <Footer services={services} />
    </>
  );
}
