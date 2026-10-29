import { TRAVEL_STYLES } from "@/content/styles";
import { FAQ } from "@/content/faq";
import { SITE } from "@/content/site";

const esc = (s: string) => s.replace(/'/g, "''");
const json = (v: unknown) => `'${esc(JSON.stringify(v))}'::jsonb`;

const rows: [string, unknown][] = [
  ["styles", TRAVEL_STYLES],
  ["faq", FAQ],
  ["site", { name: SITE.name, tagline: SITE.tagline, email: SITE.email, whatsappDigits: SITE.whatsappDigits, socials: SITE.socials, businessRegistration: SITE.businessRegistration }],
];

const out = rows.map(([k, v]) => `('${k}', ${json(v)}, now())`).join(",\n");
console.log(`INSERT INTO public.content_collections (key, data, updated_at) VALUES\n${out};`);
