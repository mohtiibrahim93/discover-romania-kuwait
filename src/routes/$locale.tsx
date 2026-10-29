import { Link, Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import { isLocale, useLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { SITE } from "@/content/site";

export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound();
  },
  component: LocaleLayout,
  notFoundComponent: LocaleNotFound,
});

function LocaleLayout() {
  const l = useLocale();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:bg-background focus:p-3">{t("skip", l)}</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      {SITE.whatsappDigits && (
        <a href={`https://wa.me/${SITE.whatsappDigits}`} target="_blank" rel="noopener" aria-label="WhatsApp"
          className="fixed bottom-24 end-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-forest text-on-dark shadow-lg lg:bottom-6"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}>
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      )}
    </>
  );
}

function LocaleNotFound() {
  const l = useLocale();
  return (
    <div className="container-edit flex min-h-[70svh] flex-col items-start justify-center pt-24">
      <p className="eyebrow text-accent">404</p>
      <h1 className="mt-3 text-4xl text-primary">{t("notFoundT", l)}</h1>
      <p className="mt-3 text-muted-foreground">{t("notFoundP", l)}</p>
      <Link to="/$locale" params={{ locale: l }} className="mt-8 inline-flex min-h-11 items-center rounded-sm bg-primary px-6 text-sm font-semibold text-primary-foreground">{t("home", l)}</Link>
    </div>
  );
}
