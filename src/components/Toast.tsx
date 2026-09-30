"use client";

import React from "react";
import { Sparkles, X } from "lucide-react";

interface ToastProps {
  message: string | null;
  type?: "spell" | "reminder" | "success" | "info";
  onClose: () => void;
}

export default function Toast({ message, type = "spell", onClose }: ToastProps) {
  if (!message) return null;

  const typeConfig = {
    spell: {
      border: "border-pink-500/40",
      bg: "bg-[#180e22]/95",
      badge: "🪄 SPELL ACTIVATED",
      badgeColor: "text-pink-300",
    },
    reminder: {
      border: "border-amber-400/40",
      bg: "bg-[#1c140e]/95",
      badge: "💌 GIRLFRIEND PING",
      badgeColor: "text-amber-300",
    },
    success: {
      border: "border-emerald-500/40",
      bg: "bg-[#0b1c14]/95",
      badge: "✓ SYSTEM SUCCESS",
      badgeColor: "text-emerald-300",
    },
    info: {
      border: "border-sky-500/40",
      bg: "bg-[#0c1626]/95",
      badge: "✦ NEURAL NOTIFICATION",
      badgeColor: "text-sky-300",
    },
  }[type];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-short">
      <div
        className={`${typeConfig.bg} ${typeConfig.border} border rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex items-start gap-3`}
      >
        <div className="p-2 rounded-xl bg-white/5 shrink-0 text-pink-300">
          <Sparkles className="w-5 h-5 animate-spin-slow" />
        </div>
        <div className="flex-1 text-sm">
          <div className={`font-mono text-xs font-bold tracking-wider mb-1 ${typeConfig.badgeColor}`}>
            {typeConfig.badge}
          </div>
          <p className="text-zinc-200 leading-snug">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white transition-colors p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
