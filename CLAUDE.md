# CLAUDE.md — Patriot Plumbing of Texas

## Directive

This file is the single source of truth for the Patriot Plumbing of Texas project. When any instruction in chat conflicts with what is written here, this file wins. Follow the Always and Never rules below without exception.

## Project Identity

**Title**: Patriot Plumbing of Texas — local plumbing services website.

**Purpose**: A production-quality showcase website for a family-owned plumbing business based in Stockdale, Texas. It also serves as a DevOps portfolio project for the developer.

**Primary CTA**: drive visitors to call the business. Booking and contact form are secondary paths.

## Always / Never Rules

**Always:**
- Use color tokens from the Tailwind config (`bg-cream`, `text-navy`, `bg-rust`, `text-charcoal`, `border-tan`). Never use raw hex values inline.
- Use Fraunces for display headings, Inter for body text, IBM Plex Mono for section numbers and small labels.
- Write English content first, then provide Spanish translations on the chatbot and key user-facing strings.
- Ask for explicit approval before running `git commit` or `git push`.
- Write commit messages using Conventional Commits format: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`.
- Use documentary-style photography (real Patriot Plumbing technicians, real Texas environments, golden-hour lighting). When real photos are not yet available, use charcoal rectangle placeholders (bg-charcoal) — documented in KNOWN-LIMITATIONS.md.
- Reference the real business hours (Mon–Fri 8AM–5PM, closed weekends) everywhere availability is mentioned.

**Never:**
- Use any color outside the Warm Heritage palette (Cream, Navy, Rust Red, Charcoal, Tan).
- Claim 24/7 availability anywhere on the site. The business is closed on weekends.
- Use stock plumber photos, smiling-plumber-thumbs-up stock imagery, or AI-generated photography on the website.
- Push code to the remote repository without explicit user approval.
- Include explicit religious references (God, prayer, faith, Bible verses) or political content on the site. The family's values are expressed through behavior and tone, not statements.
- Use the word "cheap" or pricing-based selling. Emphasize honest work and quality instead.
- Add features, libraries, or integrations not listed in the Tech Stack section without prior discussion.
- Implement Resend or any email-sending integration in the MVP. The contact form should exist as UI only, with a disabled or "coming soon" state on the submit button. Use mailto: links and the phone number as primary contact paths until the email backend is unblocked.

## Tech Stack

- **Frontend + Backend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- **Database**: Supabase (Postgres) — free tier
- **AI / Chatbot**: Anthropic API, model Claude Haiku 4.5 — called directly, no SDK abstraction layer
- **Maps**: Mapbox GL JS with custom brand-matched style
- **Transactional Email**: NONE for MVP. see chat for context
  See KNOWN-LIMITATIONS.md for the why and the unblock plan.
- **Hosting + CI/CD + CDN + SSL**: Vercel (Hobby tier)
- **Domain registrar**: Cloudflare
- **Code repository**: GitHub
- **CI extras**: GitHub Actions for lint / type-check / build verification

Budget cap: ~$15–18 total (domain + Anthropic API headroom). Hard spending cap of $20/month must be set on the Anthropic console.

## Direction of Project

The brand voice is humble, hardworking, and rooted in community. The business is a family operation with over 40 years of plumbing experience in Wilson County. The site should feel like a quiet, confident artisan brand — not a corporate plumbing chain, not an edgy outlaw aesthetic. Visitors should leave thinking "these people respect their craft and I can trust them with my home."

## Brand Positioning — The 40-Year Story

The business is a **family-owned, family-run plumbing operation** with forty years of work serving Wilson County. This is the heart of the brand and must be reflected everywhere — especially on the About page, which is structured as an editorial profile rather than a corporate "team" page. The About page mission is centered on the family's own words about building something lasting. The brand claim — always stated in terms of "forty years" and "family-owned," never as a generational claim — should appear at key conversion moments (Home hero, About, Footer). The Home hero claim is "Honest plumbing. Forty years."

## Theme & Visual Identity

**Aesthetic direction**: Heritage Western × Editorial Modern.

- **Heritage Western**: warm, artisan, family-owned, rooted. Reference brands: Tecovas, Filson, Yeti.
- **Editorial Modern**: magazine-style layouts, generous whitespace, large serif display typography. Reference: Texas Monthly, contemporary editorial design.

**Warm Heritage Palette** (locked):

| Role | Name | Hex |
|---|---|---|
| Background primary | Cream | `#F5F1E8` |
| Dominant text & structure | Navy | `#1B2A3C` |
| CTAs & accents | Rust Red | `#A8323A` |
| Max-contrast text | Charcoal | `#1A1614` |
| Subtle accents & dividers | Tan / Leather | `#8B6F47` |

