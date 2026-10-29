import { LOCALES, isLocale, type Locale } from "@/i18n/config";

export function seo(localeParam: string, title: string, description: string, path = "") {
  const l: Locale = isLocale(localeParam) ? localeParam : "en";
  const full = `${title} | Discover Romania Kuwait`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: l === "ar" ? "ar_KW" : l === "ro" ? "ro_RO" : "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: LOCALES.map((x) => ({ rel: "alternate", hrefLang: x, href: `/${x}${path}` })),
  };
}
