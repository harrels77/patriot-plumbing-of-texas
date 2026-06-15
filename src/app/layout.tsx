import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import FloatingCallButton from "@/components/FloatingCallButton";
import StructuredData from "@/components/StructuredData";
import SiteNav from "@/components/SiteNav";
import { business } from "@/data/business";

// Display serif — headings and pull quotes. Variable font, full weight range.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  // Expose Fraunces' variable axes (optical size + softer letterforms) so
  // headlines can use fontVariationSettings for an editorial, premium feel.
  axes: ["SOFT", "opsz", "WONK"],
});

// Body + UI sans. Variable font, full weight range.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Section numbers and small labels. Not a variable font — explicit weights required.
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: `${business.shortName} — Honest plumbing in South-Central Texas since 1983`,
    template: `%s — ${business.shortName}`,
  },
  description: business.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: business.url,
    siteName: business.shortName,
    title: `${business.shortName} — Honest plumbing in South-Central Texas since 1983`,
    description: business.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.shortName} — Honest plumbing in South-Central Texas since 1983`,
    description: business.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <SiteNav />
        {children}
        <FloatingCallButton />
        <StructuredData />
      </body>
    </html>
  );
}
