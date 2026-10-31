import type { L, Locale } from "@/i18n/config";

/**
 * Full catalogue of trips and experiences we can arrange through our Romanian partners.
 * Names are our own; partners, their links and their prices are deliberately not stored here
 * (white label: the client deals only with us). Every offer is quoted personally.
 */
export type OfferCategory = "day" | "mini" | "transylvania" | "romania" | "two" | "active" | "delta" | "spa" | "night";

export const OFFER_CATEGORIES: { id: OfferCategory; label: L }[] = [
  { id: "day", label: { en: "Day trips & Bucharest", ar: "رحلات اليوم الواحد وبوخارست", ro: "Excursii de o zi și București" } },
  { id: "mini", label: { en: "Mini-tours", ar: "جولات قصيرة", ro: "Mini-circuite" } },
  { id: "transylvania", label: { en: "Transylvania circuits", ar: "جولات ترانسيلفانيا", ro: "Circuite în Transilvania" } },
  { id: "romania", label: { en: "Romania circuits", ar: "جولات رومانيا", ro: "Circuite în România" } },
  { id: "two", label: { en: "Two-country trips", ar: "رحلات تجمع بلدين", ro: "Călătorii în două țări" } },
  { id: "active", label: { en: "Nature, active & themed", ar: "طبيعة ونشاطات ورحلات خاصة", ro: "Natură, activ și tematic" } },
  { id: "delta", label: { en: "Danube Delta", ar: "دلتا الدانوب", ro: "Delta Dunării" } },
  { id: "spa", label: { en: "Spa, sea & snow", ar: "سبا وبحر وثلج", ro: "Spa, mare și zăpadă" } },
  { id: "night", label: { en: "Nightlife & beach", ar: "الحياة الليلية والشاطئ", ro: "Distracție și plajă" } },
];

export type Offer = { id: string; cat: OfferCategory; title: L; places?: L; days?: number; nights?: number; half?: boolean };

const RO: L = { en: "Romania", ar: "رومانيا", ro: "România" };
const TRANS: L = { en: "Transylvania", ar: "ترانسيلفانيا", ro: "Transilvania" };
const BUC: L = { en: "Bucharest", ar: "بوخارست", ro: "București" };
const SEA: L = { en: "Black Sea", ar: "البحر الأسود", ro: "Marea Neagră" };
const AROUND_BUC: L = { en: "Around Bucharest", ar: "حول بوخارست", ro: "Împrejurimile Bucureștiului" };

