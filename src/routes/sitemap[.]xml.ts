import { createFileRoute } from "@tanstack/react-router";
import { LOCALES } from "@/i18n/config";
import { publishedTours } from "@/content/tours";
import { DESTINATIONS } from "@/content/destinations";
import { SITE_ORIGIN } from "@/lib/seo";

const STATIC = ["", "/tours", "/services", "/destinations", "/experiences", "/why-romania", "/about", "/contact", "/faq", "/travel-information", "/how-it-works", "/plan-your-trip", "/privacy", "/terms", "/cookies"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          ...STATIC,
          ...publishedTours().map((t) => `/tours/${t.slug}`),
          ...DESTINATIONS.map((d) => `/destinations/${d.slug}`),
        ];
        const urls = paths.map((p) => {
          const alts = LOCALES.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_ORIGIN}/${l}${p}"/>`).join("");
          return LOCALES.map((l) => `<url><loc>${SITE_ORIGIN}/${l}${p}</loc>${alts}</url>`).join("");
        }).join("");
        const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
