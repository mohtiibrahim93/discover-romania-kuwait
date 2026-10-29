<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All public pages live under `src/routes/$locale.*` (en/ar/ro); every user-facing string is an `L` object `{en,ar,ro}` — never add a page or field missing a language.
- Editable content (tours, destinations, styles, FAQ, brand/contact, visa info) lives in `src/content/*`; keep it as the single source until a CMS replaces it.
- The inquiry form must never show a "submitted" state unless a real backend stored the record (`SITE.inquiryBackendConnected`).
- Inquiries are inserted server-side only (src/lib/inquiry.functions.ts, service role); trip_inquiries has RLS on with no public policies so visitors can never read submissions.
