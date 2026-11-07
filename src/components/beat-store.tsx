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
  const [selectedTiers, setSelectedTiers] = useState<Record<string, LicenseTierId>>(
    {}
  );

  const musicalKeys = useMemo(() => {
    const keys = Array.from(new Set(beats.map((b) => b.key)));
    return ["All", ...keys];
  }, []);

  const filteredBeats = useMemo(() => {
    return beats
      .filter((beat) => {
        if (genre !== "All" && !beat.genre.toLowerCase().includes(genre.toLowerCase())) {
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
          if (!matchTitle && !matchGenre && !matchMood && !matchKey) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        }
        if (sortBy === "bpm") {
          return b.bpm - a.bpm;
        }
        if (sortBy === "price") {
          return (a.licenses[0]?.price ?? 15) - (b.licenses[0]?.price ?? 15);
        }
        return b.popularity - a.popularity;
      });
  }, [genre, selectedKey, maxBpm, onlyFavorites, favorites, searchQuery, sortBy]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E8E8E8]">
      <InteractiveSonicCanvas />
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        {/* Header & Cart Summary */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <FadeUpBlock>
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.26em] text-[#85878D]">
                [FOXPHASE // OFFICIAL INSTRUMENTAL STORE]
              </p>
            </FadeUpBlock>
            <RevealHeading
              as="h1"
              text={isRu ? "КАТАЛОГ БИТОВ." : "FIND YOUR PHASE."}
              className="font-display text-5xl font-black uppercase tracking-[-0.04em] text-chrome md:text-7xl"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/licenses"
              className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-3 font-mono text-xs uppercase tracking-wider text-[#E8E8E8] transition hover:border-white/40 hover:text-white"
            >
              {isRu ? "Сравнить лицензии" : "Compare Licenses"}
            </Link>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] shadow-chrome-sm transition hover:bg-[#E8E8E8]"
            >
              <ShoppingBag size={15} />
              <span>
                {cart.length} {isRu ? "шт." : "items"} · ${cartTotal}
              </span>
            </Link>
          </div>
        </div>

        {/* Studio Integrity Notice */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-[#101114]/90 px-5 py-4 text-xs leading-6 text-[#85878D] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles size={15} className="text-white shrink-0" />
            <span>
              {isRu
                ? "Каталог подготовлен для загрузки реальных превью через /admin. Никакие сторонние или фиктивные аудиозаписи не подставляются."
                : "Catalogue records operate in strict producer integrity mode. Official audio previews and stems are managed via /admin — no fake substitute audio is used."}
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-white">
            MP3 $15 (1500 ₽) · WAV $20 (2000 ₽)
          </span>
        </div>

        {/* Genre Filter Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <SlidersHorizontal size={15} className="mr-2 text-[#85878D]" />
          {["All", ...genresList].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setGenre(item)}
              className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] transition ${
                genre === item
                  ? "bg-white text-[#050505] font-bold shadow-chrome-sm"
                  : "border border-white/15 bg-white/[0.02] text-[#E8E8E8] hover:border-white/40"
              }`}
            >
              {item === "All" && isRu ? "Все жанры" : item}
            </button>
          ))}
        </div>

        {/* Advanced Filter & Search Matrix */}
        <div className="mb-10 grid gap-3 rounded-2xl border border-white/10 bg-[#101114]/80 p-4 sm:grid-cols-2 lg:grid-cols-4">
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
              className="w-full rounded-xl border border-white/10 bg-[#050505] py-2.5 pl-10 pr-3 text-xs text-white placeholder:text-[#85878D] focus:border-white/40 focus:outline-none"
            />
          </label>

          {/* Key Filter */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#85878D] shrink-0">
              {isRu ? "Тональность:" : "Key:"}
            </span>
            <select
              aria-label="Filter by musical key"
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#050505] px-3 py-2.5 text-xs text-white focus:border-white/40 focus:outline-none"
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
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#85878D] shrink-0">
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
              className="w-full cursor-pointer accent-white"
            />
          </div>

          {/* Sort & Favorites */}
          <div className="flex items-center justify-between gap-2">
            <select
              aria-label="Sort beats"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "newest" | "popular" | "bpm" | "price")
              }
              className="w-full rounded-xl border border-white/10 bg-[#050505] px-3 py-2.5 text-xs text-white focus:border-white/40 focus:outline-none"
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
                  ? "border-white bg-white text-[#050505]"
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
          <div className="surface-card rounded-3xl p-12 text-center">
            <p className="font-display text-2xl font-bold text-white">
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
                  className="surface-card surface-card-hover group relative overflow-hidden rounded-3xl p-6 md:p-8"
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-25 blur-3xl transition group-hover:opacity-45"
                    style={{ background: beat.coverGradient }}
                  />

                  <div className="relative">
                    {/* Top Metadata Row */}
                    <div className="mb-6 flex items-center justify-between gap-2 font-mono text-xs uppercase tracking-widest text-[#85878D]">
                      <span>
                        {beat.genre} · {beat.subgenre}
                      </span>
                      <div className="flex items-center gap-3">
                        <span>
                          {beat.bpm} BPM · {beat.key}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(beat.id)}
                          aria-label={`Favorite ${beat.title}`}
                          className="rounded-full border border-white/10 p-1.5 text-[#E8E8E8] transition hover:border-white"
                        >
                          <Heart
                            size={14}
                            className={fav ? "fill-white text-white" : ""}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Title & Play Trigger */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => playBeat(beat)}
                          aria-label={`Play ${beat.title}`}
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.07] text-white transition hover:scale-105 hover:bg-white hover:text-[#050505]"
                        >
                          {isPlaying ? (
                            <Pause size={20} />
                          ) : (
                            <Play size={20} className="ml-0.5" />
                          )}
                        </button>
                        <div>
                          <Link
                            href={`/beats/${beat.slug}`}
                            className="font-display text-2xl font-black tracking-tight text-white hover:text-[#E8E8E8] md:text-3xl"
                          >
                            {beat.title}
                          </Link>
                          <p className="mt-1 text-xs text-[#85878D]">
                            {beat.mood} · {beat.duration} ·{" "}
                            {beat.previewUrl
                              ? isRu
                                ? "Доступно превью"
                                : "Preview Ready"
                              : isRu
                              ? "Без демо-аудио"
                              : "Studio Record"}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/beats/${beat.slug}`}
                        aria-label={`Open ${beat.title} page`}
                        className="rounded-full border border-white/15 p-2.5 text-[#85878D] transition hover:border-white hover:text-white"
                      >
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>

                    {/* License Selector Pills */}
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedTiers((prev) => ({
                            ...prev,
                            [beat.id]: "basic",
                          }))
                        }
                        className={`rounded-xl border px-3 py-2 text-left transition ${
                          activeTier === "basic"
                            ? "border-white bg-white/10 text-white"
                            : "border-white/10 bg-[#050505]/60 text-[#85878D] hover:border-white/30"
                        }`}
                      >
                        <span className="block font-mono text-[10px] uppercase">
                          MP3 Lease
                        </span>
                        <span className="font-display text-sm font-bold text-white">
                          $15{" "}
                          <span className="font-mono text-[10px] font-normal text-[#85878D]">
                            / 1500₽
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
                        className={`rounded-xl border px-3 py-2 text-left transition ${
                          activeTier === "premium"
                            ? "border-white bg-white/10 text-white"
                            : "border-white/10 bg-[#050505]/60 text-[#85878D] hover:border-white/30"
                        }`}
                      >
                        <span className="block font-mono text-[10px] uppercase">
                          WAV Master
                        </span>
                        <span className="font-display text-sm font-bold text-white">
                          $20{" "}
                          <span className="font-mono text-[10px] font-normal text-[#85878D]">
                            / 2000₽
                          </span>
                        </span>
                      </button>

                      <Link
                        href={`/contact?topic=Exclusive%20Rights&beat=${encodeURIComponent(
                          beat.title
                        )}`}
                        className="rounded-xl border border-white/10 bg-[#050505]/60 px-3 py-2 text-left transition hover:border-white/40"
                      >
                        <span className="block font-mono text-[10px] uppercase text-[#85878D]">
                          Exclusive
                        </span>
                        <span className="font-display text-xs font-bold text-[#E8E8E8]">
                          {isRu ? "По запросу" : "Inquire ↗"}
                        </span>
                      </Link>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
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
                          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#050505] transition hover:bg-[#E8E8E8]"
                        >
                          <Check size={14} />
                          <span>
                            {activeTier === "basic"
                              ? "Add Basic"
                              : "Add WAV ($20)"}
                          </span>
                        </button>
                        {inCart && (
                          <Link
                            href="/cart"
                            className="rounded-full border border-white/25 px-3 py-2 font-mono text-[11px] uppercase text-white hover:bg-white/10"
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
