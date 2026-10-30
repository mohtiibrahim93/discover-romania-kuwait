import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LOCALES, LOCALE_LABELS, LOCALE_STORAGE_KEY, isLocale, pickBrowserLocale } from "@/i18n/config";
import { Wordmark } from "@/components/site/Wordmark";
import { captureLeadSource } from "@/lib/lead-source";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Discover Romania Kuwait — Choose your language" },
      { name: "description", content: "Personally planned journeys to Romania. English, العربية, Română." },
      { property: "og:title", content: "Discover Romania Kuwait" },
      { property: "og:description", content: "Personally planned journeys to Romania for travellers from Kuwait and the GCC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LocaleGate,
});

function LocaleGate() {
  const navigate = useNavigate();
  useEffect(() => {
    captureLeadSource(); // before the redirect drops the ad link's utm_* tags
    let stored: string | null = null;
    try { stored = localStorage.getItem(LOCALE_STORAGE_KEY); } catch { /* ignore */ }
    const loc = isLocale(stored) ? stored : pickBrowserLocale(navigator.languages ?? [navigator.language]);
    navigate({ to: "/$locale", params: { locale: loc }, replace: true });
  }, [navigate]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6">
      <Wordmark />
      <nav className="flex gap-6" aria-label="Language">
        {LOCALES.map((l) => <a key={l} href={`/${l}`} lang={l} className="min-h-11 text-lg text-primary underline-offset-4 hover:underline">{LOCALE_LABELS[l]}</a>)}
      </nav>
    </main>
  );
}
