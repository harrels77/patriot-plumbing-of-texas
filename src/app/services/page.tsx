import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ServiceEmblem from "@/components/ServiceEmblem";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Plumbing services across South-Central Texas: water heaters, drain cleaning, repiping, sewer repair, slab leaks, gas lines, and more. Family-owned since 1983.",
};

export default function ServicesPage() {
  return (
    <>
      {/* 01 — Hero (editorial, minimal, left-aligned) */}
      <section
        aria-label="Services hero"
        className="bg-cream py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          {/* Editorial eyebrow row */}
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust">
              SERVICES
            </span>
            <span aria-hidden className="h-px flex-1 bg-tan" />
          </div>

          <h1
            className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-6xl lg:text-7xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            What we do.
          </h1>

          <p className="mt-8 max-w-xl font-sans text-lg text-navy sm:text-xl">
            Nine core services, from a slow drain to a full repipe. If you
            don&apos;t see your problem here, call us — we probably handle it.
          </p>
        </div>
      </section>

      {/* 02 — Service grid (same array-driven cards as the home page) */}
      <section aria-label="All services" className="bg-cream pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {services.map((service) => {
              // Slug lives in the href (/services/<slug>) — used for the icon emblem.
              const slug = service.href.replace("/services/", "");
              return (
              <Link
                key={service.number}
                href={service.href}
                aria-label={`Learn more about ${service.title}`}
                className="group flex flex-col gap-6"
              >
                {/* Cream panel hosting the label-less icon emblem (card shows the title) */}
                <div
                  aria-hidden="true"
                  className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-tan/40 bg-cream p-6"
                >
                  <ServiceEmblem slug={slug} icon className="w-full max-w-[200px]" />
                </div>

                {/* Section number */}
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust">
                  {service.number}
                </span>

                {/* Service title */}
                <h2
                  className="font-serif text-2xl font-semibold text-navy sm:text-3xl"
                  style={{ fontVariationSettings: "'opsz' 96, 'SOFT' 50" }}
                >
                  {service.title}
                </h2>

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
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 — Closing CTA (phone stays the primary action) */}
      <section aria-label="Get in touch" className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <h2
            className="mb-6 font-serif text-3xl font-semibold text-navy sm:text-4xl lg:text-5xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Not sure which one you need?
          </h2>
          <p className="mb-10 font-sans text-lg text-navy sm:text-xl">
            Describe the problem and we&apos;ll figure it out together.
            Mon–Fri, 8 AM – 5 PM.
          </p>
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
