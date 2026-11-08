"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ArrowUpRight,
  Send,
  ShoppingBag,
  ShieldCheck,
  FileCheck,
} from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { useFoxphase } from "@/components/providers/foxphase-provider";
import { telegramLink } from "@/lib/shop";

function SuccessContent() {
  const { locale } = useFoxphase();
  const isRu = locale === "ru";
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order") || "FX-PENDING";

  const tgMessage = `Привет, FOXPHASE! Оплата по заказу #${orderId} прошла успешно, жду файлы и лицензию.`;

  return (
    <div className="surface-glass relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-emerald-400/40 p-6 sm:p-12 text-center text-white">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />

      <span className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/20 text-emerald-300 ring-8 ring-emerald-500/10">
        <CheckCircle2 size={40} />
      </span>

      <span className="relative mt-6 inline-block font-mono text-xs uppercase tracking-[0.26em] text-emerald-300">
        {isRu ? "ОПЛАТА УСПЕШНО ЗАВЕРШЕНА" : "PAYMENT COMPLETED SUCCESSFULLY"}
      </span>

      <h1 className="relative mt-2 font-display text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
        {isRu ? "ЗАКАЗ ОПЛАЧЕН" : "ORDER CONFIRMED"}
      </h1>

      <div className="relative mx-auto mt-4 inline-block rounded-full border border-white/20 bg-white/[0.05] px-4 py-1.5 font-mono text-xs text-white">
        ID: <span className="font-bold text-amber-300">#{orderId}</span>
      </div>

      <p className="relative mx-auto mt-6 max-w-xl text-sm leading-7 text-[#E8E8E8]">
        {isRu
          ? "Спасибо за покупку! Сервер подтвердил транзакцию. Оригинальные студийные файлы (WAV, MP3, STEMS) и лицензионный договор формируются для передачи."
          : "Thank you for supporting FOXPHASE! The transaction is server-verified. Your master audio stems and license agreement are being prepared."}
      </p>

      {/* Process instructions */}
      <div className="relative mt-8 grid gap-3 text-left sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-4">
          <div className="flex items-center gap-2.5 font-mono text-xs text-emerald-300">
            <FileCheck size={16} />
            <span className="font-bold uppercase tracking-wider">
              {isRu ? "1. Email отправка" : "1. Email Delivery"}
            </span>
          </div>
          <p className="mt-2 text-xs leading-5 text-[#85878D]">
            {isRu
              ? "Чек и ссылки на облачный архив отправлены на указанный вами адрес."
              : "Receipt and private cloud download links are dispatched to your inbox."}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-4">
          <div className="flex items-center gap-2.5 font-mono text-xs text-cyan-300">
            <Send size={16} />
            <span className="font-bold uppercase tracking-wider">
              {isRu ? "2. Telegram контакт" : "2. Instant Telegram"}
            </span>
          </div>
          <p className="mt-2 text-xs leading-5 text-[#85878D]">
            {isRu
              ? "Для мгновенного получения архива прямо в чат напишите @FOXPHASE."
              : "For immediate delivery directly into chat, connect with @FOXPHASE."}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href={telegramLink(tgMessage)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-7 py-4 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] shadow-lg transition hover:brightness-110"
        >
          <Send size={15} />
          <span>{isRu ? "Написать в Telegram @FOXPHASE" : "Message on Telegram"}</span>
          <ArrowUpRight size={14} />
        </a>

        <Link
          href="/beats"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-4 font-mono text-xs uppercase tracking-wider text-white transition hover:border-white"
        >
          <ShoppingBag size={14} />
          <span>{isRu ? "В каталог битов" : "Browse more beats"}</span>
        </Link>
      </div>

      <div className="relative mt-8 border-t border-white/10 pt-4 font-mono text-[11px] text-[#85878D]">
        <ShieldCheck size={13} className="inline mr-1 text-emerald-400" />
        PRODUCED BY FOXPHASE · SOUND ARCHITECTURE
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <PageFrame
      eyebrow="FOXPHASE // ORDER CONFIRMATION"
      title="СТАТУС ЗАКАЗА."
      subtitle="Подтверждение и получение оригинальных файлов"
    >
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 md:px-10">
        <Suspense fallback={<div className="text-center py-20 text-white font-mono text-xs">Загрузка...</div>}>
          <SuccessContent />
        </Suspense>
      </section>
    </PageFrame>
  );
}
