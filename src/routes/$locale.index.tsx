import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, FileText, Handshake } from "lucide-react";
import { asLocale, useLocale, type L } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { publishedTours } from "@/content/tours";
import { DESTINATIONS } from "@/content/destinations";
import { TRAVEL_STYLES } from "@/content/styles";
import { FAQ } from "@/content/faq";
import { Img, SectionHead, btn } from "@/components/site/ui";
import { TourCard } from "@/components/site/TourCard";

const C = {
  title: { en: "Discover Romania, Your Way.", ar: "اكتشف رومانيا على طريقتك", ro: "Descoperă România în felul tău." },
  sub: { en: "From enchanting castles and mountain escapes to memorable family journeys, discover a different side of Europe with travel experiences shaped around you.", ar: "من القلاع الساحرة والجبال الخلابة إلى الرحلات العائلية المميزة، اكتشف وجهًا مختلفًا من أوروبا مع تجارب سفر تُصمَّم وفق اهتماماتك.", ro: "De la castele fascinante și refugii montane la vacanțe de familie memorabile, descoperă România prin experiențe create în jurul preferințelor tale." },
  cue: { en: "Romania · Europe", ar: "رومانيا · أوروبا", ro: "România · Europa" },
  diffT: { en: "A Different Side of Europe", ar: "وجه مختلف من أوروبا", ro: "O altă față a Europei" },
  diffP: { en: "Cool mountain mornings, castles above forested valleys, old towns made for slow evenings and countryside that still keeps its rhythms. Romania offers space, comfort and discovery — ideal for families and couples who want something beyond the familiar capitals.", ar: "صباحات جبلية منعشة، وقلاع تطل على وديان مكسوة بالغابات، وبلدات قديمة تليق بالأمسيات الهادئة، وريف ما زال يحتفظ بإيقاعه. تقدم رومانيا المساحة والراحة والاكتشاف، وهي مثالية للعائلات والأزواج الباحثين عن تجربة تتجاوز العواصم المألوفة.", ro: "Dimineți răcoroase la munte, castele deasupra văilor împădurite, orașe vechi făcute pentru seri lente și sate care își păstrează ritmul. România oferă spațiu, confort și descoperire — ideală pentru familii și cupluri care caută mai mult decât capitalele cunoscute." },
  featT: { en: "Proposed Journeys", ar: "رحلات مقترحة", ro: "Circuite propuse" },
  featP: { en: "Illustrative concepts to start the conversation. Each is adapted to you and confirmed only in a written quotation.", ar: "تصوّرات توضيحية لبدء الحوار. تُكيَّف كل رحلة وفقك ولا تُؤكَّد إلا في عرض سعر مكتوب.", ro: "Concepte ilustrative pentru a începe discuția. Fiecare este adaptat ție și confirmat doar printr-o ofertă scrisă." },
  stylesP: { en: "Choose the mood of your journey — we shape the details.", ar: "اختر طابع رحلتك، ونحن نعتني بالتفاصيل.", ro: "Alege atmosfera călătoriei — noi ne ocupăm de detalii." },
  thoughtT: { en: "Travel, Thoughtfully Planned", ar: "سفر يُخطَّط له بعناية", ro: "Călătorii planificate cu grijă" },
  thought: [
    { en: "Pacing you choose", ar: "إيقاع تختاره أنت", ro: "Ritmul pe care îl alegi" },
    { en: "Destination knowledge, subject to partner confirmation", ar: "معرفة بالوجهة، تخضع لتأكيد الشركاء", ro: "Cunoașterea destinației, sub rezerva confirmării partenerilor" },
    { en: "Attentive, personal consultation", ar: "استشارة شخصية واهتمام بالتفاصيل", ro: "Consultanță atentă, personală" },
    { en: "Flexible options", ar: "خيارات مرنة", ro: "Opțiuni flexibile" },
    { en: "A transparent quotation process", ar: "عملية تسعير شفافة", ro: "Un proces de ofertare transparent" },
  ],
  designT: { en: "Your Journey, Designed Around You", ar: "رحلتك، مصممة من أجلك", ro: "Călătoria ta, creată în jurul tău" },
  designP: { en: "Tell us who is travelling, when, and what matters most. We return with a proposed itinerary to refine together.", ar: "أخبرنا من سيسافر ومتى وما الأهم بالنسبة لك، وسنعود إليك ببرنامج مقترح نطوّره معًا.", ro: "Spune-ne cine călătorește, când și ce contează cel mai mult. Revenim cu un itinerariu propus, pe care îl rafinăm împreună." },
  stepsT: { en: "How it works", ar: "كيف تتم العملية", ro: "Cum funcționează" },
  steps: [
    { en: "Discover and share your ideas", ar: "اكتشف وشاركنا أفكارك", ro: "Descoperă și împărtășește-ne ideile tale" },
    { en: "Receive a personalised proposed itinerary and quote", ar: "استلم برنامجًا مقترحًا وعرض سعر مخصصًا", ro: "Primește un itinerariu propus și o ofertă personalizată" },
    { en: "Confirm with an authorised travel team, after written terms and supplier confirmation", ar: "أكّد مع فريق سفر مُخوَّل بعد الشروط المكتوبة وتأكيد المزودين", ro: "Confirmă cu o echipă de turism autorizată, după termenii scriși și confirmarea furnizorilor" },
  ],
  nonBinding: { en: "Sending an inquiry is free and non-binding.", ar: "إرسال الاستفسار مجاني وغير مُلزِم.", ro: "Trimiterea unei solicitări este gratuită și fără obligații." },
  finalT: { en: "Begin with a conversation.", ar: "ابدأ بحوار.", ro: "Totul începe cu o discuție." },
} satisfies Record<string, L | L[]>;

