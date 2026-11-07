import type {
  Beat,
  CollaborationArtist,
  LicenseDefinition,
  ReleaseItem,
  ServiceItem,
} from "@/types/foxphase";

export type License = {
  id: "basic" | "premium" | "unlimited" | "exclusive";
  label: string;
  price: number;
  priceRub?: number;
  rights: string;
};

export const licenses: License[] = [
  {
    id: "basic",
    label: "Basic",
    price: 15,
    priceRub: 1500,
    rights: "MP3 Lease · High-Bitrate 320kbps",
  },
  {
    id: "premium",
    label: "Premium",
    price: 20,
    priceRub: 2000,
    rights: "WAV Lease · 24-bit Uncompressed Master",
  },
  {
    id: "unlimited",
    label: "Unlimited",
    price: 50,
    priceRub: 5000,
    rights: "WAV + Trackout Stems · Terms confirmed on request",
  },
  {
    id: "exclusive",
    label: "Exclusive",
    price: 0,
    rights: "Full Exclusive Rights · By Individual Agreement",
  },
];

export const licenseDefinitions: LicenseDefinition[] = [
  {
    id: "basic",
    name: { en: "BASIC LICENSE", ru: "ЛИЦЕНЗИЯ BASIC" },
    badge: { en: "ENTRY LEASE", ru: "БАЗОВЫЙ ЛИЗИНГ" },
    priceDisplay: { en: "$15 / 1500 ₽", ru: "1500 ₽ / $15" },
    priceUsd: 15,
    priceRub: 1500,
    isCustomPrice: false,
    formats: ["MP3 (320 kbps)"],
    usageTerms: {
      en: "Standard non-exclusive instrumental lease for independent digital releases, demos, and initial distribution.",
      ru: "Стандартная неэксклюзивная аренда инструментала для независимых цифровых релизов, демо и дистрибуции.",
    },
    restrictions: {
      en: "Original master ownership remains with FOXPHASE. Reselling or sublicensing the raw instrumental is prohibited.",
      ru: "Авторские права на оригинал остаются за FOXPHASE. Перепродажа или сублицензирование бита запрещены.",
    },
    commercialUse: {
      en: "Permitted within non-exclusive release scope. Exact stream/monetization caps are editable and confirmed in the license agreement.",
      ru: "Разрешено в рамках неэксклюзивного релиза. Точные лимиты стримов и монетизации согласуются в договоре с FOXPHASE.",
    },
    publishingTerms: {
      en: "Must credit: Prod. by FOXPHASE. Publishing splits and legal clauses are finalized upon order confirmation.",
      ru: "Обязательное указание: Prod. by FOXPHASE. Юридические доли паблишинга фиксируются при подтверждении заказа.",
    },
    exclusiveInfo: {
      en: "Non-exclusive license. Beat remains available in the store until an Exclusive buyout occurs.",
      ru: "Неэксклюзивная лицензия. Бит остаётся в каталоге до момента выкупа эксклюзивных прав.",
    },
    legalNotice: {
      en: "LEGAL NOTICE: Detailed contractual caps, royalty splits, and territorial terms are customizable templates subject to direct confirmation with FOXPHASE.",
      ru: "ВАЖНО: Детальные договорные лимиты, роялти и юридические условия являются редактируемыми и требуют прямого согласования с FOXPHASE.",
    },
  },
  {
    id: "premium",
    name: { en: "PREMIUM LICENSE", ru: "ЛИЦЕНЗИЯ PREMIUM" },
    badge: { en: "STUDIO STANDARD", ru: "СТУДИЙНЫЙ СТАНДАРТ" },
    priceDisplay: { en: "$20 / 2000 ₽", ru: "2000 ₽ / $20" },
    priceUsd: 20,
    priceRub: 2000,
    isCustomPrice: false,
    formats: ["WAV (24-bit / 44.1–48 kHz)", "MP3 (320 kbps)"],
    usageTerms: {
      en: "Uncompressed studio master quality designed for professional vocal mixing, mastering, and streaming distribution.",
      ru: "Несжатый студийный мастер в формате WAV для профессионального сведения вокала, мастеринга и площадок.",
    },
    restrictions: {
      en: "Non-exclusive rights. Audio Fingerprinting / Content ID registration of the raw beat is not permitted.",
      ru: "Неэксклюзивные права. Регистрация инструментала в системах Content ID без согласования запрещена.",
    },
    commercialUse: {
      en: "Commercial streaming and live performance usage subject to agreed contract parameters.",
      ru: "Коммерческий стриминг и выступления согласно согласованным параметрам договора.",
    },
    publishingTerms: {
      en: "Credit required: Prod. by FOXPHASE. Full agreement terms attached upon checkout verification.",
      ru: "Указание авторства: Prod. by FOXPHASE. Полный текст условий формируется при подтверждении заказа.",
    },
    exclusiveInfo: {
      en: "Non-exclusive license. Upgradeable to Unlimited or Exclusive Rights upon request.",
      ru: "Неэксклюзивная лицензия. Возможен апгрейд до Unlimited или Exclusive по запросу.",
    },
    legalNotice: {
      en: "LEGAL NOTICE: Final legal clauses and distribution thresholds are subject to confirmation with FOXPHASE.",
      ru: "ВАЖНО: Финальные юридические формулировки и лимиты дистрибуции подлежат согласованию с FOXPHASE.",
    },
  },
  {
    id: "unlimited",
    name: { en: "UNLIMITED LICENSE", ru: "ЛИЦЕНЗИЯ UNLIMITED" },
    badge: { en: "FULL STEMS CONTROL", ru: "ПОЛНЫЙ КОНТРОЛЬ СТЕМОВ" },
    priceDisplay: { en: "By Agreement / Custom", ru: "По согласованию" },
    priceUsd: 50,
    priceRub: 5000,
    isCustomPrice: true,
    formats: ["WAV Master", "Trackout Stems (WAV)", "MP3 (320 kbps)"],
    usageTerms: {
      en: "Expanded non-exclusive license with multi-track stems for deep studio arrangement and high-volume releases.",
      ru: "Расширенная неэксклюзивная лицензия с поканальными дорожками (Stems) для глубокого сведения и крупных релизов.",
    },
    restrictions: {
      en: "Non-transferable license. Underlying composition copyright remains with FOXPHASE.",
      ru: "Лицензия не подлежит передаче третьим лицам. Авторское право на композицию сохраняется за FOXPHASE.",
    },
    commercialUse: {
      en: "Uncapped or high-tier commercial usage parameters defined directly with FOXPHASE prior to fulfillment.",
      ru: "Расширенные параметры коммерческого использования определяются индивидуально с FOXPHASE перед выдачей файлов.",
    },
    publishingTerms: {
      en: "Prod. by FOXPHASE credit mandatory. Publishing and master royalties negotiated per project.",
      ru: "Обязателен кредит Prod. by FOXPHASE. Условия паблишинга и роялти фиксируются под проект.",
    },
    exclusiveInfo: {
      en: "Non-exclusive multi-stem license. Does not remove the beat from the store unless upgraded to Exclusive.",
      ru: "Неэксклюзивная лицензия со стемами. Бит снимается с продажи только при оформлении Exclusive Rights.",
    },
    legalNotice: {
      en: "LEGAL NOTICE: Terms, stem delivery scope, and pricing are finalized directly with FOXPHASE.",
      ru: "ВАЖНО: Юридические условия, состав архива стемов и стоимость согласуются напрямую с FOXPHASE.",
    },
  },
  {
    id: "exclusive",
    name: { en: "EXCLUSIVE RIGHTS", ru: "ЭКСКЛЮЗИВНЫЕ ПРАВА" },
    badge: { en: "1 OF 1 OWNERSHIP", ru: "ПОЛНЫЙ ВЫКУП · 1 ИЗ 1" },
    priceDisplay: { en: "By Agreement", ru: "По договорённости" },
    priceUsd: null,
    priceRub: null,
    isCustomPrice: true,
    formats: ["24-bit WAV Master", "Full Trackout Stems", "Signed Exclusive Contract"],
    usageTerms: {
      en: "Complete buyout of exclusive commercial rights. The instrumental is permanently removed from the public Beat Store.",
      ru: "Полный выкуп эксклюзивных прав на инструментал. Бит навсегда снимается с публичной продажи в каталоге.",
    },
    restrictions: {
      en: "Previous non-exclusive leases remain valid under their original date of issue; no new leases can ever be sold.",
      ru: "Ранее выданные неэксклюзивные лицензии сохраняют силу, но новые продажи бита полностью прекращаются.",
    },
    commercialUse: {
      en: "Unlimited global commercial exploitation across all media, labels, and platforms as defined in the individual contract.",
      ru: "Неограниченное мировое коммерческое использование на всех площадках и лейблах согласно индивидуальному договору.",
    },
    publishingTerms: {
      en: "Custom publishing/writer splits and master buyout agreement drafted individually with FOXPHASE.",
      ru: "Индивидуальный договор передачи прав и распределения роялти оформляется персонально с FOXPHASE.",
    },
    exclusiveInfo: {
      en: "Arranged strictly by individual request. Never auto-confirmed without producer sign-off.",
      ru: "Оформляется строго по индивидуальному запросу после личного подтверждения продюсером.",
    },
    legalNotice: {
      en: "LEGAL NOTICE: Exclusive Rights are negotiated case-by-case. Submit an Exclusive Rights inquiry to receive terms.",
      ru: "ВАЖНО: Exclusive Rights оформляется по индивидуальному запросу. Оставьте заявку для согласования договора.",
    },
  },
];

