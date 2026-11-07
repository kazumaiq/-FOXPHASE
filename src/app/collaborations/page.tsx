"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Users, Layers } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { collaborationArtists } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { FadeUpBlock } from "@/components/motion/reveal-text";

export default function CollaborationsPage() {
  const { locale } = useFoxphase();
  const isRu = locale === "ru";

  return (
    <PageFrame
      eyebrow={isRu ? "ПОРТФОЛИО И СОТРУДНИЧЕСТВА" : "PORTFOLIO & COLLABORATIONS"}
      title={isRu ? "BUILT IN CONVERSATION." : "BUILT IN CONVERSATION."}
      subtitle={
        isRu
          ? "Сеть артистов и музыкальных проектов, связанных с продакшном FOXPHASE. Мы публикуем только подтверждённые коллаборации без вымышленных релизов."
          : "Official roster of artists and creative collaborations associated with FOXPHASE. Individual project case studies, video reels, and release credits are managed without fabricated claims."
      }
    >
      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-10">
        {/* Roster Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collaborationArtists.map((artist, i) => (
            <FadeUpBlock
              key={artist.id}
              delay={i * 0.05}
              className="surface-card surface-card-hover group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#85878D]">
                  {`COLLAB // ${artist.index}`}
                </span>
                <Users size={15} className="text-[#85878D] group-hover:text-white" />
              </div>

              <div className="my-8">
                <h2 className="font-display text-3xl font-black tracking-tight text-white">
                  {artist.name}
                </h2>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-[#85878D]">
                  {isRu ? artist.role.ru : artist.role.en}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] uppercase tracking-wider text-[#85878D]">
                <span>FOXPHASE PRODUCTION</span>
                <span className="text-white">VERIFIED ROSTER</span>
              </div>
            </FadeUpBlock>
          ))}
        </div>

        {/* Modular Case Studies / Video / Project Expansion Architecture */}
        <FadeUpBlock delay={0.2}>
          <div className="surface-glass mt-16 rounded-3xl p-8 md:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-[#E8E8E8]">
                  <Layers size={15} />
                  <span>
                    {isRu
                      ? "АРХИТЕКТУРА КЕЙСОВ И ПРОЕКТОВ"
                      : "CASE STUDIES, COVERS & VIDEO REELS"}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-3xl font-black uppercase tracking-tight text-chrome md:text-4xl">
                  {isRu
                    ? "ОТКРЫТО ДЛЯ НОВЫХ СОВМЕСТНЫХ РАБОТ."
                    : "ENGINEERED FOR ARTIST COLLABORATION."}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#85878D]">
                  {isRu
                    ? "Раздел поддерживает добавление обложек, видеороликов и детальных разборов совместных проектов через админ-панель /admin по мере подтверждения материалов."
                    : "This portfolio architecture supports attaching verified cover art, video reels, and detailed studio case studies directly through the /admin panel."}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
                <Link
                  href="/contact?topic=Collaboration"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#050505] shadow-chrome transition hover:bg-[#E8E8E8]"
                >
                  <span>
                    {isRu ? "ПРЕДЛОЖИТЬ КОЛЛАБОРАЦИЮ" : "PROPOSE COLLABORATION"}
                  </span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </FadeUpBlock>
      </section>
    </PageFrame>
  );
}
