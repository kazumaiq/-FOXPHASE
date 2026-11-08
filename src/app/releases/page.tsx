"use client";

import React from "react";
import { ArrowUpRight, Disc3, Radio } from "lucide-react";
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
          ? "Официальные музыкальные релизы FOXPHASE: BLADE, DREAMS, Last Breath и Forgotten Memories. Слушайте на Яндекс Музыке."
          : "Official FOXPHASE discography featuring BLADE, DREAMS, Last Breath, and Forgotten Memories. Streaming via Yandex Music."
      }
    >
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 md:px-10">
        {/* Main Artist Streaming Platform Banner */}
        <FadeUpBlock>
          <div className="surface-glass mb-12 flex flex-col justify-between gap-6 rounded-3xl p-6 md:flex-row md:items-center md:p-8">
            <div className="flex items-start gap-4">
              <Radio size={24} className="mt-1 shrink-0 text-red-400" />
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-white">
                  {isRu
                    ? "ОФИЦИАЛЬНАЯ КАРТОЧКА АРТИСТА · ЯНДЕКС МУЗЫКА"
                    : "VERIFIED ARTIST HUB · YANDEX MUSIC"}
                </p>
                <p className="mt-1.5 max-w-2xl text-sm text-[#85878D]">
                  {isRu
                    ? "Все подтверждённые релизы FOXPHASE доступны в официальном профиле артиста. Дополнительные ссылки и превью управляются через /admin."
                    : "All verified FOXPHASE releases stream directly on the official artist profile. No unverified third-party links are fabricated."}
                </p>
              </div>
            </div>

            <a
              href="https://music.yandex.com/artist/21691221"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] shadow-chrome-sm transition hover:bg-red-500 hover:text-white"
            >
              <span>
                {isRu ? "Открыть Яндекс Музыку" : "Open Yandex Music"}
              </span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </FadeUpBlock>

        {/* 4 Releases Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {releases.map((rel, idx) => (
            <FadeUpBlock key={rel.id} delay={idx * 0.08}>
              <Interactive3DTilt intensity={8} className="h-full">
                <div className="surface-card surface-card-hover group flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8">
                  <div>
                    <RevealCardMedia delay={idx * 0.06}>
                      <div
                        className="relative mb-6 flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/15 p-5 sm:p-6"
                        style={{
                          background:
                            idx % 2 === 0
                              ? "radial-gradient(circle at 30% 25%, #EF4444 0%, #450A0A 38%, #050505 100%)"
                              : rel.coverStyle,
                        }}
                      >
                        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.24em] text-white/80">
                          <span>{rel.code}</span>
                          <span>{rel.year}</span>
                        </div>

                        <div className="flex items-end justify-between">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/75">
                              {isRu ? rel.type.ru : rel.type.en}
                            </span>
                            <h2 className="mt-1 font-display text-2xl font-black uppercase tracking-tight text-white sm:text-4xl">
                              {rel.title}
                            </h2>
                          </div>
                          <Disc3
                            size={32}
                            className="text-white/80 transition-transform duration-700 group-hover:rotate-180"
                          />
                        </div>
                      </div>
                    </RevealCardMedia>

                    <p className="text-sm leading-7 text-[#85878D]">
                      {isRu ? rel.description.ru : rel.description.en}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                    <span className="font-mono text-xs uppercase tracking-widest text-red-400">
                      PROD. BY FOXPHASE
                    </span>
                    <a
                      href={rel.yandexMusicUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:border-red-500 hover:bg-red-600"
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
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
