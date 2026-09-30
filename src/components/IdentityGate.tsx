"use client";

import React, { useState } from "react";
import Image from "next/image";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Zap, CheckCircle2, AlertCircle, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { UserRole } from "@/types";

interface IdentityGateProps {
  onVerified: (role: UserRole) => void;
}

interface WittyQuestion {
  question: string;
  subtitle: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

const DIVIJA_QUESTIONS: WittyQuestion[] = [
  {
    question: "Security Check #1: When Shrey travels 1.5 hours across NCR metro lines just to see you for 45 minutes, what is his official mental state?",
    subtitle: "Prove you understand your boyfriend's neural psychology:",
    options: [
      {
        text: "He was secretly lost between Rajiv Chowk and Botanical Garden.",
        isCorrect: false,
        feedback: "Incorrect! He knows the metro map by heart just to get to you!",
      },
      {
        text: "Hopelessly, irreversibly, and completely obsessed with his Chintu.",
        isCorrect: true,
        feedback: "100% ACCURATE! That boy would travel across the galaxies for you. ❤️",
      },
      {
        text: "He just really wanted an NCR street snack.",
        isCorrect: false,
        feedback: "Blasphemy! Street food is nothing compared to your smile.",
      },
    ],
  },
  {
    question: "Security Check #2: In the legendary 'Room Incident', what was Shrey's heart rate when your brother banged on the door?",
    subtitle: "Test your recall of Delhi folklore:",
    options: [
      {
        text: "480 BPM (Currently writing his final will behind the furniture).",
        isCorrect: true,
        feedback: "SPOT ON! His adrenaline spiked higher than an overheating GPU! 😂",
      },
      {
        text: "60 BPM (A calm Zen master meditating on inner peace).",
        isCorrect: false,
        feedback: "Are you kidding? He froze like a statue and almost stopped breathing!",
      },
      {
        text: "He smoothly walked out and offered high-five.",
        isCorrect: false,
        feedback: "In an alternate universe maybe! In this universe, pure comedy panic.",
      },
    ],
  },
];

const SHREY_QUESTIONS: WittyQuestion[] = [
  {
    question: "Security Check #1: Chintu sends a message at 11:30 PM saying: 'Kch nahi, tum kaam kar lo.' What is the mathematically optimal survival response?",
    subtitle: "AI Engineer gradient calculation challenge:",
    options: [
      {
        text: "“Okay cool baby, pushing code to production now!”",
        isCorrect: false,
        feedback: "FATAL ERROR! Loss +99999.0! Prepare for 3 days of silent kalesh!",
      },
      {
        text: "Close the laptop immediately, dial her number, and say 'Batao Chintu kya hua?' in the gentlest voice.",
        isCorrect: true,
        feedback: "OPTIMAL GRADIENT! Loss = 0.000. You truly know your girl! 🌸",
      },
      {
        text: "Send a thumbs-up emoji and a meme.",
        isCorrect: false,
        feedback: "Instant penalty! Never send just a thumbs-up to Chintu!",
      },
    ],
  },
  {
    question: "Security Check #2: What is the absolute, non-negotiable hierarchy of the universe?",
    subtitle: "Verify your core values, engineer:",
    options: [
      {
        text: "Chintu's happiness & forehead kisses > Paneer > Coding > Everything else.",
        isCorrect: true,
        feedback: "CORRECT! The laws of physics, AI, and romance agree. 💖",
      },
      {
        text: "NVIDIA H100 GPUs > Sleep > Everything else.",
        isCorrect: false,
        feedback: "Wrong! GPUs can't give you warm hugs or listen to Behkana with you.",
      },
      {
        text: "Plain Diet Coke > World Peace.",
        isCorrect: false,
        feedback: "Diet Coke is good, but Chintu's smile is infinite.",
      },
    ],
  },
];

export default function IdentityGate({ onVerified }: IdentityGateProps) {
  const [selectedRole, setSelectedRole] = useState<"gf" | "bf" | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isPassed, setIsPassed] = useState(false);

  const startVerification = (role: "gf" | "bf") => {
    sound.playClick();
    setSelectedRole(role);
    setQIndex(0);
    setSelectedOpt(null);
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsPassed(false);
  };

  const currentQuestions = selectedRole === "gf" ? DIVIJA_QUESTIONS : SHREY_QUESTIONS;
  const currentQ = currentQuestions[qIndex];

