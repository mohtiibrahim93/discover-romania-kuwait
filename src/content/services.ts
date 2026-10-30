import type { L } from "@/i18n/config";

/**
 * Service groups offered with our Romanian partner. Durations and programmes are
 * confirmed per trip in the written quote; nothing here is a fixed package or price.
 */
export type Service = { id: string; tag: L; title: L; short: L; body: L; examples: L[] };

export const SERVICES: Service[] = [
  {
    id: "circuits",
    tag: { en: "4–12 days", ar: "من 4 إلى 12 يومًا", ro: "4–12 zile" },
    title: { en: "Transylvania & Romania circuits", ar: "جولات ترانسيلفانيا ورومانيا", ro: "Circuite în Transilvania și România" },
    short: {
      en: "Castles and old towns, painted monasteries, wooden churches and UNESCO sites",
      ar: "قلاع وبلدات قديمة، الأديرة المرسومة، الكنائس الخشبية ومواقع اليونسكو",
      ro: "Castele și orașe vechi, mănăstiri pictate, biserici de lemn și situri UNESCO",
    },
    body: {
      en: "Private circuits through Transylvania, Bucovina and Maramureș, paced for families and adapted to your dates.",
      ar: "جولات خاصة في ترانسيلفانيا وبوكوفينا وماراموريش، بإيقاع يناسب العائلات ومواعيدك.",
      ro: "Circuite private prin Transilvania, Bucovina și Maramureș, în ritmul familiei și adaptate datelor tale.",
    },
    examples: [
      { en: "Castles of the Prahova Valley and the Bran area", ar: "قلاع وادي براهوفا ومنطقة بران", ro: "Castelele de pe Valea Prahovei și zona Bran" },
      { en: "Medieval Brașov, Sibiu and Sighișoara", ar: "براشوف وسيبيو وسيغيشوارا القديمة", ro: "Brașov, Sibiu și Sighișoara medievale" },
      { en: "Painted monasteries of Bucovina and wooden churches of Maramureș", ar: "الأديرة المرسومة في بوكوفينا والكنائس الخشبية في ماراموريش", ro: "Mănăstirile pictate din Bucovina și bisericile de lemn din Maramureș" },
    ],
  },
  {
    id: "short-breaks",
    tag: { en: "2–4 days", ar: "من 2 إلى 4 أيام", ro: "2–4 zile" },
    title: { en: "Short breaks", ar: "عطلات قصيرة", ro: "Vacanțe scurte" },
    short: {
      en: "Bucharest and its shopping, day trips and short Transylvania tours",
      ar: "بوخارست والتسوق فيها، رحلات اليوم الواحد وجولات قصيرة في ترانسيلفانيا",
      ro: "București și cumpărături, excursii de o zi și circuite scurte în Transilvania",
    },
    body: {
      en: "A first taste of Romania in a few days: the capital, nearby day trips or a short castle route.",
      ar: "تجربة أولى لرومانيا في أيام قليلة: العاصمة، رحلات قريبة لليوم الواحد أو جولة قصيرة بين القلاع.",
      ro: "O primă întâlnire cu România în câteva zile: capitala, excursii de o zi sau un traseu scurt al castelelor.",
    },
    examples: [
      { en: "Bucharest city tour and shopping", ar: "جولة في بوخارست والتسوق", ro: "Tur al Bucureștiului și cumpărături" },
      { en: "Day trips around Bucharest", ar: "رحلات اليوم الواحد حول بوخارست", ro: "Excursii de o zi în jurul Bucureștiului" },
      { en: "Two- to four-day Transylvania mini tours", ar: "جولات قصيرة في ترانسيلفانيا من يومين إلى أربعة أيام", ro: "Mini-circuite de 2–4 zile în Transilvania" },
    ],
  },
  {
    id: "spa-stays",
    tag: { en: "Relax", ar: "استرخاء", ro: "Relaxare" },
    title: { en: "Spa & stays", ar: "منتجعات صحية وإقامات", ro: "Spa și sejururi" },
    short: {
      en: "Thalasso and spa at Eforie Nord on the Black Sea; mountain, sea and Delta stays",
      ar: "علاجات المياه والسبا في إيفوريه نورد على البحر الأسود، وإقامات في الجبال أو البحر أو الدلتا",
      ro: "Talaso și spa la Eforie Nord, pe litoralul Mării Negre; sejururi la munte, la mare și în Deltă",
    },
    body: {
      en: "Slow days for the whole family: spa treatments by the Black Sea, or a calm base in the mountains, by the sea or in the Danube Delta.",
      ar: "أيام هادئة لكل العائلة: علاجات سبا على البحر الأسود، أو إقامة مريحة في الجبال أو على البحر أو في دلتا الدانوب.",
      ro: "Zile liniștite pentru toată familia: tratamente spa la Marea Neagră sau o bază calmă la munte, la mare ori în Delta Dunării.",
    },
    examples: [
      { en: "Thalasso and spa packages at Eforie Nord", ar: "باقات العلاج بالمياه والسبا في إيفوريه نورد", ro: "Pachete talaso și spa la Eforie Nord" },
      { en: "Mountain and seaside stays", ar: "إقامات في الجبال وعلى البحر", ro: "Sejururi la munte și la mare" },
      { en: "Relaxing stays in the Danube Delta", ar: "إقامات هادئة في دلتا الدانوب", ro: "Sejururi relaxante în Delta Dunării" },
    ],
  },
  {
    id: "active-nature",
    tag: { en: "Adventure", ar: "مغامرة", ro: "Aventură" },
    title: { en: "Active & nature", ar: "نشاطات وطبيعة", ro: "Activ și natură" },
    short: {
      en: "Horse riding, quad bikes, trekking, bear watching and Danube Delta boat trips",
      ar: "ركوب الخيل، الدراجات الرباعية، المشي في الجبال، مشاهدة الدببة ورحلات القوارب في دلتا الدانوب",
      ro: "Călărie, ATV, drumeții, observarea urșilor și plimbări cu barca în Delta Dunării",
    },
    body: {
      en: "Outdoor days in the Carpathians and the Delta, chosen to suit the ages and energy of your group.",
      ar: "أيام في الطبيعة بين جبال الكاربات والدلتا، تُختار لتناسب أعمار مجموعتك وطاقتها.",
      ro: "Zile în aer liber în Carpați și în Deltă, alese după vârsta și energia grupului tău.",
    },
    examples: [
      { en: "Horse riding and horse-drawn carts", ar: "ركوب الخيل وعربات الخيل", ro: "Călărie și plimbări cu căruța" },
      { en: "Quad-bike outings in the Carpathians", ar: "جولات بالدراجات الرباعية في الكاربات", ro: "Ture cu ATV-ul în Carpați" },
      { en: "Brown bear watching from a hide", ar: "مشاهدة الدببة البنية من مخبأ مراقبة", ro: "Observarea urșilor bruni din observator" },
      { en: "Boat trips in the Danube Delta", ar: "رحلات القوارب في دلتا الدانوب", ro: "Plimbări cu barca în Delta Dunării" },
    ],
  },
  {
    id: "winter",
    tag: { en: "Winter", ar: "شتاء", ro: "Iarna" },
    title: { en: "Snow & skiing", ar: "الثلج والتزلج", ro: "Zăpadă și schi" },
    short: {
      en: "Ski holidays in Poiana Brașov, Romania's best-known ski resort",
      ar: "عطلات تزلج في بويانا براشوف، أشهر منتجعات التزلج في رومانيا",
      ro: "Vacanțe la schi în Poiana Brașov, cea mai cunoscută stațiune de schi din România",
    },
    body: {
      en: "Snow days for beginners and skiers alike, with Brașov's old town a short drive away.",
      ar: "أيام في الثلج للمبتدئين والمتزلجين، وبلدة براشوف القديمة على مسافة قصيرة.",
      ro: "Zile pe zăpadă pentru începători și schiori deopotrivă, la câțiva pași de centrul vechi al Brașovului.",
    },
    examples: [
      { en: "Ski holidays in Poiana Brașov", ar: "عطلات التزلج في بويانا براشوف", ro: "Vacanțe la schi în Poiana Brașov" },
      { en: "Snow days for children and first-time skiers", ar: "أيام في الثلج للأطفال والمبتدئين", ro: "Zile pe zăpadă pentru copii și începători" },
    ],
  },
  {
    id: "heritage",
    tag: { en: "Heritage", ar: "تراث وحِرف", ro: "Tradiții" },
    title: { en: "Crafts & traditional vineyards", ar: "الحِرف والكروم التقليدية", ro: "Meșteșuguri și podgorii tradiționale" },
    short: {
      en: "Painted eggs and pottery, and how traditional winemaking works",
      ar: "البيض المزخرف والفخار، وزيارة كروم العنب للتعرّف على طرق الصناعة التقليدية — زيارة فقط",
      ro: "Ouă încondeiate și olărit, și cum se face vinul în mod tradițional",
    },
    body: {
      en: "Hands-on crafts with local artisans, and vineyard visits focused on the traditional process — from the vines to the old presses and cellars.",
      ar: "حِرف يدوية مع حرفيين محليين، وزيارات لكروم العنب تركّز على الطرق التقليدية من الكروم إلى المعاصر القديمة — زيارة تعريفية فقط.",
      ro: "Meșteșuguri alături de artizani locali și vizite în podgorii axate pe procesul tradițional — de la viță la teascurile și pivnițele vechi.",
    },
    examples: [
      { en: "Painted eggs, pottery and wood carving", ar: "البيض المزخرف والفخار والنحت على الخشب", ro: "Ouă încondeiate, olărit și sculptură în lemn" },
      { en: "Vineyard visits: the traditional process", ar: "زيارة كروم العنب: الطرق التقليدية", ro: "Vizite în podgorii: procesul tradițional" },
    ],
  },
];

export const SERVICE_EXTRAS: L = {
  en: "Also: private car with driver or car hire · help with flights · two-country trips with Bulgaria, Hungary or Moldova",
  ar: "وأيضًا: سيارة خاصة مع سائق أو استئجار سيارة · المساعدة في حجز الطيران · رحلات تجمع بلدين: رومانيا مع بلغاريا أو المجر أو مولدوفا",
  ro: "Și: mașină privată cu șofer sau închiriere auto · ajutor cu zborurile · călătorii în două țări, cu Bulgaria, Ungaria sau Moldova",
};
