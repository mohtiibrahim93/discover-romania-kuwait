import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
import { asLocale, type L, type Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { OFFERS, OFFER_CATEGORIES, offerDuration, offerLength, type OfferCategory, type OfferLength } from "@/content/offers";
import { PageHero, btn } from "@/components/site/ui";

const C = {
  intro: { en: "Every trip and experience we can arrange in Romania and nearby — tell us what catches your eye and we shape it around your family or group.", ar: "كل الرحلات والتجارب التي يمكننا ترتيبها في رومانيا وما حولها — أخبرنا بما يعجبك ونصممه حول عائلتك أو مجموعتك.", ro: "Toate călătoriile și experiențele pe care le putem organiza în România și în apropiere — spune-ne ce îți place și le adaptăm familiei sau grupului tău." },
  all: { en: "All", ar: "الكل", ro: "Toate" },
  anyLength: { en: "Any length", ar: "أي مدة", ro: "Orice durată" },
  day: { en: "Day trips", ar: "رحلات يوم واحد", ro: "Excursii de o zi" },
  short: { en: "2–5 days", ar: "من 2 إلى 5 أيام", ro: "2–5 zile" },
  long: { en: "6+ days", ar: "6 أيام فأكثر", ro: "6+ zile" },
  ask: { en: "Ask about this", ar: "اسأل عن هذه الرحلة", ro: "Întreabă despre aceasta" },
  flexible: { en: "Length to suit you", ar: "المدة حسب رغبتك", ro: "Durată la alegere" },
  note: { en: "Every trip is private and quoted personally — dates, group size and hotel level shape the price. Programmes and availability are confirmed in your written proposal.", ar: "كل رحلة خاصة ويُعدّ سعرها شخصيًا — فالمواعيد وعدد المسافرين ومستوى الفنادق تحدد السعر. تُؤكَّد البرامج والتوفر في عرضك المكتوب.", ro: "Fiecare călătorie este privată și primește o ofertă personală — datele, mărimea grupului și nivelul hotelurilor stabilesc prețul. Programele și disponibilitatea sunt confirmate în oferta scrisă." },
  none: { en: "No trips match these filters — try another length or category, or ask us for something tailor-made.", ar: "لا توجد رحلات تطابق هذا الاختيار — جرّب مدة أو فئة أخرى، أو اطلب منا رحلة مصممة خصيصًا.", ro: "Nicio călătorie nu corespunde filtrelor — încearcă altă durată sau categorie ori cere-ne ceva personalizat." },
  nightNote: { en: "For adults and groups of friends.", ar: "للبالغين ومجموعات الأصدقاء.", ro: "Pentru adulți și grupuri de prieteni." },
} satisfies Record<string, L>;

/** "1 trip" / "10 رحلات" / "20 de călătorii": number agreement per language. */
function tripCount(n: number, l: Locale) {
  if (l === "ar") return n === 1 ? "رحلة واحدة" : n === 2 ? "رحلتان" : n >= 3 && n <= 10 ? `${n} رحلات` : `${n} رحلة`;
  if (l === "ro") return n === 1 ? "1 călătorie" : n < 20 ? `${n} călătorii` : `${n} de călătorii`;
  return n === 1 ? "1 trip" : `${n} trips`;
}

const CATS = OFFER_CATEGORIES.map((c) => c.id) as [OfferCategory, ...OfferCategory[]];
const search = z.object({
  cat: z.enum(CATS).optional().catch(undefined),
  len: z.enum(["day", "short", "long"]).optional().catch(undefined),
});

export const Route = createFileRoute("/$locale/trips")({
  validateSearch: (s) => search.parse(s),
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, t("trips", l), C.intro[l], "/trips"); },
  component: Page,
});

const chip = (on: boolean) => cn("inline-flex min-h-11 items-center rounded-full border-[1.5px] px-4 text-sm font-semibold transition", on ? "border-midnight bg-midnight text-on-dark" : "border-border bg-card hover:border-midnight");

function Page() {
  const l = asLocale(Route.useParams().locale);
  const { cat, len } = Route.useSearch();
  const list = OFFERS.filter((o) => (!cat || o.cat === cat) && (!len || offerLength(o) === len || offerLength(o) === undefined));
  const lengths: [OfferLength | undefined, string][] = [[undefined, C.anyLength[l]], ["day", C.day[l]], ["short", C.short[l]], ["long", C.long[l]]];
  return (
    <>
      <PageHero media="mountains" eyebrow={t("trips", l)} title={t("trips", l)} intro={C.intro[l]} />
      <section className="container-edit py-12 md:py-16">
        <nav aria-label={t("trips", l)} className="flex flex-wrap gap-2">
          <Link to="/$locale/trips" params={{ locale: l }} search={{ len }} className={chip(!cat)} aria-current={!cat ? "true" : undefined}>{C.all[l]}</Link>
          {OFFER_CATEGORIES.map((c) => (
            <Link key={c.id} to="/$locale/trips" params={{ locale: l }} search={{ cat: c.id, len }} className={chip(cat === c.id)} aria-current={cat === c.id ? "true" : undefined}>{c.label[l]}</Link>
          ))}
        </nav>
        <div className="mt-3 flex flex-wrap gap-2">
          {lengths.map(([k, label]) => (
            <Link key={label} to="/$locale/trips" params={{ locale: l }} search={{ cat, len: k }} className={cn(chip(len === k), "min-h-10 text-xs")}>{label}</Link>
          ))}
        </div>
        <Link to="/$locale/tours" params={{ locale: l }} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-sky">{t("seeTours", l)}<ArrowRight className="flip-rtl h-4 w-4" aria-hidden /></Link>
        <p className="mt-4 border-b border-border pb-4 text-sm text-muted-foreground">{tripCount(list.length, l)}{cat === "night" ? ` · ${C.nightNote[l]}` : ""}</p>

        {list.length === 0 && <p className="mt-6 rounded-2xl bg-butter p-4 text-sm text-butter-ink">{C.none[l]}</p>}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((o) => {
            const dur = offerDuration(o, l);
            return (
              <article key={o.id} id={o.id} className="flex flex-col gap-2 rounded-3xl border-[1.5px] border-border bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-terracotta">{OFFER_CATEGORIES.find((c) => c.id === o.cat)!.label[l]}</p>
                <h2 className="text-lg md:text-xl">{o.title[l]}</h2>
                <p className="text-sm text-muted-foreground">{[dur ?? C.flexible[l], o.places?.[l]].filter(Boolean).join(" · ")}</p>
                <Link to="/$locale/plan-your-trip" params={{ locale: l }} search={{ offer: o.id }} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-1 text-sm font-bold text-sky">{C.ask[l]}<ArrowRight className="flip-rtl h-4 w-4" aria-hidden /></Link>
              </article>
            );
          })}
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">{C.note[l]}</p>
        <Link to="/$locale/plan-your-trip" params={{ locale: l }} className={`${btn.primary} mt-6`}>{t("requestPersonalQuote", l)}</Link>
      </section>
    </>
  );
}
