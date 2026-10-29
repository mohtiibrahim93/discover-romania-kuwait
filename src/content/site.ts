import type { L } from "@/i18n/config";

/**
 * Central, editable brand + contact configuration.
 * Provisional identity — brand name and domain are not yet legally cleared.
 * Contact channels stay null until the operator verifies them; the UI hides unset channels.
 */
export const SITE = {
  name: "Discover Romania Kuwait",
  tagline: {
    en: "Romania, personally planned",
    ar: "رومانيا، برحلة تُخطَّط لك شخصيًا",
    ro: "România, planificată personal",
  } as L,
  email: null as string | null,
  whatsappDigits: "96556642402" as string | null, // international digits only
  socials: [] as { label: string; url: string }[],
  businessRegistration: null as string | null,
  inquiryBackendConnected: true,
};

/** Visa / entry information — must be human-reviewed; never auto-verified. */
export const ENTRY_INFO = {
  lastReviewed: "2026-10-29",
  links: [
    { label: "European Commission — Visa policy", url: "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en" },
    { label: "Romanian Ministry of Foreign Affairs — Consular information", url: "https://www.mae.ro/en" },
    { label: "Re-open EU / Your Europe — Travel documents", url: "https://europa.eu/youreurope/citizens/travel/entry-exit/index_en.htm" },
  ],
  body: {
    en: "Entry requirements for Romania depend on your passport nationality, residence status, travel document, itinerary and travel dates. On 19 October 2026 the Council of the EU adopted conclusions to launch visa-waiver processes for Kuwait, Saudi Arabia, Qatar, Bahrain and Oman. This is the start of a process: visa-free travel is not yet in effect and no effective date has been confirmed. UAE nationals are subject to a different existing arrangement. Please always check current official EU, Romanian or consular sources before planning.",
    ar: "تعتمد متطلبات الدخول إلى رومانيا على جنسية جواز السفر، ووضع الإقامة، ووثيقة السفر، وخط سير الرحلة، وتواريخ السفر. في 19 أكتوبر 2026 اعتمد مجلس الاتحاد الأوروبي استنتاجات لإطلاق إجراءات الإعفاء من التأشيرة لكلٍّ من الكويت والسعودية وقطر والبحرين وعُمان. هذه بداية مسار فقط: السفر دون تأشيرة غير ساري المفعول بعد، ولم يُعلن أي تاريخ لبدء التطبيق. ويخضع مواطنو الإمارات لترتيب مختلف قائم. يُرجى دائمًا مراجعة المصادر الرسمية الحالية للاتحاد الأوروبي أو رومانيا أو الجهات القنصلية قبل التخطيط.",
    ro: "Condițiile de intrare în România depind de cetățenia pașaportului, statutul de rezidență, documentul de călătorie, itinerariu și datele călătoriei. La 19 octombrie 2026, Consiliul UE a adoptat concluzii pentru lansarea procedurilor de exceptare de la viză pentru Kuweit, Arabia Saudită, Qatar, Bahrain și Oman. Este doar începutul unui proces: călătoria fără viză nu este încă în vigoare și nu a fost confirmată o dată de aplicare. Cetățenii Emiratelor Arabe Unite au un regim diferit, deja existent. Verifică întotdeauna sursele oficiale actuale ale UE, ale României sau consulare înainte de planificare.",
  } as L,
};
