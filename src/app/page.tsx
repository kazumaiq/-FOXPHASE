"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Play,
  Pause,
  ShoppingBag,
  Sparkles,
  Disc3,
  Award,
  Orbit,
  Check,
  Crown,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  RevealHeading,
  ParallaxSection,
  FadeUpBlock,
  RevealCardMedia,
  Interactive3DTilt,
  MagneticWrap,
} from "@/components/motion/reveal-text";
import { InteractiveSonicCanvas } from "@/components/motion/interactive-sonic-canvas";
import { Canonical3DArtifact } from "@/components/motion/canonical-3d-artifact";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import {
  beats,
  releases,
  collaborationArtists,
  genresList,
  whyChooseFeatures,
} from "@/content/site";

const tierVisuals = [
  {
    id: "basic",
    medal: "🥉",
    name: "MP3 LEASE",
    badgeEn: "ENTRY LEASE",
    badgeRu: "БАЗОВАЯ АРЕНДА",
    priceRub: "1 000 ₽",
    priceUsd: "$15",
    accentBorder: "border-amber-500/35 hover:border-amber-400",
    accentGlow: "from-amber-500/20 via-orange-950/10 to-transparent",
    badgeStyle: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    btnStyle: "bg-white text-[#050505] hover:bg-amber-400",
    featuresEn: ["MP3 File (320 kbps)", "Non-exclusive license", "Instant catalog selection"],
    featuresRu: ["MP3-файл (320 kbps)", "Неисключительная лицензия", "Для демо и независимых релизов"],
    href: "/beats",
  },
  {
    id: "premium",
    medal: "🥈",
    name: "WAV LEASE",
    badgeEn: "STUDIO MASTER",
    badgeRu: "СТУДИЙНЫЙ МАСТЕР",
    priceRub: "2 000 ₽",
    priceUsd: "$20",
    accentBorder: "border-cyan-400/35 hover:border-cyan-300",
    accentGlow: "from-cyan-500/20 via-sky-950/10 to-transparent",
    badgeStyle: "border-cyan-400/40 bg-cyan-500/10 text-cyan-300",
    btnStyle: "bg-white text-[#050505] hover:bg-cyan-300",
    featuresEn: ["High-quality WAV + MP3", "Non-exclusive license", "Ready for vocal mixing"],
    featuresRu: ["MP3 + WAV высокого качества", "Неисключительная лицензия", "Чистый звук для сведения"],
    href: "/beats",
  },
  {
    id: "trackout",
    medal: "🥇",
    name: "TRACKOUT LEASE",
    badgeEn: "FULL STEMS",
    badgeRu: "ПОКАНАЛЬНЫЕ ДОРОЖКИ",
    priceRub: "5 700 ₽",
    priceUsd: "$70",
    accentBorder: "border-yellow-400/40 hover:border-yellow-300",
    accentGlow: "from-yellow-500/22 via-amber-950/10 to-transparent",
    badgeStyle: "border-yellow-400/45 bg-yellow-500/15 text-yellow-200",
    btnStyle: "bg-gradient-to-r from-yellow-300 to-amber-400 text-[#050505] hover:brightness-110",
    featuresEn: ["MP3 + WAV + Individual STEMS", "For professional mixing", "Full arrangement control"],
    featuresRu: ["MP3 + WAV + дорожки (STEMS)", "Для профессионального сведения", "Полный контроль над звуком"],
    href: "/beats",
  },
  {
    id: "unlimited",
    medal: "💎",
    name: "UNLIMITED LEASE",
    badgeEn: "UNLIMITED STREAMS",
    badgeRu: "БЕЗ ЛИМИТА НА СТРИМЫ",
    priceRub: "9 800 ₽",
    priceUsd: "$120",
    accentBorder: "border-violet-400/45 hover:border-violet-300",
    accentGlow: "from-violet-500/25 via-fuchsia-950/15 to-transparent",
    badgeStyle: "border-violet-400/45 bg-violet-500/15 text-violet-200",
    btnStyle: "bg-gradient-to-r from-violet-400 to-fuchsia-400 text-[#050505] hover:brightness-110",
    featuresEn: ["MP3 + WAV + STEMS", "Unlimited streams & plays", "Extended commercial license"],
    featuresRu: ["MP3 + WAV + STEMS", "Без лимита на прослушивания и стримы", "Расширенная коммерческая лицензия"],
    href: "/beats",
  },
];

