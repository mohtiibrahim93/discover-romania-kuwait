import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Role = "owner" | "sales" | "editor";
const ROLES: Role[] = ["owner", "sales", "editor"];

async function assertOwner(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "owner" });
  if (error || !data) throw new Error("Only the owner can manage the team.");
}

export const listTeam = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertOwner(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roles, error } = await supabaseAdmin.from("user_roles").select("user_id, role");
    if (error) throw new Error("Could not load team.");
    const { data: users } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    const map = new Map<string, { id: string; email: string; roles: Role[] }>();
    for (const u of users?.users ?? []) map.set(u.id, { id: u.id, email: u.email ?? "", roles: [] });
    for (const r of roles ?? []) map.get(r.user_id)?.roles.push(r.role as Role);
    return [...map.values()].sort((a, b) => a.email.localeCompare(b.email));
  });

export const setTeamRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string; role: Role; grant: boolean }) => {
    if (typeof d?.userId !== "string" || !ROLES.includes(d.role) || typeof d.grant !== "boolean") throw new Error("Invalid input");
    return d;
  })
  .handler(async ({ data, context }) => {
    await assertOwner(context.supabase, context.userId);
    if (data.userId === context.userId && data.role === "owner" && !data.grant) throw new Error("You can't remove your own owner role.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const res = data.grant
      ? await supabaseAdmin.from("user_roles").upsert({ user_id: data.userId, role: data.role }, { onConflict: "user_id,role" })
      : await supabaseAdmin.from("user_roles").delete().eq("user_id", data.userId).eq("role", data.role);
    if (res.error) throw new Error("Could not update role.");
    return { ok: true };
  });
