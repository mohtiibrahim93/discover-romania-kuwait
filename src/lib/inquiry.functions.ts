import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const opt = (n: number) => z.string().trim().max(n).optional().transform((v) => (v ? v : null));

export const inquiryInput = z.object({
  siteLocale: z.enum(["en", "ar", "ro"]),
  requestType: z.enum(["tour", "tailored"]),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().regex(/^\+[1-9][\d\s-]{6,18}$/),
  residence: z.string().trim().min(2).max(80),
  nationality: opt(80),
  lang: z.enum(["en", "ar", "ro"]),
  month: z.string().regex(/^\d{4}-\d{2}$/),
  adults: z.number().int().min(1).max(60),
  children: z.number().int().min(0).max(40),
  tour: z.string().max(80),
  destinations: z.array(z.string().max(40)).max(10),
  interests: opt(1000),
  pace: opt(20),
  accommodation: opt(40),
  budget: opt(40),
  duration: opt(10),
  style: opt(40),
  dietary: opt(200),
  guideLang: opt(60),
  flights: z.boolean(),
  notes: opt(2000),
  consent: z.literal(true),
  heardAbout: opt(20),
  utmSource: opt(100),
  utmMedium: opt(100),
  utmCampaign: opt(100),
  referrerHost: opt(100),
  website: z.string().max(0).optional(), // honeypot
});

export type InquiryInput = z.input<typeof inquiryInput>;

function makeRef() {
  const d = new Date();
  const ymd = `${String(d.getUTCFullYear()).slice(2)}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rnd = Array.from(crypto.getRandomValues(new Uint8Array(4)), (b) => chars[b % chars.length]).join("");
  return `DRK-${ymd}-${rnd}`;
}

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquiryInput.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const reference = makeRef();
    const { error } = await supabaseAdmin.from("trip_inquiries").insert({
      reference,
      site_locale: data.siteLocale,
      request_type: data.requestType,
      name: data.name,
      email: data.email,
      phone: data.phone,
      residence: data.residence,
      nationality: data.nationality,
      preferred_language: data.lang,
      travel_month: data.month,
      adults: data.adults,
      children: data.children,
      tour_slug: data.requestType === "tour" && data.tour !== "custom" ? data.tour : null,
      destinations: data.requestType === "tailored" ? data.destinations : [],
      interests: data.interests,
      pace: data.pace,
      accommodation: data.accommodation,
      budget: data.budget,
      duration: data.duration,
      travel_style: data.style,
      dietary: data.dietary,
      guide_language: data.guideLang,
      flight_assistance: data.flights,
      notes: data.notes,
      consent: true,
      heard_about: data.heardAbout,
      utm_source: data.utmSource,
      utm_medium: data.utmMedium,
      utm_campaign: data.utmCampaign,
      referrer_host: data.referrerHost,
    });
    if (error) {
      console.error("inquiry insert failed", error);
      return { ok: false as const };
    }
    return { ok: true as const, reference };
  });
