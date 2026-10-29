import { describe, expect, it } from "vitest";
import { whatsappLink } from "./whatsapp";

describe("WhatsApp inquiry handoff", () => {
  it("addresses the operator-provided Kuwait WhatsApp number", () => {
    expect(new URL(whatsappLink("96556642402", "en")).pathname).toBe("/96556642402");
  });

  it("keeps the selected journey and its public URL in the draft", () => {
    const url = new URL(whatsappLink("96556642402", "ar", {
      journey: "ترانسيلفانيا الملكية",
      pageUrl: "https://picture-perfect-screen-scene.lovable.app/ar/tours/royal-transylvania",
    }));
    expect(url.searchParams.get("text")).toContain("ترانسيلفانيا الملكية");
    expect(url.searchParams.get("text")).toContain("/ar/tours/royal-transylvania");
  });

  it("preserves the saved inquiry reference in the follow-up draft", () => {
    const url = new URL(whatsappLink("96556642402", "ro", { reference: "DRK-261029-ABCD" }));
    expect(url.searchParams.get("text")).toContain("DRK-261029-ABCD");
  });
});