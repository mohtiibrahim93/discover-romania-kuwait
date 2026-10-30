# Roadmap — Discover Romania Kuwait

## Done
- Trilingual public site (EN/AR-RTL/RO), URL-based locale with header language switcher
- Trip-request form → `trip_inquiries` (server-side insert, reference codes, no fake success)
- Staff area: `/auth`, `/admin` (lead pipeline), `/admin/team` (owner-managed roles)
- Sign-in methods: email/password (confirmation required) plus "Continue with Lovable" on `/auth`
- Trilingual sitemap + hreflang; staff pages noindex
- Content editor at `/admin/content` for FAQ, travel styles, brand/contact, entry guidance
  (owner/editor only, trilingual completeness gate, public pages read saved rows)
- Kuwait-focused family/private-trip positioning, arrival/comfort guidance in EN/AR/RO
- Contextual WhatsApp drafts for public pages/journeys and saved-reference follow-up (real inquiry tested and test record removed)
- Entry-process claim checked against official Council conclusions; Kuwait source linked with explicit non-exemption caution (not an individual entry-eligibility check)
- Lovable Storage enabled: private `site-media` folder (20MB per file), staff read + owner/editor write rules; upload and cleanup verified
- Inquiry lead source: optional "How did you hear about us?" plus first-party utm_* tags and referring host, shown in /admin and CSV (no third-party trackers); travel-month off-by-one fix

## Open
- [ ] Canonical/sitemap/WhatsApp page links use `SITE_ORIGIN` (picture-perfect-screen-scene.lovable.app) — confirm the published domain or custom domain, then update `src/lib/seo.ts`
- [ ] Promotion readiness: verified operating arrangement and reviewed privacy/terms — waiting on operator/legal details; no invented licence or partner claims
- [ ] Native Arabic editorial review and verified Arabic-speaking support — waiting on operator confirmation
- [ ] Consent-aware inquiry/WhatsApp conversion measurement and campaign attribution — follow after privacy review; no advertising trackers yet
- [ ] Tours and day-by-day itineraries editable (needs its own collection + editor)
- [ ] Destinations editable
- [ ] Home-page editorial copy and legal pages editable
- [ ] OG/social share cards for each locale page
- [ ] Switch `site-media` to public and open visitor reads — waiting on you to allow public folders in workspace Settings → Privacy & Security; then I flip it in one step
- [ ] Licensed photography replacing the AI placeholder imagery — waiting on the operator's files
- [ ] Verified business details (email, registration, social profiles) — waiting on the operator
- [ ] Email notifications for new inquiries — needs a verified sending domain

## Review decisions
- Preserve the existing site, languages, inquiry-to-human-quote flow and required contact fields; do not rebuild or add payments/an AI chatbot.
- Existing seasonal advice, family pacing, dietary requests and passport-nationality fields already cover much of the review; improve clarity rather than duplicate them.
- Share photographs/cards, business identity, response hours and fulfilment promises must use verified operator information, not placeholders or assumptions.
- [x] Activities catalog, Ardeal & Bucovina family journey, Prices & Payment page
- [ ] Ask Romanian partner for real circuits/activities to confirm details (waiting on user)
