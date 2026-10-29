import type { L } from "@/i18n/config";
import type { DestinationId } from "./destinations";
import type { MediaKey } from "./media";
import type { StyleId } from "./styles";

export type Season = "spring" | "summer" | "autumn" | "winter";

export type Tour = {
  id: string;
  slug: string;
  status: "draft" | "preview" | "published";
  featured: boolean;
  order: number;
  days: number;
  media: MediaKey;
  gallery: MediaKey[];
  regions: DestinationId[];
  styles: StyleId[];
  familyFriendly: boolean;
  privateOption: boolean;
  seasons: Season[]; // editor-reviewed suitability
  title: L;
  tagline: L;
  places: L;
  overview: L;
  idealFor: L;
  highlights: L[];
  itinerary: L[];
  customize: L;
  accommodation: L;
  notes: L;
  /** Only rendered when explicitly approved in CMS. */
  inclusions: null | { included: L[]; excluded: L[] };
  related: string[];
};

export const TOURS: Tour[] = [
  {
    id: "t-royal", slug: "royal-transylvania", status: "published", featured: true, order: 1, days: 7,
    media: "oldTown", gallery: ["oldTown", "mountains", "countryside"],
    regions: ["transylvania", "carpathians", "bucharest"], styles: ["heritage", "private", "family", "romantic"],
    familyFriendly: true, privateOption: true, seasons: ["spring", "summer", "autumn", "winter"],
    title: { en: "Royal Transylvania", ar: "ترانسيلفانيا الملكية", ro: "Transilvania regală" },
    tagline: { en: "Castles, old towns and mountain air in one graceful week", ar: "قلاع وبلدات قديمة وهواء الجبال في أسبوع أنيق واحد", ro: "Castele, orașe vechi și aer de munte într-o săptămână elegantă" },
    places: { en: "Sinaia · Brașov · Bran · Sibiu", ar: "سينايا · براشوف · بران · سيبيو", ro: "Sinaia · Brașov · Bran · Sibiu" },
    overview: {
      en: "A week-long concept for travellers who want Romania's classic heart without rushing it. Royal-era architecture in the Prahova Valley, the medieval lanes of Brașov, the Bran area and the elegant squares of Sibiu are linked by mountain scenery, with free time protected throughout.",
      ar: "تصوّر لرحلة مدتها أسبوع لمن يرغب في اكتشاف قلب رومانيا الكلاسيكي دون عجلة. عمارة العهد الملكي في وادي براهوفا، وأزقة براشوف التاريخية، ومنطقة بران، وساحات سيبيو الأنيقة، تربط بينها مناظر الجبال مع وقت حر محفوظ طوال الرحلة.",
      ro: "Un concept de o săptămână pentru cei care vor să descopere inima clasică a României fără grabă. Arhitectura epocii regale din Valea Prahovei, străduțele medievale ale Brașovului, zona Bran și piețele elegante ale Sibiului sunt legate de peisaje montane, cu timp liber păstrat pe tot parcursul." },
    idealFor: { en: "Premium couples, families and private groups", ar: "الأزواج الباحثون عن تجربة مميزة والعائلات والمجموعات الخاصة", ro: "Cupluri exigente, familii și grupuri private" },
    highlights: [
      { en: "Optional Peleș Castle visit in Sinaia, subject to opening and tickets", ar: "زيارة اختيارية لقلعة بيليش في سينايا، حسب مواعيد الفتح وتوفر التذاكر", ro: "Vizită opțională la Castelul Peleș din Sinaia, în funcție de program și bilete" },
      { en: "Brașov's historic centre with unhurried free time", ar: "مركز براشوف التاريخي مع وقت حر دون عجلة", ro: "Centrul istoric al Brașovului, cu timp liber fără grabă" },
      { en: "A comfortably paced Bran area excursion", ar: "رحلة إلى منطقة بران بإيقاع مريح", ro: "Excursie în zona Bran, într-un ritm confortabil" },
      { en: "Sibiu's heritage squares and rooftops", ar: "ساحات سيبيو التراثية وأسطحها المميزة", ro: "Piețele și acoperișurile istorice ale Sibiului" },
      { en: "Mountain scenery along the way", ar: "مناظر جبلية على امتداد الطريق", ro: "Peisaje montane pe parcurs" },
    ],
    itinerary: [
      { en: "Arrival in Bucharest; welcome and an unhurried first evening.", ar: "الوصول إلى بوخارست؛ استقبال وأمسية أولى هادئة.", ro: "Sosire în București; primire și o primă seară liniștită." },
      { en: "Travel towards Sinaia, with an optional Peleș Castle visit subject to opening and tickets; continue to Brașov.", ar: "التوجه نحو سينايا مع زيارة اختيارية لقلعة بيليش حسب مواعيد الفتح والتذاكر، ثم متابعة الطريق إلى براشوف.", ro: "Drum spre Sinaia, cu vizită opțională la Castelul Peleș în funcție de program și bilete; continuare spre Brașov." },
      { en: "Brașov historic centre and free time; optional local cultural experience.", ar: "مركز براشوف التاريخي ووقت حر؛ تجربة ثقافية محلية اختيارية.", ro: "Centrul istoric al Brașovului și timp liber; experiență culturală locală opțională." },
      { en: "Bran area and castle excursion, with comfortable pacing and alternatives.", ar: "رحلة إلى منطقة بران وقلعتها بإيقاع مريح مع بدائل متاحة.", ro: "Excursie în zona Bran și la castel, într-un ritm confortabil și cu alternative." },
      { en: "Scenic journey toward Sibiu, potentially via Sighișoara subject to routing and comfort review.", ar: "رحلة خلابة نحو سيبيو، وقد تمر بسيغيشوارا وفق مراجعة المسار ومستوى الراحة.", ro: "Drum pitoresc spre Sibiu, eventual prin Sighișoara, în funcție de traseu și confort." },
      { en: "Sibiu heritage walk, then return toward Bucharest or an adapted overnight stop.", ar: "جولة تراثية في سيبيو ثم العودة نحو بوخارست أو مبيت في محطة مُكيَّفة.", ro: "Plimbare prin centrul istoric al Sibiului, apoi întoarcere spre București sau o înnoptare adaptată." },
      { en: "Departure; transfer only if included and confirmed in the final quote.", ar: "المغادرة؛ التوصيل فقط إذا كان مشمولًا ومؤكدًا في العرض النهائي.", ro: "Plecare; transferul doar dacă este inclus și confirmat în oferta finală." },
    ],
    customize: { en: "Lengthen to 8–9 days for a slower pace, add a private guide or swap Sibiu for more mountain time.", ar: "يمكن تمديدها إلى 8–9 أيام لإيقاع أهدأ، أو إضافة مرشد خاص، أو استبدال سيبيو بوقت أطول في الجبال.", ro: "Poate fi extins la 8–9 zile pentru un ritm mai lent, cu ghid privat sau mai mult timp la munte în locul Sibiului." },
    accommodation: { en: "Tell us your preferred comfort level — boutique, premium or family-friendly. Specific hotels are proposed only in a confirmed quote.", ar: "أخبرنا بمستوى الراحة المفضل لديك — فندق بوتيك أو فاخر أو مناسب للعائلات. تُقترح الفنادق المحددة فقط في عرض مؤكد.", ro: "Spune-ne nivelul de confort preferat — boutique, premium sau potrivit familiilor. Hotelurile concrete se propun doar într-o ofertă confirmată." },
    notes: { en: "Transfer times and the final route require operator validation; no stop is guaranteed until confirmed.", ar: "تحتاج أوقات التنقل والمسار النهائي إلى تحقق من الجهة المنظمة، ولا تُضمن أي محطة قبل تأكيدها.", ro: "Duratele transferurilor și traseul final necesită validarea operatorului; nicio oprire nu este garantată până la confirmare." },
    inclusions: null, related: ["carpathian-family-escape", "bucharest-and-beyond"],
  },
  {
    id: "t-authentic", slug: "authentic-romania", status: "published", featured: true, order: 2, days: 9,
    media: "countryside", gallery: ["countryside", "oldTown", "mountains"],
    regions: ["transylvania", "maramures", "bucovina", "bucharest"], styles: ["heritage", "groups", "family", "nature"],
    familyFriendly: true, privateOption: true, seasons: ["spring", "summer", "autumn"],
    title: { en: "Authentic Romania", ar: "رومانيا الأصيلة", ro: "România autentică" },
    tagline: { en: "Countryside, craftsmanship and heritage towns", ar: "ريف وحِرف تقليدية وبلدات تراثية", ro: "Sate, meșteșuguri și orașe de patrimoniu" },
    places: { en: "Transylvania · Maramureș · Bucovina", ar: "ترانسيلفانيا · ماراموريش · بوكوفينا", ro: "Transilvania · Maramureș · Bucovina" },
    overview: {
      en: "A loop for culture-loving travellers that moves from Transylvania's towns to the wooden villages of Maramureș and the green valleys of Bucovina. Three large regions in nine days means substantial driving — we will gladly propose a slower 10–11 day version.",
      ar: "مسار دائري لعشاق الثقافة ينتقل من بلدات ترانسيلفانيا إلى القرى الخشبية في ماراموريش والوديان الخضراء في بوكوفينا. ثلاث مناطق كبيرة في تسعة أيام تعني تنقلات طويلة بالسيارة، ويسعدنا اقتراح نسخة أهدأ من 10–11 يومًا.",
      ro: "Un circuit pentru iubitorii de cultură, din orașele Transilvaniei spre satele din lemn ale Maramureșului și văile verzi ale Bucovinei. Trei regiuni mari în nouă zile înseamnă mult drum — îți putem propune cu plăcere o variantă mai lentă, de 10–11 zile." },
    idealFor: { en: "Culture-loving small groups and families", ar: "المجموعات الصغيرة والعائلات المحبة للثقافة", ro: "Grupuri mici și familii pasionate de cultură" },
    highlights: [
      { en: "Rural landscapes of Maramureș", ar: "المناظر الريفية في ماراموريش", ro: "Peisajele rurale ale Maramureșului" },
      { en: "Craft traditions, with demonstrations on request", ar: "تقاليد الحِرف مع عروض عند الطلب", ro: "Tradiții meșteșugărești, cu demonstrații la cerere" },
      { en: "Bucovina's cultural heritage, subject to access", ar: "التراث الثقافي لبوكوفينا وفق إمكانية الدخول", ro: "Patrimoniul cultural al Bucovinei, în funcție de acces" },
      { en: "Transylvanian towns en route", ar: "بلدات ترانسيلفانيا على الطريق", ro: "Orașe transilvănene pe traseu" },
    ],
    itinerary: [
      { en: "Arrival in Bucharest.", ar: "الوصول إلى بوخارست.", ro: "Sosire în București." },
      { en: "Sinaia and Brașov.", ar: "سينايا وبراشوف.", ro: "Sinaia și Brașov." },
      { en: "Transylvanian towns en route to Sibiu.", ar: "بلدات ترانسيلفانيا في الطريق إلى سيبيو.", ro: "Orașe transilvănene în drum spre Sibiu." },
      { en: "Travel into Maramureș — a substantial driving day.", ar: "الانتقال إلى ماراموريش — يوم طويل من القيادة.", ro: "Drum spre Maramureș — o zi cu mult condus." },
      { en: "Village landscapes and traditions.", ar: "مناظر القرى وتقاليدها.", ro: "Peisaje și tradiții de sat." },
      { en: "Travel toward Bucovina.", ar: "الانتقال نحو بوكوفينا.", ro: "Drum spre Bucovina." },
      { en: "Cultural and scenic discovery in Bucovina.", ar: "استكشاف ثقافي وطبيعي في بوكوفينا.", ro: "Descoperire culturală și peisagistică în Bucovina." },
      { en: "Long transfer toward a suitable departure gateway; routing subject to operational review.", ar: "تنقل طويل نحو نقطة مغادرة مناسبة؛ المسار يخضع للمراجعة التشغيلية.", ro: "Transfer lung spre un punct de plecare potrivit; traseul se stabilește după analiza operațională." },
      { en: "Departure.", ar: "المغادرة.", ro: "Plecare." },
    ],
    customize: { en: "We recommend considering 10–11+ days to reduce daily driving. Private vehicle and guide language can be requested.", ar: "ننصح بالنظر في مدة 10–11 يومًا أو أكثر لتقليل ساعات القيادة اليومية. يمكن طلب مركبة خاصة ولغة المرشد المفضلة.", ro: "Recomandăm 10–11+ zile pentru a reduce condusul zilnic. Se pot solicita vehicul privat și limba ghidului." },
    accommodation: { en: "Characterful guesthouses or comfortable hotels — share your preference. Exact properties appear only in a confirmed quote.", ar: "بيوت ضيافة ذات طابع خاص أو فنادق مريحة — شاركنا تفضيلك. تظهر أماكن الإقامة المحددة فقط في عرض مؤكد.", ro: "Pensiuni cu caracter sau hoteluri confortabile — spune-ne preferința ta. Proprietățile exacte apar doar în oferta confirmată." },
    notes: { en: "Meetings with locals, access to private property or specific religious and UNESCO sites are not guaranteed without confirmation.", ar: "لا تُضمن اللقاءات مع السكان المحليين أو دخول الممتلكات الخاصة أو مواقع دينية ومواقع يونسكو محددة دون تأكيد.", ro: "Întâlnirile cu localnici, accesul la proprietăți private sau la anumite obiective religioase și UNESCO nu sunt garantate fără confirmare." },
    inclusions: null, related: ["royal-transylvania"],
  },
  {
    id: "t-family", slug: "carpathian-family-escape", status: "published", featured: true, order: 3, days: 6,
    media: "mountains", gallery: ["mountains", "countryside", "oldTown"],
    regions: ["carpathians", "transylvania", "bucharest"], styles: ["family", "nature", "private"],
    familyFriendly: true, privateOption: true, seasons: ["spring", "summer", "autumn", "winter"],
    title: { en: "Carpathian Family Escape", ar: "رحلة عائلية إلى الكاربات", ro: "Evadare în familie în Carpați" },
    tagline: { en: "Mountain air, gentle days and room to rest", ar: "هواء الجبال وأيام هادئة ومتسع للراحة", ro: "Aer de munte, zile blânde și timp de odihnă" },
    places: { en: "Sinaia · Brașov · nearby mountains", ar: "سينايا · براشوف · الجبال المجاورة", ro: "Sinaia · Brașov · munții din apropiere" },
    overview: {
      en: "A relaxed, flexible concept for families: short transfers, rest time built in, and nature days chosen around your children's ages and the weather. Private options are available on request.",
      ar: "تصوّر مرن وهادئ للعائلات: تنقلات قصيرة، ووقت مخصص للراحة، وأيام في الطبيعة تُختار وفق أعمار أطفالك والطقس. تتوفر خيارات خاصة عند الطلب.",
      ro: "Un concept relaxat și flexibil pentru familii: transferuri scurte, timp de odihnă și zile în natură alese după vârsta copiilor și vreme. Opțiunile private sunt disponibile la cerere." },
    idealFor: { en: "Families with children of different ages", ar: "العائلات مع أطفال من أعمار مختلفة", ro: "Familii cu copii de vârste diferite" },
    highlights: [
      { en: "Scenic stops on the way to Sinaia", ar: "توقفات خلابة في الطريق إلى سينايا", ro: "Opriri pitorești în drum spre Sinaia" },
      { en: "A family nature day matched to ages and weather", ar: "يوم عائلي في الطبيعة يناسب الأعمار والطقس", ro: "O zi în natură potrivită vârstelor și vremii" },
      { en: "Built-in rest and weather contingencies", ar: "وقت للراحة وخطط بديلة للطقس", ro: "Timp de odihnă și variante pentru vreme rea" },
      { en: "Optional upgrades on request", ar: "ترقيات اختيارية عند الطلب", ro: "Upgrade-uri opționale, la cerere" },
    ],
    itinerary: [
      { en: "Arrival in Bucharest.", ar: "الوصول إلى بوخارست.", ro: "Sosire în București." },
      { en: "Transfer to Sinaia with scenic stops.", ar: "الانتقال إلى سينايا مع توقفات خلابة.", ro: "Transfer la Sinaia, cu opriri pitorești." },
      { en: "Gentle local experiences.", ar: "تجارب محلية هادئة.", ro: "Experiențe locale liniștite." },
      { en: "A family-friendly nature day chosen for children's ages and weather.", ar: "يوم في الطبيعة مناسب للعائلة يُختار وفق أعمار الأطفال والطقس.", ro: "O zi în natură potrivită familiei, aleasă după vârsta copiilor și vreme." },
      { en: "Flexible rest, then return toward Bucharest.", ar: "راحة مرنة ثم العودة نحو بوخارست.", ro: "Odihnă flexibilă, apoi întoarcere spre București." },
      { en: "Departure.", ar: "المغادرة.", ro: "Plecare." },
    ],
    customize: { en: "Adjust days, add a city day in Brașov, or request a private driver. Not every activity suits every child — we tailor together.", ar: "عدّل عدد الأيام، أو أضف يومًا في براشوف، أو اطلب سائقًا خاصًا. ليست كل الأنشطة مناسبة لكل طفل، لذا نخطط معًا.", ro: "Ajustează numărul de zile, adaugă o zi la Brașov sau solicită șofer privat. Nu orice activitate se potrivește fiecărui copil — adaptăm împreună." },
    accommodation: { en: "Family rooms or connecting rooms can be requested, subject to availability at quotation.", ar: "يمكن طلب غرف عائلية أو غرف متصلة، حسب التوفر عند إعداد العرض.", ro: "Se pot solicita camere de familie sau comunicante, în funcție de disponibilitate la ofertare." },
    notes: { en: "Activities depend on weather, season and children's ages; suitability is informative, not a safety guarantee.", ar: "تعتمد الأنشطة على الطقس والموسم وأعمار الأطفال، والملاءمة معلومة استرشادية وليست ضمانًا للسلامة.", ro: "Activitățile depind de vreme, sezon și vârsta copiilor; potrivirea este informativă, nu o garanție de siguranță." },
    inclusions: null, related: ["royal-transylvania", "bucharest-and-beyond"],
  },
  {
    id: "t-bucharest", slug: "bucharest-and-beyond", status: "published", featured: false, order: 4, days: 5,
    media: "oldTown", gallery: ["oldTown", "mountains"],
    regions: ["bucharest", "carpathians"], styles: ["romantic", "private", "heritage", "family"],
    familyFriendly: true, privateOption: true, seasons: ["spring", "summer", "autumn", "winter"],
    title: { en: "Bucharest & Beyond", ar: "بوخارست وما بعدها", ro: "București și împrejurimi" },
    tagline: { en: "A short, easy first taste of Romania", ar: "تجربة أولى قصيرة وسهلة لرومانيا", ro: "O primă întâlnire scurtă și ușoară cu România" },
    places: { en: "Bucharest · optional Sinaia excursion", ar: "بوخارست · رحلة اختيارية إلى سينايا", ro: "București · excursie opțională la Sinaia" },
    overview: {
      en: "A demonstration proposal for first visits, couples and short family breaks — the capital's architecture and parks with an optional mountain excursion and a free or wellness day.",
      ar: "مقترح توضيحي للزيارات الأولى والأزواج والعطلات العائلية القصيرة — عمارة العاصمة وحدائقها مع رحلة جبلية اختيارية ويوم حر أو للاسترخاء.",
      ro: "O propunere demonstrativă pentru prime vizite, cupluri și vacanțe scurte în familie — arhitectura și parcurile capitalei, cu o excursie opțională la munte și o zi liberă sau de wellness." },
    idealFor: { en: "First-time visitors, couples, short family breaks", ar: "الزائرون لأول مرة والأزواج والعطلات العائلية القصيرة", ro: "Vizitatori la prima experiență, cupluri, vacanțe scurte în familie" },
    highlights: [
      { en: "Curated architecture and history in Bucharest", ar: "جولة منتقاة في عمارة بوخارست وتاريخها", ro: "Arhitectură și istorie în București" },
      { en: "Optional Sinaia/Peleș excursion, subject to opening", ar: "رحلة اختيارية إلى سينايا/بيليش حسب مواعيد الفتح", ro: "Excursie opțională Sinaia/Peleș, în funcție de program" },
      { en: "Free or wellness day, subject to venue rules", ar: "يوم حر أو للاسترخاء وفق قواعد المكان", ro: "Zi liberă sau de wellness, conform regulilor locației" },
    ],
    itinerary: [
      { en: "Arrival and rest.", ar: "الوصول والراحة.", ro: "Sosire și odihnă." },
      { en: "Curated architecture and history in Bucharest.", ar: "جولة منتقاة في عمارة بوخارست وتاريخها.", ro: "Arhitectură și istorie în București." },
      { en: "Optional Sinaia/Peleș excursion, subject to opening and transport duration.", ar: "رحلة اختيارية إلى سينايا/بيليش حسب مواعيد الفتح ومدة التنقل.", ro: "Excursie opțională Sinaia/Peleș, în funcție de program și durata drumului." },
      { en: "Free time or a requested wellness, spa or cultural day, subject to supplier confirmation.", ar: "وقت حر أو يوم استرخاء أو سبا أو ثقافي عند الطلب، بشرط تأكيد المزود.", ro: "Timp liber sau o zi de wellness, spa ori culturală, la cerere și sub rezerva confirmării furnizorului." },
      { en: "Departure.", ar: "المغادرة.", ro: "Plecare." },
    ],
    customize: { en: "Combine with the Carpathians for a longer stay, or keep it entirely in the city.", ar: "يمكن دمجها مع الكاربات لإقامة أطول، أو إبقاؤها بالكامل داخل المدينة.", ro: "Poate fi combinat cu Carpații pentru un sejur mai lung sau păstrat integral în oraș." },
    accommodation: { en: "Central city hotels at your preferred comfort level; properties proposed only in a confirmed quote.", ar: "فنادق في وسط المدينة بمستوى الراحة الذي تفضله؛ تُقترح أماكن الإقامة فقط في عرض مؤكد.", ro: "Hoteluri centrale la nivelul de confort dorit; proprietățile se propun doar într-o ofertă confirmată." },
    notes: { en: "This is a demonstration proposal, not a contracted product.", ar: "هذا مقترح توضيحي وليس منتجًا متعاقدًا عليه.", ro: "Aceasta este o propunere demonstrativă, nu un produs contractat." },
    inclusions: null, related: ["royal-transylvania", "carpathian-family-escape"],
  },
];

export const publishedTours = () => TOURS.filter((t) => t.status === "published").sort((a, b) => a.order - b.order);
export const getTour = (slug: string) => publishedTours().find((t) => t.slug === slug);
