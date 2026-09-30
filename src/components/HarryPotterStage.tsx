"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/sound";
import { UserRole } from "@/types";
import { Wand2, Sparkles, Heart } from "lucide-react";

interface HarryPotterStageProps {
  role: UserRole;
  onCastSpell: (msg: string) => void;
}

export default function HarryPotterStage({ role, onCastSpell }: HarryPotterStageProps) {
  const [bubbleText, setBubbleText] = useState(
    role === "gf"
      ? "“Accio hugs & 100% undivided Shrey attention! 🪄”"
      : "“Accio Paneer, Diet Coke & Divija's laughter! 🧀”"
  );
  const [sparkleActive, setSparkleActive] = useState<"shrey" | "divija" | null>(null);

  const castShreySpell = () => {
    sound.playWandSpell();
    setSparkleActive("shrey");
    setTimeout(() => setSparkleActive(null), 1200);

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6, x: 0.45 },
      colors: ["#7dd3fc", "#38bdf8", "#fcd34d", "#ffffff"],
    });

    const msgs = [
      "⚡ Lumos Maxima! Divija's smile illuminating all neural networks at 100% ✨",
      "⚡ Expecto Patronum! Silver stag deployed to guard Divija against overthinking 🦌",
      "⚡ Accio Paneer! Fueling Shrey for the next 14 hours of coding 🧀",
      "⚡ Alohomora! Unlocking 100% access to Shrey's heart permanently 💖",
    ];
    const picked = msgs[Math.floor(Math.random() * msgs.length)];
    setBubbleText("“Lumos! Love weights locked forever!”");
    onCastSpell(picked);
  };

  const castDivijaSpell = () => {
    sound.playWandSpell();
    setSparkleActive("divija");
    setTimeout(() => setSparkleActive(null), 1200);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6, x: 0.55 },
      colors: ["#ff85c0", "#f43f5e", "#fcd34d", "#fbcfe8"],
    });

    const msgs = [
      "🌸 Amortentia! Overwhelming love potion deployed across all NCR metro lines 💖",
      "🌸 Wingardium Leviosa! Lifting all of Shrey's stress straight into the sky 🪶",
      "🌸 Riddikulus! Turning all complex bugs & sprint deadlines into funny cartoons 🤡",
      "🌸 Obliviate! Wiping out all self-doubt from my brilliant engineer's mind 🪄",
    ];
    const picked = msgs[Math.floor(Math.random() * msgs.length)];
    setBubbleText("“Amortentia! You're stuck with your Jalebi forever!”");
    onCastSpell(picked);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-4 sm:my-8 rounded-3xl p-4 sm:p-6 md:p-10 overflow-hidden border border-amber-300/30 bg-gradient-to-b from-[#18112b] via-[#100a1c] to-[#07050d] shadow-2xl shadow-purple-950/50">
      {/* Background glow & silhouettes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-0 right-0 h-28 bg-gradient-to-t from-[#06040a] to-transparent pointer-events-none z-10" />

      {/* Floating Dynamic Speech Bubble */}
      <div className="relative z-20 flex justify-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/95 text-[#240e1f] font-medium text-xs sm:text-sm shadow-xl shadow-black/40 border border-pink-200 animate-float max-w-[92vw]">
          <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
          <span className="truncate">{bubbleText}</span>
        </div>
      </div>

      {/* Caricatures Stage */}
      <div className="relative z-10 flex items-end justify-center gap-3 sm:gap-16 min-h-[210px] sm:min-h-[260px] pb-3 sm:pb-4">
        {/* SHREY CARICATURE */}
        <div
          onClick={castShreySpell}
          className="group cursor-pointer flex flex-col items-center transition-transform hover:scale-105"
          title="Click Shrey's wand to cast an engineer spell!"
        >
          <div className="relative">
            {sparkleActive === "shrey" && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-sky-300 font-bold bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-400/50">
                CASTING SPELL!
              </span>
            )}
            <svg viewBox="0 0 170 250" className="w-[125px] sm:w-[150px] h-[185px] sm:h-[230px] drop-shadow-lg">
              {/* Floor Shadow */}
              <ellipse cx="85" cy="235" rx="55" ry="12" fill="rgba(125,211,252,0.22)" />
              {/* Robe */}
              <path d="M45,130 L125,130 L145,230 L25,230 Z" fill="#14111f" stroke="#2c2440" strokeWidth="2" />
              {/* Scarf & Gryffindor Burgundy */}
              <path d="M75,130 L95,130 L105,230 L65,230 Z" fill="#69121a" />
              <path d="M82,130 L88,130 L92,230 L78,230 Z" fill="#fcd34d" />
              <rect x="58" y="115" width="54" height="18" rx="8" fill="#7a1420" />
              <rect x="68" y="115" width="10" height="18" fill="#fcd34d" />
              <rect x="90" y="115" width="10" height="18" fill="#fcd34d" />
              <path d="M88,130 L88,175 L104,175 L104,130 Z" fill="#7a1420" />
              <rect x="88" y="145" width="16" height="8" fill="#fcd34d" />
              {/* Head & Skin */}
              <ellipse cx="85" cy="85" rx="36" ry="38" fill="#f6c29b" />
              {/* Messy Boy Hair */}
              <path
                d="M46,80 C44,45 68,30 85,30 C105,30 126,45 124,80 C118,65 110,60 100,62 C90,64 82,55 70,62 C58,68 50,72 46,80 Z"
                fill="#241a24"
              />
              {/* Black Spectacles */}
              <circle cx="72" cy="86" r="14" fill="none" stroke="#0a0a0c" strokeWidth="3.5" />
              <circle cx="98" cy="86" r="14" fill="none" stroke="#0a0a0c" strokeWidth="3.5" />
              <line x1="86" y1="86" x2="84" y2="86" stroke="#0a0a0c" strokeWidth="3" />
              {/* Eyes */}
              <circle cx="72" cy="86" r="4" fill="#201a18" />
              <circle cx="98" cy="86" r="4" fill="#201a18" />
              <circle cx="74" cy="84" r="1.5" fill="#fff" />
              <circle cx="100" cy="84" r="1.5" fill="#fff" />
              {/* Warm Smile */}
              <path d="M78,103 Q85,110 92,103" fill="none" stroke="#94453b" strokeWidth="2.5" strokeLinecap="round" />
              {/* Magic Wand */}
              <line x1="125" y1="170" x2="162" y2="135" stroke="#925227" strokeWidth="4" strokeLinecap="round" />
              <polygon
                points="163,130 167,137 172,133 166,128"
                fill="#fef08a"
                className="animate-pulse"
              />
            </svg>
          </div>
          <div className="mt-2 text-center">
            <span className="font-serif font-bold text-sm text-sky-200 block">Shrey (Laddu)</span>
            <span className="font-mono text-[10px] text-sky-400/80 bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-500/20">
              AI Wizard 🪄
            </span>
          </div>
        </div>

        {/* DIVIJA CARICATURE */}
        <div
          onClick={castDivijaSpell}
          className="group cursor-pointer flex flex-col items-center transition-transform hover:scale-105"
          title="Click Divija's wand to cast a love potion spell!"
        >
          <div className="relative">
            {sparkleActive === "divija" && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-pink-300 font-bold bg-pink-950/80 px-2 py-0.5 rounded-full border border-pink-400/50">
                SPELL CAST!
              </span>
            )}
            <svg viewBox="0 0 170 250" className="w-[125px] sm:w-[150px] h-[185px] sm:h-[230px] drop-shadow-lg">
              {/* Floor Shadow */}
              <ellipse cx="85" cy="235" rx="55" ry="12" fill="rgba(255,133,192,0.25)" />
              {/* Long Romantic Hair back layer */}
              <path d="M42,85 C32,130 35,190 52,210 C56,180 50,140 55,110 Z" fill="#2e171b" />
              <path d="M128,85 C138,130 135,190 118,210 C114,180 120,140 115,110 Z" fill="#2e171b" />
              {/* Wizard Robe / Dress */}
              <path d="M50,132 L120,132 L138,230 L32,230 Z" fill="#2b172a" stroke="#462444" strokeWidth="2" />
              <path d="M75,132 L95,132 L102,230 L68,230 Z" fill="#ff85c0" opacity="0.8" />
              {/* Cute Scarf */}
              <rect x="58" y="116" width="54" height="18" rx="8" fill="#ff85c0" />
              <rect x="68" y="116" width="10" height="18" fill="#fff" />
              <rect x="90" y="116" width="10" height="18" fill="#fff" />
              {/* Head & Soft Blush Cheeks */}
              <ellipse cx="85" cy="85" rx="34" ry="36" fill="#fbd2b2" />
              <circle cx="68" cy="94" r="6" fill="rgba(255,105,180,0.4)" />
              <circle cx="102" cy="94" r="6" fill="rgba(255,105,180,0.4)" />
              {/* Front Wavy Hair */}
              <path
                d="M50,75 C52,42 70,30 85,30 C105,30 120,42 120,75 C112,58 98,62 85,62 C70,62 58,58 50,75 Z"
                fill="#2e171b"
              />
              {/* Eyes */}
              <ellipse cx="73" cy="85" rx="4.5" ry="6" fill="#261814" />
              <ellipse cx="97" cy="85" rx="4.5" ry="6" fill="#261814" />
              <circle cx="75" cy="83" r="2" fill="#fff" />
              <circle cx="99" cy="83" r="2" fill="#fff" />
              {/* Smile */}
              <path d="M79,101 Q85,108 91,101" fill="none" stroke="#b04256" strokeWidth="2.5" strokeLinecap="round" />
              {/* Magic Wand */}
              <line x1="45" y1="170" x2="8" y2="140" stroke="#a36336" strokeWidth="3.5" strokeLinecap="round" />
              <polygon
                points="6,136 10,143 15,138 9,133"
                fill="#ff85c0"
                className="animate-pulse"
              />
            </svg>
          </div>
          <div className="mt-2 text-center">
            <span className="font-serif font-bold text-sm text-pink-200 block">Divija (Jalebi)</span>
            <span className="font-mono text-[10px] text-pink-400/80 bg-pink-950/60 px-2 py-0.5 rounded-full border border-pink-500/20">
              Psych Queen 🌸
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Helper Hint */}
      <div className="relative z-10 flex items-center justify-center gap-2 mt-4 text-center">
        <span className="font-mono text-[11px] uppercase tracking-wider text-amber-300/80 bg-black/40 px-4 py-1.5 rounded-full border border-amber-300/20 inline-flex items-center gap-1.5">
          <Wand2 className="w-3.5 h-3.5 text-amber-300" />
          Click on our wands to cast love spells & confetti!
        </span>
      </div>
    </div>
  );
}
