"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useFoxphase } from "@/components/providers/foxphase-provider";

export function ContactForm() {
  const { locale } = useFoxphase();
  const isRu = locale === "ru";
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form)),
    });
    setState(response.ok ? "sent" : "error");
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-white/25 bg-white/[0.06] p-6 text-sm text-white">
        <div className="flex items-center gap-2.5 font-display text-lg font-bold">
          <CheckCircle2 size={20} className="text-white" />
          <span>
            {isRu ? "Заявка принята в обработку" : "Studio Inquiry Received"}
          </span>
        </div>
        <p className="mt-2 text-xs leading-6 text-[#85878D]">
          {isRu
            ? "Ваш запрос сохранён. FOXPHASE свяжется с вами по указанному контакту."
            : "Request received. FOXPHASE will reply through your preferred contact."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <label className="grid gap-2 text-xs font-mono uppercase tracking-wider text-[#85878D]">
        {isRu ? "Имя / Псевдоним артиста" : "Name / artist name"}
        <input
          required
          name="name"
          placeholder={isRu ? "Ваш псевдоним или имя" : "Artist or producer alias"}
          className="rounded-xl border border-white/15 bg-[#050505] p-3.5 font-sans text-sm text-white placeholder:text-[#85878D]/60 focus:border-white/50 focus:outline-none"
        />
      </label>

      <label className="grid gap-2 text-xs font-mono uppercase tracking-wider text-[#85878D]">
        Email
        <input
          required
          type="email"
          name="email"
          placeholder="artist@domain.com"
          className="rounded-xl border border-white/15 bg-[#050505] p-3.5 font-sans text-sm text-white placeholder:text-[#85878D]/60 focus:border-white/50 focus:outline-none"
        />
      </label>

      <label className="grid gap-2 text-xs font-mono uppercase tracking-wider text-[#85878D]">
        {isRu ? "Тип запроса" : "Request"}
        <select
          name="topic"
          className="rounded-xl border border-white/15 bg-[#050505] p-3.5 font-sans text-sm text-white focus:border-white/50 focus:outline-none"
        >
          <option value="Collaboration">
            {isRu ? "Collaboration (Сотрудничество)" : "Collaboration"}
          </option>
          <option value="Custom Beat">
            {isRu ? "Custom Beat (Индивидуальный бит)" : "Custom Beat"}
          </option>
          <option value="Mixing">
            {isRu ? "Mixing (Сведение)" : "Mixing"}
          </option>
          <option value="Mastering">
            {isRu ? "Mastering (Мастеринг)" : "Mastering"}
          </option>
          <option value="Exclusive Rights">
            {isRu ? "Exclusive Rights (Эксклюзивные права)" : "Exclusive Rights"}
          </option>
        </select>
      </label>

      <label className="grid gap-2 text-xs font-mono uppercase tracking-wider text-[#85878D]">
        {isRu ? "Опишите задачу и укажите ваш Telegram" : "Tell us about the project"}
        <textarea
          required
          minLength={10}
          name="message"
          rows={5}
          placeholder={
            isRu
              ? "Укажите ваш Telegram (@username), референсы, сроки или название бита для выкупа прав..."
              : "Share your Telegram handle, sonic references, timeline, or beat title for Exclusive Rights..."
          }
          className="rounded-xl border border-white/15 bg-[#050505] p-3.5 font-sans text-sm text-white placeholder:text-[#85878D]/60 focus:border-white/50 focus:outline-none"
        />
      </label>

      <button
        disabled={state === "sending"}
        className="mt-2 inline-flex w-fit items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#050505] shadow-chrome-sm transition hover:bg-[#E8E8E8] disabled:opacity-50"
      >
        <span>
          {state === "sending"
            ? isRu
              ? "Отправка..."
              : "Sending…"
            : isRu
            ? "Отправить заявку"
            : "Send request"}
        </span>
        <ArrowUpRight size={16} />
      </button>

      {state === "error" && (
        <p className="text-xs text-red-300">
          {isRu
            ? "Проверьте корректность полей (сообщение минимум 10 символов) или напишите напрямую в Telegram."
            : "Something went wrong. Please verify your inputs or contact via Telegram."}
        </p>
      )}
    </form>
  );
}
