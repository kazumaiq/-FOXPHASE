"use client";

import React from "react";
import { Check, ShoppingBag, UserRound, CreditCard } from "lucide-react";

/** Visual 3-step progress so buyers always know where they are in the purchase. */
export function CheckoutSteps({ current, isRu }: { current: 1 | 2 | 3; isRu: boolean }) {
  const steps = [
    { n: 1, icon: ShoppingBag, label: isRu ? "Корзина" : "Cart" },
    { n: 2, icon: UserRound, label: isRu ? "Данные" : "Details" },
    { n: 3, icon: CreditCard, label: isRu ? "Оплата" : "Payment" },
  ] as const;

  return (
    <ol className="mb-8 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0B0B0F]/80 p-2 sm:gap-3 sm:p-3">
      {steps.map((step, i) => {
        const done = step.n < current;
        const active = step.n === current;
        const Icon = done ? Check : step.icon;
        return (
          <React.Fragment key={step.n}>
            <li
              className={`flex min-w-0 flex-1 items-center gap-2 rounded-xl px-2 py-2 sm:px-3 ${
                active ? "bg-gradient-to-r from-amber-400/20 to-red-500/10" : ""
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  done
                    ? "bg-emerald-500 text-[#050505]"
                    : active
                    ? "bg-gradient-to-br from-amber-300 to-orange-400 text-[#050505]"
                    : "bg-white/[0.06] text-[#85878D]"
                }`}
              >
                <Icon size={15} strokeWidth={done ? 3 : 2} />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-[#85878D]">
                  {isRu ? `Шаг ${step.n}` : `Step ${step.n}`}
                </span>
                <span
                  className={`block truncate font-display text-xs font-bold sm:text-sm ${
                    active || done ? "text-white" : "text-[#85878D]"
                  }`}
                >
                  {step.label}
                </span>
              </span>
            </li>
            {i < steps.length - 1 && (
              <span className={`h-px w-3 shrink-0 sm:w-6 ${done ? "bg-emerald-400" : "bg-white/15"}`} />
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
}
