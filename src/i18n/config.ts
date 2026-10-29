import { useParams } from "@tanstack/react-router";

export const LOCALES = ["en", "ar", "ro"] as const;
export type Locale = (typeof LOCALES)[number];
export type L = Record<Locale, string>;

export const LOCALE_LABELS: Record<Locale, string> = { en: "English", ar: "العربية", ro: "Română" };
export const isLocale = (v: unknown): v is Locale => typeof v === "string" && (LOCALES as readonly string[]).includes(v);
export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

export function useLocale(): Locale {
  const p = useParams({ strict: false }) as { locale?: string };
  return isLocale(p.locale) ? p.locale : "en";
}

/** Pick the localized string. */
export const tr = (v: L, l: Locale) => v[l];

/** Choose a locale from the browser languages list. */
export function pickBrowserLocale(langs: readonly string[]): Locale {
  for (const raw of langs) {
    const c = raw.toLowerCase().slice(0, 2);
    if (c === "ar") return "ar";
    if (c === "ro") return "ro";
    if (c === "en") return "en";
  }
  return "en";
}

/** Swap the locale prefix of a path, keeping the rest of the path. */
export function swapLocale(pathname: string, to: Locale): string {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) parts[1] = to;
  else return `/${to}`;
  return parts.join("/") || `/${to}`;
}

export const LOCALE_STORAGE_KEY = "drk-locale";

export const asLocale = (v: unknown): Locale => (isLocale(v) ? v : "en");
