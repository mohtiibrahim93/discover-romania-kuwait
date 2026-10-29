import { z } from "zod";

/**
 * Shape + trilingual-completeness rules for editable content.
 * Every user-visible string is an L object; the schema below makes an empty
 * language a validation failure, so nothing can be published in two languages.
 */
const L = z.object({
  en: z.string().trim().min(1, "English is required"),
  ar: z.string().trim().min(1, "Arabic is required"),
  ro: z.string().trim().min(1, "Romanian is required"),
});

const mediaKey = z.enum(["mountains", "oldTown", "countryside", "delta"]);
const link = z.object({ label: z.string().trim().min(1), url: z.string().url() });
const blankToNull = (v: string) => (v.trim() === "" ? null : v.trim());

export const contentSchemas = {
  faq: z.array(z.object({ q: L, a: L })),
  styles: z.array(z.object({ id: z.string().trim().min(1), media: mediaKey, title: L, intro: L })),
  site: z.object({
    name: z.string().trim().min(2),
    tagline: L,
    email: z.preprocess(blankToNull, z.string().trim().email("Enter a valid email").nullable()),
    whatsappDigits: z.preprocess(blankToNull, z.string().regex(/^\d{8,15}$/, "Digits only, e.g. 96556642402").nullable()),
    socials: z.array(link),
    businessRegistration: z.preprocess(blankToNull, z.string().max(120).nullable()),
  }),
  entry: z.object({
    lastReviewed: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
    links: z.array(link),
    body: L,
  }),
} as const;

export type ContentKey = keyof typeof contentSchemas;
export const CONTENT_KEYS = Object.keys(contentSchemas) as ContentKey[];

export type ValidationResult = { ok: true; data: unknown } | { ok: false; errors: string[] };

export function validateContent(key: string, data: unknown): ValidationResult {
  const schema = contentSchemas[key as ContentKey];
  if (!schema) return { ok: false, errors: ["Unknown content section."] };
  const parsed = schema.safeParse(data);
  if (parsed.success) return { ok: true, data: parsed.data };
  return {
    ok: false,
    errors: parsed.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`),
  };
}
