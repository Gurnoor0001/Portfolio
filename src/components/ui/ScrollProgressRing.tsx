"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollProgressRing() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setProgress((scrollY / maxScroll) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed top-1/2 right-2 md:right-8 -translate-y-1/2 z-30 pointer-events-none hidden md:block"
    >
      <svg width="50" height="50" className="md:w-[60px] md:h-[60px] -rotate-90">
        {/* Background circle */}
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="3"
          className="md:stroke-[4]"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke="url(#progress-gradient)"
          strokeWidth="3"
          className="md:stroke-[4]"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transition: "stroke-dashoffset 0.1s ease-out",
          }}
        />
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] md:text-xs font-mono text-white/70">{Math.round(progress)}%</span>
      </div>
    </motion.div>
  );
}
