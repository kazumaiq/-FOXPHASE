"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Crown, Sparkles } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { officialServices, whyChooseFeatures } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { FadeUpBlock, Interactive3DTilt } from "@/components/motion/reveal-text";

const tierColorThemes = [
  {
    border: "border-amber-500/40 hover:border-amber-400",
    glow: "from-amber-500/20 via-orange-950/10 to-transparent",
    badge: "border-amber-400/40 bg-amber-500/15 text-amber-200",
    button: "bg-white text-[#050505] hover:bg-amber-300",
    check: "text-amber-300",
  },
  {
    border: "border-cyan-400/40 hover:border-cyan-300",
    glow: "from-cyan-500/20 via-sky-950/10 to-transparent",
    badge: "border-cyan-400/40 bg-cyan-500/15 text-cyan-200",
    button: "bg-white text-[#050505] hover:bg-cyan-300",
    check: "text-cyan-300",
  },
  {
    border: "border-yellow-400/45 hover:border-yellow-300",
    glow: "from-yellow-500/22 via-amber-950/10 to-transparent",
    badge: "border-yellow-400/45 bg-yellow-500/15 text-yellow-200",
    button: "bg-gradient-to-r from-yellow-300 to-amber-400 text-[#050505] hover:brightness-110",
    check: "text-yellow-300",
  },
  {
    border: "border-violet-400/45 hover:border-violet-300",
    glow: "from-violet-500/25 via-fuchsia-950/15 to-transparent",
    badge: "border-violet-400/45 bg-violet-500/15 text-violet-200",
    button: "bg-gradient-to-r from-violet-400 to-fuchsia-400 text-[#050505] hover:brightness-110",
    check: "text-violet-300",
  },
  {
    border: "border-rose-500/45 hover:border-rose-400",
    glow: "from-rose-500/25 via-red-950/15 to-transparent",
    badge: "border-rose-400/45 bg-rose-500/15 text-rose-200",
    button: "bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 text-white hover:brightness-110",
    check: "text-rose-300",
  },
  {
    border: "border-emerald-400/40 hover:border-emerald-300",
    glow: "from-emerald-500/20 via-teal-950/10 to-transparent",
    badge: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
    button: "bg-white text-[#050505] hover:bg-emerald-300",
    check: "text-emerald-300",
  },
];

export default function ServicesPage() {
  const { locale } = useFoxphase();
  const isRu = locale === "ru";

  return (
    <PageFrame
      eyebrow={isRu ? "🎧 ПРОДАЖА БИТОВ И УСЛУГИ" : "🎧 BEATS FOR SALE & SERVICES"}
      title={
        isRu
          ? "ПРАЙС-ЛИСТ И УСЛУГИ."
          : "OFFICIAL PRICING & SERVICES."
      }
      subtitle={
        isRu
          ? "Предлагаю качественные авторские биты для артистов и исполнителей. Все инструменталы доступны в нескольких вариантах лицензирования — от базовой аренды до эксклюзивного приобретения."
          : "High-quality original beats available for artists and performers. Choose from different licensing options, from basic leases to exclusive rights."
      }
    >
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 md:px-10">
        {/* Detailed Color-Accented Service & License Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {officialServices.map((srv, idx) => {
            const theme = tierColorThemes[idx % tierColorThemes.length];
            const isExclusive = srv.id === "srv-exclusive";

            return (
              <FadeUpBlock key={srv.id} delay={idx * 0.06}>
                <Interactive3DTilt intensity={6} className="h-full">
                  <div
                    className={`surface-card relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border p-6 sm:p-8 transition duration-300 ${theme.border}`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b ${theme.glow}`}
                    />

                    <div className="relative">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${theme.badge}`}
                        >
                          {`ТАРИФ 0${idx + 1}`}
                        </span>
                        {isExclusive && (
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-amber-300">
                            <Crown size={12} />
                            <span>1-OF-1</span>
                          </span>
                        )}
                      </div>

                      <h2 className="mt-5 break-words font-display text-2xl font-black uppercase tracking-tight text-white">
                        {isRu ? srv.title.ru : srv.title.en}
                      </h2>

                      <div className="mt-4 border-b border-white/10 pb-5">
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                          {isRu ? "ОФИЦИАЛЬНЫЙ ПРАЙС" : "OFFICIAL PRICE"}
                        </span>
                        <span className="mt-1 block font-display text-2xl font-black text-white sm:text-3xl">
                          {isRu ? srv.price.ru : srv.price.en}
                        </span>
                      </div>

                      <p className="mt-4 text-xs leading-6 text-[#85878D] sm:text-sm">
                        {isRu ? srv.description.ru : srv.description.en}
                      </p>

                      <ul className="mt-5 space-y-2.5 text-xs text-[#E8E8E8]">
                        {(isRu ? srv.deliverables.ru : srv.deliverables.en).map(
                          (point) => (
                            <li key={point} className="flex items-start gap-2.5">
                              <CheckCircle2
                                size={15}
                                className={`mt-0.5 shrink-0 ${theme.check}`}
                              />
                              <span>{point}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <Link
                      href={
                        srv.id === "srv-exclusive" || srv.id === "srv-custom-beat"
                          ? `/contact?topic=${encodeURIComponent(srv.topicValue)}`
                          : "/beats"
                      }
                      className={`relative mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.16em] transition ${theme.button}`}
                    >
                      <span>
                        {srv.id === "srv-exclusive" || srv.id === "srv-custom-beat"
                          ? isRu
                            ? "Написать в Direct / Заявка"
                            : "Send Inquiry / DM"
                          : isRu
                          ? "Выбрать бит в каталоге"
                          : "Choose Beat in Store"}
                      </span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </Interactive3DTilt>
              </FadeUpBlock>
            );
          })}
        </div>

        {/* Why Choose My Beats Footer Box */}
        <FadeUpBlock delay={0.18}>
          <div className="surface-glass mt-14 rounded-3xl border border-amber-500/25 p-6 sm:p-10">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
              <Sparkles size={15} />
              <span>
                {isRu ? "ПОЧЕМУ СТОИТ ВЫБРАТЬ МОИ БИТЫ?" : "WHY CHOOSE MY BEATS?"}
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm text-white">
              {(isRu ? whyChooseFeatures.ru : whyChooseFeatures.en).map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#050505]/70 p-4"
                >
                  <CheckCircle2 size={16} className="shrink-0 text-amber-300" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUpBlock>
      </section>
    </PageFrame>
  );
}
