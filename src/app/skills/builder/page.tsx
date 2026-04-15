import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SkillBuilder } from "@/components/skills/SkillBuilder";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Skill Builder",
  description:
    "Build custom Claude Code skills with an interactive editor. Generate .md skill files with frontmatter and instructions.",
};

export default function SkillBuilderPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <Link
          href="/skills"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-[#f0f0fa]"
        >
          <ArrowLeft size={16} /> Back to Skills
        </Link>

        <SectionHeading>Skill Builder</SectionHeading>
        <p className="mb-10 max-w-2xl text-lg text-text-muted">
          Create custom Claude skills with the interactive editor. Fill in the
          metadata and instructions, then copy or download the .md file.
        </p>

        <SkillBuilder />
      </div>
    </div>
  );
}
