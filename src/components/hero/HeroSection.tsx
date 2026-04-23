"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { RotatingWord } from "@/components/ui/RotatingWord";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {/* Warm coral bloom in top-right, mirroring the chaseai peach-glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(204,120,92,0.18), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Wordmark — tracking-in animation */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(14px)" }}
          animate={{ opacity: 1, letterSpacing: "-0.02em", filter: "blur(0px)" }}
          transition={{
            letterSpacing: { type: "spring", damping: 18, stiffness: 90 },
            filter: { type: "spring", damping: 18, stiffness: 90 },
            opacity: { duration: 0.5, ease: "easeOut" },
          }}
          className="mb-6 text-5xl font-bold text-[#f4f3ee] sm:text-6xl md:text-7xl lg:text-8xl whitespace-nowrap"
          style={{ willChange: "letter-spacing, filter, opacity" }}
        >
          GRAEBENER.TECH
        </motion.h1>

        {/* Tagline with rotating word */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
          className="mb-6 text-2xl font-medium tracking-tight text-[rgba(244,243,238,0.75)] sm:text-3xl md:text-4xl"
        >
          AI systems that run your{" "}
          <RotatingWord
            words={["business", "ops", "pipeline", "backlog", "kitchen"]}
            className="italic font-semibold text-[#cc785c]"
          />
        </motion.p>

        {/* Lede */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-[rgba(244,243,238,0.55)] md:text-lg"
        >
          I build AI that handles lead response, database reactivation,
          kitchen operations, and the agent stacks that tie everything
          together.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <GlowButton href="/contact">Book a consultation</GlowButton>
          <GlowButton href="/projects" variant="outline">
            See my work
          </GlowButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-[rgba(244,243,238,0.25)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
