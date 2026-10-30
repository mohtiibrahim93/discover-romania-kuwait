import type { L } from "@/i18n/config";

/**
 * First-party lead-source capture. On the first page of a visit we keep the campaign
 * tags of the link the visitor arrived from (utm_source / utm_medium / utm_campaign)
 * and the referring site's host, in this browser tab only (sessionStorage), and send
 * them with an inquiry. No cookies, no third-party trackers, nothing sent until the
 * visitor submits the form.
 */
const KEY = "drk_lead_source";

export type LeadSource = { utmSource?: string | undefined; utmMedium?: string | undefined; utmCampaign?: string | undefined; referrerHost?: string | undefined };

const clip = (v: string | null | undefined) => v?.trim().slice(0, 100) || undefined;

export function captureLeadSource() {
  try {
    if (sessionStorage.getItem(KEY)) return; // first landing of the visit wins
    const q = new URLSearchParams(window.location.search);
    let referrerHost: string | undefined;
    try {
      const host = document.referrer ? new URL(document.referrer).host : "";
      if (host && host !== window.location.host) referrerHost = clip(host);
    } catch { /* malformed referrer */ }
    const source: LeadSource = { utmSource: clip(q.get("utm_source")), utmMedium: clip(q.get("utm_medium")), utmCampaign: clip(q.get("utm_campaign")), referrerHost };
    sessionStorage.setItem(KEY, JSON.stringify(source));
  } catch { /* storage blocked: inquiries still work without a source */ }
}

export function readLeadSource(): LeadSource {
  try {
    const v = JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Record<string, unknown>;
    const s = (k: string) => (typeof v[k] === "string" ? clip(v[k] as string) : undefined);
    return { utmSource: s("utmSource"), utmMedium: s("utmMedium"), utmCampaign: s("utmCampaign"), referrerHost: s("referrerHost") };
  } catch {
    return {};
  }
}

/** Answers for "How did you hear about us?" — ids are stored, labels shown. */
export const HEARD_ABOUT: { id: string; label: L }[] = [
  { id: "instagram", label: { en: "Instagram", ar: "إنستغرام", ro: "Instagram" } },
  { id: "tiktok", label: { en: "TikTok", ar: "تيك توك", ro: "TikTok" } },
  { id: "facebook", label: { en: "Facebook", ar: "فيسبوك", ro: "Facebook" } },
  { id: "google", label: { en: "Google search", ar: "بحث Google", ro: "Căutare Google" } },
  { id: "friend", label: { en: "Friend or family", ar: "صديق أو أحد الأقارب", ro: "Prieteni sau familie" } },
  { id: "other", label: { en: "Other", ar: "أخرى", ro: "Altceva" } },
];
