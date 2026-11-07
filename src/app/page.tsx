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
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  RevealHeading,
  ParallaxSection,
  FadeUpBlock,
  MagneticWrap,
} from "@/components/motion/reveal-text";
import { InteractiveSonicCanvas } from "@/components/motion/interactive-sonic-canvas";
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
    <div className="relative min-h-screen bg-[#050505] text-[#E8E8E8]">
      <InteractiveSonicCanvas />
      <SiteHeader />

      <main className="relative z-10 overflow-hidden">
        {/* 01. CINEMATIC HERO SECTION */}
        <section className="relative min-h-[90vh] px-5 pb-16 pt-12 md:px-10 md:pt-20 flex flex-col justify-between">
          <div className="mx-auto w-full max-w-7xl">
            {/* Top Status Telemetry Bar */}
            <FadeUpBlock>
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.26em] text-[#E8E8E8]">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  {isRu
                    ? "FOXPHASE · ОМСК / МЕЖДУНАРОДНЫЙ ПРОДАКШН"
                    : "FOXPHASE · OMSK / INTERNATIONAL SOUND ARCHITECTURE"}
                </div>
                <div className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#85878D] md:flex">
                  <span>EX. FOXMXNAXM</span>
                  <span>5+ {isRu ? "ЛЕТ В ПРОДАКШНЕ" : "YEARS EXPERIENCE"}</span>
                  <span>ANONYMOUS IDENTITY</span>
                </div>
              </div>
            </FadeUpBlock>

            {/* Asymmetric Hero Grid: Massive Typography + Floating 3D Chrome Emblem */}
            <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#85878D]">
                  [01 // OFFICIAL PRODUCER DIGITAL EXPERIENCE]
                </div>

                <RevealHeading
                  as="h1"
                  text="INDEPENDENT SOUND."
                  className="font-display text-[11.5vw] font-black uppercase leading-[0.88] tracking-[-0.04em] text-chrome sm:text-7xl xl:text-[6.2rem]"
                />
                <br />
                <RevealHeading
                  as="h2"
                  delay={0.14}
                  text="NO LIMITS."
                  className="mt-1 font-display text-[10.5vw] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#85878D] sm:text-6xl xl:text-[5.4rem]"
                />

                <FadeUpBlock delay={0.28}>
                  <p className="mt-8 max-w-xl text-base leading-7 text-[#E8E8E8]/85 md:text-lg">
                    {isRu
                      ? "Не очередной магазин битов, а авторская звуковая экосистема независимого продюсера FOXPHASE. Тяжёлый низ, металлическая текстура и кинематографичная глубина для артистов по всему миру."
                      : "More than a beat store — the complete sonic identity of independent music producer FOXPHASE. High-voltage low-end, metallic synthesis, and boundary-free architecture built for global records."}
                  </p>
                </FadeUpBlock>

                {/* Primary Hero CTAs */}
                <FadeUpBlock delay={0.36}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <MagneticWrap>
                      <Link
                        href="/beats"
                        className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#050505] shadow-chrome transition duration-300 hover:bg-[#E8E8E8]"
                      >
                        <span>{isRu ? "EXPLORE BEATS" : "EXPLORE BEATS"}</span>
                        <ArrowUpRight
                          size={17}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>
                    </MagneticWrap>

                    <MagneticWrap>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/[0.04] px-7 py-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition duration-300 hover:border-white hover:bg-white/10"
                      >
                        <span>{isRu ? "WORK WITH ME" : "WORK WITH ME"}</span>
                        <Sparkles size={15} className="text-[#85878D]" />
                      </Link>
                    </MagneticWrap>
                  </div>
                </FadeUpBlock>
              </div>

              {/* Parallax Official Chrome FOX Emblem Artifact */}
              <ParallaxSection offset={35} className="mx-auto w-full max-w-md lg:max-w-none">
                <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/15 bg-[#050505] shadow-obsidian">
                  <Image
                    src="/brand/foxphase-logo-chrome.jpg"
                    alt="FOXPHASE Official Chrome Sculpture Logo"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center transition duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/10 bg-[#050505]/80 px-4 py-3 backdrop-blur-xl">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#85878D]">
                        SIGNATURE EMBLEM
                      </p>
                      <p className="font-display text-xs font-bold uppercase tracking-widest text-white">
                        FOXPHASE // CHROME EDITION
                      </p>
                    </div>
                    <span className="rounded-full border border-white/20 px-2.5 py-1 font-mono text-[10px] text-[#E8E8E8]">
                      OMSK · RU
                    </span>
                  </div>
                </div>
              </ParallaxSection>
            </div>

            {/* Sonic Directions Pill Matrix */}
            <FadeUpBlock delay={0.44}>
              <div className="mt-14 border-t border-white/10 pt-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#85878D]">
                    {isRu ? "ОСНОВНЫЕ НАПРАВЛЕНИЯ:" : "CORE SONIC DIRECTIONS:"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {genresList.map((genre) => (
                      <Link
                        key={genre}
                        href={`/beats?genre=${genre}`}
                        className="rounded-full border border-white/15 bg-[#101114]/90 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[#E8E8E8] transition hover:border-white hover:bg-white hover:text-[#050505]"
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
          className="border-y border-white/10 bg-[#101114]/70 py-4 overflow-hidden"
        >
          <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap font-display text-xs font-bold uppercase tracking-[0.3em] text-[#85878D]">
            {Array.from({ length: 2 }).map((_, loopIndex) => (
              <React.Fragment key={loopIndex}>
                <span className="text-white">FOXPHASE</span>
                <span>•</span>
                <span>INDEPENDENT SOUND. NO LIMITS.</span>
                <span>•</span>
                <span className="text-[#E8E8E8]">TRAP / RAGE / AMBIENT / PHONK / HOUSE / EXPERIMENTAL</span>
                <span>•</span>
                <span>MP3 LEASE $15 / 1500 ₽</span>
                <span>•</span>
                <span>WAV MASTER $20 / 2000 ₽</span>
                <span>•</span>
                <span>EXCLUSIVE RIGHTS BY AGREEMENT</span>
                <span>•</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* 03. FEATURED INSTRUMENTALS (ASYMMETRIC EDITORIAL DECK) */}
        <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-[#85878D]">
                [02 // {isRu ? "ИЗБРАННЫЕ ИНСТРУМЕНТАЛЫ" : "SELECTED FREQUENCY"}]
              </p>
              <RevealHeading
                as="h2"
                text={isRu ? "АРХИТЕКТУРА КАТАЛОГА." : "FEATURED INSTRUMENTALS."}
                className="font-display text-4xl font-black uppercase tracking-[-0.04em] text-chrome md:text-6xl"
              />
            </div>
            <Link
              href="/beats"
              className="group inline-flex items-center gap-2.5 self-start rounded-full border border-white/20 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-[#050505]"
            >
              <span>{isRu ? "ВЕСЬ КАТАЛОГ БИТОВ" : "OPEN FULL BEAT STORE"}</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {featuredBeats.map((beat, idx) => {
              const isCurrent = player.currentBeat?.id === beat.id;
              const isPlaying = isCurrent && player.isPlaying;
              const colSpan =
                idx === 0 || idx === 3 ? "lg:col-span-7" : "lg:col-span-5";

              return (
                <FadeUpBlock
                  key={beat.id}
                  delay={idx * 0.08}
                  className={`${colSpan} surface-card surface-card-hover group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 md:p-8`}
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-3xl transition duration-500 group-hover:opacity-45"
                    style={{ background: beat.coverGradient }}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <button
                        type="button"
                        onClick={() => playBeat(beat)}
                        aria-label={`Preview ${beat.title}`}
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.06] text-white shadow-chrome-sm transition duration-300 hover:scale-105 hover:bg-white hover:text-[#050505]"
                      >
                        {isPlaying ? (
                          <Pause size={20} />
                        ) : (
                          <Play size={20} className="ml-0.5" />
                        )}
                      </button>
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#85878D]">
                          {beat.genre} · {beat.bpm} BPM · {beat.key}
                        </span>
                        <Link
                          href={`/beats/${beat.slug}`}
                          className="mt-1 block font-display text-2xl font-black tracking-tight text-white hover:text-[#E8E8E8] md:text-3xl"
                        >
                          {beat.title}
                        </Link>
                      </div>
                    </div>

                    <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-[#E8E8E8]">
                      {beat.duration}
                    </span>
                  </div>

                  {/* Interactive Waveform Bar Visualization */}
                  <div
                    onClick={() => playBeat(beat)}
                    className="relative my-8 flex h-12 cursor-pointer items-end gap-1.5 overflow-hidden rounded-xl border border-white/5 bg-[#050505]/60 px-4 py-2.5"
                  >
                    {Array.from({ length: 32 }).map((_, barIdx) => {
                      const heightPct =
                        24 + ((barIdx * 19 + idx * 13) % 72);
                      return (
                        <span
                          key={barIdx}
                          style={{ height: `${heightPct}%` }}
                          className={`flex-1 rounded-full transition-all duration-300 ${
                            isCurrent
                              ? "bg-white"
                              : "bg-white/20 group-hover:bg-white/45"
                          }`}
                        />
                      );
                    })}
                  </div>

                  <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#85878D]">
                        {isRu ? "ЛИЦЕНЗИЯ ОТ" : "LICENSE FROM"}
                      </span>
                      <span className="font-display text-lg font-bold text-white">
                        $15{" "}
                        <span className="font-mono text-xs font-normal text-[#85878D]">
                          / 1500 ₽
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Link
                        href={`/beats/${beat.slug}`}
                        className="rounded-full border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-wider text-[#E8E8E8] transition hover:border-white hover:text-white"
                      >
                        {isRu ? "Детали" : "Details"}
                      </Link>
                      <button
                        type="button"
                        onClick={() => addToCart(beat.id, "basic")}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#E8E8E8]"
                      >
                        <ShoppingBag size={13} />
                        <span>{isRu ? "В корзину" : "Add MP3"}</span>
                      </button>
                    </div>
                  </div>
                </FadeUpBlock>
              );
            })}
          </div>
        </section>

        {/* 04. ACHIEVEMENTS & SONIC MILESTONES */}
        <section className="border-y border-white/10 bg-[#101114]/50 px-5 py-24 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-[#85878D]">
                  [03 // {isRu ? "ДОСТИЖЕНИЯ ПРОДЮСЕРА" : "VERIFIED MILESTONES"}]
                </p>
                <RevealHeading
                  as="h2"
                  text={
                    isRu
                      ? "ПРИЗНАНИЕ И МАСШТАБ ЗВУЧАНИЯ."
                      : "CAREER SIGNAL & RECOGNITION."
                  }
                  className="font-display text-4xl font-black uppercase tracking-[-0.04em] text-chrome md:text-5xl"
                />
                <p className="mt-5 max-w-md text-sm leading-7 text-[#85878D]">
                  {isRu
                    ? "Показатели основаны на суммарном охвате каталога за 5 лет музыкальной карьеры (включая период FOXMXNAXM). Цифры указаны как приблизительные ориентиры."
                    : "Milestones accumulated across 5 years of independent music production (including releases under the former alias FOXMXNAXM). Figures are presented as approximate career totals."}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <ParallaxSection offset={20}>
                  <div className="surface-glass rounded-3xl p-8">
                    <Disc3 size={28} className="text-white mb-6" />
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#85878D]">
                      {isRu ? "ПРИБЛИЗИТЕЛЬНЫЙ ОХВАТ" : "APPROXIMATE CAREER STREAMS"}
                    </p>
                    <p className="mt-3 font-display text-5xl font-black tracking-tight text-chrome md:text-6xl">
                      ~1–2M
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[#85878D]">
                      {isRu
                        ? "Около 1–2 миллионов суммарных прослушиваний за музыкальную карьеру на цифровых площадках."
                        : "Approximately 1–2 million cumulative streams across digital platforms over the producer's career."}
                    </p>
                  </div>
                </ParallaxSection>

                <ParallaxSection offset={-20}>
                  <div className="surface-glass rounded-3xl p-8">
                    <Award size={28} className="text-white mb-6" />
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#85878D]">
                      {isRu ? "МУЗЫКАЛЬНАЯ НАГРАДА" : "STREAMING PLAQUE / AWARD"}
                    </p>
                    <p className="mt-3 font-display text-5xl font-black tracking-tight text-chrome md:text-6xl">
                      100,000+
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[#85878D]">
                      {isRu
                        ? "Официальная награда / музыкальная плейка за преодоление отметки в 100 000 прослушиваний."
                        : "Recognized with a physical 100,000+ streams milestone plaque for independent catalog performance."}
                    </p>
                  </div>
                </ParallaxSection>
              </div>
            </div>
          </div>
        </section>

        {/* 05. OFFICIAL RELEASES (DISCOGRAPHY SHOWCASE) */}
        <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-[#85878D]">
                [04 // {isRu ? "ДИСКОГРАФИЯ" : "OFFICIAL DISCOGRAPHY"}]
              </p>
              <RevealHeading
                as="h2"
                text={isRu ? "КЛЮЧЕВЫЕ РЕЛИЗЫ." : "SIGNATURE RELEASES."}
                className="font-display text-4xl font-black uppercase tracking-[-0.04em] text-chrome md:text-6xl"
              />
            </div>
            <a
              href="https://music.yandex.com/artist/21691221"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-[#050505]"
            >
              <span>{isRu ? "ЯНДЕКС МУЗЫКА" : "YANDEX MUSIC ARTIST PROFILE"}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {releases.map((rel, idx) => (
              <FadeUpBlock
                key={rel.id}
                delay={idx * 0.08}
                className="surface-card surface-card-hover group flex flex-col justify-between rounded-3xl p-6"
              >
                <div>
                  <div
                    className="relative mb-6 aspect-square w-full overflow-hidden rounded-2xl border border-white/10 p-5 flex flex-col justify-between"
                    style={{ background: rel.coverStyle }}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/75">
                      <span>{rel.code}</span>
                      <span>FOXPHASE</span>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-black uppercase tracking-tight text-white drop-shadow">
                        {rel.title}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#85878D]">
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
                  className="mt-6 inline-flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs uppercase tracking-wider text-[#E8E8E8] group-hover:text-white"
                >
                  <span>{isRu ? "Слушать на Яндекс Музыке" : "Stream on Yandex Music"}</span>
                  <ArrowUpRight size={14} />
                </a>
              </FadeUpBlock>
            ))}
          </div>
        </section>

        {/* 06. SERVICES & TRANSPARENT PRICE ARCHITECTURE */}
        <section className="border-y border-white/10 bg-[#08090B] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-[#85878D]">
                  [05 // {isRu ? "УСЛУГИ И ПРАЙС" : "PRODUCTION SERVICES & PRICING"}]
                </p>
                <RevealHeading
                  as="h2"
                  text={isRu ? "ИНЖЕНЕРИЯ ЗВУКА ПОД КЛЮЧ." : "SONIC ENGINEERING."}
                  className="font-display text-4xl font-black uppercase tracking-[-0.04em] text-chrome md:text-6xl"
                />
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#85878D] lg:justify-self-end">
                {isRu
                  ? "Официальный прайс-лист FOXPHASE. От лицензирования готовых битов в MP3 и WAV до создания кастомного продакшна, сведения, мастеринга и полной передачи эксклюзивных прав."
                  : "Official transparent rate card. From instant MP3 and studio WAV leases to custom full-cycle production, mixing, mastering, and 1-of-1 exclusive buyouts."}
              </p>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {officialServices.map((srv) => (
                <div
                  key={srv.id}
                  className="group grid items-center gap-4 py-6 transition duration-300 hover:bg-white/[0.02] md:grid-cols-[80px_1.4fr_1.5fr_1fr_auto] md:px-4"
                >
                  <span className="font-mono text-xs text-[#85878D]">
                    /{srv.index}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                    {isRu ? srv.title.ru : srv.title.en}
                  </h3>
                  <p className="text-xs leading-6 text-[#85878D]">
                    {isRu ? srv.description.ru : srv.description.en}
                  </p>
                  <div className="font-mono text-sm font-semibold text-[#E8E8E8] md:text-right">
                    {isRu ? srv.price.ru : srv.price.en}
                  </div>
                  <Link
                    href={`/contact?topic=${encodeURIComponent(srv.topicValue)}`}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition group-hover:border-white group-hover:bg-white group-hover:text-[#050505]"
                  >
                    <span>{isRu ? "Заявка" : "Inquire"}</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 07. COLLABORATIONS MATRIX */}
        <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-[#85878D]">
                [06 // {isRu ? "ПОРТФОЛИО И КОЛЛАБОРАЦИИ" : "COLLABORATION NETWORK"}]
              </p>
              <RevealHeading
                as="h2"
                text={isRu ? "АРТИСТЫ И СОВМЕСТНЫЕ РАБОТЫ." : "TRUSTED BY ARTISTS."}
                className="font-display text-4xl font-black uppercase tracking-[-0.04em] text-chrome md:text-6xl"
              />
            </div>
            <Link
              href="/collaborations"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-[#E8E8E8] hover:text-white"
            >
              <span>{isRu ? "Открыть портфолио" : "Explore Portfolio"}</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {collaborationArtists.map((artist) => (
              <div
                key={artist.id}
                className="surface-card surface-card-hover flex items-center justify-between rounded-2xl px-5 py-4"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#85878D]">
                    {`//${artist.index}`}
                  </span>
                  <p className="mt-1 font-display text-lg font-bold tracking-wide text-white">
                    {artist.name}
                  </p>
                </div>
                <span className="h-2 w-2 rounded-full bg-white/30" />
              </div>
            ))}
          </div>
        </section>

        {/* 08. FINAL CONTACT / COLLABORATION MONOLITH CTA */}
        <section className="mx-auto max-w-7xl px-5 pb-28 md:px-10">
          <div className="surface-glass relative overflow-hidden rounded-[2rem] p-8 md:p-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#85878D]">
                  [07 // {isRu ? "СВЯЗЬ С ПРОДЮСЕРОМ" : "DIRECT STUDIO LINE"}]
                </p>
                <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-chrome md:text-6xl">
                  {isRu
                    ? "ГОТОВЫ СОЗДАТЬ СЛЕДУЮЩИЙ РЕЛИЗ?"
                    : "READY TO BUILD YOUR NEXT RECORD?"}
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-[#85878D] md:text-base">
                  {isRu
                    ? "Свяжитесь с FOXPHASE напрямую через Telegram или оставьте заявку на кастомный бит, сведение, мастеринг или выкуп эксклюзивных прав."
                    : "Connect directly via Telegram or submit a studio brief for custom production, mixing, mastering, or exclusive rights acquisition."}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#050505] shadow-chrome transition hover:bg-[#E8E8E8]"
                >
                  <span>{isRu ? "ОСТАВИТЬ ЗАЯВКУ" : "START A PROJECT"}</span>
                  <ArrowUpRight size={16} />
                </Link>
                <a
                  href="https://t.me/FOXPHASE"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white transition hover:border-white"
                >
                  <span>TELEGRAM @FOXPHASE</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
