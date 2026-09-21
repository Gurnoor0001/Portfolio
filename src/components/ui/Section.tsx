"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className = "", id }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-20%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen flex items-center justify-center pointer-events-none ${className}`}
    >
      <div className="pointer-events-auto w-full max-w-7xl mx-auto px-4 md:px-8 py-20">
        {children}
      </div>
    </motion.section>
  );
}
