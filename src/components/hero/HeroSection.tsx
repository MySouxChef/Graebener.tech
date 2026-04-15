"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GlowButton } from "@/components/ui/GlowButton";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="mb-6 text-5xl font-bold tracking-[0.96px] uppercase text-[#f0f0fa] sm:text-6xl md:text-7xl lg:text-8xl">
            Graebener
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-4 h-8"
        >
          <AnimatedText
            text="Agentic Engineering  //  Full Stack Developer"
            speed={40}
            delay={1200}
            className="text-base text-[rgba(240,240,250,0.5)] sm:text-lg"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="mx-auto mb-10 max-w-lg text-base text-[rgba(240,240,250,0.5)]"
        >
          Building intelligent systems that think, adapt, and deliver.
          Turning complex problems into elegant, autonomous solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <GlowButton href="/projects">View My Work</GlowButton>
          <GlowButton href="/contact" variant="outline">
            Get In Touch
          </GlowButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-[rgba(240,240,250,0.3)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
