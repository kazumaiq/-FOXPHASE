"use client";

import React from "react";
import Link from "next/link";
import { Trash2, ArrowUpRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { beats } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";

export default function CartPage() {
  const {
    locale,
    cart,
    removeFromCart,
    updateCartLicense,
    clearCart,
    cartTotal,
  } = useFoxphase();

  const isRu = locale === "ru";

  return (
    <PageFrame
      eyebrow={isRu ? "КОРЗИНА ЛИЦЕНЗИЙ" : "CART & LICENSE SELECTION"}
      title={isRu ? "ВАШ ВЫБОР." : "YOUR SELECTION."}
      subtitle={
        isRu
          ? "Проверьте выбранные инструменталы и типы лицензий перед переходом к защищённому оформлению заказа."
          : "Review your selected instrumentals and license tiers before proceeding to server-verified checkout."
      }
    >
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 md:px-10">
        {cart.length === 0 ? (
          <div className="surface-card rounded-3xl p-8 sm:p-14">
            <ShoppingBag size={32} className="mb-5 text-red-400" />
            <p className="font-display text-2xl font-bold text-white">
              {isRu
                ? "Ваша корзина пока пуста."
                : "Cart items are kept in your browser during this session."}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#85878D]">
              {isRu
                ? "Выберите биты и подходящие лицензии в Beat Store, затем вернитесь сюда для оформления заявки на покупку."
                : "Choose licenses in the Beat Store, then return here to begin an order request. Prices and availability are verified on the server before any order is created."}
            </p>
            <Link
              href="/beats"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#050505] shadow-chrome-sm transition hover:bg-red-500 hover:text-white"
            >
              <span>{isRu ? "Перейти в Beat Store" : "Go to Beat Store"}</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            {/* Items List */}
            <div className="space-y-4">
              {cart.map((item) => {
                const beat = beats.find((b) => b.id === item.beatId);
                if (!beat) return null;

                return (
                  <div
                    key={item.beatId}
                    className="surface-card flex flex-col justify-between gap-4 rounded-3xl p-5 sm:flex-row sm:items-center sm:p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="h-14 w-14 shrink-0 rounded-2xl border border-white/15 sm:h-16 sm:w-16"
                        style={{ background: beat.coverGradient }}
                      />
                      <div>
                        <Link
                          href={`/beats/${beat.slug}`}
                          className="font-display text-xl font-bold text-white hover:text-red-400"
                        >
                          {beat.title}
                        </Link>
                        <p className="font-mono text-xs text-[#85878D]">
                          {beat.genre} · {beat.bpm} BPM · {beat.key}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">
                      <select
                        aria-label={`Select license for ${beat.title}`}
                        value={item.licenseId}
                        onChange={(e) =>
                          updateCartLicense(beat.id, e.target.value)
                        }
                        className="rounded-xl border border-white/15 bg-[#050505] px-3.5 py-2 font-mono text-xs uppercase text-white focus:border-red-500 focus:outline-none"
                      >
                        <option value="basic">MP3 Lease — $15 (1500 ₽)</option>
                        <option value="premium">WAV Lease — $20 (2000 ₽)</option>
                        <option value="unlimited">
                          Unlimited Stems — $50 (5000 ₽)
                        </option>
                      </select>

                      <span className="font-display text-xl font-bold text-white">
                        ${item.price}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeFromCart(beat.id)}
                        aria-label={`Remove ${beat.title}`}
                        className="rounded-full border border-white/10 p-2 text-[#85878D] transition hover:border-red-400 hover:text-red-300"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={clearCart}
                className="font-mono text-xs uppercase tracking-widest text-[#85878D] hover:text-red-400"
              >
                {isRu ? "Очистить корзину" : "Clear Cart"}
              </button>
            </div>

            {/* Order Summary */}
            <div className="surface-glass flex flex-col justify-between rounded-3xl p-6 sm:p-7">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-red-400">
                  {isRu ? "СВОДКА ЗАКАЗА" : "ORDER SUMMARY"}
                </span>
                <div className="mt-6 space-y-3 border-b border-white/10 pb-6 text-sm">
                  <div className="flex justify-between text-[#85878D]">
                    <span>{isRu ? "Позиций в заказе" : "Selected Items"}</span>
                    <span className="font-mono text-white">{cart.length}</span>
                  </div>
                  <div className="flex justify-between text-[#85878D]">
                    <span>{isRu ? "Режим доставки" : "Delivery Mode"}</span>
                    <span className="font-mono text-white">
                      {isRu ? "Защищённые ссылки" : "Signed Entitlement"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#85878D]">
                    {isRu ? "ИТОГО" : "TOTAL"}
                  </span>
                  <span className="font-display text-4xl font-black text-white">
                    ${cartTotal}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Link
                  href="/checkout"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#050505] shadow-chrome transition hover:bg-red-500 hover:text-white"
                >
                  <span>
                    {isRu ? "ПЕРЕЙТИ К ОФОРМЛЕНИЮ" : "PROCEED TO CHECKOUT"}
                  </span>
                  <ArrowUpRight size={16} />
                </Link>
                <p className="flex items-start gap-2 text-[11px] leading-5 text-[#85878D]">
                  <ShieldCheck
                    size={14}
                    className="mt-0.5 shrink-0 text-red-400"
                  />
                  <span>
                    {isRu
                      ? "Оплата проверяется строго на сервере. До подключения провайдера создаётся защищённая заявка на покупку."
                      : "Server-verified pricing. Orders enter manual confirmation until a signed payment webhook is active."}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </PageFrame>
  );
}
