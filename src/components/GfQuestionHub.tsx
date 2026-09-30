"use client";

import React, { useState, useEffect } from "react";
import { GF_QUESTIONS, LOVE_VOUCHERS } from "@/data/relationshipData";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Feather, Send, CheckCircle2, Ticket, Coffee } from "lucide-react";

interface GfQuestionHubProps {
  onNotify: (msg: string, type?: "spell" | "reminder" | "success" | "info") => void;
}

export default function GfQuestionHub({ onNotify }: GfQuestionHubProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [secretNote, setSecretNote] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [noteSent, setNoteSent] = useState(false);
  const [vouchers, setVouchers] = useState(LOVE_VOUCHERS);
  const [claimedVoucherId, setClaimedVoucherId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("divija_secret_notes");
      if (stored) {
        setSavedNotes(JSON.parse(stored));
      }
    } catch {
      // Local storage fallback
    }
  }, []);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    sound.playSuccess();
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    const question = GF_QUESTIONS.find((q) => q.id === questionId);
    if (question) {
      const opt = question.options[optionIndex];
      onNotify(opt.response, "reminder");
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.7 },
        colors: ["#ff85c0", "#fbcfe8", "#fcd34d"],
      });
    }
  };

  const handleSaveSecretNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretNote.trim()) return;
    sound.playWandSpell();
    const updated = [secretNote.trim(), ...savedNotes];
    setSavedNotes(updated);
    try {
      localStorage.setItem("divija_secret_notes", JSON.stringify(updated));
    } catch {
      // ignore
    }
    setSecretNote("");
    setNoteSent(true);
    setTimeout(() => setNoteSent(false), 4000);
    onNotify("💌 Note dropped into the Shared Vault! Shrey can view it in his terminal or boyfriend mode.", "success");
    confetti({
      particleCount: 40,
      spread: 60,
      colors: ["#ff85c0", "#f43f5e", "#ffffff"],
    });
  };

  const claimVoucher = (vId: string, title: string) => {
    sound.playSuccess();
    setClaimedVoucherId(vId);
    setVouchers((prev) =>
      prev.map((v) => (v.id === vId ? { ...v, redeemed: true } : v))
    );
    onNotify(`🎟️ Voucher Claimed: "${title}"! Shrey is legally notified to fulfill this immediately.`, "success");
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const playSanctuaryPeace = () => {
    sound.playFluteTone();
    onNotify("🪚 Hare Krishna. Kanha ji's gentle grace wraps around you. Peace is already here.", "info");
  };

  return (
    <div className="w-full space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-300 text-xs font-mono tracking-wider">
          <Heart className="w-3.5 h-3.5 fill-current text-pink-400" />
          <span>CHINTU&apos;S REFLECTION SANCTUARY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Thoughtful Questions for Chintu 🌸
        </h2>
        <p className="text-sm sm:text-base text-zinc-300">
          Designed for my quiet MSc Psychologist, cute overthinker, and my Chintu. Tap an option below to calibrate our frequency:
        </p>
      </div>

      {/* Interactive Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GF_QUESTIONS.map((q) => {
          const selectedIdx = selectedAnswers[q.id];
          return (
            <div
              key={q.id}
              className="glass-card rounded-3xl p-6 flex flex-col justify-between border-pink-500/20 hover:border-pink-500/40 relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-pink-400 bg-pink-950/60 px-2.5 py-1 rounded-full border border-pink-500/20">
                    {q.category}
                  </span>
                  {selectedIdx !== undefined && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Calibrated
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-serif font-bold text-white leading-snug">
                  {q.title}
                </h3>
                <p className="text-xs text-zinc-400">{q.subtitle}</p>

                {/* Option Buttons */}
                <div className="space-y-2 pt-2">
                  {q.options.map((opt, idx) => {
                    const isSelected = selectedIdx === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(q.id, idx)}
                        className={`w-full text-left p-3 rounded-2xl text-xs font-medium transition-all flex items-start gap-2.5 border ${
                          isSelected
                            ? "bg-pink-500/20 border-pink-400 text-pink-100 shadow-lg shadow-pink-500/20 scale-[1.01]"
                            : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:border-pink-500/30"
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 font-mono text-[10px] text-pink-300 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1 leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Reveal Box */}
              {selectedIdx !== undefined && (
                <div className="mt-4 p-3.5 rounded-2xl bg-pink-950/40 border border-pink-500/30 text-xs space-y-1.5 animate-fadeIn">
                  <div className="font-mono text-[10px] uppercase font-bold tracking-wider text-pink-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-pink-400" /> Shrey&apos;s Designated Response:
                  </div>
                  <p className="text-zinc-200 italic font-serif leading-relaxed">
                    {q.options[selectedIdx].response}
                  </p>
                  {q.options[selectedIdx].reaction && (
                    <p className="text-[11px] text-pink-300/80 font-mono pt-1">
                      {q.options[selectedIdx].reaction}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive GF Features: Boyfriend Vouchers & Secret Whisper Box */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {/* Boyfriend Penalty & Love Vouchers */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-pink-500/20 space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
              <Ticket className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-xl text-white">
                Chintu&apos;s Boyfriend Vouchers 🎟️
              </h3>
              <p className="text-xs text-zinc-400">
                Non-negotiable coupons Shrey is legally obligated to honor:
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {vouchers
              .filter((v) => v.forWhom === "Divija")
              .map((v) => (
                <div
                  key={v.id}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 hover:border-pink-500/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{v.icon}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{v.title}</h4>
                      <p className="text-xs text-zinc-400">{v.subtitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => claimVoucher(v.id, v.title)}
                    disabled={v.redeemed}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                      v.redeemed
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default"
                        : "bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white shadow-md shadow-pink-500/30"
                    }`}
                  >
                    {v.redeemed ? "Claimed ✓" : "Redeem Now"}
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Secret Whisper Box for Shrey */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-pink-500/20 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
                <Feather className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-serif font-bold text-xl text-white">
                  Chintu&apos;s Secret Whisper Box 💌
                </h3>
                <p className="text-xs text-zinc-400">
                  Drop a thought, sweet complaint, or craving that saves to Shrey&apos;s boyfriend view:
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSecretNote} className="space-y-3 pt-2">
              <textarea
                value={secretNote}
                onChange={(e) => setSecretNote(e.target.value)}
                placeholder="e.g., 'Shrey, stop debugging and drink water right now.' or 'I miss our rainy drives...'"
                rows={3}
                className="w-full rounded-2xl bg-black/40 border border-white/10 focus:border-pink-400 text-white placeholder-zinc-500 p-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-pink-400 transition-all resize-none"
              />
              <button
                type="submit"
                disabled={!secretNote.trim()}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 disabled:opacity-40 text-white shadow-lg shadow-pink-500/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Drop Note to Shrey</span>
              </button>
            </form>

            {noteSent && (
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1 animate-fadeIn">
                <CheckCircle2 className="w-3.5 h-3.5" /> Note encrypted and locked into Shrey&apos;s terminal!
              </p>
            )}
          </div>

          {/* Spiritual Peace Anchor (Kanha Ji) */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-between gap-3 mt-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🦚</span>
              <div>
                <span className="text-xs font-semibold text-amber-200 block">
                  Kanha Ji Peace Sanctuary
                </span>
                <span className="text-[11px] text-zinc-400">
                  Whenever the mind is restless, tap for divine quietude:
                </span>
              </div>
            </div>
            <button
              onClick={playSanctuaryPeace}
              className="px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/30 text-xs font-mono font-medium transition-all"
            >
              Play Peace 🪚
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
