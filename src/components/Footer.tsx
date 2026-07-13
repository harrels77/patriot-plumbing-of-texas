import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types/service";
import { serviceAreas } from "@/data/service-areas";

type FooterProps = {
  services: Service[];
};

export default function Footer({ services }: FooterProps) {
  return (
    /* Footer — contact, services, service areas, and copyright */
    <footer aria-label="Site footer" className="bg-navy py-16 text-cream sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* 3-column grid */}
        <div className="mb-12 grid grid-cols-1 gap-12 lg:mb-16 lg:grid-cols-3 lg:gap-16">
          {/* Column 1 — Contact */}
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-tan">
              CONTACT
            </p>
            <Image
              src="/logo/patriot-cream.svg"
              alt="Patriot Plumbing of Texas logo"
              width={80}
              height={80}
              className="mb-4 h-20 w-20"
            />
            <p className="mb-4 font-serif text-lg text-cream">
              Patriot Plumbing of Texas, LLC
            </p>
            <p className="mb-4 font-sans text-sm leading-relaxed text-cream/80">
              202 Cannon Lane
              <br />
              Stockdale, TX 78160
            </p>
            <a
              href="tel:+12108571727"
              className="mb-2 block font-sans text-base text-cream transition-colors hover:text-rust"
            >
              (210) 857-1727
            </a>
            <p className="font-sans text-sm text-cream/80">
              Mon–Fri · 8 AM – 5 PM
            </p>
            {/* Quick links — divider sets them apart from the address block above */}
            <span
              aria-hidden="true"
              className="mt-6 block h-px w-16 bg-cream/15"
            />
            <Link
              href="/book"
              className="mt-6 block font-sans text-base text-cream/80 transition-colors hover:text-rust"
            >
              Book Online
            </Link>
            <Link
              href="/contact"
              className="mt-2 block font-sans text-base text-cream/80 transition-colors hover:text-rust"
            >
              Contact
            </Link>
          </div>

          {/* Column 2 — Services (reuses the module-scope services array) */}
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-tan">
              SERVICES
            </p>
            <ul className="list-none space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="font-sans text-base text-cream/80 transition-colors hover:text-rust"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Service Areas (plain text; Service Areas page not built yet) */}
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-tan">
              SERVICE AREAS
            </p>
            <ul className="list-none space-y-3 font-sans text-base text-cream/80">
              {serviceAreas.map((area) => (
                <li key={area.city}>{area.city}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-cream/15" />
        <p className="pt-8 font-sans text-xs text-cream/60 sm:text-sm">
          © {new Date().getFullYear()} Patriot Plumbing of Texas, LLC · Serving
          South-Central Texas ·{" "}
          <Link
            href="/privacy"
            className="transition-colors hover:text-rust"
          >
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  );
}
