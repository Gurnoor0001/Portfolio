"use client";

import { useState, useEffect, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/data";

export default function Terminal() {
  const { terminalOpen, setTerminalOpen } = useAppStore();
  const [history, setHistory] = useState<{ type: 'input' | 'output', text: string }[]>([
    { type: 'output', text: "Welcome to GurnoorOS v1.0." },
    { type: 'output', text: "Type 'help' for available commands." }
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setTerminalOpen(!terminalOpen);
      }
      if (e.key === "Escape" && terminalOpen) {
        setTerminalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [terminalOpen, setTerminalOpen]);

  useEffect(() => {
    if (terminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [terminalOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'input' as const, text: input }];
    
    switch (cmd) {
      case "help":
        newHistory.push({ type: 'output', text: "Available commands: about, skills, education, projects, achievements, contact, clear, exit" });
        break;
      case "about":
        newHistory.push({ type: 'output', text: `${portfolioData.personal.name}: ${portfolioData.personal.tagline}` });
        break;
      case "skills":
        const allSkills = Object.values(portfolioData.skills).flat().join(", ");
        newHistory.push({ type: 'output', text: allSkills.length > 80 ? allSkills.substring(0, 80) + "..." : allSkills });
        break;
      case "education":
        newHistory.push({ type: 'output', text: `${portfolioData.education[0].degree} at ${portfolioData.education[0].institution} | ${portfolioData.education[0].metrics}` });
        break;
      case "projects":
        newHistory.push({ type: 'output', text: portfolioData.projects.map(p => p.title).join(", ") });
        break;
      case "achievements":
        newHistory.push({ type: 'output', text: portfolioData.achievements.map(a => a.title).join(", ") });
        break;
      case "contact":
        newHistory.push({ type: 'output', text: `Email: ${portfolioData.personal.links.email} | LinkedIn: ${portfolioData.personal.links.linkedin}` });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "close":
      case "exit":
        setTerminalOpen(false);
        break;
      default:
        newHistory.push({ type: 'output', text: `Command not found: ${cmd}` });
    }
    
    setHistory(newHistory);
    setInput("");
  };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
          exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed top-1/2 left-1/2 w-[95vw] md:w-[650px] h-[60vh] max-h-[500px] bg-black/95 backdrop-blur-2xl border border-white/20 rounded-2xl z-[100] font-mono text-sm flex flex-col p-4 shadow-[0_0_50px_rgba(30,144,255,0.3)]"
          data-lenis-prevent="true"
        >
          <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
            <span className="text-cosmic-blue font-bold">Terminal_</span>
            <button onClick={() => setTerminalOpen(false)} className="text-white/50 hover:text-white">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto mb-4 flex flex-col gap-1 scroll-smooth custom-scrollbar" data-lenis-prevent="true">
            {history.map((line, i) => (
              <div key={i} className={line.type === 'input' ? 'text-cosmic-blue' : 'text-slate-300'}>
                {line.type === 'input' ? `> ${line.text}` : line.text}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleCommand} className="flex gap-2 items-center">
            <span className="text-cosmic-blue font-bold">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