export const OFFERS: Offer[] = [
  // Day trips & Bucharest
  { id: "bucharest-city", cat: "day", half: true, places: BUC, title: { en: "Bucharest city tour", ar: "جولة في مدينة بوخارست", ro: "Tur al Bucureștiului" } },
  { id: "bucharest-bike", cat: "day", half: true, places: BUC, title: { en: "Bucharest by bike", ar: "بوخارست على الدراجة", ro: "București pe bicicletă" } },
  { id: "prahova-castles", cat: "day", days: 1, places: { en: "Sinaia · Peleș", ar: "سينايا · بيليش", ro: "Sinaia · Peleș" }, title: { en: "Castles of the Prahova Valley", ar: "قلاع وادي براهوفا", ro: "Castelele de pe Valea Prahovei" } },
  { id: "wallachia-monasteries", cat: "day", days: 1, places: AROUND_BUC, title: { en: "Monasteries of Wallachia", ar: "أديرة إقليم والاشيا", ro: "Mănăstirile din Țara Românească" } },
  { id: "vineyard-day", cat: "day", days: 1, places: AROUND_BUC, title: { en: "Vineyard day: winemaking heritage", ar: "يوم في كروم العنب: الصناعة التقليدية", ro: "O zi în podgorii: tradiția vinului" } },
  { id: "poienari", cat: "day", days: 1, places: { en: "Argeș Valley", ar: "وادي أرجيش", ro: "Valea Argeșului" }, title: { en: "Poienari Fortress day trip", ar: "رحلة إلى قلعة بويناري", ro: "Excursie la Cetatea Poienari" } },
  { id: "bulgaria-day", cat: "day", days: 1, places: { en: "Bulgaria", ar: "بلغاريا", ro: "Bulgaria" }, title: { en: "Day trip to Bulgaria", ar: "رحلة يوم واحد إلى بلغاريا", ro: "Excursie de o zi în Bulgaria" } },
  { id: "bucharest-weekend", cat: "day", days: 4, nights: 3, places: BUC, title: { en: "Bucharest weekend", ar: "عطلة نهاية أسبوع في بوخارست", ro: "Weekend în București" } },
  // Mini-tours
  { id: "castles-mini", cat: "mini", days: 2, nights: 1, places: { en: "Prahova Valley · Transylvania", ar: "وادي براهوفا · ترانسيلفانيا", ro: "Valea Prahovei · Transilvania" }, title: { en: "Castles mini-tour", ar: "جولة قصيرة بين القلاع", ro: "Mini-circuitul castelelor" } },
  { id: "castles-monasteries", cat: "mini", days: 3, nights: 2, places: { en: "Wallachia · Transylvania", ar: "والاشيا · ترانسيلفانيا", ro: "Țara Românească · Transilvania" }, title: { en: "Castles & monasteries", ar: "قلاع وأديرة", ro: "Castele și mănăstiri" } },
  { id: "transylvania-mini", cat: "mini", days: 4, nights: 3, places: { en: "Sinaia · Bran · Brașov · Sighișoara · Sibiu", ar: "سينايا · بران · براشوف · سيغيشوارا · سيبيو", ro: "Sinaia · Bran · Brașov · Sighișoara · Sibiu" }, title: { en: "Transylvania mini-tour", ar: "جولة قصيرة في ترانسيلفانيا", ro: "Mini-circuit în Transilvania" } },
  { id: "legends-mini", cat: "mini", days: 4, nights: 3, places: TRANS, title: { en: "Legends of Transylvania", ar: "أساطير ترانسيلفانيا", ro: "Legendele Transilvaniei" } },
  { id: "romantic-transylvania", cat: "mini", days: 4, nights: 3, places: TRANS, title: { en: "Romantic Transylvania for couples", ar: "ترانسيلفانيا الرومانسية للأزواج", ro: "Transilvania romantică pentru cupluri" } },
  { id: "group-weekend", cat: "mini", days: 4, nights: 3, places: { en: "Bucharest · Transylvania", ar: "بوخارست · ترانسيلفانيا", ro: "București · Transilvania" }, title: { en: "Group weekend: Bucharest & Transylvania", ar: "عطلة للمجموعات: بوخارست وترانسيلفانيا", ro: "Weekend de grup: București și Transilvania" } },
  // Transylvania circuits
  { id: "medieval-transylvania", cat: "transylvania", days: 6, nights: 5, places: { en: "Saxon towns & citadels", ar: "البلدات السكسونية والقلاع", ro: "Orașe săsești și cetăți" }, title: { en: "Medieval Transylvania", ar: "ترانسيلفانيا في العصور الوسطى", ro: "Transilvania medievală" } },
  { id: "transylvania-style", cat: "transylvania", days: 7, nights: 6, places: { en: "Characterful stays", ar: "إقامات مميزة", ro: "Cazări cu personalitate" }, title: { en: "Transylvania in style", ar: "ترانسيلفانيا بأسلوب راقٍ", ro: "Transilvania cu stil" } },
  { id: "carpathian-castles", cat: "transylvania", days: 7, nights: 6, places: { en: "Carpathian Mountains", ar: "جبال الكاربات", ro: "Munții Carpați" }, title: { en: "Castles of the Carpathians", ar: "قلاع الكاربات", ro: "Castelele Carpaților" } },
  { id: "legends-tour", cat: "transylvania", days: 8, nights: 7, places: { en: "Self-drive or guided", ar: "قيادة ذاتية أو مع مرشد", ro: "Cu mașina proprie sau cu ghid" }, title: { en: "Legends of Transylvania: the full tour", ar: "أساطير ترانسيلفانيا: الجولة الكاملة", ro: "Legendele Transilvaniei: circuitul complet" } },
  { id: "slow-transylvania", cat: "transylvania", days: 8, nights: 7, places: { en: "Villages & countryside", ar: "قرى وريف", ro: "Sate și peisaje rurale" }, title: { en: "Slow Transylvania", ar: "ترانسيلفانيا على مهل", ro: "Transilvania fără grabă" } },
  { id: "family-transylvania", cat: "transylvania", days: 8, nights: 7, places: TRANS, title: { en: "Family journey in Transylvania", ar: "رحلة عائلية في ترانسيلفانيا", ro: "Călătorie în familie în Transilvania" } },
  { id: "bike-transylvania", cat: "transylvania", days: 6, nights: 5, places: TRANS, title: { en: "Transylvania by bike", ar: "ترانسيلفانيا على الدراجة", ro: "Transilvania pe bicicletă" } },
  { id: "horse-holiday", cat: "transylvania", days: 8, nights: 7, places: TRANS, title: { en: "Horseback holiday in Transylvania", ar: "عطلة على ظهور الخيل في ترانسيلفانيا", ro: "Vacanță călare în Transilvania" } },
  { id: "castles-west", cat: "transylvania", places: { en: "Bucharest · Timișoara", ar: "بوخارست · تيميشوارا", ro: "București · Timișoara" }, title: { en: "Castles from Bucharest to Timișoara", ar: "قلاع من بوخارست إلى تيميشوارا", ro: "Castele de la București la Timișoara" } },
  // Romania circuits
  { id: "cultural-romania", cat: "romania", days: 7, nights: 6, places: RO, title: { en: "Cultural Romania", ar: "رومانيا الثقافية", ro: "România culturală" } },
  { id: "romania-style", cat: "romania", days: 7, nights: 6, places: RO, title: { en: "Romania in style", ar: "رومانيا بأسلوب راقٍ", ro: "România cu stil" } },
  { id: "romania-unusual", cat: "romania", days: 8, nights: 7, places: RO, title: { en: "Romania off the beaten track", ar: "رومانيا بعيدًا عن المسارات المعتادة", ro: "România inedită" } },
  { id: "traditional-romania", cat: "romania", days: 10, nights: 9, places: RO, title: { en: "Traditional Romania", ar: "رومانيا التقليدية", ro: "România tradițională" } },
  { id: "unesco-romania", cat: "romania", days: 10, nights: 9, places: { en: "Transylvania · Maramureș · Bucovina", ar: "ترانسيلفانيا · ماراموريش · بوكوفينا", ro: "Transilvania · Maramureș · Bucovina" }, title: { en: "UNESCO sites of Romania", ar: "مواقع اليونسكو في رومانيا", ro: "România UNESCO" } },
  { id: "grand-tour", cat: "romania", days: 12, nights: 11, places: RO, title: { en: "Grand tour of Romania", ar: "الجولة الكبرى في رومانيا", ro: "Marele tur al României" } },
  { id: "active-romania", cat: "romania", days: 8, nights: 7, places: RO, title: { en: "Active Romania", ar: "رومانيا النشطة", ro: "România activă" } },
  { id: "north-romania", cat: "romania", days: 8, nights: 7, places: { en: "Maramureș · Bucovina", ar: "ماراموريش · بوكوفينا", ro: "Maramureș · Bucovina" }, title: { en: "Northern Romania: Maramureș & Bucovina", ar: "شمال رومانيا: ماراموريش وبوكوفينا", ro: "Nordul României: Maramureș și Bucovina" } },
  { id: "bucovina-monasteries", cat: "romania", days: 7, nights: 6, places: { en: "Bucovina", ar: "بوكوفينا", ro: "Bucovina" }, title: { en: "Painted monasteries of Bucovina", ar: "الأديرة المرسومة في بوكوفينا", ro: "Mănăstirile pictate din Bucovina" } },
  { id: "west-romania", cat: "romania", days: 8, nights: 7, places: { en: "Bucharest · Timișoara", ar: "بوخارست · تيميشوارا", ro: "București · Timișoara" }, title: { en: "Western Romania", ar: "غرب رومانيا", ro: "Vestul României" } },
  // Two-country trips
  { id: "romania-hungary", cat: "two", days: 5, nights: 4, title: { en: "Romania & Hungary", ar: "رومانيا والمجر", ro: "România și Ungaria" } },
  { id: "romania-moldova", cat: "two", days: 5, nights: 4, title: { en: "Romania & Moldova", ar: "رومانيا ومولدوفا", ro: "România și Republica Moldova" } },
  { id: "bucharest-sofia", cat: "two", days: 5, nights: 4, title: { en: "Bucharest & Sofia", ar: "بوخارست وصوفيا", ro: "București și Sofia" } },
  { id: "bulgaria-sea-mountains", cat: "two", days: 5, nights: 4, places: { en: "Bulgaria", ar: "بلغاريا", ro: "Bulgaria" }, title: { en: "Bulgaria: sea & mountains", ar: "بلغاريا: البحر والجبال", ro: "Bulgaria: mare și munte" } },
  { id: "magical-bulgaria", cat: "two", days: 8, nights: 7, places: { en: "Sofia · Veliko Tarnovo · Nesebar · Plovdiv", ar: "صوفيا · فيليكو تارنوفو · نيسيبار · بلوفديف", ro: "Sofia · Veliko Tarnovo · Nesebar · Plovdiv" }, title: { en: "Magical Bulgaria", ar: "بلغاريا الساحرة", ro: "Bulgaria magică" } },
  { id: "romania-bulgaria", cat: "two", days: 10, nights: 9, title: { en: "Romania & Bulgaria cultural tour", ar: "جولة ثقافية في رومانيا وبلغاريا", ro: "Circuit cultural România și Bulgaria" } },
  { id: "ukraine-moldova", cat: "two", days: 10, nights: 9, title: { en: "Ukraine & Moldova", ar: "أوكرانيا ومولدوفا", ro: "Ucraina și Republica Moldova" } },
  // Nature, active & themed
  { id: "rural-self-drive", cat: "active", days: 12, nights: 11, places: { en: "Transylvania · Bucovina · Maramureș", ar: "ترانسيلفانيا · بوكوفينا · ماراموريش", ro: "Transilvania · Bucovina · Maramureș" }, title: { en: "Rural Romania self-drive", ar: "رحلة بالسيارة في ريف رومانيا", ro: "Auto-tur prin România rurală" } },
  { id: "nature-transylvania", cat: "active", days: 5, nights: 4, places: TRANS, title: { en: "Nature in Transylvania", ar: "الطبيعة في ترانسيلفانيا", ro: "Natura Transilvaniei" } },
  { id: "wild-carpathians", cat: "active", days: 7, nights: 6, places: { en: "Bears · birds · animal tracks", ar: "الدببة · الطيور · آثار الحيوانات", ro: "Urși · păsări · urme de animale" }, title: { en: "Wildlife of the Carpathians", ar: "الحياة البرية في الكاربات", ro: "Viața sălbatică din Carpați" } },
  { id: "carpathian-trekking", cat: "active", days: 7, nights: 6, places: { en: "Carpathian Mountains", ar: "جبال الكاربات", ro: "Munții Carpați" }, title: { en: "Carpathian trekking", ar: "المشي في جبال الكاربات", ro: "Drumeții în Carpați" } },
  { id: "quad-carpathians", cat: "active", days: 4, nights: 3, places: { en: "Carpathian Mountains", ar: "جبال الكاربات", ro: "Munții Carpați" }, title: { en: "Quad-bike adventure", ar: "مغامرة بالدراجات الرباعية", ro: "Aventură cu ATV-ul" } },
  { id: "horse-adventure", cat: "active", days: 7, nights: 6, places: TRANS, title: { en: "Horse-riding adventure", ar: "مغامرة ركوب الخيل", ro: "Aventură călare" } },
  { id: "village-food", cat: "active", days: 7, nights: 6, places: TRANS, title: { en: "Village food & farms", ar: "مأكولات القرى والمزارع", ro: "Gusturi de la sat" } },
  { id: "vineyards-art", cat: "active", days: 8, places: { en: "Transylvania · Moldavia", ar: "ترانسيلفانيا · مولدافيا", ro: "Transilvania · Moldova" }, title: { en: "Vineyards & art: winemaking heritage", ar: "الكروم والفن: الصناعة التقليدية", ro: "Podgorii și artă: tradiția vinului" } },
  { id: "archaeology", cat: "active", days: 11, places: { en: "Transylvania · Moldavia · Dobrogea", ar: "ترانسيلفانيا · مولدافيا · دوبروجيا", ro: "Transilvania · Moldova · Dobrogea" }, title: { en: "Archaeology trail", ar: "مسار الآثار", ro: "Pe urmele arheologiei" } },
  { id: "easter-traditions", cat: "active", days: 8, nights: 7, places: RO, title: { en: "Easter traditions in Romania", ar: "تقاليد عيد الفصح في رومانيا", ro: "Tradiții de Paște în România" } },
  // Danube Delta
  { id: "delta-deluxe", cat: "delta", days: 4, nights: 3, title: { en: "Danube Delta deluxe", ar: "دلتا الدانوب الفاخرة", ro: "Delta Dunării deluxe" } },
  { id: "delta-exotic", cat: "delta", days: 4, nights: 3, title: { en: "Exotic Delta", ar: "الدلتا الساحرة", ro: "Delta exotică" } },
  { id: "delta-nature", cat: "delta", days: 4, nights: 3, title: { en: "Delta nature break", ar: "عطلة طبيعة في الدلتا", ro: "Natura Deltei" } },
  { id: "delta-wild", cat: "delta", days: 5, nights: 4, places: { en: "By boat, with local guesthouses", ar: "بالقارب مع الإقامة في بيوت ضيافة محلية", ro: "Cu barca, cu cazare în pensiuni locale" }, title: { en: "Wild Delta by boat", ar: "الدلتا البرية بالقارب", ro: "Delta sălbatică cu barca" } },
  // Spa, sea & snow
  { id: "spa-eforie", cat: "spa", places: SEA, title: { en: "Spa & thalasso: Eforie Nord", ar: "سبا وعلاج بالمياه: إيفوريه نورد", ro: "Spa și talaso: Eforie Nord" } },
  { id: "spa-neptun", cat: "spa", places: SEA, title: { en: "Spa stay: Neptun", ar: "إقامة سبا: نبتون", ro: "Sejur spa: Neptun" } },
  { id: "spa-mamaia", cat: "spa", nights: 5, places: SEA, title: { en: "Spa stay: Mamaia", ar: "إقامة سبا: مامايا", ro: "Sejur spa: Mamaia" } },
  { id: "spa-mangalia", cat: "spa", places: SEA, title: { en: "Spa stay: Mangalia", ar: "إقامة سبا: مانغاليا", ro: "Sejur spa: Mangalia" } },
  { id: "spa-geoagiu", cat: "spa", places: TRANS, title: { en: "Spa stay: Geoagiu Băi", ar: "إقامة سبا: جيواجيو باي", ro: "Sejur spa: Geoagiu Băi" } },
  { id: "spa-herculane", cat: "spa", places: { en: "Cerna Valley", ar: "وادي تشيرنا", ro: "Valea Cernei" }, title: { en: "Spa stay: Băile Herculane", ar: "إقامة سبا: بايله هيركولانه", ro: "Sejur spa: Băile Herculane" } },
  { id: "spa-sovata", cat: "spa", places: TRANS, title: { en: "Spa stay: Sovata", ar: "إقامة سبا: سوفاتا", ro: "Sejur spa: Sovata" } },
  { id: "black-sea-holiday", cat: "spa", places: SEA, title: { en: "Black Sea holiday", ar: "عطلة على البحر الأسود", ro: "Vacanță la Marea Neagră" } },
  { id: "ski-poiana", cat: "spa", places: { en: "Romania's best-known ski resort", ar: "أشهر منتجعات التزلج في رومانيا", ro: "Cea mai cunoscută stațiune de schi din România" }, title: { en: "Skiing in Poiana Brașov", ar: "التزلج في بويانا براشوف", ro: "Schi în Poiana Brașov" } },
  { id: "christmas-markets", cat: "spa", days: 5, nights: 4, places: { en: "December", ar: "ديسمبر", ro: "Decembrie" }, title: { en: "Christmas markets in Transylvania", ar: "أسواق عيد الميلاد في ترانسيلفانيا", ro: "Târgurile de Crăciun din Transilvania" } },
  { id: "dental-care", cat: "spa", places: RO, title: { en: "Dental care trips", ar: "رحلات علاج الأسنان", ro: "Călătorii pentru tratamente dentare" } },
  // Nightlife & beach (adults and groups of friends)
  { id: "bucharest-nights", cat: "night", places: { en: "Restaurants, lounges & clubs", ar: "مطاعم وصالات ونوادٍ ليلية", ro: "Restaurante, lounge-uri și cluburi" }, title: { en: "Bucharest Old Town nights", ar: "ليالي البلدة القديمة في بوخارست", ro: "Serile din Centrul Vechi al Bucureștiului" } },
  { id: "beach-clubs", cat: "night", places: { en: "Summer on the Black Sea", ar: "الصيف على البحر الأسود", ro: "Vara pe litoral" }, title: { en: "Beach clubs: Mamaia & Vama Veche", ar: "نوادي الشاطئ: مامايا وفاما فيكي", ro: "Cluburi pe plajă: Mamaia și Vama Veche" } },
  { id: "music-festivals", cat: "night", places: { en: "Such as Untold (Cluj) and Neversea (Constanța)", ar: "مثل أنتولد (كلوج) ونيفرسي (كونستانتا)", ro: "Precum Untold (Cluj) și Neversea (Constanța)" }, title: { en: "Summer music festivals", ar: "مهرجانات الموسيقى الصيفية", ro: "Festivaluri de muzică de vară" } },
  { id: "friends-weekend", cat: "night", days: 4, nights: 3, places: { en: "Bucharest · Black Sea", ar: "بوخارست · البحر الأسود", ro: "București · litoral" }, title: { en: "Friends' weekend: Bucharest & the coast", ar: "عطلة الأصدقاء: بوخارست والساحل", ro: "Weekend cu prietenii: București și litoralul" } },
];

