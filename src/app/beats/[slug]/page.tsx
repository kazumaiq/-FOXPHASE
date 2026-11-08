"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Play,
  Pause,
  ShoppingBag,
  ArrowLeft,
  ArrowUpRight,
  Heart,
  ShieldCheck,
  Disc3,
  AlertCircle,
  Send,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { beats, licenseDefinitions } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { InteractiveSonicCanvas } from "@/components/motion/interactive-sonic-canvas";
import { LicensePicker } from "@/components/shop/license-picker";
import { formatRub, formatUsd, getLicenseMeta, telegramLink } from "@/lib/shop";
import type { LicenseTierId } from "@/types/foxphase";

export default function BeatDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const beat = beats.find((b) => b.slug === slug || b.id === slug) ?? beats[0];

  const {
    locale,
    player,
    playBeat,
    addToCart,
    isFavorite,
    toggleFavorite,
    cart,
  } = useFoxphase();

  const isRu = locale === "ru";
  const [selectedTier, setSelectedTier] = useState<LicenseTierId>("basic");

  const isCurrent = player.currentBeat?.id === beat.id;
  const isPlaying = isCurrent && player.isPlaying;
  const fav = isFavorite(beat.id);
  const activeMeta = getLicenseMeta(selectedTier);
  const inCart = cart.some(
    (item) => item.beatId === beat.id && item.licenseId === selectedTier
  );

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] text-[#E8E8E8]">
      <InteractiveSonicCanvas />
      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-10 md:py-20">
        <Link
          href="/beats"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-[#85878D] transition hover:text-white"
        >
          <ArrowLeft size={14} />
          <span>{isRu ? "← Назад в каталог битов" : "← Back to Beat Store"}</span>
        </Link>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Left Column: Artwork, Player, Telemetry */}
          <div className="space-y-6">
            <div
              className={`relative aspect-square w-full overflow-hidden rounded-3xl border p-6 sm:p-8 flex flex-col justify-between shadow-obsidian ${activeMeta.theme.cardBorder}`}
              style={{ background: beat.coverGradient }}
            >
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.22em] text-white/80">
                <span>FOXPHASE // INSTRUMENTAL</span>
                <span>{beat.publishedAt}</span>
              </div>

              <div className="my-auto flex flex-col items-center justify-center text-center">
                <button
                  type="button"
                  onClick={() => playBeat(beat)}
                  aria-label={`Play ${beat.title}`}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#050505] shadow-chrome transition duration-300 hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause size={28} />
                  ) : (
                    <Play size={28} className="ml-1" />
                  )}
                </button>
                <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-white/90">
                  {beat.previewUrl
                    ? isRu
                      ? "Слушать превью"
                      : "Play Preview"
                    : isRu
                    ? "Превью ожидает загрузки в /admin"
                    : "Studio Record (Untagged)"}
                </span>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-amber-300">
                    {beat.genre} · {beat.bpm} BPM
                  </p>
                  <h1 className="break-words font-display text-2xl font-black uppercase tracking-tight text-white sm:text-4xl">
                    {beat.title}
                  </h1>
                </div>
                <Disc3 size={32} className="text-white/80" />
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="surface-card rounded-2xl p-4 border border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                  BPM
                </span>
                <p className="mt-1 font-display text-xl font-bold text-white">
                  {beat.bpm}
                </p>
              </div>
              <div className="surface-card rounded-2xl p-4 border border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                  KEY
                </span>
                <p className="mt-1 font-display text-xl font-bold text-cyan-300">
                  {beat.key}
                </p>
              </div>
              <div className="surface-card rounded-2xl p-4 border border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                  {isRu ? "ДЛИТЕЛЬНОСТЬ" : "DURATION"}
                </span>
                <p className="mt-1 font-display text-xl font-bold text-white">
                  {beat.duration}
                </p>
              </div>
              <div className="surface-card rounded-2xl p-4 border border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                  {isRu ? "СТАТУС" : "STATUS"}
                </span>
                <p className="mt-1 font-display text-sm font-bold uppercase text-emerald-300">
                  {beat.status === "available"
                    ? isRu
                      ? "Доступен"
                      : "Available"
                    : "Sold"}
                </p>
              </div>
            </div>

            {!beat.previewUrl && (
              <div className="rounded-2xl border border-white/10 bg-[#101114] p-4 text-xs leading-6 text-[#85878D] flex items-start gap-3">
                <AlertCircle size={16} className="text-amber-300 shrink-0 mt-0.5" />
                <span>
                  {isRu
                    ? "Оригинальный аудиофайл для предпрослушивания загружается администратором через защищённую панель /admin. FOXPHASE принципиально не подменяет треки сторонними файлами."
                    : "Original master preview files are securely uploaded via /admin. Producer integrity policy strictly forbids fake audio placeholders."}
                </span>
              </div>
            )}
          </div>

          {/* Right Column: License Selection & Instant Cart */}
          <div className="surface-card rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.24em] text-amber-300">
                    {beat.genre} · {beat.subgenre}
                  </span>
                  <h2 className="mt-2 break-words font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                    {beat.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#85878D]">
                    {isRu ? "Звуковой характер:" : "Sonic Character:"} {beat.mood}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFavorite(beat.id)}
                  aria-label="Toggle favorite"
                  className="rounded-full border border-white/15 p-3 text-white transition hover:border-rose-400 hover:text-rose-400"
                >
                  <Heart
                    size={20}
                    className={fav ? "fill-rose-500 text-rose-500" : ""}
                  />
                </button>
              </div>

              {/* License Picker */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#85878D]">
                    {isRu ? "ВЫБЕРИТЕ ВАРИАНТ ЛИЦЕНЗИИ:" : "SELECT LICENSE TIER:"}
                  </h3>
                  <Link
                    href="/licenses"
                    className="font-mono text-xs text-amber-300 hover:underline"
                  >
                    {isRu ? "Сравнить все права →" : "Compare tiers →"}
                  </Link>
                </div>

                <LicensePicker
                  value={selectedTier}
                  onChange={(id) => setSelectedTier(id)}
                  isRu={isRu}
                  beatTitle={beat.title}
                  includeExclusive={true}
                  size="lg"
                />
              </div>

              {/* Active License Details Box */}
              {(() => {
                const currentLic =
                  licenseDefinitions.find((l) => l.id === selectedTier) ??
                  licenseDefinitions[0];
                return (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-[#050505]/85 p-5 text-xs leading-6 text-[#85878D]">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="font-bold text-white text-sm">
                        {isRu ? currentLic.name.ru : currentLic.name.en}
                      </span>
                      <span className="font-display font-black text-white text-base">
                        {isRu ? formatRub(activeMeta.priceRub) : formatUsd(activeMeta.priceUsd)}
                      </span>
                    </div>
                    <p className="mt-3 text-white">
                      <strong>{isRu ? "Форматы:" : "Files:"}</strong> {currentLic.formats.join(" + ")}
                    </p>
                    <p className="mt-1.5">
                      {isRu ? currentLic.usageTerms.ru : currentLic.usageTerms.en}
                    </p>
                    <p className="mt-2 text-[11px] text-amber-200/80">
                      {isRu
                        ? currentLic.commercialUse.ru
                        : currentLic.commercialUse.en}
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* Action Footer */}
            <div className="mt-8 border-t border-white/10 pt-6">
              {selectedTier === "exclusive" ? (
                <a
                  href={telegramLink(
                    `Привет, FOXPHASE! Хочу обсудить покупку Exclusive Rights на бит «${beat.title}».`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 px-7 py-4 font-display text-xs font-black uppercase tracking-[0.2em] text-white shadow-lg transition hover:brightness-110"
                >
                  <Send size={16} />
                  <span>
                    {isRu
                      ? "ОБСУДИТЬ ЭКСКЛЮЗИВ В TELEGRAM (ОТ 29 000 ₽)"
                      : "REQUEST EXCLUSIVE AGREEMENT (FROM $350)"}
                  </span>
                  <ArrowUpRight size={16} />
                </a>
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => addToCart(beat.id, selectedTier)}
                    className={`inline-flex flex-1 items-center justify-center gap-2.5 rounded-2xl px-7 py-4 font-display text-xs font-black uppercase tracking-[0.2em] shadow-chrome transition hover:brightness-110 active:scale-[0.99] ${activeMeta.theme.button}`}
                  >
                    <ShoppingBag size={16} />
                    <span>
                      {inCart
                        ? isRu
                          ? "В КОРЗИНЕ (+1)"
                          : "IN CART (+1)"
                        : isRu
                        ? `ДОБАВИТЬ В КОРЗИНУ · ${formatRub(activeMeta.priceRub)}`
                        : `ADD TO CART · ${formatUsd(activeMeta.priceUsd)}`}
                    </span>
                  </button>

                  <Link
                    href="/checkout"
                    onClick={() => addToCart(beat.id, selectedTier)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/[0.04] px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white transition hover:border-white"
                  >
                    <span>{isRu ? "Оформить" : "Checkout"}</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-between text-[11px] text-[#85878D]">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  {isRu
                    ? "Выдача мастер-файлов сразу после подтверждения оплаты"
                    : "Protected file delivery after payment verification"}
                </span>
                <Link href="/licenses" className="underline underline-offset-4 hover:text-white">
                  {isRu ? "Все условия лицензий" : "Full license breakdown"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
