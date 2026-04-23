"use client";

import { motion } from "motion/react";

const techStack = [
  { name: "TypeScript", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "React", category: "Framework" },
  { name: "Next.js", category: "Framework" },
  { name: "Node.js", category: "Runtime" },
  { name: "Tailwind", category: "Styling" },
  { name: "OpenAI", category: "AI" },
  { name: "Claude", category: "AI" },
  { name: "LangChain", category: "AI" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Docker", category: "DevOps" },
  { name: "Git", category: "Tools" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

export function TechStackGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-3 gap-3 sm:grid-cols-4"
    >
      {techStack.map((tech) => (
        <motion.div
          key={tech.name}
          variants={item}
          whileHover={{
            scale: 1.04,
            borderColor: "rgba(255,255,255,0.12)",
            backgroundColor: "rgba(255,255,255,0.03)",
          }}
          className="flex flex-col items-center gap-1.5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-transparent p-4 text-center transition-colors cursor-pointer"
        >
          <span className="text-xs font-medium text-[#f0f0fa]">
            {tech.name}
          </span>
          <span className="text-[10px] text-[rgba(240,240,250,0.4)]">
            {tech.category}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
