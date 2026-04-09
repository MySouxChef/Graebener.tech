import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Tag } from "lucide-react";
import { remark } from "remark";
import html from "remark-html";
import { getAllSkills, getSkillBySlug } from "@/lib/skills";
import { SkillViewer } from "@/components/skills/SkillViewer";
import { GridBackground } from "@/components/ui/GridBackground";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSkills().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return {};
  return {
    title: `${skill.title} — Skills`,
    description: skill.description,
  };
}

export default async function SkillDetailPage({ params }: Props) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) notFound();

  const result = await remark().use(html).process(skill.content);
  const renderedHtml = result.toString();

  return (
    <GridBackground className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/skills"
          className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} /> Back to Skills
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-accent/30 bg-accent/5 px-2.5 py-1 font-mono text-xs text-accent">
              <Sparkles size={12} />
              {skill.category}
            </span>
            <span className="font-mono text-xs text-text-muted">
              v{skill.version}
            </span>
            <span className="font-mono text-xs text-text-muted">
              by {skill.author}
            </span>
          </div>

          <h1 className="mb-3 font-mono text-3xl font-bold text-text-primary md:text-4xl">
            <span className="text-accent">&gt;</span> {skill.title}
          </h1>

          <p className="mb-4 max-w-3xl text-lg text-text-muted">
            {skill.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {skill.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-sm border border-border bg-bg-card px-2 py-0.5 font-mono text-xs text-accent-purple"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Raw file viewer with copy/download */}
        <div className="mb-12">
          <h2 className="mb-4 font-mono text-xl font-semibold text-text-primary">
            <span className="text-accent">$</span> Skill File
          </h2>
          <SkillViewer rawFile={skill.rawFile} slug={skill.slug} />
        </div>

        {/* Rendered preview */}
        <div className="mb-8">
          <h2 className="mb-4 font-mono text-xl font-semibold text-text-primary">
            <span className="text-accent">$</span> Preview
          </h2>
          <div
            className="skill-preview rounded-sm border border-border bg-bg-card p-6 md:p-8"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </div>
    </GridBackground>
  );
}
