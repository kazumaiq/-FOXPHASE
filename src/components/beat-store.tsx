"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  ShoppingBag,
  Search,
  Heart,
  SlidersHorizontal,
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";
import { beats, genresList } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { RevealHeading, FadeUpBlock } from "@/components/motion/reveal-text";
import { InteractiveSonicCanvas } from "@/components/motion/interactive-sonic-canvas";
import type { LicenseTierId } from "@/types/foxphase";

export function BeatStore() {
  const {
    locale,
    cart,
    addToCart,
    cartTotal,
    favorites,
    toggleFavorite,
    isFavorite,
    player,
    playBeat,
  } = useFoxphase();

  const isRu = locale === "ru";

  const [genre, setGenre] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedKey, setSelectedKey] = useState<string>("All");
  const [maxBpm, setMaxBpm] = useState<number>(180);
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "bpm" | "price">(
    "popular"
  );
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [selectedTiers, setSelectedTiers] = useState<
    Record<string, LicenseTierId>
  >({});

  const musicalKeys = useMemo(() => {
    const keys = Array.from(new Set(beats.map((b) => b.key)));
    return ["All", ...keys];
  }, []);

  const filteredBeats = useMemo(() => {
    return beats
      .filter((beat) => {
        if (
          genre !== "All" &&
          !beat.genre.toLowerCase().includes(genre.toLowerCase())
        ) {
          return false;
        }
        if (selectedKey !== "All" && beat.key !== selectedKey) {
          return false;
        }
        if (beat.bpm > maxBpm) {
          return false;
        }
        if (onlyFavorites && !favorites.includes(beat.id)) {
          return false;
        }
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchTitle = beat.title.toLowerCase().includes(q);
          const matchGenre = beat.genre.toLowerCase().includes(q);
          const matchMood = beat.mood.toLowerCase().includes(q);
          const matchKey = beat.key.toLowerCase().includes(q);
          if (!matchTitle && !matchGenre && !matchMood && !matchKey)
            return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        }
        if (sortBy === "bpm") {
          return b.bpm - a.bpm;
        }
        if (sortBy === "price") {
          return (a.licenses[0]?.price ?? 15) - (b.licenses[0]?.price ?? 15);
        }
        return b.popularity - a.popularity;
      });
  }, [
    genre,
    selectedKey,
    maxBpm,
    onlyFavorites,
    favorites,
    searchQuery,
    sortBy,
  ]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] text-[#E8E8E8]">
      <InteractiveSonicCanvas />
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-10 md:py-24">
        {/* Header & Cart Summary */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-7">
          <div className="min-w-0">
            <FadeUpBlock>
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300 sm:text-xs">
                [FOXPHASE // OFFICIAL INSTRUMENTAL STORE]
              </p>
            </FadeUpBlock>
            <RevealHeading
              as="h1"
              text={isRu ? "КАТАЛОГ БИТОВ." : "FIND YOUR PHASE."}
              className="font-display text-[1.65rem] font-black uppercase tracking-[-0.04em] text-chrome sm:text-5xl md:text-7xl"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/licenses"
              className="rounded-full border border-cyan-400/35 bg-cyan-500/10 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-cyan-200 transition hover:bg-cyan-400 hover:text-[#050505]"
            >
              {isRu ? "Сравнить лицензии" : "Compare Licenses"}
            </Link>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] shadow-chrome-sm transition hover:bg-amber-300"
            >
              <ShoppingBag size={15} />
              <span>
                {cart.length} {isRu ? "шт." : "items"} · ${cartTotal}
              </span>
            </Link>
          </div>
        </div>

        {/* Multi-color Pricing Strip */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-amber-500/25 bg-gradient-to-r from-[#140A0D] via-[#0B0D16] to-[#110B1A] px-4 py-4 text-xs leading-6 text-[#E8E8E8] sm:px-6 lg:flex-row lg:items-center">
          <div className="flex items-start gap-3 sm:items-center">
            <Sparkles size={16} className="mt-1 shrink-0 text-amber-300 sm:mt-0" />
            <span>
              {isRu
                ? "🔥 БИТЫ ДОСТУПНЫ К ПОКУПКЕ! Выберите подходящий тариф лицензии прямо на карточке бита:"
                : "🔥 BEATS AVAILABLE FOR PURCHASE! Select your preferred license tier directly on any beat card:"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-[11px]">
            <span className="rounded-lg border border-amber-500/35 bg-amber-500/10 px-2.5 py-1 text-amber-200">
              🥉 MP3 1 000 ₽ ($15)
            </span>
            <span className="rounded-lg border border-cyan-400/35 bg-cyan-500/10 px-2.5 py-1 text-cyan-200">
              🥈 WAV 2 000 ₽ ($20)
            </span>
            <span className="rounded-lg border border-yellow-400/35 bg-yellow-500/10 px-2.5 py-1 text-yellow-200">
              🥇 STEMS 5 700 ₽ ($70)
            </span>
            <span className="rounded-lg border border-violet-400/35 bg-violet-500/10 px-2.5 py-1 text-violet-200">
              💎 UNLIM 9 800 ₽ ($120)
            </span>
          </div>
        </div>

        {/* Genre Filter Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <SlidersHorizontal size={15} className="mr-1 text-amber-300" />
          {["All", ...genresList].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setGenre(item)}
              className={`rounded-full px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition sm:px-4 sm:text-xs ${
                genre === item
                  ? "bg-gradient-to-r from-white to-amber-200 text-[#050505] font-bold shadow-chrome-sm"
                  : "border border-white/15 bg-white/[0.03] text-[#E8E8E8] hover:border-amber-400/50"
              }`}
            >
              {item === "All" && isRu ? "Все жанры" : item}
            </button>
          ))}
        </div>

        {/* Advanced Filter & Search Matrix */}
        <div className="mb-10 grid gap-3 rounded-2xl border border-white/10 bg-[#101114]/85 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search Input */}
          <label className="relative flex items-center">
            <Search size={15} className="absolute left-3.5 text-[#85878D]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isRu
                  ? "Поиск по названию, тональности, жанру..."
                  : "Search title, key, mood, genre..."
              }
              className="w-full rounded-xl border border-white/10 bg-[#050505] py-2.5 pl-10 pr-3 text-xs text-white placeholder:text-[#85878D] focus:border-amber-400/60 focus:outline-none"
            />
          </label>

          {/* Key Filter */}
          <div className="flex items-center gap-2">
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-[#85878D]">
              {isRu ? "Тональность:" : "Key:"}
            </span>
            <select
              aria-label="Filter by musical key"
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#050505] px-3 py-2.5 text-xs text-white focus:border-amber-400/60 focus:outline-none"
            >
              {musicalKeys.map((k) => (
                <option key={k} value={k}>
                  {k === "All" ? (isRu ? "Любая" : "All Keys") : k}
                </option>
              ))}
            </select>
          </div>

          {/* Max BPM Filter */}
          <div className="flex items-center gap-3 px-2">
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-cyan-300">
              BPM ≤ {maxBpm}
            </span>
            <input
              type="range"
              min={100}
              max={180}
              step={2}
              value={maxBpm}
              onChange={(e) => setMaxBpm(Number(e.target.value))}
              aria-label="Max BPM"
              className="w-full cursor-pointer accent-amber-400"
            />
          </div>

          {/* Sort & Favorites */}
          <div className="flex items-center justify-between gap-2">
            <select
              aria-label="Sort beats"
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "newest" | "popular" | "bpm" | "price"
                )
              }
              className="w-full rounded-xl border border-white/10 bg-[#050505] px-3 py-2.5 text-xs text-white focus:border-amber-400/60 focus:outline-none"
            >
              <option value="popular">
                {isRu ? "По популярности" : "Sort: Popularity"}
              </option>
              <option value="newest">
                {isRu ? "По дате добавления" : "Sort: Newest"}
              </option>
              <option value="bpm">{isRu ? "По темпу (BPM)" : "Sort: BPM"}</option>
              <option value="price">{isRu ? "По цене" : "Sort: Price"}</option>
            </select>

            <button
              type="button"
              onClick={() => setOnlyFavorites((prev) => !prev)}
              aria-label="Filter favorites"
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                onlyFavorites
                  ? "border-rose-400 bg-rose-500 text-white"
                  : "border-white/10 bg-[#050505] text-[#E8E8E8] hover:border-white/40"
              }`}
            >
              <Heart size={14} className={onlyFavorites ? "fill-current" : ""} />
              <span>{favorites.length}</span>
            </button>
          </div>
        </div>

        {/* Beats Grid */}
        {filteredBeats.length === 0 ? (
          <div className="surface-card rounded-3xl p-10 text-center">
            <p className="font-display text-xl font-bold text-white sm:text-2xl">
              {isRu ? "Инструменталы не найдены" : "No matching instrumentals"}
            </p>
            <p className="mt-2 text-sm text-[#85878D]">
              {isRu
                ? "Попробуйте сбросить фильтры или изменить поисковый запрос."
                : "Try resetting your filters or searching for another genre or key."}
            </p>
            <button
              type="button"
              onClick={() => {
                setGenre("All");
                setSelectedKey("All");
                setMaxBpm(180);
                setSearchQuery("");
                setOnlyFavorites(false);
              }}
              className="mt-6 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505]"
            >
              {isRu ? "Сбросить фильтры" : "Reset Filters"}
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredBeats.map((beat) => {
              const isCurrent = player.currentBeat?.id === beat.id;
              const isPlaying = isCurrent && player.isPlaying;
              const fav = isFavorite(beat.id);
              const activeTier = selectedTiers[beat.id] ?? "basic";
              const inCart = cart.some((item) => item.beatId === beat.id);

              return (
                <article
                  key={beat.id}
                  className="surface-card surface-card-hover group relative overflow-hidden rounded-3xl p-5 sm:p-7"
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-25 blur-3xl transition group-hover:opacity-45"
                    style={{ background: beat.coverGradient }}
                  />

                  <div className="relative">
                    {/* Top Metadata Row */}
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-[#85878D] sm:text-xs">
                      <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-amber-200">
                        {beat.genre} · {beat.subgenre}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-cyan-400/25 bg-cyan-950/30 px-2.5 py-1 text-cyan-200">
                          {beat.bpm} BPM · {beat.key}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(beat.id)}
                          aria-label={`Favorite ${beat.title}`}
                          className="rounded-full border border-white/15 p-1.5 text-[#E8E8E8] transition hover:border-rose-400 hover:text-rose-400"
                        >
                          <Heart
                            size={14}
                            className={fav ? "fill-rose-500 text-rose-500" : ""}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Title & Play Trigger (Wraps cleanly on 375px Mobile — Zero Clipping) */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-1 items-center gap-3.5">
                        <button
                          type="button"
                          onClick={() => playBeat(beat)}
                          aria-label={`Play ${beat.title}`}
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.08] text-white transition hover:scale-105 hover:bg-red-500 sm:h-14 sm:w-14"
                        >
                          {isPlaying ? (
                            <Pause size={19} />
                          ) : (
                            <Play size={19} className="ml-0.5" />
                          )}
                        </button>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/beats/${beat.slug}`}
                            className="block break-words font-display text-lg font-black uppercase leading-tight tracking-tight text-white transition hover:text-amber-300 sm:text-2xl"
                          >
                            {beat.title}
                          </Link>
                          <p className="mt-1 text-xs text-[#85878D]">
                            {beat.mood} · {beat.duration}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/beats/${beat.slug}`}
                        aria-label={`Open ${beat.title} page`}
                        className="shrink-0 rounded-full border border-white/15 p-2 text-[#85878D] transition hover:border-white hover:text-white"
                      >
                        <ArrowUpRight size={15} />
                      </Link>
                    </div>

                    {/* Color-Coded License Selector Pills */}
                    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedTiers((prev) => ({
                            ...prev,
                            [beat.id]: "basic",
                          }))
                        }
                        className={`rounded-xl border px-3 py-2.5 text-left transition ${
                          activeTier === "basic"
                            ? "border-amber-400 bg-amber-500/20 text-white shadow-sm"
                            : "border-white/10 bg-[#050505]/70 text-[#85878D] hover:border-amber-400/40"
                        }`}
                      >
                        <span className="block font-mono text-[10px] font-semibold uppercase text-amber-300">
                          🥉 MP3 Lease
                        </span>
                        <span className="font-display text-sm font-bold text-white">
                          $15{" "}
                          <span className="font-mono text-[10px] font-normal text-[#E8E8E8]/75">
                            / 1 000₽
                          </span>
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedTiers((prev) => ({
                            ...prev,
                            [beat.id]: "premium",
                          }))
                        }
                        className={`rounded-xl border px-3 py-2.5 text-left transition ${
                          activeTier === "premium"
                            ? "border-cyan-400 bg-cyan-500/20 text-white shadow-sm"
                            : "border-white/10 bg-[#050505]/70 text-[#85878D] hover:border-cyan-400/40"
                        }`}
                      >
                        <span className="block font-mono text-[10px] font-semibold uppercase text-cyan-300">
                          🥈 WAV Lease
                        </span>
                        <span className="font-display text-sm font-bold text-white">
                          $20{" "}
                          <span className="font-mono text-[10px] font-normal text-[#E8E8E8]/75">
                            / 2 000₽
                          </span>
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedTiers((prev) => ({
                            ...prev,
                            [beat.id]: "trackout",
                          }))
                        }
                        className={`rounded-xl border px-3 py-2.5 text-left transition ${
                          activeTier === "trackout"
                            ? "border-yellow-400 bg-yellow-500/20 text-white shadow-sm"
                            : "border-white/10 bg-[#050505]/70 text-[#85878D] hover:border-yellow-400/40"
                        }`}
                      >
                        <span className="block font-mono text-[10px] font-semibold uppercase text-yellow-300">
                          🥇 Trackout
                        </span>
                        <span className="font-display text-sm font-bold text-white">
                          $70{" "}
                          <span className="font-mono text-[10px] font-normal text-[#E8E8E8]/75">
                            / 5 700₽
                          </span>
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedTiers((prev) => ({
                            ...prev,
                            [beat.id]: "unlimited",
                          }))
                        }
                        className={`rounded-xl border px-3 py-2.5 text-left transition ${
                          activeTier === "unlimited"
                            ? "border-violet-400 bg-violet-500/20 text-white shadow-sm"
                            : "border-white/10 bg-[#050505]/70 text-[#85878D] hover:border-violet-400/40"
                        }`}
                      >
                        <span className="block font-mono text-[10px] font-semibold uppercase text-violet-300">
                          💎 Unlimited
                        </span>
                        <span className="font-display text-sm font-bold text-white">
                          $120{" "}
                          <span className="font-mono text-[10px] font-normal text-[#E8E8E8]/75">
                            / 9 800₽
                          </span>
                        </span>
                      </button>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <span className="text-xs text-[#85878D]">
                        From{" "}
                        <b className="text-white">
                          ${beat.licenses[0]?.price ?? 15}
                        </b>{" "}
                        · {beat.publishedAt}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => addToCart(beat.id, activeTier)}
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-white to-amber-200 px-4 py-2 text-xs font-bold text-[#050505] transition hover:brightness-110"
                        >
                          <Check size={14} />
                          <span>
                            {activeTier === "basic"
                              ? "Add Basic"
                              : activeTier === "premium"
                              ? "Add WAV ($20)"
                              : activeTier === "trackout"
                              ? "Add Trackout ($70)"
                              : "Add Unlimited ($120)"}
                          </span>
                        </button>
                        {inCart && (
                          <Link
                            href="/cart"
                            className="rounded-full border border-emerald-400/40 bg-emerald-950/40 px-3 py-2 font-mono text-[11px] uppercase text-emerald-200 hover:bg-emerald-500/20"
                          >
                            {isRu ? "В корзине" : "In Cart"}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
