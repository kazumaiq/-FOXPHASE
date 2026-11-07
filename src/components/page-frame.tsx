"use client";

import React from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { RevealHeading, FadeUpBlock } from "./motion/reveal-text";
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
    <div className="relative min-h-screen bg-[#050505] text-[#E8E8E8]">
      <InteractiveSonicCanvas />
      <SiteHeader />
      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-5 pb-12 pt-16 md:px-10 md:pt-28">
          <FadeUpBlock>
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-[#E8E8E8]">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {eyebrow}
            </div>
          </FadeUpBlock>

          <RevealHeading
            as="h1"
            text={title}
            className="max-w-5xl font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-chrome sm:text-6xl md:text-7xl"
          />

          {subtitle && (
            <FadeUpBlock delay={0.18}>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#85878D] md:text-lg">
                {subtitle}
              </p>
            </FadeUpBlock>
          )}
        </section>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
