"use client";

import React from "react";
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
  officialServices,
  genresList,
} from "@/content/site";

export default function HomePage() {
  const { locale, playBeat, player, addToCart } = useFoxphase();
  const isRu = locale === "ru";

  const featuredBeats = beats.slice(0, 4);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] text-[#E8E8E8]">
      {/* Red Cosmic Scroll-Reactive Starfield & 3D Wireframe Polyhedron */}
      <InteractiveSonicCanvas />
      <SiteHeader />

      <main className="relative z-10 w-full overflow-x-hidden">
        {/* 01. CINEMATIC HERO SECTION (Perfectly Responsive on Mobile & Desktop) */}
        <section className="relative flex min-h-[88vh] flex-col justify-between px-4 pb-14 pt-8 sm:px-6 md:px-10 md:pt-16">
          <div className="mx-auto w-full max-w-7xl">
            {/* Top Status Telemetry Bar */}
            <FadeUpBlock>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 sm:mb-8">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-red-500/30 bg-red-950/20 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8E8E8] sm:text-[11px] sm:tracking-[0.24em]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse" />
                  <span className="truncate">
                    {isRu
                      ? "FOXPHASE · ОМСК / МИРОВОЙ ЗВУК"
                      : "FOXPHASE · OMSK / WORLDWIDE SOUND"}
                  </span>
                </div>
                <div className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#85878D] md:flex">
                  <span>EX. FOXMXNAXM</span>
                  <span>5+ {isRu ? "ЛЕТ ОПЫТА" : "YEARS EXPERIENCE"}</span>
                  <span className="text-red-400">RED COSMOS 3D ENGINE</span>
                </div>
              </div>
            </FadeUpBlock>

            {/* Asymmetric Hero Grid */}
            <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
              <div className="w-full min-w-0">
                <FadeUpBlock>
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-red-400 sm:text-xs sm:tracking-[0.28em]">
                    {isRu
                      ? "[01 // ОФИЦИАЛЬНАЯ ПЛАТФОРМА ПРОДЮСЕРА]"
                      : "[01 // OFFICIAL PRODUCER DIGITAL EXPERIENCE]"}
                  </div>
                </FadeUpBlock>

                <RevealHeading
                  as="h1"
                  text={isRu ? "НЕЗАВИСИМЫЙ ЗВУК." : "INDEPENDENT SOUND."}
                  className="font-display text-4xl font-black uppercase leading-[0.92] tracking-[-0.03em] text-chrome sm:text-6xl md:text-7xl xl:text-[5.6rem]"
                />
                <br />
                <RevealHeading
                  as="h2"
                  delay={0.12}
                  text={isRu ? "БЕЗ ГРАНИЦ." : "NO LIMITS."}
                  className="mt-1 font-display text-3xl font-black uppercase leading-[0.94] tracking-[-0.03em] text-crimson-chrome sm:text-5xl md:text-6xl xl:text-[4.8rem]"
                />

                <FadeUpBlock delay={0.24}>
                  <p className="mt-5 max-w-xl text-sm leading-6 text-[#E8E8E8]/85 sm:mt-7 sm:text-base sm:leading-7 md:text-lg">
                    {isRu
                      ? "Полноценная цифровая вселенная независимого музыкального продюсера FOXPHASE. Купить биты (MP3 / WAV / Exclusive), заказать сведение, мастеринг или бит с нуля."
                      : "The official sonic ecosystem of independent music producer FOXPHASE. License studio beats (MP3 / WAV / Exclusive), commission custom production, mixing & mastering."}
                  </p>
                </FadeUpBlock>

                {/* Primary Hero CTAs — Full-width stacked on Mobile, inline on Desktop */}
                <FadeUpBlock delay={0.32}>
                  <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
                    <MagneticWrap className="w-full sm:w-auto">
                      <Link
                        href="/beats"
                        className="group flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[#050505] shadow-chrome transition duration-300 hover:bg-[#E8E8E8] sm:w-auto sm:px-7"
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
                        className="flex w-full items-center justify-center gap-3 rounded-full border border-red-500/40 bg-red-950/20 px-6 py-4 font-display text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md transition duration-300 hover:border-red-400 hover:bg-red-900/30 sm:w-auto sm:px-7"
                      >
                        <span>
                          {isRu ? "СОТРУДНИЧЕСТВО" : "WORK WITH ME"}
                        </span>
                        <Sparkles size={15} className="shrink-0 text-red-400" />
                      </Link>
                    </MagneticWrap>
                  </div>
                </FadeUpBlock>
              </div>

              {/* Parallax + 3D Tilt Official Chrome FOX Emblem */}
              <ParallaxSection
                offset={35}
                className="mx-auto w-full max-w-md lg:max-w-none"
              >
                <RevealCardMedia>
                  <Interactive3DTilt intensity={11}>
                    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-red-500/25 bg-[#050505] shadow-crimson">
                      <Image
                        src="/brand/foxphase-logo-chrome.jpg"
                        alt="FOXPHASE Official Chrome Sculpture Logo"
                        fill
                        priority
                        sizes="(max-width: 768px) 92vw, 42vw"
                        className="object-contain object-center p-2 transition duration-700 ease-out group-hover:scale-105 sm:object-cover sm:p-0"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-red-950/15 opacity-85" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 rounded-2xl border border-white/15 bg-[#050505]/85 px-3.5 py-2.5 backdrop-blur-xl sm:bottom-4 sm:left-4 sm:right-4 sm:px-4 sm:py-3">
                        <div className="min-w-0">
                          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-red-400 sm:text-[10px]">
                            {isRu ? "ОФИЦИАЛЬНАЯ ЭМБЛЕМА" : "SIGNATURE EMBLEM"}
                          </p>
                          <p className="truncate font-display text-[11px] font-bold uppercase tracking-wider text-white sm:text-xs">
                            FOXPHASE // CHROME 3D
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full border border-red-500/30 bg-red-950/30 px-2.5 py-1 font-mono text-[10px] text-white">
                          OMSK · RU
                        </span>
                      </div>
                    </div>
                  </Interactive3DTilt>
                </RevealCardMedia>
              </ParallaxSection>
            </div>

            {/* Sonic Directions Pill Matrix */}
            <FadeUpBlock delay={0.38}>
              <div className="mt-10 border-t border-white/10 pt-6 sm:mt-14 sm:pt-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#85878D] sm:text-[11px]">
                    {isRu ? "ОСНОВНЫЕ ЖАНРЫ И СТИЛИ:" : "CORE SONIC DIRECTIONS:"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {genresList.map((genre) => (
                      <Link
                        key={genre}
                        href={`/beats?genre=${genre}`}
                        className="rounded-full border border-white/15 bg-[#101114]/90 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#E8E8E8] transition hover:border-red-500 hover:bg-red-600 hover:text-white"
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUpBlock>
          </div>
        </section>

        {/* 02. KINETIC SONIC MARQUEE */}
        <section
          aria-label="Sonic identity ticker"
          className="overflow-hidden border-y border-red-500/20 bg-[#10080A]/80 py-3.5 backdrop-blur-md"
        >
          <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap font-display text-[11px] font-bold uppercase tracking-[0.26em] text-[#E8E8E8]">
            {Array.from({ length: 2 }).map((_, loopIndex) => (
              <React.Fragment key={loopIndex}>
                <span className="text-red-400">FOXPHASE</span>
                <span>•</span>
                <span>
                  {isRu
                    ? "НЕЗАВИСИМЫЙ ЗВУК. БЕЗ ГРАНИЦ."
                    : "INDEPENDENT SOUND. NO LIMITS."}
                </span>
                <span>•</span>
                <span className="text-white">
                  TRAP / RAGE / AMBIENT / PHONK / HOUSE / EXPERIMENTAL
                </span>
                <span>•</span>
                <span className="text-red-300">MP3 LEASE $15 / 1500 ₽</span>
                <span>•</span>
                <span className="text-red-300">WAV MASTER $20 / 2000 ₽</span>
                <span>•</span>
                <span>
                  {isRu
                    ? "ЭКСКЛЮЗИВНЫЕ ПРАВА ПО ДОГОВОРЁННОСТИ"
                    : "EXCLUSIVE RIGHTS BY AGREEMENT"}
                </span>
                <span>•</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* 03. FEATURED INSTRUMENTALS (BEAT STORE PREVIEW) */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-28">
          <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
            <div>
              <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-red-400">
                {`[02 // ${isRu ? "ВИТРИНА БИТОВ" : "SELECTED FREQUENCY"}]`}
              </p>
              <RevealHeading
                as="h2"
                text={
                  isRu ? "ИЗБРАННЫЕ ИНСТРУМЕНТАЛЫ." : "FEATURED INSTRUMENTALS."
                }
                className="font-display text-3xl font-black uppercase tracking-[-0.03em] text-chrome sm:text-5xl md:text-6xl"
              />
            </div>
            <Link
              href="/beats"
              className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-red-500/35 bg-red-950/20 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-red-400 hover:bg-red-600"
            >
              <span>
                {isRu ? "ОТКРЫТЬ ВЕСЬ КАТАЛОГ" : "OPEN FULL BEAT STORE"}
              </span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            {featuredBeats.map((beat, idx) => {
              const isCurrent = player.currentBeat?.id === beat.id;
              const isPlaying = isCurrent && player.isPlaying;
              const colSpan =
                idx === 0 || idx === 3 ? "lg:col-span-7" : "lg:col-span-5";

              return (
                <FadeUpBlock
                  key={beat.id}
                  delay={idx * 0.08}
                  className={colSpan}
                >
                  <Interactive3DTilt intensity={6} className="h-full">
                    <div className="surface-card surface-card-hover group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-5 sm:p-7">
                      <div
                        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl transition duration-500 group-hover:opacity-60"
                        style={{
                          background:
                            idx % 2 === 0
                              ? "radial-gradient(circle, rgba(220,38,38,0.55) 0%, transparent 70%)"
                              : beat.coverGradient,
                        }}
                      />

                      <div className="relative flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3.5">
                          <button
                            type="button"
                            onClick={() => playBeat(beat)}
                            aria-label={`Preview ${beat.title}`}
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-500/40 bg-red-950/30 text-white shadow-chrome-sm transition duration-300 hover:scale-105 hover:bg-red-600 sm:h-14 sm:w-14"
                          >
                            {isPlaying ? (
                              <Pause size={19} />
                            ) : (
                              <Play size={19} className="ml-0.5" />
                            )}
                          </button>
                          <div className="min-w-0">
                            <span className="block truncate font-mono text-[10px] uppercase tracking-[0.2em] text-[#85878D] sm:text-[11px]">
                              {beat.genre} · {beat.bpm} BPM · {beat.key}
                            </span>
                            <Link
                              href={`/beats/${beat.slug}`}
                              className="mt-1 block truncate font-display text-xl font-black tracking-tight text-white hover:text-red-400 sm:text-2xl md:text-3xl"
                            >
                              {beat.title}
                            </Link>
                          </div>
                        </div>

                        <span className="shrink-0 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-[#E8E8E8]">
                          {beat.duration}
                        </span>
                      </div>

                      {/* Interactive Waveform Visualization */}
                      <div
                        onClick={() => playBeat(beat)}
                        className="relative my-6 flex h-11 cursor-pointer items-end gap-1 overflow-hidden rounded-xl border border-white/10 bg-[#050505]/70 px-3 py-2"
                      >
                        {Array.from({ length: 28 }).map((_, barIdx) => {
                          const heightPct =
                            24 + ((barIdx * 19 + idx * 13) % 72);
                          return (
                            <span
                              key={barIdx}
                              style={{ height: `${heightPct}%` }}
                              className={`flex-1 rounded-full transition-all duration-300 ${
                                isCurrent
                                  ? "bg-red-500"
                                  : "bg-white/25 group-hover:bg-red-400/60"
                              }`}
                            />
                          );
                        })}
                      </div>

                      <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#85878D]">
                            {isRu ? "ЛИЦЕНЗИЯ ОТ" : "LICENSE FROM"}
                          </span>
                          <span className="font-display text-lg font-bold text-white">
                            $15{" "}
                            <span className="font-mono text-xs font-normal text-[#85878D]">
                              / 1500 ₽
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
                            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#050505] transition hover:bg-red-500 hover:text-white"
                          >
                            <ShoppingBag size={13} />
                            <span>{isRu ? "Купить" : "Add MP3"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Interactive3DTilt>
                </FadeUpBlock>
              );
            })}
          </div>
        </section>

        {/* 04. INTERACTIVE 3D CANONICAL OBJECTS + ACHIEVEMENTS */}
        <section className="border-y border-red-500/20 bg-[#0A0608]/80 px-4 py-20 sm:px-6 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.26em] text-red-400">
                  {`[03 // ${
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
                  className="font-display text-3xl font-black uppercase tracking-[-0.03em] text-chrome sm:text-5xl"
                />
                <p className="mt-4 text-sm leading-7 text-[#85878D]">
                  {isRu
                    ? "За 5 лет продакшна (включая период FOXMXNAXM) музыка FOXPHASE собрала более 1–2 миллионов прослушиваний и получила физическую награду за 100 000+ стримов."
                    : "Across 5 years of production (including releases as FOXMXNAXM), FOXPHASE has accumulated ~1–2M streams and earned a 100,000+ streams milestone award."}
                </p>

                <div className="mt-6">
                  <Canonical3DArtifact
                    label={
                      isRu
                        ? "3D АКУСТИЧЕСКОЕ ЯДРО FOXPHASE"
                        : "3D ACOUSTIC CORE // INTERACTIVE"
                    }
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                <ParallaxSection offset={28}>
                  <Interactive3DTilt intensity={9}>
                    <div className="surface-glass rounded-3xl p-7 sm:p-8">
                      <Disc3 size={28} className="mb-5 text-red-400" />
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#85878D]">
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
                  </Interactive3DTilt>
                </ParallaxSection>

                <ParallaxSection offset={-28}>
                  <Interactive3DTilt intensity={9}>
                    <div className="surface-glass rounded-3xl p-7 sm:p-8">
                      <Award size={28} className="mb-5 text-red-400" />
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#85878D]">
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
                  </Interactive3DTilt>
                </ParallaxSection>
              </div>
            </div>
          </div>
        </section>

        {/* 05. OFFICIAL RELEASES (DISCOGRAPHY SHOWCASE) */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-28">
          <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
            <div>
              <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-red-400">
                {`[04 // ${
                  isRu ? "ОФИЦИАЛЬНАЯ ДИСКОГРАФИЯ" : "OFFICIAL DISCOGRAPHY"
                }]`}
              </p>
              <RevealHeading
                as="h2"
                text={isRu ? "КЛЮЧЕВЫЕ РЕЛИЗЫ." : "SIGNATURE RELEASES."}
                className="font-display text-3xl font-black uppercase tracking-[-0.03em] text-chrome sm:text-5xl md:text-6xl"
              />
            </div>
            <a
              href="https://music.yandex.com/artist/21691221"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white transition hover:border-red-500 hover:bg-red-600"
            >
              <span>
                {isRu ? "ПРОФИЛЬ ЯНДЕКС МУЗЫКИ" : "YANDEX MUSIC PROFILE"}
              </span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {releases.map((rel, idx) => (
              <FadeUpBlock key={rel.id} delay={idx * 0.08}>
                <Interactive3DTilt intensity={8} className="h-full">
                  <div className="surface-card surface-card-hover group flex h-full flex-col justify-between rounded-3xl p-5 sm:p-6">
                    <div>
                      <RevealCardMedia delay={idx * 0.06}>
                        <div
                          className="relative mb-5 flex aspect-square w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/15 p-5"
                          style={{
                            background:
                              idx % 2 === 0
                                ? "radial-gradient(circle at 30% 25%, #EF4444 0%, #450A0A 38%, #050505 100%)"
                                : rel.coverStyle,
                          }}
                        >
                          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/80">
                            <span>{rel.code}</span>
                            <span>FOXPHASE</span>
                          </div>
                          <div>
                            <p className="font-display text-2xl font-black uppercase tracking-tight text-white drop-shadow">
                              {rel.title}
                            </p>
                          </div>
                        </div>
                      </RevealCardMedia>

                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-400">
                        {isRu ? rel.type.ru : rel.type.en}
                      </span>
                      <h3 className="mt-1 font-display text-2xl font-bold text-white">
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
                      className="mt-6 inline-flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs uppercase tracking-wider text-[#E8E8E8] group-hover:text-red-400"
                    >
                      <span>
                        {isRu ? "Слушать релиз" : "Stream on Yandex"}
                      </span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </Interactive3DTilt>
              </FadeUpBlock>
            ))}
          </div>
        </section>

        {/* 06. SERVICES & TRANSPARENT PRICE ARCHITECTURE */}
        <section className="border-y border-white/10 bg-[#080608]/90 px-4 py-20 sm:px-6 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-red-400">
                  {`[05 // ${
                    isRu ? "УСЛУГИ И ПРАЙС-ЛИСТ" : "SERVICES & PRICING"
                  }]`}
                </p>
                <RevealHeading
                  as="h2"
                  text={
                    isRu
                      ? "УСЛУГИ И СТОИМОСТЬ."
                      : "PRODUCTION SERVICES."
                  }
                  className="font-display text-3xl font-black uppercase tracking-[-0.03em] text-chrome sm:text-5xl md:text-6xl"
                />
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#85878D] lg:justify-self-end">
                {isRu
                  ? "Прозрачный прайс-лист FOXPHASE: готовые биты в MP3 и WAV, написание битов на заказ (Custom Beat), сведение, мастеринг и передача эксклюзивных прав."
                  : "Official transparent pricing: instant MP3 & WAV leases, custom beats from scratch, studio mixing, mastering, and 1-of-1 exclusive rights."}
              </p>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {officialServices.map((srv) => (
                <div
                  key={srv.id}
                  className="group grid items-center gap-3 py-5 transition duration-300 hover:bg-red-950/10 md:grid-cols-[70px_1.3fr_1.5fr_1fr_auto] md:gap-4 md:px-4 md:py-6"
                >
                  <span className="font-mono text-xs text-red-400">
                    /{srv.index}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                    {isRu ? srv.title.ru : srv.title.en}
                  </h3>
                  <p className="text-xs leading-6 text-[#85878D]">
                    {isRu ? srv.description.ru : srv.description.en}
                  </p>
                  <div className="font-mono text-sm font-bold text-white md:text-right">
                    {isRu ? srv.price.ru : srv.price.en}
                  </div>
                  <Link
                    href={`/contact?topic=${encodeURIComponent(srv.topicValue)}`}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition group-hover:border-red-500 group-hover:bg-red-600"
                  >
                    <span>{isRu ? "Заказать" : "Inquire"}</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 07. COLLABORATIONS MATRIX */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-28">
          <div className="mb-10 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end">
            <div>
              <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-red-400">
                {`[06 // ${
                  isRu ? "ПОРТФОЛИО И КОЛЛАБОРАЦИИ" : "COLLABORATION NETWORK"
                }]`}
              </p>
              <RevealHeading
                as="h2"
                text={
                  isRu ? "СОВМЕСТНЫЕ РАБОТЫ." : "TRUSTED BY ARTISTS."
                }
                className="font-display text-3xl font-black uppercase tracking-[-0.03em] text-chrome sm:text-5xl md:text-6xl"
              />
            </div>
            <Link
              href="/collaborations"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#E8E8E8] hover:text-red-400"
            >
              <span>{isRu ? "Все артисты" : "Explore Portfolio"}</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {collaborationArtists.map((artist, idx) => (
              <FadeUpBlock key={artist.id} delay={idx * 0.04}>
                <div className="surface-card surface-card-hover flex items-center justify-between rounded-2xl px-4 py-4 sm:px-5">
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] text-red-400">
                      {`//${artist.index}`}
                    </span>
                    <p className="mt-1 truncate font-display text-base font-bold tracking-wide text-white sm:text-lg">
                      {artist.name}
                    </p>
                  </div>
                  <Orbit size={14} className="shrink-0 text-white/35" />
                </div>
              </FadeUpBlock>
            ))}
          </div>
        </section>

        {/* 08. FINAL CONTACT / COLLABORATION MONOLITH CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 md:px-10">
          <ParallaxSection offset={24}>
            <div className="surface-glass relative overflow-hidden rounded-3xl p-6 sm:p-10 md:p-16">
              <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-red-600/20 blur-3xl" />

              <div className="relative grid items-center gap-8 lg:grid-cols-[1.35fr_0.65fr]">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red-400">
                    {`[07 // ${
                      isRu ? "ПРЯМАЯ СВЯЗЬ СО СТУДИЕЙ" : "DIRECT STUDIO LINE"
                    }]`}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-chrome sm:text-5xl md:text-6xl">
                    {isRu
                      ? "СОЗДАДИМ ВАШ СЛЕДУЮЩИЙ РЕЛИЗ?"
                      : "READY TO BUILD YOUR NEXT RECORD?"}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-[#85878D] sm:text-base sm:leading-7">
                    {isRu
                      ? "Напишите напрямую в Telegram или оставьте заявку на кастомный бит, сведение, мастеринг или выкуп эксклюзивных прав."
                      : "Connect directly via Telegram or submit a studio brief for custom production, mixing, mastering, or exclusive rights acquisition."}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[#050505] shadow-chrome transition hover:bg-[#E8E8E8] sm:w-auto"
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-500/40 bg-red-950/25 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white transition hover:border-red-400 hover:bg-red-600 sm:w-auto"
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
