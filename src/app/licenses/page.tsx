"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, Check, ArrowUpRight, FileAudio, Scale } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { licenseDefinitions } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { FadeUpBlock } from "@/components/motion/reveal-text";

export default function LicensesPage() {
  const { locale } = useFoxphase();
  const isRu = locale === "ru";

  return (
    <PageFrame
      eyebrow={isRu ? "ЛИЦЕНЗИРОВАНИЕ И ПРАВА" : "LICENSING ARCHITECTURE"}
      title={isRu ? "ТИПЫ ЛИЦЕНЗИЙ." : "CLEAR RIGHTS. ZERO FRICTION."}
      subtitle={
        isRu
          ? "Подробное описание четырёх уровней лицензирования инструменталов FOXPHASE: BASIC, PREMIUM, UNLIMITED и EXCLUSIVE."
          : "Detailed breakdown of the four official FOXPHASE licensing tiers: BASIC, PREMIUM, UNLIMITED, and EXCLUSIVE RIGHTS."
      }
    >
      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-10">
        {/* Mandatory Legal Integrity Notice */}
        <FadeUpBlock>
          <div className="mb-12 rounded-3xl border border-white/15 bg-[#101114]/90 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <ShieldAlert size={24} className="text-white shrink-0 mt-1" />
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-white">
                  {isRu
                    ? "ЮРИДИЧЕСКОЕ УВЕДОМЛЕНИЕ · РЕДАКТИРУЕМЫЕ ПАРАМЕТРЫ"
                    : "LEGAL NOTICE · EDITABLE CONTRACT PARAMETERS"}
                </p>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[#85878D]">
                  {isRu
                    ? "Точные договорные обязательства, лимиты стримов, территориальные условия и доли паблишинга формируются индивидуально и требуют финального согласования с FOXPHASE. Мы не публикуем вымышленные юридические ограничения."
                    : "Exact contractual stream caps, publishing splits, and territorial clauses are customizable per agreement and require direct confirmation with FOXPHASE. No fabricated legal terms are asserted."}
                </p>
              </div>
            </div>
            <Link
              href="/contact?topic=Exclusive%20Rights"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#E8E8E8]"
            >
              <span>{isRu ? "Согласовать условия" : "Request Custom Terms"}</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </FadeUpBlock>

        {/* 4 License Tiers Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {licenseDefinitions.map((lic, index) => (
            <FadeUpBlock
              key={lic.id}
              delay={index * 0.08}
              className="surface-card surface-card-hover flex flex-col justify-between rounded-3xl p-7 md:p-9"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#85878D]">
                      {`0${index + 1} // ${isRu ? lic.badge.ru : lic.badge.en}`}
                    </span>
                    <h2 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-white">
                      {isRu ? lic.name.ru : lic.name.en}
                    </h2>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-right">
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                      {isRu ? "СТОИМОСТЬ" : "RATE"}
                    </span>
                    <span className="font-display text-xl font-bold text-white">
                      {isRu ? lic.priceDisplay.ru : lic.priceDisplay.en}
                    </span>
                  </div>
                </div>

                {/* Formats */}
                <div className="mt-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#85878D] flex items-center gap-2">
                    <FileAudio size={14} className="text-white" />
                    {isRu ? "ФОРМАТЫ ФАЙЛОВ:" : "DELIVERED FILE FORMATS:"}
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
                <dl className="mt-6 space-y-4 text-sm">
                  <div className="rounded-2xl border border-white/5 bg-[#050505]/60 p-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                      {isRu ? "УСЛОВИЯ ИСПОЛЬЗОВАНИЯ" : "USAGE TERMS"}
                    </dt>
                    <dd className="mt-1.5 text-xs leading-6 text-[#85878D]">
                      {isRu ? lic.usageTerms.ru : lic.usageTerms.en}
                    </dd>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-[#050505]/60 p-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                      {isRu ? "КОММЕРЧЕСКОЕ ИСПОЛЬЗОВАНИЕ" : "COMMERCIAL USE"}
                    </dt>
                    <dd className="mt-1.5 text-xs leading-6 text-[#85878D]">
                      {isRu ? lic.commercialUse.ru : lic.commercialUse.en}
                    </dd>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-[#050505]/60 p-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                      {isRu ? "ОГРАНИЧЕНИЯ И УСЛОВИЯ ПУБЛИКАЦИИ" : "RESTRICTIONS & PUBLISHING"}
                    </dt>
                    <dd className="mt-1.5 text-xs leading-6 text-[#85878D]">
                      {isRu ? lic.restrictions.ru : lic.restrictions.en}{" "}
                      {isRu ? lic.publishingTerms.ru : lic.publishingTerms.en}
                    </dd>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-[#050505]/60 p-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                      {isRu ? "СТАТУС ЭКСКЛЮЗИВНОСТИ" : "EXCLUSIVITY STATUS"}
                    </dt>
                    <dd className="mt-1.5 text-xs leading-6 text-[#85878D]">
                      {isRu ? lic.exclusiveInfo.ru : lic.exclusiveInfo.en}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="mb-4 flex items-center gap-2 font-mono text-[11px] text-[#85878D]">
                  <Scale size={13} className="text-white shrink-0" />
                  <span>{isRu ? lic.legalNotice.ru : lic.legalNotice.en}</span>
                </p>

                <div className="flex flex-wrap gap-3">
                  {lic.id === "exclusive" || lic.id === "unlimited" ? (
                    <Link
                      href="/contact?topic=Exclusive%20Rights"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#E8E8E8]"
                    >
                      <span>
                        {isRu ? "Индивидуальный запрос" : "Submit Individual Request"}
                      </span>
                      <ArrowUpRight size={14} />
                    </Link>
                  ) : (
                    <Link
                      href="/beats"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:bg-[#E8E8E8]"
                    >
                      <Check size={14} />
                      <span>
                        {isRu ? "Выбрать бит в каталоге" : "Select Beat in Store"}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </FadeUpBlock>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
