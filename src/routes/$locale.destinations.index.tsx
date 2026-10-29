import { createFileRoute, Link } from "@tanstack/react-router";
import { asLocale, useLocale, type L } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { DESTINATIONS } from "@/content/destinations";
import { Img, PageHero } from "@/components/site/ui";

const intro: L = { en: "Six regions, each with its own character and best season. Your proposal combines the ones that suit you.", ar: "ست مناطق، لكل منها طابعها وموسمها الأفضل. يجمع مقترحك ما يناسبك منها.", ro: "Șase regiuni, fiecare cu caracterul și sezonul ei ideal. Propunerea ta le combină pe cele potrivite." };

export const Route = createFileRoute("/$locale/destinations/")({
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, t("ourDestinations", l), intro[l], "/destinations"); },
  component: Page,
});

function Page() {
  const l = useLocale();
  return (
    <>
      <PageHero media="countryside" eyebrow={t("destinations", l)} title={t("ourDestinations", l)} intro={intro[l]} />
      <section className="container-edit space-y-20 py-20 md:py-28">
        {DESTINATIONS.map((d, i) => (
          <article key={d.slug} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <div className={`aspect-[4/3] overflow-hidden ${i % 2 ? "md:order-2" : ""}`}><Img k={d.media} /></div>
            <div>
              <p className="ltr-isolate font-display text-champagne">0{i + 1}</p>
              <h2 className="mt-2 text-4xl text-primary">{d.name[l]}</h2>
              <p className="mt-2 text-accent">{d.teaser[l]}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{d.intro[l]}</p>
              <Link to="/$locale/destinations/$slug" params={{ locale: l, slug: d.slug }} className="mt-6 inline-flex min-h-11 items-center font-semibold text-primary underline decoration-champagne underline-offset-4">{t("readMore", l)}</Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
