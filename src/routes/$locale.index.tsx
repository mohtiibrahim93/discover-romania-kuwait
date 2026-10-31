import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { asLocale, useLocale, type L, type Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo, SITE_ORIGIN } from "@/lib/seo";
import { publishedTours } from "@/content/tours";
import { SERVICES, SERVICE_EXTRAS } from "@/content/services";
import { MEDIA } from "@/content/media";
import { useSiteContent } from "@/lib/site-content";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Img } from "@/components/site/ui";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { QuickPlanner } from "@/components/site/QuickPlanner";
import { HERO_SLIDES, HERO_SLIDES_AR, IllustrativeBadge, SlideControls, SlideImages, useSlideshow, type Slideshow } from "@/components/site/HeroSlideshow";

const C = {
  metaTitle: { en: "Discover Romania, Your Way.", ar: "اكتشف رومانيا على طريقتك", ro: "Descoperă România în felul tău." },
  title: { en: "Romania, at your family's pace.", ar: "اكتشف رومانيا على طريقتك", ro: "România, în ritmul familiei tale." },
  sub: { en: "Cool mountain mornings, castles and village days, away from the summer heat and planned around your family.", ar: "صباحات جبلية منعشة وقلاع وأيام في الريف، بعيدًا عن حرّ الصيف، ومُخطَّطة حسب عائلتك.", ro: "Dimineți răcoroase la munte, castele și zile la sat, departe de căldura verii, planificate în jurul familiei tale." },
  badge: { en: "Private family trips from Kuwait", ar: "رحلات عائلية خاصة من الكويت", ro: "Călătorii private de familie din Kuweit" },
  whatsapp: { en: "Plan on WhatsApp", ar: "خطّط رحلتك عبر واتساب", ro: "Planifică pe WhatsApp" },
  showPhoto: { en: "Show in the large photo", ar: "اعرضها في الصورة الكبيرة", ro: "Arat-o în fotografia mare" },
  journeysT: { en: "Featured family journeys", ar: "رحلات عائلية مختارة", ro: "Circuite de familie recomandate" },
  servicesT: { en: "Our services", ar: "خدماتنا", ro: "Serviciile noastre" },
  allServices: { en: "All services", ar: "كل الخدمات", ro: "Toate serviciile" },
  madeT: { en: "Made for families from Kuwait", ar: "مصمَّمة لعائلات الكويت", ro: "Gândit pentru familiile din Kuweit" },
  whenT: { en: "When would you like to go?", ar: "متى تودّ السفر؟", ro: "Când ai vrea să pleci?" },
  stepsT: { en: "How it works", ar: "كيف تتم العملية", ro: "Cum funcționează" },
  finalT: { en: "Begin with a conversation.", ar: "ابدأ بحوار.", ro: "Totul începe cu o discuție." },
  nonBinding: { en: "Sending an inquiry is free and non-binding.", ar: "إرسال الاستفسار مجاني وغير مُلزِم.", ro: "Trimiterea unei solicitări este gratuită și fără obligații." },
} satisfies Record<string, L>;

/** Same trust points in every language; the registration line appears once SITE.businessRegistration is set. */
const TRUST: { t: L; d: L }[] = [
  { t: { en: "Kuwait office", ar: "مكتب في الكويت", ro: "Birou în Kuweit" }, d: { en: "Attentive, personal consultation", ar: "استشارة شخصية واهتمام بالتفاصيل", ro: "Consultanță atentă, personală" } },
  { t: { en: "Written quote first", ar: "عرض سعر مكتوب أولًا", ro: "Întâi oferta scrisă" }, d: { en: "Nothing is booked until you confirm", ar: "لا يُحجز شيء قبل تأكيدك", ro: "Nimic nu se rezervă până nu confirmi" } },
  { t: { en: "We reply on WhatsApp", ar: "نرد عبر واتساب", ro: "Răspundem pe WhatsApp" }, d: { en: "Or send the trip form", ar: "أو أرسل نموذج الرحلة", ro: "Sau trimite formularul" } },
  { t: { en: "Free inquiry", ar: "الاستفسار مجاني", ro: "Solicitare gratuită" }, d: { en: "No obligation", ar: "وغير مُلزِم", ro: "Fără obligații" } },
];

