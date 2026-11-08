import type {
  Beat,
  CollaborationArtist,
  LicenseDefinition,
  ReleaseItem,
  ServiceItem,
} from "@/types/foxphase";

export type License = {
  id: "basic" | "premium" | "trackout" | "unlimited" | "exclusive";
  label: string;
  price: number;
  priceRub?: number;
  rights: string;
};

export const licenses: License[] = [
  {
    id: "basic",
    label: "MP3 Lease",
    price: 15,
    priceRub: 1000,
    rights: "MP3 file + non-exclusive license · 1 000 ₽ / $15",
  },
  {
    id: "premium",
    label: "WAV Lease",
    price: 20,
    priceRub: 2000,
    rights: "High-quality WAV + MP3 + non-exclusive license · 2 000 ₽ / $20",
  },
  {
    id: "trackout",
    label: "Trackout Lease",
    price: 70,
    priceRub: 5700,
    rights: "MP3 + WAV + individual STEMS for professional mixing · 5 700 ₽ / $70",
  },
  {
    id: "unlimited",
    label: "Unlimited Lease",
    price: 120,
    priceRub: 9800,
    rights:
      "MP3 + WAV + STEMS · Extended commercial license with unlimited streams · 9 800 ₽ / $120",
  },
  {
    id: "exclusive",
    label: "Exclusive Rights",
    price: 350,
    priceRub: 29000,
    rights:
      "Exclusive license · Beat removed from future sales · from 29 000 ₽ / $350",
  },
];

