import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { asLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { TRAVEL_STYLES } from "@/content/styles";
import { publishedTours } from "@/content/tours";
import { Img, PageHero } from "@/components/site/ui";

const intro = { en: "Six ways to experience Romania. Choose one to see matching journeys.", ar: "ست طرق لاكتشاف رومانيا. اختر واحدة لعرض الرحلات المناسبة.", ro: "Șase moduri de a descoperi România. Alege unul pentru a vedea circuitele potrivite." };

export const Route = createFileRoute("/$locale/experiences")({
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, t("styles", l), intro[l], "/experiences"); },
  component: Page,
});

function Page() {
  const l = asLocale(Route.useParams().locale);
  const tours = publishedTours();
  return (
    <>
      <PageHero media="countryside" eyebrow={t("styles", l)} title={t("styles", l)} intro={intro[l]} />
      <section className="container-edit grid gap-6 py-16 md:grid-cols-2 md:py-24 lg:grid-cols-3">
        {TRAVEL_STYLES.map((s) => {
          const n = tours.filter((x) => x.styles.includes(s.id)).length;
          return (
            <Link key={s.id} to="/$locale/tours" params={{ locale: l }} search={{ style: s.id }} className="group flex flex-col bg-card">
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
    </>
  );
}
