"use client";

import React from "react";
import Link from "next/link";
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  ListMusic,
  Crown,
  Info,
  Zap,
  Send,
} from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { beats } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { LicensePicker } from "@/components/shop/license-picker";
import { CheckoutSteps } from "@/components/shop/checkout-steps";
import { formatRub, formatUsd, getCartTotals, getLicenseMeta } from "@/lib/shop";

export default function CartPage() {
  const { locale, cart, removeFromCart, updateCartLicense, clearCart } = useFoxphase();
  const isRu = locale === "ru";

  const onlineItems = cart.filter((i) => getLicenseMeta(i.licenseId).online);
  const hasExclusive = cart.some((i) => !getLicenseMeta(i.licenseId).online);
  const totals = getCartTotals(onlineItems);

  return (
    <PageFrame
      eyebrow={isRu ? "ШАГ 1 ИЗ 3 · КОРЗИНА" : "STEP 1 OF 3 · CART"}
      title={isRu ? "ВАША КОРЗИНА." : "YOUR CART."}
      subtitle={
        isRu
          ? "Проверьте биты и выберите лицензию для каждого — цена пересчитается автоматически."
          : "Review your beats and pick a license for each one — the total updates instantly."
      }
    >
      <section className="mx-auto max-w-7xl px-4 pb-40 sm:px-6 md:px-10 lg:pb-28">
        <CheckoutSteps current={1} isRu={isRu} />

        {cart.length === 0 ? (
          <div className="surface-card relative overflow-hidden rounded-3xl p-8 text-center sm:p-14">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-red-600/20 blur-3xl" />
            <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/25 to-amber-500/20 text-amber-300">
              <ShoppingBag size={28} />
            </span>
            <p className="relative mt-5 font-display text-2xl font-bold text-white">
              {isRu ? "Корзина пока пуста" : "Your cart is empty"}
            </p>
            <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-[#85878D]">
              {isRu
                ? "Откройте каталог, нажмите ▶ чтобы послушать бит, выберите лицензию и нажмите «В корзину»."
                : "Open the catalog, tap ▶ to listen, choose a license and tap “Add to cart”."}
            </p>
            <Link
              href="/beats"
              className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-7 py-4 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[#050505] shadow-chrome-sm transition hover:brightness-110"
            >
              <ListMusic size={16} />
              <span>{isRu ? "Открыть каталог битов" : "Browse beats"}</span>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.45fr_0.55fr] lg:items-start">
            {/* Items */}
            <div className="space-y-4">
              {cart.map((item, idx) => {
                const beat = beats.find((b) => b.id === item.beatId);
                if (!beat) return null;
                const meta = getLicenseMeta(item.licenseId);
                const Icon = meta.icon;

                return (
                  <article
                    key={item.beatId}
                    className={`surface-card relative overflow-hidden rounded-3xl border p-4 sm:p-6 ${meta.theme.cardBorder}`}
                  >
                    <div
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-3xl"
                      style={{ background: beat.coverGradient }}
                    />
                    <div className="relative flex items-start gap-3.5">
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 font-mono text-xs text-white/80 sm:h-16 sm:w-16"
                        style={{ background: beat.coverGradient }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/beats/${beat.slug}`}
                          className="block break-words font-display text-lg font-black uppercase leading-tight text-white hover:text-amber-300 sm:text-xl"
                        >
                          {beat.title}
                        </Link>
                        <p className="mt-1 font-mono text-[11px] text-[#85878D]">
                          {beat.genre} · {beat.bpm} BPM · {beat.key}
                        </p>
                        <span
                          className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase ${meta.theme.softBg} ${meta.theme.text}`}
                        >
                          <Icon size={12} />
                          {meta.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(beat.id)}
                        aria-label={isRu ? `Удалить ${beat.title}` : `Remove ${beat.title}`}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-[#85878D] transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="relative mt-4">
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#85878D]">
                        {isRu ? "Лицензия для этого бита:" : "License for this beat:"}
                      </p>
                      <LicensePicker
                        value={item.licenseId}
                        onChange={(id) => updateCartLicense(beat.id, id)}
                        isRu={isRu}
                        beatTitle={beat.title}
                      />
                    </div>

                    <div className="relative mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="text-xs text-[#85878D]">{meta.formats[isRu ? "ru" : "en"]}</span>
                      <span className="text-right">
                        <span className="block font-display text-xl font-black text-white">
                          {isRu ? formatRub(meta.priceRub) : formatUsd(meta.priceUsd)}
                        </span>
                        <span className="font-mono text-[10px] text-[#85878D]">
                          {isRu ? formatUsd(meta.priceUsd) : formatRub(meta.priceRub)}
                        </span>
                      </span>
                    </div>

                    {!meta.online && (
                      <div className="relative mt-3 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-100">
                        <Crown size={14} className="mt-0.5 shrink-0 text-rose-300" />
                        <span>
                          {isRu
                            ? "Exclusive оформляется лично. Выберите другую лицензию или напишите продюсеру."
                            : "Exclusive is negotiated personally. Pick another license or message the producer."}
                        </span>
                      </div>
                    )}
                  </article>
                );
              })}

              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-[#85878D] transition hover:border-red-400/50 hover:text-red-300"
              >
                <Trash2 size={13} />
                {isRu ? "Очистить корзину" : "Clear cart"}
              </button>
            </div>

            {/* Summary (desktop) */}
            <aside className="surface-glass hidden rounded-3xl border border-amber-500/25 p-6 lg:sticky lg:top-24 lg:block">
              <SummaryContent isRu={isRu} count={onlineItems.length} totals={totals} hasExclusive={hasExclusive} />
            </aside>
          </div>
        )}

        {/* Help strip */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Zap,
              color: "text-amber-300 bg-amber-500/10",
              title: isRu ? "Быстрая выдача" : "Fast delivery",
              text: isRu ? "Файлы и лицензия — сразу после подтверждения оплаты." : "Files + license right after payment is confirmed.",
            },
            {
              icon: ShieldCheck,
              color: "text-emerald-300 bg-emerald-500/10",
              title: isRu ? "Безопасно" : "Secure",
              text: isRu ? "Цена проверяется на сервере, оплата — через защищённую платёжную систему." : "Server-verified prices, secure payment provider.",
            },
            {
              icon: Send,
              color: "text-cyan-300 bg-cyan-500/10",
              title: isRu ? "Есть вопросы?" : "Questions?",
              text: isRu ? "Пишите в Telegram @FOXPHASE — отвечу лично." : "Message @FOXPHASE on Telegram.",
            },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${f.color}`}>
                <f.icon size={18} />
              </span>
              <span>
                <span className="block font-display text-sm font-bold text-white">{f.title}</span>
                <span className="block text-xs leading-5 text-[#85878D]">{f.text}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky mobile checkout bar */}
      {cart.length > 0 && (
        <div className="fixed inset-x-0 bottom-[calc(68px+env(safe-area-inset-bottom))] z-[55] border-t border-amber-500/30 bg-[#0A0808]/95 px-4 py-3 backdrop-blur-2xl lg:hidden">
          <div className="mx-auto flex max-w-md items-center gap-3">
            <div className="min-w-0 flex-1">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                {isRu ? `Итого · ${onlineItems.length} шт.` : `Total · ${onlineItems.length} items`}
              </span>
              <span className="block font-display text-xl font-black text-white">
                {isRu ? formatRub(totals.rub) : formatUsd(totals.usd)}
                <span className="ml-1.5 font-mono text-[11px] font-normal text-[#85878D]">
                  {isRu ? formatUsd(totals.usd) : formatRub(totals.rub)}
                </span>
              </span>
            </div>
            <Link
              href={onlineItems.length > 0 ? "/checkout" : "#"}
              aria-disabled={onlineItems.length === 0}
              className={`inline-flex shrink-0 items-center gap-2 rounded-2xl px-5 py-3.5 font-display text-xs font-extrabold uppercase tracking-wider transition ${
                onlineItems.length > 0
                  ? "bg-gradient-to-r from-amber-300 to-orange-400 text-[#050505] active:scale-95"
                  : "pointer-events-none bg-white/10 text-white/40"
              }`}
            >
              <span>{isRu ? "Оформить" : "Checkout"}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </PageFrame>
  );
}

function SummaryContent({
  isRu,
  count,
  totals,
  hasExclusive,
}: {
  isRu: boolean;
  count: number;
  totals: { rub: number; usd: number };
  hasExclusive: boolean;
}) {
  return (
    <div>
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-amber-300">
        {isRu ? "СВОДКА ЗАКАЗА" : "ORDER SUMMARY"}
      </span>
      <div className="mt-5 space-y-3 border-b border-white/10 pb-5 text-sm">
        <div className="flex justify-between text-[#85878D]">
          <span>{isRu ? "Битов к оплате" : "Beats to pay"}</span>
          <span className="font-mono text-white">{count}</span>
        </div>
        <div className="flex justify-between text-[#85878D]">
          <span>{isRu ? "В долларах" : "In rubles"}</span>
          <span className="font-mono text-white">{isRu ? formatUsd(totals.usd) : formatRub(totals.rub)}</span>
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-[#85878D]">{isRu ? "ИТОГО" : "TOTAL"}</span>
        <span className="font-display text-4xl font-black text-white">
          {isRu ? formatRub(totals.rub) : formatUsd(totals.usd)}
        </span>
      </div>

      {hasExclusive && (
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-100">
          <Info size={14} className="mt-0.5 shrink-0" />
          {isRu ? "Exclusive не входит в онлайн-оплату." : "Exclusive is not included in online payment."}
        </p>
      )}

      <Link
        href={count > 0 ? "/checkout" : "#"}
        aria-disabled={count === 0}
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-display text-xs font-extrabold uppercase tracking-[0.18em] transition ${
          count > 0
            ? "bg-gradient-to-r from-amber-300 to-orange-400 text-[#050505] shadow-chrome hover:brightness-110"
            : "pointer-events-none bg-white/10 text-white/40"
        }`}
      >
        <span>{isRu ? "Перейти к оформлению" : "Proceed to checkout"}</span>
        <ArrowRight size={16} />
      </Link>
      <p className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-[#85878D]">
        <ShieldCheck size={14} className="mt-0.5 shrink-0 text-emerald-300" />
        <span>
          {isRu
            ? "Цены проверяются на сервере. Файлы выдаются только после подтверждения оплаты."
            : "Prices are verified on the server. Files are delivered only after payment is confirmed."}
        </span>
      </p>
    </div>
  );
}
