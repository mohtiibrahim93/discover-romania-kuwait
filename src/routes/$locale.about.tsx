import { createFileRoute } from "@tanstack/react-router";
import { asLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { ABOUT } from "@/content/pages";
import { TextPage } from "@/components/site/TextPage";

const P = ABOUT;

export const Route = createFileRoute("/$locale/about")({
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, P.title[l], P.intro[l], "/about"); },
  component: Page,
});

function Page() {
  const l = asLocale(Route.useParams().locale);
  return <TextPage eyebrow={t("about", l)} title={P.title} intro={P.intro} media="countryside" sections={P.sections} />;
}
