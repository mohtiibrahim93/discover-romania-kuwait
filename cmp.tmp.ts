import { readFileSync } from "node:fs";
import { FAQ } from "@/content/faq";
import { TRAVEL_STYLES } from "@/content/styles";
import { SITE, ENTRY_INFO } from "@/content/site";

const load = (k: string) => {
  const raw = JSON.parse(readFileSync(`/tmp/db-${k}.json`, "utf8"));
  const v = raw[0].data;
  return typeof v === "string" ? JSON.parse(v) : v;
};

// jsonb reorders object keys, so compare with a canonical, order-insensitive form.
const canon = (v: unknown): unknown =>
  Array.isArray(v) ? v.map(canon)
    : v && typeof v === "object" ? Object.fromEntries(Object.entries(v as object).sort(([a], [b]) => (a < b ? -1 : 1)).map(([k, x]) => [k, canon(x)]))
    : v;

const diffs: string[] = [];
const walk = (a: unknown, b: unknown, path: string) => {
  if (typeof a !== typeof b) { diffs.push(`${path}: type ${typeof a} vs ${typeof b}`); return; }
  if (a && typeof a === "object") {
    const ka = Object.keys(a as object), kb = Object.keys(b as object);
    for (const k of new Set([...ka, ...kb])) walk((a as never)?.[k], (b as never)?.[k], `${path}.${k}`);
    return;
  }
  if (a !== b) diffs.push(`${path}: ${JSON.stringify(a)} -> ${JSON.stringify(b)}`);
};

const pairs: [string, unknown][] = [
  ["faq", FAQ],
  ["styles", TRAVEL_STYLES],
  ["site", { name: SITE.name, tagline: SITE.tagline, email: SITE.email, whatsappDigits: SITE.whatsappDigits, socials: SITE.socials, businessRegistration: SITE.businessRegistration }],
  ["entry", ENTRY_INFO],
];

for (const [k, src] of pairs) {
  diffs.length = 0;
  walk(canon(src), canon(load(k)), k);
  console.log(k, diffs.length ? `${diffs.length} differences` : "identical");
  for (const d of diffs.slice(0, 4)) console.log("   ", d);
}
