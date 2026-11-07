"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Sliders } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { officialServices } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { FadeUpBlock } from "@/components/motion/reveal-text";

export default function ServicesPage() {
  const { locale } = useFoxphase();
  const isRu = locale === "ru";

  return (
    <PageFrame
      eyebrow={isRu ? "УСЛУГИ И ПРАЙС-ЛИСТ" : "SERVICES & RATE CARD"}
      title={isRu ? "MAKE THE RECORD FEEL INEVITABLE." : "MAKE THE RECORD FEEL INEVITABLE."}
      subtitle={
        isRu
          ? "Официальные услуги музыкального продюсера FOXPHASE: продакшн битов, кастомные инструменталы, сведение, мастеринг и передача эксклюзивных прав."
          : "Official production services by FOXPHASE: Beat Production, Custom Beats, Mixing, Mastering, and Exclusive Rights."
      }
    >
      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-10">
        {/* Official Price Table (Exact match to Master Prompt Section 04) */}
        <FadeUpBlock>
          <div className="surface-glass mb-16 overflow-hidden rounded-3xl">
            <div className="border-b border-white/10 px-6 py-5 md:px-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sliders size={18} className="text-white" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-white">
                  {isRu ? "ОФИЦИАЛЬНЫЙ ПРАЙС-ЛИСТ FOXPHASE" : "OFFICIAL FOXPHASE PRICE SCHEDULE"}
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
                  serviceRu: "MP3 Beat",
                  priceEn: "$15 / 1500 ₽",
                  priceRu: "$15 / 1500 ₽",
                  href: "/beats",
                },
                {
                  serviceEn: "WAV Beat",
                  serviceRu: "WAV Beat",
                  priceEn: "$20 / 2000 ₽",
                  priceRu: "$20 / 2000 ₽",
                  href: "/beats",
                },
                {
                  serviceEn: "Exclusive Rights",
                  serviceRu: "Exclusive Rights",
                  priceEn: "By Agreement (По договорённости)",
                  priceRu: "По договорённости",
                  href: "/contact?topic=Exclusive%20Rights",
                },
                {
                  serviceEn: "Custom Beat",
                  serviceRu: "Custom Beat",
                  priceEn: "By Agreement (По договорённости)",
                  priceRu: "По договорённости",
                  href: "/contact?topic=Custom%20Beat",
                },
                {
                  serviceEn: "Mixing",
                  serviceRu: "Mixing",
                  priceEn: "TBD / Upon Inquiry (Уточняется)",
                  priceRu: "Уточняется",
                  href: "/contact?topic=Mixing",
                },
                {
                  serviceEn: "Mastering",
                  serviceRu: "Mastering",
                  priceEn: "TBD / Upon Inquiry (Уточняется)",
                  priceRu: "Уточняется",
                  href: "/contact?topic=Mastering",
                },
              ].map((row, idx) => (
                <div
                  key={row.serviceEn}
                  className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 transition hover:bg-white/[0.03] md:px-8"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#85878D]">
                      0{idx + 1}
                    </span>
                    <span className="font-display text-lg font-bold text-white md:text-xl">
                      {isRu ? row.serviceRu : row.serviceEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-sm font-bold text-[#E8E8E8] md:text-base">
                      {isRu ? row.priceRu : row.priceEn}
                    </span>
                    <Link
                      href={row.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-white transition hover:border-white hover:bg-white hover:text-[#050505]"
                    >
                      <span>{isRu ? "Оформить" : "Select"}</span>
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
            <FadeUpBlock
              key={srv.id}
              delay={idx * 0.06}
              className="surface-card surface-card-hover flex flex-col justify-between rounded-3xl p-7 md:p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#85878D]">
                    {`//${srv.index}`}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1 font-mono text-xs font-bold text-white">
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
                        <CheckCircle2 size={14} className="text-white shrink-0" />
                        <span>{point}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <Link
                href={`/contact?topic=${encodeURIComponent(srv.topicValue)}`}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#050505] transition hover:bg-[#E8E8E8]"
              >
                <span>{isRu ? "Оформить заявку" : "Request Details"}</span>
                <ArrowUpRight size={14} />
              </Link>
            </FadeUpBlock>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
