"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface RotatingWordProps {
  words: string[];
  intervalMs?: number;
  className?: string;
}

export function RotatingWord({
  words,
  intervalMs = 2500,
  className,
}: RotatingWordProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [words.length, intervalMs]);

  return (
    <span
      className={className}
      style={{ display: "inline-block", position: "relative" }}
    >
      {/* Invisible widest-word sizer to reserve layout width and prevent shift */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {words.reduce((a, b) => (a.length >= b.length ? a : b), "")}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 whitespace-nowrap"
        >
          _{words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
