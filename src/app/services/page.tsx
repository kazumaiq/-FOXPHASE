"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Sliders, Sparkles } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { officialServices, whyChooseFeatures } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { FadeUpBlock, Interactive3DTilt } from "@/components/motion/reveal-text";

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
        {/* Official Price Table (Exact match to Telegram Channel Pricing) */}
        <FadeUpBlock>
          <div className="surface-glass mb-14 overflow-hidden rounded-3xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-8 sm:py-5">
              <div className="flex items-center gap-3">
                <Sliders size={18} className="text-red-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-white">
                  {isRu
                    ? "🔥 БИТЫ ДОСТУПНЫ К ПОКУПКЕ · ПРАЙС"
                    : "🔥 BEATS AVAILABLE FOR PURCHASE · PRICING"}
                </span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-red-400">
                PRODUCED BY FOXPHASE
              </span>
            </div>

            <div className="divide-y divide-white/10">
              {[
                {
                  serviceEn: "🥉 MP3 LEASE",
                  serviceRu: "🥉 MP3 LEASE",
                  descEn: "MP3 file + non-exclusive license.",
                  descRu: "MP3-файл и неисключительная лицензия.",
                  priceEn: "$15 / 1 000 ₽",
                  priceRu: "1 000 ₽ / $15",
                  href: "/beats",
                },
                {
                  serviceEn: "🥈 WAV LEASE",
                  serviceRu: "🥈 WAV LEASE",
                  descEn: "High-quality WAV + MP3 files and a non-exclusive license.",
                  descRu: "MP3 + WAV высокого качества и неисключительная лицензия.",
                  priceEn: "$20 / 2 000 ₽",
                  priceRu: "2 000 ₽ / $20",
                  href: "/beats",
                },
                {
                  serviceEn: "🥇 TRACKOUT LEASE",
                  serviceRu: "🥇 TRACKOUT LEASE",
                  descEn: "MP3 + WAV + individual STEMS for professional mixing.",
                  descRu: "MP3 + WAV + отдельные дорожки (STEMS) для профессионального сведения.",
                  priceEn: "$70 / 5 700 ₽",
                  priceRu: "5 700 ₽ / $70",
                  href: "/beats",
                },
                {
                  serviceEn: "💎 UNLIMITED LEASE",
                  serviceRu: "💎 UNLIMITED LEASE",
                  descEn:
                    "MP3 + WAV + STEMS, extended commercial license with unlimited streams and plays.",
                  descRu:
                    "MP3 + WAV + STEMS, расширенная коммерческая лицензия без лимита на прослушивания и стримы.",
                  priceEn: "$120 / 9 800 ₽",
                  priceRu: "9 800 ₽ / $120",
                  href: "/beats",
                },
                {
                  serviceEn: "👑 EXCLUSIVE RIGHTS",
                  serviceRu: "👑 EXCLUSIVE RIGHTS",
                  descEn:
                    "Exclusive license. Beat removed from future sales. Conditions discussed individually.",
                  descRu:
                    "Эксклюзивная лицензия. После сделки бит снимается с дальнейшей продажи.",
                  priceEn: "from $350 / от 29 000 ₽",
                  priceRu: "от 29 000 ₽ / $350",
                  href: "/contact?topic=Exclusive%20Rights",
                },
              ].map((row, idx) => (
                <div
                  key={row.serviceEn}
                  className="flex flex-col justify-between gap-4 px-5 py-5 transition hover:bg-red-950/15 md:flex-row md:items-center md:px-8"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-red-400">
                        0{idx + 1}
                      </span>
                      <span className="font-display text-lg font-bold text-white md:text-xl">
                        {isRu ? row.serviceRu : row.serviceEn}
                      </span>
                    </div>
                    <p className="text-xs text-[#85878D] md:pl-7">
                      {isRu ? row.descRu : row.descEn}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-5 md:justify-end">
                    <span className="font-mono text-base font-bold text-white">
                      {isRu ? row.priceRu : row.priceEn}
                    </span>
                    <Link
                      href={row.href}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition hover:border-red-500 hover:bg-red-600"
                    >
                      <span>{isRu ? "Выбрать" : "Select"}</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUpBlock>

        {/* Detailed Service Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {officialServices.map((srv, idx) => (
            <FadeUpBlock key={srv.id} delay={idx * 0.06}>
              <Interactive3DTilt intensity={7} className="h-full">
                <div className="surface-card surface-card-hover flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-red-400">
                        {`//${srv.index}`}
                      </span>
                      <span className="rounded-full border border-red-500/30 bg-red-950/20 px-3.5 py-1 font-mono text-xs font-bold text-white">
                        {isRu ? srv.price.ru : srv.price.en}
                      </span>
                    </div>

                    <h2 className="mt-6 font-display text-2xl font-black uppercase tracking-tight text-white">
                      {isRu ? srv.title.ru : srv.title.en}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[#85878D]">
                      {isRu ? srv.description.ru : srv.description.en}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-xs text-[#E8E8E8]">
                      {(isRu ? srv.deliverables.ru : srv.deliverables.en).map(
                        (point) => (
                          <li key={point} className="flex items-center gap-2.5">
                            <CheckCircle2
                              size={14}
                              className="shrink-0 text-red-400"
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
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#050505] transition hover:bg-red-500 hover:text-white"
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
          ))}
        </div>

        {/* Why Choose My Beats Footer Box */}
        <FadeUpBlock delay={0.18}>
          <div className="surface-glass mt-14 rounded-3xl p-6 sm:p-10">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-red-400">
              <Sparkles size={15} />
              <span>
                {isRu ? "ПОЧЕМУ СТОИТ ВЫБРАТЬ МОИ БИТЫ?" : "WHY CHOOSE MY BEATS?"}
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm text-white">
              {(isRu ? whyChooseFeatures.ru : whyChooseFeatures.en).map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#050505]/60 p-4"
                >
                  <CheckCircle2 size={16} className="shrink-0 text-red-400" />
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
