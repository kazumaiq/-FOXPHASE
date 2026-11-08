"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { formatRub, formatUsd, licenseMeta, type LicenseMeta } from "@/lib/shop";

/**
 * Touch-friendly license selector with icons and color-coded tiers.
 * Exclusive Rights are shown as a link to the contact form (negotiated individually).
 */
export function LicensePicker({
  value,
  onChange,
  isRu,
  beatTitle,
  includeExclusive = false,
  size = "md",
}: {
  value: string;
  onChange: (id: LicenseMeta["id"]) => void;
  isRu: boolean;
  beatTitle?: string;
  includeExclusive?: boolean;
  size?: "md" | "lg";
}) {
  const tiers = includeExclusive ? licenseMeta : licenseMeta.filter((l) => l.online);

  return (
    <div
      role="radiogroup"
      aria-label={isRu ? "Выбор лицензии" : "License selection"}
      className={`grid gap-2 ${size === "lg" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}
    >
      {tiers.map((tier) => {
        const Icon = tier.icon;
        const active = value === tier.id;

        if (!tier.online) {
          return (
            <Link
              key={tier.id}
              href={`/contact?topic=Exclusive%20Rights${beatTitle ? `&beat=${encodeURIComponent(beatTitle)}` : ""}`}
              className={`group relative flex items-center gap-3 rounded-2xl border border-rose-500/40 bg-gradient-to-r from-rose-500/15 via-red-500/10 to-amber-500/10 p-3 text-left transition hover:border-rose-400 ${
                size === "lg" ? "sm:col-span-2" : "col-span-2 sm:col-span-4"
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-300">
                <Icon size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-rose-300">
                  {tier.medal} {tier.name}
                </span>
                <span className="block text-xs text-[#E8E8E8]/80">
                  {isRu ? "от 29 000 ₽ · обсуждается лично" : "from $350 · negotiated directly"}
                </span>
              </span>
              <ArrowUpRight size={16} className="shrink-0 text-rose-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          );
        }

        return (
          <button
            key={tier.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(tier.id)}
            className={`relative flex min-h-[64px] items-center gap-2.5 rounded-2xl border p-2.5 text-left transition active:scale-[0.98] sm:p-3 ${
              active
                ? `${tier.theme.border} ${tier.theme.activeBg} ring-2 ${tier.theme.ring}`
                : "border-white/10 bg-[#050505]/70 hover:border-white/30"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tier.theme.softBg} ${tier.theme.text}`}
            >
              <Icon size={17} />
            </span>
            <span className="min-w-0 flex-1">
              <span className={`block truncate font-mono text-[10px] font-bold uppercase tracking-wide ${tier.theme.text}`}>
                {tier.name.replace(" LEASE", "")}
              </span>
              <span className="block font-display text-sm font-bold leading-tight text-white">
                {isRu ? formatRub(tier.priceRub) : formatUsd(tier.priceUsd)}
              </span>
              <span className="block font-mono text-[10px] text-[#85878D]">
                {isRu ? formatUsd(tier.priceUsd) : formatRub(tier.priceRub)}
              </span>
            </span>
            {active && (
              <span
                className={`absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full ${tier.theme.dot} text-[#050505]`}
              >
                <Check size={11} strokeWidth={3} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
