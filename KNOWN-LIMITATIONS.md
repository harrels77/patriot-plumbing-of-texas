# Known Limitations

This document lists features that are intentionally incomplete in the current MVP, with reasons and plans to address them.

## Contact form — email backend not connected

**Status**: Deferred.
**Date**: 2026-05-31.

**What's missing**: the contact form UI exists, but submitting it does not send an email. The submit button is disabled or shows a "coming soon" state.

**Why**: Resend's free tier only allows one verified domain per account. The developer already has another active project using their Resend domain slot. Adding a new domain would require either:
- Purchasing a Patriot Plumbing domain ($10-12/year) and adding it to Resend in place of the current one (would disable the other project)
- Upgrading Resend to a paid tier ($20/month, out of budget)

**Current workaround**: visitors are directed to call (210) 857-1727 or use a `mailto:` link on the Contact page.

**Plan to unblock**: when a Patriot Plumbing domain is purchased, add it to Resend, then connect the contact form. Estimated effort: ~1 hour of integration work.
