import { Link } from "@tanstack/react-router";
import { useLocale } from "@/i18n/config";
import { t, type UIKey } from "@/i18n/ui";
import { useSiteContent } from "@/lib/site-content";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Wordmark } from "./Wordmark";
import { LocaleSwitch } from "./Header";

const COLS: { title: UIKey; links: { key: UIKey; to: string }[] }[] = [
  { title: "tours", links: [{ key: "tours", to: "/$locale/tours" }, { key: "services", to: "/$locale/services" }, { key: "styles", to: "/$locale/experiences" }, { key: "destinations", to: "/$locale/destinations" }, { key: "planTrip", to: "/$locale/plan-your-trip" }] },
  { title: "about", links: [{ key: "about", to: "/$locale/about" }, { key: "why", to: "/$locale/why-romania" }, { key: "faq", to: "/$locale/faq" }, { key: "travelInfo", to: "/$locale/travel-information" }, { key: "howItWorks", to: "/$locale/how-it-works" }, { key: "contact", to: "/$locale/contact" }] },
  { title: "privacy", links: [{ key: "privacy", to: "/$locale/privacy" }, { key: "terms", to: "/$locale/terms" }, { key: "cookies", to: "/$locale/cookies" }] },
];

export function Footer() {
  const l = useLocale();
  const { site } = useSiteContent();
  return (
    <footer className="bg-midnight text-on-dark" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="container-edit grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Wordmark light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-dark-muted">{site.tagline[l]}</p>
          {site.email && <a href={`mailto:${site.email}`} className="ltr-isolate mt-4 block text-sm">{site.email}</a>}
          {site.whatsappDigits && <a href={`https://wa.me/${site.whatsappDigits}`} target="_blank" rel="noopener" className="ltr-isolate mt-3 inline-flex min-h-10 items-center gap-2 text-sm text-on-dark hover:text-champagne"><WhatsAppIcon className="h-4 w-4" />WhatsApp +{site.whatsappDigits}</a>}
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
        <p className="container-edit py-6 text-xs text-on-dark-muted">© {new Date().getFullYear()} {site.name} · {t("rights", l)} {t("placeholders", l)}</p>
      </div>
    </footer>
  );
}
