import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import { asLocale, LOCALES, LOCALE_LABELS, type L, type Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { seo } from "@/lib/seo";
import { publishedTours } from "@/content/tours";
import { TRAVEL_STYLES } from "@/content/styles";
import { SITE } from "@/content/site";
import { PageHero, btn } from "@/components/site/ui";

const F = {
  intro: { en: "Share a few details and we will prepare a personalised proposed itinerary. This is a quote inquiry — not a booking.", ar: "شاركنا بعض التفاصيل وسنعدّ لك برنامجًا مقترحًا مخصصًا. هذا طلب عرض سعر وليس حجزًا.", ro: "Spune-ne câteva detalii și îți pregătim un itinerariu propus personalizat. Aceasta este o cerere de ofertă — nu o rezervare." },
  name: { en: "Full name", ar: "الاسم الكامل", ro: "Nume complet" },
  email: { en: "Email", ar: "البريد الإلكتروني", ro: "E-mail" },
  phone: { en: "WhatsApp / mobile (with country code)", ar: "واتساب / الجوال (مع رمز الدولة)", ro: "WhatsApp / mobil (cu prefix internațional)" },
  residence: { en: "Country of residence", ar: "بلد الإقامة", ro: "Țara de reședință" },
  nationality: { en: "Passport nationality (optional)", ar: "جنسية جواز السفر (اختياري)", ro: "Cetățenia pașaportului (opțional)" },
  lang: { en: "Preferred language", ar: "اللغة المفضلة", ro: "Limba preferată" },
  month: { en: "Intended travel month", ar: "شهر السفر المتوقع", ro: "Luna estimată a călătoriei" },
  adults: { en: "Adults", ar: "البالغون", ro: "Adulți" },
  children: { en: "Children", ar: "الأطفال", ro: "Copii" },
  tour: { en: "Journey of interest", ar: "الرحلة التي تهمك", ro: "Circuitul de interes" },
  custom: { en: "Custom / not sure yet", ar: "مخصصة / لم أقرر بعد", ro: "Personalizat / încă nu știu" },
  optional: { en: "Optional details", ar: "تفاصيل اختيارية", ro: "Detalii opționale" },
  budget: { en: "Approximate budget per party (KWD)", ar: "الميزانية التقريبية للمجموعة (د.ك)", ro: "Buget aproximativ pe grup (KWD)" },
  budgetHint: { en: "For guidance only — not a price we advertise.", ar: "للاسترشاد فقط — وليس سعرًا معلنًا من قبلنا.", ro: "Doar orientativ — nu este un preț afișat de noi." },
  duration: { en: "Preferred duration (days)", ar: "المدة المفضلة (أيام)", ro: "Durata preferată (zile)" },
  style: { en: "Preferred travel style", ar: "نمط السفر المفضل", ro: "Stilul de călătorie preferat" },
  dietary: { en: "Dietary requests (e.g. halal)", ar: "طلبات غذائية (مثل الحلال)", ro: "Cerințe alimentare (ex. halal)" },
  guideLang: { en: "Requested guide language", ar: "لغة المرشد المطلوبة", ro: "Limba ghidului dorită" },
  flights: { en: "Flight assistance might be helpful", ar: "قد تكون المساعدة في الطيران مفيدة", ro: "Ajutorul cu zborurile ar fi util" },
  notes: { en: "Anything else we should know?", ar: "هل هناك ما يجب أن نعرفه أيضًا؟", ro: "Mai este ceva ce ar trebui să știm?" },
  consent: { en: "I agree to be contacted about this inquiry and to the processing of my details as described in the", ar: "أوافق على التواصل معي بخصوص هذا الاستفسار وعلى معالجة بياناتي كما هو موضح في", ro: "Sunt de acord să fiu contactat(ă) privind această solicitare și cu prelucrarea datelor mele conform" },
  submit: { en: "Send inquiry", ar: "إرسال الاستفسار", ro: "Trimite solicitarea" },
  notConnected: { en: "Preview mode: the inquiry system is not connected yet, so this form cannot send. Your details have not been submitted.", ar: "وضع المعاينة: نظام الاستفسارات غير متصل بعد، لذلك لا يمكن إرسال هذا النموذج. لم يتم إرسال بياناتك.", ro: "Mod previzualizare: sistemul de solicitări nu este încă conectat, deci formularul nu poate trimite. Datele tale nu au fost transmise." },
  checked: { en: "Your details look complete. Sending will be enabled once the inquiry system is connected.", ar: "تبدو بياناتك مكتملة. سيُفعَّل الإرسال بمجرد ربط نظام الاستفسارات.", ro: "Datele tale par complete. Trimiterea va fi activată după conectarea sistemului de solicitări." },
  required: { en: "Required", ar: "مطلوب", ro: "Obligatoriu" },
  errEmail: { en: "Please enter a valid email.", ar: "يُرجى إدخال بريد إلكتروني صحيح.", ro: "Introdu o adresă de e-mail validă." },
  errPhone: { en: "Use international format, e.g. +965 1234 5678.", ar: "استخدم الصيغة الدولية، مثل ‎+965 1234 5678.", ro: "Folosește formatul internațional, ex. +40 712 345 678." },
  errAdults: { en: "At least one adult.", ar: "بالغ واحد على الأقل.", ro: "Cel puțin un adult." },
  errConsent: { en: "Please confirm your consent to continue.", ar: "يُرجى تأكيد موافقتك للمتابعة.", ro: "Te rugăm să îți confirmi acordul pentru a continua." },
  errFix: { en: "Please review the highlighted fields.", ar: "يُرجى مراجعة الحقول المحددة.", ro: "Verifică câmpurile marcate." },
} satisfies Record<string, L>;

const searchSchema = z.object({ tour: z.string().optional() });

export const Route = createFileRoute("/$locale/plan-your-trip")({
  validateSearch: (s) => searchSchema.catch({}).parse(s),
  head: ({ params }) => { const l = asLocale(params.locale); return seo(l, t("planTrip", l), F.intro[l], "/plan-your-trip"); },
  component: Page,
});

const schema = (l: Locale) => z.object({
  name: z.string().trim().min(2, F.required[l]).max(120),
  email: z.string().trim().email(F.errEmail[l]).max(200),
  phone: z.string().trim().regex(/^\+[1-9][\d\s-]{6,18}$/, F.errPhone[l]),
  residence: z.string().trim().min(2, F.required[l]).max(80),
  nationality: z.string().trim().max(80).optional(),
  lang: z.enum(LOCALES),
  month: z.string().min(1, F.required[l]),
  adults: z.coerce.number().int().min(1, F.errAdults[l]).max(60),
  children: z.coerce.number().int().min(0).max(40),
  tour: z.string(),
  budget: z.string().max(40).optional(),
  duration: z.string().max(10).optional(),
  style: z.string().optional(),
  dietary: z.string().max(200).optional(),
  guideLang: z.string().max(60).optional(),
  flights: z.boolean().optional(),
  notes: z.string().max(2000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: F.errConsent[l] }) }),
});