export type OfferLength = "day" | "short" | "long";

/** Day trips (≤ 1 day), short breaks (2–5 days) and longer journeys (6+ days); undated offers fit any. */
export function offerLength(o: Offer): OfferLength | undefined {
  if (o.half || o.days === 1) return "day";
  if (o.days) return o.days <= 5 ? "short" : "long";
  return undefined;
}

const AR_DAYS = (n: number) => (n === 1 ? "يوم واحد" : n === 2 ? "يومان" : n <= 10 ? `${n} أيام` : `${n} يومًا`);
const AR_NIGHTS = (n: number) => (n === 1 ? "ليلة واحدة" : n === 2 ? "ليلتان" : n <= 10 ? `${n} ليالٍ` : `${n} ليلة`);

/** "8 days / 7 nights", "Half day", "5 nights" — localized; undefined when the length is set per quote. */
export function offerDuration(o: Offer, l: Locale): string | undefined {
  if (o.half) return { en: "Half day", ar: "نصف يوم", ro: "Jumătate de zi" }[l];
  const d = o.days && { en: o.days === 1 ? "1 day" : `${o.days} days`, ar: AR_DAYS(o.days), ro: o.days === 1 ? "1 zi" : `${o.days} zile` }[l];
  const n = o.nights && { en: o.nights === 1 ? "1 night" : `${o.nights} nights`, ar: AR_NIGHTS(o.nights), ro: o.nights === 1 ? "1 noapte" : `${o.nights} nopți` }[l];
  return [d, n].filter(Boolean).join(" / ") || undefined;
}
