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
  hidden: { opacity: 0, scale: 0.8 },
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
          whileHover={{ scale: 1.05, borderColor: "rgba(240,240,250,0.35)" }}
          className="flex flex-col items-center gap-1 rounded-sm border border-[rgba(240,240,250,0.1)] bg-transparent p-3 text-center transition-colors"
        >
          <span className="text-xs font-medium text-text-primary">
            {tech.name}
          </span>
          <span className="text-[10px] text-text-muted">
            {tech.category}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
