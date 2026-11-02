import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
import { asLocale, type L, type Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { OFFERS, OFFER_CATEGORIES, offerDuration, offerLength, type OfferCategory, type OfferLength } from "@/content/offers";
import { OFFER_PRICES, type OfferPrice } from "@/content/offer-prices";
import { OFFER_MAX_KM_PER_DAY } from "@/content/offer-route";
import { SITE } from "@/content/site";
import { CURRENCIES, RATES_DATE, formatPrice, useCurrency, type Currency } from "@/lib/currency";
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
  priceNote: { en: "Prices are indicative “from” prices per person, set in euros and converted at reference exchange rates; flights are not included. Your final price depends on dates, group size and hotel level and is confirmed in your written proposal.", ar: "الأسعار المعروضة أسعار تقريبية «ابتداءً من» للشخص الواحد، محددة باليورو ومحوَّلة بأسعار صرف مرجعية، ولا تشمل الطيران. يعتمد سعرك النهائي على المواعيد وعدد المسافرين ومستوى الفنادق، ويُؤكَّد في عرضك المكتوب.", ro: "Prețurile sunt orientative, „de la”, de persoană, stabilite în euro și convertite la cursuri de referință; zborurile nu sunt incluse. Prețul final depinde de date, mărimea grupului și nivelul hotelurilor și este confirmat în oferta scrisă." },
  longestDay: { en: "Longest day on the road", ar: "أطول يوم على الطريق", ro: "Cea mai lungă zi pe drum" },
  km: { en: "km", ar: "كم", ro: "km" },
  rates: { en: "Exchange rates as of", ar: "أسعار الصرف بتاريخ", ro: "Cursuri de schimb din" },
  currency: { en: "Currency", ar: "العملة", ro: "Monedă" },
  from: { en: "From", ar: "ابتداءً من", ro: "De la" },
  perPerson: { en: "per person", ar: "للشخص", ro: "de persoană" },
  onRequest: { en: "Price on request", ar: "السعر عند الطلب", ro: "Preț la cerere" },
  byGroup: { en: "Price by group size", ar: "السعر حسب عدد المسافرين", ro: "Preț după mărimea grupului" },
  double: { en: "Per person, sharing a double room", ar: "للشخص، في غرفة مزدوجة", ro: "De persoană, în cameră dublă" },
  single: { en: "Single room supplement", ar: "إضافة الغرفة المفردة", ro: "Supliment cameră single" },
  selfDrive: { en: "Self-drive", ar: "بالقيادة الذاتية", ro: "Conduci tu" },
  none: { en: "No trips match these filters — try another length or category, or ask us for something tailor-made.", ar: "لا توجد رحلات تطابق هذا الاختيار — جرّب مدة أو فئة أخرى، أو اطلب منا رحلة مصممة خصيصًا.", ro: "Nicio călătorie nu corespunde filtrelor — încearcă altă durată sau categorie ori cere-ne ceva personalizat." },
  nightNote: { en: "For adults and groups of friends.", ar: "للبالغين ومجموعات الأصدقاء.", ro: "Pentru adulți și grupuri de prieteni." },
} satisfies Record<string, L>;

/** "1 trip" / "10 رحلات" / "20 de călătorii": number agreement per language. */
function tripCount(n: number, l: Locale) {
  if (l === "ar") return n === 1 ? "رحلة واحدة" : n === 2 ? "رحلتان" : n >= 3 && n <= 10 ? `${n} رحلات` : `${n} رحلة`;
  if (l === "ro") return n === 1 ? "1 călătorie" : n < 20 ? `${n} călătorii` : `${n} de călătorii`;
  return n === 1 ? "1 trip" : `${n} trips`;
}

const PAX_LABEL: Record<string, L> = {
  "8": { en: "8 travellers", ar: "8 مسافرين", ro: "8 persoane" },
  "6": { en: "6 travellers", ar: "6 مسافرين", ro: "6 persoane" },
  "4": { en: "4 travellers", ar: "4 مسافرين", ro: "4 persoane" },
  "2": { en: "2 travellers", ar: "مسافران", ro: "2 persoane" },
};
const CUR_LABEL: Record<Currency, L> = { KWD: { en: "KWD", ar: "د.ك", ro: "KWD" }, USD: { en: "$ USD", ar: "$ دولار", ro: "$ USD" }, EUR: { en: "€ EUR", ar: "€ يورو", ro: "€ EUR" } };

