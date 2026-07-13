import Image from "next/image";
import Link from "next/link";
import { business } from "@/data/business";

export default function SiteNav() {
  return (
    <nav
      aria-label="Site navigation"
      className="sticky top-0 z-50 border-b border-tan/30 bg-cream/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-10">
        {/* Brand — logo + wordmark, links to home */}
        <Link href="/" className="inline-flex items-center gap-3">
          <Image
            src="/logo/patriot-mono.svg"
            alt="Patriot Plumbing logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span
            className="hidden font-serif text-xl font-semibold text-navy sm:inline sm:text-2xl"
            style={{ fontVariationSettings: "'opsz' 96, 'SOFT' 50" }}
          >
            Patriot Plumbing
          </span>
        </Link>

        {/* Right cluster — nav links + CTA */}
        <div className="flex items-center gap-5 sm:gap-8">
          <Link
            href="/about"
            className="font-mono text-xs uppercase tracking-[0.2em] text-navy transition-colors hover:text-rust"
          >
            About
          </Link>
          <Link
            href="/work"
            className="font-mono text-xs uppercase tracking-[0.2em] text-navy transition-colors hover:text-rust"
          >
            Work
          </Link>
          <Link
            href="/book"
            className="font-mono text-xs uppercase tracking-[0.2em] text-navy transition-colors hover:text-rust"
          >
            Book
          </Link>
          <a
            href={`tel:${business.telephone}`}
            className="inline-flex items-center gap-2 rounded-full bg-rust px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:bg-rust/90"
          >
            Call
            <span className="hidden font-mono normal-case tracking-normal sm:inline">
              {business.telephoneDisplay}
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
