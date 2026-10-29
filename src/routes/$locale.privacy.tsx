import { createFileRoute } from "@tanstack/react-router";
import { asLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { LEGAL } from "@/content/pages";
import { TextPage } from "@/components/site/TextPage";

const P = LEGAL.privacy;

export const Route = createFileRoute("/$locale/privacy")({
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, P.title[l], P.intro[l], "/privacy"); },
  component: Page,
});

function Page() {
  const l = asLocale(Route.useParams().locale);
  return <TextPage eyebrow={t("privacy", l)} title={P.title} intro={P.intro} media="delta" sections={P.sections} notice={t("draftLegal", l)} cta={false} />;
}
