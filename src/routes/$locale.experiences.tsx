import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { asLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { useSiteContent } from "@/lib/site-content";
import { publishedTours } from "@/content/tours";
import { Img, PageHero } from "@/components/site/ui";
import { ACTIVITIES, ACTIVITY_CATEGORIES } from "@/content/activities";
import { DESTINATIONS } from "@/content/destinations";

const intro = { en: "Travel styles and hands-on activities — from a day as a shepherd to rafting, horse riding and village life.", ar: "أنماط سفر وأنشطة عملية — من يوم كراعٍ إلى التجديف وركوب الخيل والحياة القروية.", ro: "Stiluri de călătorie și activități practice — de la o zi de cioban la rafting, călărie și viața la sat." };
const actIntro = { en: "Add any of these to a journey. Availability, minimum ages and weather are confirmed in your proposal.", ar: "أضف أيًا منها إلى رحلتك. يُؤكد التوفر والحد الأدنى للأعمار والطقس في العرض.", ro: "Adaugă oricare dintre ele la o călătorie. Disponibilitatea, vârstele minime și vremea se confirmă în propunere." };
const addToTrip = { en: "Add to my trip", ar: "أضفه إلى رحلتي", ro: "Adaugă în călătoria mea" };
const familyLabel = { en: "Family-friendly", ar: "مناسب للعائلة", ro: "Potrivit pentru familii" };

export const Route = createFileRoute("/$locale/experiences")({
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, t("experiencesNav", l), intro[l], "/experiences"); },
  component: Page,
});

function Page() {
  const l = asLocale(Route.useParams().locale);
  const { styles } = useSiteContent();
  const tours = publishedTours();
  return (
    <>
      <PageHero media="countryside" eyebrow={t("experiencesNav", l)} title={t("experiencesNav", l)} intro={intro[l]} />
      <section className="container-edit pt-16 md:pt-20">
        <h2 className="text-3xl md:text-4xl">{t("styles", l)}</h2>
      </section>
      <section className="container-edit grid gap-6 pb-16 pt-8 md:grid-cols-2 md:pb-24 lg:grid-cols-3">
        {styles.map((s) => {
          const n = tours.filter((x) => x.styles.includes(s.id)).length;
          return (
            <Link key={s.id} to="/$locale/tours" params={{ locale: l }} search={{ style: s.id }} className="group flex flex-col overflow-hidden rounded-3xl border-[1.5px] border-border bg-card">
              <div className="aspect-[3/2] overflow-hidden"><Img k={s.media} className="transition-transform duration-700 group-hover:scale-105" /></div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-2xl text-primary">{s.title[l]}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.intro[l]}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent"><span className="ltr-isolate">{n}</span> {t("journeysFound", l)}<ArrowRight className="flip-rtl h-4 w-4" /></span>
              </div>
            </Link>
          );
        })}
      </section>
      <section className="border-t border-border bg-card/40">
        <div className="container-edit py-16 md:py-24">
          <h2 className="text-3xl text-primary md:text-4xl">{t("activities", l)}</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{actIntro[l]}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ACTIVITIES.map((a) => (
              <article key={a.id} className="flex flex-col overflow-hidden rounded-3xl border-[1.5px] border-border bg-background">
                <div className="aspect-[3/2] overflow-hidden"><Img k={a.media} /></div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">{ACTIVITY_CATEGORIES[a.category][l]}</p>
                  <h3 className="mt-2 text-xl text-primary">{a.title[l]}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{a.intro[l]}</p>
                  <p className="mt-4 text-xs text-foreground">{a.regions.map((r) => DESTINATIONS.find((d) => d.slug === r)?.name[l]).filter(Boolean).join(" · ")}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{a.season[l]}{a.family ? ` · ${familyLabel[l]}` : ""}</p>
                  <Link to="/$locale/plan-your-trip" params={{ locale: l }} search={{ activity: a.id }} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-sky">{addToTrip[l]}<ArrowRight className="flip-rtl h-4 w-4" aria-hidden /></Link>
                </div>
              </article>
            ))}
          </div>
          <Link to="/$locale/plan-your-trip" params={{ locale: l }} className="mt-10 inline-flex items-center gap-2 font-semibold text-accent">{t("planTrip", l)}<ArrowRight className="flip-rtl h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