function Page() {
  const l = asLocale(Route.useParams().locale);
  const { tour } = Route.useSearch();
  const tours = publishedTours();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const res = schema(l).safeParse({ ...raw, flights: fd.get("flights") === "on", consent: fd.get("consent") === "on" });
    if (!res.success) {
      const errs: Record<string, string> = {};
      for (const i of res.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs); setChecked(false);
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setErrors({});
    // No backend is connected yet: never show a false "submitted" state.
    setChecked(true);
  };

  const months = Array.from({ length: 18 }, (_, i) => { const d = new Date(2026, 10 + i, 1); return { v: d.toISOString().slice(0, 7), label: d.toLocaleDateString(l === "ar" ? "ar-KW" : l, { month: "long", year: "numeric" }) }; });
  const input = "min-h-12 w-full rounded-sm border border-input bg-card px-3 text-base focus-visible:border-accent aria-[invalid=true]:border-destructive";

  return (
    <>
      <PageHero media="countryside" eyebrow={t("tailor", l)} title={t("planTrip", l)} intro={F.intro[l]} />
      <section className="container-edit max-w-3xl py-16 md:py-24">
        {!SITE.inquiryBackendConnected && <p role="status" className="mb-10 border border-champagne bg-card p-4 text-sm">{F.notConnected[l]}</p>}
        <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
          {Object.keys(errors).length > 0 && <p role="alert" className="text-sm font-semibold text-destructive sm:col-span-2">{F.errFix[l]}</p>}
          <Field id="name" label={F.name[l]} err={errors["name"]} req><input id="f-name" name="name" autoComplete="name" className={input} aria-invalid={!!errors["name"]} /></Field>
          <Field id="email" label={F.email[l]} err={errors["email"]} req><input id="f-email" name="email" type="email" dir="ltr" autoComplete="email" className={input} aria-invalid={!!errors["email"]} /></Field>
          <Field id="phone" label={F.phone[l]} err={errors["phone"]} req><input id="f-phone" name="phone" type="tel" dir="ltr" inputMode="tel" autoComplete="tel" placeholder="+" className={input} aria-invalid={!!errors["phone"]} /></Field>
          <Field id="residence" label={F.residence[l]} err={errors["residence"]} req><input id="f-residence" name="residence" autoComplete="country-name" className={input} aria-invalid={!!errors["residence"]} /></Field>
          <Field id="lang" label={F.lang[l]} req><select id="f-lang" name="lang" defaultValue={l} className={input}>{LOCALES.map((x) => <option key={x} value={x}>{LOCALE_LABELS[x]}</option>)}</select></Field>
          <Field id="month" label={F.month[l]} err={errors["month"]} req><select id="f-month" name="month" defaultValue="" className={input} aria-invalid={!!errors["month"]}><option value="" disabled>—</option>{months.map((m) => <option key={m.v} value={m.v}>{m.label}</option>)}</select></Field>
          <Field id="adults" label={F.adults[l]} err={errors["adults"]} req><input id="f-adults" name="adults" type="number" min={1} defaultValue={2} dir="ltr" className={input} aria-invalid={!!errors["adults"]} /></Field>
          <Field id="children" label={F.children[l]} err={errors["children"]} req><input id="f-children" name="children" type="number" min={0} defaultValue={0} dir="ltr" className={input} /></Field>
          <Field id="tour" label={F.tour[l]} req full><select id="f-tour" name="tour" defaultValue={tour && tours.some((x) => x.slug === tour) ? tour : "custom"} className={input}><option value="custom">{F.custom[l]}</option>{tours.map((x) => <option key={x.slug} value={x.slug}>{x.title[l]}</option>)}</select></Field>

          <details className="sm:col-span-2 border-y border-border py-4">
            <summary className="min-h-11 cursor-pointer font-display text-xl text-primary">{F.optional[l]}</summary>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field id="nationality" label={F.nationality[l]}><input id="f-nationality" name="nationality" className={input} /></Field>
              <Field id="budget" label={F.budget[l]} hint={F.budgetHint[l]}><input id="f-budget" name="budget" inputMode="numeric" dir="ltr" className={input} /></Field>
              <Field id="duration" label={F.duration[l]}><input id="f-duration" name="duration" type="number" min={2} dir="ltr" className={input} /></Field>
              <Field id="style" label={F.style[l]}><select id="f-style" name="style" defaultValue="" className={input}><option value="">—</option>{TRAVEL_STYLES.map((s) => <option key={s.id} value={s.id}>{s.title[l]}</option>)}</select></Field>
              <Field id="dietary" label={F.dietary[l]}><input id="f-dietary" name="dietary" className={input} /></Field>
              <Field id="guideLang" label={F.guideLang[l]}><input id="f-guideLang" name="guideLang" className={input} /></Field>
              <label className="flex min-h-11 items-center gap-3 sm:col-span-2"><input type="checkbox" name="flights" className="h-5 w-5 accent-accent" />{F.flights[l]}</label>
              <Field id="notes" label={F.notes[l]} full><textarea id="f-notes" name="notes" rows={4} className={`${input} py-3`} /></Field>
            </div>
          </details>

          <div className="sm:col-span-2">
            <label className="flex gap-3 text-sm leading-relaxed">
              <input id="f-consent" type="checkbox" name="consent" className="mt-1 h-5 w-5 shrink-0 accent-accent" aria-invalid={!!errors["consent"]} aria-describedby={errors["consent"] ? "e-consent" : undefined} />
              <span>{F.consent[l]} <Link to="/$locale/privacy" params={{ locale: l }} className="underline">{t("privacy", l)}</Link>.</span>
            </label>
            {errors["consent"] && <p id="e-consent" className="mt-2 text-sm text-destructive">{errors["consent"]}</p>}
          </div>

          <div className="sm:col-span-2">
            <button type="submit" className={`${btn.primary} w-full sm:w-auto`}>{F.submit[l]}</button>
            <p className="mt-3 text-xs text-muted-foreground">{t("received", l)}</p>
            {checked && <p role="status" className="mt-4 border-s-2 border-accent ps-3 text-sm">{F.checked[l]}</p>}
          </div>
        </form>
      </section>
    </>
  );
}

function Field({ id, label, err, req, hint, full, children }: { id: string; label: string; err?: string | undefined; req?: boolean; hint?: string; full?: boolean; children: ReactNode }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={`f-${id}`} className="mb-2 block text-sm font-semibold">{label}{req && <span className="text-destructive" aria-hidden> *</span>}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {err && <p className="mt-1 text-sm text-destructive" role="alert">{err}</p>}
    </div>
  );
}
