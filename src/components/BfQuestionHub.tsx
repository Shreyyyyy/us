"use client";

import React, { useState, useEffect } from "react";
import { BF_QUESTIONS } from "@/data/relationshipData";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { Zap, Sparkles, CheckCircle2, Cpu, Inbox, Send } from "lucide-react";

interface BfQuestionHubProps {
  onNotify: (msg: string, type?: "spell" | "reminder" | "success" | "info") => void;
}

export default function BfQuestionHub({ onNotify }: BfQuestionHubProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [divijaNotes, setDivijaNotes] = useState<string[]>([]);
  const [shreyReply, setShreyReply] = useState("");
  const [replySaved, setReplySaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("divija_secret_notes");
      if (stored) {
        setDivijaNotes(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    sound.playTerminalBlip();
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    const question = BF_QUESTIONS.find((q) => q.id === questionId);
    if (question) {
      const opt = question.options[optionIndex];
      onNotify(opt.response, "info");
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.7 },
        colors: ["#38bdf8", "#818cf8", "#fcd34d"],
      });
    }
  };

  const handleSaveShreyReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shreyReply.trim()) return;
    sound.playSuccess();
    try {
      const existing = JSON.parse(localStorage.getItem("shrey_replies") || "[]");
      const updated = [shreyReply.trim(), ...existing];
      localStorage.setItem("shrey_replies", JSON.stringify(updated));
    } catch {
      // ignore
    }
    setShreyReply("");
    setReplySaved(true);
    setTimeout(() => setReplySaved(false), 4000);
    onNotify("⚡ Shrey's reply encrypted into the Shared Vault for Divija!", "success");
    confetti({
      particleCount: 40,
      spread: 60,
      colors: ["#38bdf8", "#c084fc", "#ffffff"],
    });
  };

  return (
    <div className="w-full space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-300 text-xs font-mono tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-current text-sky-400" />
          <span>BOYFRIEND REASONING DIAGNOSTICS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Thoughtful Questions for Shrey ⚡
        </h2>
        <p className="text-sm sm:text-base text-zinc-300">
          Tailored for my favorite black-framed AI engineer, paneer lover, and chaotic midnight dancer. Calibrate your tensors below:
        </p>
      </div>

      {/* Interactive Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BF_QUESTIONS.map((q) => {
          const selectedIdx = selectedAnswers[q.id];
          return (
            <div
              key={q.id}
              className="glass-card rounded-3xl p-6 flex flex-col justify-between border-sky-500/20 hover:border-sky-500/40 relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-500/20">
                    {q.category}
                  </span>
                  {selectedIdx !== undefined && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Evaluated
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
                            ? "bg-sky-500/20 border-sky-400 text-sky-100 shadow-lg shadow-sky-500/20 scale-[1.01]"
                            : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:border-sky-500/30"
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 font-mono text-[10px] text-sky-300 mt-0.5">
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
                <div className="mt-4 p-3.5 rounded-2xl bg-sky-950/40 border border-sky-500/30 text-xs space-y-1.5 animate-fadeIn">
                  <div className="font-mono text-[10px] uppercase font-bold tracking-wider text-sky-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-sky-400" /> Divija&apos;s Prescribed Guidance:
                  </div>
                  <p className="text-zinc-200 italic font-serif leading-relaxed">
                    {q.options[selectedIdx].response}
                  </p>
                  {q.options[selectedIdx].reaction && (
                    <p className="text-[11px] text-sky-300/80 font-mono pt-1">
                      {q.options[selectedIdx].reaction}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* BF Features: Divija's Inbox + Shrey's Reply Scratchpad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {/* Incoming Notes From Divija */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-sky-500/20 space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
              <Inbox className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-xl text-white">
                Incoming Notes From Divija 📬
              </h3>
              <p className="text-xs text-zinc-400">
                Whispers dropped by Divija in her Girlfriend OS view:
              </p>
            </div>
          </div>

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {divijaNotes.length > 0 ? (
              divijaNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-pink-950/20 border border-pink-500/30 text-xs sm:text-sm text-pink-100 flex items-start gap-2.5"
                >
                  <span className="text-pink-400 mt-0.5">🌸</span>
                  <div className="flex-1">
                    <p className="italic font-serif leading-relaxed">“{note}”</p>
                    <span className="font-mono text-[10px] text-pink-300/60 block mt-1">
                      Priority: Urgent Girlfriend Directive
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-zinc-400">
                <p>No whispers dropped yet today.</p>
                <p className="text-[11px] text-zinc-500 mt-1">
                  (Divija can write from her Girlfriend Mode at any time!)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Shrey's Reply Pad */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-sky-500/20 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                <Cpu className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-serif font-bold text-xl text-white">
                  Shrey&apos;s Return Signal ⚡
                </h3>
                <p className="text-xs text-zinc-400">
                  Send a quick reassurance token or sweet thought back to Divija:
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveShreyReply} className="space-y-3 pt-2">
              <textarea
                value={shreyReply}
                onChange={(e) => setShreyReply(e.target.value)}
                placeholder="e.g., 'Taking a 10 min break right now. Miss you immensely my Laddoo.' or 'Models converged, let me order paneer for us!'"
                rows={3}
                className="w-full rounded-2xl bg-black/40 border border-white/10 focus:border-sky-400 text-white placeholder-zinc-500 p-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-sky-400 transition-all resize-none"
              />
              <button
                type="submit"
                disabled={!shreyReply.trim()}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 disabled:opacity-40 text-white shadow-lg shadow-sky-500/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit to Divija</span>
              </button>
            </form>

            {replySaved && (
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1 animate-fadeIn">
                <CheckCircle2 className="w-3.5 h-3.5" /> Transmitted! Divija can see this in her Shared Vault.
              </p>
            )}
          </div>

          {/* Quick Diet Coke / Paneer Reminder */}
          <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-between gap-3 mt-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🧀</span>
              <div>
                <span className="text-xs font-semibold text-sky-200 block">
                  Self-Care Protocol
                </span>
                <span className="text-[11px] text-zinc-400">
                  Hydrate, eat paneer, and give your eyes a 2-minute break!
                </span>
              </div>
            </div>
            <button
              onClick={() => onNotify("🧀 Paneer & hydration check-in logged! Divija sends a forehead kiss.", "success")}
              className="px-3 py-1.5 rounded-xl bg-sky-400/20 hover:bg-sky-400/30 text-sky-200 border border-sky-400/30 text-xs font-mono font-medium transition-all"
            >
              Log Hydration 💧
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
