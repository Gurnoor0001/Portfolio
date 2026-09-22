"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X } from "lucide-react";

interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

const themes: Theme[] = [
  { name: "Cosmic Blue", primary: "#3b82f6", secondary: "#8b5cf6", accent: "#f59e0b", background: "#0a0a1a" },
  { name: "Nebula Purple", primary: "#8b5cf6", secondary: "#ec4899", accent: "#06b6d4", background: "#0f0520" },
  { name: "Solar Flare", primary: "#f59e0b", secondary: "#ef4444", accent: "#fbbf24", background: "#1a0f0a" },
  { name: "Matrix Green", primary: "#10b981", secondary: "#059669", accent: "#34d399", background: "#0a1a0f" },
  { name: "Cyberpunk", primary: "#ec4899", secondary: "#8b5cf6", accent: "#06b6d4", background: "#1a0a1a" },
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(themes[0]);

  const applyTheme = (theme: Theme) => {
    setActiveTheme(theme);
    document.documentElement.style.setProperty("--color-cosmic-blue", theme.primary);
    document.documentElement.style.setProperty("--color-magenta-glow", theme.accent);
    document.documentElement.style.setProperty("--color-teal-accent", theme.secondary);
    document.documentElement.style.setProperty("--color-space-black", theme.background);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-40 p-3 md:p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 transition-all text-white hover:-translate-y-1 hover:shadow-lg group"
        title="Customize Theme"
      >
        <Palette size={20} className="md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 border border-white/20 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white">Theme Customizer</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => applyTheme(theme)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      activeTheme.name === theme.name
                        ? "border-white/40 bg-white/10"
                        : "border-white/10 hover:border-white/30 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full" style={{ background: theme.primary }} />
                      <div className="w-8 h-8 rounded-full" style={{ background: theme.secondary }} />
                      <div className="w-8 h-8 rounded-full" style={{ background: theme.accent }} />
                    </div>
                    <span className="text-white font-medium">{theme.name}</span>
                    {activeTheme.name === theme.name && (
                      <div className="ml-auto w-3 h-3 rounded-full bg-green-500" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-slate-400 text-center">
                  Theme changes are temporary and reset on page refresh
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
