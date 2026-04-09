import Link from "next/link";
import { Sparkles } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import type { SkillMeta } from "@/lib/skills";

interface SkillCardProps {
  skill: SkillMeta;
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link href={`/skills/${skill.slug}`}>
      <GlowCard className="h-full cursor-pointer">
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-sm border border-accent/30 bg-accent/5 px-2 py-0.5 font-mono text-[10px] text-accent">
            <Sparkles size={10} />
            {skill.category}
          </span>
          <span className="font-mono text-[10px] text-text-muted">
            v{skill.version}
          </span>
        </div>

        <h3 className="mb-2 font-mono text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
          {skill.title}
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-text-muted line-clamp-2">
          {skill.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {skill.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-border bg-bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-accent-purple"
            >
              {tag}
            </span>
          ))}
        </div>
      </GlowCard>
    </Link>
  );
}
