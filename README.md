# Patriot Plumbing of Texas

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

> *A custom marketing website for a family-owned plumbing business in Stockdale, Texas. Personal portfolio project, real client.*

![Patriot Plumbing of Texas — Honest plumbing, forty years.](https://patriot-plumbing-of-texas.vercel.app/opengraph-image)

## Live demo

**[patriot-plumbing-of-texas.vercel.app](https://patriot-plumbing-of-texas.vercel.app)**

## About this project

I built this as both a personal portfolio project **and** a real deliverable for a family-owned plumbing business I'm close to — an operation with 40+ years of work serving Wilson County, Texas. It isn't a fictional clone or a template demo. It's a site a real business can hand to real customers, which raised the bar on every decision in it.

That constraint turned out to be the best part of the project. Building for a real business meant I couldn't lean on the usual shortcuts: no fake five-star reviews, no stock "smiling plumber with a thumbs-up" photography, no over-claiming 24/7 availability the business doesn't actually offer. When something wasn't ready — real documentary photos, or a connected email backend — I documented it honestly as a known limitation instead of faking it. The honest tone you read on the site is the same tone I held myself to while engineering it.

The result leans on an editorial design language I called **"Heritage Western × Editorial Modern"** rather than the typical contractor template. The emphasis is on restraint, typography, and brand voice: warm earth tones, a serif display face, monospace section labels, and long-form storytelling instead of bullet-point brochures. The goal was a site that reads like a quiet, confident artisan brand — something a forty-year family operation has earned.

## Tech stack

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS v4** with the CSS-first `@theme` directive
- **Vercel** for hosting and CI/CD (auto-deploy from `main`)
- **Schema.org** structured data (`Plumber` type) for SEO
- **Dynamic Open Graph images** via `next/og` (Satori)
- **Custom typography**: Fraunces (display), Inter (body), IBM Plex Mono (labels)
- **Single source of truth data modules** for services, business info, and service areas

## Features

- **14 pages**: home, about, work gallery, contact, a custom 404, and 9 individual service pages
- Sticky top navigation with the brand logo for cross-page consistency
- Editorial home page with a mission section, services overview, an also-handled tier, an about teaser, a work teaser, and a closing CTA
- Custom favicon, cropped from the brand logo
- Dynamic 1200×630 Open Graph image generated at build time
- Contact form shell with React state management (UI complete, email backend deferred)
- Mobile-responsive throughout
- Production build validated (`npm run build` passes clean)
- 9 sitemap entries auto-generated from the services data
- `robots.txt` auto-generated

## Screenshots

![Home page hero](./docs/screenshots/home.png)
![Service page detail](./docs/screenshots/water-heaters.png)

*Screenshots available in the live site. Replace these paths with actual files in `docs/screenshots/` when added.*

## Architecture decisions

### Server Components by default
Next.js App Router renders everything on the server unless explicitly opted out with `"use client"`. The only client components in this project are `ContactForm` (uses `useState`) and `FloatingCallButton` (uses a scroll listener). Everything else — including the navigation, footer, and all service pages — is fully server-rendered, keeping the bundle small. The `/contact` route ships 1.84 kB of JS; every other route ships 0 B.

### Single source of truth data architecture
Service definitions, business info, and service areas all live in `/src/data/*` modules. The services array drives: home page cards, footer links, contact form dropdown, `sitemap.xml`, Schema.org structured data, and individual service pages. Adding a new service requires editing one file.

### Heritage Western × Editorial Modern design system
A warm earth-tone palette (cream, navy, rust, tan, charcoal) with a serif-display-and-monospace-labels typography hierarchy. Locked in `globals.css` via Tailwind v4's `@theme` directive. The design takes cues from Texas Monthly and Tecovas — premium, restrained, story-driven.

### Shared service section components
9 service pages, but only 6 section components built once and composed via props. Each service page is roughly 40 lines of declarative JSX that passes content to shared components.

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with SiteNav, Footer
│   ├── page.tsx                # Home (8 sections)
│   ├── about/page.tsx
│   ├── work/page.tsx           # Project gallery (empty state ready)
│   ├── contact/page.tsx
│   ├── not-found.tsx           # Custom 404
│   ├── opengraph-image.tsx     # Dynamic 1200x630 OG image
│   ├── icon.svg                # Favicon (cropped from logo)
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── robots.ts               # Auto-generated robots.txt
│   ├── globals.css             # Tailwind v4 @theme tokens
│   └── services/               # 9 service pages
├── components/
│   ├── SiteNav.tsx             # Sticky top nav with logo
│   ├── Footer.tsx              # 3-column footer
│   ├── FloatingCallButton.tsx  # Scroll-aware floating CTA
│   ├── ContactForm.tsx         # Client component with useState
│   ├── StructuredData.tsx      # Schema.org JSON-LD
│   └── services/               # 6 shared section components
├── data/                       # Single source of truth modules
│   ├── services.ts
│   ├── service-areas.ts
│   ├── business.ts
│   └── projects.ts
└── types/
public/
└── logo/                       # Brand logo (3 variants)
```

## Local development

```bash
# Clone and install
git clone https://github.com/harrels77/patriot-plumbing-of-texas.git
cd patriot-plumbing-of-texas
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Build for production (run this before pushing — Vercel will use this exact command)
npm run build
```

## Deployment

The site auto-deploys to Vercel on every push to `main`. The build command is `npm run build`. No environment variables are required for the current feature set.

## What I learned

1. **Server vs Client Components in Next.js App Router**: I learned to default to server components and only opt into "use client" when forced by hooks (`useState`) or browser APIs (scroll, click). The result is a build where most routes ship 0 B of JavaScript — only the contact form ships any client-side code.

2. **Building for a business, not just a portfolio**: Real constraints (no professional photos yet, no email backend ready, claims that must be verifiable) forced cleaner engineering. I built an empty-state-ready gallery instead of faking projects. I built a contact form shell instead of pretending the email worked. Honesty as architecture.

3. **Documentation drift is real and recursive**: When I changed the brand claim from "three generations" to "family-owned, forty years", I had to chase that claim through 10+ files and CLAUDE.md three times before the doc was conceptually consistent. Find-and-replace catches the words; it does not catch the synonyms ("multi-generational", "across generations"). Doc drift compounds — fix it as soon as it appears.

4. **Dev vs Build environments matter**: `npm run dev` is permissive — it allows ESLint warnings and even some errors. `npm run build` is strict. A Vercel deployment fails on rules `npm run dev` ignores. I now run `npm run build` locally before every push that touches new files or new patterns.

5. **YAGNI (You Aren't Gonna Need It)**: I almost built a filter UI for the project gallery before any projects existed. I caught myself, removed it, and shipped an empty state instead. Over-engineering the empty case is wasted effort. Build the structure; ship the empty state honestly.

6. **Data-driven architecture compounds**: Extracting `services.ts` as the single source of truth meant that adding a 9th service (Gas Line Repair) required exactly one edit: pushing a new object to the services array. That one edit propagated to the home page cards, the footer links, the contact dropdown, the sitemap, the Schema.org JSON-LD, and the individual service page route. Compare this to a templated approach with 9 hardcoded service mentions.

7. **Editorial design restraint**: Empty space is design. The hero has one eyebrow, one headline, one subtitle, and one logo — nothing else. Most contractor sites pack the hero with badges, reviews, certifications, multiple CTAs, and a stock photo. The restraint reads as confidence.

## Roadmap

Future work includes integrating a Mapbox interactive service area map, a bilingual EN/ES chatbot powered by Claude Haiku 4.5, real photography of the family and the work, and the Resend email integration once the domain slot frees up.

## License & credits

- **Code**: MIT License — see [LICENSE](./LICENSE)
- **Logo**: © Patriot Plumbing of Texas (used with consideration; original CorelDRAW file by Kelly, 2021)
- **Built by**: Simon Harrel Siko — a portfolio project for a family-owned business I'm close to
