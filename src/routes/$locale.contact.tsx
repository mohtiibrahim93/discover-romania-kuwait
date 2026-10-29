import { createFileRoute, Link } from "@tanstack/react-router";
import { asLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { useSiteContent } from "@/lib/site-content";
import { PageHero, btn } from "@/components/site/ui";

const C = {
  intro: { en: "The best way to reach us is the trip-planning form — tell us your ideas and we will respond personally.", ar: "أفضل طريقة للتواصل معنا هي نموذج تخطيط الرحلة — شاركنا أفكارك وسنرد عليك شخصيًا.", ro: "Cea mai bună cale de a ne contacta este formularul de planificare — spune-ne ideile tale și îți vom răspunde personal." },
  pending: { en: "Direct email and WhatsApp channels will appear here once they are verified.", ar: "ستظهر قنوات البريد الإلكتروني وواتساب المباشرة هنا بعد التحقق منها.", ro: "Adresa de e-mail și WhatsApp vor apărea aici după verificare." },
};

export const Route = createFileRoute("/$locale/contact")({
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, t("contact", l), C.intro[l], "/contact"); },
  component: Page,
});

function Page() {
  const l = asLocale(Route.useParams().locale);
  const { site } = useSiteContent();
  return (
    <>
      <PageHero media="oldTown" eyebrow={t("contact", l)} title={t("contact", l)} intro={C.intro[l]} />
      <section className="container-edit max-w-3xl py-16 md:py-24">
        {site.email || site.whatsappDigits ? (
          <ul className="space-y-4 text-lg">
            {site.email && <li><a href={`mailto:${site.email}`} className="ltr-isolate text-accent underline">{site.email}</a></li>}
            {site.whatsappDigits && <li><a href={`https://wa.me/${site.whatsappDigits}`} className="ltr-isolate text-accent underline">WhatsApp +{site.whatsappDigits}</a></li>}
          </ul>
        ) : (
          <p className="text-muted-foreground">{C.pending[l]}</p>
        )}
        <Link to="/$locale/plan-your-trip" params={{ locale: l }} className={`${btn.primary} mt-10`}>{t("planTrip", l)}</Link>
      </section>
    </>
  );
}
