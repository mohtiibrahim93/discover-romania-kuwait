import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import { CONTENT_KEYS, validateContent } from "@/lib/content-schema";

type ContentJson = NonNullable<Database["public"]["Tables"]["content_collections"]["Insert"]["data"]>;

/**
 * Saving editorial content. Restricted to owner/editor roles in three places:
 * this handler, the RLS policies on content_collections, and the admin UI.
 */
export const saveContentCollection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { key?: unknown; data?: unknown }) => {
    if (typeof d?.key !== "string" || !CONTENT_KEYS.includes(d.key as never)) throw new Error("Unknown content section.");
    return { key: d.key, data: d.data };
  })
  .handler(async ({ data, context }) => {
    const { data: allowed } = await context.supabase.rpc("can_edit_content", { _user_id: context.userId });
    if (!allowed) throw new Error("Only owners and editors can change site content.");

    const checked = validateContent(data.key, data.data);
    if (!checked.ok) throw new Error(checked.errors.join("\n"));

    const { error } = await context.supabase
      .from("content_collections")
      .upsert(
        { key: data.key, data: checked.data as ContentJson, updated_by: context.userId, updated_at: new Date().toISOString() },
        { onConflict: "key" },
      );
    if (error) {
      console.error("content save failed", error);
      throw new Error("Could not save this content.");
    }
    return { ok: true as const };
  });
