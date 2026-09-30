"use client";

import React, { useState } from "react";
import { OPEN_WHEN_LETTERS } from "@/data/relationshipData";
import { OpenWhenLetter } from "@/types";
import { Mail, Sparkles, X, Heart } from "lucide-react";
import { sound } from "@/lib/sound";

export default function OpenWhenVault() {
  const [activeLetter, setActiveLetter] = useState<OpenWhenLetter | null>(null);

  const openLetter = (letter: OpenWhenLetter) => {
    sound.playWandSpell();
    setActiveLetter(letter);
  };

  const closeLetter = () => {
    sound.playClick();
    setActiveLetter(null);
  };

  return (
    <section id="letters" className="w-full space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-mono tracking-wider">
          <Mail className="w-3.5 h-3.5 text-rose-400" />
          <span>ENCHANTED LETTER VAULT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Open When... 💌
        </h2>
        <p className="text-sm sm:text-base text-zinc-300">
          Written with permanent ink for every mood and circumstance. Tap an envelope whenever you need my voice:
        </p>
      </div>

      {/* Grid of Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {OPEN_WHEN_LETTERS.map((letter) => (
          <div
            key={letter.id}
            onClick={() => openLetter(letter)}
            className="group cursor-pointer glass-card rounded-3xl p-5 border-white/10 hover:border-pink-500/40 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/20"
          >
            {/* Wax Seal Symbol */}
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-600/30 to-rose-400/20 border border-pink-400/30 flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
                {letter.icon}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-pink-300/80 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                Sealed with Love
              </span>
            </div>

            <h3 className="font-serif font-bold text-base text-white group-hover:text-pink-200 transition-colors mb-1.5">
              Open When {letter.title}
            </h3>
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {letter.preview}
            </p>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-pink-400 group-hover:text-pink-300">
              <span>Read Memo</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Full Letter Modal */}
      {activeLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-lg bg-gradient-to-b from-[#1b1028] via-[#120a1c] to-[#08050e] border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient blur */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeLetter.icon}</span>
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-pink-400">
                    Personal Memo
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white">
                    When {activeLetter.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={closeLetter}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                aria-label="Close memo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="py-6 space-y-4">
              <p className="font-serif text-sm sm:text-base text-zinc-100 leading-relaxed italic">
                “{activeLetter.body}”
              </p>

              <div className="p-3.5 rounded-2xl bg-pink-950/40 border border-pink-500/20 text-xs text-pink-300 font-mono">
                {activeLetter.ps}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-1.5 text-pink-300 font-serif">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Always in your corner</span>
              </div>
              <button
                onClick={closeLetter}
                className="px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-colors"
              >
                Close Memo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
