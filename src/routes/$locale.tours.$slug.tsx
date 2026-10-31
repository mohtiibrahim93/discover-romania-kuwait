import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Share2 } from "lucide-react";
import { Crumbs } from "@/components/site/Crumbs";
import { useState } from "react";
import { asLocale, useLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { getTour, TOURS } from "@/content/tours";
import { getDestination } from "@/content/destinations";
import { useSiteContent } from "@/lib/site-content";
import { Chip, Img, btn } from "@/components/site/ui";
import { TourCard } from "@/components/site/TourCard";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { whatsappLink, WHATSAPP_LABEL } from "@/lib/whatsapp";
import { SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/$locale/tours/$slug")({
  loader: ({ params }) => {
    const tour = getTour(params.slug);
    if (!tour) throw notFound();
    return { slug: tour.slug };
  },
  head: ({ params, loaderData }) => {
    const l = asLocale(params.locale);
    const tour = loaderData ? getTour(loaderData.slug) : undefined;
    if (!tour) return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    return seo(l, tour.title[l], `${tour.tagline[l]} — ${tour.days} ${t("days", l)}. ${t("proposed", l)}.`, `/tours/${tour.slug}`);
  },
  component: TourDetail,
});

function TourDetail() {
  const l = useLocale();
  const { styles, site } = useSiteContent();
  const { slug } = Route.useLoaderData();
  const tour = getTour(slug);
  const [copied, setCopied] = useState(false);
  if (!tour) throw notFound();
  const related = TOURS.filter((candidate) => tour.related.includes(candidate.slug));
  const discussHref = site.whatsappDigits ? whatsappLink(site.whatsappDigits, l, { journey: tour.title[l], pageUrl: `${SITE_ORIGIN}/${l}/tours/${tour.slug}` }) : undefined;

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) { try { await navigator.share({ title: tour.title[l], text: `${t("shareText", l)} ${tour.title[l]}`, url }); } catch { /* cancelled */ } return; }
    await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-midnight">
        <div className="absolute inset-0 -z-10"><Img k={tour.media} eager /></div>
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="container-edit pb-14 pt-32">
          <Crumbs section={t("tours", l)} to="/$locale/tours" current={tour.title[l]} />
          <p className="eyebrow mt-4 text-champagne">{tour.days} {t("days", l)} · {tour.places[l]}</p>
          <h1 className="fade-up mt-3 max-w-3xl text-5xl leading-[1.05] text-on-dark md:text-7xl">{tour.title[l]}</h1>
          <p className="fade-up mt-4 max-w-xl text-lg text-on-dark-muted">{tour.tagline[l]}</p>
        </div>
      </section>

      <div className="container-edit grid gap-14 py-16 pb-32 md:py-24 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <Chip>{tour.days} {t("days", l)}</Chip>
            {tour.regions.map((r) => <Chip key={r}>{getDestination(r)?.name[l]}</Chip>)}
            {tour.styles.map((s) => <Chip key={s}>{styles.find((x) => x.id === s)?.title[l]}</Chip>)}
          </div>
          <p className="mt-6 border-s-2 border-champagne ps-4 text-sm italic text-muted-foreground">{t("proposed", l)}</p>

          <h2 className="mt-12 text-3xl text-primary">{t("overview", l)}</h2>
          <p className="mt-4 text-lg leading-relaxed">{tour.overview[l]}</p>
          <p className="mt-4"><span className="font-semibold">{t("idealFor", l)}:</span> {tour.idealFor[l]}</p>

          <h2 className="mt-12 text-3xl text-primary">{t("highlights", l)}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {tour.highlights.map((h, i) => <li key={i} className="flex gap-3 border-t border-border pt-3"><span className="ltr-isolate font-display text-champagne">0{i + 1}</span>{h[l]}</li>)}
          </ul>

          <h2 className="mt-12 text-3xl text-primary">{t("dayByDay", l)}</h2>
          <ol className="mt-6 border-s-2 border-border">
            {tour.itinerary.map((d, i) => (
              <li key={i} className="relative pb-6 ps-6 last:pb-0">
                <span aria-hidden className="absolute -start-[7px] top-1.5 h-3 w-3 rounded-full bg-terracotta" />
                <p className="text-xs font-bold uppercase tracking-wide text-terracotta">{t("day", l)} <span className="ltr-isolate">{i + 1}</span></p>
                <p className="mt-1 leading-relaxed">{d[l]}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div><h3 className="text-xl text-primary">{t("customize", l)}</h3><p className="mt-3 text-muted-foreground">{tour.customize[l]}</p></div>
            <div><h3 className="text-xl text-primary">{t("accommodation", l)}</h3><p className="mt-3 text-muted-foreground">{tour.accommodation[l]}</p></div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
            {tour.gallery.map((g, i) => <div key={i} className={i === 0 ? "col-span-2 aspect-[16/10] overflow-hidden md:col-span-2" : "aspect-square overflow-hidden"}><Img k={g} /></div>)}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{t("illustrative", l)}</p>

          <div className="mt-12 rounded-3xl bg-mint p-6">
            <h3 className="text-xl text-primary">{t("travelNotes", l)}</h3>
            <p className="mt-3 text-muted-foreground">{tour.notes[l]}</p>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-3xl border-[1.5px] border-border bg-card p-6">
            <p className="font-display text-2xl text-primary">{tour.title[l]}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("onRequest", l)}</p>
            <Link to="/$locale/plan-your-trip" params={{ locale: l }} search={{ tour: tour.slug }} className={`${btn.primary} mt-6 w-full`}>{t("askTour", l)}</Link>
            {discussHref && <Button asChild variant="link" className={`${btn.link} mt-3 h-auto w-full whitespace-normal justify-center`}><a href={discussHref} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />{WHATSAPP_LABEL[l]}</a></Button>}
            <Button type="button" variant="link" onClick={share} className={`${btn.link} mt-3 h-auto w-full whitespace-normal justify-center`}><Share2 className="h-4 w-4" />{copied ? t("copied", l) : t("share", l)}</Button>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="bg-mist py-20">
          <div className="container-edit">
            <h2 className="text-3xl text-primary">{t("related", l)}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{related.map((r) => <TourCard key={r.id} tour={r} />)}</div>
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
        <Link to="/$locale/plan-your-trip" params={{ locale: l }} search={{ tour: tour.slug }} className={`${btn.primary} flex-1`}>{t("askTour", l)}</Link>
        {discussHref && <Button asChild variant="outline" className="h-auto min-h-11 px-3"><a href={discussHref} target="_blank" rel="noopener noreferrer" aria-label={WHATSAPP_LABEL[l]} title={WHATSAPP_LABEL[l]}><WhatsAppIcon /></a></Button>}
        <Button type="button" variant="outline" onClick={share} aria-label={t("share", l)} title={t("share", l)} className="h-auto min-h-11 px-3"><Share2 className="h-4 w-4" /></Button>
      </div>
    </>
  );
}
