"use client";

import React from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import {
  RevealHeading,
  FadeUpBlock,
  ParallaxSection,
} from "./motion/reveal-text";
import { InteractiveSonicCanvas } from "./motion/interactive-sonic-canvas";

export function PageFrame({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] text-[#E8E8E8]">
      <InteractiveSonicCanvas />
      <SiteHeader />
      <main className="relative z-10 w-full overflow-x-hidden">
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 md:px-10 md:pt-24">
          <ParallaxSection offset={22}>
            <FadeUpBlock>
              <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-red-500/30 bg-red-950/20 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8E8E8] sm:text-[11px] sm:tracking-[0.26em]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                <span className="truncate">{eyebrow}</span>
              </div>
            </FadeUpBlock>

            <RevealHeading
              as="h1"
              text={title}
              className="max-w-5xl font-display text-3xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-chrome sm:text-5xl md:text-7xl"
            />

            {subtitle && (
              <FadeUpBlock delay={0.16}>
                <p className="mt-5 max-w-2xl text-sm leading-6 text-[#85878D] sm:text-base sm:leading-7 md:text-lg">
                  {subtitle}
                </p>
              </FadeUpBlock>
            )}
          </ParallaxSection>
        </section>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
