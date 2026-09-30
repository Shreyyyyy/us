"use client";

import React, { useState, useEffect } from "react";
import { UserRole } from "@/types";
import { Volume2, VolumeX, Sparkles, Heart, Zap, Infinity, Lock } from "lucide-react";
import { sound } from "@/lib/sound";

interface HeaderNavProps {
  role: UserRole;
  onRoleChange: (newRole: UserRole) => void;
  onTriggerSpell: (text: string) => void;
  onReverify?: () => void;
}

export default function HeaderNav({ role, onRoleChange, onTriggerSpell, onReverify }: HeaderNavProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.enabled = nextState;
    if (nextState) {
      sound.playClick();
    }
  };

  const handleRoleSelect = (newRole: UserRole) => {
    sound.playClick();
    onRoleChange(newRole);
    if (newRole === "gf") {
      onTriggerSpell("🌸 Switched to Chintu Mode: Psychology, care & heartfelt questions loaded.");
    } else if (newRole === "bf") {
      onTriggerSpell("⚡ Switched to Shrey Mode: AI tensors, code audits & boyfriend diagnostics online.");
    } else {
      onTriggerSpell("✨ Celestial Dual Mode: Both frequencies synced in harmony.");
    }
  };

  const scrollTo = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-4 z-40 w-full px-4 max-w-6xl mx-auto">
      <div
        className={`w-full rounded-2xl md:rounded-full transition-all duration-300 border ${
          scrolled
            ? "bg-[#11091e]/85 backdrop-blur-2xl border-white/15 shadow-2xl py-2 px-4"
            : "bg-[#140b22]/70 backdrop-blur-xl border-white/10 shadow-lg py-2.5 px-5"
        } flex flex-col md:flex-row items-center justify-between gap-3`}
      >
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-300 flex items-center justify-center shadow-md shadow-pink-500/30">
            <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm tracking-tight text-white flex items-center gap-1">
              Shrey <span className="text-pink-400 font-sans text-xs">×</span> Chintu
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-pink-300/70">
              {role === "gf" ? "Chintu OS 2.0" : role === "bf" ? "Boyfriend OS 2.0" : "Synchronized OS"}
            </span>
          </div>
        </div>

        {/* Dynamic Dual Role Switcher */}
        <div className="flex items-center p-1 rounded-full bg-black/40 border border-white/10 shadow-inner">
          <button
            onClick={() => handleRoleSelect("gf")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              role === "gf"
                ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg shadow-pink-500/40 scale-105"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Chintu (GF)</span>
          </button>

          <button
            onClick={() => handleRoleSelect("bf")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              role === "bf"
                ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/40 scale-105"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Shrey (BF)</span>
          </button>

          <button
            onClick={() => handleRoleSelect("together")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              role === "together"
                ? "bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-lg shadow-amber-400/40 scale-105"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Infinity className="w-3.5 h-3.5" />
            <span>Together</span>
          </button>
        </div>

        {/* Quick Nav Anchors & Sound */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
          <button
            onClick={() => scrollTo("questions")}
            className="px-2.5 py-1 text-xs text-zinc-300 hover:text-pink-300 font-medium rounded-lg hover:bg-white/5 transition-colors"
          >
            Questions
          </button>
          <button
            onClick={() => scrollTo("lore")}
            className="px-2.5 py-1 text-xs text-zinc-300 hover:text-pink-300 font-medium rounded-lg hover:bg-white/5 transition-colors"
          >
            Our Lore & Photos 💫
          </button>
          <button
            onClick={() => scrollTo("music")}
            className="px-2.5 py-1 text-xs text-zinc-300 hover:text-pink-300 font-medium rounded-lg hover:bg-white/5 transition-colors"
          >
            Soundtrack
          </button>
          <button
            onClick={() => scrollTo("letters")}
            className="px-2.5 py-1 text-xs text-zinc-300 hover:text-pink-300 font-medium rounded-lg hover:bg-white/5 transition-colors"
          >
            Letters
          </button>
          <button
            onClick={() => scrollTo("terminal")}
            className="px-2.5 py-1 text-xs text-zinc-300 hover:text-pink-300 font-medium rounded-lg hover:bg-white/5 transition-colors"
          >
            CLI
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute interactive audio effects" : "Enable interactive audio effects"}
            className="ml-1 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition-colors"
            aria-label="Sound Toggle"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-pink-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
            )}
          </button>

          {/* Re-verify identity gate button */}
          {onReverify && (
            <button
              onClick={() => {
                sound.playClick();
                onReverify();
              }}
              title="Proof of Identity Security Gate"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-300/30 transition-colors"
              aria-label="Switch or Reverify"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
