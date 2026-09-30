"use client";

import React, { useState, useEffect } from "react";
import { UserRole } from "@/types";
import { Volume2, VolumeX, Sparkles, Heart, Zap, Infinity, Lock, Menu, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
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
      onTriggerSpell("🌸 Switched to Jalebi Mode: Psychology, care & heartfelt questions loaded.");
    } else if (newRole === "bf") {
      onTriggerSpell("⚡ Switched to Laddu Mode: AI tensors, code audits & boyfriend diagnostics online.");
    } else {
      onTriggerSpell("✨ Celestial Dual Mode: Both frequencies synced in harmony.");
    }
  };

  const scrollTo = (id: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-2 sm:top-4 z-40 w-full px-3 sm:px-4 max-w-6xl mx-auto">
      <div
        className={`w-full rounded-2xl sm:rounded-full transition-all duration-300 border ${
          scrolled
            ? "bg-[#11091e]/90 backdrop-blur-2xl border-white/20 shadow-2xl py-2 px-3 sm:px-5"
            : "bg-[#140b22]/75 backdrop-blur-xl border-white/10 shadow-lg py-2.5 px-3 sm:px-5"
        }`}
      >
        {/* Main Bar Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-pink-500 via-amber-400 to-sky-400 flex items-center justify-center shadow-md shadow-pink-500/25">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-spin-slow" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xs sm:text-sm tracking-tight text-white flex items-center gap-1">
                Laddu <span className="text-pink-400 font-sans text-[10px]">×</span> Jalebi
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-pink-300/70">
                {role === "gf" ? "Jalebi OS" : role === "bf" ? "Laddu OS" : "Celestial OS"}
              </span>
            </div>
          </div>

          {/* Compact Role Switcher Pill */}
          <div className="flex items-center p-0.5 sm:p-1 rounded-full bg-black/40 border border-white/10 shadow-inner">
            <button
              onClick={() => handleRoleSelect("gf")}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 ${
                role === "gf"
                  ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-500/40 scale-105"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>Jalebi</span>
            </button>

            <button
              onClick={() => handleRoleSelect("bf")}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 ${
                role === "bf"
                  ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md shadow-sky-500/40 scale-105"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Zap className="w-3 h-3 fill-current" />
              <span>Laddu</span>
            </button>

            <button
              onClick={() => handleRoleSelect("together")}
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                role === "together"
                  ? "bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-md shadow-amber-400/40 scale-105"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Infinity className="w-3 h-3" />
              <span>Together</span>
            </button>
          </div>

          {/* Desktop Anchor Links */}
          <div className="hidden lg:flex items-center gap-1">
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
              Our Lore 💫
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
          </div>

          {/* Quick Action Icons */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? "Mute sounds" : "Enable sounds"}
              className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition-colors"
              aria-label="Sound Toggle"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-pink-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
              )}
            </button>

            {/* Re-verify Lock */}
            {onReverify && (
              <button
                onClick={() => {
                  sound.playClick();
                  onReverify();
                }}
                title="Proof of Identity Gate"
                className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-300/30 transition-colors"
                aria-label="Re-verify identity"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-3 mt-2 border-t border-white/10 flex flex-wrap items-center justify-around gap-2 text-xs font-medium animate-fadeIn">
            <button
              onClick={() => scrollTo("questions")}
              className="px-3 py-1.5 rounded-xl bg-white/5 text-zinc-200 hover:text-pink-300 hover:bg-white/10 transition-colors"
            >
              Questions
            </button>
            <button
              onClick={() => scrollTo("lore")}
              className="px-3 py-1.5 rounded-xl bg-white/5 text-zinc-200 hover:text-pink-300 hover:bg-white/10 transition-colors"
            >
              Our Lore 💫
            </button>
            <button
              onClick={() => scrollTo("music")}
              className="px-3 py-1.5 rounded-xl bg-white/5 text-zinc-200 hover:text-pink-300 hover:bg-white/10 transition-colors"
            >
              Soundtrack
            </button>
            <button
              onClick={() => scrollTo("letters")}
              className="px-3 py-1.5 rounded-xl bg-white/5 text-zinc-200 hover:text-pink-300 hover:bg-white/10 transition-colors"
            >
              Letters
            </button>
            <button
              onClick={() => scrollTo("terminal")}
              className="px-3 py-1.5 rounded-xl bg-white/5 text-zinc-200 hover:text-pink-300 hover:bg-white/10 transition-colors"
            >
              CLI
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
