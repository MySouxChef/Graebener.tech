"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface ServiceCardProps {
  label: string;
  title: string;
  description: string;
  mockup: ReactNode;
  index: number;
}

export function ServiceCard({
  label,
  title,
  description,
  mockup,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col gap-5 rounded-2xl border border-[rgba(244,243,238,0.08)] bg-[#141413] p-7 transition-colors duration-300 hover:border-[rgba(244,243,238,0.18)]"
    >
      <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#cc785c]">
        {label}
      </div>
      <div>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-[#f4f3ee] md:text-2xl">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-[rgba(244,243,238,0.6)] md:text-[15px]">
          {description}
        </p>
      </div>
      <div className="mt-auto flex min-h-[140px] items-center justify-center overflow-hidden rounded-xl border border-[rgba(244,243,238,0.08)] bg-[#1a1918] p-4">
        {mockup}
      </div>
    </motion.div>
  );
}
