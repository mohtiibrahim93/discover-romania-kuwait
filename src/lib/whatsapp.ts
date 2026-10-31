import type { L, Locale } from "@/i18n/config";

export const WHATSAPP_LABEL: L = {
  en: "Discuss on WhatsApp",
  ar: "تحدث معنا عبر واتساب",
  ro: "Discută pe WhatsApp",
};

const MESSAGE: L = {
  en: "Hello Discover Romania Kuwait, I would like to discuss a trip to Romania.",
  ar: "مرحبًا Discover Romania Kuwait، أود الاستفسار عن رحلة إلى رومانيا.",
  ro: "Bună, Discover Romania Kuwait! Aș dori să discut despre o călătorie în România.",
};
const REFERENCE: L = { en: "Inquiry reference", ar: "الرقم المرجعي للاستفسار", ro: "Referința solicitării" };

/** Display form of an international number, e.g. "96556642402" → "+965 5664 2402". */
export function formatPhone(digits: string) {
  if (digits.startsWith("965") && digits.length === 11) return `+965 ${digits.slice(3, 7)} ${digits.slice(7)}`;
  return `+${digits}`;
}

/** Draft only: the visitor decides whether to send it in WhatsApp. */
export function whatsappLink(digits: string, locale: Locale, context: { pageUrl?: string; journey?: string; reference?: string } = {}) {
  const lines = [MESSAGE[locale]];
  if (context.journey) lines.push(context.journey);
  if (context.reference) lines.push(`${REFERENCE[locale]}: ${context.reference}`);
  if (context.pageUrl) lines.push(context.pageUrl);
  return `https://wa.me/${digits}?text=${encodeURIComponent(lines.join("\n"))}`;
}