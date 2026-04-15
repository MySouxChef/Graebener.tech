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
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative p-6 border border-transparent hover:border-[rgba(240,240,250,0.1)] rounded-sm transition-colors duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
