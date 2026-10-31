import { Link, Outlet, createFileRoute, notFound, useLocation } from "@tanstack/react-router";
import { isLocale, useLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { contentQueryOptions, useSiteContent } from "@/lib/site-content";
import { whatsappLink, WHATSAPP_LABEL } from "@/lib/whatsapp";
import { SITE_ORIGIN } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { captureLeadSource } from "@/lib/lead-source";

export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound();
  },
  loader: async ({ context }) => ({
    // Always read the latest saved content for the server render; the browser
    // cache keeps the 60s freshness window for in-site navigation.
    content: await context.queryClient.fetchQuery({ ...contentQueryOptions, staleTime: 0 }),
  }),
  component: LocaleLayout,
  notFoundComponent: LocaleNotFound,
});

function LocaleLayout() {
  const l = useLocale();
  const pathname = useLocation({ select: (location) => location.pathname });
  const { queryClient } = Route.useRouteContext();
  // The loader already fetched saved content for SSR; seed the client cache with
  // the same snapshot so the first client render matches the server HTML.
  queryClient.setQueryData(contentQueryOptions.queryKey, Route.useLoaderData().content);
  const { site } = useSiteContent();
  useEffect(() => captureLeadSource(), []);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:bg-background focus:p-3">{t("skip", l)}</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      {/* Tour pages carry their own WhatsApp button, so the floating one would duplicate it. */}
      {site.whatsappDigits && !/^\/[a-z]{2}\/tours\/[^/]+\/?$/.test(pathname) && (
        <Button asChild variant="ghost"
          className="fixed bottom-24 end-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-forest text-on-dark shadow-lg lg:bottom-6"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}>
          <a href={whatsappLink(site.whatsappDigits, l, { pageUrl: `${SITE_ORIGIN}${pathname}` })} target="_blank" rel="noopener noreferrer" aria-label={WHATSAPP_LABEL[l]} title={WHATSAPP_LABEL[l]}>
            <WhatsAppIcon className="!h-7 !w-7" />
          </a>
        </Button>
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
