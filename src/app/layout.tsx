import type { Metadata, Viewport } from "next";
import { FoxphaseProvider } from "@/components/providers/foxphase-provider";
import { GlobalAudioPlayer } from "@/components/audio-player";
import { MobileDock } from "@/components/shop/mobile-dock";
import { CartToast } from "@/components/shop/cart-toast";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://foxphase.com"
  ),
  title: {
    default: "FOXPHASE — Independent Sound. No Limits.",
    template: "%s — FOXPHASE",
  },
  description:
    "Official digital experience and Beat Store of independent music producer FOXPHASE. Trap, Rage, Ambient, Phonk, House & Experimental sound architecture.",
  keywords: [
    "FOXPHASE",
    "FOXMXNAXM",
    "Music Producer",
    "Beat Store",
    "Trap Beats",
    "Rage Beats",
    "Phonk",
    "Ambient",
    "House",
    "Experimental",
    "Custom Beats",
    "Mixing",
    "Mastering",
  ],
  openGraph: {
    type: "website",
    siteName: "FOXPHASE",
    title: "FOXPHASE — Independent Sound. No Limits.",
    description:
      "Official digital experience, Beat Store, and discography of independent producer FOXPHASE.",
    images: [
      { url: "/brand/foxphase-logo-chrome.jpg", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FOXPHASE — Independent Sound. No Limits.",
    description:
      "Independent music producer & sound architect. Explore beats, licenses, releases, and custom production.",
    images: ["/brand/foxphase-logo-chrome.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <FoxphaseProvider>
          {children}
          <GlobalAudioPlayer />
          <CartToast />
          <MobileDock />
        </FoxphaseProvider>
      </body>
    </html>
  );
}
