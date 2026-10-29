import { createFileRoute } from "@tanstack/react-router";
import { asLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { WHY } from "@/content/pages";
import { TextPage } from "@/components/site/TextPage";

const P = WHY;

export const Route = createFileRoute("/$locale/why-romania")({
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, P.title[l], P.intro[l], "/why-romania"); },
  component: Page,
});

function Page() {
  const l = asLocale(Route.useParams().locale);
  return <TextPage eyebrow={t("why", l)} title={P.title} intro={P.intro} media="mountains" sections={P.sections} />;
}