const MADE: { t: L; d: L }[] = [
  { t: { en: "Halal meals", ar: "وجبات حلال", ro: "Mese halal" }, d: { en: "Requested at every stop, confirmed in your quote", ar: "نطلبها في كل محطة وتُؤكَّد في عرض السعر", ro: "Solicitate la fiecare oprire și confirmate în ofertă" } },
  { t: { en: "Paced around prayer and rest", ar: "إيقاع يراعي الصلاة والراحة", ro: "Ritm care ține cont de rugăciune și odihnă" }, d: { en: "Short drives, rest days, no rushing", ar: "مسافات قصيرة وأيام راحة دون استعجال", ro: "Drumuri scurte, zile de odihnă, fără grabă" } },
  { t: { en: "Private family van & driver", ar: "سيارة عائلية خاصة مع سائق", ro: "Microbuz privat cu șofer" }, d: { en: "Room for the whole family and the luggage", ar: "تتسع للعائلة والأمتعة", ro: "Loc pentru toată familia și bagaje" } },
  { t: { en: "Villas & private chalets", ar: "فلل وشاليهات خاصة", ro: "Vile și cabane private" }, d: { en: "Or 4- and 5-star hotels: you choose", ar: "أو فنادق 4 و5 نجوم حسب اختيارك", ro: "Sau hoteluri de 4 și 5 stele, după preferință" } },
  { t: { en: "Arabic-speaking guide", ar: "مرشد يتحدث العربية", ro: "Ghid vorbitor de arabă" }, d: { en: "On request, subject to availability", ar: "عند الطلب وحسب التوفر", ro: "La cerere, în funcție de disponibilitate" } },
  { t: { en: "Visa & entry guidance", ar: "إرشادات التأشيرة والدخول", ro: "Informații despre viză și intrare" }, d: { en: "Linked to official EU sources", ar: "مرتبطة بمصادر الاتحاد الأوروبي الرسمية", ro: "Cu trimitere la surse oficiale UE" } },
];

const WHEN: { id: "summer" | "eid" | "winter"; t: L; d: L; tone: string }[] = [
  { id: "summer", t: { en: "Summer", ar: "الصيف", ro: "Vara" }, d: { en: "Cool mountain air, away from the heat", ar: "هواء الجبال المنعش، بعيدًا عن الحر", ro: "Aer răcoros de munte, departe de căldură" }, tone: "bg-mint text-mint-ink" },
  { id: "eid", t: { en: "Eid & school holidays", ar: "العيد والعطل المدرسية", ro: "Eid și vacanțe școlare" }, d: { en: "Tell us your dates early", ar: "أخبرنا بمواعيدك مبكرًا", ro: "Spune-ne datele din timp" }, tone: "bg-butter text-butter-ink" },
  { id: "winter", t: { en: "Winter", ar: "الشتاء", ro: "Iarna" }, d: { en: "Snow and skiing in Poiana Brașov", ar: "الثلج والتزلج في بويانا براشوف", ro: "Zăpadă și schi în Poiana Brașov" }, tone: "bg-sky-soft text-sky-ink" },
];

const STEPS: { t: L; d: L }[] = [
  { t: { en: "Share your ideas", ar: "شاركنا أفكارك", ro: "Spune-ne ideile tale" }, d: { en: "On WhatsApp or with the 30-second planner", ar: "عبر واتساب أو المخطِّط السريع", ro: "Pe WhatsApp sau cu planificatorul rapid" } },
  { t: { en: "Receive your itinerary and quote", ar: "استلم برنامجك وعرض السعر", ro: "Primește itinerariul și oferta" }, d: { en: "In writing, refined together until it's right", ar: "مكتوبًا، ونطوّره معًا حتى يناسبك", ro: "În scris, ajustate împreună până sunt potrivite" } },
  { t: { en: "Confirm and travel", ar: "أكّد وسافر", ro: "Confirmă și călătorește" }, d: { en: "After written terms and supplier confirmation", ar: "بعد الشروط المكتوبة وتأكيد المزودين", ro: "După termenii scriși și confirmarea furnizorilor" } },
];

export const Route = createFileRoute("/$locale/")({
  head: ({ params }) => {
    const l = asLocale(params.locale);
    return seo(l, C.metaTitle[l], C.sub[l]);
  },
  component: Home,
});

const card = "rounded-3xl border-[1.5px] border-border bg-card";
const h2 = "text-3xl md:text-4xl";

