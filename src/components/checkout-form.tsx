"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldAlert, ArrowUpRight } from "lucide-react";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { beats } from "@/content/site";

export function CheckoutForm() {
  const { locale, cart, cartTotal, clearCart } = useFoxphase();
  const isRu = locale === "ru";

  const [state, setState] = useState<
    "idle" | "submitting" | "manual_review" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (cart.length === 0) {
      setState("error");
      return;
    }

    setState("submitting");
    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          name: formData.get("name"),
          contact: formData.get("contact"),
          items: cart.map((c) => ({
            beatId: c.beatId,
            licenseId: c.licenseId,
          })),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState("error");
        return;
      }

      setServerMessage(data.message || "");
      setState("manual_review");
      clearCart();
    } catch {
      setState("error");
    }
  }

  if (state === "manual_review") {
    return (
      <div className="surface-glass rounded-3xl p-8 text-white">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={24} className="text-white" />
          <h3 className="font-display text-2xl font-bold">
            {isRu
              ? "ЗАЯВКА НА ПОКУПКУ ЗАРЕГИСТРИРОВАНА"
              : "PURCHASE REQUEST REGISTERED (MANUAL REVIEW)"}
          </h3>
        </div>
        <p className="mt-4 text-sm leading-6 text-[#85878D]">
          {serverMessage ||
            (isRu
              ? "Заявка принята. Оплата НЕ считается подтверждённой до проверки сервером или администратором."
              : "Request received; no payment has been confirmed.")}
        </p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#050505] p-4 font-mono text-xs text-[#E8E8E8]">
          {isRu
            ? "Статус заказа: ОЖИДАЕТ ПОДТВЕРЖДЕНИЯ ОПЛАТЫ (AWAITING VERIFICATION). Файлы лицензии выдаются только после подтверждения."
            : "Order Status: AWAITING PAYMENT VERIFICATION. Original WAV/MP3 files are unlocked strictly after payment confirmation."}
        </div>
        <Link
          href="/beats"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#050505]"
        >
          <span>{isRu ? "Вернуться в каталог" : "Return to Beat Store"}</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="surface-card grid gap-5 rounded-3xl p-7 md:p-9">
      {/* Cart Snapshot */}
      <div className="rounded-2xl border border-white/10 bg-[#050505] p-4">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-[#85878D]">
          <span>{isRu ? "СОСТАВ ЗАКАЗА" : "ORDER ITEMS"}</span>
          <span className="text-white">
            {cart.length} {isRu ? "шт." : "items"} · ${cartTotal}
          </span>
        </div>
        {cart.length > 0 && (
          <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-3 text-xs text-[#E8E8E8]">
            {cart.map((item) => {
              const b = beats.find((x) => x.id === item.beatId);
              return (
                <li key={item.beatId} className="flex justify-between">
                  <span>
                    {b?.title ?? item.beatId} ({item.licenseId.toUpperCase()})
                  </span>
                  <span className="font-mono">${item.price}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <label className="grid gap-2 font-mono text-xs uppercase tracking-wider text-[#85878D]">
        Email
        <input
          required
          name="email"
          type="email"
          placeholder="artist@domain.com"
          className="rounded-xl border border-white/15 bg-[#050505] p-3.5 font-sans text-sm text-white focus:border-white/50 focus:outline-none"
        />
      </label>

      <label className="grid gap-2 font-mono text-xs uppercase tracking-wider text-[#85878D]">
        {isRu ? "Имя или псевдоним покупателя" : "Name or artist name"}
        <input
          required
          name="name"
          placeholder={isRu ? "Ваш артистический псевдоним" : "Your artist alias"}
          className="rounded-xl border border-white/15 bg-[#050505] p-3.5 font-sans text-sm text-white focus:border-white/50 focus:outline-none"
        />
      </label>

      <label className="grid gap-2 font-mono text-xs uppercase tracking-wider text-[#85878D]">
        {isRu ? "Контакт для связи" : "Best contact"}
        <input
          required
          name="contact"
          placeholder="Telegram @username / Instagram"
          className="rounded-xl border border-white/15 bg-[#050505] p-3.5 font-sans text-sm text-white focus:border-white/50 focus:outline-none"
        />
      </label>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-fit rounded-full bg-white px-7 py-4 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#050505] shadow-chrome transition hover:bg-[#E8E8E8] disabled:opacity-50"
      >
        {state === "submitting"
          ? isRu
            ? "Проверка..."
            : "Verifying..."
          : isRu
          ? "Оформить защищённую заявку"
          : "Request secure checkout"}
      </button>

      {state === "error" && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-white/15 bg-white/[0.03] p-4 text-xs leading-6 text-[#E8E8E8]">
          <ShieldAlert size={16} className="text-white shrink-0 mt-0.5" />
          <p>
            {isRu
              ? "Сначала добавьте лицензии битов из Beat Store. Оплата никогда не подтверждается фиктивно на этом экране."
              : "Add verified beat licenses from the Beat Store first. Payment is never confirmed on this screen."}
          </p>
        </div>
      )}
    </form>
  );
}
