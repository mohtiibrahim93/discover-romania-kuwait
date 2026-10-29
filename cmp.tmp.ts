import { readFileSync } from "node:fs";
import { FAQ } from "@/content/faq";
import { TRAVEL_STYLES } from "@/content/styles";
import { SITE, ENTRY_INFO } from "@/content/site";

const load = (k: string) => {
  const raw = JSON.parse(readFileSync(`/tmp/db-${k}.json`, "utf8"));
  const v = raw[0].data;
  return typeof v === "string" ? JSON.parse(v) : v;
};

const pairs: [string, unknown][] = [
  ["faq", FAQ],
  ["styles", TRAVEL_STYLES],
  ["site", { name: SITE.name, tagline: SITE.tagline, email: SITE.email, whatsappDigits: SITE.whatsappDigits, socials: SITE.socials, businessRegistration: SITE.businessRegistration }],
  ["entry", ENTRY_INFO],
];

for (const [k, src] of pairs) {
  const db = load(k);
  const a = JSON.stringify(src), b = JSON.stringify(db);
  console.log(k, a === b ? "IDENTICAL" : "DIFFERS");
  if (a !== b) {
    let i = 0;
    while (i < a.length && a[i] === b[i]) i++;
    console.log("   first diff at", i, JSON.stringify(a.slice(i - 12, i + 12)), "->", JSON.stringify(b.slice(i - 12, i + 12)));
    let n = 0, j = 0;
    while (j < Math.min(a.length, b.length) && n < 3) {
      if (a[j] !== b[j]) { n++; console.log("   at", j, JSON.stringify(a.slice(j - 6, j + 6)), "->", JSON.stringify(b.slice(j - 6, j + 6))); }
      j++;
    }
  }
}
