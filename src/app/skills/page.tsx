import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { getAllSkills, getCategories } from "@/lib/skills";
import { SkillsMarketplace } from "@/components/skills/SkillsMarketplace";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowButton } from "@/components/ui/GlowButton";

export const metadata: Metadata = {
  title: "Skills Marketplace",
  description:
    "Browse and download Claude Code skills — reusable AI skill files for code generation, review, testing, and more.",
};

export default function SkillsPage() {
  const skills = getAllSkills();
  const categories = getCategories();

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading className="mb-0">Skills Marketplace</SectionHeading>
            <p className="mt-4 max-w-2xl text-lg text-text-muted">
              Reusable Claude skills — browse, preview, and copy .md skill files
              for your agentic workflows.
            </p>
          </div>
          <GlowButton href="/skills/builder">
            <Plus size={16} /> Build a Skill
          </GlowButton>
        </div>

        <SkillsMarketplace skills={skills} categories={categories} />
      </div>
    </div>
  );
}
