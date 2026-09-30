"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Zap, CheckCircle2, AlertCircle, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { UserRole } from "@/types";

interface IdentityGateProps {
  onVerified: (role: UserRole) => void;
}

export default function IdentityGate({ onVerified }: IdentityGateProps) {
  const [selectedRole, setSelectedRole] = useState<"gf" | "bf" | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isPassed, setIsPassed] = useState(false);

  // Exactly ONE obvious question for each
  const verificationData = {
    gf: {
      title: "Divija (Jalebi) Verification",
      subtitle: "One obvious question only the real Jalebi knows:",
      question: "Who holds the undisputed title of 'Laddu' — the nerdy, black-frame wearing AI boy who is hopelessly obsessed with you?",
      options: [
        {
          text: "Shrey (My Nerdy, Paneer-Loving Laddu) ❤️",
          isCorrect: true,
          feedback: "100% CORRECT! Your Laddu is waiting inside! 🪄",
        },
        {
          text: "A random stranger on the Delhi-NCR metro",
          isCorrect: false,
          feedback: "No way! Only Shrey travels across NCR for you!",
        },
        {
          text: "The OpenAI ChatGPT algorithm",
          isCorrect: false,
          feedback: "ChatGPT doesn't give warm bear hugs!",
        },
      ],
    },
    bf: {
      title: "Shrey (Laddu) Verification",
      subtitle: "One obvious question only the real Laddu knows:",
      question: "Who is your sweet, overthinking MSc Psychologist 'Jalebi' whom you are completely, head-over-heels in love with?",
      options: [
        {
          text: "Divija (My Sweet Jalebi & Lifetime Queen) 🌸",
          isCorrect: true,
          feedback: "100% CORRECT! Your Jalebi's world is unlocked! 💖",
        },
        {
          text: "An NVIDIA H100 GPU cluster",
          isCorrect: false,
          feedback: "GPUs are cool, but Jalebi's smile is infinite!",
        },
        {
          text: "A 200g block of fresh paneer",
          isCorrect: false,
          feedback: "Paneer is delicious, but Divija comes first!",
        },
      ],
    },
  };

  const currentData = selectedRole ? verificationData[selectedRole] : null;

  const handleSelectOption = (idx: number) => {
    if (!currentData) return;
    setSelectedOpt(idx);
    const opt = currentData.options[idx];

    if (opt.isCorrect) {
      sound.playSuccess();
      setErrorMsg(null);
      setSuccessMsg(opt.feedback);
      setIsPassed(true);

      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#ff85c0", "#7dd3fc", "#fcd34d", "#ffffff"],
      });

      setTimeout(() => {
        onVerified(selectedRole!);
      }, 1200);
    } else {
      sound.playTerminalBlip();
      setSuccessMsg(null);
      setErrorMsg(opt.feedback);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative z-30 selection:bg-pink-500/30">
      {/* Ambient background glow */}
      <div className="fixed top-1/4 left-1/4 -translate-x-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 translate-x-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-amber-400 to-sky-400" />

        {/* STEP 1: WHO ARE YOU? */}
        {!selectedRole && (
          <div className="space-y-5 text-center animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-300 mx-auto flex items-center justify-center shadow-lg shadow-pink-500/25">
              <Lock className="w-7 h-7 text-white" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-pink-400" />
                <span>LOVE GATEWAY // PROVE WHO YOU ARE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-tight">
                Who&apos;s Visiting? 🪄
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xs mx-auto">
                Select your identity to answer your 1 obvious relationship question:
              </p>
            </div>

            {/* Two Choices: Jalebi or Laddu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedRole("gf");
                }}
                className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-pink-950/40 to-black/40 border border-pink-500/30 hover:border-pink-400 hover:scale-[1.02] transition-all flex flex-col items-center gap-2.5 text-center shadow-lg active:scale-95"
              >
                <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🌸
                </div>
                <div>
                  <span className="font-serif font-bold text-sm sm:text-base text-pink-100 block group-hover:text-white">
                    I am Divija (Jalebi)
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-pink-300/80 font-mono block mt-0.5">
                    MSc Psychologist 👑
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedRole("bf");
                }}
                className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-sky-950/40 to-black/40 border border-sky-500/30 hover:border-sky-400 hover:scale-[1.02] transition-all flex flex-col items-center gap-2.5 text-center shadow-lg active:scale-95"
              >
                <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <div>
                  <span className="font-serif font-bold text-sm sm:text-base text-sky-100 block group-hover:text-white">
                    I am Shrey (Laddu)
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-sky-300/80 font-mono block mt-0.5">
                    AI Wizard & Sunflower 🌻
                  </span>
                </div>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onVerified("together");
                }}
                className="text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Or enter directly in Dual Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ONE OBVIOUS QUESTION */}
        {selectedRole && currentData && !isPassed && (
          <div className="space-y-5 animate-fadeIn">
            {/* Header / Back */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <button
                onClick={() => {
                  setSelectedRole(null);
                  setSelectedOpt(null);
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className="text-zinc-400 hover:text-white font-mono transition-colors text-xs"
              >
                ← Back
              </button>
              <div className="flex items-center gap-1.5 text-pink-300 font-mono text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>1 QUESTION CHECK</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-amber-300/90 block">
                {currentData.subtitle}
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white leading-snug">
                {currentData.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-2.5 pt-1">
              {currentData.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm font-medium transition-all flex items-start gap-3 border ${
                      isSelected && opt.isCorrect
                        ? "bg-emerald-950/40 border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-500/20 scale-[1.01]"
                        : isSelected && !opt.isCorrect
                        ? "bg-rose-950/40 border-rose-400 text-rose-100 shadow-lg shadow-rose-500/20"
                        : "bg-white/5 border-white/10 text-zinc-200 hover:bg-white/10 hover:border-pink-500/30 active:scale-[0.99]"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 font-mono text-xs mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {successMsg && (
              <div className="p-3 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 rounded-2xl bg-rose-950/50 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {isPassed && (
          <div className="space-y-4 text-center py-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-300 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-bounce-short">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] sm:text-xs uppercase tracking-widest border border-emerald-500/40">
                <Sparkles className="w-3 h-3" />
                <span>IDENTITY CONFIRMED</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-white">
                Welcome home, {selectedRole === "gf" ? "Jalebi 🌸" : "Laddu ⚡"}
              </h2>
              <p className="text-xs text-zinc-300 max-w-xs mx-auto">
                Opening your customized digital haven right now...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
