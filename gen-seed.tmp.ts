import { TOURS } from "@/content/tours";
import { DESTINATIONS } from "@/content/destinations";
import { TRAVEL_STYLES } from "@/content/styles";
import { FAQ } from "@/content/faq";
import { SITE, ENTRY_INFO } from "@/content/site";

const esc = (s: string) => s.replace(/'/g, "''");
const json = (v: unknown) => `'${esc(JSON.stringify(v))}'::jsonb`;

const rows: [string, unknown][] = [
  ["tours", TOURS],
  ["destinations", DESTINATIONS],
  ["styles", TRAVEL_STYLES],
  ["faq", FAQ],
  ["site", { name: SITE.name, tagline: SITE.tagline, email: SITE.email, whatsappDigits: SITE.whatsappDigits, socials: SITE.socials, businessRegistration: SITE.businessRegistration }],
  ["entry", ENTRY_INFO],
];

const out = rows.map(([k, v]) => `('${k}', ${json(v)}, now())`).join(",\n");
console.log(`INSERT INTO public.content_collections (key, data, updated_at) VALUES\n${out};`);
