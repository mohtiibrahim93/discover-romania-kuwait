import { Link } from "@tanstack/react-router";
import type { L } from "@/i18n/config";
import { useLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import type { MediaKey } from "@/content/media";
import { PageHero, btn } from "./ui";

export type TextSection = { h: L; p: L };

export function TextPage({ eyebrow, title, intro, media, sections, notice, cta = true }: {
  eyebrow: string; title: L; intro: L; media: MediaKey; sections: TextSection[]; notice?: string; cta?: boolean;
}) {
  const l = useLocale();
  return (
    <>
      <PageHero media={media} eyebrow={eyebrow} title={title[l]} intro={intro[l]} />
      <section className="container-edit py-16 md:py-24">
        {notice && <p role="note" className="mb-12 max-w-3xl border border-champagne bg-card p-4 text-sm">{notice}</p>}
        <div className="grid max-w-4xl gap-12">
          {sections.map((s, i) => (
            <div key={i} className="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-10">
              <h2 className="text-2xl text-primary">{s.h[l]}</h2>
              <p className="leading-relaxed text-muted-foreground">{s.p[l]}</p>
            </div>
          ))}
        </div>
        {cta && <Link to="/$locale/plan-your-trip" params={{ locale: l }} className={`${btn.primary} mt-16`}>{t("requestPersonalQuote", l)}</Link>}
      </section>
    </>
  );
}