export const licenseDefinitions: LicenseDefinition[] = [
  {
    id: "basic",
    name: { en: "🥉 MP3 LEASE", ru: "🥉 MP3 LEASE" },
    badge: { en: "ENTRY LEASE", ru: "БАЗОВАЯ АРЕНДА" },
    priceDisplay: { en: "$15 / 1 000 ₽", ru: "1 000 ₽ / $15" },
    priceUsd: 15,
    priceRub: 1000,
    isCustomPrice: false,
    formats: ["MP3 (320 kbps)"],
    usageTerms: {
      en: "MP3 file + non-exclusive license. Ideal for independent releases, demos, and vocal recording.",
      ru: "MP3-файл и неисключительная лицензия. Отличный старт для записи вокала, демо и независимых релизов.",
    },
    restrictions: {
      en: "Non-exclusive license. Master ownership remains with FOXPHASE. Reselling the raw instrumental is prohibited.",
      ru: "Неисключительная лицензия. Авторские права на бит остаются за FOXPHASE. Перепродажа инструментала запрещена.",
    },
    commercialUse: {
      en: "Standard non-exclusive commercial release usage according to the license agreement.",
      ru: "Коммерческое использование в рамках стандартной неисключительной лицензии согласно договору.",
    },
    publishingTerms: {
      en: "Credit required: Produced by FOXPHASE.",
      ru: "Обязательное указание авторства: Produced by FOXPHASE.",
    },
    exclusiveInfo: {
      en: "Non-exclusive lease. The beat remains available for purchase until Exclusive Rights are sold.",
      ru: "Неисключительная аренда. Бит остаётся в продаже до момента выкупа Exclusive Rights.",
    },
    legalNotice: {
      en: "Create your sound. I'll provide the beat. — PRODUCED BY FOXPHASE.",
      ru: "Создавай свою музыку. Остальное — моя работа. — PRODUCED BY FOXPHASE.",
    },
  },
  {
    id: "premium",
    name: { en: "🥈 WAV LEASE", ru: "🥈 WAV LEASE" },
    badge: { en: "STUDIO MASTER", ru: "СТУДИЙНОЕ КАЧЕСТВО" },
    priceDisplay: { en: "$20 / 2 000 ₽", ru: "2 000 ₽ / $20" },
    priceUsd: 20,
    priceRub: 2000,
    isCustomPrice: false,
    formats: ["WAV (High-Quality)", "MP3 (320 kbps)"],
    usageTerms: {
      en: "High-quality WAV + MP3 files and a non-exclusive license for clean studio vocal mixing and streaming.",
      ru: "MP3 + WAV высокого качества и неисключительная лицензия для чистого сведения и дистрибуции на площадки.",
    },
    restrictions: {
      en: "Non-exclusive license. Content ID registration of the raw beat is prohibited.",
      ru: "Неисключительная лицензия. Регистрация инструментала в Content ID без согласования запрещена.",
    },
    commercialUse: {
      en: "Commercial streaming and release distribution under non-exclusive lease terms.",
      ru: "Дистрибуция на стриминговые площадки и коммерческое использование по условиям договора.",
    },
    publishingTerms: {
      en: "Credit required: Produced by FOXPHASE.",
      ru: "Обязательное указание авторства: Produced by FOXPHASE.",
    },
    exclusiveInfo: {
      en: "Non-exclusive lease. Upgradeable to Trackout, Unlimited, or Exclusive Rights.",
      ru: "Неисключительная лицензия с возможностью апгрейда до Trackout, Unlimited или Exclusive.",
    },
    legalNotice: {
      en: "High-quality audio files & original production by FOXPHASE.",
      ru: "Высокое качество аудиофайлов и оригинальное авторское звучание FOXPHASE.",
    },
  },
  {
    id: "trackout",
    name: { en: "🥇 TRACKOUT LEASE", ru: "🥇 TRACKOUT LEASE" },
    badge: { en: "PROFESSIONAL MIXING", ru: "ПОКАНАЛЬНЫЕ ДОРОЖКИ" },
    priceDisplay: { en: "$70 / 5 700 ₽", ru: "5 700 ₽ / $70" },
    priceUsd: 70,
    priceRub: 5700,
    isCustomPrice: false,
    formats: ["MP3", "WAV", "Individual STEMS (Trackout)"],
    usageTerms: {
      en: "MP3 + WAV + individual STEMS for professional mixing and full dynamic control in the studio.",
      ru: "MP3 + WAV + отдельные дорожки (STEMS) для профессионального сведения и детального контроля над звуком.",
    },
    restrictions: {
      en: "Non-exclusive multi-track license. Stems may not be repackaged or resold as sample packs.",
      ru: "Неисключительная лицензия со стемами. Дорожки нельзя перепродавать или использовать в сэмпл-паках.",
    },
    commercialUse: {
      en: "Expanded commercial usage for studio singles, EPs, and albums.",
      ru: "Расширенное коммерческое использование для студийных синглов, EP и альбомов.",
    },
    publishingTerms: {
      en: "Credit required: Produced by FOXPHASE.",
      ru: "Обязательное указание авторства: Produced by FOXPHASE.",
    },
    exclusiveInfo: {
      en: "Non-exclusive Trackout license. Can be upgraded to Unlimited or Exclusive Rights.",
      ru: "Неисключительная лицензия с отдельными дорожками (STEMS).",
    },
    legalNotice: {
      en: "Full STEMS included for maximum mixing precision.",
      ru: "Полный пакет отдельных дорожек (STEMS) для профессиональной студийной работы.",
    },
  },
  {
    id: "unlimited",
    name: { en: "💎 UNLIMITED LEASE", ru: "💎 UNLIMITED LEASE" },
    badge: { en: "UNLIMITED STREAMS", ru: "БЕЗ ЛИМИТА НА СТРИМЫ" },
    priceDisplay: { en: "$120 / 9 800 ₽", ru: "9 800 ₽ / $120" },
    priceUsd: 120,
    priceRub: 9800,
    isCustomPrice: false,
    formats: ["MP3", "WAV", "STEMS (Trackout)"],
    usageTerms: {
      en: "MP3 + WAV + STEMS, extended commercial license with unlimited streams and plays, subject to license terms.",
      ru: "MP3 + WAV + STEMS, расширенная коммерческая лицензия без лимита на прослушивания и стримы согласно условиям договора.",
    },
    restrictions: {
      en: "Non-exclusive license with uncapped streams/plays under the signed agreement.",
      ru: "Неисключительная лицензия без лимита на прослушивания и стримы в рамках условий договора.",
    },
    commercialUse: {
      en: "Unlimited streams and plays across digital platforms, subject to license agreement terms.",
      ru: "Безлимитные прослушивания и стримы на цифровых площадках согласно условиям договора.",
    },
    publishingTerms: {
      en: "Credit required: Produced by FOXPHASE.",
      ru: "Обязательное указание авторства: Produced by FOXPHASE.",
    },
    exclusiveInfo: {
      en: "Maximum non-exclusive tier. Only Exclusive Rights removes the beat from the store.",
      ru: "Максимальный неисключительный тариф. Снятие бита с продажи происходит только при покупке Exclusive Rights.",
    },
    legalNotice: {
      en: "Extended commercial license with unlimited streams and plays, subject to license terms.",
      ru: "Расширенная коммерческая лицензия без лимита на прослушивания и стримы согласно условиям договора.",
    },
  },
  {
    id: "exclusive",
    name: { en: "👑 EXCLUSIVE RIGHTS", ru: "👑 EXCLUSIVE RIGHTS" },
    badge: { en: "FULL OWNERSHIP · 1 OF 1", ru: "ЭКСКЛЮЗИВ · СНЯТИЕ С ПРОДАЖИ" },
    priceDisplay: { en: "from $350 / от 29 000 ₽", ru: "от 29 000 ₽ / от $350" },
    priceUsd: 350,
    priceRub: 29000,
    isCustomPrice: true,
    formats: ["MP3", "WAV Master", "Full STEMS", "Individual Transfer Agreement"],
    usageTerms: {
      en: "Exclusive license. The beat will be removed from future sales after purchase. Rights and transfer conditions are discussed individually.",
      ru: "Эксклюзивная лицензия. После сделки бит снимается с дальнейшей продажи. Условия передачи прав обсуждаются индивидуально.",
    },
    restrictions: {
      en: "No future leases or sales of the beat will ever be made after the exclusive transaction.",
      ru: "После оформления сделки бит навсегда снимается с продажи в каталоге.",
    },
    commercialUse: {
      en: "Full commercial exploitation under the individually agreed exclusive transfer contract.",
      ru: "Полное коммерческое использование согласно индивидуальному договору передачи эксклюзивных прав.",
    },
    publishingTerms: {
      en: "Rights, royalties, and transfer conditions are discussed and finalized individually with FOXPHASE.",
      ru: "Условия передачи прав и распределения роялти обсуждаются индивидуально с FOXPHASE.",
    },
    exclusiveInfo: {
      en: "1-of-1 Exclusive Rights starting from $350 / 29 000 ₽.Beat is permanently removed from future sales.",
      ru: "Эксклюзивные права от 29 000 ₽ / $350. После сделки бит полностью снимается с дальнейшей продажи.",
    },
    legalNotice: {
      en: "For purchases, licensing and custom inquiries, feel free to send a DM.",
      ru: "По вопросам покупки, лицензирования и индивидуальных заказов пишите в Direct / Telegram.",
    },
  },
];

