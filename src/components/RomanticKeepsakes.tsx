"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY_PHOTOS } from "@/data/relationshipData";
import { MemoryPhoto } from "@/types";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { Heart, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function RomanticKeepsakes() {
  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null);
  const [lovedMap, setLovedMap] = useState<Record<string, boolean>>({});

  const handleLove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    sound.playSuccess();
    const next = { ...lovedMap, [id]: !lovedMap[id] };
    setLovedMap(next);
    try {
      localStorage.setItem("keepsakes_loved", JSON.stringify(next));
    } catch {
      // ignore
    }
    if (next[id]) {
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.7 },
        colors: ["#ff85c0", "#f43f5e", "#fcd34d"],
      });
    }
  };

  const openModal = (p: MemoryPhoto) => {
    sound.playClick();
    setActivePhoto(p);
  };

  const currentIndex = activePhoto
    ? GALLERY_PHOTOS.findIndex((p) => p.id === activePhoto.id)
    : -1;

  const prev = () => {
    if (currentIndex > 0) {
      sound.playClick();
      setActivePhoto(GALLERY_PHOTOS[currentIndex - 1]);
    }
  };

  const next = () => {
    if (currentIndex < GALLERY_PHOTOS.length - 1) {
      sound.playClick();
      setActivePhoto(GALLERY_PHOTOS[currentIndex + 1]);
    }
  };

  return (
    <section className="w-full space-y-8 py-6 relative">
      {/* Editorial Romantic Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>SCATTERED POLAROIDS & MEMORIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight">
          Unrehearsed, Cinematic & Irreplaceable 🪄
        </h2>
        <p className="text-sm sm:text-base text-pink-200/80 font-serif italic max-w-lg mx-auto">
          “In a world obsessed with curated perfection, our unfiltered laughter is my sacred treasure.”
        </p>
      </div>

      {/* Scattered Loose Polaroids Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto px-4 pt-4">
        {GALLERY_PHOTOS.map((photo, idx) => {
          const isLoved = !!lovedMap[photo.id];
          const rotations = ["rotate-[-2.5deg]", "rotate-[3deg]", "rotate-[-1.5deg]", "rotate-[2deg]", "rotate-[-3deg]", "rotate-[1.5deg]"];
          const rotClass = rotations[idx % rotations.length];

          return (
            <div
              key={photo.id}
              onClick={() => openModal(photo)}
              className={`group cursor-pointer relative bg-white/95 text-zinc-900 p-4 pb-6 rounded-2xl shadow-2xl shadow-pink-950/40 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-pink-500/30 hover:z-20 ${rotClass}`}
            >
              {/* Frosted Washi Tape Top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 backdrop-blur-md border border-white/40 rounded-sm rotate-1 shadow-sm pointer-events-none z-10" />

              {/* Photo Frame */}
              <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-black/5 shadow-inner">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Love Button floating inside */}
                <button
                  onClick={(e) => handleLove(e, photo.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                    isLoved
                      ? "bg-rose-500 text-white scale-110"
                      : "bg-black/50 text-white hover:bg-black/70 hover:scale-105"
                  }`}
                  aria-label="Love this photo"
                >
                  <Heart className={`w-4 h-4 ${isLoved ? "fill-current" : ""}`} />
                </button>

                {/* Tag pill */}
                <span className="absolute bottom-2.5 left-2.5 font-mono text-[9px] uppercase tracking-wider text-pink-200 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-pink-400/30">
                  {photo.tag}
                </span>
              </div>

              {/* Handwritten Polaroids Style Caption */}
              <div className="mt-3.5 space-y-1 text-center">
                <h3 className="font-serif font-bold text-base text-zinc-900 leading-snug">
                  {photo.title}
                </h3>
                <p className="font-serif italic text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                  “{photo.caption}”
                </p>
                <div className="pt-2 text-[10px] font-mono text-pink-700/80 uppercase tracking-widest flex items-center justify-center gap-1">
                  <span>✦</span>
                  <span>{photo.vibe}</span>
                  <span>✦</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sexy Fullscreen Cinematic Lightbox */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-gradient-to-b from-[#1c0f29] via-[#12081c] to-[#07030c] border border-pink-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Nav */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Right Nav */}
            {currentIndex < GALLERY_PHOTOS.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-4 md:right-[42%] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Large Image Pane */}
            <div className="relative w-full md:w-3/5 h-[380px] md:h-[580px] bg-black">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>

            {/* Sexy Editorial Story Sidebar */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-[#140b20] border-t md:border-t-0 md:border-l border-white/10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-mono uppercase tracking-wider border border-pink-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activePhoto.tag}</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                  {activePhoto.title}
                </h3>

                <p className="text-sm text-pink-100 font-serif italic leading-relaxed">
                  “{activePhoto.caption}”
                </p>

                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1 font-mono text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Vibe:</span>
                    <span className="text-amber-300">{activePhoto.vibe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Subject:</span>
                    <span className="text-pink-300">Laddu & Jalebi ❤️</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={(e) => handleLove(e, activePhoto.id)}
                  className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    lovedMap[activePhoto.id]
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-500/40"
                      : "bg-white/10 hover:bg-white/15 text-white"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      lovedMap[activePhoto.id] ? "fill-current" : ""
                    }`}
                  />
                  <span>
                    {lovedMap[activePhoto.id] ? "Treasured Forever ❤️" : "Heart this memory"}
                  </span>
                </button>

                <span className="text-[11px] font-mono text-zinc-500">
                  {currentIndex + 1} of {GALLERY_PHOTOS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
