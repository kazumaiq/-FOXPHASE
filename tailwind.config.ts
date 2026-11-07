import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        graphite: "#101114",
        silver: "#85878D",
        metallic: "#E8E8E8",
        pure: "#FFFFFF",
        ink: "#050505",
        acid: "#E8E8E8",
        muted: "#85878D",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "chrome-text":
          "linear-gradient(180deg, #FFFFFF 0%, #E8E8E8 45%, #85878D 85%, #C4C6CC 100%)",
        "chrome-border":
          "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(133,135,141,0.08) 50%, rgba(232,232,232,0.22) 100%)",
        "surface-glow":
          "radial-gradient(circle at 50% 0%, rgba(232,232,232,0.10) 0%, rgba(16,17,20,0.4) 55%, transparent 100%)",
      },
      boxShadow: {
        chrome: "0 0 40px -10px rgba(232, 232, 232, 0.16), inset 0 1px 0 0 rgba(255, 255, 255, 0.18)",
        "chrome-sm": "0 0 20px -5px rgba(232, 232, 232, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)",
        obsidian: "0 24px 60px rgba(0, 0, 0, 0.85)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0%, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.03)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "pulse-slow": "pulseSlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
