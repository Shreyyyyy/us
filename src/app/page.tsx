"use client";

import React, { useState, useEffect } from "react";
import { UserRole, SongTrack } from "@/types";
import BackgroundStars from "@/components/BackgroundStars";
import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection";
import GfQuestionHub from "@/components/GfQuestionHub";
import BfQuestionHub from "@/components/BfQuestionHub";
import SharedVault from "@/components/SharedVault";
import PhotoGallery from "@/components/PhotoGallery";
import SoundtrackSection from "@/components/SoundtrackSection";
import AiMatrixSection from "@/components/AiMatrixSection";
import LoreTimeline from "@/components/LoreTimeline";
import OpenWhenVault from "@/components/OpenWhenVault";
import CareChecklist from "@/components/CareChecklist";
import TerminalCLI from "@/components/TerminalCLI";
import FutureRoadmap from "@/components/FutureRoadmap";
import ForbiddenProtocol from "@/components/ForbiddenProtocol";
import AudioModal from "@/components/AudioModal";
import Toast from "@/components/Toast";
import { Heart, Sparkles, Wand2 } from "lucide-react";
import { sound } from "@/lib/sound";

export default function Home() {
  const [role, setRole] = useState<UserRole>("gf");
  const [mounted, setMounted] = useState(false);
  const [activeTrack, setActiveTrack] = useState<SongTrack | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"spell" | "reminder" | "success" | "info">("spell");

  useEffect(() => {
    setMounted(true);
    try {
      const savedRole = localStorage.getItem("relationship_role") as UserRole;
      if (savedRole && (savedRole === "gf" || savedRole === "bf" || savedRole === "together")) {
        setRole(savedRole);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    try {
      localStorage.setItem("relationship_role", newRole);
    } catch {
      // ignore
    }
  };

  const showNotification = (
    msg: string,
    type: "spell" | "reminder" | "success" | "info" = "spell"
  ) => {
    setToastMessage(msg);
    setToastType(type);
    clearTimeout((window as unknown as { toastTimeout?: number }).toastTimeout);
    (window as unknown as { toastTimeout?: number }).toastTimeout = window.setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleRandomReminder = () => {
    const reminders = [
      "In case your neural networks are stuck debugging: your girlfriend loves you immensely.",
      "You are my sunshine, my laddoo, my bhalu. Never forget that.",
      "Travelling miles on the metro just to sit together for an hour—that memory lives in my heart forever.",
      "Kanha ji is always protecting us. You are never alone in any battle.",
      "Divija protocol: Go drink a glass of water, relax your jaw, and stretch your neck, AI genius."
    ];
    const picked = reminders[Math.floor(Math.random() * reminders.length)];
    showNotification(picked, "reminder");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#07050d] text-white flex items-center justify-center font-serif text-xl">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-pink-400 animate-spin" />
          <span>Calibrating Shrey × Divija Universe...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen selection:bg-pink-500/30 selection:text-pink-100">
      {/* Background Animated Stardust */}
      <BackgroundStars />

      {/* Sticky Header with Role Switcher & Audio FX */}
      <HeaderNav
        role={role}
        onRoleChange={handleRoleChange}
        onTriggerSpell={(msg) => showNotification(msg, "spell")}
      />

      <div className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto space-y-16 pb-24">
        {/* Hero Section */}
        <HeroSection
          role={role}
          onCastSpell={(msg) => showNotification(msg, "spell")}
          onReminder={handleRandomReminder}
        />

        {/* Dynamic Question Hub Anchor */}
        <section id="questions" className="scroll-mt-24">
          {role === "gf" && <GfQuestionHub onNotify={showNotification} />}
          {role === "bf" && <BfQuestionHub onNotify={showNotification} />}
          {role === "together" && (
            <div className="space-y-12">
              <SharedVault onNotify={showNotification} />
              <div className="pt-6 border-t border-white/10 space-y-12">
                <GfQuestionHub onNotify={showNotification} />
                <BfQuestionHub onNotify={showNotification} />
              </div>
            </div>
          )}
        </section>

        {/* Shared Vault Telemetry if in GF or BF mode */}
        {role !== "together" && (
          <section className="pt-4">
            <SharedVault onNotify={showNotification} />
          </section>
        )}

        {/* Visual Chronicles & Candids Photo Gallery */}
        <PhotoGallery />

        {/* AI Neural Weights Section */}
        <AiMatrixSection onNotify={showNotification} />

        {/* Soundtrack Section */}
        <SoundtrackSection
          onPlayTrack={(track) => setActiveTrack(track)}
          activeTrackId={activeTrack?.id || null}
        />

        {/* Lore & Timeline */}
        <LoreTimeline />

        {/* Open When Letters */}
        <OpenWhenVault />

        {/* Daily Maintenance Checklist */}
        <CareChecklist onNotify={showNotification} />

        {/* Interactive CLI Terminal */}
        <TerminalCLI />

        {/* Future Roadmaps */}
        <FutureRoadmap />

        {/* Forbidden Protocol Button */}
        <ForbiddenProtocol />

        {/* Footer */}
        <footer className="text-center pt-12 pb-6 border-t border-white/10 text-xs text-zinc-400 space-y-2 font-sans">
          <div className="flex items-center justify-center gap-1.5 text-pink-400 text-sm">
            <Heart className="w-4 h-4 fill-current" />
            <span className="font-serif">Engineered with endless devotion for Shrey & Divija</span>
          </div>
          <p className="text-[11px] text-zinc-500 font-mono">
            Model weights frozen forever. Zero updates, zero rollbacks. Kanha ji protected 🦚🔒
          </p>
        </footer>
      </div>

      {/* Embedded YouTube Audio/Video Modal */}
      <AudioModal track={activeTrack} onClose={() => setActiveTrack(null)} />

      {/* Floating Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />
    </main>
  );
}
