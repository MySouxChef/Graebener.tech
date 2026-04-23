"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechStackGrid } from "@/components/about/TechStackGrid";

export function AboutSection() {
  return (
    <section id="about" className="py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading>About</SectionHeading>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-lg leading-relaxed text-[rgba(240,240,250,0.5)]">
              I specialize in{" "}
              <span className="text-[#f0f0fa] font-medium">
                agentic engineering
              </span>{" "}
              &mdash; designing and building autonomous systems that leverage AI
              to solve real-world problems. From intelligent automation to
              full-stack applications, I create solutions that don&apos;t just
              work, they{" "}
              <span className="text-[#f0f0fa] font-medium">think</span>.
            </p>
            <p className="text-lg leading-relaxed text-[rgba(240,240,250,0.5)]">
              With a deep understanding of modern frameworks, cloud
              infrastructure, and AI integration, I build applications that
              are fast, scalable, and intelligently designed from the ground
              up.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-[rgba(240,240,250,0.4)]">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Available for projects
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <TechStackGrid />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
