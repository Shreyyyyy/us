"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { AlertTriangle, Flame, Heart, X, Sparkles } from "lucide-react";

export default function ForbiddenProtocol() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleTrigger = () => {
    sound.playWandSpell();
    setModalOpen(true);

    // Grand Fireworks
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff85c0", "#f43f5e", "#fcd34d"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#7dd3fc", "#38bdf8", "#c084fc"],
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section className="w-full text-center py-6">
      <div className="glass-panel rounded-3xl p-8 max-w-lg mx-auto border-rose-500/30 relative overflow-hidden shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono tracking-wider mb-3">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>FORBIDDEN OVERRIDE PROTOCOL</span>
        </div>

        <h3 className="text-2xl font-serif font-bold text-white mb-2">
          Strictly Do Not Touch ⚠️
        </h3>
        <p className="text-xs text-zinc-400 mb-6">
          Curiosity killed the cat, Shrey & Divija. Don&apos;t press this button.
        </p>

        <button
          onClick={handleTrigger}
          className="py-3 px-8 rounded-2xl text-sm font-bold bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-xl shadow-red-600/40 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <Flame className="w-4 h-4" />
          <span>DO NOT CLICK 🛑</span>
        </button>
      </div>

      {/* Grand Fullscreen Confession Finale */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#1f0f29] via-[#120718] to-[#07030a] border border-pink-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              aria-label="Close protocol"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Icon */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-amber-300 mx-auto flex items-center justify-center shadow-xl shadow-pink-500/40 mb-6 animate-bounce-short">
              <Heart className="w-10 h-10 text-white fill-current" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-mono tracking-wider mb-4 border border-pink-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIVINE ALLIANCE CERTIFIED</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4 leading-tight">
              Hey my Shrey & Chintu,
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-pink-100 font-serif leading-relaxed max-w-xl mx-auto">
              <p>
                Whether you&apos;re training complex deep models late into the night, analyzing human psychology, or dancing like Ranveer Singh in the room at 2 AM — you are each other&apos;s greatest blessing.
              </p>
              <p className="text-zinc-300 font-sans text-xs sm:text-sm">
                Through rainy Noida pickups, long metro treks across Delhi-NCR, silly bickering, and infinite ambition... Kanha ji is always smiling down, protecting this sacred bond. 🦚
              </p>
              <p className="text-xl sm:text-2xl text-amber-300 pt-2 font-serif italic">
                “Bina bole jo nazar keh jaaye… haule haule dil ko dil se milaaye.” ✨
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
              <span>Model Weights: Frozen Forever 🔒❤️</span>
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold transition-all"
              >
                Return to Our World ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
