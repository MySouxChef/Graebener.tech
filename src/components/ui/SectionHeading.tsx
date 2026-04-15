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
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn("mb-12", className)}
    >
      <h2 className="text-3xl font-bold tracking-[0.96px] uppercase text-[#f0f0fa] md:text-4xl">
        {children}
      </h2>
    </motion.div>
  );
}
