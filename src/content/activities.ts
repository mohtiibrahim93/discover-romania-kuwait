import type { L } from "@/i18n/config";
import type { MediaKey } from "./media";
import type { DestinationId } from "./destinations";

export type ActivityCategory = "culture" | "adventure" | "nature" | "wellbeing";

export type Activity = {
  id: string;
  category: ActivityCategory;
  media: MediaKey;
  regions: DestinationId[];
  /** Informative only — never a safety guarantee. */
  family: boolean;
  season: L;
  title: L;
  intro: L;
};

export const ACTIVITY_CATEGORIES: Record<ActivityCategory, L> = {
  culture: { en: "Living traditions", ar: "تقاليد حيّة", ro: "Tradiții vii" },
  adventure: { en: "Outdoor adventure", ar: "مغامرات في الهواء الطلق", ro: "Aventură în aer liber" },
  nature: { en: "Nature & wildlife", ar: "الطبيعة والحياة البرية", ro: "Natură și viață sălbatică" },
  wellbeing: { en: "Calm & wellbeing", ar: "هدوء واسترخاء", ro: "Liniște și relaxare" },
};

export const ACTIVITIES: Activity[] = [
  { id: "shepherd", category: "culture", media: "countryside", regions: ["transylvania", "carpathians"], family: true,
    season: { en: "Late spring to early autumn", ar: "من أواخر الربيع حتى أوائل الخريف", ro: "Final de primăvară – început de toamnă" },
    title: { en: "A day as a Carpathian shepherd", ar: "يوم كراعٍ في جبال الكاربات", ro: "O zi de cioban în Carpați" },
    intro: { en: "Walk up to a high mountain sheepfold, help gather the flock and watch fresh cheese being made over an open fire, then share a simple meal with the shepherds.", ar: "اصعد إلى حظيرة أغنام في المراعي الجبلية، وساعد في جمع القطيع، وشاهد صناعة الجبن الطازج على النار، ثم شارك الرعاة وجبة بسيطة.", ro: "Urcă la o stână de munte, ajută la adunarea turmei și privește cum se face brânza proaspătă la foc, apoi împarte o masă simplă cu ciobanii." } },
  { id: "village-family", category: "culture", media: "countryside", regions: ["maramures", "bucovina", "transylvania"], family: true,
    season: { en: "All year", ar: "طوال العام", ro: "Tot anul" },
    title: { en: "A day with a village family", ar: "يوم مع عائلة قروية", ro: "O zi cu o familie de la sat" },
    intro: { en: "Bake bread in a wood-fired oven, visit the garden and animals, and hear how traditions are kept alive — hosted privately in a family home.", ar: "اخبز الخبز في فرن الحطب، وزر الحديقة والحيوانات، واستمع إلى كيف تُحفظ التقاليد — باستضافة خاصة في منزل عائلي.", ro: "Coace pâine în cuptorul cu lemne, vizitează grădina și animalele și află cum se păstrează tradițiile — găzduit privat într-o casă de familie." } },
  { id: "crafts", category: "culture", media: "countryside", regions: ["bucovina", "maramures"], family: true,
    season: { en: "All year", ar: "طوال العام", ro: "Tot anul" },
    title: { en: "Painted eggs, pottery and wood carving", ar: "البيض المزخرف والفخار والنحت على الخشب", ro: "Ouă încondeiate, olărit și sculptură în lemn" },
    intro: { en: "Hands-on workshops with local artisans in Bucovina and Maramureș — children leave with something they made themselves.", ar: "ورش عملية مع حرفيين محليين في بوكوفينا وماراموريش، ويعود الأطفال بشيء صنعوه بأيديهم.", ro: "Ateliere practice cu meșteri locali din Bucovina și Maramureș — copiii pleacă cu ceva făcut de ei." } },
  { id: "horses", category: "adventure", media: "mountains", regions: ["transylvania", "bucovina"], family: true,
    season: { en: "Spring to autumn", ar: "من الربيع إلى الخريف", ro: "Primăvară – toamnă" },
    title: { en: "Horse riding and horse-drawn carts", ar: "ركوب الخيل وعربات الخيل", ro: "Călărie și plimbări cu căruța" },
    intro: { en: "Gentle guided rides through meadows and forest edges, or a traditional cart ride for younger children and grandparents.", ar: "جولات هادئة بمرافقة مرشد عبر المروج وأطراف الغابات، أو جولة بعربة تقليدية للأطفال الصغار والأجداد.", ro: "Plimbări ghidate liniștite prin pajiști și la marginea pădurii, sau o plimbare cu căruța pentru copii mici și bunici." } },
  { id: "rafting", category: "adventure", media: "mountains", regions: ["carpathians", "transylvania"], family: false,
    season: { en: "Late spring and summer, water levels permitting", ar: "أواخر الربيع والصيف، حسب منسوب المياه", ro: "Final de primăvară și vară, în funcție de nivelul apei" },
    title: { en: "River rafting and canoeing", ar: "التجديف في الأنهار والكانو", ro: "Rafting și canoe" },
    intro: { en: "Guided rafting on mountain rivers or calm canoeing on lakes, with licensed instructors and safety equipment. Minimum ages apply.", ar: "تجديف بمرافقة مرشدين في أنهار جبلية أو كانو هادئ في البحيرات، مع مدربين مرخّصين ومعدات سلامة. تنطبق حدود دنيا للأعمار.", ro: "Rafting ghidat pe râuri de munte sau canoe liniștită pe lacuri, cu instructori autorizați și echipament. Se aplică vârste minime." } },
  { id: "fishing", category: "nature", media: "delta", regions: ["danube-delta", "carpathians"], family: true,
    season: { en: "Spring to autumn, within legal seasons", ar: "من الربيع إلى الخريف، ضمن المواسم القانونية", ro: "Primăvară – toamnă, în sezoanele legale" },
    title: { en: "Fishing on lakes, rivers or the Danube Delta", ar: "الصيد في البحيرات أو الأنهار أو دلتا الدانوب", ro: "Pescuit pe lacuri, râuri sau în Delta Dunării" },
    intro: { en: "A relaxed morning with a local guide, from trout streams to the Delta's quiet channels. Permits are arranged in advance.", ar: "صباح هادئ مع مرشد محلي، من جداول سمك السلمون المرقط إلى قنوات الدلتا الهادئة. تُرتّب التصاريح مسبقًا.", ro: "O dimineață liniștită cu un ghid local, de la pâraie cu păstrăvi la canalele Deltei. Permisele se obțin din timp." } },
  { id: "bears", category: "nature", media: "mountains", regions: ["carpathians", "transylvania"], family: true,
    season: { en: "Spring to autumn", ar: "من الربيع إلى الخريف", ro: "Primăvară – toamnă" },
    title: { en: "Brown bear watching from a hide", ar: "مشاهدة الدببة البنية من مخبأ مراقبة", ro: "Observarea urșilor bruni din observator" },
    intro: { en: "At dusk, watch wild brown bears from an authorised forest hide with a ranger. Sightings are likely but never guaranteed.", ar: "عند الغسق، شاهد الدببة البنية البرية من مخبأ مراقبة مرخّص في الغابة برفقة حارس. المشاهدة مرجّحة لكنها غير مضمونة.", ro: "La apus, urmărește urși bruni sălbatici dintr-un observator autorizat, cu un ranger. Observarea e probabilă, dar nu garantată." } },
  { id: "forest-cabin", category: "nature", media: "mountains", regions: ["carpathians", "bucovina"], family: true,
    season: { en: "All year", ar: "طوال العام", ro: "Tot anul" },
    title: { en: "Living in the woods", ar: "العيش في الغابة", ro: "Viața în pădure" },
    intro: { en: "Stay in a private mountain chalet or forest cabin, with campfire evenings, forest walks and starry skies — comfort included.", ar: "أقم في شاليه جبلي خاص أو كوخ في الغابة، مع أمسيات حول النار ونزهات في الغابة وسماء مرصّعة بالنجوم — مع الحفاظ على الراحة.", ro: "Cazare într-o cabană privată la munte sau în pădure, cu seri la foc, plimbări și cer înstelat — cu tot confortul." } },
  { id: "salt-mine", category: "wellbeing", media: "oldTown", regions: ["transylvania"], family: true,
    season: { en: "All year — ideal on a rainy day", ar: "طوال العام — مثالي في الأيام الممطرة", ro: "Tot anul — ideal pe vreme ploioasă" },
    title: { en: "Underground salt mine visit", ar: "زيارة منجم ملح تحت الأرض", ro: "Vizită la o salină subterană" },
    intro: { en: "A vast underground world with a lake, rowing boats and fresh saline air — a favourite with children and grandparents alike.", ar: "عالم واسع تحت الأرض فيه بحيرة وقوارب تجديف وهواء مالح نقي — مفضّل لدى الأطفال والأجداد على حد سواء.", ro: "O lume subterană vastă, cu lac, bărci și aer salin — preferată deopotrivă de copii și bunici." } },
  { id: "monasteries", category: "culture", media: "oldTown", regions: ["bucovina"], family: true,
    season: { en: "All year", ar: "طوال العام", ro: "Tot anul" },
    title: { en: "Painted monasteries of Bucovina", ar: "الأديرة المرسومة في بوكوفينا", ro: "Mănăstirile pictate din Bucovina" },
    intro: { en: "UNESCO-listed churches such as Voroneț and Sucevița, famous for their painted outer walls, visited calmly with a guide who explains the stories.", ar: "كنائس مدرجة في قائمة اليونسكو مثل فورونيتس وسوتشيفيتسا، الشهيرة بجدرانها الخارجية المرسومة، تُزار بهدوء مع مرشد يروي قصصها.", ro: "Biserici UNESCO precum Voroneț și Sucevița, celebre pentru pictura exterioară, vizitate liniștit cu un ghid care le spune poveștile." } },
];
