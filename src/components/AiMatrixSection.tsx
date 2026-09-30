"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { Cpu, RefreshCw, Sparkles, Terminal, Activity } from "lucide-react";

interface AiMatrixSectionProps {
  onNotify: (msg: string, type?: "spell" | "reminder" | "success" | "info") => void;
}

export default function AiMatrixSection({ onNotify }: AiMatrixSectionProps) {
  const [weights, setWeights] = useState({
    affection: "0.9998",
    overthinking: "1.4200",
    paneer: "99.8%",
    sunshine: "100.0%",
  });
  const [isTraining, setIsTraining] = useState(false);
  const [inferenceResult, setInferenceResult] = useState<string | null>(null);

  const handleRetrain = () => {
    sound.playTerminalBlip();
    setIsTraining(true);
    setTimeout(() => {
      setWeights({
        affection: "1.0000",
        overthinking: (Math.random() * 0.4 + 1.1).toFixed(4),
        paneer: "100.0%",
        sunshine: "∞ SUNSHINE",
      });
      setIsTraining(false);
      sound.playSuccess();
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#38bdf8", "#818cf8", "#fcd34d"],
      });
      onNotify("⚡ Gradient descent converged! Loss = 0.000000. Shrey & Divija affinity locked in permanently!", "success");
    }, 700);
  };

  const handleInference = () => {
    sound.playClick();
    const prompts = [
      "OUTPUT: 'Prompt evaluated: Shrey is 100% certified sunflower, best boyfriend in Delhi-NCR, and legally obligated to give Divija 10 hugs.'",
      "OUTPUT: 'Attention matrix points directly to Shrey × Divija. Zero hallucinations found across all universe checkpoints. Confidence: 1.000.'",
      "OUTPUT: 'Loss function warning: Lack of paneer might reduce coding productivity. Deploy pizza and Diet Coke immediately.'",
      "OUTPUT: 'Psychology × MCA tensor synthesis complete: Two opposites perfectly calibrated on a shared life journey.'",
      "OUTPUT: 'Heartbeat telemetry: Synchronized. Memory leaks: 0. Eternal commitment: Active.'"
    ];
    const picked = prompts[Math.floor(Math.random() * prompts.length)];
    setInferenceResult(picked);
  };

  return (
    <section id="ai-matrix" className="w-full space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-300 text-xs font-mono tracking-wider">
          <Cpu className="w-3.5 h-3.5 text-sky-400" />
          <span>NEURAL REASONING ENGINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Interactive Model Weights for Shrey & Divija 🧠
        </h2>
        <p className="text-sm sm:text-base text-zinc-300">
          Since you spend your days engineering intelligence, here are our fine-tuned transformer weights frozen forever in GPU memory:
        </p>
      </div>

      {/* Terminal Board */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto border-sky-500/25 relative overflow-hidden font-mono shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sky-500/20 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sky-300 font-bold">MODEL: GPT-Divija-Shrey-Omni-v∞</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Activity className="w-4 h-4" />
            <span>LOSS: 0.000000 (ABSOLUTE CONVERGENCE)</span>
          </div>
        </div>

        {/* Weights Matrix Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
          <div className="p-4 rounded-2xl bg-black/40 border border-sky-500/20 text-center">
            <span className="text-[11px] text-zinc-400 block mb-1">Affection Layer</span>
            <span className="text-xl sm:text-2xl font-bold text-sky-300">{weights.affection}</span>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-sky-500/20 text-center">
            <span className="text-[11px] text-zinc-400 block mb-1">Overthinking Attention</span>
            <span className="text-xl sm:text-2xl font-bold text-purple-300">{weights.overthinking}</span>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-sky-500/20 text-center">
            <span className="text-[11px] text-zinc-400 block mb-1">Paneer Ingestion Rate</span>
            <span className="text-xl sm:text-2xl font-bold text-amber-300">{weights.paneer}</span>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-sky-500/20 text-center">
            <span className="text-[11px] text-zinc-400 block mb-1">Sunshine Emitted</span>
            <span className="text-xl sm:text-2xl font-bold text-rose-300">{weights.sunshine}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleRetrain}
            disabled={isTraining}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 disabled:opacity-50 text-white shadow-lg shadow-sky-500/30 transition-all flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTraining ? "animate-spin" : ""}`} />
            <span>{isTraining ? "Re-Training Epochs..." : "Re-Train Model Weights"}</span>
          </button>

          <button
            onClick={handleInference}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-pink-200 border border-pink-500/30 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Run Prompt Inference</span>
          </button>
        </div>

        {/* Inference output terminal window */}
        {inferenceResult && (
          <div className="mt-5 p-4 rounded-2xl bg-black/70 border border-white/10 text-xs text-pink-200/90 leading-relaxed animate-fadeIn">
            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] mb-1">
              <Terminal className="w-3 h-3" />
              <span>INFERENCE TOKENS GENERATED:</span>
            </div>
            <p className="font-mono">{inferenceResult}</p>
          </div>
        )}
      </div>
    </section>
  );
}
