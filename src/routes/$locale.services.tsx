import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { asLocale, type L } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { SERVICES, SERVICE_EXTRAS } from "@/content/services";
import { PageHero, btn } from "@/components/site/ui";

const C = {
  intro: { en: "Everything we can arrange in Romania with our trusted local partners — combined into one private trip around your family.", ar: "كل ما يمكننا ترتيبه في رومانيا مع شركائنا المحليين الموثوقين — في رحلة خاصة واحدة تُصمَّم حول عائلتك.", ro: "Tot ce putem organiza în România cu partenerii noștri locali de încredere — într-o singură călătorie privată, în jurul familiei tale." },
  examples: { en: "For example", ar: "على سبيل المثال", ro: "De exemplu" },
  ask: { en: "Ask about this", ar: "اسأل عن هذه الخدمة", ro: "Întreabă despre acest serviciu" },
  note: { en: "Programmes, availability and minimum ages are confirmed in your written proposal.", ar: "تُؤكَّد البرامج والتوفر والأعمار الدنيا في عرضك المكتوب.", ro: "Programele, disponibilitatea și vârstele minime sunt confirmate în oferta scrisă." },
} satisfies Record<string, L>;

export const Route = createFileRoute("/$locale/services")({
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, t("services", l), C.intro[l], "/services"); },
  component: Page,
});

function Page() {
  const l = asLocale(Route.useParams().locale);
  return (
    <>
      <PageHero media="oldTown" eyebrow={t("services", l)} title={t("services", l)} intro={C.intro[l]} />
      <section className="container-edit grid gap-5 py-16 md:grid-cols-2 md:py-20">
        {SERVICES.map((s) => (
          <article key={s.id} id={s.id} className="scroll-mt-28 rounded-3xl border-[1.5px] border-border bg-card p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-wide text-terracotta">{s.tag[l]}</p>
            <h2 className="mt-2 text-2xl md:text-3xl">{s.title[l]}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{s.body[l]}</p>
            <p className="mt-5 text-sm font-bold">{C.examples[l]}</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {s.examples.map((e, i) => <li key={i} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" aria-hidden />{e[l]}</li>)}
            </ul>
            <Link to="/$locale/plan-your-trip" params={{ locale: l }} search={{ service: s.id }} className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-sky">{C.ask[l]}<ArrowRight className="flip-rtl h-4 w-4" aria-hidden /></Link>
          </article>
        ))}
      </section>
      <section className="container-edit pb-20">
        <p className="text-muted-foreground">{SERVICE_EXTRAS[l]}</p>
        <p className="mt-2 text-sm text-muted-foreground">{C.note[l]}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/$locale/trips" params={{ locale: l }} className={btn.outline}>{t("trips", l)}</Link>
          <Link to="/$locale/plan-your-trip" params={{ locale: l }} className={btn.primary}>{t("requestPersonalQuote", l)}</Link>
        </div>
      </section>
    </>
  );
}