export const whyChooseFeatures = {
  en: [
    "Original sound and unique production.",
    "High-quality audio files (MP3, WAV, STEMS).",
    "Flexible licensing options (from basic leases to exclusive rights).",
    "Professional approach to every project.",
    "Custom collaborations available.",
  ],
  ru: [
    "Оригинальное авторское звучание.",
    "Высокое качество аудиофайлов (MP3, WAV, STEMS).",
    "Разные варианты лицензирования (от базовой аренды до эксклюзива).",
    "Профессиональный подход к каждому заказу.",
    "Возможность индивидуального сотрудничества.",
  ],
} as const;

export const beats: Beat[] = [
  {
    id: "018f4a90-1001-7000-8000-000000000001",
    slug: "chrome-pressure",
    title: "CHROME PRESSURE",
    genre: "Rage",
    subgenre: "Cyber Rage / Industrial",
    bpm: 154,
    key: "F# min",
    duration: "02:42",
    durationSeconds: 162,
    mood: "High-Voltage / Metallic",
    coverGradient: "radial-gradient(circle at 30% 25%, #E8E8E8 0%, #3A3D45 28%, #101114 68%, #050505 100%)",
    coverAccent: "#E8E8E8",
    previewUrl: null,
    publishedAt: "2026-10-28",
    popularity: 98,
    featured: true,
    status: "available",
    tags: ["Rage", "Distorted 808", "Chrome Synth", "154 BPM"],
    licenses,
  },
  {
    id: "018f4a90-1002-7000-8000-000000000002",
    slug: "obsidian-echo",
    title: "OBSIDIAN ECHO",
    genre: "Trap",
    subgenre: "Dark Atmospheric Trap",
    bpm: 142,
    key: "C# min",
    duration: "03:04",
    durationSeconds: 184,
    mood: "Nocturnal / Heavy Space",
    coverGradient: "radial-gradient(circle at 75% 20%, #B8BAC2 0%, #25272E 35%, #0B0C0E 72%, #050505 100%)",
    coverAccent: "#C8CAD0",
    previewUrl: null,
    publishedAt: "2026-10-24",
    popularity: 95,
    featured: true,
    status: "available",
    tags: ["Trap", "Sub Pressure", "Cinematic", "142 BPM"],
    licenses,
  },
  {
    id: "018f4a90-1003-7000-8000-000000000003",
    slug: "zero-visibility",
    title: "ZERO VISIBILITY",
    genre: "Ambient",
    subgenre: "Ambient / Post-Trap",
    bpm: 124,
    key: "A min",
    duration: "03:18",
    durationSeconds: 198,
    mood: "Weightless / Textural",
    coverGradient: "radial-gradient(circle at 20% 80%, #D8D9DF 0%, #2E3038 32%, #0E0F12 70%, #050505 100%)",
    coverAccent: "#85878D",
    previewUrl: null,
    publishedAt: "2026-10-19",
    popularity: 91,
    featured: true,
    status: "available",
    tags: ["Ambient", "Wide Reverb", "Granular", "124 BPM"],
    licenses,
  },
  {
    id: "018f4a90-1004-7000-8000-000000000004",
    slug: "night-transit",
    title: "NIGHT TRANSIT",
    genre: "Phonk",
    subgenre: "Underground Drift / Phonk",
    bpm: 130,
    key: "D min",
    duration: "02:26",
    durationSeconds: 146,
    mood: "Raw / Overdriven",
    coverGradient: "radial-gradient(circle at 65% 65%, #FFFFFF 0%, #444750 25%, #121317 65%, #050505 100%)",
    coverAccent: "#E8E8E8",
    previewUrl: null,
    publishedAt: "2026-10-12",
    popularity: 94,
    featured: true,
    status: "available",
    tags: ["Phonk", "Analog Saturation", "omsk underground", "130 BPM"],
    licenses,
  },
  {
    id: "018f4a90-1005-7000-8000-000000000005",
    slug: "cold-circuit",
    title: "COLD CIRCUIT",
    genre: "House",
    subgenre: "Dark Club / Bass House",
    bpm: 126,
    key: "E min",
    duration: "03:32",
    durationSeconds: 212,
    mood: "Hypnotic / Late-Night",
    coverGradient: "radial-gradient(circle at 50% 30%, #D0D2D8 0%, #2B2D34 38%, #090A0C 75%, #050505 100%)",
    coverAccent: "#A5A7AD",
    previewUrl: null,
    publishedAt: "2026-10-05",
    popularity: 88,
    featured: false,
    status: "available",
    tags: ["House", "4x4 Pulse", "Warehouse", "126 BPM"],
    licenses,
  },
  {
    id: "018f4a90-1006-7000-8000-000000000006",
    slug: "fractured-signal",
    title: "FRACTURED SIGNAL",
    genre: "Experimental",
    subgenre: "Modular / Experimental Sound Design",
    bpm: 116,
    key: "G min",
    duration: "02:55",
    durationSeconds: 175,
    mood: "Architectural / Glitch",
    coverGradient: "radial-gradient(circle at 80% 75%, #E8E8E8 0%, #343740 30%, #101114 68%, #050505 100%)",
    coverAccent: "#FFFFFF",
    previewUrl: null,
    publishedAt: "2026-09-29",
    popularity: 89,
    featured: false,
    status: "available",
    tags: ["Experimental", "Sound Design", "Asymmetric", "116 BPM"],
    licenses,
  },
];

