"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { safeLocale, type Locale } from "@/lib/i18n";

export function LanguageToggle() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(safeLocale(localStorage.getItem("foxphase-locale")));
    const handleSync = (e: Event) => {
      const custom = e as CustomEvent<Locale>;
      setLocale(safeLocale(custom.detail ?? localStorage.getItem("foxphase-locale")));
    };
    window.addEventListener("foxphase-locale-change", handleSync);
    return () => window.removeEventListener("foxphase-locale-change", handleSync);
  }, []);

  function switchLocale() {
    const next = locale === "en" ? "ru" : "en";
    localStorage.setItem("foxphase-locale", next);
    document.documentElement.lang = next;
    setLocale(next);
    window.dispatchEvent(new CustomEvent("foxphase-locale-change", { detail: next }));
  }

  return (
    <button
      onClick={switchLocale}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E8E8E8] transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
      aria-label={locale === "en" ? "Русский" : "English"}
    >
      <Languages size={13} className="text-[#85878D]" />
      <span>{locale === "en" ? "EN" : "Русский"}</span>
    </button>
  );
}
