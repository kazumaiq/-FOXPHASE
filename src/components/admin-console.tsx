"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Lock,
  KeyRound,
  LogOut,
  ShoppingBag,
  Inbox,
  Music,
  Sliders,
  LayoutDashboard,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Send,
  Eye,
  RefreshCw,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { beats, releases, officialServices } from "@/content/site";
import { formatRub, formatUsd, telegramLink } from "@/lib/shop";

interface Order {
  id: string;
  orderId: string;
  name: string;
  email: string;
  contact: string;
  comment?: string;
  items: { title: string; license: string; rub: number; usd: number }[];
  totalRub: number;
  totalUsd: number;
  status: "new" | "confirmed" | "completed" | "canceled";
  createdAt: string;
  source: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  status: "new" | "in_progress" | "closed";
  createdAt: string;
}

interface Stats {
  totalOrders: number;
  newOrders: number;
  totalRevenueRub: number;
  totalLeads: number;
  newLeads: number;
}

type TabType = "orders" | "leads" | "beats" | "services" | "instructions";

export function AdminConsole() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<TabType>("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [fetching, setFetching] = useState(false);

  // Check auth by trying to fetch admin data
  const loadAdminData = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/admin/data");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
        setLeads(data.leads || []);
        setStats(data.stats || null);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");

    const trimmedPassword = password.trim();

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: trimmedPassword }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setPassword("");
        loadAdminData();
      } else {
        const err = await res.json().catch(() => ({}));
        setAuthError(err.message || "Неверный пароль администратора. Проверьте правильность ввода.");
      }
    } catch {
      setAuthError("Ошибка сервера при авторизации. Попробуйте обновить страницу.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setOrders([]);
    setLeads([]);
  };

  const updateOrder = async (id: string, status: Order["status"]) => {
    await fetch("/api/admin/data", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "order", id, status }),
    });
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  const deleteOrderItem = async (id: string) => {
    if (!confirm("Удалить этот заказ из списка?")) return;
    await fetch(`/api/admin/data?type=order&id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const updateLead = async (id: string, status: Lead["status"]) => {
    await fetch("/api/admin/data", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "lead", id, status }),
    });
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  const deleteLeadItem = async (id: string) => {
    if (!confirm("Удалить эту заявку?")) return;
    await fetch(`/api/admin/data?type=lead&id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  // ─────────────────────────────────────────────────────────────
  // 1. LOGIN SCREEN (Если не авторизован)
  // ─────────────────────────────────────────────────────────────
  if (isAuthenticated === false) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-white">
        <div className="surface-glass relative overflow-hidden rounded-3xl border border-red-500/30 p-8 shadow-2xl">
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-red-600/20 blur-3xl" />

          <div className="relative text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/20 text-red-400 ring-4 ring-red-500/10">
              <Lock size={28} />
            </span>
            <span className="mt-4 block font-mono text-xs uppercase tracking-[0.24em] text-red-400">
              ПРИВАТНАЯ ЗОНА · FOXPHASE STUDIO
            </span>
            <h1 className="mt-1 font-display text-2xl font-black uppercase text-white">
              Вход в панель управления
            </h1>
            <p className="mt-2 text-xs text-[#85878D]">
              Введите мастер-пароль администратора для просмотра заявок, заказов и управления каталогом.
            </p>
          </div>

          <form onSubmit={handleLogin} className="relative mt-8 space-y-4">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-[#85878D] mb-2">
                Пароль администратора
              </label>
              <div className="relative">
                <KeyRound
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#85878D]"
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-white/15 bg-[#050505] py-3.5 pl-10 pr-4 text-sm text-white focus:border-red-400 focus:outline-none"
                />
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-300">
                <AlertCircle size={15} className="shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
            >
              <Lock size={14} />
              <span>{loading ? "ПРОВЕРКА..." : "ВОЙТИ В ПАНЕЛЬ"}</span>
            </button>
          </form>

          <div className="relative mt-6 rounded-2xl border border-white/10 bg-[#050505]/70 p-4 text-xs text-[#85878D]">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">🔑 Подсказка для доступа:</span>
              <button
                type="button"
                onClick={() => setPassword("foxphase2026")}
                className="font-mono text-[11px] text-amber-300 hover:underline"
              >
                Подставить пароль
              </button>
            </div>
            <p className="mt-2 leading-5">
              Установленный пароль по умолчанию: <code className="text-amber-300 font-mono font-bold select-all">foxphase2026</code>.
              Вводите его маленькими латинскими буквами без пробелов.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="py-24 text-center font-mono text-xs text-[#85878D]">
        Проверка прав доступа к панели управления...
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. MAIN ADMIN CONSOLE (Когда авторизован)
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-10">
      {/* Top Header */}
      <div className="surface-glass mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6 sm:p-8 border border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-amber-500 text-white shadow-lg">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                СИСТЕМА АКТИВНА · АДМИНИСТРАТОР
              </span>
            </div>
            <h1 className="mt-1 font-display text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
              ПАНЕЛЬ УПРАВЛЕНИЯ FOXPHASE
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadAdminData}
            disabled={fetching}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs uppercase text-[#E8E8E8] transition hover:border-white"
          >
            <RefreshCw size={13} className={fetching ? "animate-spin" : ""} />
            <span>Обновить</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-950/30 px-4 py-2 font-mono text-xs uppercase text-red-200 transition hover:bg-red-500 hover:text-white"
          >
            <LogOut size={13} />
            <span>Выйти</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      {stats && (
        <div className="mb-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
          <div className="surface-card rounded-2xl p-5 border border-amber-500/30">
            <div className="flex items-center justify-between text-[#85878D]">
              <span className="font-mono text-[10px] uppercase tracking-wider">Новые заказы</span>
              <ShoppingBag size={16} className="text-amber-400" />
            </div>
            <p className="mt-2 font-display text-3xl font-black text-white">
              {stats.newOrders}
            </p>
            <span className="mt-1 block text-xs text-[#85878D]">
              Всего в базе: {stats.totalOrders}
            </span>
          </div>

          <div className="surface-card rounded-2xl p-5 border border-emerald-500/30">
            <div className="flex items-center justify-between text-[#85878D]">
              <span className="font-mono text-[10px] uppercase tracking-wider">Подтверждено</span>
              <CheckCircle2 size={16} className="text-emerald-400" />
            </div>
            <p className="mt-2 font-display text-3xl font-black text-white">
              {formatRub(stats.totalRevenueRub)}
            </p>
            <span className="mt-1 block text-xs text-[#85878D]">
              Оплаченные сделки
            </span>
          </div>

          <div className="surface-card rounded-2xl p-5 border border-cyan-500/30">
            <div className="flex items-center justify-between text-[#85878D]">
              <span className="font-mono text-[10px] uppercase tracking-wider">Заявки / Лиды</span>
              <Inbox size={16} className="text-cyan-400" />
            </div>
            <p className="mt-2 font-display text-3xl font-black text-white">
              {stats.newLeads}
            </p>
            <span className="mt-1 block text-xs text-[#85878D]">
              Всего обращений: {stats.totalLeads}
            </span>
          </div>

          <div className="surface-card rounded-2xl p-5 border border-violet-500/30">
            <div className="flex items-center justify-between text-[#85878D]">
              <span className="font-mono text-[10px] uppercase tracking-wider">В каталоге</span>
              <Music size={16} className="text-violet-400" />
            </div>
            <p className="mt-2 font-display text-3xl font-black text-white">
              {beats.length} битов
            </p>
            <span className="mt-1 block text-xs text-[#85878D]">
              {releases.length} релиза в дискографии
            </span>
          </div>
        </div>
      )}

      {/* Tabs Menu */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { id: "orders", label: `Заказы битов (${orders.length})`, icon: ShoppingBag, color: "text-amber-400" },
          { id: "leads", label: `Заявки и контакты (${leads.length})`, icon: Inbox, color: "text-cyan-400" },
          { id: "beats", label: `Каталог битов (${beats.length})`, icon: Music, color: "text-white" },
          { id: "services", label: `Прайс и услуги`, icon: Sliders, color: "text-white" },
          { id: "instructions", label: `Инструкция`, icon: HelpCircle, color: "text-emerald-400" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition ${
              activeTab === tab.id
                ? "bg-white text-[#050505] font-bold shadow-chrome-sm"
                : "border border-white/15 bg-white/[0.03] text-[#E8E8E8] hover:border-white/40"
            }`}
          >
            <tab.icon size={14} className={activeTab === tab.id ? "text-[#050505]" : tab.color} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: ORDERS (Заказы битов)
      ───────────────────────────────────────────────────────────── */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="surface-card rounded-3xl p-12 text-center text-[#85878D]">
              <ShoppingBag size={32} className="mx-auto mb-3 opacity-40 text-amber-400" />
              <p className="font-display text-lg text-white font-bold">Заказов пока нет</p>
              <p className="text-xs mt-1">
                Когда покупатель оформит покупку на странице /checkout, заказ моментально появится здесь.
              </p>
            </div>
          ) : (
            orders.map((ord) => {
              const statusColors = {
                new: "border-amber-400/50 bg-amber-500/15 text-amber-300",
                confirmed: "border-cyan-400/50 bg-cyan-500/15 text-cyan-300",
                completed: "border-emerald-400/50 bg-emerald-500/15 text-emerald-300",
                canceled: "border-red-500/40 bg-red-950/40 text-red-300",
              };
              const statusLabels = {
                new: "ОЖИДАЕТ ОПЛАТЫ",
                confirmed: "ОПЛАЧЕН / В РАБОТЕ",
                completed: "ФАЙЛЫ ВЫДАНЫ",
                canceled: "ОТМЕНЁН",
              };

              const directMsg = `Здравствуйте, ${ord.name}! Я FOXPHASE. По вашему заказу #${ord.orderId} на сумму ${ord.totalRub} ₽ — передаю файлы и условия лицензии.`;

              return (
                <div
                  key={ord.id}
                  className="surface-card relative overflow-hidden rounded-3xl border border-white/15 p-5 sm:p-7"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-xl font-black text-white">
                          #{ord.orderId}
                        </span>
                        <span
                          className={`rounded-full border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${
                            statusColors[ord.status]
                          }`}
                        >
                          {statusLabels[ord.status]}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-xs text-[#85878D]">
                        Дата: {new Date(ord.createdAt).toLocaleString("ru-RU")}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="block font-display text-2xl font-black text-white">
                        {formatRub(ord.totalRub)}
                      </span>
                      <span className="font-mono text-xs text-[#85878D]">
                        {formatUsd(ord.totalUsd)}
                      </span>
                    </div>
                  </div>

                  {/* Customer and Beat Details */}
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-4">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                        Клиент:
                      </span>
                      <p className="mt-1 font-bold text-white text-sm">{ord.name}</p>
                      <p className="mt-1 text-xs text-cyan-300 font-mono">
                        📧 {ord.email}
                      </p>
                      <p className="mt-1 text-xs text-amber-300 font-mono">
                        💬 {ord.contact}
                      </p>
                      {ord.comment && (
                        <p className="mt-2 text-xs text-[#85878D] italic border-t border-white/5 pt-2">
                          &ldquo;{ord.comment}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-4">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                        Выбранные биты и лицензии:
                      </span>
                      <ul className="mt-2 space-y-2 text-xs">
                        {ord.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex justify-between items-center border-b border-white/5 pb-1.5 last:border-0"
                          >
                            <span className="font-semibold text-white">
                              {item.title} —{" "}
                              <span className="text-amber-300 font-mono">
                                {item.license}
                              </span>
                            </span>
                            <span className="font-mono text-[#85878D]">
                              {formatRub(item.rub)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-[#85878D]">
                        Сменить статус:
                      </span>
                      {(["new", "confirmed", "completed", "canceled"] as const).map(
                        (st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => updateOrder(ord.id, st)}
                            className={`rounded-lg px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition ${
                              ord.status === st
                                ? "bg-white text-[#050505] font-bold"
                                : "border border-white/10 hover:border-white/40 text-[#85878D]"
                            }`}
                          >
                            {statusLabels[st]}
                          </button>
                        )
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={telegramLink(directMsg)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] transition hover:brightness-110"
                      >
                        <Send size={13} />
                        <span>Написать клиенту</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => deleteOrderItem(ord.id)}
                        className="rounded-full border border-white/15 p-2 text-[#85878D] hover:border-red-400 hover:text-red-400"
                        title="Удалить заказ"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: LEADS (Заявки из формы контактов)
      ───────────────────────────────────────────────────────────── */}
      {activeTab === "leads" && (
        <div className="space-y-4">
          {leads.length === 0 ? (
            <div className="surface-card rounded-3xl p-12 text-center text-[#85878D]">
              <Inbox size={32} className="mx-auto mb-3 opacity-40 text-cyan-400" />
              <p className="font-display text-lg text-white font-bold">Заявок пока нет</p>
              <p className="text-xs mt-1">
                Сообщения со страницы /contact будут мгновенно попадать сюда.
              </p>
            </div>
          ) : (
            leads.map((lead) => {
              const statusLabels = {
                new: "НОВАЯ",
                in_progress: "В ОБРАБОТКЕ",
                closed: "ЗАКРЫТА",
              };
              const statusColors = {
                new: "border-cyan-400/50 bg-cyan-500/15 text-cyan-300",
                in_progress: "border-amber-400/50 bg-amber-500/15 text-amber-300",
                closed: "border-white/20 bg-white/5 text-[#85878D]",
              };

              return (
                <div
                  key={lead.id}
                  className="surface-card rounded-3xl border border-white/15 p-5 sm:p-7"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-lg font-bold text-white">
                          {lead.name}
                        </span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                            statusColors[lead.status]
                          }`}
                        >
                          {statusLabels[lead.status]}
                        </span>
                        <span className="rounded-full border border-violet-400/40 bg-violet-500/15 px-2.5 py-0.5 font-mono text-[10px] text-violet-200">
                          {lead.topic}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-xs text-[#85878D]">
                        Email: <span className="text-white">{lead.email}</span> ·{" "}
                        {new Date(lead.createdAt).toLocaleString("ru-RU")}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteLeadItem(lead.id)}
                      className="rounded-full border border-white/15 p-2 text-[#85878D] hover:border-red-400 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <p className="mt-4 text-xs leading-6 text-[#E8E8E8] rounded-2xl border border-white/10 bg-[#050505]/70 p-4">
                    {lead.message}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#85878D]">Статус:</span>
                      {(["new", "in_progress", "closed"] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => updateLead(lead.id, st)}
                          className={`rounded-lg px-2 py-1 font-mono text-[10px] uppercase transition ${
                            lead.status === st
                              ? "bg-white text-[#050505] font-bold"
                              : "border border-white/10 text-[#85878D] hover:border-white/30"
                          }`}
                        >
                          {statusLabels[st]}
                        </button>
                      ))}
                    </div>

                    <a
                      href={`mailto:${lead.email}?subject=FOXPHASE: Ответ на заявку по теме ${encodeURIComponent(
                        lead.topic
                      )}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1.5 font-mono text-xs uppercase text-cyan-200 hover:bg-cyan-400 hover:text-[#050505]"
                    >
                      <Send size={12} />
                      <span>Ответить по почте</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: BEATS CATALOG
      ───────────────────────────────────────────────────────────── */}
      {activeTab === "beats" && (
        <div className="space-y-4">
          <div className="surface-glass rounded-2xl p-4 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-[#85878D]">
              Всего битов в кодовой базе: {beats.length}
            </span>
            <Link
              href="/beats"
              target="_blank"
              className="inline-flex items-center gap-1 font-mono text-xs text-amber-300 hover:underline"
            >
              <span>Посмотреть на сайте</span>
              <ExternalLink size={13} />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {beats.map((b) => (
              <div
                key={b.id}
                className="surface-card rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-white text-base">
                      {b.title}
                    </span>
                    <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] text-amber-300">
                      {b.bpm} BPM · {b.key}
                    </span>
                  </div>
                  <p className="text-xs text-[#85878D] mt-1 font-mono">
                    {b.genre} · {b.duration} · {b.mood}
                  </p>
                </div>
                <Link
                  href={`/beats/${b.slug}`}
                  target="_blank"
                  className="rounded-full border border-white/20 p-2 text-[#85878D] hover:border-white hover:text-white"
                >
                  <Eye size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: SERVICES & PRICING
      ───────────────────────────────────────────────────────────── */}
      {activeTab === "services" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {officialServices.map((srv) => (
              <div
                key={srv.id}
                className="surface-card rounded-2xl p-5 border border-white/10"
              >
                <span className="font-mono text-[10px] text-amber-400">
                  {`//${srv.index}`}
                </span>
                <h3 className="font-display text-lg font-bold text-white mt-1">
                  {srv.title.ru}
                </h3>
                <span className="mt-2 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-white">
                  {srv.price.ru}
                </span>
                <p className="mt-3 text-xs text-[#85878D] leading-5">
                  {srv.description.ru}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 5: INSTRUCTIONS (Подробная инструкция для продюсера)
      ───────────────────────────────────────────────────────────── */}
      {activeTab === "instructions" && (
        <div className="surface-glass rounded-3xl p-6 sm:p-10 border border-emerald-400/30 text-white space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
              <ShieldCheck size={26} />
            </span>
            <div>
              <h2 className="font-display text-2xl font-black uppercase">
                Инструкция по использованию админ-панели
              </h2>
              <p className="text-xs text-[#85878D]">
                Как управлять заказами, заявками и безопасно настраивать доступ
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-5">
              <h3 className="font-bold text-amber-300 font-mono text-sm uppercase">
                1. Как войти в админку?
              </h3>
              <p className="mt-2 text-xs leading-6 text-[#E8E8E8]">
                Админка находится по адресу <code className="text-white">/admin</code>. При переходе система запросит мастер-пароль. По умолчанию задан: <strong className="text-amber-300">foxphase2026</strong>.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-5">
              <h3 className="font-bold text-cyan-300 font-mono text-sm uppercase">
                2. Как сменить пароль на свой?
              </h3>
              <p className="mt-2 text-xs leading-6 text-[#E8E8E8]">
                В панели управления хостингом Vercel зайдите в <em>Project Settings → Environment Variables</em> и добавьте переменную <strong className="text-white">ADMIN_PASSWORD</strong> со своим секретным паролем.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-5">
              <h3 className="font-bold text-emerald-300 font-mono text-sm uppercase">
                3. Что делать при новом заказе?
              </h3>
              <p className="mt-2 text-xs leading-6 text-[#E8E8E8]">
                В разделе <strong>«Заказы битов»</strong> отображается контакт клиента (Telegram / Email), список треков и сумма. Нажмите кнопку <em>«Написать клиенту»</em>, чтобы сразу открыть диалог в Telegram с готовым сообщением. После отправки файлов измените статус на <em>«Файлы выданы»</em>.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#050505]/70 p-5">
              <h3 className="font-bold text-violet-300 font-mono text-sm uppercase">
                4. Уведомления в Telegram
              </h3>
              <p className="mt-2 text-xs leading-6 text-[#E8E8E8]">
                Если вы укажете переменные <strong className="text-white">TELEGRAM_BOT_TOKEN</strong> и <strong className="text-white">TELEGRAM_CHAT_ID</strong> в Vercel, бот будет автоматически дублировать каждый заказ и заявку в ваш личный Telegram в ту же секунду.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