export const releases: ReleaseItem[] = [
  {
    id: "rel-blade",
    slug: "blade",
    title: "BLADE",
    type: { en: "Official EP / Single", ru: "Официальный релиз" },
    year: "FOXPHASE Catalog",
    description: {
      en: "Razor-sharp metallic percussion and low-end architecture. Part of the official FOXPHASE discography.",
      ru: "Холодная металлическая перкуссия и плотная басовая архитектура. Ключевой релиз дискографии FOXPHASE.",
    },
    yandexMusicUrl: "https://music.yandex.com/artist/21691221",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fe/43/a4/fe43a47b-f1a7-e5b0-8414-5f78160e313b/cover.jpg/1000x1000bb.jpg",
    coverStyle: "radial-gradient(circle at 30% 25%, #FFFFFF 0%, #484B54 24%, #101114 66%, #050505 100%)",
    code: "FP-REL-01",
  },
  {
    id: "rel-dreams",
    slug: "dreams",
    title: "DREAMS",
    type: { en: "Official Release (w/ STAROX)", ru: "Официальный релиз (c STAROX)" },
    year: "FOXPHASE Catalog",
    description: {
      en: "Deep spatial synthesis suspended between hypnotic atmosphere and nocturnal rhythm.",
      ru: "Глубокий пространственный синтез на грани гипнотической атмосферы и ночного ритма.",
    },
    yandexMusicUrl: "https://music.yandex.com/artist/21691221",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c0/bd/2e/c0bd2e74-b156-2c0f-458f-24e2bce6bdb0/2_001_FOXMXNAXM_STAROX-DREAMS.jpg/1000x1000bb.jpg",
    coverStyle: "radial-gradient(circle at 70% 30%, #D2D4DC 0%, #2D3039 34%, #0B0C0E 74%, #050505 100%)",
    code: "FP-REL-02",
  },
  {
    id: "rel-last-breath",
    slug: "last-breath",
    title: "Last Breath",
    type: { en: "Official Release (w/ D4RKWAV3)", ru: "Официальный релиз (с D4RKWAV3)" },
    year: "FOXPHASE Catalog",
    description: {
      en: "Tension-driven dynamics with stark contrast, built for late-night headphone and club translation.",
      ru: "Напряжённая динамика и резкий контраст текстур, созданные для максимальной детализации звука.",
    },
    yandexMusicUrl: "https://music.yandex.com/artist/21691221",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ec/96/5f/ec965fe9-c538-78c7-31b3-738f17e7b272/2_001_FOXMXNAXM_D4RKWAV3-Last_Breath.jpg/1000x1000bb.jpg",
    coverStyle: "radial-gradient(circle at 25% 70%, #E8E8E8 0%, #373A42 30%, #101114 70%, #050505 100%)",
    code: "FP-REL-03",
  },
  {
    id: "rel-forgotten-memories",
    slug: "forgotten-memories",
    title: "Forgotten Memories",
    type: { en: "Official Album", ru: "Официальный альбом" },
    year: "FOXPHASE Catalog",
    description: {
      en: "Cinematic introspection, dark ambient textures, and submerged melodic motifs.",
      ru: "Кинематографичная меланхолия, тёмные эмбиент-текстуры и глубокие мелодические линии.",
    },
    yandexMusicUrl: "https://music.yandex.com/artist/21691221",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/cf/fa/f7/cffaf790-eeab-cea4-f03f-aba9dd653b1d/3618024203122.jpg/1000x1000bb.jpg",
    coverStyle: "radial-gradient(circle at 75% 75%, #C8CAD2 0%, #262830 36%, #090A0D 75%, #050505 100%)",
    code: "FP-REL-04",
  },
];

