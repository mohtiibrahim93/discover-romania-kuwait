import { describe, expect, it } from "vitest";
import { convertFromEur, formatPrice } from "./currency";
import { OFFERS } from "@/content/offers";
import { OFFER_PRICES } from "@/content/offer-prices";

describe("currency", () => {
  it("converts and rounds from EUR", () => {
    expect(convertFromEur(100, "EUR")).toBe(100);
    expect(convertFromEur(100, "USD")).toBe(110);
    expect(convertFromEur(100, "KWD")).toBe(35);
  });
  it("formats with western digits in every language", () => {
    expect(formatPrice(100, "EUR", "en")).toBe("€100");
    expect(formatPrice(100, "KWD", "ar")).toMatch(/35/);
    expect(formatPrice(1000, "USD", "ro")).toMatch(/1[.\s]?115/);
  });
  it("only prices offers that exist", () => {
    const ids = new Set(OFFERS.map((o) => o.id));
    for (const [id, p] of Object.entries(OFFER_PRICES)) {
      expect(ids.has(id)).toBe(true);
      expect(p.from ?? Math.min(...Object.values(p.pax ?? {}))).toBeGreaterThan(0);
    }
  });
});
