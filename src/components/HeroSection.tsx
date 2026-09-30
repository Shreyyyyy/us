"use client";

import React from "react";
import { UserRole } from "@/types";
import HarryPotterStage from "@/components/HarryPotterStage";
import { Sparkles, Heart, Zap, ArrowDown } from "lucide-react";
import { sound } from "@/lib/sound";

interface HeroSectionProps {
  role: UserRole;
  onCastSpell: (msg: string) => void;
  onReminder: () => void;
}

export default function HeroSection({ role, onCastSpell, onReminder }: HeroSectionProps) {
  const heroContent = {
    gf: {
      terminal: "INITIALIZING GIRLFRIEND_OS v2.0 // PSYCH_HEARTBEAT_SYNCED ✓",
      name: "Divija 🌸",
      subtitle: "A dreamy, enchanted haven designed for my quiet MSc Psychologist, brilliant mind, and lifetime favorite human.",
      badge: "DIVIJA MODE ACTIVE",
      badgeColor: "text-pink-300 border-pink-500/30 bg-pink-500/10",
      quote: "“Bina bole jo nazar keh jaaye… haule haule dil ko dil se milaaye.”",
    },
    bf: {
      terminal: "INITIALIZING BOYFRIEND_OS v2.0 // NEURAL_PAIR_INIT_SUCCESS ✓",
      name: "Shrey ⚡",
      subtitle: "A dreamy, enchanted corner of the web made for my favourite nerdy, black-frame wearing, paneer-eating, infinitely ambitious AI engineer.",
      badge: "BOYFRIEND MODE ACTIVE",
      badgeColor: "text-sky-300 border-sky-500/30 bg-sky-500/10",
      quote: "“Our unspoken wavelength that zero machine learning models could ever decode.”",
    },
    together: {
      terminal: "INITIALIZING CELESTIAL_DUO_OS v∞ // DUAL_ORBITS_LOCKED ✓",
      name: "Shrey & Divija ❤️",
      subtitle: "Where quiet psychology meets machine learning code, wrapped in Kanha ji's blessings and endless love.",
      badge: "CELESTIAL DUO HARMONY",
      badgeColor: "text-amber-300 border-amber-500/30 bg-amber-500/10",
      quote: "“Bina bole jo nazar keh jaaye… haule haule dil ko dil se milaaye.”",
    },
  }[role];

  return (
    <section className="relative pt-8 pb-12 text-center max-w-4xl mx-auto space-y-6">
      {/* Terminal Eyebrow */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-mono tracking-widest font-semibold backdrop-blur-md shadow-md animate-fade-in ${heroContent.badgeColor}">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>{heroContent.terminal}</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-white tracking-tight leading-[1.08]">
        Welcome home, <br />
        <span className="shimmer-text">{heroContent.name}</span> 🪄✨
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
        {heroContent.subtitle}
      </p>

      {/* Harry Potter Interactive SVG Stage */}
      <HarryPotterStage role={role} onCastSpell={onCastSpell} />

      {/* Hero Soul Quote Card */}
      <div className="glass-card max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 border-pink-500/25 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
        <p className="text-lg sm:text-2xl font-serif text-pink-100 italic leading-relaxed">
          {heroContent.quote}
        </p>
        <p className="text-xs text-zinc-400 font-sans mt-3">
          Model weights frozen forever. Zero updates, zero rollbacks. 🔒❤️
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onReminder();
            }}
            className="py-2.5 px-5 rounded-2xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white shadow-lg shadow-pink-500/30 transition-all flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>Random Love Reminder</span>
          </button>

          <a
            href="#questions"
            onClick={() => sound.playClick()}
            className="py-2.5 px-5 rounded-2xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-all flex items-center gap-2"
          >
            <span>Explore Questions</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
