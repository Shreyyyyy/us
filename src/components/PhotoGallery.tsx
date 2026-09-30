"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GALLERY_PHOTOS } from "@/data/relationshipData";
import { MemoryPhoto } from "@/types";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import {
  Camera,
  Heart,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

export default function PhotoGallery() {
  const [filter, setFilter] = useState<"all" | "romantic" | "chaos" | "dates">("all");
  const [lightboxPhoto, setLightboxPhoto] = useState<MemoryPhoto | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem("relationship_liked_photos");
      if (stored) setLikedPhotos(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const handleLike = (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    sound.playSuccess();
    const updated = { ...likedPhotos, [photoId]: !likedPhotos[photoId] };
    setLikedPhotos(updated);
    try {
      localStorage.setItem("relationship_liked_photos", JSON.stringify(updated));
    } catch {
      // ignore
    }
    if (updated[photoId]) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#ff85c0", "#f43f5e", "#fcd34d"],
      });
    }
  };

  const openLightbox = (photo: MemoryPhoto) => {
    sound.playClick();
    setLightboxPhoto(photo);
  };

  const closeLightbox = () => {
    sound.playClick();
    setLightboxPhoto(null);
  };

  const filteredPhotos =
    filter === "all"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === filter);

  const currentIndex = lightboxPhoto
    ? filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id)
    : -1;

  const prevPhoto = () => {
    if (currentIndex > 0) {
      sound.playClick();
      setLightboxPhoto(filteredPhotos[currentIndex - 1]);
    }
  };

  const nextPhoto = () => {
    if (currentIndex < filteredPhotos.length - 1) {
      sound.playClick();
      setLightboxPhoto(filteredPhotos[currentIndex + 1]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxPhoto) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxPhoto, currentIndex]);

  return (
    <section id="gallery" className="w-full space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-300 text-xs font-mono tracking-wider">
          <Camera className="w-3.5 h-3.5 text-pink-400" />
          <span>VISUAL CHRONICLES & CANDIDS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Captured Moments of Us 📸❤️
        </h2>
        <p className="text-sm sm:text-base text-zinc-300">
          The real memories behind the code: sunlit cafe laughs, cinema kisses, car bickering, and stolen glances:
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          <button
            onClick={() => {
              sound.playClick();
              setFilter("all");
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === "all"
                ? "bg-pink-500 text-white shadow-md shadow-pink-500/30 scale-105"
                : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            All Memories ({GALLERY_PHOTOS.length})
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setFilter("romantic");
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === "romantic"
                ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-500/30 scale-105"
                : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            ✨ Romantic & Tender
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setFilter("chaos");
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === "chaos"
                ? "bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-md shadow-amber-400/30 scale-105"
                : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            🕺 Chaos & Goofy
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setFilter("dates");
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === "dates"
                ? "bg-gradient-to-r from-sky-400 to-indigo-500 text-white shadow-md shadow-sky-400/30 scale-105"
                : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            🍻 Date Nights
          </button>
        </div>
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredPhotos.map((photo) => {
          const isLiked = !!likedPhotos[photo.id];
          return (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo)}
              className="group cursor-pointer glass-card rounded-3xl overflow-hidden border-white/10 hover:border-pink-500/40 relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-pink-500/20"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative w-full h-80 sm:h-96 overflow-hidden bg-black/40">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Ambient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0717] via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-pink-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-pink-500/30">
                    {photo.tag}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleLike(e, photo.id)}
                      className={`p-2 rounded-full backdrop-blur-md transition-all ${
                        isLiked
                          ? "bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-110"
                          : "bg-black/50 text-white hover:bg-black/70 hover:scale-105"
                      }`}
                      aria-label="Heart this photo"
                    >
                      <Heart
                        className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                      />
                    </button>
                    <span className="p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Floating Vibe Quote */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <span className="inline-block text-[11px] font-mono text-amber-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/20">
                    {photo.vibe}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 space-y-2 bg-[#120a1f]/90 border-t border-white/5">
                <h3 className="font-serif font-bold text-lg text-white group-hover:text-pink-200 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans line-clamp-3">
                  {photo.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-4xl bg-gradient-to-b from-[#1b1028] to-[#0c0714] border border-pink-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left/Prev button */}
            {currentIndex > 0 && (
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Right/Next button */}
            {currentIndex < filteredPhotos.length - 1 && (
              <button
                onClick={nextPhoto}
                className="absolute right-4 md:right-[42%] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* High-res Image Pane */}
            <div className="relative w-full md:w-3/5 h-[400px] md:h-[600px] bg-black flex items-center justify-center">
              <Image
                src={lightboxPhoto.src}
                alt={lightboxPhoto.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>

            {/* Information Sidebar */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-4 border-t md:border-t-0 md:border-l border-white/10 bg-[#140b22]">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase font-bold text-pink-400 bg-pink-950/70 px-3 py-1 rounded-full border border-pink-500/30">
                    {lightboxPhoto.tag}
                  </span>
                  <span className="font-mono text-xs text-amber-300">
                    {lightboxPhoto.vibe}
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                  {lightboxPhoto.title}
                </h3>

                <p className="text-sm text-zinc-200 leading-relaxed font-serif italic">
                  “{lightboxPhoto.caption}”
                </p>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-zinc-400 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>Frame:</span>
                    <span className="text-pink-300">{currentIndex + 1} of {filteredPhotos.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Authenticity:</span>
                    <span className="text-emerald-400">100% Unrehearsed</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={(e) => handleLike(e, lightboxPhoto.id)}
                  className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    likedPhotos[lightboxPhoto.id]
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-500/40"
                      : "bg-white/10 hover:bg-white/15 text-white"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedPhotos[lightboxPhoto.id] ? "fill-current" : ""
                    }`}
                  />
                  <span>
                    {likedPhotos[lightboxPhoto.id] ? "Loved Forever ❤️" : "Heart this memory"}
                  </span>
                </button>

                <span className="text-xs text-zinc-500 font-mono">
                  Use ← → arrows
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
