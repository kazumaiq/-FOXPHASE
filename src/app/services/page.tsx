"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Sliders } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { officialServices } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { FadeUpBlock, Interactive3DTilt } from "@/components/motion/reveal-text";

export default function ServicesPage() {
  const { locale } = useFoxphase();
  const isRu = locale === "ru";

  return (
    <PageFrame
      eyebrow={isRu ? "УСЛУГИ И ПРАЙС-ЛИСТ" : "SERVICES & RATE CARD"}
      title={
        isRu
          ? "УСЛУГИ ПРОДЮСЕРА И ПРАЙС."
          : "MAKE THE RECORD FEEL INEVITABLE."
      }
      subtitle={
        isRu
          ? "Официальные услуги музыкального продюсера FOXPHASE: продакшн битов, кастомные инструменталы, сведение, мастеринг и передача эксклюзивных прав."
          : "Official production services by FOXPHASE: Beat Production, Custom Beats, Mixing, Mastering, and Exclusive Rights."
      }
    >
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 md:px-10">
        {/* Official Price Table */}
        <FadeUpBlock>
          <div className="surface-glass mb-14 overflow-hidden rounded-3xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-8 sm:py-5">
              <div className="flex items-center gap-3">
                <Sliders size={18} className="text-red-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-white">
                  {isRu
                    ? "ОФИЦИАЛЬНЫЙ ПРАЙС-ЛИСТ FOXPHASE"
                    : "OFFICIAL FOXPHASE PRICE SCHEDULE"}
                </span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#85878D]">
                USD / RUB
              </span>
            </div>

            <div className="divide-y divide-white/10">
              {[
                {
                  serviceEn: "MP3 Beat",
                  serviceRu: "MP3 Бит (Аренда)",
                  priceEn: "$15 / 1500 ₽",
                  priceRu: "$15 / 1500 ₽",
                  href: "/beats",
                },
                {
                  serviceEn: "WAV Beat",
                  serviceRu: "WAV Бит (Студийный мастер)",
                  priceEn: "$20 / 2000 ₽",
                  priceRu: "$20 / 2000 ₽",
                  href: "/beats",
                },
                {
                  serviceEn: "Exclusive Rights",
                  serviceRu: "Exclusive Rights (Эксклюзивные права)",
                  priceEn: "By Agreement (По договорённости)",
                  priceRu: "По договорённости",
                  href: "/contact?topic=Exclusive%20Rights",
                },
                {
                  serviceEn: "Custom Beat",
                  serviceRu: "Custom Beat (Бит на заказ)",
                  priceEn: "By Agreement (По договорённости)",
                  priceRu: "По договорённости",
                  href: "/contact?topic=Custom%20Beat",
                },
                {
                  serviceEn: "Mixing",
                  serviceRu: "Mixing (Сведение)",
                  priceEn: "TBD / Upon Inquiry (Уточняется)",
                  priceRu: "Уточняется",
                  href: "/contact?topic=Mixing",
                },
                {
                  serviceEn: "Mastering",
                  serviceRu: "Mastering (Мастеринг)",
                  priceEn: "TBD / Upon Inquiry (Уточняется)",
                  priceRu: "Уточняется",
                  href: "/contact?topic=Mastering",
                },
              ].map((row, idx) => (
                <div
                  key={row.serviceEn}
                  className="flex flex-col justify-between gap-3 px-5 py-4 transition hover:bg-red-950/15 sm:flex-row sm:items-center sm:px-8 sm:py-5"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs text-red-400">
                      0{idx + 1}
                    </span>
                    <span className="font-display text-lg font-bold text-white md:text-xl">
                      {isRu ? row.serviceRu : row.serviceEn}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span className="font-mono text-sm font-bold text-[#E8E8E8] md:text-base">
                      {isRu ? row.priceRu : row.priceEn}
                    </span>
                    <Link
                      href={row.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-white transition hover:border-red-500 hover:bg-red-600"
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
                    <div className="flex items-center justify-between">
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
                    href={`/contact?topic=${encodeURIComponent(srv.topicValue)}`}
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#050505] transition hover:bg-red-500 hover:text-white"
                  >
                    <span>
                      {isRu ? "Оформить заявку" : "Request Details"}
                    </span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </Interactive3DTilt>
            </FadeUpBlock>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
