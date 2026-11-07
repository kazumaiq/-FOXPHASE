"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, User, Shield, ArrowUpRight } from "lucide-react";
import { LanguageToggle } from "./language-toggle";
import { useFoxphase } from "@/components/providers/foxphase-provider";

const navItems = [
  { href: "/beats", en: "Beats", ru: "Биты" },
  { href: "/licenses", en: "Licenses", ru: "Лицензии" },
  { href: "/services", en: "Services", ru: "Услуги" },
  { href: "/releases", en: "Releases", ru: "Релизы" },
  { href: "/collaborations", en: "Portfolio", ru: "Портфолио" },
  { href: "/about", en: "About", ru: "О продюсере" },
  { href: "/contact", en: "Contact", ru: "Контакты" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, cart } = useFoxphase();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-10">
        {/* Brand Identity + Official Chrome FOX Emblem */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="relative h-9 w-12 overflow-hidden rounded-lg border border-white/15 bg-[#050505] shadow-chrome-sm transition duration-300 group-hover:border-white/40">
            <Image
              src="/brand/foxphase-logo-chrome.jpg"
              alt="FOXPHASE Official Chrome Logo"
              fill
              sizes="48px"
              className="object-cover object-center scale-125 transition duration-500 group-hover:scale-150"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base font-black tracking-[0.14em] text-chrome">
              FOXPHASE
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#85878D]">
              SOUND ARCHITECTURE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#85878D] lg:flex"
        >
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 transition-colors duration-300 hover:text-white ${
                  active ? "text-white" : "text-[#85878D]"
                }`}
              >
                {locale === "ru" ? item.ru : item.en}
                {active && (
                  <span className="absolute inset-x-0 -bottom-1 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Cluster */}
        <div className="flex items-center gap-2.5">
          <LanguageToggle />

          <Link
            href="/account"
            aria-label={locale === "ru" ? "Личный кабинет" : "Account"}
            className="hidden rounded-full border border-white/15 bg-white/[0.03] p-2 text-[#E8E8E8] transition hover:border-white/40 hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            <User size={15} />
          </Link>

          <Link
            href="/cart"
            aria-label="Cart"
            className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            <ShoppingBag size={14} />
            <span className="font-mono text-[11px]">{cart.length}</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="inline-flex rounded-full border border-white/15 bg-white/[0.03] p-2 text-white lg:hidden"
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#050505]/98 px-5 py-6 backdrop-blur-2xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-3 font-display text-lg font-bold uppercase tracking-wider text-[#E8E8E8] hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#85878D]">
                    0{idx + 1}
                  </span>
                  {locale === "ru" ? item.ru : item.en}
                </span>
                <ArrowUpRight size={16} className="text-[#85878D]" />
              </Link>
            ))}

            <div className="mt-4 grid grid-cols-2 gap-3 pt-2">
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#101114] py-3 text-xs font-semibold uppercase tracking-widest text-[#E8E8E8]"
              >
                <User size={14} />
                {locale === "ru" ? "Кабинет" : "Account"}
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#101114] py-3 text-xs font-semibold uppercase tracking-widest text-[#85878D]"
              >
                <Shield size={14} />
                Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
