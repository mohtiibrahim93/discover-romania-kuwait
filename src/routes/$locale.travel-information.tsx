import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { asLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { TRAVEL_INFO as P } from "@/content/pages";
import { ENTRY_INFO } from "@/content/site";
import { TextPage } from "@/components/site/TextPage";

const visaH = { en: "Visas & passports", ar: "التأشيرات وجوازات السفر", ro: "Vize și pașapoarte" };

export const Route = createFileRoute("/$locale/travel-information")({
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, P.title[l], P.intro[l], "/travel-information"); },
  component: Page,
});

function Page() {
  const l = asLocale(Route.useParams().locale);
  const date = new Date(ENTRY_INFO.lastReviewed).toLocaleDateString(l === "ar" ? "ar-KW" : l, { dateStyle: "long" });
  return (
    <>
      <TextPage eyebrow={t("travelInfo", l)} title={P.title} intro={P.intro} media="mountains" sections={P.sections} cta={false} />
      <section className="container-edit pb-24">
        <div className="max-w-4xl border-t-2 border-champagne bg-card p-6 md:p-10">
          <h2 className="text-3xl text-primary">{visaH[l]}</h2>
          <p className="mt-2 text-xs text-muted-foreground">{t("lastReviewed", l)}: {date}</p>
          <p className="mt-5 leading-relaxed">{ENTRY_INFO.body[l]}</p>
          <ul className="mt-6 space-y-2">
            {ENTRY_INFO.links.map((x) => (
              <li key={x.url}><a href={x.url} target="_blank" rel="noopener noreferrer" lang="en" className="ltr-isolate inline-flex min-h-11 items-center gap-2 text-accent underline underline-offset-4">{x.label}<ExternalLink className="h-3.5 w-3.5" /></a></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
