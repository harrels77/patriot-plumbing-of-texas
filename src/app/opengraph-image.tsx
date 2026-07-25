import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Dynamic Open Graph image, generated at build time and served automatically
// when the site is shared on social platforms (LinkedIn, Twitter, iMessage, …).
//
// The Patriot mark leads the card — the same full-color logo the Home hero
// shows, so a shared link is recognisable before a word is read. Satori cannot
// fetch assets over the network here, so the SVG is inlined as a data URI.
//
// Typography is loaded from Google Fonts at build time so the image renders in
// the real brand faces — Fraunces (display serif) and IBM Plex Mono (labels) —
// rather than Satori's generic fallbacks. See loadGoogleFont below.
//
// The hex values are the locked Warm Heritage brand tokens — cream, navy,
// rust, tan — not off-palette colors. Satori has no access to the Tailwind
// config, so inline styles with explicit pixel values are used throughout.

export const alt = "Patriot Plumbing of Texas — Honest plumbing, forty years.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Resolve a single font binary from the Google Fonts CSS endpoint.
//
// The versioned gstatic .woff URLs change over time, so we ask the CSS API for
// the current one at build time instead of hardcoding it. The User-Agent below
// is deliberately an older browser that does NOT advertise woff2 support: that
// makes Google serve a `.woff` file, which Satori can parse. A modern UA would
// return woff2, which Satori cannot decode.
async function loadGoogleFont(cssUrl: string): Promise<ArrayBuffer> {
  const css = await fetch(cssUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36",
    },
  }).then((res) => res.text());

  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)/);
  if (!match) {
    throw new Error(`Could not extract font URL from Google Fonts CSS: ${cssUrl}`);
  }

  return fetch(match[1]).then((res) => res.arrayBuffer());
}

// Read the brand mark off disk and inline it. Runs at build time, so the file
// is always present and the cost is paid once.
async function loadLogo(): Promise<string> {
  const svg = await readFile(join(process.cwd(), "public/logo/patriot-color.svg"));
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}

export default async function Image() {
  const logo = await loadLogo();
  const [fraunces, plexMono] = await Promise.all([
    loadGoogleFont(
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&display=swap",
    ),
    loadGoogleFont(
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&display=swap",
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5F1E8",
          padding: "80px",
          fontFamily: "Fraunces",
        }}
      >
        {/* Brand mark — the hero of the card */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={210} height={208} style={{ marginBottom: 44 }} />

        {/* Main title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "Fraunces",
            fontWeight: 600,
            fontSize: 64,
            color: "#1B2A3C",
            lineHeight: 1.05,
            textAlign: "center",
            letterSpacing: "-0.02em",
          }}
        >
          <span>PATRIOT PLUMBING</span>
          <span>OF TEXAS</span>
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: 200,
            height: 2,
            background: "#8B6F47",
            marginTop: 36,
            marginBottom: 32,
          }}
        />

        {/* Bottom tagline */}
        <div
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: 32,
            color: "#A8323A",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Family-owned · Forty years
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Fraunces",
          data: fraunces,
          style: "normal",
          weight: 600,
        },
        {
          name: "IBM Plex Mono",
          data: plexMono,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
