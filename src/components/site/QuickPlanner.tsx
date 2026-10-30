import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLocale, type L } from "@/i18n/config";
import { cn } from "@/lib/utils";

export const PLANNER_WHO = [
  { id: "family", label: { en: "Family with children", ar: "عائلة مع أطفال", ro: "Familie cu copii" } },
  { id: "extended", label: { en: "Extended family", ar: "عائلة ممتدة", ro: "Familie extinsă" } },
  { id: "couple", label: { en: "Couple", ar: "زوجان", ro: "Cuplu" } },
  { id: "friends", label: { en: "Friends", ar: "أصدقاء", ro: "Prieteni" } },
] as const satisfies readonly { id: string; label: L }[];

export const PLANNER_WHEN = [
  { id: "summer", label: { en: "Summer", ar: "الصيف", ro: "Vara" } },
  { id: "eid", label: { en: "Eid holiday", ar: "عطلة العيد", ro: "Sărbătoarea Eid" } },
  { id: "winter", label: { en: "Winter", ar: "الشتاء", ro: "Iarna" } },
  { id: "unsure", label: { en: "Not sure yet", ar: "لم أقرر بعد", ro: "Încă nu știu" } },
] as const satisfies readonly { id: string; label: L }[];

export type PlannerWho = (typeof PLANNER_WHO)[number]["id"];
export type PlannerWhen = (typeof PLANNER_WHEN)[number]["id"];

export const PLANNER_T = {
  title: { en: "Start your trip in 30 seconds", ar: "ابدأ رحلتك في 30 ثانية", ro: "Începe în 30 de secunde" },
  who: { en: "Who's travelling?", ar: "مع من تسافر؟", ro: "Cine călătorește?" },
  when: { en: "When?", ar: "متى؟", ro: "Când?" },
  cta: { en: "Get my proposed itinerary", ar: "احصل على برنامجك المقترح", ro: "Primește itinerariul propus" },
  note: { en: "Free and non-binding · written quote before booking", ar: "مجاني وغير مُلزِم · عرض سعر مكتوب قبل الحجز", ro: "Gratuit și fără obligații · ofertă scrisă înainte de rezervare" },
} satisfies Record<string, L>;

const V = {
  light: { box: "bg-ivory text-foreground", title: "", on: "has-[:checked]:bg-midnight has-[:checked]:text-on-dark has-[:checked]:border-midnight", off: "border-input", cta: "bg-sky hover:bg-sky-ink" },
  mint: { box: "bg-mint text-foreground", title: "text-mint-ink", on: "has-[:checked]:bg-leaf has-[:checked]:text-white has-[:checked]:border-leaf", off: "border-transparent bg-white", cta: "bg-terracotta hover:bg-peach-ink" },
};

/** Two quick choices that open the trip form with them pre-selected (never sent in a URL to WhatsApp). */
export function QuickPlanner({ variant = "light", className }: { variant?: keyof typeof V; className?: string }) {
  const l = useLocale();
  const [who, setWho] = useState<PlannerWho>("family");
  const [when, setWhen] = useState<PlannerWhen>("summer");
  const v = V[variant];
  const chip = cn("inline-flex min-h-11 cursor-pointer items-center rounded-full border-[1.5px] px-3.5 text-sm font-semibold transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-champagne", v.off, v.on);
  return (
    <form onSubmit={(e) => e.preventDefault()} className={cn("flex flex-col gap-4 rounded-3xl p-5 md:p-6", v.box, className)}>
      <p className={cn("font-display text-xl font-bold", v.title)}>{PLANNER_T.title[l]}</p>
      <fieldset>
        <legend className="mb-2 text-sm font-bold">{PLANNER_T.who[l]}</legend>
        <div className="flex flex-wrap gap-2">
          {PLANNER_WHO.map((o) => (
            <label key={o.id} className={chip}><input type="radio" name="planner-who" className="sr-only" checked={who === o.id} onChange={() => setWho(o.id)} />{o.label[l]}</label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-bold">{PLANNER_T.when[l]}</legend>
        <div className="flex flex-wrap gap-2">
          {PLANNER_WHEN.map((o) => (
            <label key={o.id} className={chip}><input type="radio" name="planner-when" className="sr-only" checked={when === o.id} onChange={() => setWhen(o.id)} />{o.label[l]}</label>
          ))}
        </div>
      </fieldset>
      <Link to="/$locale/plan-your-trip" params={{ locale: l }} search={{ who, when }}
        className={cn("inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl px-5 text-base font-bold text-white transition", v.cta)}>
        {PLANNER_T.cta[l]}<ArrowRight className="flip-rtl h-4 w-4" aria-hidden />
      </Link>
      <p className="text-center text-xs text-muted-foreground">{PLANNER_T.note[l]}</p>
    </form>
  );
}
