"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
}

export function AnimatedText({
  text,
  speed = 50,
  delay = 0,
  className,
  cursor = true,
}: AnimatedTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [started, displayed, text, speed]);

  return (
    <span className={cn("font-mono", className)}>
      {displayed}
      {cursor && (
        <span className="inline-block w-[2px] h-[1em] bg-accent align-middle animate-pulse ml-0.5" />
      )}
    </span>
  );
}
