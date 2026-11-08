import {
  AudioWaveform,
  Crown,
  FileAudio,
  InfinityIcon,
  Layers,
  type LucideIcon,
} from "lucide-react";
import type { LicenseTierId } from "@/types/foxphase";

/**
 * Single source of truth for license tiers in the storefront UI and checkout.
 * Prices match the official FOXPHASE Telegram price list.
 */
export interface LicenseMeta {
  id: LicenseTierId;
  medal: string;
  name: string;
  short: { en: string; ru: string };
  formats: { en: string; ru: string };
  priceUsd: number;
  priceRub: number;
  /** Exclusive rights are negotiated individually and are never paid online. */
  online: boolean;
  icon: LucideIcon;
  theme: {
    text: string;
    border: string;
    cardBorder: string;
    activeBg: string;
    softBg: string;
    ring: string;
    button: string;
    dot: string;
  };
}

export const licenseMeta: LicenseMeta[] = [
  {
    id: "basic",
    medal: "🥉",
    name: "MP3 LEASE",
    short: { en: "MP3", ru: "MP3" },
    formats: { en: "MP3 320 kbps · non-exclusive", ru: "MP3 320 kbps · неисключительная" },
    priceUsd: 15,
    priceRub: 1000,
    online: true,
    icon: FileAudio,
    theme: {
      text: "text-amber-300",
      border: "border-amber-400",
      cardBorder: "border-amber-500/35",
      activeBg: "bg-amber-500/20",
      softBg: "bg-amber-500/10",
      ring: "ring-amber-400/60",
      button: "bg-gradient-to-r from-amber-300 to-orange-400 text-[#050505]",
      dot: "bg-amber-400",
    },
  },
  {
    id: "premium",
    medal: "🥈",
    name: "WAV LEASE",
    short: { en: "WAV", ru: "WAV" },
    formats: { en: "WAV + MP3 · non-exclusive", ru: "WAV + MP3 · неисключительная" },
    priceUsd: 20,
    priceRub: 2000,
    online: true,
    icon: AudioWaveform,
    theme: {
      text: "text-cyan-300",
      border: "border-cyan-400",
      cardBorder: "border-cyan-500/35",
      activeBg: "bg-cyan-500/20",
      softBg: "bg-cyan-500/10",
      ring: "ring-cyan-400/60",
      button: "bg-gradient-to-r from-cyan-300 to-sky-400 text-[#050505]",
      dot: "bg-cyan-400",
    },
  },
  {
    id: "trackout",
    medal: "🥇",
    name: "TRACKOUT LEASE",
    short: { en: "STEMS", ru: "STEMS" },
    formats: { en: "WAV + MP3 + STEMS", ru: "WAV + MP3 + дорожки (STEMS)" },
    priceUsd: 70,
    priceRub: 5700,
    online: true,
    icon: Layers,
    theme: {
      text: "text-yellow-300",
      border: "border-yellow-400",
      cardBorder: "border-yellow-500/35",
      activeBg: "bg-yellow-500/20",
      softBg: "bg-yellow-500/10",
      ring: "ring-yellow-400/60",
      button: "bg-gradient-to-r from-yellow-200 to-amber-400 text-[#050505]",
      dot: "bg-yellow-400",
    },
  },
  {
    id: "unlimited",
    medal: "💎",
    name: "UNLIMITED LEASE",
    short: { en: "UNLIMITED", ru: "UNLIMITED" },
    formats: { en: "WAV + MP3 + STEMS · unlimited streams", ru: "WAV + MP3 + STEMS · без лимита стримов" },
    priceUsd: 120,
    priceRub: 9800,
    online: true,
    icon: InfinityIcon,
    theme: {
      text: "text-violet-300",
      border: "border-violet-400",
      cardBorder: "border-violet-500/35",
      activeBg: "bg-violet-500/20",
      softBg: "bg-violet-500/10",
      ring: "ring-violet-400/60",
      button: "bg-gradient-to-r from-violet-300 to-fuchsia-400 text-[#050505]",
      dot: "bg-violet-400",
    },
  },
  {
    id: "exclusive",
    medal: "👑",
    name: "EXCLUSIVE RIGHTS",
    short: { en: "EXCLUSIVE", ru: "ЭКСКЛЮЗИВ" },
    formats: { en: "Full rights · removed from sale", ru: "Полные права · бит снимается с продажи" },
    priceUsd: 350,
    priceRub: 29000,
    online: false,
    icon: Crown,
    theme: {
      text: "text-rose-300",
      border: "border-rose-400",
      cardBorder: "border-rose-500/35",
      activeBg: "bg-rose-500/20",
      softBg: "bg-rose-500/10",
      ring: "ring-rose-400/60",
      button: "bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 text-white",
      dot: "bg-rose-400",
    },
  },
];

export const onlineLicenses = licenseMeta.filter((l) => l.online);

export function getLicenseMeta(id: string): LicenseMeta {
  return licenseMeta.find((l) => l.id === id) ?? licenseMeta[0];
}

export function formatRub(value: number): string {
  return `${value.toLocaleString("ru-RU").replace(/\u00a0/g, " ")} ₽`;
}

export function formatUsd(value: number): string {
  return `$${value}`;
}

export function getCartTotals(items: { licenseId: string }[]) {
  return items.reduce(
    (acc, item) => {
      const meta = getLicenseMeta(item.licenseId);
      acc.rub += meta.priceRub;
      acc.usd += meta.priceUsd;
      return acc;
    },
    { rub: 0, usd: 0 }
  );
}

export const TELEGRAM_USERNAME = "FOXPHASE";

export function telegramLink(text?: string) {
  const base = `https://t.me/${TELEGRAM_USERNAME}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
