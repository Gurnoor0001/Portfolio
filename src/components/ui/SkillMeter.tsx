"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SkillMeterProps {
  skills: { name: string; level: number }[];
}

export default function SkillMeter({ skills }: SkillMeterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="space-y-4">
      {skills.map((skill, idx) => (
        <div key={idx} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-300">{skill.name}</span>
            <span className="text-xs font-mono text-cosmic-blue">{skill.level}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, #3b82f6 ${0}%, #8b5cf6 ${50}%, #f59e0b ${100}%)`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
