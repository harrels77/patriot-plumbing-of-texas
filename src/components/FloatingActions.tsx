"use client";

import { useEffect, useState } from "react";

// Floating call button — site-wide, fixed bottom-right. Stays out of the way
// until the visitor scrolls past the hero, then fades in as a persistent way
// to reach the primary CTA (calling the business).
export default function FloatingCallButton() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hysteresis: reveal once past 300px, hide again only near the very top
    // (<100px). Between the two thresholds the current state is preserved so
    // the button doesn't flicker around the boundary.
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
    <a
      href="tel:+12108571727"
      aria-label="Call Patriot Plumbing of Texas at (210) 857-1727"
      className={`fixed bottom-4 right-4 z-50 inline-flex w-[110px] items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-3 font-sans text-sm font-medium text-cream shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl sm:bottom-6 sm:right-6 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
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
  );
}
