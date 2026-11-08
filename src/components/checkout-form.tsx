"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldAlert,
  ArrowUpRight,
  Send,
  CreditCard,
  Lock,
  Copy,
  Check,
  ShoppingBag,
} from "lucide-react";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { beats } from "@/content/site";
import { formatRub, formatUsd, getCartTotals, getLicenseMeta, telegramLink } from "@/lib/shop";

export function CheckoutForm() {
  const { locale, cart, clearCart } = useFoxphase();
  const isRu = locale === "ru";

  const [state, setState] = useState<
    "idle" | "submitting" | "manual_review" | "redirecting" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    totalRub: number;
    totalUsd: number;
    paymentDetails?: string | null;
    lines: { title: string; license: string; rub: number; usd: number }[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const onlineItems = cart.filter((c) => getLicenseMeta(c.licenseId).online);
  const totals = getCartTotals(onlineItems);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (onlineItems.length === 0) {
      setState("error");
      setErrorMessage(
        isRu
          ? "В корзине нет битов для оформления."
          : "Your cart does not have items ready for checkout."
      );
      return;
    }

    setState("submitting");
    setErrorMessage("");
    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          name: formData.get("name"),
          contact: formData.get("contact"),
          comment: formData.get("comment"),
          locale: isRu ? "ru" : "en",
          items: onlineItems.map((c) => ({
            beatId: c.beatId,
            licenseId: c.licenseId,
          })),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState("error");
        setErrorMessage(data.message || (isRu ? "Ошибка оформления" : "Checkout error"));
        return;
      }

      // If online payment provider redirect is returned
      if (data.mode === "redirect" && data.confirmationUrl) {
        setState("redirecting");
        clearCart();
        window.location.href = data.confirmationUrl;
        return;
      }

      // Manual / Direct studio review confirmation
      setOrderDetails({
        orderId: data.orderId,
        totalRub: data.totalRub,
        totalUsd: data.totalUsd,
        paymentDetails: data.paymentDetails,
        lines: data.lines || [],
      });
      setState("manual_review");
      clearCart();
    } catch {
      setState("error");
      setErrorMessage(
        isRu
          ? "Не удалось отправить заявку. Попробуйте ещё раз или напишите напрямую в Telegram."
          : "Failed to submit request. Please try again or message on Telegram."
      );
    }
  }

  function copyOrderInfo() {
    if (!orderDetails) return;
    const text = `FOXPHASE Заказ #${orderDetails.orderId}\nИтого: ${formatRub(
      orderDetails.totalRub
    )} ($${orderDetails.totalUsd})\n${orderDetails.lines
      .map((l) => `• ${l.title} (${l.license})`)
      .join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  if (state === "redirecting") {
    return (
      <div className="surface-glass rounded-3xl p-8 text-center text-white">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-[#050505] shadow-lg animate-pulse">
          <CreditCard size={28} />
        </div>
        <h3 className="font-display text-2xl font-black uppercase">
          {isRu ? "ПЕРЕНАПРАВЛЕНИЕ НА ОПЛАТУ..." : "REDIRECTING TO PAYMENT..."}
        </h3>
        <p className="mt-2 text-sm text-[#85878D]">
          {isRu
            ? "Открываем платёжный шлюз (ЮKassa / Банковская карта / СБП). Секунду..."
            : "Opening secure checkout gateway. One moment..."}
        </p>
      </div>
    );
  }

  if (state === "manual_review" && orderDetails) {
    const tgMsg = `Привет, FOXPHASE! Оформил заказ #${orderDetails.orderId} на сумму ${orderDetails.totalRub} ₽ на сайте.`;
    return (
      <div className="surface-glass relative overflow-hidden rounded-3xl border border-emerald-400/40 p-6 sm:p-10 text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
            <CheckCircle2 size={26} />
          </span>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-300">
              {isRu ? "ЗАКАЗ ЗАРЕГИСТРИРОВАН" : "ORDER REGISTERED"}
            </span>
            <h3 className="font-display text-2xl font-black uppercase text-white sm:text-3xl">
              #{orderDetails.orderId}
            </h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-[#E8E8E8]">
          {isRu
            ? "Заказ успешно принят и сохранён в системе студии. Оригинальные файлы (WAV/MP3/STEMS) и лицензионный договор передаются покупателю сразу после подтверждения оплаты продюсером."
            : "Order is registered in our studio database. Master files and licensing agreements are unlocked upon verified producer confirmation."}
        </p>

        {/* Order Breakdown Box */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#050505]/85 p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs uppercase tracking-wider text-[#85878D]">
            <span>{isRu ? "СОСТАВ ЗАКАЗА" : "ORDER ITEMS"}</span>
            <span className="font-bold text-white">
              {formatRub(orderDetails.totalRub)} / {formatUsd(orderDetails.totalUsd)}
            </span>
          </div>

          <ul className="mt-3 space-y-2 text-xs">
            {orderDetails.lines.map((l, i) => (
              <li key={i} className="flex justify-between items-center gap-2">
                <span className="font-semibold text-white">
                  {i + 1}. {l.title} · <span className="font-mono text-amber-300">{l.license}</span>
                </span>
                <span className="font-mono text-[#85878D]">
                  {formatRub(l.rub)} / {formatUsd(l.usd)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={telegramLink(tgMsg)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] shadow-lg transition hover:brightness-110"
          >
            <Send size={15} />
            <span>{isRu ? "Написать в Telegram для быстрой выдачи" : "Message on Telegram"}</span>
            <ArrowUpRight size={14} />
          </a>

          <button
            type="button"
            onClick={copyOrderInfo}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3.5 font-mono text-xs uppercase tracking-wider text-white transition hover:border-white"
          >
            {copied ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
            <span>{copied ? (isRu ? "Скопировано!" : "Copied!") : isRu ? "Копировать детали" : "Copy details"}</span>
          </button>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5">
          <Link
            href="/beats"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#85878D] hover:text-white"
          >
            <span>{isRu ? "← Вернуться в каталог битов" : "← Back to Beat Store"}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="surface-card grid gap-5 rounded-3xl p-6 sm:p-8 md:p-9 border border-amber-500/25">
      {/* Cart Snapshot Summary Header */}
      <div className="rounded-2xl border border-white/10 bg-[#050505]/80 p-4">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-[#85878D]">
          <span className="flex items-center gap-2 text-amber-300">
            <ShoppingBag size={14} />
            <span>{isRu ? "К ОПЛАТЕ" : "ORDER ITEMS"}</span>
          </span>
          <span className="font-display text-base font-black text-white sm:text-lg">
            {formatRub(totals.rub)}{" "}
            <span className="font-mono text-xs font-normal text-[#85878D]">
              / {formatUsd(totals.usd)}
            </span>
          </span>
        </div>

        {onlineItems.length > 0 && (
          <ul className="mt-3 space-y-2 border-t border-white/10 pt-3 text-xs">
            {onlineItems.map((item) => {
              const b = beats.find((x) => x.id === item.beatId);
              const meta = getLicenseMeta(item.licenseId);
              return (
                <li key={item.beatId} className="flex justify-between items-center gap-2">
                  <div className="min-w-0">
                    <span className="truncate font-semibold text-white">
                      {b?.title ?? item.beatId}
                    </span>
                    <span className={`ml-2 font-mono text-[11px] ${meta.theme.text}`}>
                      {meta.medal} {meta.name}
                    </span>
                  </div>
                  <span className="font-mono text-white shrink-0">
                    {formatRub(meta.priceRub)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Inputs */}
      <label className="grid gap-2 font-mono text-xs uppercase tracking-wider text-[#85878D]">
        Email *
        <input
          required
          name="email"
          type="email"
          placeholder="artist@domain.com"
          className="rounded-xl border border-white/15 bg-[#050505] p-3.5 font-sans text-sm text-white placeholder:text-[#85878D]/60 focus:border-amber-400/70 focus:outline-none"
        />
        <span className="text-[10px] lowercase text-[#85878D]">
          {isRu ? "На этот email будет выслан чек и ссылка на скачивание архива" : "Delivery and receipt will be sent here"}
        </span>
      </label>

      <label className="grid gap-2 font-mono text-xs uppercase tracking-wider text-[#85878D]">
        {isRu ? "Имя / Псевдоним артиста *" : "Artist alias or name *"}
        <input
          required
          name="name"
          placeholder={isRu ? "Ваш артистический псевдоним" : "Your artist alias"}
          className="rounded-xl border border-white/15 bg-[#050505] p-3.5 font-sans text-sm text-white placeholder:text-[#85878D]/60 focus:border-amber-400/70 focus:outline-none"
        />
      </label>

      <label className="grid gap-2 font-mono text-xs uppercase tracking-wider text-[#85878D]">
        {isRu ? "Контакт для связи (Telegram / Direct) *" : "Best contact (Telegram / Direct) *"}
        <input
          required
          name="contact"
          placeholder="@your_telegram / @instagram"
          className="rounded-xl border border-white/15 bg-[#050505] p-3.5 font-sans text-sm text-white placeholder:text-[#85878D]/60 focus:border-amber-400/70 focus:outline-none"
        />
      </label>

      <label className="grid gap-2 font-mono text-xs uppercase tracking-wider text-[#85878D]">
        {isRu ? "Комментарий к заказу (необязательно)" : "Optional order comment"}
        <textarea
          name="comment"
          rows={2}
          placeholder={
            isRu
              ? "Пожелания по тональности, форматам, дедлайнам..."
              : "Notes on keys, stems, deadlines..."
          }
          className="rounded-xl border border-white/15 bg-[#050505] p-3.5 font-sans text-sm text-white placeholder:text-[#85878D]/60 focus:border-amber-400/70 focus:outline-none resize-none"
        />
      </label>

      {/* Submit Button */}
      <div className="mt-2 space-y-3">
        <button
          type="submit"
          disabled={state === "submitting" || onlineItems.length === 0}
          className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 bg-size-200 px-7 py-4 font-display text-xs font-black uppercase tracking-[0.2em] text-[#050505] shadow-chrome transition hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
        >
          <Lock size={15} />
          <span>
            {state === "submitting"
              ? isRu
                ? "ПРОВЕРКА И ОФОРМЛЕНИЕ..."
                : "VERIFYING & PROCESSING..."
              : isRu
              ? `ОПЛАТИТЬ ЗАКАЗ · ${formatRub(totals.rub)}`
              : `CHECKOUT · ${formatUsd(totals.usd)}`}
          </span>
        </button>

        <p className="flex items-center justify-center gap-2 text-center font-mono text-[10px] uppercase tracking-wider text-[#85878D]">
          <Lock size={12} className="text-emerald-400" />
          <span>{isRu ? "Безопасная оплата · Защищённый протокол SSL" : "Secure checkout · Encrypted SSL"}</span>
        </p>
      </div>

      {state === "error" && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-red-500/40 bg-red-950/30 p-4 text-xs leading-6 text-red-200">
          <ShieldAlert size={16} className="text-red-400 shrink-0 mt-0.5" />
          <p>{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
