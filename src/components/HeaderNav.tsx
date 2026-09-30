"use client";

import React, { useState, useEffect } from "react";
import { UserRole } from "@/types";
import { Volume2, VolumeX, Sparkles, Heart, Zap, Infinity, Lock, Menu, X, FileText, Music, BookOpen, Terminal, CheckCircle2 } from "lucide-react";
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
      setScrolled(window.scrollY > 20);
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
    <header className="sticky top-2 sm:top-4 z-40 w-full px-2 sm:px-4 max-w-6xl mx-auto">
      <div
        className={`w-full rounded-2xl sm:rounded-full transition-all duration-300 border ${
          scrolled
            ? "bg-[#11091e]/95 backdrop-blur-2xl border-white/20 shadow-2xl py-2 px-3 sm:px-5"
            : "bg-[#140b22]/85 backdrop-blur-xl border-white/10 shadow-lg py-2 sm:py-2.5 px-3 sm:px-5"
        }`}
      >
        {/* Main Bar Row (Guaranteed single row on all screen sizes) */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-4">
          {/* Logo / Brand */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-pink-500 via-amber-400 to-sky-400 flex items-center justify-center shadow-md shadow-pink-500/25 shrink-0">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-spin-slow" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif font-bold text-xs sm:text-sm tracking-tight text-white flex items-center gap-1">
                Laddu <span className="text-pink-400 font-sans text-[10px]">×</span> Jalebi
              </span>
              <span className="font-mono text-[8px] uppercase tracking-wider text-pink-300/80 hidden xs:inline">
                {role === "gf" ? "Jalebi OS" : role === "bf" ? "Laddu OS" : "Celestial OS"}
              </span>
            </div>
          </div>

          {/* Compact Role Switcher Pill */}
          <div className="flex items-center p-0.5 rounded-full bg-black/60 border border-white/10 shadow-inner shrink-0">
            <button
              onClick={() => handleRoleSelect("gf")}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 ${
                role === "gf"
                  ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-500/40 scale-105"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Heart className="w-3 h-3 fill-current shrink-0" />
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
              <Zap className="w-3 h-3 fill-current shrink-0" />
              <span>Laddu</span>
            </button>

            <button
              onClick={() => handleRoleSelect("together")}
              className={`hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
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
              onClick={() => scrollTo("contract")}
              className="px-2.5 py-1 text-xs text-amber-300 hover:text-amber-200 font-semibold rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all flex items-center gap-1"
            >
              <span>Affidavit 📜</span>
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

          {/* Action Icons */}
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

            {/* Re-verify Lock Gate (Desktop only, also in mobile drawer) */}
            {onReverify && (
              <button
                onClick={() => {
                  sound.playClick();
                  onReverify();
                }}
                title="Lock & Re-verify Identity"
                className="hidden sm:flex p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-300/30 transition-colors"
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
              className="lg:hidden p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/15 text-pink-300 border border-pink-500/30 transition-all active:scale-95"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5 text-white" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-3 mt-2.5 border-t border-white/10 space-y-2.5 animate-fadeIn">
            {/* Quick Mode Switcher Row */}
            <div className="flex items-center justify-between p-1.5 rounded-xl bg-black/40 border border-white/10 text-xs">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider pl-2">
                Active View:
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleRoleSelect("gf")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    role === "gf" ? "bg-pink-500 text-white shadow" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  🌸 Jalebi
                </button>
                <button
                  onClick={() => handleRoleSelect("bf")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    role === "bf" ? "bg-sky-500 text-white shadow" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  ⚡ Laddu
                </button>
                <button
                  onClick={() => handleRoleSelect("together")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    role === "together" ? "bg-amber-500 text-white shadow" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  ✨ Dual
                </button>
              </div>
            </div>

            {/* Navigation Grid Buttons */}
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <button
                onClick={() => scrollTo("questions")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-200 hover:text-pink-300 transition-all flex items-center gap-2 text-left"
              >
                <Heart className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span>MCQ Questions</span>
              </button>
              <button
                onClick={() => scrollTo("contract")}
                className="p-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-200 transition-all flex items-center gap-2 text-left font-semibold"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Affidavit 📜</span>
              </button>
              <button
                onClick={() => scrollTo("lore")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-200 hover:text-pink-300 transition-all flex items-center gap-2 text-left"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Our Lore 💫</span>
              </button>
              <button
                onClick={() => scrollTo("music")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-200 hover:text-pink-300 transition-all flex items-center gap-2 text-left"
              >
                <Music className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Soundtrack</span>
              </button>
              <button
                onClick={() => scrollTo("letters")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-200 hover:text-pink-300 transition-all flex items-center gap-2 text-left"
              >
                <BookOpen className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                <span>Letters 💌</span>
              </button>
              <button
                onClick={() => scrollTo("terminal")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-200 hover:text-pink-300 transition-all flex items-center gap-2 text-left"
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>CLI Terminal</span>
              </button>
            </div>

            {/* Lock / Re-verify button on mobile */}
            {onReverify && (
              <button
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  onReverify();
                }}
                className="w-full py-2 px-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Gate &amp; Re-verify Identity</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
