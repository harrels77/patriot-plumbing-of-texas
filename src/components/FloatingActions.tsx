"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Floating action stack — site-wide, fixed bottom-right. Stays out of the way
// until the visitor scrolls past the hero, then fades in as a persistent way
// to reach the primary CTA (calling the business), with a quieter shortcut to
// the online booking assistant sitting just above it.
export default function FloatingActions() {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Hysteresis: reveal once past 300px, hide again only near the very top
    // (<100px). Between the two thresholds the current state is preserved so
    // the buttons don't flicker around the boundary.
    const handleScroll = () => {
      const y = window.scrollY;
      setVisible((prev) => {
        if (y > 300) return true;
        if (y < 100) return false;
        return prev;
      });
    };

    handleScroll(); // sync state in case the page loads already scrolled
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 transition-opacity duration-300 sm:bottom-6 sm:right-6 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Booking shortcut — hidden on /book itself, where it would only point
          at the page the visitor is already on. */}
      {pathname !== "/book" && (
        <Link
          href="/book"
          aria-label="Book an appointment online"
          className="inline-flex w-[110px] items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 font-sans text-sm font-medium text-cream shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
          Book
        </Link>
      )}

      <a
        href="tel:+12108571727"
        aria-label="Call Patriot Plumbing of Texas at (210) 857-1727"
        className="inline-flex w-[110px] items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-3 font-sans text-sm font-medium text-cream shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="shrink-0"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Call
      </a>
    </div>
  );
}
