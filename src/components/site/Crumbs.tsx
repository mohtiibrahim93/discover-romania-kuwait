import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useLocale } from "@/i18n/config";
import { t } from "@/i18n/ui";

export function Crumbs({ section, to, current }: { section: string; to: string; current: string }) {
  const l = useLocale();
  return (
    <nav aria-label={t("breadcrumb", l)} className="text-sm text-on-dark-muted">
      <ol className="flex flex-wrap items-center gap-1">
        <li><Link to="/$locale" params={{ locale: l }} className="inline-flex min-h-11 items-center hover:text-on-dark">{t("home", l)}</Link></li>
        <li aria-hidden><ChevronRight className="flip-rtl h-3.5 w-3.5" /></li>
        <li><Link to={to} params={{ locale: l }} className="inline-flex min-h-11 items-center hover:text-on-dark">{section}</Link></li>
        <li aria-hidden><ChevronRight className="flip-rtl h-3.5 w-3.5" /></li>
        <li aria-current="page" className="text-on-dark">{current}</li>
      </ol>
    </nav>
  );
}
