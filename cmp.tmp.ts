import { readFileSync } from "node:fs";
import { FAQ } from "@/content/faq";
import { TRAVEL_STYLES } from "@/content/styles";
import { SITE, ENTRY_INFO } from "@/content/site";

const load = (k: string) => {
  const raw = JSON.parse(readFileSync(`/tmp/db-${k}.json`, "utf8"));
  const v = raw[0].data;
  return typeof v === "string" ? JSON.parse(v) : v;
};
const canon = (v: unknown): unknown =>
  Array.isArray(v) ? v.map(canon)
    : v && typeof v === "object" ? Object.fromEntries(Object.entries(v as object).sort(([a], [b]) => (a < b ? -1 : 1)).map(([k, x]) => [k, canon(x)]))
    : v;

let bad = 0;
const walk = (a: unknown, b: unknown, path: string) => {
  if (a && typeof a === "object" && b && typeof b === "object") {
    for (const k of new Set([...Object.keys(a as object), ...Object.keys(b as object)]))
      walk((a as never)?.[k], (b as never)?.[k], `${path}.${k}`);
    return;
  }
  if (a !== b) { bad++; console.log("  ", path, JSON.stringify(a), "->", JSON.stringify(b)); }
};

const pairs: [string, unknown][] = [
  ["faq", FAQ], ["styles", TRAVEL_STYLES],
  ["site", { name: SITE.name, tagline: SITE.tagline, email: SITE.email, whatsappDigits: SITE.whatsappDigits, socials: SITE.socials, businessRegistration: SITE.businessRegistration }],
  ["entry", ENTRY_INFO],
];

for (const [k, src] of pairs) {
  const before = bad;
  walk(canon(src), canon(load(k)), k);
  console.log(k, bad === before ? "identical" : `${bad - before} differences`);
}
