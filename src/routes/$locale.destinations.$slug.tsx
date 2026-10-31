import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { asLocale, useLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { getDestination } from "@/content/destinations";
import { publishedTours } from "@/content/tours";
import { PageHero, btn } from "@/components/site/ui";
import { Crumbs } from "@/components/site/Crumbs";
import { TourCard } from "@/components/site/TourCard";

export const Route = createFileRoute("/$locale/destinations/$slug")({
  loader: ({ params }) => { if (!getDestination(params.slug)) throw notFound(); return { slug: params.slug }; },
  head: ({ params, loaderData }) => {
    const l = asLocale(params.locale);
    const d = loaderData ? getDestination(loaderData.slug) : undefined;
    if (!d) return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    return seo(l, d.name[l], d.intro[l], `/destinations/${d.slug}`);
  },
  component: Page,
});

function Page() {
  const l = useLocale();
  const d = getDestination(Route.useLoaderData().slug)!;
  const tours = publishedTours().filter((x) => x.regions.includes(d.slug));
  const List = ({ title, items }: { title: string; items: { [k: string]: string }[] }) => (
    <div><h2 className="text-2xl text-primary">{title}</h2>
      <ul className="mt-4 space-y-3">{items.map((x, i) => <li key={i} className="flex gap-3"><span className="mt-3 h-px w-4 shrink-0 bg-champagne" />{x[l]}</li>)}</ul></div>
  );
  return (
    <>
      <PageHero media={d.media} top={<Crumbs section={t("destinations", l)} to="/$locale/destinations" current={d.name[l]} />} title={d.name[l]} intro={d.teaser[l]} />
      <section className="container-edit py-16 md:py-24">
        <p className="max-w-3xl font-display text-2xl leading-relaxed text-primary md:text-3xl">{d.intro[l]}</p>
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          <List title={t("whyVisit", l)} items={d.why} />
          <List title={t("experiences", l)} items={d.experiences} />
          <div><h2 className="text-2xl text-primary">{t("seasons", l)}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{d.seasons[l]}</p></div>
        </div>
      </section>
      {tours.length > 0 && (
        <section className="bg-mist py-20">
          <div className="container-edit">
            <h2 className="text-3xl text-primary">{t("relatedTours", l)}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{tours.map((x) => <TourCard key={x.id} tour={x} />)}</div>
          </div>
        </section>
      )}
      <section className="container-edit py-20 text-center">
        <Link to="/$locale/plan-your-trip" params={{ locale: l }} search={{ region: d.slug }} className={btn.primary}>{t("requestPersonalQuote", l)}</Link>
      </section>
    </>
  );
}
