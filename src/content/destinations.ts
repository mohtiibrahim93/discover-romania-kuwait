import type { L } from "@/i18n/config";
import type { MediaKey } from "./media";

export type DestinationId = "transylvania" | "bucharest" | "carpathians" | "maramures" | "bucovina" | "danube-delta";

export type Destination = {
  slug: DestinationId;
  media: MediaKey;
  name: L;
  teaser: L;
  intro: L;
  why: L[];
  experiences: L[];
  seasons: L;
};

export const DESTINATIONS: Destination[] = [
  {
    slug: "transylvania", media: "oldTown",
    name: { en: "Transylvania", ar: "ترانسيلفانيا", ro: "Transilvania" },
    teaser: { en: "Castles, Saxon towns and forested hills", ar: "قلاع وبلدات سكسونية وتلال مكسوة بالغابات", ro: "Castele, orașe săsești și dealuri împădurite" },
    intro: {
      en: "Encircled by the Carpathian arc, Transylvania is Romania's historic heartland: medieval town centres such as Brașov, Sibiu and Sighișoara, fortified churches, and castles set against wooded slopes.",
      ar: "تحيط بها قوس جبال الكاربات، وتُعد ترانسيلفانيا القلب التاريخي لرومانيا: مراكز مدن من العصور الوسطى مثل براشوف وسيبيو وسيغيشوارا، وكنائس محصّنة، وقلاع على سفوح الغابات.",
      ro: "Înconjurată de arcul Carpaților, Transilvania este inima istorică a României: centre medievale precum Brașov, Sibiu și Sighișoara, biserici fortificate și castele pe fundalul pantelor împădurite." },
    why: [
      { en: "Walkable old towns with squares and cafés", ar: "بلدات قديمة يسهل التجول فيها بساحاتها ومقاهيها", ro: "Orașe vechi ușor de parcurs pe jos, cu piețe și cafenele" },
      { en: "Castle visits that can be combined in one region", ar: "زيارات للقلاع يمكن جمعها في منطقة واحدة", ro: "Vizite la castele ce pot fi combinate într-o singură regiune" },
      { en: "Mountain scenery within short distances", ar: "مناظر جبلية على مسافات قصيرة", ro: "Peisaje montane la distanțe scurte" },
    ],
    experiences: [
      { en: "Heritage walks", ar: "جولات تراثية", ro: "Plimbări prin patrimoniu" },
      { en: "Family-paced castle days", ar: "أيام لزيارة القلاع بإيقاع عائلي", ro: "Zile la castele, în ritm de familie" },
      { en: "Local cultural experiences on request", ar: "تجارب ثقافية محلية عند الطلب", ro: "Experiențe culturale locale, la cerere" },
    ],
    seasons: { en: "Late spring to early autumn is generally the most comfortable; winters are cold and atmospheric. Opening hours of castles and museums vary and are checked at quotation.", ar: "تكون الفترة من أواخر الربيع حتى أوائل الخريف الأكثر راحة عادةً، والشتاء بارد وذو طابع خاص. تختلف مواعيد فتح القلاع والمتاحف ويتم التحقق منها عند إعداد العرض.", ro: "De la sfârșitul primăverii până la începutul toamnei este, de regulă, perioada cea mai confortabilă; iernile sunt reci și pline de atmosferă. Programul castelelor și muzeelor variază și se verifică la ofertare." },
  },
  {
    slug: "bucharest", media: "oldTown",
    name: { en: "Bucharest", ar: "بوخارست", ro: "București" },
    teaser: { en: "Boulevards, parks and a lively capital", ar: "شوارع واسعة وحدائق وعاصمة نابضة", ro: "Bulevarde, parcuri și o capitală vie" },
    intro: {
      en: "Romania's capital mixes Belle Époque façades, grand boulevards, large parks and a lively café culture. It is the usual international arrival point and a natural first or last stop.",
      ar: "تمزج عاصمة رومانيا بين واجهات الحقبة الجميلة والشوارع الكبرى والحدائق الواسعة وثقافة المقاهي النابضة. وهي نقطة الوصول الدولية المعتادة، والمحطة الأولى أو الأخيرة بطبيعة الحال.",
      ro: "Capitala României îmbină fațade Belle Époque, bulevarde largi, parcuri mari și o cultură vie a cafenelelor. Este punctul obișnuit de sosire internațională și o primă sau ultimă oprire firească." },
    why: [
      { en: "Easy start after an international flight", ar: "بداية سهلة بعد رحلة جوية دولية", ro: "Început ușor după un zbor internațional" },
      { en: "Architecture, museums and green spaces", ar: "عمارة ومتاحف ومساحات خضراء", ro: "Arhitectură, muzee și spații verzi" },
      { en: "A base for selected day excursions", ar: "قاعدة لرحلات يومية مختارة", ro: "Bază pentru excursii de o zi selectate" },
    ],
    experiences: [
      { en: "Curated architecture and history walks", ar: "جولات منتقاة في العمارة والتاريخ", ro: "Plimbări dedicate arhitecturii și istoriei" },
      { en: "Wellness or spa day on request", ar: "يوم استرخاء أو سبا عند الطلب", ro: "Zi de wellness sau spa, la cerere" },
      { en: "Family time in the city's parks", ar: "وقت عائلي في حدائق المدينة", ro: "Timp în familie în parcurile orașului" },
    ],
    seasons: { en: "Summers can be hot; spring and autumn are pleasant for walking. City traffic affects excursion timing.", ar: "قد يكون الصيف حارًا، بينما يُعد الربيع والخريف مناسبين للتجول سيرًا. تؤثر حركة المرور على توقيت الرحلات اليومية.", ro: "Verile pot fi calde; primăvara și toamna sunt plăcute pentru plimbări. Traficul influențează durata excursiilor." },
  },
  {
    slug: "carpathians", media: "mountains",
    name: { en: "Carpathian Mountains", ar: "جبال الكاربات", ro: "Munții Carpați" },
    teaser: { en: "Alpine air, forests and scenic roads", ar: "هواء جبلي وغابات وطرق خلابة", ro: "Aer alpin, păduri și drumuri panoramice" },
    intro: {
      en: "The Carpathians curve through the centre of Romania, from the Prahova Valley resorts around Sinaia to high passes. Summer brings cool air; winter brings snow and mountain resorts.",
      ar: "تنحني جبال الكاربات عبر وسط رومانيا، من منتجعات وادي براهوفا حول سينايا إلى الممرات المرتفعة. يحمل الصيف هواءً منعشًا، ويأتي الشتاء بالثلوج والمنتجعات الجبلية.",
      ro: "Carpații traversează centrul României, de la stațiunile din Valea Prahovei din jurul Sinaiei până la pasurile înalte. Vara aduce aer răcoros; iarna aduce zăpadă și stațiuni montane." },
    why: [
      { en: "A welcome contrast to Gulf summer heat", ar: "تباين مرحّب به مع حرارة صيف الخليج", ro: "Un contrast binevenit cu căldura verii din Golf" },
      { en: "Gentle walks and viewpoints for all ages", ar: "نزهات خفيفة ونقاط مشاهدة لجميع الأعمار", ro: "Plimbări ușoare și belvedere pentru toate vârstele" },
      { en: "Scenic drives — some seasonal", ar: "طرق خلابة — بعضها موسمي", ro: "Drumuri panoramice — unele sezoniere" },
    ],
    experiences: [
      { en: "Nature days adapted to weather", ar: "أيام في الطبيعة تتكيف مع الطقس", ro: "Zile în natură adaptate vremii" },
      { en: "Cable-car viewpoints where operating", ar: "نقاط مشاهدة بالتلفريك حيث يعمل", ro: "Belvedere cu telecabina, acolo unde funcționează" },
      { en: "Winter snow experiences", ar: "تجارب الثلوج الشتوية", ro: "Experiențe de iarnă pe zăpadă" },
    ],
    seasons: { en: "The Transfăgărășan high road is typically open only part of the year and can close for weather; it is never guaranteed in an itinerary. Mountain weather changes quickly.", ar: "يُفتح طريق ترانسفاغاراشان المرتفع عادةً خلال جزء من السنة فقط، وقد يُغلق بسبب الطقس، ولا يُضمن إدراجه في أي برنامج. يتغير الطقس في الجبال بسرعة.", ro: "Transfăgărășanul este, de regulă, deschis doar o parte din an și se poate închide din cauza vremii; nu este niciodată garantat într-un itinerariu. Vremea la munte se schimbă rapid." },
  },
  {
    slug: "maramures", media: "countryside",
    name: { en: "Maramureș", ar: "ماراموريش", ro: "Maramureș" },
    teaser: { en: "Wooden villages and living traditions", ar: "قرى خشبية وتقاليد حيّة", ro: "Sate din lemn și tradiții vii" },
    intro: {
      en: "In Romania's far north, Maramureș is known for carved wooden gates, tall wooden churches, rolling hay meadows and a rural rhythm that feels unhurried.",
      ar: "في أقصى شمال رومانيا، تشتهر ماراموريش بالبوابات الخشبية المنحوتة والكنائس الخشبية الشاهقة ومروج القش المتموجة وإيقاع ريفي هادئ.",
      ro: "În nordul îndepărtat al României, Maramureșul este cunoscut pentru porțile sculptate, bisericile înalte din lemn, fânețele ondulate și un ritm rural fără grabă." },
    why: [
      { en: "Craftsmanship and rural landscapes", ar: "حِرف تقليدية ومناظر ريفية", ro: "Meșteșuguri și peisaje rurale" },
      { en: "Quiet guesthouse-style stays", ar: "إقامة هادئة على طراز بيوت الضيافة", ro: "Cazări liniștite, în stil pensiune" },
      { en: "A slower, authentic travel mood", ar: "أجواء سفر أبطأ وأكثر أصالة", ro: "O atmosferă de călătorie mai lentă, autentică" },
    ],
    experiences: [
      { en: "Village walks", ar: "نزهات في القرى", ro: "Plimbări prin sate" },
      { en: "Craft demonstrations on request", ar: "عروض للحِرف عند الطلب", ro: "Demonstrații meșteșugărești, la cerere" },
      { en: "Countryside photography", ar: "تصوير الريف", ro: "Fotografie în peisaj rural" },
    ],
    seasons: { en: "Late spring to autumn suits most travellers. Distances are long and roads rural, so allow extra travel time.", ar: "تناسب الفترة من أواخر الربيع حتى الخريف معظم المسافرين. المسافات طويلة والطرق ريفية، لذا يلزم وقت إضافي للتنقل.", ro: "Sfârșitul primăverii până toamna se potrivește majorității călătorilor. Distanțele sunt mari și drumurile rurale, deci e nevoie de timp suplimentar." },
  },
  {
    slug: "bucovina", media: "countryside",
    name: { en: "Bucovina", ar: "بوكوفينا", ro: "Bucovina" },
    teaser: { en: "Painted heritage and green valleys", ar: "تراث ملوّن ووديان خضراء", ro: "Patrimoniu pictat și văi verzi" },
    intro: {
      en: "Bucovina, in the north-east, is renowned for its painted monasteries, green valleys and traditional crafts such as decorated eggs and pottery.",
      ar: "تشتهر بوكوفينا في الشمال الشرقي بأديرتها المزخرفة بالرسوم ووديانها الخضراء وحِرفها التقليدية مثل البيض المزخرف والفخار.",
      ro: "Bucovina, în nord-est, este renumită pentru mănăstirile pictate, văile verzi și meșteșugurile tradiționale precum ouăle încondeiate și ceramica." },
    why: [
      { en: "Distinctive cultural heritage", ar: "تراث ثقافي مميز", ro: "Patrimoniu cultural distinctiv" },
      { en: "Pastoral scenery", ar: "مناظر ريفية رعوية", ro: "Peisaje pastorale" },
      { en: "Pairs naturally with Maramureș", ar: "تُدمج بشكل طبيعي مع ماراموريش", ro: "Se combină firesc cu Maramureșul" },
    ],
    experiences: [
      { en: "Heritage visits subject to access rules", ar: "زيارات تراثية وفق قواعد الدخول", ro: "Vizite de patrimoniu, conform regulilor de acces" },
      { en: "Craft workshops on request", ar: "ورش حِرفية عند الطلب", ro: "Ateliere meșteșugărești, la cerere" },
      { en: "Scenic drives", ar: "رحلات بالسيارة عبر مناظر خلابة", ro: "Drumuri pitorești" },
    ],
    seasons: { en: "Best from late spring to early autumn. Specific sites, opening times and visitor rules are confirmed at quotation.", ar: "الأفضل من أواخر الربيع حتى أوائل الخريف. تُؤكَّد المواقع ومواعيد الفتح وقواعد الزيارة عند إعداد العرض.", ro: "Ideal de la sfârșitul primăverii până la începutul toamnei. Obiectivele, programul și regulile de vizitare se confirmă la ofertare." },
  },
  {
    slug: "danube-delta", media: "delta",
    name: { en: "Danube Delta", ar: "دلتا الدانوب", ro: "Delta Dunării" },
    teaser: { en: "Waterways, reeds and birdlife", ar: "ممرات مائية وقصب وطيور", ro: "Canale, stuf și păsări" },
    intro: {
      en: "Where the Danube meets the Black Sea, the Delta is a vast network of channels, lakes and reed beds, protected for its wildlife and loved for its stillness.",
      ar: "حيث يلتقي الدانوب بالبحر الأسود، تمتد الدلتا كشبكة واسعة من القنوات والبحيرات وأحواض القصب، محمية لحياتها البرية ومحبوبة لسكينتها.",
      ro: "Acolo unde Dunărea întâlnește Marea Neagră, Delta este o rețea vastă de canale, lacuri și stufărișuri, protejată pentru fauna sa și iubită pentru liniștea ei." },
    why: [
      { en: "Rare wetland landscapes", ar: "مناظر أراضٍ رطبة نادرة", ro: "Peisaje rare de zone umede" },
      { en: "Birdwatching in suitable seasons", ar: "مراقبة الطيور في المواسم المناسبة", ro: "Observarea păsărilor în sezoanele potrivite" },
      { en: "A peaceful nature extension", ar: "امتداد هادئ في الطبيعة", ro: "O prelungire liniștită în natură" },
    ],
    experiences: [
      { en: "Boat outings where operating", ar: "نزهات بالقارب حيث تتوفر", ro: "Ieșiri cu barca, acolo unde funcționează" },
      { en: "Nature observation", ar: "مراقبة الطبيعة", ro: "Observarea naturii" },
      { en: "Slow days by the water", ar: "أيام هادئة بجانب الماء", ro: "Zile lente lângă apă" },
    ],
    seasons: { en: "Not every activity runs in every season. Boat services, birdlife and access depend on the time of year and conditions; mosquitoes are common in summer.", ar: "لا تتوفر جميع الأنشطة في كل المواسم. تعتمد خدمات القوارب والطيور وإمكانية الوصول على وقت السنة والظروف، والبعوض شائع في الصيف.", ro: "Nu toate activitățile sunt disponibile în orice sezon. Serviciile de bărci, păsările și accesul depind de perioada anului și de condiții; vara țânțarii sunt frecvenți." },
  },
];

export const getDestination = (slug: string) => DESTINATIONS.find((d) => d.slug === slug);
