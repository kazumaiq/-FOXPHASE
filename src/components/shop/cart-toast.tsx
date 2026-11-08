"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CircleCheck, X, ShoppingBag } from "lucide-react";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { beats } from "@/content/site";
import { formatRub, formatUsd, getLicenseMeta } from "@/lib/shop";

/** Confirmation toast shown every time a license is added to the cart. */
export function CartToast() {
  const { lastAdded, dismissToast, locale, cart } = useFoxphase();
  const isRu = locale === "ru";

  useEffect(() => {
    if (!lastAdded) return;
    const t = window.setTimeout(dismissToast, 4200);
    return () => window.clearTimeout(t);
  }, [lastAdded, dismissToast]);

  const beat = lastAdded ? beats.find((b) => b.id === lastAdded.beatId) : null;
  const meta = lastAdded ? getLicenseMeta(lastAdded.licenseId) : null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[68px] z-[70] flex justify-center px-3 sm:justify-end sm:px-6">
      <AnimatePresence>
        {lastAdded && beat && meta && (
          <motion.div
            key={lastAdded.at}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border border-emerald-400/40 bg-[#0A0D0C]/95 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <div className="flex items-start gap-3 p-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                <CircleCheck size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                  {isRu ? "Добавлено в корзину" : "Added to cart"}
                </p>
                <p className="truncate font-display text-sm font-bold text-white">{beat.title}</p>
                <p className={`font-mono text-[11px] ${meta.theme.text}`}>
                  {meta.medal} {meta.name} · {isRu ? formatRub(meta.priceRub) : formatUsd(meta.priceUsd)}
                </p>
              </div>
              <button
                type="button"
                onClick={dismissToast}
                aria-label={isRu ? "Закрыть" : "Close"}
                className="rounded-full p-1 text-[#85878D] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            <Link
              href="/cart"
              onClick={dismissToast}
              className="flex items-center justify-center gap-2 border-t border-white/10 bg-emerald-500/15 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-emerald-200 transition hover:bg-emerald-500/25"
            >
              <ShoppingBag size={14} />
              <span>
                {isRu ? `Перейти в корзину (${cart.length})` : `Go to cart (${cart.length})`}
              </span>
            </Link>
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4.2, ease: "linear" }}
              className="h-0.5 origin-left bg-emerald-400"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
