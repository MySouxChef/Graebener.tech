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
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative rounded-sm border border-border bg-bg-card p-6 transition-colors duration-300 hover:border-accent/50 hover:bg-bg-card-hover hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
