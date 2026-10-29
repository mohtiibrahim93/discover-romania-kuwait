import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { LOCALES, LOCALE_LABELS, LOCALE_STORAGE_KEY, swapLocale, useLocale } from "@/i18n/config";
import { t, type UIKey } from "@/i18n/ui";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";
import { btn } from "./ui";

const NAV: { key: UIKey; to: string; search?: Record<string, string> }[] = [
  { key: "home", to: "/$locale" },
  { key: "tours", to: "/$locale/tours" },
  { key: "destinations", to: "/$locale/destinations" },
  { key: "styles", to: "/$locale/experiences" },
  { key: "tailor", to: "/$locale/plan-your-trip" },
  { key: "why", to: "/$locale/why-romania" },
  { key: "about", to: "/$locale/about" },
  { key: "contact", to: "/$locale/contact" },
];

export function LocaleSwitch({ light, className }: { light?: boolean; className?: string }) {
  const l = useLocale();
  const { pathname, searchStr } = useRouterState({ select: (s) => ({ pathname: s.location.pathname, searchStr: s.location.searchStr }) });
  return (
    <nav aria-label={t("language", l)} className={cn("flex items-center gap-1 text-sm", className)}>
      {LOCALES.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className={cn("px-1", light ? "text-on-dark-muted" : "text-muted-foreground")} aria-hidden>|</span>}
          <a
            href={swapLocale(pathname, loc) + (searchStr ?? "")}
            hrefLang={loc} lang={loc}
            aria-current={loc === l ? "true" : undefined}
            onClick={() => { try { localStorage.setItem(LOCALE_STORAGE_KEY, loc); } catch { /* ignore */ } }}
            className={cn("inline-flex min-h-11 items-center px-1.5", loc === l ? "font-semibold underline decoration-champagne underline-offset-4" : "opacity-80 hover:opacity-100", light ? "text-on-dark" : "text-foreground")}
          >{LOCALE_LABELS[loc]}</a>
        </span>
      ))}
    </nav>
  );
}

export function Header() {
  const l = useLocale();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = !scrolled && !open;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-colors duration-300", overHero ? "bg-transparent" : "border-b border-border bg-background/95 backdrop-blur")}
      style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="container-edit flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/$locale" params={{ locale: l }} aria-label="Discover Romania Kuwait — home"><Wordmark light={overHero} /></Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main">
          {NAV.slice(1).map((n) => (
            <Link key={n.key} to={n.to} params={{ locale: l }}
              className={cn("text-sm transition-opacity hover:opacity-100", overHero ? "text-on-dark opacity-90" : "text-foreground opacity-80")}
              activeProps={{ className: "!opacity-100 font-semibold" }}>{t(n.key, l)}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitch light={overHero} className="hidden md:flex" />
          <Link to="/$locale/plan-your-trip" params={{ locale: l }} className={cn("hidden sm:inline-flex", overHero ? btn.light : btn.primary)}>{t("planTrip", l)}</Link>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="drawer"
            aria-label={open ? t("close", l) : t("menu", l)}
            className={cn("inline-flex h-11 w-11 items-center justify-center xl:hidden", overHero ? "text-on-dark" : "text-primary")}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div id="drawer" className="fixed inset-x-0 bottom-0 top-[calc(4.5rem+env(safe-area-inset-top))] overflow-y-auto bg-background xl:hidden">
          <nav className="container-edit flex flex-col py-6" aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.key} to={n.to} params={{ locale: l }} activeOptions={{ exact: n.to === "/$locale" }}
                className="border-b border-border py-4 font-display text-2xl text-primary"
                activeProps={{ className: "text-accent" }}>{t(n.key, l)}</Link>
            ))}
            <Link to="/$locale/faq" params={{ locale: l }} className="border-b border-border py-4 text-base text-foreground">{t("faq", l)}</Link>
            <Link to="/$locale/travel-information" params={{ locale: l }} className="border-b border-border py-4 text-base text-foreground">{t("travelInfo", l)}</Link>
            <LocaleSwitch className="mt-6" />
            <Link to="/$locale/plan-your-trip" params={{ locale: l }} className={cn(btn.primary, "mt-6 w-full")}>{t("planTrip", l)}</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
