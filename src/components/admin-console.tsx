"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Music,
  Disc3,
  ShoppingBag,
  Sliders,
  FileText,
  Inbox,
  ShieldCheck,
  Plus,
  CheckCircle2,
  Upload,
} from "lucide-react";
import {
  beats,
  releases,
  officialServices,
  collaborationArtists,
} from "@/content/site";

type AdminTab =
  | "dashboard"
  | "beats"
  | "releases"
  | "orders"
  | "services"
  | "content"
  | "leads";

export function AdminConsole({
  supabaseConfigured,
}: {
  supabaseConfigured: boolean;
}) {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={15} /> },
    { id: "beats", label: "Beat Management", icon: <Music size={15} /> },
    { id: "releases", label: "Releases", icon: <Disc3 size={15} /> },
    { id: "orders", label: "Orders & Delivery", icon: <ShoppingBag size={15} /> },
    { id: "services", label: "Services & Pricing", icon: <Sliders size={15} /> },
    { id: "content", label: "Content & SEO", icon: <FileText size={15} /> },
    { id: "leads", label: "Studio Leads", icon: <Inbox size={15} /> },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-10">
      {/* Security & Role Banner */}
      <div className="surface-glass mb-8 rounded-3xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <ShieldCheck size={24} className="text-white shrink-0 mt-1" />
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-white">
              PROTECTED AREA · ADMIN SIGN-IN REQUIRED
            </p>
            <h1 className="mt-1 font-display text-2xl font-black uppercase text-chrome md:text-3xl">
              FOXPHASE STUDIO CONTROL CENTER
            </h1>
            <p className="mt-2 max-w-2xl text-xs leading-6 text-[#85878D]">
              Server role validation (`public.is_admin()`) is required before
              write operations execute. Connect Supabase Auth and assign the
              private `admin` role in `public.profiles` to enable live database
              mutations.
            </p>
          </div>
        </div>

        <span
          className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest ${
            supabaseConfigured
              ? "border-white/30 bg-white/10 text-white"
              : "border-white/15 bg-[#050505] text-[#85878D]"
          }`}
        >
          {supabaseConfigured ? "SUPABASE CONNECTED" : "AWAITING SUPABASE ENV"}
        </span>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition ${
              activeTab === tab.id
                ? "bg-white text-[#050505] font-bold shadow-chrome-sm"
                : "border border-white/15 bg-white/[0.02] text-[#E8E8E8] hover:border-white/40"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. DASHBOARD */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="surface-card rounded-2xl p-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                CATALOG BEATS
              </span>
              <p className="mt-2 font-display text-3xl font-black text-white">
                {beats.length}
              </p>
              <span className="mt-1 block text-xs text-[#85878D]">
                Target cadence: 3–5 beats / week
              </span>
            </div>

            <div className="surface-card rounded-2xl p-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                OFFICIAL RELEASES
              </span>
              <p className="mt-2 font-display text-3xl font-black text-white">
                {releases.length}
              </p>
              <span className="mt-1 block text-xs text-[#85878D]">
                BLADE, DREAMS, Last Breath, Forgotten Memories
              </span>
            </div>

            <div className="surface-card rounded-2xl p-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                VERIFIED COLLABORATIONS
              </span>
              <p className="mt-2 font-display text-3xl font-black text-white">
                {collaborationArtists.length}
              </p>
              <span className="mt-1 block text-xs text-[#85878D]">
                Official artist roster
              </span>
            </div>

            <div className="surface-card rounded-2xl p-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#85878D]">
                PAYMENT ENGINE
              </span>
              <p className="mt-2 font-display text-xl font-black text-white">
                MANUAL REVIEW
              </p>
              <span className="mt-1 block text-xs text-[#85878D]">
                No fake client-side payment success
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. BEAT MANAGEMENT */}
      {activeTab === "beats" && (
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-card rounded-3xl p-7">
            <h2 className="font-display text-xl font-bold text-white">
              Catalog Beats ({beats.length})
            </h2>
            <div className="mt-5 divide-y divide-white/10">
              {beats.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-wrap items-center justify-between gap-4 py-4"
                >
                  <div>
                    <p className="font-display text-base font-bold text-white">
                      {b.title}
                    </p>
                    <p className="font-mono text-xs text-[#85878D]">
                      {b.genre} · {b.bpm} BPM · {b.key} · {b.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="rounded-full border border-white/15 px-3 py-1 text-white">
                      MP3 $15 / WAV $20
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card rounded-3xl p-7">
            <div className="flex items-center gap-2">
              <Plus size={16} className="text-white" />
              <h3 className="font-display text-xl font-bold text-white">
                Upload New Beat & Stems
              </h3>
            </div>
            <p className="mt-2 text-xs text-[#85878D]">
              Requires authenticated `admin` role in Supabase. Original WAVs are
              stored in the private `originals` bucket.
            </p>
            <div className="mt-5 grid gap-3 text-xs">
              <input
                disabled={!supabaseConfigured}
                placeholder="Beat Title (e.g. CHROME HORIZON)"
                className="rounded-xl border border-white/15 bg-[#050505] p-3 text-white disabled:opacity-50"
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  disabled={!supabaseConfigured}
                  placeholder="Genre (Rage/Trap)"
                  className="rounded-xl border border-white/15 bg-[#050505] p-3 text-white disabled:opacity-50"
                />
                <input
                  disabled={!supabaseConfigured}
                  placeholder="BPM (150)"
                  className="rounded-xl border border-white/15 bg-[#050505] p-3 text-white disabled:opacity-50"
                />
                <input
                  disabled={!supabaseConfigured}
                  placeholder="Key (F# min)"
                  className="rounded-xl border border-white/15 bg-[#050505] p-3 text-white disabled:opacity-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-dashed border-white/20 p-4 text-center text-[#85878D]">
                  <Upload size={15} className="mx-auto mb-1 text-white" />
                  <span>Preview MP3 (Public)</span>
                </div>
                <div className="rounded-xl border border-dashed border-white/20 p-4 text-center text-[#85878D]">
                  <Upload size={15} className="mx-auto mb-1 text-white" />
                  <span>Master WAV (`originals` bucket)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. RELEASES */}
      {activeTab === "releases" && (
        <div className="surface-card rounded-3xl p-7">
          <h2 className="font-display text-xl font-bold text-white">
            Discography Management
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {releases.map((rel) => (
              <div
                key={rel.id}
                className="rounded-2xl border border-white/10 bg-[#050505] p-5"
              >
                <span className="font-mono text-[10px] text-[#85878D]">
                  {rel.code}
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-white">
                  {rel.title}
                </h3>
                <p className="mt-1 text-xs text-[#85878D]">
                  {rel.yandexMusicUrl}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ORDERS */}
      {activeTab === "orders" && (
        <div className="surface-card rounded-3xl p-7">
          <h2 className="font-display text-xl font-bold text-white">
            Order Verification & Digital Entitlements
          </h2>
          <p className="mt-2 max-w-2xl text-xs leading-6 text-[#85878D]">
            Orders remain in `awaiting_payment` / `manual_review` until verified
            by signed payment webhook (`/api/webhooks/payment`) or manual admin
            confirmation. Once confirmed, `public.download_entitlements` issues
            a time-limited signed URL from the private `originals` bucket.
          </p>
        </div>
      )}

      {/* 5. SERVICES */}
      {activeTab === "services" && (
        <div className="surface-card rounded-3xl p-7">
          <h2 className="font-display text-xl font-bold text-white">
            Services & Official Pricing
          </h2>
          <div className="mt-5 divide-y divide-white/10">
            {officialServices.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between py-3.5 text-sm"
              >
                <span className="font-bold text-white">{s.title.en}</span>
                <span className="font-mono text-[#E8E8E8]">{s.price.en}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. CONTENT & SEO */}
      {activeTab === "content" && (
        <div className="surface-card rounded-3xl p-7">
          <h2 className="font-display text-xl font-bold text-white">
            Site Settings, Achievements & SEO (`public.site_settings`)
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 text-xs">
            <div className="rounded-2xl border border-white/10 bg-[#050505] p-5">
              <span className="font-mono uppercase text-[#85878D]">
                APPROXIMATE CAREER STREAMS
              </span>
              <p className="mt-1 font-display text-2xl font-bold text-white">
                ~1–2M
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#050505] p-5">
              <span className="font-mono uppercase text-[#85878D]">
                LISTENING AWARD / PLAQUE
              </span>
              <p className="mt-1 font-display text-2xl font-bold text-white">
                100,000+ Streams
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 7. LEADS */}
      {activeTab === "leads" && (
        <div className="surface-card rounded-3xl p-7">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-white" />
            <h2 className="font-display text-xl font-bold text-white">
              Incoming Leads (`public.leads`)
            </h2>
          </div>
          <p className="mt-2 text-xs leading-6 text-[#85878D]">
            Captures Collaboration, Custom Beat, Mixing, Mastering, and
            Exclusive Rights inquiries submitted via `/contact` and `/api/leads`.
          </p>
        </div>
      )}
    </div>
  );
}
