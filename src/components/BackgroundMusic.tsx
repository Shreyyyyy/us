"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music2, ChevronDown } from "lucide-react";
import { THEME_SONG } from "@/data/relationshipData";

// Minimal typings for the YouTube IFrame Player API
interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (v: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (s: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onStateChange?: (e: { data: number }) => void;
      };
    }
  ) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT!);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  });
  return apiPromise;
}

const formatTime = (s: number) => {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

interface BackgroundMusicProps {
  /** Pause the theme song while another track is playing (e.g. the soundtrack modal). */
  suspended: boolean;
}

export default function BackgroundMusic({ suspended }: BackgroundMusicProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const wantsPlayRef = useRef(true); // user intent: keep the music going
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(60);
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState({ current: 0, duration: 0 });

  // Create the embedded player once
  useEffect(() => {
    let cancelled = false;
    loadYouTubeApi().then((YT) => {
      if (cancelled || !mountRef.current) return;
      playerRef.current = new YT.Player(mountRef.current, {
        videoId: THEME_SONG.youtubeId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          loop: 1,
          playlist: THEME_SONG.youtubeId, // required for loop=1 to work on a single video
        },
        events: {
          onReady: () => {
            playerRef.current?.setVolume(60);
            setReady(true);
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) setPlaying(true);
            if (e.data === YT.PlayerState.PAUSED) setPlaying(false);
            if (e.data === YT.PlayerState.ENDED) {
              playerRef.current?.seekTo(0, true);
              playerRef.current?.playVideo();
            }
          },
        },
      });
    });
    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  // Browsers block autoplay with sound, so start on the first interaction with the page
  useEffect(() => {
    if (!ready) return;
    const start = () => {
      if (wantsPlayRef.current && !suspended) playerRef.current?.playVideo();
      cleanup();
    };
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    const cleanup = () => events.forEach((ev) => window.removeEventListener(ev, start));
    events.forEach((ev) => window.addEventListener(ev, start, { once: true }));
    return cleanup;
  }, [ready, suspended]);

  // Step aside while another song plays in the soundtrack modal, then resume
  useEffect(() => {
    if (!ready) return;
    if (suspended) playerRef.current?.pauseVideo();
    else if (wantsPlayRef.current && playing === false) playerRef.current?.playVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suspended, ready]);

  // Progress ticker
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const p = playerRef.current;
      if (p) setProgress({ current: p.getCurrentTime(), duration: p.getDuration() });
    }, 500);
    return () => window.clearInterval(id);
  }, [playing]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const p = playerRef.current;
    if (!p) return;
    if (playing) {
      wantsPlayRef.current = false;
      p.pauseVideo();
    } else {
      wantsPlayRef.current = true;
      p.playVideo();
    }
  };

  const toggleMute = () => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) p.unMute();
    else p.mute();
    setMuted(!muted);
  };

  const changeVolume = (v: number) => {
    setVolume(v);
    playerRef.current?.setVolume(v);
    if (v > 0 && muted) {
      playerRef.current?.unMute();
      setMuted(false);
    }
  };

  const seek = (pct: number) => {
    const p = playerRef.current;
    if (!p || !progress.duration) return;
    p.seekTo((pct / 100) * progress.duration, true);
    setProgress((prev) => ({ ...prev, current: (pct / 100) * prev.duration }));
  };

  const pct = progress.duration ? (progress.current / progress.duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 inset-x-0 sm:bottom-4 sm:left-4 sm:right-auto sm:inset-x-auto sm:w-80 z-40 font-sans">
      <div className="relative border-t sm:border border-pink-500/25 bg-[#0e071a]/95 backdrop-blur-2xl sm:rounded-3xl shadow-2xl shadow-pink-950/60 overflow-hidden">
        {/* Top 2px thin progress bar for mobile & desktop */}
        <div className="w-full h-[2.5px] bg-white/10 relative">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-amber-400 to-sky-400 transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Embedded YouTube Iframe - stays mounted for playback */}
        <div
          className={
            expanded
              ? "relative w-full aspect-video overflow-hidden"
              : "absolute top-0 left-0 w-[200px] h-[113px] opacity-0 -z-10"
          }
        >
          <div className="absolute inset-0 pointer-events-none">
            <div ref={mountRef} className="w-full h-full" />
          </div>
        </div>

        {/* MOBILE THIN BOTTOM BAR (Ultra-sleek, zero screen obstruction) */}
        <div className="flex sm:hidden items-center justify-between px-3.5 py-2 gap-2.5">
          {/* Vinyl Artwork + Info */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <button
              onClick={() => setExpanded(!expanded)}
              className="relative w-9 h-9 shrink-0 rounded-full overflow-hidden border border-pink-400/50 shadow-md shadow-pink-500/20"
              aria-label={expanded ? "Hide video" : "Show video"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${THEME_SONG.youtubeId}/hqdefault.jpg`}
                alt=""
                className={`w-full h-full object-cover scale-150 ${playing ? "animate-spin-slow" : ""}`}
              />
              <span className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-[#07050d] border border-white/40" />
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-serif font-bold text-white truncate leading-tight">
                  {THEME_SONG.title}
                </p>
                {playing && (
                  <span className="flex items-end gap-[1.5px] h-2.5 shrink-0" aria-hidden>
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-[2px] bg-pink-400 rounded-full animate-eq"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-zinc-400 truncate leading-none mt-0.5">
                {THEME_SONG.artist} • {formatTime(progress.current)} / {formatTime(progress.duration)}
              </p>
            </div>
          </div>

          {/* Quick Play & Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={togglePlay}
              disabled={!ready}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-40 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 active:scale-95 transition-all"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-pink-400" />}
            </button>

            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              aria-label={expanded ? "Collapse player" : "Expand player"}
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "" : "rotate-180"}`} />
            </button>
          </div>
        </div>

        {/* Expanded Controls for Mobile when user taps chevron */}
        {expanded && (
          <div className="sm:hidden px-4 pb-3 pt-1 space-y-2 border-t border-white/5 animate-fadeIn">
            {/* Seek Bar */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
              <span className="w-8 text-right">{formatTime(progress.current)}</span>
              <input
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={pct}
                onChange={(e) => seek(Number(e.target.value))}
                className="music-range flex-1"
                style={{ "--pct": `${pct}%` } as React.CSSProperties}
                aria-label="Seek"
              />
              <span className="w-8">{formatTime(progress.duration)}</span>
            </div>

            <p className="text-[10px] italic font-serif text-pink-200/80 text-center leading-snug">
              “{THEME_SONG.annotation}”
            </p>
          </div>
        )}

        {/* DESKTOP FULL CARD VIEW */}
        <div className="hidden sm:block p-3 space-y-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setExpanded((x) => !x)}
              className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden border-2 border-pink-400/40 shadow-lg shadow-pink-500/30"
              title={expanded ? "Hide video" : "Show video"}
              aria-label={expanded ? "Hide video" : "Show video"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${THEME_SONG.youtubeId}/hqdefault.jpg`}
                alt=""
                className={`w-full h-full object-cover scale-150 ${playing ? "animate-spin-slow" : ""}`}
              />
              <span className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-[#07050d] border border-white/30" />
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-pink-300/80">
                <Music2 className="w-3 h-3" />
                <span>{playing ? "Now playing" : ready ? "Our song · tap play" : "Tuning in…"}</span>
                {playing && (
                  <span className="flex items-end gap-[2px] h-2.5 ml-1" aria-hidden>
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-[2px] bg-pink-400 rounded-full animate-eq"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                )}
              </div>
              <p className="text-sm font-serif font-bold text-white truncate">{THEME_SONG.title}</p>
              <p className="text-[11px] text-zinc-400 truncate">{THEME_SONG.artist}</p>
            </div>

            <button
              onClick={togglePlay}
              disabled={!ready}
              className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-40 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 active:scale-95 transition-all"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => setExpanded((x) => !x)}
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label={expanded ? "Collapse player" : "Expand player"}
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "" : "rotate-180"}`} />
            </button>
          </div>

          {/* Seek bar */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
            <span className="w-8 text-right">{formatTime(progress.current)}</span>
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={pct}
              onChange={(e) => seek(Number(e.target.value))}
              className="music-range flex-1"
              style={{ "--pct": `${pct}%` } as React.CSSProperties}
              aria-label="Seek"
            />
            <span className="w-8">{formatTime(progress.duration)}</span>
          </div>

          {expanded && (
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-zinc-300 hover:text-pink-300 transition-colors"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={muted ? 0 : volume}
                onChange={(e) => changeVolume(Number(e.target.value))}
                className="music-range flex-1"
                style={{ "--pct": `${muted ? 0 : volume}%` } as React.CSSProperties}
                aria-label="Volume"
              />
            </div>
          )}

          <p className="text-[10px] italic font-serif text-pink-200/70 leading-snug">
            “{THEME_SONG.annotation}”
          </p>
        </div>
      </div>
    </div>
  );
}