export const collaborationArtists: CollaborationArtist[] = [
  { id: "col-01", name: "RONVXER", index: "01", role: { en: "Artist Collaboration", ru: "Музыкальное сотрудничество" } },
  { id: "col-02", name: "TendyOne", index: "02", role: { en: "Artist Collaboration", ru: "Музыкальное сотрудничество" } },
  { id: "col-03", name: "Balekajon", index: "03", role: { en: "Artist Collaboration", ru: "Музыкальное сотрудничество" } },
  { id: "col-04", name: "D4RKWAV3", index: "04", role: { en: "Artist Collaboration", ru: "Музыкальное сотрудничество" } },
  { id: "col-05", name: "mishix", index: "05", role: { en: "Artist Collaboration", ru: "Музыкальное сотрудничество" } },
  { id: "col-06", name: "ByBllessed", index: "06", role: { en: "Artist Collaboration", ru: "Музыкальное сотрудничество" } },
  { id: "col-07", name: "STAROX", index: "07", role: { en: "Artist Collaboration", ru: "Музыкальное сотрудничество" } },
  { id: "col-08", name: "Hxlkart", index: "08", role: { en: "Artist Collaboration", ru: "Музыкальное сотрудничество" } },
  { id: "col-09", name: "gostlxne", index: "09", role: { en: "Artist Collaboration", ru: "Музыкальное сотрудничество" } },
  { id: "col-10", name: "OXBRIDGE", index: "10", role: { en: "Artist Collaboration", ru: "Музыкальное сотрудничество" } },
  { id: "col-11", name: "Chelsy smile", index: "11", role: { en: "Artist Collaboration", ru: "Музыкальное сотрудничество" } },
];

