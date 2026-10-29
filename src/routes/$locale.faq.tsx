import { createFileRoute } from "@tanstack/react-router";
import { asLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { useSiteContent } from "@/lib/site-content";
import { PageHero } from "@/components/site/ui";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const intro = { en: "Clear answers about how planning with us works.", ar: "إجابات واضحة حول طريقة التخطيط معنا.", ro: "Răspunsuri clare despre cum planificăm împreună." };

export const Route = createFileRoute("/$locale/faq")({
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, t("faq", l), intro[l], "/faq"); },
  component: Page,
});

function Page() {
  const l = asLocale(Route.useParams().locale);
  const { faq } = useSiteContent();
  return (
    <>
      <PageHero media="delta" eyebrow={t("faq", l)} title={t("faq", l)} intro={intro[l]} />
      <section className="container-edit max-w-3xl py-16 md:py-24">
        <Accordion type="single" collapsible>
          {faq.map((f, i) => (
            <AccordionItem key={i} value={`q${i}`}>
              <AccordionTrigger className="min-h-14 text-start font-display text-lg text-primary">{f.q[l]}</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">{f.a[l]}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
