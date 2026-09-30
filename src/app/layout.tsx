import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shrey × Divija — Celestial Duo OS 🪄✨",
  description: "An enchanted, hyper-modern interactive digital universe crafted for Shrey & Divija. Dual-mode tailored questions, soundtrack, AI neural matrix, and sacred lore.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} ${mono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#07050d] text-[#fff5fa] selection:bg-pink-500/30 selection:text-pink-100 font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