export const officialServices: ServiceItem[] = [
  {
    id: "srv-mp3-beat",
    slug: "mp3-lease",
    index: "01",
    title: { en: "🥉 MP3 LEASE", ru: "🥉 MP3 LEASE" },
    price: { en: "$15 / 1 000 ₽", ru: "1 000 ₽ / $15" },
    deliverables: {
      en: ["MP3 file (320 kbps)", "Non-exclusive license", "Instant catalog selection"],
      ru: ["MP3-файл (320 kbps)", "Неисключительная лицензия", "Выбор из каталога битов"],
    },
    description: {
      en: "MP3 file + non-exclusive license for independent releases, demos, and vocal recording sessions.",
      ru: "MP3-файл и неисключительная лицензия для записи вокала, демо и независимых релизов.",
    },
    topicValue: "Custom Beat",
  },
  {
    id: "srv-wav-beat",
    slug: "wav-lease",
    index: "02",
    title: { en: "🥈 WAV LEASE", ru: "🥈 WAV LEASE" },
    price: { en: "$20 / 2 000 ₽", ru: "2 000 ₽ / $20" },
    deliverables: {
      en: ["High-quality WAV + MP3", "Non-exclusive license", "Studio-grade fidelity"],
      ru: ["MP3 + WAV высокого качества", "Неисключительная лицензия", "Готовность к сведению"],
    },
    description: {
      en: "High-quality WAV + MP3 files and a non-exclusive license for professional vocal mixing and streaming.",
      ru: "MP3 + WAV высокого качества и неисключительная лицензия для студийной работы и площадок.",
    },
    topicValue: "Custom Beat",
  },
  {
    id: "srv-trackout-lease",
    slug: "trackout-lease",
    index: "03",
    title: { en: "🥇 TRACKOUT LEASE", ru: "🥇 TRACKOUT LEASE" },
    price: { en: "$70 / 5 700 ₽", ru: "5 700 ₽ / $70" },
    deliverables: {
      en: ["MP3 + WAV", "Individual STEMS (Trackout)", "For professional mixing"],
      ru: ["MP3 + WAV", "Отдельные дорожки (STEMS)", "Для профессионального сведения"],
    },
    description: {
      en: "MP3 + WAV + individual STEMS for professional mixing and full control over every instrument.",
      ru: "MP3 + WAV + отдельные дорожки (STEMS) для профессионального сведения.",
    },
    topicValue: "Custom Beat",
  },
  {
    id: "srv-unlimited-lease",
    slug: "unlimited-lease",
    index: "04",
    title: { en: "💎 UNLIMITED LEASE", ru: "💎 UNLIMITED LEASE" },
    price: { en: "$120 / 9 800 ₽", ru: "9 800 ₽ / $120" },
    deliverables: {
      en: ["MP3 + WAV + STEMS", "Unlimited streams & plays", "Extended commercial license"],
      ru: ["MP3 + WAV + STEMS", "Без лимита на стримы", "Расширенная коммерческая лицензия"],
    },
    description: {
      en: "MP3 + WAV + STEMS, extended commercial license with unlimited streams and plays, subject to license terms.",
      ru: "MP3 + WAV + STEMS, расширенная коммерческая лицензия без лимита на прослушивания и стримы согласно условиям договора.",
    },
    topicValue: "Custom Beat",
  },
  {
    id: "srv-exclusive",
    slug: "exclusive-rights",
    index: "05",
    title: { en: "👑 EXCLUSIVE RIGHTS", ru: "👑 EXCLUSIVE RIGHTS" },
    price: { en: "from $350 / от 29 000 ₽", ru: "от 29 000 ₽ / $350" },
    deliverables: {
      en: ["Removed from future sales", "MP3 + WAV + Full STEMS", "Individual rights transfer"],
      ru: ["Бит снимается с продажи", "MP3 + WAV + STEMS", "Индивидуальная передача прав"],
    },
    description: {
      en: "Exclusive license. The beat will be removed from future sales after purchase. Rights and transfer conditions are discussed individually.",
      ru: "Эксклюзивная лицензия. После сделки бит снимается с дальнейшей продажи. Условия передачи прав обсуждаются индивидуально.",
    },
    topicValue: "Exclusive Rights",
  },
  {
    id: "srv-custom-beat",
    slug: "custom-beat",
    index: "06",
    title: { en: "Custom Beat / Mixing / Mastering", ru: "Индивидуальный бит / Сведение / Мастеринг" },
    price: { en: "By Agreement", ru: "По договорённости" },
    deliverables: {
      en: ["Custom production from scratch", "Professional mixing & mastering", "Direct work with FOXPHASE"],
      ru: ["Написание бита на заказ", "Профессиональное сведение и мастеринг", "Индивидуальное сотрудничество"],
    },
    description: {
      en: "Create your sound. I'll provide the beat. Custom collaborations, mixing, and mastering tailored to your project.",
      ru: "Создавай свою музыку. Остальное — моя работа. Индивидуальные заказы, кастомные биты, сведение и мастеринг.",
    },
    topicValue: "Custom Beat",
  },
];

