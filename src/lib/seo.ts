import { LOCALES, isLocale, type Locale } from "@/i18n/config";

export const SITE_ORIGIN = "https://picture-perfect-screen-scene.lovable.app";

export function seo(localeParam: string, title: string, description: string, path = "") {
  const l: Locale = isLocale(localeParam) ? localeParam : "en";
  const full = `${title} | Discover Romania Kuwait`;
  const url = `${SITE_ORIGIN}/${l}${path}`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "Discover Romania Kuwait" },
      { property: "og:locale", content: l === "ar" ? "ar_KW" : l === "ro" ? "ro_RO" : "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: url },
      ...LOCALES.map((x) => ({ rel: "alternate", hrefLang: x, href: `${SITE_ORIGIN}/${x}${path}` })),
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_ORIGIN}/en${path}` },
    ],
  };
}
