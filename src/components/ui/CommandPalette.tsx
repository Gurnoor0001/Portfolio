"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  action: () => void;
  category: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const commands: Command[] = [
    { id: "home", label: "Go to Home", action: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }), category: "Navigation" },
    { id: "about", label: "Go to About", action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), category: "Navigation" },
    { id: "skills", label: "Go to Skills", action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }), category: "Navigation" },
    { id: "projects", label: "Go to Projects", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), category: "Navigation" },
    { id: "contact", label: "Go to Contact", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), category: "Navigation" },
    { id: "github", label: "Open GitHub", action: () => window.open("https://github.com/Gurnoor0001", "_blank"), category: "External" },
    { id: "linkedin", label: "Open LinkedIn", action: () => window.open("https://linkedin.com/in/gurnoor-singh-749735349", "_blank"), category: "External" },
    { id: "email", label: "Send Email", action: () => window.open("mailto:gur.farwaha2005@gmail.com", "_blank"), category: "External" },
    { id: "resume", label: "Download Resume", action: () => window.open("/resume.pdf", "_blank"), category: "Actions" },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const executeCommand = (cmd: Command) => {
    cmd.action();
    setIsOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] md:pt-[20vh] bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-sm md:max-w-xl bg-neutral-900 border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-3 md:px-4 border-b border-white/10">
              <Search size={18} className="md:w-5 md:h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command..."
                className="flex-1 bg-transparent py-3 md:py-4 text-white placeholder-slate-500 outline-none text-base md:text-lg"
                autoFocus
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={16} className="text-slate-400" />
              </button>
            </div>

            {/* Commands List */}
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-sm md:text-base">No commands found</div>
              ) : (
                filteredCommands.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => executeCommand(cmd)}
                    className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors group text-sm md:text-base"
                  >
                    <div className="flex items-center gap-3">
                      <ArrowRight size={16} className="text-slate-500 group-hover:text-cosmic-blue transition-colors" />
                      <span>{cmd.label}</span>
                    </div>
                    <span className="text-xs text-slate-500 uppercase hidden md:inline">{cmd.category}</span>
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-3 md:px-4 py-2 md:py-3 border-t border-white/10 flex items-center gap-4 text-xs text-slate-500">
              <span>
                <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-slate-400 text-[10px] md:text-xs">ESC</kbd> close
              </span>
              <span className="hidden md:inline">
                <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-slate-400">⌘K</kbd> open
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
