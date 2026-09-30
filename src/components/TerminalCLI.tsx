"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { Terminal, Send, Sparkles } from "lucide-react";

export default function TerminalCLI() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([
    "DIVIJA-LOVE SHELL v∞ [x86_64-love-posix]",
    "Type 'help' to inspect endpoints. Or try:",
    "  love --status",
    "  sudo git checkout us-forever",
    "  curl -X POST /hug",
    "  debug relationship",
    "  shrey --stats",
    "  divija --vibe",
  ]);

  const commandDict: Record<string, string> = {
    "love --status": "STATUS: INFINITE\nEXPIRY: NEVER\nENCRYPTION: SHREY-DIVIJA-SECRET-KEY\nINTEGRITY: 100% UNCONDITIONAL",
    "sudo git checkout us-forever": "Switched to branch 'us-forever'. All commits fast-forwarded. Zero merge conflicts detected in this or any parallel timeline. ❤️",
    "curl -x post /hug": "HTTP/1.1 200 OK\nContent-Type: application/love+json\nPayload: Direct high-pressure warm hug dispatched to your coordinates! 🤗",
    "debug relationship": "Scanning neural graph...\nAnalysis: 0 bugs found, infinite compatibility. Heartbeats synced to Behkana rhythm. 🦋",
    "shrey --stats": "USER: Shrey\nROLE: AI Wizard & Sunflower\nSPECIAL ATTRIBUTES: Messy hair, black specs, paneer enthusiast, Ranveer dancer at 2 AM.\nSTATUS: Completely head-over-heels for Divija.",
    "divija --vibe": "USER: Divija\nROLE: Psychology Queen & Jalebi\nSPECIAL ATTRIBUTES: Observant, quiet smile, overthinking superpower, Kanha devotee.\nSTATUS: Crowned lifetime queen of Shrey's heart.",
    "predict-future": "SIMULATION RESULT: Cozy home with fairy lights, rainy car rides, career triumphs, endless laughter, and divine peace.",
    "help": "Available Commands:\n- love --status\n- sudo git checkout us-forever\n- curl -X POST /hug\n- debug relationship\n- shrey --stats\n- divija --vibe\n- predict-future\n- clear",
  };

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    sound.playTerminalBlip();
    if (cmd === "clear") {
      setHistory([]);
    } else {
      const output = commandDict[cmd] || `Command not found: '${cmd}'. Type 'help' to see valid endpoints.`;
      setHistory((prev) => [...prev, `> ${inputVal}`, output]);
    }
    setInputVal("");
  };

  return (
    <section id="terminal" className="w-full space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono tracking-wider">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>CYBERPUNK DEV TERMINAL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Shrey & Divija Shell CLI 🤖
        </h2>
        <p className="text-sm sm:text-base text-zinc-300">
          For the engineer who dreams in command prompts:
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-7 max-w-3xl mx-auto border-cyan-500/25 font-mono shadow-2xl">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-zinc-300 text-[11px]">shrey@divija-cloud: ~/destiny</span>
          </div>
          <span className="text-[10px] text-cyan-400/80 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> posix-love-1.0
          </span>
        </div>

        {/* Terminal Output Body */}
        <div className="min-h-[180px] max-h-[300px] overflow-y-auto space-y-2 text-xs text-emerald-400 whitespace-pre-wrap pr-1">
          {history.map((line, idx) => (
            <div key={idx} className={line.startsWith(">") ? "text-cyan-300 font-bold" : "text-emerald-300/90"}>
              {line}
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleExecute} className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
          <span className="text-cyan-400 font-bold text-xs">&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or any command..."
            className="flex-1 bg-transparent border-0 text-white placeholder-zinc-500 text-xs focus:outline-none"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-colors"
            aria-label="Send command"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </section>
  );
}