function Home() {
  const l = useLocale();
  const { site } = useSiteContent();
  const s = useSlideshow(HERO_SLIDES.length);
  const tours = publishedTours().filter((x) => x.featured).slice(0, 3);
  const wa = site.whatsappDigits ? whatsappLink(site.whatsappDigits, l, { pageUrl: `${SITE_ORIGIN}/${l}` }) : undefined;
  const cta = <PrimaryCta l={l} href={wa} />;

  return (
    <>
      {l === "ar" ? <HeroLight l={l} s={s} cta={cta} /> : <HeroDark l={l} s={s} cta={cta} />}

      <section className={cn("container-edit relative z-10 mt-6", l !== "ar" && "lg:-mt-10")}>
        <div className="grid gap-4 rounded-3xl bg-midnight p-5 text-on-dark sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
          {TRUST.map((x, i) => (
            <div key={i} className={cn("flex flex-col gap-0.5", i > 0 && "lg:border-s lg:border-on-dark-muted/25 lg:ps-5")}>
              <strong className="text-gold">{x.t[l]}</strong>
              <span className="text-sm text-on-dark-muted">{i === 0 && site.businessRegistration ? site.businessRegistration : x.d[l]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container-edit py-14 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className={h2}>{C.journeysT[l]}</h2>
          <Link to="/$locale/tours" params={{ locale: l }} className="inline-flex min-h-11 items-center gap-2 font-bold text-sky">{t("exploreTours", l)}<ArrowRight className="flip-rtl h-4 w-4" aria-hidden /></Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {tours.map((x) => (
            <article key={x.id} className={cn(card, "flex flex-col overflow-hidden")}>
              <div className="aspect-[16/10] overflow-hidden"><Img k={x.media} /></div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-terracotta"><span className="ltr-isolate">{x.days}</span> {t("days", l)} · {x.places[l]}</p>
                <h3 className="text-xl md:text-2xl"><Link to="/$locale/tours/$slug" params={{ locale: l, slug: x.slug }} className="hover:underline">{x.title[l]}</Link></h3>
                <p className="text-sm text-muted-foreground">{x.tagline[l]}</p>
                <Link to="/$locale/tours/$slug" params={{ locale: l, slug: x.slug }} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-2 text-sm font-bold text-sky">{t("viewJourney", l)}<ArrowRight className="flip-rtl h-4 w-4" aria-hidden /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-edit py-6 md:py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className={h2}>{C.servicesT[l]}</h2>
          <Link to="/$locale/services" params={{ locale: l }} className="inline-flex min-h-11 items-center gap-2 font-bold text-sky">{C.allServices[l]}<ArrowRight className="flip-rtl h-4 w-4" aria-hidden /></Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((x) => (
            <Link key={x.id} to="/$locale/services" params={{ locale: l }} hash={x.id} className={cn(card, "flex flex-col gap-1.5 p-5 transition hover:border-sky")}>
              <span className="text-xs font-bold uppercase tracking-wide text-terracotta">{x.tag[l]}</span>
              <strong className="text-lg">{x.title[l]}</strong>
              <span className="text-sm leading-relaxed text-muted-foreground">{x.short[l]}</span>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{SERVICE_EXTRAS[l]}</p>
        <Link to="/$locale/trips" params={{ locale: l }} className="mt-3 inline-flex min-h-11 items-center gap-2 font-bold text-sky">{t("trips", l)}<ArrowRight className="flip-rtl h-4 w-4" aria-hidden /></Link>
      </section>

      <section className="container-edit py-14 md:py-16">
        <h2 className={h2}>{C.madeT[l]}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MADE.map((x, i) => (
            <div key={i} className={cn(card, "p-5")}>
              <strong className="block">{i === 5 ? <Link to="/$locale/travel-information" params={{ locale: l }} className="hover:underline">{x.t[l]}</Link> : x.t[l]}</strong>
              <span className="text-sm text-muted-foreground">{x.d[l]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container-edit py-6 md:py-8">
        <h2 className={h2}>{C.whenT[l]}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {WHEN.map((x) => (
            <Link key={x.id} to="/$locale/plan-your-trip" params={{ locale: l }} search={{ when: x.id }} className={cn("group flex items-end justify-between gap-3 rounded-3xl p-6 transition hover:brightness-95", x.tone)}>
              <span><strong className="block font-display text-2xl">{x.t[l]}</strong><span>{x.d[l]}</span></span>
              <ArrowRight className="flip-rtl h-5 w-5 shrink-0 transition group-hover:translate-x-1" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <section className="container-edit py-14 md:py-16">
        <h2 className={h2}>{C.stepsT[l]}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((x, i) => (
            <li key={i} className={cn(card, "flex gap-4 p-5 md:flex-col")}>
              <span className="ltr-isolate flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-midnight font-bold text-gold">{i + 1}</span>
              <span><strong className="block text-lg">{x.t[l]}</strong><span className="text-sm text-muted-foreground">{x.d[l]}</span></span>
            </li>
          ))}
        </ol>
        <Link to="/$locale/how-it-works" params={{ locale: l }} className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-sky">{t("howItWorks", l)}<ArrowRight className="flip-rtl h-4 w-4" aria-hidden /></Link>
      </section>

      <section className="container-edit pb-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] bg-midnight p-8 text-on-dark md:flex-row md:items-center md:p-11">
          <div>
            <h2 className="text-3xl text-on-dark md:text-4xl">{C.finalT[l]}</h2>
            <p className="mt-2 text-on-dark-muted">{C.nonBinding[l]}</p>
          </div>
          {cta}
        </div>
      </section>
    </>
  );
}

function PrimaryCta({ l, href }: { l: Locale; href: string | undefined }) {
  const cls = "inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-gold px-6 font-bold text-midnight transition hover:bg-champagne";
  if (!href) return <Link to="/$locale/plan-your-trip" params={{ locale: l }} className={cls}>{t("planTrip", l)}</Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}><WhatsAppIcon className="h-5 w-5" />{C.whatsapp[l]}</a>;
}

/** English and Romanian: full photo hero with the headline and planner on the slideshow. */
function HeroDark({ l, s, cta }: { l: Locale; s: Slideshow; cta: ReactNode }) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-midnight md:mx-4 md:mt-4 md:rounded-[2rem]">
        <SlideImages slides={HERO_SLIDES} s={s} l={l} className="-z-20" />
        <div className="absolute inset-0 -z-10 bg-midnight/45" />
        <div className="container-edit grid min-h-[38rem] items-end gap-10 pb-16 pt-32 md:min-h-[44rem] lg:grid-cols-[1fr_26rem] lg:pb-20">
          <div className="flex flex-col gap-5">
            <p lang="ar" dir="rtl" className="self-start text-xl text-gold" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>اكتشف رومانيا على طريقتك</p>
            <h1 className="fade-up max-w-3xl text-5xl leading-none text-on-dark md:text-7xl">{C.title[l]}</h1>
            <p className="max-w-xl text-lg leading-relaxed text-on-dark-muted">{C.sub[l]}</p>
            <div className="flex flex-wrap items-center gap-3">
              {cta}
              <SlideControls slides={HERO_SLIDES} s={s} l={l} />
              <IllustrativeBadge slides={HERO_SLIDES} l={l} />
            </div>
          </div>
          <QuickPlanner className="hidden lg:flex" />
        </div>
      </section>
      <div className="container-edit relative z-10 -mt-8 lg:hidden"><QuickPlanner className="border-[1.5px] border-border" /></div>
    </>
  );
}

/** Arabic: light page, colourful slideshow with the text card, planner and two photo shortcuts beside it. */
function HeroLight({ l, s, cta }: { l: Locale; s: Slideshow; cta: ReactNode }) {
  return (
    <section className="mx-auto max-w-[90rem] px-3 pt-24 md:px-6 md:pt-28">
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="relative isolate min-h-[34rem] overflow-hidden rounded-[2rem] bg-midnight lg:min-h-[41rem]">
          <SlideImages slides={HERO_SLIDES_AR} s={s} l={l} className="-z-20" />
          <div className="absolute end-3 top-3 flex flex-col items-end gap-2">
            <IllustrativeBadge slides={HERO_SLIDES_AR} l={l} />
            <SlideControls slides={HERO_SLIDES_AR} s={s} l={l} />
          </div>
          <div className="absolute inset-x-3 bottom-3 flex flex-col gap-3 rounded-3xl bg-midnight/75 p-5 text-on-dark md:inset-x-auto md:bottom-8 md:start-8 md:w-[35rem] md:p-7">
            <span className="self-start rounded-full bg-gold px-3 py-1 text-sm font-semibold text-midnight">{C.badge[l]}</span>
            <h1 className="fade-up text-4xl text-on-dark md:text-5xl">{C.title[l]}</h1>
            <p lang="en" dir="ltr" className="-mt-2 self-start font-display text-lg text-gold">Discover Romania, your way</p>
            <p className="hidden text-lg leading-relaxed text-on-dark-muted md:block">{C.sub[l]}</p>
            <div className="flex flex-wrap gap-3">
              {cta}
              <Link to="/$locale/tours" params={{ locale: l }} className="inline-flex min-h-13 items-center rounded-2xl border-[1.5px] border-on-dark-muted px-6 font-semibold text-on-dark">{t("exploreTours", l)}</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid h-32 grid-cols-2 gap-3 lg:order-2 lg:h-auto lg:flex-1">
            {[1, 2].map((k) => {
              const m = MEDIA[HERO_SLIDES_AR[k]!];
              const on = s.index === k;
              return (
                <button key={k} type="button" onClick={() => s.setIndex(k)} aria-label={`${C.showPhoto[l]} ${k + 1}`} aria-pressed={on}
                  className={cn("overflow-hidden rounded-3xl outline-offset-2", on && "outline outline-[3px] outline-leaf")}>
                  <img src={m.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </button>
              );
            })}
          </div>
          <QuickPlanner variant="mint" className="lg:order-1" />
        </div>
      </div>
    </section>
  );
}