export const socials = [
  ["Telegram", "https://t.me/FOXPHASE"],
  ["Instagram", "https://www.instagram.com/f0xp.hase"],
  ["TikTok", "https://www.tiktok.com/@foxphase"],
  ["YouTube", "https://youtube.com/@foxphase-z9o"],
  ["Yandex Music", "https://music.yandex.com/artist/21691221"],
] as const;

export const genresList = [
  "Trap",
  "Rage",
  "Ambient",
  "Phonk",
  "House",
  "Experimental",
] as const;

export const copy = {
  en: {
    nav: ["Beats", "Licenses", "Services", "Releases", "Portfolio", "About", "Contact"],
    heroEyebrow: "INDEPENDENT SOUND ARCHITECT · OMSK / WORLDWIDE",
    hero: "INDEPENDENT SOUND.\nNO LIMITS.",
    intro:
      "High-quality original beats available for artists and performers. Choose from different licensing options, from basic leases to exclusive rights. Create your sound. I'll provide the beat.",
    explore: "EXPLORE BEATS",
    workWithMe: "WORK WITH ME",
    contact: "START A PROJECT",
    cart: "Cart",
    demo: "Catalog previews operate in verified studio mode — upload official audio previews via the Admin Panel.",
    latest: "BEATS FOR SALE",
    services: "PRICING & LICENSES",
    contactTitle: "CREATE YOUR SOUND. I'LL PROVIDE THE BEAT.",
    manual: "Orders run through server-validated manual confirmation until a live payment webhook is enabled.",
  },
  ru: {
    nav: ["Биты", "Лицензии", "Услуги", "Релизы", "Портфолио", "О продюсере", "Контакты"],
    heroEyebrow: "НЕЗАВИСИМЫЙ МУЗЫКАЛЬНЫЙ ПРОДЮСЕР · ОМСК / МИР",
    hero: "НЕЗАВИСИМЫЙ ЗВУК.\nБЕЗ ГРАНИЦ.",
    intro:
      "Качественные авторские биты для артистов и исполнителей. Все инструменталы доступны в нескольких вариантах лицензирования — от базовой аренды до эксклюзивного приобретения. Создавай свою музыку. Остальное — моя работа.",
    explore: "КАТАЛОГ БИТОВ",
    workWithMe: "СОТРУДНИЧЕСТВО",
    contact: "НАЧАТЬ ПРОЕКТ",
    cart: "Корзина",
    demo: "Каталог работает в режиме подтверждённых материалов — загрузка аудио-превью осуществляется через админ-панель.",
    latest: "ПРОДАЖА БИТОВ",
    services: "ПРАЙС И ЛИЦЕНЗИИ",
    contactTitle: "СОЗДАВАЙ СВОЮ МУЗЫКУ. ОСТАЛЬНОЕ — МОЯ РАБОТА.",
    manual: "Заказы проходят серверную валидацию и ручное подтверждение до подключения платёжного провайдера.",
  },
} as const;
