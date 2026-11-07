"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { socials } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";

export function SiteFooter() {
  const { locale } = useFoxphase();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050505] px-5 pb-28 pt-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.3fr_1fr_1fr]">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3.5">
              <div className="relative h-11 w-16 overflow-hidden rounded-xl border border-white/15 bg-[#050505]">
                <Image
                  src="/brand/foxphase-logo-chrome.jpg"
                  alt="FOXPHASE Chrome Emblem"
                  fill
                  sizes="64px"
                  className="object-cover scale-125"
                />
              </div>
              <div>
                <p className="font-display text-xl font-black tracking-[0.12em] text-chrome">
                  FOXPHASE
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#85878D]">
                  INDEPENDENT SOUND. NO LIMITS.
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#85878D]">
              {locale === "ru"
                ? "Цифровая экосистема и авторский каталог независимого музыкального продюсера FOXPHASE. Омск / Международный продакшн."
                : "Official digital experience and sonic catalog of independent music producer FOXPHASE. Engineered in Omsk for global artists."}
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white">
              {locale === "ru" ? "Навигация" : "Platform"}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5 text-sm text-[#85878D]">
              <Link href="/beats" className="hover:text-white transition">
                {locale === "ru" ? "Каталог битов" : "Beat Store"}
              </Link>
              <Link href="/licenses" className="hover:text-white transition">
                {locale === "ru" ? "Лицензии" : "Licenses"}
              </Link>
              <Link href="/services" className="hover:text-white transition">
                {locale === "ru" ? "Услуги и прайс" : "Services"}
              </Link>
              <Link href="/releases" className="hover:text-white transition">
                {locale === "ru" ? "Дискография" : "Releases"}
              </Link>
              <Link href="/collaborations" className="hover:text-white transition">
                {locale === "ru" ? "Коллаборации" : "Portfolio"}
              </Link>
              <Link href="/about" className="hover:text-white transition">
                {locale === "ru" ? "О продюсере" : "About"}
              </Link>
              <Link href="/account" className="hover:text-white transition">
                {locale === "ru" ? "Личный кабинет" : "Account"}
              </Link>
              <Link href="/admin" className="hover:text-white transition">
                {locale === "ru" ? "Админ-панель" : "Admin"}
              </Link>
            </div>
          </div>

          {/* Verified Channels */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white">
              {locale === "ru" ? "Официальные каналы" : "Verified Channels"}
            </p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm">
              {socials.map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between border-b border-white/5 pb-2 text-[#E8E8E8] transition hover:border-white/30 hover:text-white"
                >
                  <span>{name}</span>
                  <ArrowUpRight
                    size={14}
                    className="text-[#85878D] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 text-xs text-[#85878D] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} FOXPHASE (ex. FOXMXNAXM).{" "}
            {locale === "ru"
              ? "Все права защищены. Анонимный образ — фокус на звуке."
              : "All rights reserved. Anonymous identity — sound comes first."}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]">
            TRAP · RAGE · AMBIENT · PHONK · HOUSE · EXPERIMENTAL
          </p>
        </div>
      </div>
    </footer>
  );
}