**Guiding principle for the palette**: nothing is pure. No pure white background, no pure black text, no bright saturated red. Everything is slightly warmed to feel artisan rather than corporate.

**Typography**:
- **Fraunces** — display serif, used for headlines and pull quotes
- **Inter** — sans-serif, used for body text and UI
- **IBM Plex Mono** — used for section numbers ("01.", "02.") and small labels

**Photography direction**:
- Documentary, not posed
- Golden hour lighting, warm tones, subtle filmic grain
- Real people working, real Texan environments
- Close-ups on craftsmanship (hands soldering copper, tools on workbenches)
- Wide environmental shots (pickup trucks, ranch homes, Wilson County landscapes)
- Never generic plumber stock photos

**UI/UX principles**:
- Generous whitespace; when in doubt, more air
- Asymmetric grids over centered layouts
- Section numbering as a recurring visual motif ("01. What we do / 02. Why families choose us")
- Pull quotes in large Fraunces italic, occasionally in Rust Red
- Full-bleed photographs for cinematic moments
- Long-form storytelling on About and individual service pages — not bullet-point brochures

**Animation principles**:
- Subtle, slow, weighted — nothing bouncy
- Fade-in on scroll for text and images
- Light parallax on large photos
- Discrete hover states (thin underline or color shift), never aggressive scaling
- If an animation does not add meaning, remove it

## Business Facts

- **Business name**: Patriot Plumbing of Texas
- **Headquarters**: 202 Cannon Lane, Stockdale, TX 78160
- **Phone**: (210) 857-1727
- **Hours**: Monday–Friday, 8:00 AM – 5:00 PM. Closed weekends.
- **Experience**: 40+ years, family-owned and family-run business
- **Languages**: English and Spanish

## Geographic Scope

The business operates across **four counties** in South-Central Texas: Wilson, Guadalupe, Hays, and Comal.

**Cities served (9 total)**, in geographic order from the Stockdale HQ:
- **Wilson County**: Stockdale (HQ), Sutherland Springs, Floresville, La Vernia
- **Guadalupe County**: Geronimo, McQueeney, Seguin
- **Hays County**: San Marcos
- **Comal County**: New Braunfels

The region is described as "South-Central Texas" in the copyright and other broad references. New Braunfels (San Antonio metro) and San Marcos (Austin orbit) are intentionally inside the service area.

**Source of truth**: `src/data/service-areas.ts`. Import the city/county list from there — never hardcode service areas in components or pages.

## Pages on the Website

MVP page list:
- Home
- Services Overview
- Six individual service pages: Emergency Plumbing (reframed for business-hours response), Water Heaters, Drain Cleaning, Repiping, Sewer Repair, Commercial Plumbing
- Service Areas (with interactive Mapbox map)
- About (editorial 40-year family story)
- Contact
- 404

There is no dedicated Reviews page. Social proof on the Home is reframed as "Forty Years of Trust" until real Google Reviews exist.

## Wow Features

**MVP**:
- Interactive Service Area Map (Mapbox GL JS, custom brand styling, ZIP-code lookup)
- Bilingual chatbot (EN/ES) powered by Anthropic Claude Haiku 4.5, with rate-limiting and cost caps

**V2 (future)**:
- Live "available now" indicator
- Real-time technician tracking (WebSockets)

## File Reading Order

This file is structured so that the most important context comes first. If only the first 50 lines are read, Claude Code should still understand: (1) what the project is, (2) the unbreakable rules, (3) the tech stack. Everything below provides depth.

