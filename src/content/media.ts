import hero from "@/assets/hero-mountains.jpg";
import oldTown from "@/assets/old-town.jpg";
import countryside from "@/assets/countryside.jpg";
import delta from "@/assets/delta.jpg";
import type { L } from "@/i18n/config";

/**
 * Media registry. All current images are AI-generated, illustrative placeholders —
 * NOT photographs of the named places. Replace with licensed photography before launch
 * and fill in provenance (author, license, attribution) for each.
 */
export type Media = {
  src: string;
  w: number;
  h: number;
  alt: L;
  provenance: { kind: "generated-placeholder" | "licensed"; author?: string; license?: string };
};

const gen = { kind: "generated-placeholder" as const };

export const MEDIA = {
  mountains: { src: hero, w: 1920, h: 1088, provenance: gen, alt: {
    en: "Illustrative image: forested mountain ridges above misty valleys at dawn",
    ar: "صورة توضيحية: سلاسل جبلية مكسوة بالغابات فوق وديان يغمرها الضباب عند الفجر",
    ro: "Imagine ilustrativă: creste montane împădurite deasupra văilor cu ceață, în zori" } },
  oldTown: { src: oldTown, w: 1200, h: 1504, provenance: gen, alt: {
    en: "Illustrative image: cobbled old-town street with pastel houses at sunset",
    ar: "صورة توضيحية: شارع مرصوف في بلدة قديمة ببيوت ملوّنة عند الغروب",
    ro: "Imagine ilustrativă: stradă pietruită într-un oraș vechi cu case pastelate, la apus" } },
  countryside: { src: countryside, w: 1504, h: 1104, provenance: gen, alt: {
    en: "Illustrative image: green hills with haystacks and wooden village houses",
    ar: "صورة توضيحية: تلال خضراء مع أكوام القش وبيوت قروية خشبية",
    ro: "Imagine ilustrativă: dealuri verzi cu căpițe de fân și case din lemn" } },
  delta: { src: delta, w: 1504, h: 1104, provenance: gen, alt: {
    en: "Illustrative image: calm wetland waters with reeds and pelicans",
    ar: "صورة توضيحية: مياه هادئة في أرض رطبة مع القصب وطيور البجع",
    ro: "Imagine ilustrativă: ape liniștite cu stuf și pelicani" } },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof MEDIA;
