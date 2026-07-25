# Known Limitations

This document lists features that are intentionally incomplete in the current MVP, with reasons and plans to address them.

## Contact form — email backend not connected

**Status**: Partially unblocked (lead capture works; email does not).
**Date**: 2026-05-31. **Updated**: 2026-07-13.

**What's missing**: the contact form does not send an email. The form itself WORKS: submissions POST to `/api/contact`, which saves the lead to Supabase (deduped by phone — the same `leads` table the booking assistant uses) and alerts the plumber on Telegram. No submission is lost.

**Why no email**: Resend's free tier only allows one verified domain per account. The developer already has another active project using their Resend domain slot. Adding a new domain would require either:
- Purchasing a Patriot Plumbing domain ($10-12/year) and adding it to Resend in place of the current one (would disable the other project)
- Upgrading Resend to a paid tier ($20/month, out of budget)

**Current workaround**: none needed for lead capture — every submission reaches the plumber via Telegram and is stored in Supabase. Email is simply not a channel yet; the success panel points visitors to the phone and to /book.

**Plan to unblock**: when a Patriot Plumbing domain is purchased, add it to Resend, then send a notification email in addition to the Telegram alert. Estimated effort: ~1 hour of integration work.

## Service section photos — placeholders for MVP

**Status**: Deferred.
**Date**: 2026-06-13.

**What's missing**: the homepage Services Overview section (and individual service pages) use solid charcoal rectangles as photo placeholders. No real photography is in use yet.

**Why**: the project's design direction requires documentary-style photos of real Patriot Plumbing technicians in real Texas environments. The developer does not yet have access to these assets and stock photography is explicitly disallowed by the brand guidelines in CLAUDE.md.

**Current workaround**: each service card renders a charcoal rectangle in the photo slot. Visually, the cards still feel structured and editorial thanks to typography, numbering, and layout — they do not look "broken", just photo-less.

**Plan to unblock**: when the developer can request and receive real documentary photos from the business owner, the placeholder rectangles will be replaced one-by-one. The component structure already accepts an optional photo source per service, so the swap is a content change, not a code change. Estimated effort: ~30 minutes per service once photos are available.
