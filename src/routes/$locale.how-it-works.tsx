import { createFileRoute } from "@tanstack/react-router";
import { asLocale } from "@/i18n/config";
import type { L } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { TextPage, type TextSection } from "@/components/site/TextPage";
import { SITE } from "@/content/site";

const title: L = { en: "Prices, Payment & Family Comfort", ar: "الأسعار والدفع وراحة العائلة", ro: "Prețuri, plată și confort pentru familie" };
const intro: L = {
  en: "Every journey is private and priced for your family. Here is how quotes work, how you pay in Kuwait, and what we plan around.",
  ar: "كل رحلة خاصة وتُسعَّر لعائلتك. إليك كيف تُعدّ العروض، وكيف تدفع في الكويت، وما الذي نراعيه في التخطيط.",
  ro: "Fiecare călătorie este privată și calculată pentru familia ta. Iată cum funcționează ofertele, cum plătești în Kuweit și ce avem în vedere.",
};

const sections: TextSection[] = [
  { h: { en: "Indicative prices, then your own quote", ar: "أسعار تقريبية، ثم عرضك الخاص", ro: "Prețuri orientative, apoi oferta ta" },
    p: { en: `Our trips catalogue shows indicative “from” prices per person, so you can see the order of magnitude. Your real price depends on your dates, group size, children's ages, hotel level, private vehicle and activities. We reply within ${SITE.replyHours} hours, send a draft route within ${SITE.draftWorkingDays} working days, and the final written quote follows once the route suits you.`,
      ar: `يعرض دليل الرحلات أسعارًا تقريبية «ابتداءً من» للشخص، لتعرف الحدود التقريبية. يعتمد سعرك الفعلي على التواريخ وعدد المسافرين وأعمار الأطفال ومستوى الفندق والسيارة الخاصة والأنشطة. نرد خلال ${SITE.replyHours} ساعة، ونرسل مسودة المسار خلال ${SITE.draftWorkingDays} أيام عمل، ثم العرض المكتوب النهائي عندما يناسبك المسار.`,
      ro: `Catalogul de călătorii arată prețuri orientative „de la”, de persoană, ca să vezi ordinul de mărime. Prețul tău real depinde de date, numărul de persoane, vârsta copiilor, nivelul hotelului, vehiculul privat și activități. Îți răspundem în ${SITE.replyHours} de ore, trimitem traseul schiță în ${SITE.draftWorkingDays} zile lucrătoare, iar oferta scrisă finală urmează după ce traseul ți se potrivește.` } },
  { h: { en: "What shapes your quote", ar: "ما الذي يحدد عرض السعر", ro: "Ce influențează oferta" },
    p: { en: "Season and dates · number of travellers and rooms · 4-star, 5-star or private chalet stays · private driver with a family van · Arabic- or English-speaking guide · activities such as shepherd days, rafting or bear watching · number of nights.",
      ar: "الموسم والتواريخ · عدد المسافرين والغرف · فنادق 4 أو 5 نجوم أو شاليه خاص · سائق خاص مع سيارة عائلية · مرشد ناطق بالعربية أو الإنجليزية · أنشطة مثل يوم الرعاة أو التجديف أو مشاهدة الدببة · عدد الليالي.",
      ro: "Sezon și date · număr de persoane și camere · hotel de 4 sau 5 stele ori cabană privată · șofer privat cu microbuz de familie · ghid vorbitor de arabă sau engleză · activități precum ziua la stână, rafting sau urși · număr de nopți." } },
  { h: { en: "Your quote in Kuwaiti dinar", ar: "عرض السعر بالدينار الكويتي", ro: "Oferta în dinari kuweitieni" },
    p: { en: "Quotes are prepared in Kuwaiti dinar (KWD) and list what is included and excluded. Nothing is booked until you approve it in writing.",
      ar: "تُعدّ العروض بالدينار الكويتي وتوضح ما هو مشمول وما هو غير مشمول. لا يُحجز أي شيء قبل موافقتك المكتوبة.",
      ro: "Ofertele sunt în dinari kuweitieni (KWD) și precizează ce este inclus și ce nu. Nimic nu se rezervă fără acordul tău scris." } },
  { h: { en: "You pay in Kuwait, not abroad", ar: "تدفع في الكويت وليس في الخارج", ro: "Plătești în Kuweit, nu în străinătate" },
    p: { en: "You never send money to a foreign supplier. Payment is made locally to our Kuwait-based partner company, named on your written proposal and invoice. That company holds your payment, is responsible for your booking, and settles the Romanian hotels, drivers and guides on your behalf. Payment methods and the deposit schedule are confirmed in the proposal.",
      ar: "لا ترسل أي مبلغ إلى مزوّد أجنبي. يتم الدفع محليًا لشركتنا الشريكة في الكويت، المذكور اسمها في العرض المكتوب والفاتورة. هذه الشركة تستلم دفعتك وتتحمّل مسؤولية حجزك، وتسدد للفنادق والسائقين والمرشدين في رومانيا نيابة عنك. تُؤكد طرق الدفع وجدول الدفعات في العرض.",
      ro: "Nu trimiți niciodată bani unui furnizor străin. Plata se face local către compania noastră parteneră din Kuweit, numită în propunerea scrisă și pe factură. Această companie primește plata, răspunde de rezervare și plătește în numele tău hotelurile, șoferii și ghizii din România. Metodele de plată și avansul sunt confirmate în propunere." } },
  { h: { en: "One point of contact", ar: "جهة تواصل واحدة", ro: "Un singur punct de contact" },
    p: { en: "Before, during and after the trip you deal with one team in Kuwait — by WhatsApp, in Arabic or English. If anything changes on the ground, we coordinate with our Romanian partner for you.",
      ar: "قبل الرحلة وأثناءها وبعدها تتعامل مع فريق واحد في الكويت عبر واتساب، بالعربية أو الإنجليزية. وإذا تغيّر أي شيء على أرض الواقع، ننسّق مع شريكنا في رومانيا نيابة عنك.",
      ro: "Înainte, în timpul și după călătorie ai de-a face cu o singură echipă din Kuweit — pe WhatsApp, în arabă sau engleză. Dacă se schimbă ceva pe teren, coordonăm noi cu partenerul din România." } },
  { h: { en: "Planned around your family", ar: "مخطط حول عائلتك", ro: "Planificat în jurul familiei tale" },
    p: { en: "Relaxed mornings and late dinners · a private driver and spacious van for luggage and strollers · connecting rooms or private chalets · prayer breaks built into driving days · halal-friendly, fish and vegetarian dining suggestions · room for grandparents, children and a nanny. These are requests we work to confirm, not promises — your proposal states exactly what is confirmed.",
      ar: "صباحات هادئة وعشاء متأخر · سائق خاص وسيارة واسعة للأمتعة وعربات الأطفال · غرف متصلة أو شاليهات خاصة · فترات للصلاة ضمن أيام التنقل · اقتراحات لمطاعم مناسبة للحلال وأطباق السمك والنباتية · مكان للأجداد والأطفال والمربية. هذه طلبات نسعى لتأكيدها وليست وعودًا، ويوضح العرض بدقة ما تم تأكيده.",
      ro: "Dimineți relaxate și cine târzii · șofer privat și microbuz spațios pentru bagaje și cărucioare · camere comunicante sau cabane private · pauze de rugăciune în zilele de drum · sugestii de restaurante potrivite cerințelor halal, cu pește sau vegetariene · loc pentru bunici, copii și bonă. Sunt cereri pe care încercăm să le confirmăm, nu promisiuni — propunerea arată exact ce este confirmat." } },
];

export const Route = createFileRoute("/$locale/how-it-works")({
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, title[l], intro[l], "/how-it-works"); },
  component: Page,
});

function Page() {
  const l = asLocale(Route.useParams().locale);
  return <TextPage eyebrow={t("howItWorks", l)} title={title} intro={intro} media="countryside" sections={sections} />;
}
