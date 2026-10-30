import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Wordmark } from "@/components/site/Wordmark";
import { btn } from "@/components/site/ui";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Staff sign in — Discover Romania Kuwait" },
      { name: "description", content: "Private staff area for Discover Romania Kuwait." },
      { property: "og:title", content: "Staff sign in — Discover Romania Kuwait" },
      { property: "og:description", content: "Private staff area." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMsg(error.message);
      navigate({ to: "/admin" });
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth` } });
      setBusy(false);
      if (error) return setMsg(error.message);
      if (data.session) navigate({ to: "/admin" });
      else setMsg("Check your email to confirm your account, then sign in. An owner must grant you access.");
    }
  }

  async function lovableIn() {
    setBusy(true); setMsg(null);
    const res = await lovable.auth.signInWithOAuth("lovable", { redirect_uri: window.location.origin });
    if (res.redirected) return;
    setBusy(false);
    if (res.error) return setMsg(res.error.message);
    const { data } = await supabase.auth.getUser();
    if (data.user) navigate({ to: "/admin" });
    else setMsg("Sign-in did not complete. Please try again.");
  }

  const input = "mt-1 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-foreground ltr-isolate";
  return (
    <main className="flex min-h-screen items-center justify-center bg-mist px-5 py-10" dir="ltr">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-sm bg-background p-8 shadow-sm">
        <Wordmark />
        <h1 className="text-2xl text-primary">{mode === "in" ? "Staff sign in" : "Create staff account"}</h1>
        <label className="block text-sm">Email<input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} /></label>
        <label className="block text-sm">Password<input type="password" required minLength={8} autoComplete={mode === "in" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} className={input} /></label>
        {msg && <p role="status" className="text-sm text-muted-foreground">{msg}</p>}
        <button disabled={busy} className={btn.primary + " w-full disabled:opacity-60"}>{busy ? "…" : mode === "in" ? "Sign in" : "Create account"}</button>
        <button type="button" onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(null); }} className="text-sm text-accent underline-offset-4 hover:underline">
          {mode === "in" ? "New team member? Create an account" : "Already have an account? Sign in"}
        </button>
      </form>
    </main>
  );
}
