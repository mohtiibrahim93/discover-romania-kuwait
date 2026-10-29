import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Wordmark } from "@/components/site/Wordmark";
import { btn } from "@/components/site/ui";
import { useSiteContent } from "@/lib/site-content";
import { saveContentCollection } from "@/lib/content.functions";
import { validateContent, type ContentKey } from "@/lib/content-schema";

export const Route = createFileRoute("/_authenticated/admin_/content")({
  head: () => ({
    meta: [
      { title: "Site content — Discover Romania Kuwait" },
      { name: "description", content: "Private staff content editor." },
      { property: "og:title", content: "Site content" },
      { property: "og:description", content: "Private staff content editor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ContentPage,
});

/** Editor-side shapes: looser than the code unions, validated by the schema on save. */
type L3 = { en: string; ar: string; ro: string };
type FaqRow = { q: L3; a: L3 };
type StyleRow = { id: string; media: string; title: L3; intro: L3 };
type SiteRow = { name: string; tagline: L3; email: string | null; whatsappDigits: string | null; socials: { label: string; url: string }[]; businessRegistration: string | null };
type EntryRow = { lastReviewed: string; links: { label: string; url: string }[]; body: L3 };
type Draft = { faq: FaqRow[]; styles: StyleRow[]; site: SiteRow; entry: EntryRow };

const blank = (): L3 => ({ en: "", ar: "", ro: "" });
const LANG: Record<keyof L3, string> = { en: "English", ar: "العربية", ro: "Română" };
const MEDIA = ["mountains", "oldTown", "countryside", "delta"];
const TABS = [["faq", "FAQ"], ["styles", "Travel styles"], ["site", "Contact & brand"], ["entry", "Entry guidance"]] as const;

const input = "min-h-11 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-champagne";

function ContentPage() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const [tab, setTab] = useState<ContentKey>("faq");
  const [errors, setErrors] = useState<string[]>([]);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  const roles = useQuery({
    queryKey: ["my-roles", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      if (error) throw error;
      return data.map((r) => r.role);
    },
  });
  const canEdit = roles.data?.some((r) => r === "owner" || r === "editor") ?? false;

  const { faq, styles, site, entry, isLoading } = useSiteContent();
  const [draft, setDraft] = useState<Draft | null>(null);
  useEffect(() => {
    if (draft || isLoading) return;
    setDraft({
      faq: JSON.parse(JSON.stringify(faq)) as FaqRow[],
      styles: JSON.parse(JSON.stringify(styles)) as StyleRow[],
      site: JSON.parse(JSON.stringify(site)) as SiteRow,
      entry: JSON.parse(JSON.stringify(entry)) as EntryRow,
    });
  }, [isLoading, draft, faq, styles, site, entry]);

  const saveFn = useServerFn(saveContentCollection);
  const mut = useMutation({
    mutationFn: (v: { key: ContentKey; data: unknown }) => saveFn({ data: v }),
    onSuccess: (_r, v) => {
      qc.invalidateQueries({ queryKey: ["content-collections"] });
      setSavedKey(v.key);
    },
  });

  if (roles.isLoading) return <Shell><p className="p-6">Loading…</p></Shell>;
  if (!canEdit) return (
    <Shell>
      <div className="rounded-sm bg-background p-8">
        <h1 className="text-2xl text-primary">No content access</h1>
        <p className="mt-3 text-muted-foreground">Only owners and editors can change site content.</p>
        <Link to="/admin" className={`${btn.outline} mt-6`}>Back to requests</Link>
      </div>
    </Shell>
  );
  if (!draft) return <Shell><p className="p-6">Loading content…</p></Shell>;

  const submit = (key: ContentKey) => {
    const data = draft[key];
    const checked = validateContent(key, data);
    if (!checked.ok) { setErrors(checked.errors); setSavedKey(null); return; }
    setErrors([]);
    mut.mutate({ key, data });
  };

  return (
    <Shell>
      <h1 className="text-3xl text-primary">Site content</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Changes go live on the public site once saved. Every field must be filled in all three languages —
        a blank English, Arabic or Romanian field blocks the save.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map(([k, label]) => (
          <button key={k} onClick={() => { setTab(k); setErrors([]); }}
            className={`min-h-11 px-4 text-sm ${tab === k ? "bg-primary text-background" : "border border-border bg-background text-primary"}`}>
            {label}
          </button>
        ))}
      </div>

      {errors.length > 0 && (
        <div role="alert" className="mt-4 border border-destructive bg-background p-4 text-sm text-destructive">
          <p className="font-semibold">Fix these before saving:</p>
          <ul className="mt-2 list-disc space-y-1 ps-5">{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      )}
      {mut.error && <p className="mt-4 whitespace-pre-line text-sm text-destructive">{(mut.error as Error).message}</p>}
      {savedKey && savedKey === tab && !mut.isPending && <p className="mt-4 text-sm text-accent">Saved.</p>}

      <div className="mt-6 space-y-4">
        {tab === "faq" && draft.faq.map((f, i) => (
          <Card key={i} title={`Question ${i + 1}`} onRemove={() => setDraft((d) => d && { ...d, faq: d.faq.filter((_, j) => j !== i) })}>
            <LangField value={f.q} area onChange={(q) => setDraft((d) => d && { ...d, faq: d.faq.map((x, j) => (j === i ? { ...x, q } : x)) })} />
            <div className="mt-3"><LangField value={f.a} area onChange={(a) => setDraft((d) => d && { ...d, faq: d.faq.map((x, j) => (j === i ? { ...x, a } : x)) })} /></div>
          </Card>
        ))}
        {tab === "faq" && <AddButton onClick={() => setDraft((d) => d && { ...d, faq: [...d.faq, { q: blank(), a: blank() }] })} label="Add question" />}

        {tab === "styles" && draft.styles.map((s, i) => (
          <Card key={i} title={`Style ${i + 1} · ${s.id}`} onRemove={() => setDraft((d) => d && { ...d, styles: d.styles.filter((_, j) => j !== i) })}>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block"><span className="mb-1 block text-xs text-muted-foreground">Reference (used by journeys and filters)</span>
                <input value={s.id} onChange={(e) => setDraft((d) => d && { ...d, styles: d.styles.map((x, j) => (j === i ? { ...x, id: e.target.value } : x)) })} className={input} />
              </label>
              <label className="block"><span className="mb-1 block text-xs text-muted-foreground">Illustration</span>
                <select value={s.media} onChange={(e) => setDraft((d) => d && { ...d, styles: d.styles.map((x, j) => (j === i ? { ...x, media: e.target.value } : x)) })} className={input}>
                  {MEDIA.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </label>
            </div>
            <div className="mt-3"><LangField value={s.title} onChange={(title) => setDraft((d) => d && { ...d, styles: d.styles.map((x, j) => (j === i ? { ...x, title } : x)) })} /></div>
            <div className="mt-3"><LangField value={s.intro} area onChange={(intro) => setDraft((d) => d && { ...d, styles: d.styles.map((x, j) => (j === i ? { ...x, intro } : x)) })} /></div>
          </Card>
        ))}
        {tab === "styles" && <AddButton onClick={() => setDraft((d) => d && { ...d, styles: [...d.styles, { id: `style-${Date.now()}`, media: "countryside", title: blank(), intro: blank() }] })} label="Add travel style" />}

        {tab === "site" && (
          <Card title="Brand & contact channels">
            <TextRow label="Business name" value={draft.site.name} onChange={(name) => setDraft((d) => d && { ...d, site: { ...d.site, name } })} />
            <div className="mt-3"><span className="mb-1 block text-xs text-muted-foreground">Tagline</span>
              <LangField value={draft.site.tagline} onChange={(tagline) => setDraft((d) => d && { ...d, site: { ...d.site, tagline } })} /></div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <TextRow label="Email (leave empty to hide)" value={draft.site.email ?? ""} onChange={(v) => setDraft((d) => d && { ...d, site: { ...d.site, email: v || null } })} />
              <TextRow label="WhatsApp digits (e.g. 96556642402)" value={draft.site.whatsappDigits ?? ""} onChange={(v) => setDraft((d) => d && { ...d, site: { ...d.site, whatsappDigits: v || null } })} />
            </div>
            <div className="mt-3"><TextRow label="Business registration (leave empty until verified)" value={draft.site.businessRegistration ?? ""} onChange={(v) => setDraft((d) => d && { ...d, site: { ...d.site, businessRegistration: v || null } })} /></div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Social profiles</p>
            {draft.site.socials.map((s, i) => (
              <div key={i} className="mt-2 grid gap-2 sm:grid-cols-[8rem_1fr_auto]">
                <input value={s.label} placeholder="Label" onChange={(e) => setDraft((d) => d && { ...d, site: { ...d.site, socials: d.site.socials.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)) } })} className={input} />
                <input value={s.url} placeholder="https://…" onChange={(e) => setDraft((d) => d && { ...d, site: { ...d.site, socials: d.site.socials.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)) } })} className={input} />
                <button onClick={() => setDraft((d) => d && { ...d, site: { ...d.site, socials: d.site.socials.filter((_, j) => j !== i) } })} className={btn.outline}>Remove</button>
              </div>
            ))}
            <button onClick={() => setDraft((d) => d && { ...d, site: { ...d.site, socials: [...d.site.socials, { label: "", url: "" }] } })} className={`${btn.outline} mt-3`}>Add profile</button>
          </Card>
        )}

        {tab === "entry" && (
          <Card title="Visa & entry guidance">
            <TextRow label="Last reviewed (YYYY-MM-DD)" value={draft.entry.lastReviewed} onChange={(lastReviewed) => setDraft((d) => d && { ...d, entry: { ...d.entry, lastReviewed } })} />
            <div className="mt-3"><LangField value={draft.entry.body} area onChange={(body) => setDraft((d) => d && { ...d, entry: { ...d.entry, body } })} /></div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Official links</p>
            {draft.entry.links.map((x, i) => (
              <div key={i} className="mt-2 grid gap-2 sm:grid-cols-[1fr_2fr_auto]">
                <input value={x.label} placeholder="Label" onChange={(e) => setDraft((d) => d && { ...d, entry: { ...d.entry, links: d.entry.links.map((y, j) => (j === i ? { ...y, label: e.target.value } : y)) } })} className={input} />
                <input value={x.url} placeholder="https://…" onChange={(e) => setDraft((d) => d && { ...d, entry: { ...d.entry, links: d.entry.links.map((y, j) => (j === i ? { ...y, url: e.target.value } : y)) } })} className={input} />
                <button onClick={() => setDraft((d) => d && { ...d, entry: { ...d.entry, links: d.entry.links.filter((_, j) => j !== i) } })} className={btn.outline}>Remove</button>
              </div>
            ))}
            <button onClick={() => setDraft((d) => d && { ...d, entry: { ...d.entry, links: [...d.entry.links, { label: "", url: "" }] } })} className={`${btn.outline} mt-3`}>Add link</button>
          </Card>
        )}
      </div>

      <div className="sticky bottom-0 mt-6 flex items-center gap-3 border-t border-border bg-mist py-4">
        <button onClick={() => submit(tab)} disabled={mut.isPending} className={btn.solid}>
          {mut.isPending ? "Saving…" : `Save ${TABS.find(([k]) => k === tab)?.[1]}`}
        </button>
        <Link to="/admin" className={btn.outline}>Back to requests</Link>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-mist text-foreground" dir="ltr">
      <header className="flex items-center justify-between gap-4 border-b border-border bg-background px-5 py-4">
        <div className="flex items-center gap-4"><Wordmark /><span className="eyebrow max-sm:hidden text-accent">Staff</span></div>
        <Link to="/admin" className={btn.outline}>Requests</Link>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8">{children}</main>
    </div>
  );
}

function Card({ title, onRemove, children }: { title: string; onRemove: () => void; children: ReactNode }) {
  return (
    <section className="border border-border bg-background p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
        <button onClick={onRemove} className={btn.outline}>Remove</button>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return <button onClick={onClick} className={`${btn.outline} w-full py-3`}>+ {label}</button>;
}

function TextRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className={input} />
    </label>
  );
}

function LangField({ value, onChange, area }: { value: L3; onChange: (v: L3) => void; area?: boolean }) {
  const set = (k: keyof L3, v: string) => onChange({ en: k === "en" ? v : value.en, ar: k === "ar" ? v : value.ar, ro: k === "ro" ? v : value.ro });
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {(Object.keys(LANG) as (keyof L3)[]).map((k) => (
        <label key={k} className="block">
          <span className="mb-1 block text-xs text-muted-foreground">{LANG[k]}</span>
          {area
            ? <textarea dir={k === "ar" ? "rtl" : "ltr"} rows={4} value={value[k]} onChange={(e) => set(k, e.target.value)} className={input} />
            : <input dir={k === "ar" ? "rtl" : "ltr"} value={value[k]} onChange={(e) => set(k, e.target.value)} className={input} />}
        </label>
      ))}
    </div>
  );
}
