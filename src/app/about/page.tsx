"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Disc3, Award, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { genresList } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import {
  FadeUpBlock,
  ParallaxSection,
  Interactive3DTilt,
  RevealCardMedia,
} from "@/components/motion/reveal-text";
import { Canonical3DArtifact } from "@/components/motion/canonical-3d-artifact";

export default function AboutPage() {
  const { locale } = useFoxphase();
  const isRu = locale === "ru";

  return (
    <PageFrame
      eyebrow={isRu ? "О ПРОДЮСЕРЕ · МАНИФЕСТ" : "ABOUT THE PRODUCER · MANIFESTO"}
      title={isRu ? "ЗВУК ПРЕВЫШЕ ЛИЧНОСТИ." : "SOUND BEFORE IDENTITY."}
      subtitle={
        isRu
          ? "FOXPHASE — независимый музыкальный продюсер и битмейкер из Омска с 5-летним опытом и международным звучанием."
          : "FOXPHASE is an independent music producer and sound architect from Omsk, Russia, with 5 years of production experience across Trap, Rage, Ambient, Phonk, House, and Experimental music."
      }
    >
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 md:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Narrative & Philosophy */}
          <div className="space-y-6 sm:space-y-8">
            <FadeUpBlock>
              <div className="surface-card rounded-3xl p-6 sm:p-10">
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-red-400">
                  {`[01 // ${
                    isRu ? "БИОГРАФИЯ И ЭВОЛЮЦИЯ" : "BIOGRAPHY & EVOLUTION"
                  }]`}
                </span>
                <p className="mt-5 text-base leading-7 text-white sm:text-lg sm:leading-8 md:text-xl">
                  {isRu
                    ? "FOXPHASE — независимый музыкальный продюсер и битмейкер (г. Омск, Россия). За 5 лет работы в индустрии проект прошёл трансформацию от раннего псевдонима FOXMXNAXM к полноценной международной звуковой идентичности FOXPHASE."
                    : "FOXPHASE is an independent music producer and beatmaker based in Omsk, Russia. Over five years of intensive studio engineering, the project evolved from the earlier alias FOXMXNAXM into the unified international sonic identity FOXPHASE."}
                </p>
                <p className="mt-4 text-sm leading-7 text-[#85878D]">
                  {isRu
                    ? "Звучание строится на пересечении плотного низкочастотного давления, холодного металлического саунд-дизайна и кинематографичного космического пространства."
                    : "The sonic signature operates at the intersection of heavy sub-frequency pressure, cold metallic synthesis, and deep spatial architecture."}
                </p>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#85878D]">
                    {isRu ? "ОСНОВНЫЕ ЖАНРЫ:" : "SONIC SPECTRUM:"}
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {genresList.map((g) => (
                      <span
                        key={g}
                        className="rounded-full border border-red-500/30 bg-red-950/20 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUpBlock>

            {/* Strict Anonymity Manifesto */}
            <FadeUpBlock delay={0.12}>
              <div className="surface-glass rounded-3xl p-6 sm:p-10">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-red-400" />
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-white">
                    {isRu
                      ? "ПРИНЦИП АНОНИМНОСТИ"
                      : "STRICT ANONYMOUS IDENTITY"}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-[#85878D]">
                  {isRu
                    ? "FOXPHASE принципиально придерживается анонимного визуального образа. Лицо, настоящее имя и личные данные не раскрываются: в центре внимания находятся исключительно музыка, бренд, хромированная графика и звуковой сигнал."
                    : "FOXPHASE deliberately maintains a strict anonymous visual presence. No face, legal name, or private biography is ever disclosed — the music, the chrome emblem, and the frequency architecture speak for themselves."}
                </p>
              </div>
            </FadeUpBlock>

            <Canonical3DArtifact
              label={
                isRu
                  ? "ИНТЕРАКТИВНЫЙ 3D ГИРОСКОП FOXPHASE"
                  : "INTERACTIVE 3D GYROSCOPE // FOXPHASE"
              }
            />
          </div>

          {/* Right Column: Official Emblem + Telemetry Facts + Achievements */}
          <div className="space-y-6">
            <ParallaxSection offset={24}>
              <RevealCardMedia>
                <Interactive3DTilt intensity={10}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-red-500/25 bg-[#050505] shadow-crimson">
                    <Image
                      src="/brand/foxphase-logo-chrome.jpg"
                      alt="FOXPHASE Official Chrome Identity"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-contain p-2 sm:object-cover sm:p-0"
                    />
                  </div>
                </Interactive3DTilt>
              </RevealCardMedia>
            </ParallaxSection>

            <div className="grid grid-cols-2 gap-4">
              <div className="surface-card rounded-2xl p-5">
                <MapPin size={18} className="mb-3 text-red-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                  {isRu ? "ЛОКАЦИЯ" : "ORIGIN"}
                </span>
                <p className="mt-1 font-display text-base font-bold text-white sm:text-lg">
                  {isRu ? "Омск, Россия" : "Omsk, Russia"}
                </p>
              </div>

              <div className="surface-card rounded-2xl p-5">
                <Clock size={18} className="mb-3 text-red-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                  {isRu ? "ОПЫТ" : "EXPERIENCE"}
                </span>
                <p className="mt-1 font-display text-base font-bold text-white sm:text-lg">
                  {isRu ? "5 лет в продакшне" : "5 Years Production"}
                </p>
              </div>

              <div className="surface-card rounded-2xl p-5">
                <Disc3 size={18} className="mb-3 text-red-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                  {isRu ? "ПРОСЛУШИВАНИЯ" : "APPROX. STREAMS"}
                </span>
                <p className="mt-1 font-display text-2xl font-black text-chrome">
                  ~1–2M
                </p>
              </div>

              <div className="surface-card rounded-2xl p-5">
                <Award size={18} className="mb-3 text-red-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                  {isRu ? "НАГРАДА / ПЛЕЙКА" : "MILESTONE PLAQUE"}
                </span>
                <p className="mt-1 font-display text-2xl font-black text-crimson-chrome">
                  100K+
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#050505] shadow-chrome transition hover:bg-red-500 hover:text-white"
            >
              <span>
                {isRu ? "СВЯЗАТЬСЯ С FOXPHASE" : "WORK WITH FOXPHASE"}
              </span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
