"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { safeLocale, type Locale } from "@/lib/i18n";
import { addCartItem, changeCartLicense, getCartTotal, type CartItem } from "@/lib/cart";
import { beats } from "@/content/site";
import type { Beat } from "@/types/foxphase";

interface AudioPlayerState {
  currentBeat: Beat | null;
  isPlaying: boolean;
  progress: number; // 0 to 100
  currentTime: number; // seconds
  duration: number; // seconds
  volume: number; // 0 to 1
  isMuted: boolean;
  previewUnavailableNotice: boolean;
}

interface FoxphaseContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  cart: CartItem[];
  addToCart: (beatId: string, licenseId?: string) => void;
  removeFromCart: (beatId: string) => void;
  updateCartLicense: (beatId: string, licenseId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  lastAdded: { beatId: string; licenseId: string; at: number } | null;
  dismissToast: () => void;
  favorites: string[];
  toggleFavorite: (beatId: string) => void;
  isFavorite: (beatId: string) => boolean;
  player: AudioPlayerState;
  playBeat: (beat: Beat) => void;
  togglePlay: () => void;
  seekTo: (percent: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  nextBeat: () => void;
  prevBeat: () => void;
  closePlayer: () => void;
}

const FoxphaseContext = createContext<FoxphaseContextValue | null>(null);

const CART_STORAGE_KEY = "foxphase-cart-v1";
const FAV_STORAGE_KEY = "foxphase-favorites-v1";
const LOCALE_STORAGE_KEY = "foxphase-locale";

export function FoxphaseProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [lastAdded, setLastAdded] = useState<{
    beatId: string;
    licenseId: string;
    at: number;
  } | null>(null);

  const [player, setPlayer] = useState<AudioPlayerState>({
    currentBeat: null,
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
    volume: 0.85,
    isMuted: false,
    previewUnavailableNotice: false,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Hydrate locale, cart, favorites from localStorage
  useEffect(() => {
    try {
      const storedLocale = safeLocale(localStorage.getItem(LOCALE_STORAGE_KEY));
      setLocaleState(storedLocale);
      document.documentElement.lang = storedLocale;

      const rawCart = localStorage.getItem(CART_STORAGE_KEY);
      if (rawCart) {
        const parsed = JSON.parse(rawCart);
        if (Array.isArray(parsed)) setCart(parsed);
      }

      const rawFavs = localStorage.getItem(FAV_STORAGE_KEY);
      if (rawFavs) {
        const parsed = JSON.parse(rawFavs);
        if (Array.isArray(parsed)) setFavorites(parsed);
      }
    } catch {
      // Ignore storage errors in restricted environments
    }

    const handleLocaleSync = (e: Event) => {
      const customEvent = e as CustomEvent<Locale>;
      if (customEvent.detail) {
        setLocaleState(safeLocale(customEvent.detail));
      } else {
        setLocaleState(safeLocale(localStorage.getItem(LOCALE_STORAGE_KEY)));
      }
    };

    window.addEventListener("foxphase-locale-change", handleLocaleSync);
    return () => window.removeEventListener("foxphase-locale-change", handleLocaleSync);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    const valid = safeLocale(next);
    setLocaleState(valid);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, valid);
      document.documentElement.lang = valid;
      window.dispatchEvent(new CustomEvent("foxphase-locale-change", { detail: valid }));
    } catch {
      // ignore
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "ru" : "en");
  }, [locale, setLocale]);

  // Persist cart
  const syncCart = useCallback((updater: (prev: CartItem[]) => CartItem[]) => {
    setCart((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const addToCart = useCallback(
    (beatId: string, licenseId = "basic") => {
      syncCart((items) => {
        try {
          return addCartItem(items, beats, { beatId, licenseId, price: 0 });
        } catch {
          return items;
        }
      });
      setLastAdded({ beatId, licenseId, at: Date.now() });
    },
    [syncCart]
  );

  const dismissToast = useCallback(() => setLastAdded(null), []);

  const removeFromCart = useCallback(
    (beatId: string) => {
      syncCart((items) => items.filter((item) => item.beatId !== beatId));
    },
    [syncCart]
  );

  const updateCartLicense = useCallback(
    (beatId: string, licenseId: string) => {
      syncCart((items) => {
        try {
          return changeCartLicense(items, beats, beatId, licenseId);
        } catch {
          return items;
        }
      });
    },
    [syncCart]
  );

  const clearCart = useCallback(() => {
    syncCart(() => []);
  }, [syncCart]);

  const toggleFavorite = useCallback((beatId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(beatId)
        ? prev.filter((id) => id !== beatId)
        : [...prev, beatId];
      try {
        localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (beatId: string) => favorites.includes(beatId),
    [favorites]
  );

  // Audio player lifecycle (Single active audio stream)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTimeUpdate = () => {
      const dur = audio.duration || 0;
      const cur = audio.currentTime || 0;
      setPlayer((prev) => ({
        ...prev,
        currentTime: cur,
        duration: dur > 0 ? dur : prev.duration,
        progress: dur > 0 ? (cur / dur) * 100 : 0,
      }));
    };

    const onEnded = () => {
      setPlayer((prev) => ({ ...prev, isPlaying: false, progress: 0, currentTime: 0 }));
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const playBeat = useCallback((beat: Beat) => {
    const audio = audioRef.current;

    setPlayer((prev) => {
      const isSameBeat = prev.currentBeat?.id === beat.id;

      // Strictly do not substitute fake/random audio if previewUrl is null
      if (!beat.previewUrl) {
        if (audio) {
          audio.pause();
          audio.removeAttribute("src");
        }
        return {
          ...prev,
          currentBeat: beat,
          isPlaying: false,
          progress: 0,
          currentTime: 0,
          duration: beat.durationSeconds,
          previewUnavailableNotice: true,
        };
      }

      if (audio) {
        if (isSameBeat && prev.isPlaying) {
          audio.pause();
          return { ...prev, isPlaying: false };
        }
        if (!isSameBeat) {
          audio.src = beat.previewUrl;
          audio.currentTime = 0;
        }
        audio.play().catch(() => {
          setPlayer((s) => ({ ...s, isPlaying: false, previewUnavailableNotice: true }));
        });
      }

      return {
        ...prev,
        currentBeat: beat,
        isPlaying: true,
        duration: beat.durationSeconds,
        previewUnavailableNotice: false,
      };
    });
  }, []);

  const togglePlay = useCallback(() => {
    setPlayer((prev) => {
      if (!prev.currentBeat) {
        const first = beats[0];
        if (!first) return prev;
        return {
          ...prev,
          currentBeat: first,
          isPlaying: Boolean(first.previewUrl),
          duration: first.durationSeconds,
          previewUnavailableNotice: !first.previewUrl,
        };
      }

      if (!prev.currentBeat.previewUrl) {
        return { ...prev, isPlaying: false, previewUnavailableNotice: true };
      }

      const audio = audioRef.current;
      if (audio) {
        if (prev.isPlaying) {
          audio.pause();
        } else {
          audio.play().catch(() => {});
        }
      }

      return { ...prev, isPlaying: !prev.isPlaying };
    });
  }, []);

  const seekTo = useCallback((percent: number) => {
    const clamped = Math.max(0, Math.min(100, percent));
    setPlayer((prev) => {
      const targetSeconds = (clamped / 100) * (prev.duration || prev.currentBeat?.durationSeconds || 0);
      if (audioRef.current && prev.currentBeat?.previewUrl && audioRef.current.duration) {
        audioRef.current.currentTime = (clamped / 100) * audioRef.current.duration;
      }
      return {
        ...prev,
        progress: clamped,
        currentTime: targetSeconds,
      };
    });
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      audioRef.current.muted = clamped === 0;
    }
    setPlayer((prev) => ({
      ...prev,
      volume: clamped,
      isMuted: clamped === 0,
    }));
  }, []);

  const toggleMute = useCallback(() => {
    setPlayer((prev) => {
      const nextMuted = !prev.isMuted;
      if (audioRef.current) {
        audioRef.current.muted = nextMuted;
      }
      return { ...prev, isMuted: nextMuted };
    });
  }, []);

  const nextBeat = useCallback(() => {
    setPlayer((prev) => {
      const currentIndex = beats.findIndex((b) => b.id === prev.currentBeat?.id);
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % beats.length : 0;
      const target = beats[nextIndex];
      if (!target) return prev;
      if (audioRef.current) {
        audioRef.current.pause();
        if (target.previewUrl) {
          audioRef.current.src = target.previewUrl;
          audioRef.current.play().catch(() => {});
        }
      }
      return {
        ...prev,
        currentBeat: target,
        isPlaying: Boolean(target.previewUrl),
        progress: 0,
        currentTime: 0,
        duration: target.durationSeconds,
        previewUnavailableNotice: !target.previewUrl,
      };
    });
  }, []);

  const prevBeat = useCallback(() => {
    setPlayer((prev) => {
      const currentIndex = beats.findIndex((b) => b.id === prev.currentBeat?.id);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : beats.length - 1;
      const target = beats[prevIndex];
      if (!target) return prev;
      if (audioRef.current) {
        audioRef.current.pause();
        if (target.previewUrl) {
          audioRef.current.src = target.previewUrl;
          audioRef.current.play().catch(() => {});
        }
      }
      return {
        ...prev,
        currentBeat: target,
        isPlaying: Boolean(target.previewUrl),
        progress: 0,
        currentTime: 0,
        duration: target.durationSeconds,
        previewUnavailableNotice: !target.previewUrl,
      };
    });
  }, []);

  const closePlayer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPlayer((prev) => ({
      ...prev,
      currentBeat: null,
      isPlaying: false,
      progress: 0,
      currentTime: 0,
      previewUnavailableNotice: false,
    }));
  }, []);

  const cartTotal = getCartTotal(cart);

  return (
    <FoxphaseContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        cart,
        addToCart,
        removeFromCart,
        updateCartLicense,
        clearCart,
        cartTotal,
        lastAdded,
        dismissToast,
        favorites,
        toggleFavorite,
        isFavorite,
        player,
        playBeat,
        togglePlay,
        seekTo,
        setVolume,
        toggleMute,
        nextBeat,
        prevBeat,
        closePlayer,
      }}
    >
      {children}
    </FoxphaseContext.Provider>
  );
}

const fallbackContext: FoxphaseContextValue = {
  locale: "en",
  setLocale: () => {},
  toggleLocale: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartLicense: () => {},
  clearCart: () => {},
  cartTotal: 0,
  lastAdded: null,
  dismissToast: () => {},
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  player: {
    currentBeat: null,
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
    volume: 0.85,
    isMuted: false,
    previewUnavailableNotice: false,
  },
  playBeat: () => {},
  togglePlay: () => {},
  seekTo: () => {},
  setVolume: () => {},
  toggleMute: () => {},
  nextBeat: () => {},
  prevBeat: () => {},
  closePlayer: () => {},
};

export function useFoxphase() {
  const ctx = useContext(FoxphaseContext);
  return ctx ?? fallbackContext;
}
