import { beforeEach, describe, expect, it } from "vitest";
import { captureLeadSource, readLeadSource } from "./lead-source";

describe("lead source", () => {
  beforeEach(() => sessionStorage.clear());

  it("keeps the ad link's utm tags from the first landing", () => {
    window.history.replaceState(null, "", "/?utm_source=instagram&utm_medium=paid&utm_campaign=summer27");
    captureLeadSource();
    window.history.replaceState(null, "", "/en/tours?utm_source=google");
    captureLeadSource();
    expect(readLeadSource()).toEqual({ utmSource: "instagram", utmMedium: "paid", utmCampaign: "summer27", referrerHost: undefined });
  });

  it("returns nothing when no tags were captured", () => {
    expect(readLeadSource()).toEqual({ utmSource: undefined, utmMedium: undefined, utmCampaign: undefined, referrerHost: undefined });
  });
});
