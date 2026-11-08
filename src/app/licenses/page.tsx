"use client";

import React from "react";
import Link from "next/link";
import {
  Check,
  ArrowUpRight,
  FileAudio,
  Scale,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { licenseDefinitions, whyChooseFeatures } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { FadeUpBlock, Interactive3DTilt } from "@/components/motion/reveal-text";

const licenseColorThemes = [
  {
    border: "border-amber-500/40",
    glow: "from-amber-500/20 via-orange-950/10 to-transparent",
    badge: "text-amber-300",
    priceBox: "border-amber-400/40 bg-amber-500/15",
    btn: "bg-white text-[#050505] hover:bg-amber-300",
  },
  {
    border: "border-cyan-400/40",
    glow: "from-cyan-500/20 via-sky-950/10 to-transparent",
    badge: "text-cyan-300",
    priceBox: "border-cyan-400/40 bg-cyan-500/15",
    btn: "bg-white text-[#050505] hover:bg-cyan-300",
  },
  {
    border: "border-yellow-400/45",
    glow: "from-yellow-500/22 via-amber-950/10 to-transparent",
    badge: "text-yellow-300",
    priceBox: "border-yellow-400/45 bg-yellow-500/15",
    btn: "bg-gradient-to-r from-yellow-300 to-amber-400 text-[#050505] hover:brightness-110",
  },
  {
    border: "border-violet-400/45",
    glow: "from-violet-500/25 via-fuchsia-950/15 to-transparent",
    badge: "text-violet-300",
    priceBox: "border-violet-400/45 bg-violet-500/15",
    btn: "bg-gradient-to-r from-violet-400 to-fuchsia-400 text-[#050505] hover:brightness-110",
  },
  {
    border: "border-rose-500/50",
    glow: "from-rose-500/25 via-red-950/15 to-transparent",
    badge: "text-rose-300",
    priceBox: "border-rose-400/50 bg-rose-500/15",
    btn: "bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 text-white hover:brightness-110",
  },
];

export default function LicensesPage() {
  const { locale } = useFoxphase();
  const isRu = locale === "ru";

  return (
    <PageFrame
      eyebrow={
        isRu
          ? "🎧 ПРОДАЖА БИТОВ | ПРАЙС И ЛИЦЕНЗИИ"
          : "🎧 BEATS FOR SALE | PRICING & LICENSES"
      }
      title={isRu ? "ВАРИАНТЫ ЛИЦЕНЗИРОВАНИЯ." : "LICENSING OPTIONS."}
      subtitle={
        isRu
          ? "Предлагаю качественные авторские биты для артистов и исполнителей. Все инструменталы доступны в нескольких вариантах лицензирования — от базовой аренды до эксклюзивного приобретения."
          : "High-quality original beats available for artists and performers. Choose from different licensing options, from basic leases to exclusive rights."
      }
    >
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 md:px-10">
        {/* Why Choose My Beats Block */}
        <FadeUpBlock>
          <div className="surface-glass mb-12 rounded-3xl border border-amber-500/25 p-5 sm:p-8 md:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                  <Sparkles size={15} />
                  <span>
                    {isRu
                      ? "ПОЧЕМУ СТОИТ ВЫБРАТЬ МОИ БИТЫ?"
                      : "WHY CHOOSE MY BEATS?"}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-xl font-black uppercase text-white sm:text-3xl">
                  {isRu
                    ? "СОЗДАВАЙ СВОЮ МУЗЫКУ. ОСТАЛЬНОЕ — МОЯ РАБОТА."
                    : "CREATE YOUR SOUND. I'LL PROVIDE THE BEAT."}
                </h2>
                <ul className="mt-5 grid gap-2.5 text-sm text-[#E8E8E8] sm:grid-cols-2">
                  {(isRu ? whyChooseFeatures.ru : whyChooseFeatures.en).map(
                    (item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-amber-300"
                        />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="flex flex-col justify-between gap-4 rounded-2xl border border-cyan-400/30 bg-[#050505]/90 p-5 sm:p-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">
                    PRODUCED BY FOXPHASE
                  </span>
                  <p className="mt-2 text-xs leading-6 text-[#85878D]">
                    {isRu
                      ? "📩 По вопросам покупки, лицензирования и индивидуальных заказов пишите в Direct / Telegram или оформляйте заказ через каталог."
                      : "📩 For purchases, licensing and custom inquiries, feel free to send me a DM or select your beat in the store."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    href="/beats"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-amber-300"
                  >
                    <span>{isRu ? "Выбрать бит" : "Browse Beats"}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                  <a
                    href="https://t.me/FOXPHASE"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-cyan-200 transition hover:bg-cyan-400 hover:text-[#050505]"
                  >
                    <span>Telegram DM</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeUpBlock>

        {/* 5 License Tiers Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {licenseDefinitions.map((lic, index) => {
            const theme =
              licenseColorThemes[index % licenseColorThemes.length];
            return (
              <FadeUpBlock
                key={lic.id}
                delay={index * 0.07}
                className={
                  lic.id === "exclusive" ? "lg:col-span-2" : "lg:col-span-1"
                }
              >
                <Interactive3DTilt intensity={5} className="h-full">
                  <div
                    className={`surface-card relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border p-5 sm:p-8 ${theme.border}`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b ${theme.glow}`}
                    />

                    <div className="relative">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                        <div className="min-w-0">
                          <span
                            className={`font-mono text-[10px] font-bold uppercase tracking-[0.22em] ${theme.badge}`}
                          >
                            {`0${index + 1} // ${
                              isRu ? lic.badge.ru : lic.badge.en
                            }`}
                          </span>
                          <h2 className="mt-2 break-words font-display text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                            {isRu ? lic.name.ru : lic.name.en}
                          </h2>
                        </div>
                        <div
                          className={`rounded-2xl border px-4 py-2.5 text-left sm:text-right ${theme.priceBox}`}
                        >
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-[#E8E8E8]/80">
                            {isRu ? "ПРАЙС" : "PRICING"}
                          </span>
                          <span className="font-display text-xl font-black text-white sm:text-2xl">
                            {isRu ? lic.priceDisplay.ru : lic.priceDisplay.en}
                          </span>
                        </div>
                      </div>

                      {/* Formats */}
                      <div className="mt-6">
                        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#85878D]">
                          <FileAudio size={14} className={theme.badge} />
                          {isRu
                            ? "ФОРМАТЫ ФАЙЛОВ:"
                            : "DELIVERED FILE FORMATS:"}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {lic.formats.map((fmt) => (
                            <span
                              key={fmt}
                              className="rounded-full border border-white/15 bg-[#050505] px-3.5 py-1 font-mono text-xs text-white"
                            >
                              {fmt}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Structured Terms Matrix */}
                      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-4">
                          <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white">
                            {isRu ? "ОПИСАНИЕ ЛИЦЕНЗИИ" : "LICENSE SCOPE"}
                          </dt>
                          <dd className="mt-1.5 text-xs leading-6 text-[#85878D]">
                            {isRu ? lic.usageTerms.ru : lic.usageTerms.en}
                          </dd>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-4">
                          <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white">
                            {isRu
                              ? "КОММЕРЧЕСКОЕ ИСПОЛЬЗОВАНИЕ"
                              : "COMMERCIAL USE"}
                          </dt>
                          <dd className="mt-1.5 text-xs leading-6 text-[#85878D]">
                            {isRu ? lic.commercialUse.ru : lic.commercialUse.en}
                          </dd>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-4">
                          <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white">
                            {isRu ? "УСЛОВИЯ И ПРАВА" : "TERMS & CREDITS"}
                          </dt>
                          <dd className="mt-1.5 text-xs leading-6 text-[#85878D]">
                            {isRu ? lic.restrictions.ru : lic.restrictions.en}{" "}
                            {isRu
                              ? lic.publishingTerms.ru
                              : lic.publishingTerms.en}
                          </dd>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-4">
                          <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white">
                            {isRu ? "СТАТУС ПРОДАЖИ" : "AVAILABILITY STATUS"}
                          </dt>
                          <dd className="mt-1.5 text-xs leading-6 text-[#85878D]">
                            {isRu ? lic.exclusiveInfo.ru : lic.exclusiveInfo.en}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                      <p className="flex items-center gap-2 font-mono text-[11px] text-[#85878D]">
                        <Scale size={13} className={`shrink-0 ${theme.badge}`} />
                        <span>
                          {isRu ? lic.legalNotice.ru : lic.legalNotice.en}
                        </span>
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {lic.id === "exclusive" ? (
                          <Link
                            href="/contact?topic=Exclusive%20Rights"
                            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider transition ${theme.btn}`}
                          >
                            <span>
                              {isRu
                                ? "Запросить эксклюзив (от 29 000 ₽)"
                                : "Inquire Exclusive (from $350)"}
                            </span>
                            <ArrowUpRight size={14} />
                          </Link>
                        ) : (
                          <Link
                            href="/beats"
                            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider transition ${theme.btn}`}
                          >
                            <Check size={14} />
                            <span>
                              {isRu
                                ? "Выбрать бит в каталоге"
                                : "Select Beat in Store"}
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </Interactive3DTilt>
              </FadeUpBlock>
            );
          })}
        </div>
      </section>
    </PageFrame>
  );
}
