import { describe, expect, it } from "vitest";
import { validateContent } from "./content-schema";

/**
 * The trilingual-completeness gate: nothing may be published with a blank
 * English, Arabic or Romanian field. These assert the rule itself, not copy.
 */
describe("validateContent", () => {
  const okL = { en: "Hello", ar: "مرحبا", ro: "Salut" };

  it("rejects a FAQ entry that is missing Arabic", () => {
    const r = validateContent("faq", [{ q: okL, a: { en: "a", ar: "", ro: "b" } }]);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.join(" ")).toContain("0.a.ar");
      expect(r.errors.join(" ")).toContain("Arabic is required");
    }
  });

  it("accepts a fully translated FAQ entry", () => {
    expect(validateContent("faq", [{ q: okL, a: okL }]).ok).toBe(true);
  });

  it("treats a blank email as no email", () => {
    const r = validateContent("site", {
      name: "Discover Romania Kuwait",
      tagline: okL,
      email: "   ",
      whatsappDigits: "96556642402",
      socials: [],
      businessRegistration: "",
    });
    expect(r.ok).toBe(true);
    if (r.ok) expect((r.data as { email: unknown }).email).toBeNull();
  });

  it("rejects an unknown illustration", () => {
    const r = validateContent("styles", [{ id: "family", media: "beach", title: okL, intro: okL }]);
    expect(r.ok).toBe(false);
  });

  it("rejects a review date that is not YYYY-MM-DD", () => {
    const r = validateContent("entry", { lastReviewed: "29/10/2026", links: [], body: okL });
    expect(r.ok).toBe(false);
  });

  it("rejects an unknown collection", () => {
    expect(validateContent("prices", []).ok).toBe(false);
  });
});
