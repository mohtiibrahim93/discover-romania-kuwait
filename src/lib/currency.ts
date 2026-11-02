import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";

/** Prices are stored in EUR and converted for display with these fixed reference rates. */
export const CURRENCIES = ["KWD", "USD", "EUR"] as const;
export type Currency = (typeof CURRENCIES)[number];
export const DEFAULT_CURRENCY: Currency = "KWD";

/** 1 EUR in each currency — reference rate of 2 Nov 2026 (open.er-api.com). Update by hand. */
export const EUR_RATES: Record<Currency, number> = { EUR: 1, USD: 1.115981, KWD: 0.34676 };
export const RATES_DATE = "2026-11-02";

const LOCALE_TAG: Record<Locale, string> = { en: "en-GB", ar: "ar-KW", ro: "ro-RO" };

/** Converts a EUR amount and rounds it: KWD to the nearest 1, EUR/USD to the nearest 5. */
export function convertFromEur(eur: number, c: Currency): number {
  const v = eur * EUR_RATES[c];
  return c === "KWD" ? Math.round(v) : Math.round(v / 5) * 5;
}

export function formatPrice(eur: number, c: Currency, l: Locale): string {
  return new Intl.NumberFormat(LOCALE_TAG[l], { style: "currency", currency: c, currencyDisplay: "narrowSymbol", maximumFractionDigits: 0, minimumFractionDigits: 0, numberingSystem: "latn" }).format(convertFromEur(eur, c));
}

const KEY = "drk.currency";
const isCurrency = (v: unknown): v is Currency => typeof v === "string" && (CURRENCIES as readonly string[]).includes(v);

/** Per-viewer currency choice, remembered in this browser when storage is available. */
export function useCurrency(): [Currency, (c: Currency) => void] {
  const [c, setC] = useState<Currency>(DEFAULT_CURRENCY);
  useEffect(() => {
    try { const v = window.localStorage.getItem(KEY); if (isCurrency(v)) setC(v); } catch { /* storage unavailable */ }
  }, []);
  const set = (v: Currency) => {
    setC(v);
    try { window.localStorage.setItem(KEY, v); } catch { /* storage unavailable */ }
  };
  return [c, set];
}
