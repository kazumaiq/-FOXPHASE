"use client";

import React from "react";
import { CheckoutForm } from "@/components/checkout-form";
import { CheckoutSteps } from "@/components/shop/checkout-steps";
import { PageFrame } from "@/components/page-frame";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import {
  Send,
  Lock,
} from "lucide-react";

export default function CheckoutPage() {
  const { locale } = useFoxphase();
  const isRu = locale === "ru";

  return (
    <PageFrame
      eyebrow={isRu ? "ШАГ 2 ИЗ 3 · ОФОРМЛЕНИЕ ЗАКАЗА" : "STEP 2 OF 3 · SECURE CHECKOUT"}
      title={
        isRu
          ? "ОФОРМЛЕНИЕ И ОПЛАТА."
          : "SECURE CHECKOUT & DELIVERY."
      }
      subtitle={
        isRu
          ? "Заполните данные для отправки чека и файлов лицензии. Все цены и наличие проверяются строго на сервере."
          : "Enter your contact details for license agreement and master audio delivery. Prices are strictly verified on the server."
      }
    >
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 md:px-10">
        <CheckoutSteps current={2} isRu={isRu} />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          {/* Left Column: Security Guarantees & Payment Methods */}
          <div className="space-y-5">
            <div className="surface-card rounded-3xl p-6 sm:p-8 border border-white/10">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-amber-300 flex items-center gap-2">
                <Lock size={14} />
                <span>{isRu ? "ПРОЦЕСС ВЫДАЧИ ФАЙЛОВ" : "DIGITAL DELIVERY PROCESS"}</span>
              </span>

              <h2 className="mt-4 font-display text-2xl font-black uppercase text-white sm:text-3xl">
                {isRu
                  ? "КАК ВЫ ПОЛУЧИТЕ МУЗЫКУ И ПРАВА?"
                  : "HOW DOES DELIVERY WORK?"}
              </h2>

              <ul className="mt-5 space-y-4 text-xs sm:text-sm text-[#E8E8E8]">
                <li className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 font-mono font-bold text-xs">
                    01
                  </span>
                  <span>
                    <strong className="text-white block font-sans">
                      {isRu ? "Серверная регистрация заказа" : "Server-verified registration"}
                    </strong>
                    <span className="text-[#85878D] text-xs">
                      {isRu
                        ? "После отправки формы создаётся защищённый ордер в базе данных FOXPHASE."
                        : "Your items and license tiers are locked in our secure database."}
                    </span>
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs">
                    02
                  </span>
                  <span>
                    <strong className="text-white block font-sans">
                      {isRu ? "Безопасная оплата" : "Verified payment"}
                    </strong>
                    <span className="text-[#85878D] text-xs">
                      {isRu
                        ? "Поддерживается онлайн-оплата картами, СБП через платёжный шлюз либо прямой перевод с моментальным чеком."
                        : "Bank cards, SBP or direct studio transfer with signed confirmation."}
                    </span>
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs">
                    03
                  </span>
                  <span>
                    <strong className="text-white block font-sans">
                      {isRu ? "Выдача мастер-файлов и договора" : "Master audio & license receipt"}
                    </strong>
                    <span className="text-[#85878D] text-xs">
                      {isRu
                        ? "Оригинальные дорожки без тегов (WAV 24-bit / MP3 320 kbps / STEMS) и лицензионный PDF отправляются на email и в Telegram."
                        : "Untagged WAV 24-bit, MP3 320 kbps or STEMS plus PDF license are transmitted instantly."}
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Direct Studio Contact Box */}
            <div className="surface-glass rounded-3xl p-6 border border-cyan-400/30">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300">
                  <Send size={18} />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    {isRu ? "ПРЯМАЯ СВЯЗЬ В TELEGRAM" : "DIRECT TELEGRAM SUPPORT"}
                  </h3>
                  <p className="text-xs text-[#85878D]">
                    {isRu ? "Продюсер лично на связи по любым вопросам" : "Direct line to the producer"}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-[#E8E8E8]/90">
                {isRu
                  ? "Если вам удобнее оплатить через СБП, Тинькофф, Сбер или криптовалюту USDT — напишите в Telegram @FOXPHASE."
                  : "For custom invoices, SBP, crypto USDT or bank transfers, message @FOXPHASE on Telegram."}
              </p>
              <a
                href="https://t.me/FOXPHASE"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 font-mono text-xs uppercase tracking-wider text-cyan-200 transition hover:bg-cyan-500/25"
              >
                <span>@FOXPHASE</span>
                <span className="text-cyan-400">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Checkout Form */}
          <div>
            <CheckoutForm />
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
