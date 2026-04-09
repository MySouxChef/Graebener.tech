"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  prefix?: string;
}

export function SectionHeading({
  children,
  className,
  prefix = ">",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn("mb-12", className)}
    >
      <h2 className="font-mono text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
        <span className="text-accent">{prefix}</span> {children}
      </h2>
      <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-accent to-transparent" />
    </motion.div>
  );
}
