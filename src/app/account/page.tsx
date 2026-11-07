"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  FileKey,
  ShieldCheck,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { beats } from "@/content/site";
import { useFoxphase } from "@/components/providers/foxphase-provider";

export default function AccountPage() {
  const { locale, favorites, cart } = useFoxphase();
  const isRu = locale === "ru";

  const favoriteBeats = beats.filter((b) => favorites.includes(b.id));

  return (
    <PageFrame
      eyebrow={isRu ? "ЛИЧНЫЙ КАБИНЕТ ПОКУПАТЕЛЯ" : "CUSTOMER ACCOUNT & VAULT"}
      title={isRu ? "YOUR LIBRARY, SECURELY." : "YOUR LIBRARY, SECURELY."}
      subtitle={
        isRu
          ? "Управление профилем, избранными битами, историей заказов, лицензиями и защищёнными ссылками на скачивание."
          : "Access your profile, saved favorites, order history, active licenses, and time-limited digital download entitlements."
      }
    >
      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-10 space-y-10">
        {/* Supabase Auth Architecture Notice (Preserves strict security) */}
        <div className="surface-glass rounded-3xl p-8 md:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-white">
                <Lock size={15} />
                <span>SUPABASE AUTH + RLS VAULT</span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                {isRu
                  ? "Authentication requires Supabase configuration."
                  : "Authentication requires Supabase configuration."}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#85878D]">
                {isRu
                  ? "После подключения ключей Supabase в .env.local здесь активируются вход, регистрация, восстановление пароля, история оплаченных заказов и защищённые ссылки на скачивание WAV/MP3. Система не использует небезопасную локальную имитацию входа."
                  : "Once connected, this area provides sign-in, password recovery, purchase history, licenses, favorites and authenticated download entitlements. It does not fall back to an insecure local account."}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#050505] p-6 space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-[#85878D]">
                {isRu ? "СТАТУС СЕССИИ" : "SESSION STATUS"}
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-white/10 p-3.5">
                  <span className="text-[#85878D] block">
                    {isRu ? "Избранное" : "Saved Beats"}
                  </span>
                  <b className="mt-1 block font-display text-xl text-white">
                    {favorites.length}
                  </b>
                </div>
                <div className="rounded-xl border border-white/10 p-3.5">
                  <span className="text-[#85878D] block">
                    {isRu ? "В корзине" : "In Cart"}
                  </span>
                  <b className="mt-1 block font-display text-xl text-white">
                    {cart.length}
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Modules Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="surface-card rounded-3xl p-7">
            <ShoppingBag size={20} className="text-white mb-4" />
            <h3 className="font-display text-xl font-bold text-white">
              {isRu ? "История заказов и покупок" : "Orders & Purchase History"}
            </h3>
            <p className="mt-2 text-xs leading-6 text-[#85878D]">
              {isRu
                ? "Все заказы привязываются к вашему профилю Supabase (`public.orders`) с защитой через политики RLS."
                : "Orders are bound to your authenticated `public.orders` record and protected by Row-Level Security."}
            </p>
          </div>

          <div className="surface-card rounded-3xl p-7">
            <FileKey size={20} className="text-white mb-4" />
            <h3 className="font-display text-xl font-bold text-white">
              {isRu ? "Лицензии и выдача файлов" : "Licenses & File Entitlements"}
            </h3>
            <p className="mt-2 text-xs leading-6 text-[#85878D]">
              {isRu
                ? "Оригинальные WAV и стемы хранятся в закрытом бакете `originals` и выдаются по временным ссылкам после оплаты."
                : "Master WAV files reside in the private `originals` bucket and unlock via signed time-limited URLs after payment confirmation."}
            </p>
          </div>

          <div className="surface-card rounded-3xl p-7">
            <ShieldCheck size={20} className="text-white mb-4" />
            <h3 className="font-display text-xl font-bold text-white">
              {isRu ? "Защита данных" : "Row-Level Security"}
            </h3>
            <p className="mt-2 text-xs leading-6 text-[#85878D]">
              {isRu
                ? "Разграничение прав покупателя и администратора на уровне базы данных PostgreSQL."
                : "Strict separation between customer profiles and server-validated administrator roles."}
            </p>
          </div>
        </div>

        {/* Saved Favorites Section */}
        <div className="surface-card rounded-3xl p-8">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-2.5">
              <Heart size={18} className="text-white" />
              <h3 className="font-display text-xl font-bold text-white">
                {isRu ? "Избранные биты" : "Saved Favorites"} ({favoriteBeats.length})
              </h3>
            </div>
            <Link
              href="/beats"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#E8E8E8] hover:text-white"
            >
              <span>{isRu ? "В каталог" : "Browse Store"}</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {favoriteBeats.length === 0 ? (
            <p className="mt-6 text-sm text-[#85878D]">
              {isRu
                ? "Вы ещё не добавили биты в избранное. Отмечайте понравившиеся инструменталы иконкой сердца в каталоге."
                : "No beats saved yet. Mark instrumentals with the heart icon in the Beat Store to keep them here."}
            </p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteBeats.map((b) => (
                <Link
                  key={b.id}
                  href={`/beats/${b.slug}`}
                  className="rounded-2xl border border-white/10 bg-[#050505] p-5 transition hover:border-white/40"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                    {b.genre} · {b.bpm} BPM
                  </span>
                  <p className="mt-1 font-display text-lg font-bold text-white">
                    {b.title}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageFrame>
  );
}
