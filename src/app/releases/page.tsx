"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Disc3, Radio, Sparkles } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { releases } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import {
  FadeUpBlock,
  Interactive3DTilt,
  RevealCardMedia,
} from "@/components/motion/reveal-text";

export default function ReleasesPage() {
  const { locale } = useFoxphase();
  const isRu = locale === "ru";

  const [dynamicCovers, setDynamicCovers] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    fetch("/api/releases/artwork")
      .then((r) => r.json())
      .then((data) => {
        if (data?.covers) setDynamicCovers(data.covers);
      })
      .catch(() => {});
  }, []);

  const badgePalette = [
    "border-red-500/40 bg-red-950/70 text-red-200",
    "border-cyan-400/40 bg-cyan-950/70 text-cyan-200",
    "border-violet-400/40 bg-violet-950/70 text-violet-200",
    "border-amber-400/40 bg-amber-950/70 text-amber-200",
  ];

  return (
    <PageFrame
      eyebrow={isRu ? "ДИСКОГРАФИЯ FOXPHASE" : "OFFICIAL DISCOGRAPHY"}
      title={
        isRu
          ? "ОФИЦИАЛЬНЫЕ РЕЛИЗЫ."
          : "SELECTED WORK, VERIFIED FIRST."
      }
      subtitle={
        isRu
          ? "Официальные музыкальные релизы FOXPHASE: BLADE, DREAMS, Last Breath и Forgotten Memories с оригинальными обложками со стриминговых площадок."
          : "Official FOXPHASE discography featuring BLADE, DREAMS, Last Breath, and Forgotten Memories with verified streaming cover artwork."
      }
    >
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 md:px-10">
        {/* Main Artist Streaming Platform Banner */}
        <FadeUpBlock>
          <div className="surface-glass mb-12 flex flex-col justify-between gap-6 rounded-3xl border border-cyan-500/25 p-5 sm:p-8 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <Radio size={24} className="mt-1 shrink-0 text-cyan-300" />
              <div className="min-w-0">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-white">
                  {isRu
                    ? "ОФИЦИАЛЬНАЯ КАРТОЧКА АРТИСТА · ЯНДЕКС МУЗЫКА И СТРИМИНГ"
                    : "ОФИЦИАЛЬНЫЙ ПРОФИЛЬ · ЯНДЕКС МУЗЫКА"}
                </p>
                <p className="mt-1.5 max-w-2xl text-xs leading-6 text-[#85878D] sm:text-sm">
                  {isRu
                    ? "Обложки релизов синхронизируются автоматически через API стриминговых платформ (Spotify / Apple Music / Deezer CDN). Слушайте полные версии треков в официальном профиле."
                    : "Release cover art is dynamically synced from official streaming APIs (Spotify / Apple Music / Deezer CDN). Stream full tracks on the verified artist profile."}
                </p>
              </div>
            </div>

            <a
              href="https://music.yandex.com/artist/21691221"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-white via-cyan-100 to-amber-200 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] shadow-chrome-sm transition hover:brightness-105"
            >
              <span>
                {isRu ? "Открыть Яндекс Музыку" : "Open Yandex Music"}
              </span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </FadeUpBlock>

        {/* 4 Releases Grid with Official Cover Art */}
        <div className="grid gap-6 md:grid-cols-2">
          {releases.map((rel, idx) => {
            const coverSrc = dynamicCovers[rel.slug] || rel.coverUrl;
            const accentBadge = badgePalette[idx % badgePalette.length];

            return (
              <FadeUpBlock key={rel.id} delay={idx * 0.08}>
                <Interactive3DTilt intensity={7} className="h-full">
                  <div className="surface-card surface-card-hover group flex h-full flex-col justify-between rounded-3xl p-5 sm:p-8">
                    <div>
                      <RevealCardMedia delay={idx * 0.06}>
                        <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0A0B0E] sm:aspect-[16/11]">
                          <Image
                            src={coverSrc}
                            alt={`${rel.title} — Official Release Cover`}
                            fill
                            sizes="(max-width: 768px) 92vw, 45vw"
                            className="object-cover transition duration-700 group-hover:scale-105"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/25 to-black/30" />

                          <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white">
                            <span className="rounded-full border border-white/20 bg-black/65 px-3 py-1 backdrop-blur-md">
                              {rel.code} · {rel.year}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold backdrop-blur-md ${accentBadge}`}
                            >
                              <Sparkles size={11} />
                              <span>ОРИГИНАЛЬНЫЙ РЕЛИЗ</span>
                            </span>
                          </div>

                          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                            <div className="min-w-0">
                              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
                                {isRu ? rel.type.ru : rel.type.en}
                              </span>
                              <h2 className="mt-1 break-words font-display text-2xl font-black uppercase leading-tight tracking-tight text-white drop-shadow sm:text-4xl">
                                {rel.title}
                              </h2>
                            </div>
                            <Disc3
                              size={32}
                              className="shrink-0 text-white/85 transition-transform duration-700 group-hover:rotate-180"
                            />
                          </div>
                        </div>
                      </RevealCardMedia>

                      <p className="text-sm leading-7 text-[#85878D]">
                        {isRu ? rel.description.ru : rel.description.en}
                      </p>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                      <span className="font-mono text-xs uppercase tracking-widest text-amber-300">
                        FOXPHASE PRODUCTION
                      </span>
                      <a
                        href={rel.yandexMusicUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-500/10 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-cyan-200 transition hover:bg-cyan-400 hover:text-[#050505]"
                      >
                        <span>
                          {isRu
                            ? "Слушать на Яндекс Музыке"
                            : "Listen on Yandex Music"}
                        </span>
                        <ArrowUpRight size={14} />
                      </a>
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
