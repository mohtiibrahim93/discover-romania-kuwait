import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { asLocale, type L } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { TRAVEL_INFO as P } from "@/content/pages";
import { useSiteContent } from "@/lib/site-content";
import { TextPage } from "@/components/site/TextPage";

const visaH = { en: "Visas & passports", ar: "التأشيرات وجوازات السفر", ro: "Vize și pașapoarte" };
const councilLabel: L = { en: "Council of the EU — Kuwait visa-waiver process conclusions", ar: "مجلس الاتحاد الأوروبي — استنتاجات بشأن مسار الإعفاء من التأشيرة للكويت", ro: "Consiliul UE — concluzii privind procesul de exceptare de la viză pentru Kuweit" };
const councilNote: L = { en: "These conclusions welcome the intention to begin a process; they do not themselves grant a visa exemption. Check the rules applicable to each traveller before purchasing travel.", ar: "ترحب هذه الاستنتاجات بالنية لبدء مسار؛ وهي لا تمنح بحد ذاتها إعفاءً من التأشيرة. تحقق من القواعد التي تنطبق على كل مسافر قبل شراء ترتيبات السفر.", ro: "Aceste concluzii salută intenția de a începe un proces; nu acordă prin ele însele o exceptare de la viză. Verifică regulile aplicabile fiecărui călător înainte de a cumpăra servicii de călătorie." };

export const Route = createFileRoute("/$locale/travel-information")({
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, P.title[l], P.intro[l], "/travel-information"); },
  component: Page,
});

function Page() {
  const l = asLocale(Route.useParams().locale);
  const { entry } = useSiteContent();
  const date = new Date(entry.lastReviewed).toLocaleDateString(l === "ar" ? "ar-KW" : l, { dateStyle: "long" });
  return (
    <>
      <TextPage eyebrow={t("travelInfo", l)} title={P.title} intro={P.intro} media="mountains" sections={P.sections} cta={false} />
      <section className="container-edit pb-24">
        <div className="max-w-4xl border-t-2 border-champagne bg-card p-6 md:p-10">
          <h2 className="text-3xl text-primary">{visaH[l]}</h2>
          <p className="mt-2 text-xs text-muted-foreground">{t("lastReviewed", l)}: {date}</p>
          <p className="mt-5 leading-relaxed">{entry.body[l]}</p>
          <ul className="mt-6 space-y-2">
            {entry.links.map((x) => (
              <li key={x.url}><a href={x.url} target="_blank" rel="noopener noreferrer" lang="en" className="ltr-isolate inline-flex min-h-11 items-center gap-2 text-accent underline underline-offset-4">{x.label}<ExternalLink className="h-3.5 w-3.5" /></a></li>
            ))}
          </ul>
          <div className="mt-6 border-t border-border pt-6">
            <a href="https://data.consilium.europa.eu/doc/document/ST-14626-2026-INIT/en/pdf" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-accent underline underline-offset-4">{councilLabel[l]}<ExternalLink className="h-4 w-4 shrink-0" /></a>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{councilNote[l]}</p>
          </div>
        </div>
      </section>
    </>
  );
}
