import type { L, Locale } from "@/i18n/config";
import { SITE } from "@/content/site";

const h = SITE.replyHours, d = SITE.draftWorkingDays;

/** What happens after an inquiry — the promises come from SITE so they stay in one place. */
export const PROCESS: { t: L; p: L }[] = [
  { t: { en: "Tell us what you want", ar: "أخبرنا بما تريد", ro: "Ne spui ce îți dorești" },
    p: { en: "Budget, pace, hotel level, what you love and what you'd rather avoid.", ar: "الميزانية والوتيرة ومستوى الفندق، وما تحبه وما تفضّل تجنّبه.", ro: "Buget, ritm, nivelul hotelului, ce îți place și ce ai vrea să eviți." } },
  { t: { en: `We reply within ${h} hours`, ar: `نرد عليك خلال ${h} ساعة`, ro: `Îți răspundem în ${h} de ore` },
    p: { en: "A consultant contacts you on WhatsApp, recaps your request and asks only what is still missing.", ar: "يتواصل معك مستشار عبر واتساب، ويلخّص طلبك ويسأل فقط عمّا ينقص.", ro: "Un consultant te contactează pe WhatsApp, îți recapitulează cererea și întreabă doar ce mai lipsește." } },
  { t: { en: `Draft route within ${d} working days`, ar: `مسودة المسار خلال ${d} أيام عمل`, ro: `Traseul schiță în ${d} zile lucrătoare` },
    p: { en: "Day by day, with where you sleep and how long you drive. We fix the route first, then the price.", ar: "يومًا بيوم، مع مكان المبيت ومدة القيادة. نتفق على المسار أولًا ثم على السعر.", ro: "Zi cu zi, cu unde dormi și cât conduci. Stabilim întâi traseul, apoi prețul." } },
  { t: { en: "We adjust it together", ar: "نعدّله معًا", ro: "Îl ajustăm împreună" },
    p: { en: "Fewer stops, more rest days, a different hotel — until it feels right.", ar: "محطات أقل، أيام راحة أكثر، فندق مختلف — حتى يصبح مناسبًا لك.", ro: "Mai puține opriri, mai multe zile libere, alt hotel — până îți vine ca turnat." } },
  { t: { en: "Final price, 4★ and 5★", ar: "السعر النهائي، 4 و5 نجوم", ro: "Prețul final, 4★ și 5★" },
    p: { en: "A written proposal with both hotel options, what is included and not. Nothing is booked until you approve.", ar: "عرض مكتوب بخياري الفنادق وما هو مشمول وغير مشمول. لا يُحجز شيء قبل موافقتك.", ro: "O propunere scrisă cu ambele variante de hotel, ce e inclus și ce nu. Nimic nu se rezervă fără acordul tău." } },
];

export function ProcessSteps({ l, className = "" }: { l: Locale; className?: string }) {
  return (
    <ol className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-5 ${className}`}>
      {PROCESS.map((s, i) => (
        <li key={i} className="rounded-2xl border-[1.5px] border-border bg-card p-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-midnight text-sm font-bold text-on-dark" dir="ltr">{i + 1}</span>
          <p className="mt-3 font-semibold leading-snug">{s.t[l]}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.p[l]}</p>
        </li>
      ))}
    </ol>
  );
}
