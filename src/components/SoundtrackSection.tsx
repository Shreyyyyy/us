"use client";

import React from "react";
import { SOUNDTRACK } from "@/data/relationshipData";
import { SongTrack } from "@/types";
import { Play, ExternalLink, Headphones, Disc3 } from "lucide-react";
import { sound } from "@/lib/sound";

interface SoundtrackSectionProps {
  onPlayTrack: (track: SongTrack) => void;
  activeTrackId: string | null;
}

export default function SoundtrackSection({ onPlayTrack, activeTrackId }: SoundtrackSectionProps) {
  const handlePlay = (track: SongTrack) => {
    sound.playClick();
    onPlayTrack(track);
  };

  return (
    <section id="music" className="w-full space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mono tracking-wider">
          <Headphones className="w-3.5 h-3.5 text-purple-400" />
          <span>OUR SACRED SOUNDTRACK</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Songs That Feel Like You & Me 🎧
        </h2>
        <p className="text-sm sm:text-base text-zinc-300">
          From quiet unspoken glances to 2 AM chaotic room dances. Tap any track to stream instantly in our private theater:
        </p>
      </div>

      {/* Grid of tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {SOUNDTRACK.map((track) => {
          const isPlaying = activeTrackId === track.id;
          return (
            <div
              key={track.id}
              className={`glass-card rounded-3xl p-6 flex flex-col justify-between border relative overflow-hidden transition-all duration-300 group ${
                isPlaying
                  ? "border-pink-400/60 shadow-xl shadow-pink-500/20 bg-pink-950/20"
                  : "border-white/10 hover:border-pink-500/30"
              }`}
            >
              {/* Gradient accent top glow */}
              <div
                className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${track.accent} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform`}
              />

              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-pink-300 bg-pink-950/70 px-2.5 py-1 rounded-full border border-pink-500/20">
                    {track.tag}
                  </span>
                  {isPlaying ? (
                    <span className="flex items-center gap-1 text-[10px] text-pink-400 font-mono">
                      <Disc3 className="w-3.5 h-3.5 animate-spin" /> Playing
                    </span>
                  ) : (
                    <Headphones className="w-4 h-4 text-zinc-500 group-hover:text-pink-400 transition-colors" />
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-pink-200 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{track.artist}</p>
                </div>

                <p className="text-xs text-zinc-300 italic font-serif leading-relaxed pt-1 border-t border-white/5">
                  “{track.annotation}”
                </p>
              </div>

              {/* Actions */}
              <div className="pt-5 mt-3 border-t border-white/10 flex items-center justify-between gap-2 relative z-10">
                <button
                  onClick={() => handlePlay(track)}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg shadow-pink-500/25 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Stream Now</span>
                </button>

                <a
                  href={`https://www.youtube.com/watch?v=${track.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-300/20 transition-all"
                  title="Open in YouTube"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