// Catalog architecture records — clearly marked without fake audio or unverified claims.
// Real audio previews and stems are uploaded via the protected /admin panel.
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
    type: { en: "Official Release", ru: "Официальный релиз" },
    year: "FOXPHASE Catalog",
    description: {
      en: "Razor-sharp metallic percussion and low-end architecture. Part of the official FOXPHASE discography.",
      ru: "Холодная металлическая перкуссия и плотная басовая архитектура. Ключевой релиз дискографии FOXPHASE.",
    },
    yandexMusicUrl: "https://music.yandex.com/artist/21691221",
    coverStyle: "radial-gradient(circle at 30% 25%, #FFFFFF 0%, #484B54 24%, #101114 66%, #050505 100%)",
    code: "FP-REL-01",
  },
  {
    id: "rel-dreams",
    slug: "dreams",
    title: "DREAMS",
    type: { en: "Official Release", ru: "Официальный релиз" },
    year: "FOXPHASE Catalog",
    description: {
      en: "Deep spatial synthesis suspended between hypnotic atmosphere and nocturnal rhythm.",
      ru: "Глубокий пространственный синтез на грани гипнотической атмосферы и ночного ритма.",
    },
    yandexMusicUrl: "https://music.yandex.com/artist/21691221",
    coverStyle: "radial-gradient(circle at 70% 30%, #D2D4DC 0%, #2D3039 34%, #0B0C0E 74%, #050505 100%)",
    code: "FP-REL-02",
  },
  {
    id: "rel-last-breath",
    slug: "last-breath",
    title: "Last Breath",
    type: { en: "Official Release", ru: "Официальный релиз" },
    year: "FOXPHASE Catalog",
    description: {
      en: "Tension-driven dynamics with stark contrast, built for late-night headphone and club translation.",
      ru: "Напряжённая динамика и резкий контраст текстур, созданные для максимальной детализации звука.",
    },
    yandexMusicUrl: "https://music.yandex.com/artist/21691221",
    coverStyle: "radial-gradient(circle at 25% 70%, #E8E8E8 0%, #373A42 30%, #101114 70%, #050505 100%)",
    code: "FP-REL-03",
  },
  {
    id: "rel-forgotten-memories",
    slug: "forgotten-memories",
    title: "Forgotten Memories",
    type: { en: "Official Release", ru: "Официальный релиз" },
    year: "FOXPHASE Catalog",
    description: {
      en: "Cinematic introspection, dark ambient textures, and submerged melodic motifs.",
      ru: "Кинематографичная меланхолия, тёмные эмбиент-текстуры и глубокие мелодические линии.",
    },
    yandexMusicUrl: "https://music.yandex.com/artist/21691221",
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
    slug: "mp3-beat",
    index: "01",
    title: { en: "MP3 Beat Lease", ru: "MP3 Beat (Аренда)" },
    price: { en: "$15 / 1500 ₽", ru: "1500 ₽ / $15" },
    deliverables: {
      en: ["320kbps MP3 file", "Instant catalog selection", "Non-exclusive license"],
      ru: ["MP3 файл 320 kbps", "Выбор из каталога битов", "Неэксклюзивная лицензия"],
    },
    description: {
      en: "High-bitrate MP3 instrumental from the FOXPHASE catalog for demos, independent singles, and vocal recording sessions.",
      ru: "Качественный инструментал в формате MP3 из каталога FOXPHASE для записи вокала, демо и независимых релизов.",
    },
    topicValue: "Custom Beat",
  },
  {
    id: "srv-wav-beat",
    slug: "wav-beat",
    index: "02",
    title: { en: "WAV Beat Lease", ru: "WAV Beat (Студийный мастер)" },
    price: { en: "$20 / 2000 ₽", ru: "2000 ₽ / $20" },
    deliverables: {
      en: ["Uncompressed 24-bit WAV", "Studio-grade headroom", "Release-ready fidelity"],
      ru: ["Несжатый 24-bit WAV", "Студийная динамика", "Готовность к сведению и релизу"],
    },
    description: {
      en: "Uncompressed master-grade WAV instrumental with full frequency integrity for professional mixing and commercial streaming.",
      ru: "Несжатый WAV-исходник студийного качества с полной детализацией частот для профессионального сведения и площадок.",
    },
    topicValue: "Custom Beat",
  },
  {
    id: "srv-exclusive",
    slug: "exclusive-rights",
    index: "03",
    title: { en: "Exclusive Rights", ru: "Exclusive Rights (Эксклюзив)" },
    price: { en: "By Agreement", ru: "По договорённости" },
    deliverables: {
      en: ["Full ownership transfer terms", "WAV + Trackout Stems", "Removed from public store"],
      ru: ["Индивидуальный договор", "WAV + Поканальные стемы", "Снятие бита с продажи"],
    },
    description: {
      en: "Complete exclusive buyout of an instrumental from the catalog. Permanently retired from public licensing upon confirmation.",
      ru: "Полный выкуп эксклюзивных прав на бит с последующим изъятием из публичного каталога.",
    },
    topicValue: "Exclusive Rights",
  },
  {
    id: "srv-custom-beat",
    slug: "custom-beat",
    index: "04",
    title: { en: "Custom Beat Production", ru: "Custom Beat (Бит на заказ)" },
    price: { en: "By Agreement", ru: "По договорённости" },
    deliverables: {
      en: ["Bespoke sound architecture", "Tailored to your references", "Full stems & arrangement revisions"],
      ru: ["Индивидуальный продакшн с нуля", "Работа по вашим референсам", "Стемы и доработка аранжировки"],
    },
    description: {
      en: "Bespoke instrumental production engineered from scratch around your vocal tone, artistic direction, and sonic vision.",
      ru: "Создание уникального инструментала с нуля под ваш тембр, референсы и артистическое видение.",
    },
    topicValue: "Custom Beat",
  },
  {
    id: "srv-mixing",
    slug: "mixing",
    index: "05",
    title: { en: "Mixing", ru: "Mixing (Сведение)" },
    price: { en: "TBD / Upon Inquiry", ru: "Уточняется" },
    deliverables: {
      en: ["Vocal & stem balance", "Spatial depth & punch", "Analog-modeled processing"],
      ru: ["Баланс вокала и дорожек", "Глубина пространства и панч", "Детальная частотная обработка"],
    },
    description: {
      en: "Precision multi-track mixing focused on low-end weight, vocal presence, and dimensional clarity without flattening emotion.",
      ru: "Профессиональное сведение проекта: плотный низ, читаемость вокала и объёмное звучание.",
    },
    topicValue: "Mixing",
  },
  {
    id: "srv-mastering",
    slug: "mastering",
    index: "06",
    title: { en: "Mastering", ru: "Mastering (Мастеринг)" },
    price: { en: "TBD / Upon Inquiry", ru: "Уточняется" },
    deliverables: {
      en: ["Streaming LUFS optimization", "Club & car translation", "24-bit final master delivery"],
      ru: ["Оптимизация громкости и динамики", "Проверка транслируемости", "Финальный 24-bit мастер"],
    },
    description: {
      en: "Final-stage sonic polish ensuring maximum impact, tonal balance, and translation across club systems, headphones, and streaming.",
      ru: "Финальная стадия работы над треком для мощного и сбалансированного звучания на любых акустических системах.",
    },
    topicValue: "Mastering",
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
      "FOXPHASE engineers high-impact sonic architecture across Trap, Rage, Ambient, Phonk, House, and Experimental electronics — built for artists who refuse template culture.",
    explore: "EXPLORE BEATS",
    workWithMe: "WORK WITH ME",
    contact: "START A PROJECT",
    cart: "Cart",
    demo: "Catalog previews operate in verified studio mode — upload official audio previews via the Admin Panel.",
    latest: "SELECTED FREQUENCY",
    services: "BUILT AROUND THE RECORD",
    contactTitle: "LET'S ENGINEER SOMETHING THAT LASTS.",
    manual: "Orders run through server-validated manual confirmation until a live payment webhook is enabled.",
  },
  ru: {
    nav: ["Биты", "Лицензии", "Услуги", "Релизы", "Портфолио", "О продюсере", "Контакты"],
    heroEyebrow: "НЕЗАВИСИМЫЙ МУЗЫКАЛЬНЫЙ ПРОДЮСЕР · ОМСК / МИР",
    hero: "INDEPENDENT SOUND.\nNO LIMITS.",
    intro:
      "FOXPHASE создаёт бескомпромиссную звуковую архитектуру на стыке Trap, Rage, Ambient, Phonk, House и Experimental — для артистов с международными амбициями.",
    explore: "EXPLORE BEATS",
    workWithMe: "WORK WITH ME",
    contact: "НАЧАТЬ ПРОЕКТ",
    cart: "Корзина",
    demo: "Каталог работает в режиме подтверждённых материалов — загрузка аудио-превью осуществляется через админ-панель.",
    latest: "ИЗБРАННЫЕ ИНСТРУМЕНТАЛЫ",
    services: "ПРОДАКШН И УСЛУГИ",
    contactTitle: "СОЗДАДИМ ЗВУК, КОТОРЫЙ ОСТАНЕТСЯ.",
    manual: "Заказы проходят серверную валидацию и ручное подтверждение до подключения платёжного провайдера.",
  },
} as const;
