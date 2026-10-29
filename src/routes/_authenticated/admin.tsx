import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Wordmark } from "@/components/site/Wordmark";
import { btn } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Leads dashboard — Discover Romania Kuwait" },
      { name: "description", content: "Private staff dashboard." },
      { property: "og:title", content: "Leads dashboard" },
      { property: "og:description", content: "Private staff dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Inquiry = Tables<"trip_inquiries">;
type Note = Tables<"inquiry_notes">;

export const STATUSES = [
  ["new", "New"], ["contacted", "Contacted"], ["qualifying", "Qualifying"], ["quote_preparation", "Quote preparation"],
  ["quote_sent", "Quote sent"], ["awaiting_reply", "Awaiting reply"], ["confirmed_off_platform", "Confirmed (off-platform)"],
  ["lost", "Lost"], ["archived", "Archived"],
] as const;
const statusLabel = (s: string) => STATUSES.find(([k]) => k === s)?.[1] ?? s;

function AdminPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const roles = useQuery({
    queryKey: ["my-roles", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      if (error) throw error;
      return data.map((r) => r.role);
    },
  });
  const canLeads = roles.data?.some((r) => r === "owner" || r === "sales") ?? false;
  const isOwner = roles.data?.includes("owner") ?? false;

  const leads = useQuery({
    queryKey: ["inquiries"],
    enabled: canLeads,
    queryFn: async () => {
      const { data, error } = await supabase.from("trip_inquiries").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return (leads.data ?? []).filter((r) =>
      (status === "all" || r.status === status) &&
      (!s || [r.reference, r.name, r.email, r.phone, r.residence, r.tour_slug ?? ""].some((v) => v.toLowerCase().includes(s))));
  }, [leads.data, q, status]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const r of leads.data ?? []) c[r.status] = (c[r.status] ?? 0) + 1;
    return c;
  }, [leads.data]);

  async function signOut() {
    await qc.cancelQueries(); qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  function exportCsv() {
    const cols: (keyof Inquiry)[] = ["reference", "created_at", "status", "name", "email", "phone", "residence", "nationality", "preferred_language", "request_type", "tour_slug", "destinations", "travel_month", "adults", "children", "budget", "duration", "notes"];
    const esc = (v: unknown) => `"${String(Array.isArray(v) ? v.join("; ") : v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  const open = rows.find((r) => r.id === openId) ?? leads.data?.find((r) => r.id === openId) ?? null;

  return (
    <div className="min-h-screen bg-mist text-foreground" dir="ltr">
      <header className="flex items-center justify-between gap-4 border-b border-border bg-background px-5 py-4">
        <div className="flex items-center gap-4"><Wordmark /><span className="eyebrow text-accent max-sm:hidden">Staff</span></div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground max-sm:hidden">{user.email}</span>
          <button onClick={signOut} className={btn.outline}>Sign out</button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">
        {roles.isLoading ? <p>Loading…</p> : !canLeads ? (
          <div className="rounded-sm bg-background p-8">
            <h1 className="text-2xl text-primary">No access yet</h1>
            <p className="mt-3 text-muted-foreground">Your account exists but has not been given a role. Ask the owner to grant you access.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div><h1 className="text-3xl text-primary">Trip requests</h1><p className="mt-1 text-sm text-muted-foreground">{leads.data?.length ?? 0} total</p></div>
              {isOwner && <button onClick={exportCsv} disabled={!rows.length} className={btn.outline + " disabled:opacity-50"}>Export CSV</button>}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              {STATUSES.filter(([k]) => k !== "archived").map(([k, label]) => (
                <button key={k} onClick={() => setStatus(status === k ? "all" : k)}
                  className={cn("rounded-sm bg-background p-4 text-start", status === k && "ring-2 ring-champagne")}>
                  <p className="text-2xl font-semibold text-primary">{counts[k] ?? 0}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, phone, reference…" aria-label="Search"
                className="min-h-11 flex-1 rounded-sm border border-input bg-background px-3" />
              <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status" className="min-h-11 rounded-sm border border-input bg-background px-3">
                <option value="all">All statuses</option>
                {STATUSES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </div>

            <div className="mt-4 overflow-x-auto rounded-sm bg-background">
              {leads.isLoading ? <p className="p-6">Loading…</p> : leads.error ? <p className="p-6 text-destructive">Could not load requests.</p> : rows.length === 0 ? (
                <p className="p-6 text-muted-foreground">No trip requests match.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead className="border-b border-border text-start text-xs uppercase text-muted-foreground">
                    <tr>{["Received", "Reference", "Guest", "Trip", "Month", "Party", "Status"].map((h) => <th key={h} className="px-4 py-3 text-start font-medium">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id} onClick={() => setOpenId(r.id)} className="cursor-pointer border-b border-border last:border-0 hover:bg-mist">
                        <td className="px-4 py-3 whitespace-nowrap">{new Date(r.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3 font-mono text-xs">{r.reference}</td>
                        <td className="px-4 py-3"><p className="font-medium">{r.name}</p><p className="text-xs text-muted-foreground">{r.residence}</p></td>
                        <td className="px-4 py-3">{r.request_type === "custom" ? "Tailored" : r.tour_slug ?? "—"}</td>
                        <td className="px-4 py-3">{r.travel_month}</td>
                        <td className="px-4 py-3">{r.adults}A{r.children ? ` + ${r.children}C` : ""}</td>
                        <td className="px-4 py-3"><span className="rounded-full bg-mist px-2.5 py-1 text-xs">{statusLabel(r.status)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </main>

      {open && <LeadPanel lead={open} email={user.email ?? null} onClose={() => setOpenId(null)} />}
    </div>
  );
}

function LeadPanel({ lead, email, onClose }: { lead: Inquiry; email: string | null; onClose: () => void }) {
  const qc = useQueryClient();
  const [note, setNote] = useState("");

  const notes = useQuery({
    queryKey: ["notes", lead.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("inquiry_notes").select("*").eq("inquiry_id", lead.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data as Note[];
    },
  });

  const addNote = async (body: string, kind: string) => {
    const { error } = await supabase.from("inquiry_notes").insert({ inquiry_id: lead.id, body, kind, author_email: email });
    if (error) throw error;
  };

  const setStatus = useMutation({
    mutationFn: async (s: string) => {
      const { error } = await supabase.from("trip_inquiries").update({ status: s }).eq("id", lead.id);
      if (error) throw error;
      await addNote(`Status: ${statusLabel(lead.status)} → ${statusLabel(s)}`, "status");
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["inquiries"] }); qc.invalidateQueries({ queryKey: ["notes", lead.id] }); },
  });

  const saveNote = useMutation({
    mutationFn: () => addNote(note.trim(), "note"),
    onSuccess: () => { setNote(""); qc.invalidateQueries({ queryKey: ["notes", lead.id] }); },
  });

  const field = (label: string, v: unknown) => {
    const val = Array.isArray(v) ? v.join(", ") : typeof v === "boolean" ? (v ? "Yes" : "No") : v;
    if (val === null || val === undefined || val === "") return null;
    return <div key={label}><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-0.5 break-words">{String(val)}</dd></div>;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-midnight/40" onClick={onClose}>
      <aside role="dialog" aria-label={`Request ${lead.reference}`} onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-xl overflow-y-auto bg-background p-6">
        <div className="flex items-start justify-between gap-4">
          <div><p className="font-mono text-xs text-muted-foreground">{lead.reference}</p><h2 className="mt-1 text-2xl text-primary">{lead.name}</h2></div>
          <button onClick={onClose} className="min-h-11 px-2 text-sm text-muted-foreground">Close</button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <a href={`mailto:${lead.email}`} className={btn.outline}>Email</a>
          <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className={btn.outline}>WhatsApp</a>
        </div>

        <label className="mt-6 block text-sm">Status
          <select value={lead.status} disabled={setStatus.isPending} onChange={(e) => setStatus.mutate(e.target.value)}
            className="mt-1 min-h-11 w-full rounded-sm border border-input bg-background px-3">
            {STATUSES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </label>
        {setStatus.error && <p className="mt-2 text-sm text-destructive">Could not update status.</p>}

        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
          {field("Received", new Date(lead.created_at).toLocaleString())}
          {field("Email", lead.email)}{field("WhatsApp / phone", lead.phone)}
          {field("Residence", lead.residence)}{field("Nationality", lead.nationality)}
          {field("Preferred language", lead.preferred_language)}{field("Site language", lead.site_locale)}
          {field("Request", lead.request_type === "custom" ? "Tailored itinerary" : "Tour")}{field("Tour", lead.tour_slug)}
          {field("Destinations", lead.destinations)}{field("Travel month", lead.travel_month)}
          {field("Adults", lead.adults)}{field("Children", lead.children)}
          {field("Duration", lead.duration)}{field("Budget", lead.budget)}
          {field("Pace", lead.pace)}{field("Accommodation", lead.accommodation)}
          {field("Travel style", lead.travel_style)}{field("Guide language", lead.guide_language)}
          {field("Dietary", lead.dietary)}{field("Flight help", lead.flight_assistance)}
          {field("Interests", lead.interests)}
        </dl>
        {lead.notes && <div className="mt-4 rounded-sm bg-mist p-4 text-sm"><p className="text-xs text-muted-foreground">Guest notes</p><p className="mt-1 whitespace-pre-wrap">{lead.notes}</p></div>}

        <section className="mt-8">
          <h3 className="text-lg text-primary">Staff notes & history</h3>
          <form onSubmit={(e) => { e.preventDefault(); if (note.trim()) saveNote.mutate(); }} className="mt-3 space-y-2">
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Add an internal note…" aria-label="Internal note"
              className="w-full rounded-sm border border-input bg-background p-3 text-sm" />
            <button disabled={!note.trim() || saveNote.isPending} className={btn.primary + " disabled:opacity-50"}>Add note</button>
          </form>
          <ul className="mt-4 space-y-3">
            {(notes.data ?? []).map((n) => (
              <li key={n.id} className={cn("rounded-sm p-3 text-sm", n.kind === "status" ? "bg-mist text-muted-foreground" : "border border-border")}>
                <p className="whitespace-pre-wrap">{n.body}</p>
                <p className="mt-1 text-xs text-muted-foreground">{n.author_email ?? "Staff"} · {new Date(n.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}
