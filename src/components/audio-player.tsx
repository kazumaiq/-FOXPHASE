"use client";

import React from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  ShoppingBag,
  AlertCircle,
  Disc3,
} from "lucide-react";
import { useFoxphase } from "@/components/providers/foxphase-provider";

function formatSeconds(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const mins = Math.floor(sec / 60);
  const rem = Math.floor(sec % 60);
  return `${mins}:${rem.toString().padStart(2, "0")}`;
}

export function GlobalAudioPlayer() {
  const {
    locale,
    player,
    togglePlay,
    seekTo,
    setVolume,
    toggleMute,
    nextBeat,
    prevBeat,
    closePlayer,
    addToCart,
  } = useFoxphase();

  const beat = player.currentBeat;
  if (!beat) return null;

  return (
    <aside
      aria-label="FOXPHASE Audio Player"
      className="fixed bottom-[calc(68px+env(safe-area-inset-bottom))] left-0 right-0 z-50 border-t border-white/15 bg-[#050505]/95 backdrop-blur-2xl shadow-[0_-20px_50px_rgba(0,0,0,0.9)] lg:bottom-0"
    >
      {/* Top interactive scrub bar */}
      <div
        className="group relative h-1.5 w-full cursor-pointer bg-white/10"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = ((e.clientX - rect.left) / rect.width) * 100;
          seekTo(pct);
        }}
      >
        <div
          className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-cyan-300 transition-all duration-150"
          style={{ width: `${player.progress}%` }}
        />
      </div>

      {/* Preview unavailable honest studio banner */}
      {player.previewUnavailableNotice && !beat.previewUrl && (
        <div className="border-b border-white/10 bg-[#101114] px-4 py-1.5 text-[11px] text-[#E8E8E8] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle size={13} className="text-[#85878D] shrink-0" />
            <span>
              {locale === "ru"
                ? `Аудио-превью для «${beat.title}» ещё не загружено продюсером. Фиктивные аудиофайлы не используются.`
                : `Audio preview for "${beat.title}" has not been uploaded yet. No fake or substitute audio is used.`}
            </span>
          </div>
          <Link
            href={`/beats/${beat.slug}`}
            className="underline underline-offset-4 text-white font-semibold shrink-0"
          >
            {locale === "ru" ? "Открыть карточку" : "Inspect Beat"}
          </Link>
        </div>
      )}

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-10">
        {/* Track Info */}
        <div className="flex min-w-0 flex-1 items-center gap-3.5">
          <div
            className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15"
            style={{ background: beat.coverGradient }}
          >
            <Disc3
              size={20}
              className={`text-white/85 ${player.isPlaying ? "animate-spin" : ""}`}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Link
                href={`/beats/${beat.slug}`}
                className="truncate font-display text-sm font-bold tracking-wider text-white hover:text-[#E8E8E8]"
              >
                {beat.title}
              </Link>
              <span className="hidden rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[#85878D] sm:inline-block">
                {beat.bpm} BPM · {beat.key}
              </span>
            </div>
            <p className="truncate text-xs text-[#85878D]">
              FOXPHASE · {beat.genre}
              {!beat.previewUrl && (
                <span className="ml-2 text-[10px] uppercase tracking-widest text-white/60">
                  [{locale === "ru" ? "Ожидает загрузки превью" : "Preview Unassigned"}]
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={prevBeat}
            aria-label="Previous beat"
            className="rounded-full p-2 text-[#85878D] transition hover:bg-white/10 hover:text-white"
          >
            <SkipBack size={16} />
          </button>

          <button
            onClick={togglePlay}
            aria-label={player.isPlaying ? "Pause" : "Play"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#050505] shadow-chrome-sm transition hover:scale-105"
          >
            {player.isPlaying ? <Pause size={17} /> : <Play size={17} className="ml-0.5" />}
          </button>

          <button
            onClick={nextBeat}
            aria-label="Next beat"
            className="rounded-full p-2 text-[#85878D] transition hover:bg-white/10 hover:text-white"
          >
            <SkipForward size={16} />
          </button>

          <div className="hidden items-center gap-1.5 font-mono text-xs text-[#85878D] md:flex">
            <span className="text-white">{formatSeconds(player.currentTime)}</span>
            <span>/</span>
            <span>{beat.duration}</span>
          </div>
        </div>

        {/* Volume & Quick License Action */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={toggleMute}
              aria-label="Mute toggle"
              className="text-[#85878D] hover:text-white"
            >
              {player.isMuted || player.volume === 0 ? (
                <VolumeX size={16} />
              ) : (
                <Volume2 size={16} />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={player.isMuted ? 0 : player.volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Volume"
              className="h-1 w-20 cursor-pointer accent-white"
            />
          </div>

          <button
            onClick={() => addToCart(beat.id, "basic")}
            aria-label={locale === "ru" ? "Купить MP3 за 1000 ₽" : "Buy MP3 for $15"}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-3 py-1.5 text-xs font-bold text-[#050505] transition hover:brightness-110"
          >
            <ShoppingBag size={13} />
            <span>{locale === "ru" ? "1000 ₽" : "$15"}</span>
          </button>

          <button
            onClick={closePlayer}
            aria-label="Close player"
            className="rounded-full p-1.5 text-[#85878D] hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