  const handleSelectOption = (idx: number) => {
    setSelectedOpt(idx);
    const opt = currentQ.options[idx];

    if (opt.isCorrect) {
      sound.playSuccess();
      setErrorMsg(null);
      setSuccessMsg(opt.feedback);

      if (qIndex < currentQuestions.length - 1) {
        setTimeout(() => {
          setQIndex((prev) => prev + 1);
          setSelectedOpt(null);
          setSuccessMsg(null);
        }, 1200);
      } else {
        // All questions passed!
        setIsPassed(true);
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#ff85c0", "#7dd3fc", "#fcd34d", "#ffffff"],
        });
        setTimeout(() => {
          onVerified(selectedRole!);
        }, 1500);
      }
    } else {
      sound.playTerminalBlip();
      setSuccessMsg(null);
      setErrorMsg(opt.feedback);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative z-30 selection:bg-pink-500/30">
      {/* Glow Ambient Blobs */}
      <div className="fixed top-1/4 left-1/4 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
        {/* Subtle top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-400" />

        {/* STEP 1: SELECT IDENTITY */}
        {!selectedRole && (
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-300 mx-auto flex items-center justify-center shadow-xl shadow-pink-500/25">
              <Lock className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300 font-mono text-[11px] uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-pink-400" />
                <span>CELESTIAL LOVE GATEWAY</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-white tracking-tight">
                Proof of Identity 🪄
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
                Before entering our enchanted digital home, you must prove who you are with authentic relationship trivia:
              </p>
            </div>

            {/* Role Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => startVerification("gf")}
                className="group p-5 rounded-2xl bg-gradient-to-b from-pink-950/40 to-black/40 border border-pink-500/30 hover:border-pink-400 hover:scale-[1.02] transition-all flex flex-col items-center gap-3 text-center shadow-lg hover:shadow-pink-500/20 active:scale-95"
              >
                <div className="w-14 h-14 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🌸
                </div>
                <div>
                  <span className="font-serif font-bold text-base text-pink-100 block group-hover:text-white">
                    I am Divija (Chintu)
                  </span>
                  <span className="text-[11px] text-pink-300/80 font-mono block mt-0.5">
                    MSc Psychologist & Queen 👑
                  </span>
                </div>
              </button>

              <button
                onClick={() => startVerification("bf")}
                className="group p-5 rounded-2xl bg-gradient-to-b from-sky-950/40 to-black/40 border border-sky-500/30 hover:border-sky-400 hover:scale-[1.02] transition-all flex flex-col items-center gap-3 text-center shadow-lg hover:shadow-sky-500/20 active:scale-95"
              >
                <div className="w-14 h-14 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <div>
                  <span className="font-serif font-bold text-base text-sky-100 block group-hover:text-white">
                    I am Shrey
                  </span>
                  <span className="text-[11px] text-sky-300/80 font-mono block mt-0.5">
                    AI Engineer & Sunflower 🧠
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
                <span>Or explore in Celestial Dual Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: WITTY QUESTIONS */}
        {selectedRole && !isPassed && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top status */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <button
                onClick={() => setSelectedRole(null)}
                className="text-zinc-400 hover:text-white text-xs font-mono transition-colors"
              >
                ← Back
              </button>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-pink-300 font-bold">
                  {selectedRole === "gf" ? "CHINTU VERIFICATION" : "SHREY VERIFICATION"}
                </span>
                <span className="font-mono text-zinc-500">
                  [{qIndex + 1}/{currentQuestions.length}]
                </span>
              </div>
            </div>

            {/* Question card */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-amber-300/90 block">
                {currentQ.subtitle}
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* Options list */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm font-medium transition-all flex items-start gap-3 border ${
                      isSelected && opt.isCorrect
                        ? "bg-emerald-950/40 border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-500/20 scale-[1.01]"
                        : isSelected && !opt.isCorrect
                        ? "bg-rose-950/40 border-rose-400 text-rose-100 shadow-lg shadow-rose-500/20"
                        : "bg-white/5 border-white/10 text-zinc-200 hover:bg-white/10 hover:border-pink-500/30 active:scale-[0.99]"
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 font-mono text-xs mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback messages */}
            {successMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-950/50 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: SUCCESS GRANTED */}
        {isPassed && (
          <div className="space-y-6 text-center py-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-300 mx-auto flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-bounce-short">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs uppercase tracking-widest border border-emerald-500/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ACCESS FULLY GRANTED</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-white">
                Welcome home, {selectedRole === "gf" ? "Chintu 🌸" : "Shrey ⚡"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto">
                Identity verified beyond shadow of a doubt. Loading your customized digital haven...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
