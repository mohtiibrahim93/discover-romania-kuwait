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

const diffs: { path: string; src: unknown; db: unknown }[] = [];
const walk = (a: unknown, b: unknown, path: string) => {
  if (a && typeof a === "object" && b && typeof b === "object") {
    for (const k of new Set([...Object.keys(a as object), ...Object.keys(b as object)]))
      walk((a as never)?.[k], (b as never)?.[k], `${path}.${k}`);
    return;
  }
  if (a !== b) diffs.push({ path, src: a, db: b });
};

const pairs: [string, unknown][] = [
  ["faq", FAQ], ["styles", TRAVEL_STYLES],
  ["site", { name: SITE.name, tagline: SITE.tagline, email: SITE.email, whatsappDigits: SITE.whatsappDigits, socials: SITE.socials, businessRegistration: SITE.businessRegistration }],
  ["entry", ENTRY_INFO],
];

// Hypothesis: every difference is a dammatan (U+064C) in the DB where the source has a damma (U+064F).
const repair = (s: string) => s.replace(/\u064C/g, "\u064F");
let explained = 0;
const unexplained: string[] = [];
for (const [k, src] of pairs) {
  diffs.length = 0;
  walk(canon(src), canon(load(k)), k);
  for (const d of diffs) {
    if (typeof d.src === "string" && typeof d.db === "string" && repair(d.db) === d.src) explained++;
    else unexplained.push(`${d.path}: ${JSON.stringify(d.src)} -> ${JSON.stringify(d.db)}`);
  }
  console.log(k, diffs.length, "diffs");
}
console.log("explained by U+064C->U+064F:", explained);
console.log("unexplained:", unexplained.length);
unexplained.slice(0, 5).forEach((u) => console.log("   ", u));

// Does the source itself contain a legitimate dammatan anywhere?
const srcText = JSON.stringify(pairs.map(([, v]) => v));
console.log("source contains U+064C:", /\u064C/.test(srcText));
