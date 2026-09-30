"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import { Wrench, CheckCircle2 } from "lucide-react";

const INITIAL_TASKS = [
  { id: "task-paneer", label: "Eat fresh, protein-rich paneer meal 🧀", completed: false },
  { id: "task-water", label: "Drink at least 2 Litres of water today 💧", completed: false },
  { id: "task-screen", label: "Take a 5-minute break from GPU code & stretch neck 💻", completed: false },
  { id: "task-dance", label: "Spontaneous dance move or laugh out loud 🕺", completed: false },
  { id: "task-love", label: "Remember that Divija loves you unconditionally ❤️", completed: false },
  { id: "task-gratitude", label: "Quiet moment of gratitude for Kanha ji's blessings 🦚", completed: false },
];

interface CareChecklistProps {
  onNotify: (msg: string, type?: "spell" | "reminder" | "success" | "info") => void;
}

export default function CareChecklist({ onNotify }: CareChecklistProps) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("relationship_care_tasks");
      if (saved) {
        setTasks(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleTask = (id: string) => {
    sound.playClick();
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);

    try {
      localStorage.setItem("relationship_care_tasks", JSON.stringify(updated));
    } catch {
      // ignore
    }

    const completedCount = updated.filter((t) => t.completed).length;
    if (completedCount === updated.length) {
      sound.playSuccess();
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#34d399", "#fcd34d", "#ff85c0"],
      });
      onNotify("🎉 100% HEALTH OPTIMIZED! Both Boyfriend & Girlfriend operating at peak emotional wavelength!", "success");
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPct = Math.round((completedCount / tasks.length) * 100);

  return (
    <section id="care" className="w-full space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-mono tracking-wider">
          <Wrench className="w-3.5 h-3.5 text-emerald-400" />
          <span>SYSTEM MAINTENANCE PROTOCOL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Daily Duo Health Checklist 🛠️
        </h2>
        <p className="text-sm sm:text-base text-zinc-300">
          Small daily actions to keep both our bodies, spirits, and minds glowing:
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto border-emerald-500/20 shadow-2xl">
        {/* Progress Bar */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Optimization Metric:</span>
            <span className="text-emerald-400 font-bold">{progressPct}% COMPLETED</span>
          </div>
          <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 transition-all duration-500 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Task Items */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <label
              key={task.id}
              className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                task.completed
                  ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-100"
                  : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:border-emerald-500/30"
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4 rounded accent-emerald-400 cursor-pointer"
              />
              <span className={`text-xs sm:text-sm font-medium flex-1 ${task.completed ? "line-through opacity-80" : ""}`}>
                {task.label}
              </span>
              {task.completed && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
