import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Share2 } from "lucide-react";
import { useState } from "react";
import { asLocale, useLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { getTour, TOURS } from "@/content/tours";
import { getDestination } from "@/content/destinations";
import { TRAVEL_STYLES } from "@/content/styles";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Chip, Img, btn } from "@/components/site/ui";
import { TourCard } from "@/components/site/TourCard";

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
  const { slug } = Route.useLoaderData();
  const tour = getTour(slug)!;
  const [copied, setCopied] = useState(false);
  const related = tour.related.map((r) => TOURS.find((x) => x.slug === r)).filter(Boolean);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) { try { await navigator.share({ title: tour.title[l], url }); } catch { /* cancelled */ } return; }
    await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-midnight">
        <div className="absolute inset-0 -z-10"><Img k={tour.media} eager /></div>
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="container-edit pb-14 pt-32">
          <Link to="/$locale/tours" params={{ locale: l }} className="inline-flex min-h-11 items-center gap-2 text-sm text-on-dark-muted hover:text-on-dark"><ArrowLeft className="flip-rtl h-4 w-4" />{t("tours", l)}</Link>
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
            {tour.styles.map((s) => <Chip key={s}>{TRAVEL_STYLES.find((x) => x.id === s)?.title[l]}</Chip>)}
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
          <Accordion type="multiple" defaultValue={["d0"]} className="mt-4">
            {tour.itinerary.map((d, i) => (
              <AccordionItem key={i} value={`d${i}`}>
                <AccordionTrigger className="min-h-14 text-start text-base">
                  <span className="flex gap-4"><span className="eyebrow min-w-14 pt-1 text-accent">{t("day", l)} {i + 1}</span><span className="line-clamp-1">{d[l]}</span></span>
                </AccordionTrigger>
                <AccordionContent className="ps-18 text-base leading-relaxed text-muted-foreground">{d[l]}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div><h3 className="text-xl text-primary">{t("customize", l)}</h3><p className="mt-3 text-muted-foreground">{tour.customize[l]}</p></div>
            <div><h3 className="text-xl text-primary">{t("accommodation", l)}</h3><p className="mt-3 text-muted-foreground">{tour.accommodation[l]}</p></div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
            {tour.gallery.map((g, i) => <div key={i} className={i === 0 ? "col-span-2 aspect-[16/10] overflow-hidden md:col-span-2" : "aspect-square overflow-hidden"}><Img k={g} /></div>)}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{t("illustrative", l)}</p>

          <div className="mt-12 bg-mist p-6">
            <h3 className="text-xl text-primary">{t("travelNotes", l)}</h3>
            <p className="mt-3 text-muted-foreground">{tour.notes[l]}</p>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 border border-border bg-card p-6">
            <p className="font-display text-2xl text-primary">{tour.title[l]}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("onRequest", l)}</p>
            <Link to="/$locale/plan-your-trip" params={{ locale: l }} search={{ tour: tour.slug }} className={`${btn.primary} mt-6 w-full`}>{t("askTour", l)}</Link>
            <button type="button" onClick={share} className={`${btn.link} mt-3 w-full justify-center`}><Share2 className="h-4 w-4" />{copied ? t("copied", l) : t("share", l)}</button>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="bg-mist py-20">
          <div className="container-edit">
            <h2 className="text-3xl text-primary">{t("related", l)}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{related.map((r) => <TourCard key={r!.id} tour={r!} />)}</div>
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
        <Link to="/$locale/plan-your-trip" params={{ locale: l }} search={{ tour: tour.slug }} className={`${btn.primary} flex-1`}>{t("askTour", l)}</Link>
        <button type="button" onClick={share} aria-label={t("share", l)} className={btn.outline}><Share2 className="h-4 w-4" /></button>
      </div>
    </>
  );
}
