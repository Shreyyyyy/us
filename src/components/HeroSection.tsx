"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UserRole } from "@/types";
import HarryPotterStage from "@/components/HarryPotterStage";
import { Sparkles, Heart, ArrowDown, X } from "lucide-react";
import { sound } from "@/lib/sound";

interface HeroSectionProps {
  role: UserRole;
  onCastSpell: (msg: string) => void;
  onReminder: () => void;
}

export default function HeroSection({ role, onCastSpell, onReminder }: HeroSectionProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; caption: string; title: string } | null>(null);

  const heroContent = {
    gf: {
      terminal: "INITIALIZING JALEBI_OS v2.0 // PSYCH_HEARTBEAT_SYNCED ✓",
      name: "Divija (Jalebi) 🌸",
      subtitle: "A dreamy, enchanted haven designed for my sweet MSc Psychologist, my favorite human, and the queen of my heart.",
      badge: "JALEBI MODE ACTIVE",
      badgeColor: "text-pink-300 border-pink-500/30 bg-pink-500/10",
      quote: "“Bina bole jo nazar keh jaaye… haule haule dil ko dil se milaaye.”",
    },
    bf: {
      terminal: "INITIALIZING LADDU_OS v2.0 // NEURAL_PAIR_INIT_SUCCESS ✓",
      name: "Shrey (Laddu) ⚡",
      subtitle: "A dreamy, enchanted corner of the web made for my favourite nerdy, black-frame wearing, paneer-eating, infinitely ambitious AI engineer.",
      badge: "LADDU MODE ACTIVE",
      badgeColor: "text-sky-300 border-sky-500/30 bg-sky-500/10",
      quote: "“In an infinite universe of mathematical noise, my heart converged on Jalebi with zero error tolerance.”",
    },
    together: {
      terminal: "INITIALIZING CELESTIAL_DUO_OS v∞ // DUAL_ORBITS_LOCKED ✓",
      name: "Laddu & Jalebi ❤️",
      subtitle: "Where quiet psychology meets machine learning code, wrapped in Kanha ji's blessings and endless love.",
      badge: "CELESTIAL DUO HARMONY",
      badgeColor: "text-amber-300 border-amber-500/30 bg-amber-500/10",
      quote: "“Bina bole jo nazar keh jaaye… haule haule dil ko dil se milaaye.”",
    },
  }[role];

  const openPhoto = (src: string, title: string, caption: string) => {
    sound.playClick();
    setSelectedPhoto({ src, title, caption });
  };

  return (
    <section className="relative pt-6 pb-12 text-center max-w-5xl mx-auto space-y-6">
      {/* Terminal Eyebrow */}
      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-mono tracking-widest font-semibold backdrop-blur-md shadow-md ${heroContent.badgeColor}`}>
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

      {/* Hero Stage Area with Flanking Candid Polaroids */}
      <div className="relative">
        {/* Left Floating Polaroid - Cinema Kiss */}
        <div
          onClick={() =>
            openPhoto(
              "/photos/photo-5.jpeg",
              "Our Bollywood Cinema Kiss",
              "DDLJ playing in the background, warm red neon arches glowing, and a quiet cheek kiss that made the entire NCR noise fade into quiet bliss."
            )
          }
          className="hidden xl:block absolute -left-12 top-16 z-20 w-44 bg-white/95 p-3 pb-5 rounded-2xl shadow-2xl shadow-pink-950/60 rotate-[-5deg] hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer group"
          title="Click to view memory"
        >
          {/* Frosted Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-white/70 backdrop-blur-sm border border-white/50 rounded-sm rotate-2 shadow-sm" />
          <div className="relative w-full h-44 rounded-xl overflow-hidden bg-black/10">
            <Image
              src="/photos/photo-5.jpeg"
              alt="Bollywood Romance"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="180px"
            />
          </div>
          <p className="font-serif italic text-[11px] text-zinc-800 mt-2.5 text-center leading-tight">
            Our Bollywood Kiss 🎬❤️
          </p>
        </div>

        {/* Right Floating Polaroid - That Look with Pink Rose */}
        <div
          onClick={() =>
            openPhoto(
              "/photos/photo-2.jpeg",
              "That Look (100% Devotion)",
              "Shrey (Laddu) completely captivated by Jalebi. Jalebi with her little pink rose, holding hands. The gaze that says more than a million neural networks could ever articulate."
            )
          }
          className="hidden xl:block absolute -right-12 top-20 z-20 w-44 bg-white/95 p-3 pb-5 rounded-2xl shadow-2xl shadow-pink-950/60 rotate-[4deg] hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer group"
          title="Click to view memory"
        >
          {/* Frosted Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-white/70 backdrop-blur-sm border border-white/50 rounded-sm -rotate-2 shadow-sm" />
          <div className="relative w-full h-44 rounded-xl overflow-hidden bg-black/10">
            <Image
              src="/photos/photo-2.jpeg"
              alt="That Look"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="180px"
            />
          </div>
          <p className="font-serif italic text-[11px] text-zinc-800 mt-2.5 text-center leading-tight">
            That Look • 100% Devotion 🌸
          </p>
        </div>

        {/* Harry Potter Interactive SVG Stage */}
        <HarryPotterStage role={role} onCastSpell={onCastSpell} />
      </div>

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
            <span>Explore Our Universe</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Lightbox for hero polaroids */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#160d24] border border-pink-500/30 rounded-3xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left space-y-1">
              <h4 className="font-serif font-bold text-lg text-white">
                {selectedPhoto.title}
              </h4>
              <p className="text-xs text-pink-200/90 font-serif italic leading-relaxed">
                “{selectedPhoto.caption}”
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
