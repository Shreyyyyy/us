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
      badge: "🪄 LOVE SPELL",
      badgeColor: "text-pink-300",
    },
    reminder: {
      border: "border-amber-400/40",
      bg: "bg-[#1c140e]/95",
      badge: "💌 SWEET REMINDER",
      badgeColor: "text-amber-300",
    },
    success: {
      border: "border-emerald-500/40",
      bg: "bg-[#0b1c14]/95",
      badge: "✓ VERIFIED",
      badgeColor: "text-emerald-300",
    },
    info: {
      border: "border-sky-500/40",
      bg: "bg-[#0c1626]/95",
      badge: "✦ NOTIFICATION",
      badgeColor: "text-sky-300",
    },
  }[type];

  return (
    <div className="fixed top-4 inset-x-4 sm:top-auto sm:bottom-6 sm:right-6 sm:left-auto sm:max-w-sm z-50 pointer-events-none animate-fadeIn">
      <div
        className={`${typeConfig.bg} ${typeConfig.border} border rounded-2xl p-3.5 sm:p-4 shadow-2xl backdrop-blur-2xl flex items-start gap-3 pointer-events-auto`}
      >
        <div className="p-2 rounded-xl bg-white/5 shrink-0 text-pink-300">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 animate-spin-slow" />
        </div>
        <div className="flex-1 text-xs sm:text-sm min-w-0">
          <div className={`font-mono text-[10px] sm:text-xs font-bold tracking-wider mb-0.5 ${typeConfig.badgeColor}`}>
            {typeConfig.badge}
          </div>
          <p className="text-zinc-200 leading-snug break-words">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white transition-colors p-1 shrink-0"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