/** Lowest per-person price we show for an offer, in EUR. */
function fromPrice(p: OfferPrice | undefined): number | undefined {
  if (!p) return undefined;
  const all = [p.from, ...Object.values(p.pax ?? {}), ...Object.values(p.selfDrive ?? {})].filter((v): v is number => !!v);
  return all.length ? Math.min(...all) : undefined;
}

function PriceBlock({ p, c, l }: { p: OfferPrice | undefined; c: Currency; l: Locale }) {
  const from = fromPrice(p);
  if (!p || from === undefined) return <p className="text-sm font-semibold text-muted-foreground">{C.onRequest[l]}</p>;
  const pax = (["8", "6", "4", "2"] as const).filter((k) => p.pax?.[k]);
  const sd = (["8", "6", "4", "2"] as const).filter((k) => p.selfDrive?.[k]);
  const fmt = (v: number) => formatPrice(v, c, l);
  return (
    <div>
      <p className="text-sm"><span className="text-muted-foreground">{C.from[l]} </span><span className="text-xl font-bold text-midnight">{fmt(from)}</span><span className="text-muted-foreground"> {C.perPerson[l]}</span></p>
      {(pax.length > 0 || p.single || sd.length > 0) && (
        <details className="mt-1 text-sm">
          <summary className="cursor-pointer py-1 font-semibold text-sky">{C.byGroup[l]}</summary>
          <dl className="mt-1 space-y-1 rounded-2xl bg-muted/50 p-3">
            {pax.length > 0 && <p className="text-xs text-muted-foreground">{C.double[l]}</p>}
            {pax.map((k) => <div key={k} className="flex justify-between gap-3"><dt>{PAX_LABEL[k]![l]}</dt><dd className="font-semibold">{fmt(p.pax![k]!)}</dd></div>)}
            {sd.map((k) => <div key={`sd${k}`} className="flex justify-between gap-3"><dt>{C.selfDrive[l]} · {PAX_LABEL[k]![l]}</dt><dd className="font-semibold">{fmt(p.selfDrive![k]!)}</dd></div>)}
            {p.single && <div className="flex justify-between gap-3"><dt>{C.single[l]}</dt><dd className="font-semibold">+{fmt(p.single)}</dd></div>}
          </dl>
        </details>
      )}
    </div>
  );
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
  const [cur, setCur] = useCurrency();
  const prices = SITE.showPrices;
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
        {prices && (
          <div role="group" aria-label={C.currency[l]} className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold">{C.currency[l]}:</span>
            {CURRENCIES.map((k) => (
              <button key={k} type="button" onClick={() => setCur(k)} aria-pressed={cur === k} className={cn(chip(cur === k), "min-h-10 text-xs")}>{CUR_LABEL[k][l]}</button>
            ))}
          </div>
        )}
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
                {OFFER_MAX_KM_PER_DAY[o.id] && <p className="text-xs text-muted-foreground">{C.longestDay[l]}: <span className="font-semibold text-foreground">{OFFER_MAX_KM_PER_DAY[o.id]} {C.km[l]}</span></p>}
                {prices && <div className="mt-1 border-t border-border pt-3"><PriceBlock p={OFFER_PRICES[o.id]} c={cur} l={l} /></div>}
                <Link to="/$locale/plan-your-trip" params={{ locale: l }} search={{ offer: o.id }} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-1 text-sm font-bold text-sky">{C.ask[l]}<ArrowRight className="flip-rtl h-4 w-4" aria-hidden /></Link>
              </article>
            );
          })}
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">{C.note[l]}</p>
        {prices && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{C.priceNote[l]} {C.rates[l]} {new Intl.DateTimeFormat({ en: "en-GB", ar: "ar-KW", ro: "ro-RO" }[l], { dateStyle: "long", numberingSystem: "latn" }).format(new Date(RATES_DATE))}.</p>}
        <Link to="/$locale/plan-your-trip" params={{ locale: l }} className={`${btn.primary} mt-6`}>{t("requestPersonalQuote", l)}</Link>
      </section>
    </>
  );
}
