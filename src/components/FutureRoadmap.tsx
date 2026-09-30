"use client";

import React from "react";
import { Sparkles, MapPin, Compass } from "lucide-react";

const ROADMAP_ITEMS = [
  {
    icon: "🏡",
    title: "Our Warm Cozy Home",
    desc: "A plant-filled sanctuary with warm fairy lights, large bookshelf, and a quiet corner to sip morning chai together.",
    tag: "Priority: Sacred",
  },
  {
    icon: "🌎",
    title: "World Expeditions",
    desc: "From European cobblestones to Asian street food markets, suitcase in hand, collecting passport stamps side by side.",
    tag: "Exploring",
  },
  {
    icon: "☔",
    title: "Endless Rainy Night Drives",
    desc: "Noida, Delhi, or anywhere in the world: rain beating on the roof, Behkana softly playing, hands intertwined.",
    tag: "Routine Joy",
  },
  {
    icon: "🛕",
    title: "Vrindavan & ISKCON Pilgrimages",
    desc: "Quiet early mornings with Krishna kirtan, bells ringing, offering gratitude for guiding our destinies together.",
    tag: "Spiritual Anchor",
  },
  {
    icon: "🚀",
    title: "Milestone Celebrations",
    desc: "Cheering every single career achievement, AI paper, thesis defense, and personal triumph without ego, just pure pride.",
    tag: "Forever Team",
  },
];

export default function FutureRoadmap() {
  return (
    <section id="future" className="w-full space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono tracking-wider">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>FUTURE.EXE COMPILATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Our Shared Roadmaps 🌎
        </h2>
        <p className="text-sm sm:text-base text-zinc-300">
          The blueprints already queued in our life timeline:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {ROADMAP_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="glass-card rounded-3xl p-6 border-white/10 hover:border-amber-400/40 relative overflow-hidden group transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl p-2 rounded-2xl bg-white/5 border border-white/10 inline-block group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="font-mono text-[10px] text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-400/20">
                {item.tag}
              </span>
            </div>

            <h3 className="font-serif font-bold text-lg text-white group-hover:text-amber-200 transition-colors mb-2">
              {item.title}
            </h3>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {item.desc}
            </p>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-amber-400/80">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Compilation Status: 100% Guaranteed</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
