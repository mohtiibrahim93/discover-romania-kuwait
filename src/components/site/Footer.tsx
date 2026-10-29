import { Link } from "@tanstack/react-router";
import { useLocale } from "@/i18n/config";
import { t, type UIKey } from "@/i18n/ui";
import { SITE } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { LocaleSwitch } from "./Header";

const COLS: { title: UIKey; links: { key: UIKey; to: string }[] }[] = [
  { title: "tours", links: [{ key: "tours", to: "/$locale/tours" }, { key: "styles", to: "/$locale/experiences" }, { key: "destinations", to: "/$locale/destinations" }, { key: "planTrip", to: "/$locale/plan-your-trip" }] },
  { title: "about", links: [{ key: "about", to: "/$locale/about" }, { key: "why", to: "/$locale/why-romania" }, { key: "faq", to: "/$locale/faq" }, { key: "travelInfo", to: "/$locale/travel-information" }, { key: "contact", to: "/$locale/contact" }] },
  { title: "privacy", links: [{ key: "privacy", to: "/$locale/privacy" }, { key: "terms", to: "/$locale/terms" }, { key: "cookies", to: "/$locale/cookies" }] },
];

export function Footer() {
  const l = useLocale();
  return (
    <footer className="bg-midnight text-on-dark" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="container-edit grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Wordmark light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-dark-muted">{SITE.tagline[l]}</p>
          {SITE.email && <a href={`mailto:${SITE.email}`} className="ltr-isolate mt-4 block text-sm">{SITE.email}</a>}
          <LocaleSwitch light className="mt-6" />
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <p className="eyebrow mb-4 text-champagne">{t(c.title, l)}</p>
            <ul className="space-y-1">
              {c.links.map((x) => (
                <li key={x.key}><Link to={x.to} params={{ locale: l }} className="inline-flex min-h-10 items-center text-sm text-on-dark-muted hover:text-on-dark">{t(x.key, l)}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-on-dark-muted/20">
        <p className="container-edit py-6 text-xs text-on-dark-muted">© {new Date().getFullYear()} {SITE.name} · {t("rights", l)} · {t("illustrative", l)}s — AI-generated placeholders.</p>
      </div>
    </footer>
  );
}