export const Route = createFileRoute("/$locale/")({
  head: ({ params }) => {
    const l = asLocale(params.locale);
    return seo(l, C.title[l], C.sub[l]);
  },
  component: Home,
});

function Home() {
  const l = useLocale();
  const tours = publishedTours().filter((x) => x.featured).slice(0, 3);
  return (
    <>
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-midnight">
        <div className="absolute inset-0 -z-10"><Img k="mountains" eager className="object-[60%_center]" /></div>
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="container-edit pb-16 pt-32 md:pb-24">
          <p className="eyebrow fade-up mb-5 flex items-center gap-3 text-champagne"><span className="rule-champagne" />{C.cue[l]}</p>
          <h1 className="fade-up max-w-4xl text-5xl leading-[1.02] text-on-dark md:text-7xl lg:text-8xl">{C.title[l]}</h1>
          <p className="fade-up mt-6 max-w-xl text-base leading-relaxed text-on-dark-muted md:text-lg">{C.sub[l]}</p>
          <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/$locale/tours" params={{ locale: l }} className={btn.light}>{t("exploreTours", l)}<ArrowRight className="flip-rtl h-4 w-4" /></Link>
            <Link to="/$locale/plan-your-trip" params={{ locale: l }} className={btn.ghostLight}>{t("planCustom", l)}</Link>
          </div>
        </div>
      </section>

      <section className="container-edit grid gap-10 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-5 md:pt-16">
          <SectionHead eyebrow={t("why", l)} title={C.diffT[l]} intro={C.diffP[l]} />
          <Link to="/$locale/why-romania" params={{ locale: l }} className={`${btn.link} mt-6`}>{t("readMore", l)}<ArrowRight className="flip-rtl h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:col-span-7">
          <div className="row-span-2 aspect-[3/4] overflow-hidden"><Img k="oldTown" /></div>
          <div className="aspect-square overflow-hidden"><Img k="countryside" /></div>
          <div className="aspect-square overflow-hidden"><Img k="delta" /></div>
        </div>
      </section>

      <section className="bg-mist py-24 md:py-32">
        <div className="container-edit">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead eyebrow={t("tours", l)} title={C.featT[l]} intro={C.featP[l]} />
            <Link to="/$locale/tours" params={{ locale: l }} className={btn.outline}>{t("exploreTours", l)}</Link>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">{tours.map((x) => <TourCard key={x.id} tour={x} />)}</div>
        </div>
      </section>

      <section className="container-edit py-24 md:py-32">
        <SectionHead eyebrow={t("styles", l)} title={t("styles", l)} intro={C.stylesP[l]} />
        <div className="mt-12 grid grid-cols-2 gap-px bg-border md:grid-cols-3">
          {TRAVEL_STYLES.map((s, i) => (
            <Link key={s.id} to="/$locale/tours" params={{ locale: l }} search={{ style: s.id }}
              className="group flex min-h-40 flex-col justify-between bg-background p-6 transition hover:bg-card md:min-h-52 md:p-8">
              <span className="font-display text-sm text-champagne ltr-isolate">0{i + 1}</span>
              <span>
                <span className="block font-display text-xl text-primary md:text-2xl">{s.title[l]}</span>
                <span className="mt-2 hidden text-sm text-muted-foreground md:line-clamp-2 md:block">{s.intro[l]}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary py-24 text-on-dark md:py-32">
        <div className="container-edit grid gap-12 md:grid-cols-2">
          <SectionHead light eyebrow={SITE_EYEBROW[l]} title={C.thoughtT[l]} />
          <ul className="divide-y divide-on-dark-muted/20 border-y border-on-dark-muted/20">
            {C.thought.map((x, i) => <li key={i} className="flex gap-5 py-5 text-lg"><span className="ltr-isolate font-display text-champagne">0{i + 1}</span>{x[l]}</li>)}
          </ul>
        </div>
      </section>

      <section className="container-edit py-24 md:py-32">
        <SectionHead eyebrow={t("ourDestinations", l)} title={t("ourDestinations", l)} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((d) => (
            <Link key={d.slug} to="/$locale/destinations/$slug" params={{ locale: l, slug: d.slug }} className="group relative block aspect-[4/5] overflow-hidden bg-midnight">
              <Img k={d.media} className="transition-transform duration-700 group-hover:scale-105" />
              <div className="hero-overlay absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-3xl text-on-dark">{d.name[l]}</h3>
                <p className="mt-1 text-sm text-on-dark-muted">{d.teaser[l]}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-midnight">
        <div className="absolute inset-0 -z-10 opacity-60"><Img k="countryside" /></div>
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="container-edit py-28 md:py-40">
          <div className="max-w-xl">
            <SectionHead light eyebrow={t("tailor", l)} title={C.designT[l]} intro={C.designP[l]} />
            <Link to="/$locale/plan-your-trip" params={{ locale: l }} className={`${btn.light} mt-8`}>{t("planTrip", l)}</Link>
          </div>
        </div>
      </section>

      <section className="container-edit py-24 md:py-32">
        <SectionHead eyebrow={t("tailor", l)} title={C.stepsT[l]} intro={C.nonBinding[l]} />
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {C.steps.map((s, i) => {
            const Icon = [Compass, FileText, Handshake][i];
            return (
              <li key={i} className="border-t border-primary pt-6">
                <Icon className="h-6 w-6 text-accent" aria-hidden />
                <p className="ltr-isolate mt-4 font-display text-sm text-champagne">0{i + 1}</p>
                <p className="mt-2 text-lg text-primary">{s[l]}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="bg-mist py-24">
        <div className="container-edit grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <SectionHead eyebrow={t("faq", l)} title={t("faq", l)} />
            <Link to="/$locale/faq" params={{ locale: l }} className={`${btn.link} mt-4`}>{t("allFaq", l)}<ArrowRight className="flip-rtl h-4 w-4" /></Link>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {FAQ.slice(0, 4).map((f, i) => (
              <details key={i} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-lg text-primary">{f.q[l]}<span className="text-champagne transition group-open:rotate-45">+</span></summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{f.a[l]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-midnight">
        <div className="absolute inset-0 -z-10"><Img k="mountains" /></div>
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="container-edit py-32 text-center">
          <h2 className="mx-auto max-w-2xl text-4xl text-on-dark md:text-6xl">{C.finalT[l]}</h2>
          <Link to="/$locale/plan-your-trip" params={{ locale: l }} className={`${btn.light} mt-10`}>{t("requestPersonalQuote", l)}</Link>
        </div>
      </section>
    </>
  );
}

const SITE_EYEBROW: L = { en: "Our approach", ar: "نهجنا", ro: "Abordarea noastră" };
