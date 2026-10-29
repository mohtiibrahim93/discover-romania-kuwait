import { cn } from "@/lib/utils";

/** Provisional identity — not trademark-cleared. */
export function Wordmark({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("ltr-isolate inline-flex flex-col leading-none", light ? "text-on-dark" : "text-primary", className)} data-identity="provisional">
      <svg viewBox="0 0 120 14" className="mb-1 h-2.5 w-24" aria-hidden="true">
        <path d="M0 13 L22 5 L32 9 L48 1 L62 8 L74 4 L92 11 L104 6 L120 13" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-champagne" />
      </svg>
      <span className="font-display text-lg tracking-tight">Discover Romania</span>
      <span className="eyebrow mt-1 text-[0.6rem] opacity-80">Kuwait</span>
    </span>
  );
}
