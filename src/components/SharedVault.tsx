"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { Heart, Sparkles, MessageCircleHeart, Flame, Compass } from "lucide-react";

interface SharedVaultProps {
  onNotify: (msg: string, type?: "spell" | "reminder" | "success" | "info") => void;
}

export default function SharedVault({ onNotify }: SharedVaultProps) {
  const [divijaNotes, setDivijaNotes] = useState<string[]>([]);
  const [shreyReplies, setShreyReplies] = useState<string[]>([]);

  useEffect(() => {
    try {
      const dn = localStorage.getItem("divija_secret_notes");
      if (dn) setDivijaNotes(JSON.parse(dn));
      const sr = localStorage.getItem("shrey_replies");
      if (sr) setShreyReplies(JSON.parse(sr));
    } catch {
      // ignore
    }
  }, []);

  const triggerDualReminder = () => {
    sound.playWandSpell();
    const reminders = [
      "🌸 Divija reminder to Shrey: Unclench your jaw, drink a tall glass of water, and remember you are my genius laddoo.",
      "⚡ Shrey reminder to Divija: Stop carrying the weight of the universe in your mind. I am always by your side.",
      "🦚 Sacred memory: Travelling miles on the metro just to hold hands for 45 minutes. That love lives forever.",
      "✨ Divine anchor: Kanha ji has already scripted our happily ever after. Relax and smile."
    ];
    const picked = reminders[Math.floor(Math.random() * reminders.length)];
    onNotify(picked, "reminder");
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ff85c0", "#7dd3fc", "#fcd34d"],
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Synchronicity Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 sm:p-5 border-pink-500/20 text-center">
          <span className="font-mono text-[10px] text-pink-300 block mb-1 uppercase tracking-wider">
            Connection Latency
          </span>
          <span className="text-xl sm:text-2xl font-bold font-serif text-white">0.00 ms</span>
          <span className="text-[10px] text-zinc-400 block mt-1">Instant Heartbeat Sync</span>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border-sky-500/20 text-center">
          <span className="font-mono text-[10px] text-sky-300 block mb-1 uppercase tracking-wider">
            NCR Metro Miles
          </span>
          <span className="text-xl sm:text-2xl font-bold font-serif text-white">1,400+ km</span>
          <span className="text-[10px] text-zinc-400 block mt-1">Stolen Stolen Moments</span>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border-amber-500/20 text-center">
          <span className="font-mono text-[10px] text-amber-300 block mb-1 uppercase tracking-wider">
            Packet Loss
          </span>
          <span className="text-xl sm:text-2xl font-bold font-serif text-emerald-400">0.0%</span>
          <span className="text-[10px] text-zinc-400 block mt-1">TCP Love Protocol</span>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border-purple-500/20 text-center">
          <span className="font-mono text-[10px] text-purple-300 block mb-1 uppercase tracking-wider">
            Sacred Alignment
          </span>
          <span className="text-xl sm:text-2xl font-bold font-serif text-white">100%</span>
          <span className="text-[10px] text-zinc-400 block mt-1">Kanha Ji Blessings 🦚</span>
        </div>
      </div>

      {/* Shared Conversation Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border-pink-500/25 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-gradient-to-tr from-pink-500 to-amber-300 text-white">
              <MessageCircleHeart className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-xl text-white">
                The Synchronized Shared Vault 💌
              </h3>
              <p className="text-xs text-zinc-400">
                Where Divija&apos;s thoughts and Shrey&apos;s answers live in shared memory:
              </p>
            </div>
          </div>

          <button
            onClick={triggerDualReminder}
            className="py-2 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-pink-500 to-amber-400 hover:opacity-90 text-white shadow-lg shadow-pink-500/30 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Dual Ping</span>
          </button>
        </div>

        {/* Dual Stream Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Divija's Messages */}
          <div className="p-4 rounded-2xl bg-black/40 border border-pink-500/20 space-y-3">
            <span className="font-mono text-[11px] font-bold text-pink-300 flex items-center gap-1">
              🌸 Divija&apos;s Dispatches:
            </span>
            {divijaNotes.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {divijaNotes.map((n, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-pink-950/40 text-xs text-pink-100 font-serif italic">
                    “{n}”
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 italic">No notes logged yet. Use Girlfriend mode to drop one!</p>
            )}
          </div>

          {/* Shrey's Messages */}
          <div className="p-4 rounded-2xl bg-black/40 border border-sky-500/20 space-y-3">
            <span className="font-mono text-[11px] font-bold text-sky-300 flex items-center gap-1">
              ⚡ Shrey&apos;s Transmissions:
            </span>
            {shreyReplies.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {shreyReplies.map((r, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-sky-950/40 text-xs text-sky-100 font-serif italic">
                    “{r}”
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 italic">No replies logged yet. Use Boyfriend mode to drop one!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
