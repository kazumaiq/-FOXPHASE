export type Genre = "Trap" | "Rage" | "Ambient" | "Phonk" | "House" | "Experimental";

export type LicenseTierId = "basic" | "premium" | "unlimited" | "exclusive";

export interface BeatLicenseOption {
  id: LicenseTierId;
  label: string;
  price: number;
  priceRub?: number;
  rights: string;
}

export interface Beat {
  id: string;
  slug: string;
  title: string;
  genre: Genre | string;
  subgenre?: string;
  bpm: number;
  key: string;
  duration: string;
  durationSeconds: number;
  mood: string;
  coverGradient: string;
  coverAccent: string;
  previewUrl: string | null;
  publishedAt: string;
  popularity: number;
  featured: boolean;
  status: "available" | "exclusive_sold" | "archived";
  tags: string[];
  licenses: BeatLicenseOption[];
}

export interface LicenseDefinition {
  id: LicenseTierId;
  name: { en: string; ru: string };
  badge: { en: string; ru: string };
  priceDisplay: { en: string; ru: string };
  priceUsd: number | null;
  priceRub: number | null;
  isCustomPrice: boolean;
  formats: string[];
  usageTerms: { en: string; ru: string };
  restrictions: { en: string; ru: string };
  commercialUse: { en: string; ru: string };
  publishingTerms: { en: string; ru: string };
  exclusiveInfo: { en: string; ru: string };
  legalNotice: { en: string; ru: string };
}

export interface ReleaseItem {
  id: string;
  slug: string;
  title: string;
  type: { en: string; ru: string };
  year: string;
  description: { en: string; ru: string };
  yandexMusicUrl: string;
  coverStyle: string;
  code: string;
}

export interface CollaborationArtist {
  id: string;
  name: string;
  index: string;
  role: { en: string; ru: string };
}

export interface ServiceItem {
  id: string;
  slug: string;
  index: string;
  title: { en: string; ru: string };
  price: { en: string; ru: string };
  deliverables: { en: string[]; ru: string[] };
  description: { en: string; ru: string };
  topicValue: "Collaboration" | "Custom Beat" | "Mixing" | "Mastering" | "Exclusive Rights";
}
