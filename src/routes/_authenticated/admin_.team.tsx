import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listTeam, setTeamRole } from "@/lib/team.functions";
import { Wordmark } from "@/components/site/Wordmark";
import { btn } from "@/components/site/ui";

export const Route = createFileRoute("/_authenticated/admin_/team")({
  head: () => ({
    meta: [
      { title: "Team access — Discover Romania Kuwait" },
      { name: "description", content: "Manage staff access." },
      { property: "og:title", content: "Team access" },
      { property: "og:description", content: "Manage staff access." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: TeamPage,
});

const ROLES = [
  ["owner", "Owner", "Everything, including team and export"],
  ["sales", "Sales", "View and work on trip requests"],
  ["editor", "Editor", "Content editing (coming soon)"],
] as const;

function TeamPage() {
  const qc = useQueryClient();
  const fetchTeam = useServerFn(listTeam);
  const setRole = useServerFn(setTeamRole);
  const team = useQuery({ queryKey: ["team"], queryFn: () => fetchTeam(), retry: false });
  const toggle = useMutation({
    mutationFn: (v: { userId: string; role: "owner" | "sales" | "editor"; grant: boolean }) => setRole({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["team"] }),
  });

  return (
    <div className="min-h-screen bg-mist" dir="ltr">
      <header className="flex items-center justify-between gap-4 border-b border-border bg-background px-5 py-4">
        <Wordmark />
        <Link to="/admin" className={btn.outline}>Back to requests</Link>
      </header>
      <main className="mx-auto max-w-4xl px-5 py-8">
        <h1 className="text-3xl text-primary">Team access</h1>
        <p className="mt-2 text-sm text-muted-foreground">New team members create an account at the staff sign-in page, then appear here. Tick a role to give access.</p>
        <ul className="mt-4 grid gap-1 text-xs text-muted-foreground">{ROLES.map(([, l, d]) => <li key={l}><b>{l}</b> — {d}</li>)}</ul>
        {toggle.error && <p className="mt-4 text-sm text-destructive">{(toggle.error as Error).message}</p>}
        <div className="mt-6 overflow-x-auto rounded-sm bg-background">
          {team.isLoading ? <p className="p-6">Loading…</p> : team.error ? <p className="p-6 text-destructive">Only the owner can manage the team.</p> : (
            <table className="w-full text-sm">
              <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                <tr><th className="px-4 py-3 text-start">Email</th>{ROLES.map(([, l]) => <th key={l} className="px-4 py-3">{l}</th>)}</tr>
              </thead>
              <tbody>
                {team.data?.map((m) => (
                  <tr key={m.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">{m.email}</td>
                    {ROLES.map(([r, l]) => (
                      <td key={r} className="px-4 py-3 text-center">
                        <input type="checkbox" aria-label={`${l} for ${m.email}`} className="h-5 w-5 accent-forest"
                          checked={m.roles.includes(r)} disabled={toggle.isPending}
                          onChange={(e) => toggle.mutate({ userId: m.id, role: r, grant: e.target.checked })} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
