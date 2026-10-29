import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TRAVEL_STYLES } from "@/content/styles";
import { FAQ } from "@/content/faq";
import { SITE, ENTRY_INFO } from "@/content/site";

export type Styles = typeof TRAVEL_STYLES;
export type Faq = typeof FAQ;
export type SiteSettings = typeof SITE;
export type EntryInfo = typeof ENTRY_INFO;

/** Saved editorial rows; anything absent falls back to the code defaults. */
export type Collections = { styles?: unknown; faq?: unknown; site?: unknown; entry?: unknown };

/**
 * Editorial content comes from the database when a row exists and falls back to
 * the code defaults otherwise, so the site never renders empty while a section
 * has not been saved from the CMS yet.
 */
export const contentQueryOptions = queryOptions({
  queryKey: ["content-collections"],
  queryFn: async (): Promise<Collections> => {
    const { data, error } = await supabase.from("content_collections").select("key, data");
    if (error) {
      // Editorial content must never blank a public page: fall back to code defaults.
      console.error("content read failed, using defaults", error);
      return {};
    }
    const out: Record<string, unknown> = {};
    for (const row of data ?? []) out[row.key] = row.data;
    return out as Collections;
  },
  staleTime: 60_000,
});

export function useSiteContent() {
  const q = useQuery(contentQueryOptions);
  const d = q.data ?? {};
  return {
    isLoading: q.isPending,
    styles: (Array.isArray(d.styles) ? d.styles : TRAVEL_STYLES) as Styles,
    faq: (Array.isArray(d.faq) ? d.faq : FAQ) as Faq,
    site: { ...SITE, ...(typeof d.site === "object" && d.site ? d.site : {}) } as SiteSettings,
    entry: { ...ENTRY_INFO, ...(typeof d.entry === "object" && d.entry ? d.entry : {}) } as EntryInfo,
  };
}
