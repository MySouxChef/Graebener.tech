"use client";

import { motion } from "motion/react";

interface StepCardProps {
  num: string;
  title: string;
  description: string;
  footnote: string;
  index: number;
}

export function StepCard({ num, title, description, footnote, index }: StepCardProps) {
  const offset = index % 2 === 1 ? "md:mt-16" : "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-2xl border border-[rgba(244,243,238,0.08)] bg-[#141413] p-7 transition-colors duration-300 hover:border-[rgba(244,243,238,0.18)] ${offset}`}
    >
      <div className="mb-4 font-mono text-[13px] font-semibold tracking-[0.12em] text-[#cc785c]">
        {num}
      </div>
      <h3 className="mb-2 text-xl font-bold tracking-tight text-[#f4f3ee] md:text-2xl">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[rgba(244,243,238,0.6)] md:text-[15px]">
        {description}
      </p>
      <div className="mt-5 border-t border-[rgba(244,243,238,0.06)] pt-4 font-mono text-[11px] tracking-wide text-[rgba(244,243,238,0.4)]">
        {footnote}
      </div>
    </motion.div>
  );
}
