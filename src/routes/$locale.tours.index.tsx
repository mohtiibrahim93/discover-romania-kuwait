import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { asLocale, useLocale, type L } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { publishedTours, type Season } from "@/content/tours";
import { DESTINATIONS } from "@/content/destinations";
import { TRAVEL_STYLES } from "@/content/styles";
import { PageHero, btn } from "@/components/site/ui";
import { TourCard } from "@/components/site/TourCard";

const search = z.object({
  style: z.string().optional(),
  region: z.string().optional(),
  dur: z.enum(["short", "long"]).optional(),
  season: z.enum(["spring", "summer", "autumn", "winter"]).optional(),
  family: z.literal("1").optional(),
  private: z.literal("1").optional(),
});

const C = {
  title: { en: "Proposed Journeys", ar: "رحلات مقترحة", ro: "Circuite propuse" },
  intro: { en: "Illustrative concepts, each adaptable in length, pace and comfort. No fixed prices or departures — every journey is quoted personally.", ar: "تصوّرات توضيحية قابلة للتعديل في المدة والإيقاع ومستوى الراحة. لا أسعار ثابتة ولا مواعيد انطلاق محددة، فكل رحلة تُسعَّر بشكل شخصي.", ro: "Concepte ilustrative, adaptabile ca durată, ritm și confort. Fără prețuri sau plecări fixe — fiecare circuit primește o ofertă personală." },
} satisfies Record<string, L>;

export const Route = createFileRoute("/$locale/tours/")({
  validateSearch: (s) => search.catch({}).parse(s),
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, C.title[l], C.intro[l], "/tours"); },
  component: Catalog,
});

const SEASONS: Season[] = ["spring", "summer", "autumn", "winter"];
const seasonKey = { spring: "seasonSpring", summer: "seasonSummer", autumn: "seasonAutumn", winter: "seasonWinter" } as const;

function Catalog() {
  const l = useLocale();
  const s = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const set = (patch: Partial<z.infer<typeof search>>) =>
    navigate({ search: (p) => ({ ...p, ...patch }), replace: true, resetScroll: false });

  const list = publishedTours().filter((x) =>
    (!s.style || x.styles.includes(s.style as never)) &&
    (!s.region || x.regions.includes(s.region as never)) &&
    (!s.dur || (s.dur === "short" ? x.days <= 6 : x.days >= 7)) &&
    (!s.season || x.seasons.includes(s.season)) &&
    (!s.family || x.familyFriendly) &&
    (!s.private || x.privateOption));
  const any = Object.values(s).some(Boolean);
  const sel = "min-h-11 w-full rounded-sm border border-input bg-card px-3 text-sm";

  return (
    <>
      <PageHero media="oldTown" eyebrow={t("tours", l)} title={C.title[l]} intro={C.intro[l]} />
      <section className="container-edit py-12 md:py-16">
        <form className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6" onSubmit={(e) => e.preventDefault()} aria-label={t("tours", l)}>
          <label className="sr-only" htmlFor="f-style">{t("styles", l)}</label>
          <select id="f-style" className={sel} value={s.style ?? ""} onChange={(e) => set({ style: e.target.value || undefined })}>
            <option value="">{t("allStyles", l)}</option>
            {TRAVEL_STYLES.map((x) => <option key={x.id} value={x.id}>{x.title[l]}</option>)}
          </select>
          <label className="sr-only" htmlFor="f-region">{t("regions", l)}</label>
          <select id="f-region" className={sel} value={s.region ?? ""} onChange={(e) => set({ region: e.target.value || undefined })}>
            <option value="">{t("allRegions", l)}</option>
            {DESTINATIONS.map((x) => <option key={x.slug} value={x.slug}>{x.name[l]}</option>)}
          </select>
          <label className="sr-only" htmlFor="f-dur">{t("days", l)}</label>
          <select id="f-dur" className={sel} value={s.dur ?? ""} onChange={(e) => set({ dur: (e.target.value || undefined) as never })}>
            <option value="">{t("allDurations", l)}</option>
            <option value="short">{t("dur5", l)}</option>
            <option value="long">{t("dur7", l)}</option>
          </select>
          <label className="sr-only" htmlFor="f-season">{t("seasons", l)}</label>
          <select id="f-season" className={sel} value={s.season ?? ""} onChange={(e) => set({ season: (e.target.value || undefined) as never })}>
            <option value="">{t("anySeason", l)}</option>
            {SEASONS.map((x) => <option key={x} value={x}>{t(seasonKey[x], l)}</option>)}
          </select>
          <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" className="h-5 w-5 accent-accent" checked={!!s.family} onChange={(e) => set({ family: e.target.checked ? "1" : undefined })} />{t("familyFriendly", l)}</label>
          <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" className="h-5 w-5 accent-accent" checked={!!s.private} onChange={(e) => set({ private: e.target.checked ? "1" : undefined })} />{t("privateOption", l)}</label>
        </form>
        <div className="mt-6 flex items-center justify-between border-b border-border pb-4 text-sm text-muted-foreground" aria-live="polite">
          <span><span className="ltr-isolate">{list.length.toLocaleString(l === "ar" ? "ar-KW" : l)}</span> {t("journeysFound", l)}</span>
          {any && <Link to="." search={{}} className={btn.link}>{t("clearFilters", l)}</Link>}
        </div>
        {list.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((x) => <TourCard key={x.id} tour={x} />)}</div>
        ) : (
          <div className="mx-auto max-w-lg py-20 text-center">
            <p className="font-display text-2xl text-primary">{t("noResults", l)}</p>
            <p className="mt-3 text-muted-foreground">{t("noResultsHint", l)}</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="." search={{}} className={btn.outline}>{t("clearFilters", l)}</Link>
              <Link to="/$locale/plan-your-trip" params={{ locale: l }} className={btn.primary}>{t("planCustom", l)}</Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
