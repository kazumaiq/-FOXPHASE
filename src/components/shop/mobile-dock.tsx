"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, ListMusic, ShoppingBag, BadgeCheck, Send } from "lucide-react";
import { useFoxphase } from "@/components/providers/foxphase-provider";

/**
 * App-style bottom navigation for phones. Always visible, large tap targets,
 * cart badge, and an accented center "Cart" button so users always know where to tap.
 */
export function MobileDock() {
  const pathname = usePathname() ?? "/";
  const { locale, cart } = useFoxphase();
  const isRu = locale === "ru";

  const items = [
    { href: "/", label: isRu ? "Главная" : "Home", icon: House, color: "text-white" },
    { href: "/beats", label: isRu ? "Биты" : "Beats", icon: ListMusic, color: "text-amber-300" },
    { href: "/cart", label: isRu ? "Корзина" : "Cart", icon: ShoppingBag, color: "text-white", center: true },
    { href: "/licenses", label: isRu ? "Цены" : "Prices", icon: BadgeCheck, color: "text-cyan-300" },
    { href: "/contact", label: isRu ? "Связь" : "Contact", icon: Send, color: "text-violet-300" },
  ];

  return (
    <>
      <div aria-hidden="true" className="h-[76px] lg:hidden" />
      <nav
        aria-label={isRu ? "Мобильная навигация" : "Mobile navigation"}
        className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-[#07070A]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl lg:hidden"
      >
        <ul className="mx-auto grid max-w-md grid-cols-5 items-end px-2 pt-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);

            if (item.center) {
              return (
                <li key={item.href} className="flex justify-center">
                  <Link
                    href={item.href}
                    aria-label={`${item.label}: ${cart.length}`}
                    className="relative -mt-6 flex flex-col items-center gap-1"
                  >
                    <span
                      className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-rose-500 to-amber-400 text-white shadow-[0_8px_30px_rgba(239,68,68,0.45)] ring-4 ring-[#07070A] transition active:scale-95 ${
                        active ? "scale-105" : ""
                      }`}
                    >
                      <Icon size={22} />
                      {cart.length > 0 && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 font-mono text-[10px] font-bold text-[#050505]">
                          {cart.length}
                        </span>
                      )}
                    </span>
                    <span className="pb-1.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-1 rounded-xl py-2 transition active:scale-95 ${
                    active ? "bg-white/[0.06]" : ""
                  }`}
                >
                  <Icon size={20} className={active ? item.color : "text-[#85878D]"} />
                  <span
                    className={`font-mono text-[10px] font-semibold uppercase tracking-wide ${
                      active ? "text-white" : "text-[#85878D]"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className={`h-1 w-1 rounded-full ${active ? "bg-red-500" : "bg-transparent"}`} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
