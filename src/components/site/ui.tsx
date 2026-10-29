import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MEDIA, type MediaKey } from "@/content/media";
import { useLocale } from "@/i18n/config";

export const btn = {
  primary: "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-accent",
  light: "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-ivory px-6 py-3 text-sm font-semibold text-midnight transition hover:bg-champagne",
  ghostLight: "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-on-dark-muted px-6 py-3 text-sm font-semibold text-on-dark transition hover:bg-on-dark hover:text-midnight",
  outline: "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground",
  link: "inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent underline-offset-4 hover:underline",
};

export function Img({ k, className, eager, sizes }: { k: MediaKey; className?: string; eager?: boolean; sizes?: string }) {
  const l = useLocale();
  const m = MEDIA[k];
  return (
    <img src={m.src} width={m.w} height={m.h} alt={m.alt[l]} sizes={sizes}
      loading={eager ? "eager" : "lazy"} decoding="async" className={cn("h-full w-full object-cover", className)} />
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow text-accent", className)}>{children}</p>;
}

export function SectionHead({ eyebrow, title, intro, light }: { eyebrow?: string; title: string; intro?: string; light?: boolean }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className={cn("eyebrow mb-4", light ? "text-champagne" : "text-accent")}>{eyebrow}</p>}
      <h2 className={cn("text-3xl leading-tight md:text-5xl", light ? "text-on-dark" : "text-primary")}>{title}</h2>
      {intro && <p className={cn("mt-5 text-base leading-relaxed md:text-lg", light ? "text-on-dark-muted" : "text-muted-foreground")}>{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, media }: { eyebrow?: string; title: string; intro?: string; media: MediaKey }) {
  return (
    <section className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-midnight">
      <div className="absolute inset-0 -z-10"><Img k={media} eager /></div>
      <div className="hero-overlay absolute inset-0 -z-10" />
      <div className="container-edit pb-14 pt-32 md:pb-20">
        {eyebrow && <p className="eyebrow mb-4 text-champagne">{eyebrow}</p>}
        <h1 className="fade-up max-w-3xl text-4xl leading-[1.08] text-on-dark md:text-6xl">{title}</h1>
        {intro && <p className="fade-up mt-5 max-w-xl text-base leading-relaxed text-on-dark-muted md:text-lg">{intro}</p>}
      </div>
    </section>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-sm border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground">{children}</span>;
}

export function LocaleLink(props: { to: string; params?: Record<string, string>; search?: Record<string, string>; className?: string; children: ReactNode; "aria-label"?: string; onClick?: () => void }) {
  const l = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Link {...(props as any)} params={{ locale: l, ...(props.params ?? {}) }} />;
}
