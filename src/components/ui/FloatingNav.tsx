"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Code, Briefcase, Award, Mail, GraduationCap, Users } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "interpersonal", label: "Soft Skills", icon: Users },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "certifications", label: "Certs", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40">
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl min-w-[200px] max-h-[60vh] overflow-y-auto"
            >
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <item.icon size={18} />
                  <span className="font-medium text-sm md:text-base">{item.label}</span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full backdrop-blur-xl border transition-all shadow-lg ${
            isOpen
              ? "bg-magenta-glow border-magenta-glow rotate-90"
              : "bg-white/10 border-white/20 hover:bg-white/20 hover:scale-110"
          }`}
        >
          {isOpen ? (
            <X size={20} className="md:w-6 md:h-6 text-white" />
          ) : (
            <Menu size={20} className="md:w-6 md:h-6 text-white" />
          )}
        </button>
      </motion.div>
    </div>
  );
}
