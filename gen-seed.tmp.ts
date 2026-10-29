import { TOURS } from "@/content/tours";
import { DESTINATIONS } from "@/content/destinations";
import { TRAVEL_STYLES } from "@/content/styles";
import { FAQ } from "@/content/faq";
import { SITE, ENTRY_INFO } from "@/content/site";
import { writeFileSync } from "node:fs";

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
const sql = `-- Seed editorial content from src/content into content_collections.\nINSERT INTO public.content_collections (key, data, updated_at) VALUES\n${out};\n`;
writeFileSync("drizzle/migrations/0003_seed_content_collections.sql", sql);
console.log("bytes", sql.length);
