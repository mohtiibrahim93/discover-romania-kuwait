import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { L, Locale } from "@/i18n/config";
import { MEDIA, type MediaKey } from "@/content/media";
import { cn } from "@/lib/utils";

/** Hero photos, in order. Add keys here as licensed photography arrives. */
export const HERO_SLIDES: MediaKey[] = ["mountains", "countryside", "oldTown", "delta"];
/** Arabic home opens on the green countryside; the next two are its photo shortcuts. Same length as HERO_SLIDES. */
export const HERO_SLIDES_AR: MediaKey[] = ["countryside", "mountains", "oldTown", "delta"];

const T = {
  play: { en: "Play photo slideshow", ar: "تشغيل عرض الصور", ro: "Pornește prezentarea foto" },
  pause: { en: "Pause photo slideshow", ar: "إيقاف عرض الصور مؤقتًا", ro: "Pune pauză prezentării foto" },
  show: { en: "Show photo", ar: "عرض الصورة", ro: "Arată fotografia" },
  illustrative: { en: "Illustrative images", ar: "صور توضيحية", ro: "Imagini ilustrative" },
} satisfies Record<string, L>;

/** Slow crossfade that pauses on request and starts paused for reduced-motion visitors. */
export function useSlideshow(count: number, interval = 5000) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);
  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [paused, count, interval]);
  return { index, setIndex, paused, toggle: () => setPaused((p) => !p) };
}

export type Slideshow = ReturnType<typeof useSlideshow>;

export function SlideImages({ slides, s, l, className }: { slides: MediaKey[]; s: Slideshow; l: Locale; className?: string }) {
  return (
    <>
      {slides.map((k, i) => {
        const m = MEDIA[k];
        const on = i === s.index;
        return (
          <img key={k} src={m.src} width={m.w} height={m.h} alt={m.alt[l]} aria-hidden={on ? undefined : true}
            loading={i === 0 ? "eager" : "lazy"} decoding="async"
            className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out", on ? "opacity-100" : "opacity-0", className)} />
        );
      })}
    </>
  );
}

export function SlideControls({ slides, s, l, className }: { slides: MediaKey[]; s: Slideshow; l: Locale; className?: string }) {
  return (
    <div className={cn("flex items-center rounded-full bg-midnight/60 px-1 text-on-dark", className)}>
      <button type="button" onClick={s.toggle} aria-label={s.paused ? T.play[l] : T.pause[l]} title={s.paused ? T.play[l] : T.pause[l]}
        className="inline-flex h-11 w-11 items-center justify-center">
        {s.paused ? <Play className="h-4 w-4 fill-current" aria-hidden /> : <Pause className="h-4 w-4 fill-current" aria-hidden />}
      </button>
      {slides.map((k, i) => (
        <button key={k} type="button" onClick={() => s.setIndex(i)} aria-label={`${T.show[l]} ${i + 1}`} aria-current={i === s.index ? "true" : undefined}
          className="inline-flex h-11 w-6 items-center justify-center">
          <span className={cn("h-2.5 w-2.5 rounded-full", i === s.index ? "bg-gold" : "bg-on-dark/50")} />
        </button>
      ))}
    </div>
  );
}

/** Shown while any slide is a generated placeholder rather than a licensed photograph. */
export function IllustrativeBadge({ slides, l, className }: { slides: MediaKey[]; l: Locale; className?: string }) {
  if (!slides.some((k) => MEDIA[k].provenance.kind === "generated-placeholder")) return null;
  return <span className={cn("rounded-full bg-white/90 px-2.5 py-0.5 text-xs text-muted-foreground", className)}>{T.illustrative[l]}</span>;
}
