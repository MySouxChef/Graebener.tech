"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowCard({ children, className }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "group relative p-6 rounded-2xl border border-transparent hover:border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.02)] hover:backdrop-blur-xl transition-all duration-400",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
