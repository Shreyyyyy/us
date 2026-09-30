"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LORE_TIMELINE } from "@/data/relationshipData";
import { Sparkles, Eye, Compass } from "lucide-react";
import { sound } from "@/lib/sound";

export default function LoreTimeline() {
  const [revealedSecrets, setRevealedSecrets] = useState<Record<number, boolean>>({});

  const toggleSecret = (idx: number) => {
    sound.playClick();
    setRevealedSecrets((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section id="lore" className="w-full space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-300 text-xs font-mono tracking-wider">
          <Compass className="w-3.5 h-3.5 text-pink-400" />
          <span>OUR TIME IN THE UNIVERSE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          How Two Opposites Calibrated 💫
        </h2>
        <p className="text-sm sm:text-base text-zinc-300">
          The true lore of Shrey & Divija. Tap on any chapter to unlock hidden memories and folklore:
        </p>
      </div>

      {/* Timeline Tree */}
      <div className="relative max-w-4xl mx-auto pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-pink-500 before:via-purple-500 before:to-amber-400">
        {LORE_TIMELINE.map((item, idx) => {
          const isSecretOpen = !!revealedSecrets[idx];
          return (
            <div key={idx} className="relative group">
              {/* Timeline Node Dot */}
              <div className="absolute -left-[27px] sm:-left-[31px] top-4 w-7 h-7 rounded-full bg-[#160d24] border-2 border-pink-400 flex items-center justify-center text-xs shadow-lg shadow-pink-500/30 group-hover:scale-125 transition-transform z-10">
                <span>{item.icon}</span>
              </div>

              {/* Card */}
              <div className="glass-card rounded-3xl p-6 sm:p-7 border-white/10 hover:border-pink-500/30 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs uppercase font-bold text-pink-400 tracking-wider">
                    {item.year}
                  </span>
                  <span className="font-serif italic text-xs text-amber-300/90">
                    {item.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Embedded Candid Memory Polaroid */}
                {item.photo && (
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4 bg-black/40 p-3.5 rounded-2xl border border-white/5">
                    <div className="relative w-full sm:w-44 h-52 sm:h-36 rounded-xl overflow-hidden shrink-0 shadow-lg border border-pink-500/20 group/photo">
                      <Image
                        src={item.photo}
                        alt={item.title}
                        fill
                        className="object-cover group-hover/photo:scale-105 transition-transform duration-500"
                        sizes="200px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {item.photoTag && (
                        <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-wider text-pink-300 bg-black/70 px-2 py-0.5 rounded-full border border-pink-500/30">
                          {item.photoTag}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 space-y-1.5 text-left">
                      <span className="font-serif italic text-xs sm:text-sm text-pink-200/95 leading-relaxed block">
                        “{item.photoCaption}”
                      </span>
                      <span className="font-mono text-[10px] text-amber-300/80 block">
                        ✦ Authentic moment • Shrey & Chintu
                      </span>
                    </div>
                  </div>
                )}

                {/* Secret Toggle */}
                {item.loreSecret && (
                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-col items-start gap-2">
                    <button
                      onClick={() => toggleSecret(idx)}
                      className="text-xs font-mono font-medium text-pink-300/80 hover:text-pink-300 flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isSecretOpen ? "Hide Secret Lore" : "✦ Read Secret Memory"}</span>
                    </button>

                    {isSecretOpen && (
                      <div className="w-full p-3 rounded-2xl bg-pink-950/30 border border-pink-500/30 text-xs text-pink-200 italic font-serif flex items-start gap-2 animate-fadeIn">
                        <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                        <span>{item.loreSecret}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
