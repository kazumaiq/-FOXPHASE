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
  Check,
  Heart,
  ShieldCheck,
  Disc3,
  AlertCircle,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { beats, licenseDefinitions } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { InteractiveSonicCanvas } from "@/components/motion/interactive-sonic-canvas";
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
  } = useFoxphase();

  const isRu = locale === "ru";
  const [selectedTier, setSelectedTier] = useState<LicenseTierId>("basic");

  const isCurrent = player.currentBeat?.id === beat.id;
  const isPlaying = isCurrent && player.isPlaying;
  const fav = isFavorite(beat.id);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E8E8E8]">
      <InteractiveSonicCanvas />
      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-24">
        <Link
          href="/beats"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-[#85878D] transition hover:text-white"
        >
          <ArrowLeft size={14} />
          <span>{isRu ? "Назад в каталог битов" : "Back to Beat Store"}</span>
        </Link>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left: Sonic Artwork & Technical Telemetry */}
          <div className="space-y-6">
            <div
              className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/15 p-8 flex flex-col justify-between shadow-obsidian"
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
                    : "Preview Unassigned (Studio Mode)"}
                </span>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-white/75">
                    {beat.genre}
                  </p>
                  <h1 className="font-display text-3xl font-black uppercase tracking-tight text-white">
                    {beat.title}
                  </h1>
                </div>
                <Disc3 size={28} className="text-white/75" />
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="surface-card rounded-2xl p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                  BPM
                </span>
                <p className="mt-1 font-display text-xl font-bold text-white">
                  {beat.bpm}
                </p>
              </div>
              <div className="surface-card rounded-2xl p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                  KEY
                </span>
                <p className="mt-1 font-display text-xl font-bold text-white">
                  {beat.key}
                </p>
              </div>
              <div className="surface-card rounded-2xl p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                  {isRu ? "ДЛИТЕЛЬНОСТЬ" : "DURATION"}
                </span>
                <p className="mt-1 font-display text-xl font-bold text-white">
                  {beat.duration}
                </p>
              </div>
              <div className="surface-card rounded-2xl p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                  {isRu ? "СТАТУС" : "STATUS"}
                </span>
                <p className="mt-1 font-display text-sm font-bold uppercase text-white">
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
                <AlertCircle size={16} className="text-white shrink-0 mt-0.5" />
                <span>
                  {isRu
                    ? "Оригинальный аудиофайл для предпрослушивания загружается администратором через защищённую панель /admin. Мы принципиально не подменяем биты FOXPHASE сторонней стоковой музыкой."
                    : "Official preview audio is uploaded via the protected /admin dashboard. By strict producer policy, no stock or fake audio files are substituted."}
                </span>
              </div>
            )}
          </div>

          {/* Right: License Selection & Instant Checkout Integration */}
          <div className="surface-card rounded-3xl p-6 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#85878D]">
                    {beat.genre} · {beat.subgenre}
                  </span>
                  <h2 className="mt-2 font-display text-4xl font-black uppercase tracking-tight text-chrome md:text-5xl">
                    {beat.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#85878D]">
                    {isRu ? "Атмосфера:" : "Sonic Character:"} {beat.mood}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFavorite(beat.id)}
                  aria-label="Toggle favorite"
                  className="rounded-full border border-white/15 p-3 text-white transition hover:border-white"
                >
                  <Heart size={18} className={fav ? "fill-white" : ""} />
                </button>
              </div>

              <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.24em] text-[#85878D]">
                {isRu ? "ВЫБЕРИТЕ ТИП ЛИЦЕНЗИИ:" : "SELECT LICENSE TIER:"}
              </h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {licenseDefinitions.map((lic) => {
                  const active = selectedTier === lic.id;
                  return (
                    <button
                      key={lic.id}
                      type="button"
                      onClick={() => setSelectedTier(lic.id)}
                      className={`rounded-2xl border p-5 text-left transition ${
                        active
                          ? "border-white bg-white/[0.09] shadow-chrome-sm"
                          : "border-white/10 bg-[#050505]/70 hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#85878D]">
                          {isRu ? lic.badge.ru : lic.badge.en}
                        </span>
                        {active && <Check size={14} className="text-white" />}
                      </div>
                      <p className="mt-2 font-display text-lg font-bold text-white">
                        {isRu ? lic.name.ru : lic.name.en}
                      </p>
                      <p className="mt-1 font-mono text-sm font-semibold text-[#E8E8E8]">
                        {isRu ? lic.priceDisplay.ru : lic.priceDisplay.en}
                      </p>
                      <p className="mt-2 text-xs text-[#85878D]">
                        {lic.formats.join(" + ")}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active License Details Box */}
              {(() => {
                const currentLic =
                  licenseDefinitions.find((l) => l.id === selectedTier) ??
                  licenseDefinitions[0];
                return (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-[#050505]/90 p-5 text-xs leading-6 text-[#85878D]">
                    <p className="font-semibold text-white">
                      {isRu ? currentLic.name.ru : currentLic.name.en} —{" "}
                      {currentLic.formats.join(", ")}
                    </p>
                    <p className="mt-2">
                      {isRu ? currentLic.usageTerms.ru : currentLic.usageTerms.en}
                    </p>
                    <p className="mt-2 text-[11px] text-[#85878D]/80">
                      {isRu
                        ? currentLic.legalNotice.ru
                        : currentLic.legalNotice.en}
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* Action Footer */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              {selectedTier === "exclusive" ? (
                <Link
                  href={`/contact?topic=Exclusive%20Rights&beat=${encodeURIComponent(
                    beat.title
                  )}`}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#050505] shadow-chrome transition hover:bg-[#E8E8E8]"
                >
                  <span>
                    {isRu
                      ? "ЗАПРОСИТЬ ЭКСКЛЮЗИВНЫЕ ПРАВА"
                      : "REQUEST EXCLUSIVE RIGHTS AGREEMENT"}
                  </span>
                  <ArrowUpRight size={16} />
                </Link>
              ) : (
                <div className="flex w-full flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => addToCart(beat.id, selectedTier)}
                    className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#050505] shadow-chrome transition hover:bg-[#E8E8E8]"
                  >
                    <ShoppingBag size={16} />
                    <span>
                      {isRu ? "ДОБАВИТЬ В КОРЗИНУ" : "ADD LICENSE TO CART"}
                    </span>
                  </button>
                  <Link
                    href="/checkout"
                    onClick={() => addToCart(beat.id, selectedTier)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white transition hover:border-white"
                  >
                    <span>{isRu ? "Оформить" : "Checkout"}</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              )}

              <div className="flex w-full items-center justify-between text-[11px] text-[#85878D]">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-white" />
                  {isRu
                    ? "Выдача оригинальных файлов после подтверждения оплаты"
                    : "Protected file delivery after verified payment confirmation"}
                </span>
                <Link href="/licenses" className="underline underline-offset-4">
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
