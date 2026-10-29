import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Tour } from "@/content/tours";
import { getDestination } from "@/content/destinations";
import { useLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { Img, btn } from "./ui";

export function TourCard({ tour }: { tour: Tour }) {
  const l = useLocale();
  return (
    <article className="group flex flex-col overflow-hidden bg-card">
      <Link to="/$locale/tours/$slug" params={{ locale: l, slug: tour.slug }} className="block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden>
        <Img k={tour.media} className="transition-transform duration-700 group-hover:scale-[1.03]" />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-accent">{tour.days} {t("days", l)} · {tour.regions.map((r) => getDestination(r)?.name[l]).slice(0, 2).join(" · ")}</p>
        <h3 className="mt-3 text-2xl text-primary">
          <Link to="/$locale/tours/$slug" params={{ locale: l, slug: tour.slug }} className="hover:underline decoration-champagne underline-offset-4">{tour.title[l]}</Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{tour.places[l]}</p>
        <p className="mt-4 text-sm leading-relaxed">{tour.tagline[l]}</p>
        <p className="mt-3 text-xs text-muted-foreground"><span className="font-semibold">{t("idealFor", l)}:</span> {tour.idealFor[l]}</p>
        <ul className="mt-4 space-y-1.5 text-sm">
          {tour.highlights.slice(0, 3).map((h, i) => <li key={i} className="flex gap-2"><span className="mt-2 h-px w-3 shrink-0 bg-champagne" />{h[l]}</li>)}
        </ul>
        <p className="mt-4 text-xs italic text-muted-foreground">{t("proposed", l)}</p>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          <Link to="/$locale/tours/$slug" params={{ locale: l, slug: tour.slug }} className={btn.primary}>{t("viewJourney", l)}<ArrowRight className="flip-rtl h-4 w-4" /></Link>
          <Link to="/$locale/plan-your-trip" params={{ locale: l }} search={{ tour: tour.slug }} className={btn.link}>{t("requestQuote", l)}</Link>
        </div>
      </div>
    </article>
  );
}
