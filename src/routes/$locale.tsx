import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import { isLocale, useLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound();
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const l = useLocale();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:bg-background focus:p-3">{t("skip", l)}</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
    </>
  );
}