export default function HomePage() {
  const { locale, playBeat, player, addToCart } = useFoxphase();
  const isRu = locale === "ru";

  const [dynamicCovers, setDynamicCovers] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/releases/artwork")
      .then((r) => r.json())
      .then((data) => {
        if (data?.covers) setDynamicCovers(data.covers);
      })
      .catch(() => {});
  }, []);

  const featuredBeats = beats.slice(0, 4);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] text-[#E8E8E8]">
      <InteractiveSonicCanvas />
      <SiteHeader />

      <main className="relative z-10 w-full overflow-x-hidden">
        {/* 01. CINEMATIC HERO SECTION */}
        <section className="relative flex min-h-[86vh] flex-col justify-between px-4 pb-12 pt-6 sm:px-6 md:px-10 md:pt-14">
          <div className="mx-auto w-full max-w-7xl">
            <FadeUpBlock>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-red-500/35 bg-gradient-to-r from-red-950/40 via-violet-950/30 to-transparent px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#E8E8E8] sm:text-[11px]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse" />
                  <span className="truncate">
                    {isRu
                      ? "FOXPHASE · ОМСК / МИРОВОЙ ПРОДАКШН"
                      : "FOXPHASE · OMSK / WORLDWIDE SOUND"}
                  </span>
                </div>
                <div className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#85878D] md:flex">
                  <span className="text-amber-300/90">ОФИЦИАЛЬНЫЙ САЙТ</span>
                  <span className="text-cyan-300/90">
                    5+ {isRu ? "ЛЕТ ОПЫТА" : "YEARS EXPERIENCE"}
                  </span>
                  <span className="text-red-400">STUDIO ARCHITECTURE</span>
                </div>
              </div>
            </FadeUpBlock>

            <div className="grid items-center gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:gap-12">
              <div className="w-full min-w-0">
                <FadeUpBlock>
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-red-400 sm:text-xs">
                    {isRu
                      ? "[01 // ОФИЦИАЛЬНАЯ ПЛАТФОРМА ПРОДЮСЕРА]"
                      : "[01 // OFFICIAL PRODUCER DIGITAL EXPERIENCE]"}
                  </div>
                </FadeUpBlock>

                <RevealHeading
                  as="h1"
                  text={isRu ? "НЕЗАВИСИМЫЙ ЗВУК." : "INDEPENDENT SOUND."}
                  className="font-display text-[1.55rem] font-black uppercase leading-[0.98] tracking-[-0.04em] text-chrome sm:text-5xl md:text-6xl xl:text-[5.2rem]"
                />
                <RevealHeading
                  as="h2"
                  delay={0.12}
                  text={isRu ? "БЕЗ ГРАНИЦ." : "NO LIMITS."}
                  className="mt-1.5 font-display text-[1.45rem] font-black uppercase leading-[0.98] tracking-[-0.04em] text-crimson-chrome sm:text-4xl md:text-5xl xl:text-[4.5rem]"
                />

                <FadeUpBlock delay={0.22}>
                  <p className="mt-5 max-w-xl text-sm leading-6 text-[#E8E8E8]/85 sm:mt-6 sm:text-base sm:leading-7">
                    {isRu
                      ? "Качественные авторские биты для артистов и исполнителей. Все инструменталы доступны в 5 вариантах лицензирования — от базовой аренды до эксклюзива. Создавай свою музыку. Остальное — моя работа."
                      : "High-quality original beats available for artists and performers. Choose from 5 licensing options, from basic leases to exclusive rights. Create your sound. I'll provide the beat."}
                  </p>
                </FadeUpBlock>

                <FadeUpBlock delay={0.3}>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
                    <MagneticWrap className="w-full sm:w-auto">
                      <Link
                        href="/beats"
                        className="group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-white via-[#F4F4F6] to-amber-200 px-6 py-4 font-display text-xs font-extrabold uppercase tracking-[0.16em] text-[#050505] shadow-chrome transition duration-300 hover:brightness-105 sm:w-auto sm:px-7"
                      >
                        <span>
                          {isRu ? "КАТАЛОГ БИТОВ" : "EXPLORE BEATS"}
                        </span>
                        <ArrowUpRight
                          size={17}
                          className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>
                    </MagneticWrap>

                    <MagneticWrap className="w-full sm:w-auto">
                      <Link
                        href="/contact"
                        className="flex w-full items-center justify-center gap-3 rounded-full border border-red-500/45 bg-gradient-to-r from-red-950/40 via-violet-950/30 to-red-950/30 px-6 py-4 font-display text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md transition duration-300 hover:border-red-400 sm:w-auto sm:px-7"
                      >
                        <span>
                          {isRu ? "СОТРУДНИЧЕСТВО" : "WORK WITH ME"}
                        </span>
                        <Sparkles size={15} className="shrink-0 text-amber-300" />
                      </Link>
                    </MagneticWrap>
                  </div>
                </FadeUpBlock>
              </div>

              {/* Official Chrome Emblem Card */}
              <ParallaxSection
                offset={30}
                className="mx-auto w-full max-w-md lg:max-w-none"
              >
                <RevealCardMedia>
                  <Interactive3DTilt intensity={10}>
                    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-red-500/30 bg-[#050505] shadow-crimson">
                      <Image
                        src="/brand/foxphase-logo-chrome.jpg"
                        alt="FOXPHASE Official Chrome Sculpture Logo"
                        fill
                        priority
                        sizes="(max-width: 768px) 92vw, 42vw"
                        className="object-contain object-center p-2 transition duration-700 ease-out group-hover:scale-105 sm:object-cover sm:p-0"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-red-950/20 opacity-85" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 rounded-2xl border border-white/15 bg-[#050505]/85 px-3.5 py-2.5 backdrop-blur-xl">
                        <div className="min-w-0">
                          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-amber-300 sm:text-[10px]">
                            {isRu ? "ОФИЦИАЛЬНАЯ ЭМБЛЕМА" : "SIGNATURE EMBLEM"}
                          </p>
                          <p className="truncate font-display text-[11px] font-bold uppercase tracking-wider text-white sm:text-xs">
                            FOXPHASE · OFFICIAL LOGO
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full border border-cyan-400/35 bg-cyan-950/30 px-2.5 py-1 font-mono text-[10px] text-cyan-200">
                          OMSK · RU
                        </span>
                      </div>
                    </div>
                  </Interactive3DTilt>
                </RevealCardMedia>
              </ParallaxSection>
            </div>

            {/* Sonic Directions Pill Matrix */}
            <FadeUpBlock delay={0.36}>
              <div className="mt-10 border-t border-white/10 pt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#85878D] sm:text-[11px]">
                    {isRu ? "ОСНОВНЫЕ ЖАНРЫ И СТИЛИ:" : "CORE SONIC DIRECTIONS:"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {genresList.map((genre, i) => {
                      const accents = [
                        "hover:border-red-400 hover:bg-red-500/20 hover:text-red-200",
                        "hover:border-amber-400 hover:bg-amber-500/20 hover:text-amber-200",
                        "hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-200",
                        "hover:border-violet-400 hover:bg-violet-500/20 hover:text-violet-200",
                      ];
                      return (
                        <Link
                          key={genre}
                          href={`/beats?genre=${genre}`}
                          className={`rounded-full border border-white/15 bg-[#101114]/90 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#E8E8E8] transition ${
                            accents[i % accents.length]
                          }`}
                        >
                          {genre}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </FadeUpBlock>
          </div>
        </section>

        {/* 02. KINETIC SONIC MARQUEE */}
        <section
          aria-label="Sonic identity ticker"
          className="overflow-hidden border-y border-red-500/20 bg-gradient-to-r from-[#12070A] via-[#0B0914] to-[#12070A] py-3.5 backdrop-blur-md"
        >
          <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap font-display text-[11px] font-bold uppercase tracking-[0.24em] text-[#E8E8E8]">
            {Array.from({ length: 2 }).map((_, loopIndex) => (
              <React.Fragment key={loopIndex}>
                <span className="text-red-400">PRODUCED BY FOXPHASE</span>
                <span>•</span>
                <span className="text-amber-300">🥉 MP3 LEASE — 1 000 ₽ / $15</span>
                <span>•</span>
                <span className="text-cyan-300">🥈 WAV LEASE — 2 000 ₽ / $20</span>
                <span>•</span>
                <span className="text-yellow-300">🥇 TRACKOUT LEASE — 5 700 ₽ / $70</span>
                <span>•</span>
                <span className="text-violet-300">💎 UNLIMITED LEASE — 9 800 ₽ / $120</span>
                <span>•</span>
                <span className="text-rose-400">👑 EXCLUSIVE RIGHTS — от 29 000 ₽ / $350</span>
                <span>•</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* 03. FEATURED INSTRUMENTALS (FIXED MOBILE TRUNCATION — ZERO CLIPPING) */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-10 md:py-24">
          <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300">
                {isRu ? "ПРОДАЖА АВТОРСКИХ БИТОВ" : "BEATS FOR SALE"}
              </p>
              <RevealHeading
                as="h2"
                text={
                  isRu ? "ИЗБРАННЫЕ БИТЫ." : "FEATURED INSTRUMENTALS."
                }
                className="font-display text-[1.5rem] font-black uppercase tracking-[-0.04em] text-chrome sm:text-5xl"
              />
            </div>
            <Link
              href="/beats"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-amber-200 transition hover:bg-amber-400 hover:text-[#050505]"
            >
              <span>
                {isRu ? "ВЕСЬ КАТАЛОГ БИТОВ" : "OPEN FULL BEAT STORE"}
              </span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {featuredBeats.map((beat, idx) => {
              const isCurrent = player.currentBeat?.id === beat.id;
              const isPlaying = isCurrent && player.isPlaying;
              const accentColors = [
                "from-red-500/30 via-amber-500/10 to-transparent",
                "from-cyan-500/25 via-blue-500/10 to-transparent",
                "from-violet-500/30 via-fuchsia-500/10 to-transparent",
                "from-amber-500/25 via-red-500/10 to-transparent",
              ];
              const badgeColors = [
                "border-red-500/35 bg-red-500/10 text-red-300",
                "border-cyan-400/35 bg-cyan-500/10 text-cyan-300",
                "border-violet-400/35 bg-violet-500/10 text-violet-300",
                "border-amber-400/35 bg-amber-500/10 text-amber-300",
              ];

              return (
                <FadeUpBlock key={beat.id} delay={idx * 0.07}>
                  <div className="surface-card surface-card-hover group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-5 sm:p-7">
                    <div
                      className={`pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br ${
                        accentColors[idx % accentColors.length]
                      } blur-2xl`}
                    />

                    {/* Top Meta Row: Play Button + Genre Badge + Duration */}
                    <div className="relative flex items-center justify-between gap-2">
                      <span
                        className={`rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                          badgeColors[idx % badgeColors.length]
                        }`}
                      >
                        {beat.genre} · {beat.bpm} BPM · {beat.key}
                      </span>
                      <span className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-[#E8E8E8]">
                        {beat.duration}
                      </span>
                    </div>

                    {/* Title & Play Trigger Row (Wraps cleanly on Mobile — Never clipped!) */}
                    <div className="relative mt-4 flex items-center gap-3.5">
                      <button
                        type="button"
                        onClick={() => playBeat(beat)}
                        aria-label={`Preview ${beat.title}`}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-white shadow-chrome-sm transition duration-300 hover:scale-105 hover:bg-red-500 sm:h-14 sm:w-14"
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
                          {beat.mood}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Waveform Visualization */}
                    <div
                      onClick={() => playBeat(beat)}
                      className="relative my-5 flex h-11 w-full cursor-pointer items-end gap-1 overflow-hidden rounded-xl border border-white/10 bg-[#050505]/75 px-3 py-2"
                    >
                      {Array.from({ length: 24 }).map((_, barIdx) => {
                        const heightPct =
                          24 + ((barIdx * 19 + idx * 13) % 72);
                        return (
                          <span
                            key={barIdx}
                            style={{ height: `${heightPct}%` }}
                            className={`flex-1 rounded-full transition-all duration-300 ${
                              isCurrent
                                ? "bg-gradient-to-t from-red-500 to-amber-300"
                                : "bg-white/25 group-hover:bg-red-400/65"
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* Bottom Action Row */}
                    <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">
                          🥉 MP3 LEASE
                        </span>
                        <span className="font-display text-lg font-bold text-white">
                          {isRu ? "1 000 ₽ " : "$15 "}
                          <span className="font-mono text-xs font-normal text-[#85878D]">
                            {isRu ? "/ $15" : "/ 1 000 ₽"}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/beats/${beat.slug}`}
                          className="rounded-full border border-white/15 px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider text-[#E8E8E8] transition hover:border-white hover:text-white"
                        >
                          {isRu ? "О бите" : "Details"}
                        </Link>
                        <button
                          type="button"
                          onClick={() => addToCart(beat.id, "basic")}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#050505] transition hover:bg-amber-300"
                        >
                          <ShoppingBag size={13} />
                          <span>{isRu ? "В корзину" : "Add MP3"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeUpBlock>
              );
            })}
          </div>
        </section>

        {/* 04. OFFICIAL RELEASES WITH REAL STREAMING / SPOTIFY ARTWORK */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-10 md:py-24">
          <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300">
                {`[03 // ${
                  isRu
                    ? "ОФИЦИАЛЬНАЯ ДИСКОГРАФИЯ · ОБЛОЖКИ СО СТРИМИНГА"
                    : "OFFICIAL DISCOGRAPHY · LIVE STREAMING ARTWORK"
                }]`}
              </p>
              <RevealHeading
                as="h2"
                text={isRu ? "КЛЮЧЕВЫЕ РЕЛИЗЫ." : "SIGNATURE RELEASES."}
                className="font-display text-[1.5rem] font-black uppercase tracking-[-0.04em] text-chrome sm:text-5xl"
              />
            </div>
            <a
              href="https://music.yandex.com/artist/21691221"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-cyan-200 transition hover:bg-cyan-400 hover:text-[#050505]"
            >
              <span>
                {isRu ? "СЛУШАТЬ НА ЯНДЕКС МУЗЫКЕ" : "YANDEX MUSIC PROFILE"}
              </span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {releases.map((rel, idx) => {
              const coverSrc = dynamicCovers[rel.slug] || rel.coverUrl;
              return (
                <FadeUpBlock key={rel.id} delay={idx * 0.08}>
                  <Interactive3DTilt intensity={7} className="h-full">
                    <div className="surface-card surface-card-hover group flex h-full flex-col justify-between rounded-3xl p-5">
                      <div>
                        <RevealCardMedia delay={idx * 0.05}>
                          <div className="relative mb-5 aspect-square w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0A0B0E]">
                            <Image
                              src={coverSrc}
                              alt={`${rel.title} — FOXPHASE Official Cover`}
                              fill
                              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24vw"
                              className="object-cover transition duration-700 group-hover:scale-105"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-black/30" />
                            <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
                              <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 font-mono text-[10px] text-white backdrop-blur-md">
                                {rel.code}
                              </span>
                              <span className="rounded-full border border-emerald-400/40 bg-emerald-950/70 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                                ОФИЦИАЛЬНЫЙ РЕЛИЗ
                              </span>
                            </div>
                            <div className="absolute bottom-3 left-3 right-3">
                              <p className="font-display text-xl font-black uppercase tracking-tight text-white drop-shadow">
                                {rel.title}
                              </p>
                            </div>
                          </div>
                        </RevealCardMedia>

                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                          {isRu ? rel.type.ru : rel.type.en}
                        </span>
                        <h3 className="mt-1 font-display text-xl font-bold text-white">
                          {rel.title}
                        </h3>
                        <p className="mt-2 text-xs leading-6 text-[#85878D]">
                          {isRu ? rel.description.ru : rel.description.en}
                        </p>
                      </div>

                      <a
                        href={rel.yandexMusicUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs uppercase tracking-wider text-[#E8E8E8] group-hover:text-cyan-300"
                      >
                        <span>
                          {isRu ? "Слушать релиз" : "Stream Release"}
                        </span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </Interactive3DTilt>
                </FadeUpBlock>
              );
            })}
          </div>
        </section>

        {/* 05. REDESIGNED LUXURY COLOR-ACCENTED PRICING & LICENSING CARDS */}
        <section className="border-y border-white/10 bg-[#07060B]/95 px-4 py-20 sm:px-6 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300">
                  {`[04 // ${
                    isRu
                      ? "🎧 ПРОДАЖА БИТОВ · ОФИЦИАЛЬНЫЙ ПРАЙС"
                      : "🎧 BEATS FOR SALE · OFFICIAL PRICING"
                  }]`}
                </p>
                <RevealHeading
                  as="h2"
                  text={
                    isRu
                      ? "ТАРИФЫ И ЛИЦЕНЗИИ."
                      : "LICENSING TIERS & PRICING."
                  }
                  className="font-display text-[1.5rem] font-black uppercase tracking-[-0.04em] text-chrome sm:text-5xl"
                />
              </div>
              <p className="max-w-xl text-sm leading-6 text-[#85878D]">
                {isRu
                  ? "Все инструменталы доступны в 5 вариантах лицензирования — от базовой аренды MP3 до полного выкупа эксклюзивных прав (Exclusive Rights)."
                  : "All instrumentals are available across 5 transparent licensing tiers — from MP3 Lease to full 1-of-1 Exclusive Rights buyout."}
              </p>
            </div>

            {/* 4 Lease Tier Cards with Rich Color Accents (Bronze, Silver/Cyan, Gold, Diamond/Violet) */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {tierVisuals.map((tier, idx) => (
                <FadeUpBlock key={tier.id} delay={idx * 0.06}>
                  <div
                    className={`surface-card relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border p-6 transition duration-300 ${tier.accentBorder}`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b ${tier.accentGlow}`}
                    />

                    <div className="relative">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-2xl">{tier.medal}</span>
                        <span
                          className={`rounded-full border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${tier.badgeStyle}`}
                        >
                          {isRu ? tier.badgeRu : tier.badgeEn}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-2xl font-black uppercase tracking-tight text-white">
                        {tier.name}
                      </h3>

                      {/* Large High-Contrast Price Display */}
                      <div className="mt-4 flex items-baseline gap-2 border-b border-white/10 pb-5">
                        <span className="font-display text-3xl font-black text-white sm:text-4xl">
                          {isRu ? tier.priceRub : tier.priceUsd}
                        </span>
                        <span className="font-mono text-sm text-[#85878D]">
                          / {isRu ? tier.priceUsd : tier.priceRub}
                        </span>
                      </div>

                      <ul className="mt-5 space-y-2.5 text-xs text-[#E8E8E8]">
                        {(isRu ? tier.featuresRu : tier.featuresEn).map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <Check
                              size={14}
                              className="mt-0.5 shrink-0 text-white"
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={tier.href}
                      className={`relative mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition ${tier.btnStyle}`}
                    >
                      <span>
                        {isRu ? "Выбрать бит" : "Select Beat"}
                      </span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </FadeUpBlock>
              ))}
            </div>

            {/* 5th Tier: Flagship EXCLUSIVE RIGHTS Banner */}
            <FadeUpBlock delay={0.22}>
              <div className="mt-6 relative overflow-hidden rounded-3xl border border-rose-500/45 bg-gradient-to-r from-[#1A080C] via-[#12091A] to-[#0A0A10] p-6 sm:p-8 md:p-10 shadow-crimson">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rose-500/20 blur-3xl" />

                <div className="relative grid items-center gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/15 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-rose-200">
                      <Crown size={13} className="text-amber-300" />
                      <span>
                        {isRu
                          ? "👑 ПОЛНЫЙ ВЫКУП ПРАВ · БИТ СНИМАЕТСЯ С ПРОДАЖИ"
                          : "👑 1-OF-1 FULL OWNERSHIP · REMOVED FROM STORE"}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-black uppercase text-white sm:text-4xl">
                      👑 EXCLUSIVE RIGHTS
                    </h3>
                    <p className="mt-2 max-w-2xl text-xs leading-6 text-[#E8E8E8]/85 sm:text-sm">
                      {isRu
                        ? "Эксклюзивная лицензия. После сделки бит снимается с дальнейшей продажи. Условия передачи прав обсуждаются индивидуально."
                        : "Exclusive license. The beat will be removed from future sales after purchase. Rights and transfer conditions are discussed individually."}
                    </p>
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
                    <div className="lg:text-right">
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-rose-300">
                        {isRu ? "СТОИМОСТЬ ЭКСКЛЮЗИВА" : "EXCLUSIVE BUYOUT"}
                      </span>
                      <span className="font-display text-3xl font-black text-white sm:text-4xl">
                        {isRu ? "от 29 000 ₽" : "from $350"}
                      </span>
                      <span className="ml-2 font-mono text-xs text-[#85878D]">
                        {isRu ? "/ $350" : "/ от 29 000 ₽"}
                      </span>
                    </div>

                    <Link
                      href="/contact?topic=Exclusive%20Rights"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:brightness-110 sm:w-auto"
                    >
                      <span>
                        {isRu ? "Обсудить эксклюзив" : "Request Exclusive Rights"}
                      </span>
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeUpBlock>

            {/* Why Choose My Beats Feature Strip */}
            <FadeUpBlock delay={0.28}>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {(isRu ? whyChooseFeatures.ru : whyChooseFeatures.en).map(
                  (reason, idx) => (
                    <div
                      key={reason}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs leading-5 text-[#E8E8E8]"
                    >
                      <span className="mb-1.5 block font-mono text-[10px] text-amber-300">
                        {`ПРЕИМУЩЕСТВО 0${idx + 1}`}
                      </span>
                      {reason}
                    </div>
                  )
                )}
              </div>
            </FadeUpBlock>
          </div>
        </section>

        {/* 06. INTERACTIVE 3D CANONICAL OBJECTS + ACHIEVEMENTS */}
        <section className="px-4 py-20 sm:px-6 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-violet-300">
                  {`[05 // ${
                    isRu ? "ДОСТИЖЕНИЯ И 3D ЯДРО" : "MILESTONES & 3D CORE"
                  }]`}
                </p>
                <RevealHeading
                  as="h2"
                  text={
                    isRu
                      ? "МАСШТАБ И ПРИЗНАНИЕ."
                      : "CAREER SIGNAL & RECOGNITION."
                  }
                  className="font-display text-[1.5rem] font-black uppercase tracking-[-0.04em] text-chrome sm:text-5xl"
                />
                <p className="mt-4 text-sm leading-7 text-[#85878D]">
                  {isRu
                    ? "За 5 лет продакшна (включая период FOXMXNAXM) музыка FOXPHASE собрала более 1–2 миллионов прослушиваний и получила физическую награда-плейку за 100 000+ стримов."
                    : "Across 5 years of production (including releases as FOXMXNAXM), FOXPHASE has accumulated ~1–2M streams and earned a 100,000+ streams milestone award."}
                </p>

                <div className="mt-6">
                  <Canonical3DArtifact
                    label={
                      isRu
                        ? "3D АКУСТИЧЕСКОЕ ЯДРО FOXPHASE"
                        : "ИНТЕРАКТИВНЫЙ 3D ОБЪЕКТ"
                    }
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                <ParallaxSection offset={24}>
                  <div className="surface-glass rounded-3xl border border-cyan-500/25 p-7 sm:p-8">
                    <Disc3 size={28} className="mb-5 text-cyan-300" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-200/80">
                      {isRu
                        ? "СУММАРНЫЕ ПРОСЛУШИВАНИЯ"
                        : "APPROXIMATE CAREER STREAMS"}
                    </p>
                    <p className="mt-3 font-display text-5xl font-black tracking-tight text-chrome sm:text-6xl">
                      ~1–2M
                    </p>
                    <p className="mt-4 text-xs leading-6 text-[#85878D] sm:text-sm">
                      {isRu
                        ? "Около 1–2 миллионов суммарных прослушиваний за музыкальную карьеру на стриминговых площадках."
                        : "Approximately 1–2 million cumulative career streams across global digital platforms."}
                    </p>
                  </div>
                </ParallaxSection>

                <ParallaxSection offset={-24}>
                  <div className="surface-glass rounded-3xl border border-amber-500/25 p-7 sm:p-8">
                    <Award size={28} className="mb-5 text-amber-300" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-200/80">
                      {isRu
                        ? "МУЗЫКАЛЬНАЯ НАГРАДА / ПЛЕЙКА"
                        : "STREAMING PLAQUE / AWARD"}
                    </p>
                    <p className="mt-3 font-display text-5xl font-black tracking-tight text-crimson-chrome sm:text-6xl">
                      100,000+
                    </p>
                    <p className="mt-4 text-xs leading-6 text-[#85878D] sm:text-sm">
                      {isRu
                        ? "Официальная музыкальная плейка за достижение отметки в 100 000 прослушиваний."
                        : "Awarded a physical milestone plaque commemorating 100,000+ verified streams."}
                    </p>
                  </div>
                </ParallaxSection>
              </div>
            </div>
          </div>
        </section>

        {/* 07. COLLABORATIONS MATRIX */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-10 md:py-24">
          <div className="mb-10 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-red-400">
                {`[06 // ${
                  isRu ? "ПОРТФОЛИО И КОЛЛАБОРАЦИИ" : "COLLABORATION NETWORK"
                }]`}
              </p>
              <RevealHeading
                as="h2"
                text={isRu ? "СОВМЕСТНЫЕ РАБОТЫ." : "TRUSTED BY ARTISTS."}
                className="font-display text-[1.5rem] font-black uppercase tracking-[-0.04em] text-chrome sm:text-5xl"
              />
            </div>
            <Link
              href="/collaborations"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#E8E8E8] hover:text-amber-300"
            >
              <span>{isRu ? "Все артисты" : "Explore Portfolio"}</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {collaborationArtists.map((artist, idx) => (
              <FadeUpBlock key={artist.id} delay={idx * 0.03}>
                <div className="surface-card surface-card-hover flex items-center justify-between rounded-2xl px-4 py-4 sm:px-5">
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] text-amber-300">
                      {`АРТИСТ ${artist.index}`}
                    </span>
                    <p className="mt-1 truncate font-display text-sm font-bold tracking-wide text-white sm:text-lg">
                      {artist.name}
                    </p>
                  </div>
                  <Orbit size={14} className="shrink-0 text-cyan-400/50" />
                </div>
              </FadeUpBlock>
            ))}
          </div>
        </section>

        {/* 08. FINAL CONTACT / COLLABORATION MONOLITH CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 md:px-10">
          <ParallaxSection offset={20}>
            <div className="surface-glass relative overflow-hidden rounded-3xl border border-red-500/30 p-6 sm:p-10 md:p-14">
              <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-red-600/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl" />

              <div className="relative grid items-center gap-8 lg:grid-cols-[1.35fr_0.65fr]">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300">
                    {`[07 // ${
                      isRu ? "ПРЯМАЯ СВЯЗЬ С ПРОДЮСЕРОМ" : "DIRECT STUDIO LINE"
                    }]`}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-black uppercase leading-tight tracking-[-0.03em] text-chrome sm:text-4xl md:text-5xl">
                    {isRu
                      ? "СОЗДАВАЙ СВОЮ МУЗЫКУ. ОСТАЛЬНОЕ — МОЯ РАБОТА."
                      : "CREATE YOUR SOUND. I'LL PROVIDE THE BEAT."}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-[#85878D] sm:text-base">
                    {isRu
                      ? "📩 По вопросам покупки битов, лицензирования и индивидуальных заказов пишите в Direct / Telegram или оставьте заявку на сайте."
                      : "📩 For purchases, licensing and custom inquiries, feel free to send a DM on Telegram or submit a studio request."}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-display text-xs font-extrabold uppercase tracking-[0.16em] text-[#050505] shadow-chrome transition hover:bg-amber-300 sm:w-auto"
                  >
                    <span>
                      {isRu ? "ОСТАВИТЬ ЗАЯВКУ" : "START A PROJECT"}
                    </span>
                    <ArrowUpRight size={16} />
                  </Link>
                  <a
                    href="https://t.me/FOXPHASE"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-500/45 bg-red-950/30 px-7 py-4 font-mono text-xs uppercase tracking-[0.16em] text-white transition hover:border-red-400 hover:bg-red-600 sm:w-auto"
                  >
                    <span>TELEGRAM @FOXPHASE</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </ParallaxSection>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
