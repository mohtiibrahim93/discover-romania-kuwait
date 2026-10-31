import { describe, expect, it } from "vitest";
import { LOCALES } from "@/i18n/config";
import { OFFERS, OFFER_CATEGORIES, offerDuration, offerLength } from "./offers";

describe("offers catalogue", () => {
  it("has unique ids, known categories and every text in all three languages", () => {
    expect(new Set(OFFERS.map((o) => o.id)).size).toBe(OFFERS.length);
    const cats = new Set(OFFER_CATEGORIES.map((c) => c.id));
    for (const o of OFFERS) {
      expect(cats.has(o.cat)).toBe(true);
      for (const l of LOCALES) {
        expect(o.title[l]?.trim()).toBeTruthy();
        if (o.places) expect(o.places[l]?.trim()).toBeTruthy();
      }
    }
  });

  it("formats durations per language", () => {
    const o = { id: "x", cat: "romania" as const, title: { en: "", ar: "", ro: "" }, days: 8, nights: 7 };
    expect(offerDuration(o, "en")).toBe("8 days / 7 nights");
    expect(offerDuration(o, "ar")).toBe("8 أيام / 7 ليالٍ");
    expect(offerDuration(o, "ro")).toBe("8 zile / 7 nopți");
    expect(offerDuration({ ...o, days: 12, nights: 11 }, "ar")).toBe("12 يومًا / 11 ليلة");
    expect(offerDuration({ id: "y", cat: "spa", title: o.title }, "en")).toBeUndefined();
    expect(offerLength({ ...o, days: 1 })).toBe("day");
    expect(offerLength({ ...o, days: 4 })).toBe("short");
  });
});
