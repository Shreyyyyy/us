"use client";

import React, { useEffect } from "react";
import { X, Disc3 } from "lucide-react";
import { SongTrack } from "@/types";

interface AudioModalProps {
  track: SongTrack | null;
  onClose: () => void;
}

export default function AudioModal({ track, onClose }: AudioModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (track) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [track, onClose]);

  if (!track) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#191024] to-[#0c0915] border border-pink-500/25 rounded-3xl p-6 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
              <Disc3 className="w-5 h-5 animate-spin" />
            </span>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-pink-400 font-semibold">
                Now Streaming
              </span>
              <h3 className="text-xl font-serif font-bold text-white leading-tight">
                {track.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-inner my-3">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${track.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={track.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Annotation & Action */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
          <div>
            <p className="text-xs text-pink-200/80 italic font-serif">
              “{track.annotation}”
            </p>
            <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
              Artist: {track.artist}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
