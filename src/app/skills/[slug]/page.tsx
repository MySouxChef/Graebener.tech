import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Tag } from "lucide-react";
import { remark } from "remark";
import html from "remark-html";
import { getAllSkills, getSkillBySlug } from "@/lib/skills";
import { SkillViewer } from "@/components/skills/SkillViewer";
import { SavedSkillDetail } from "@/components/skills/SavedSkillDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSkills().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill)
    return { title: "Skill — Skills Marketplace" };
  return {
    title: `${skill.title} — Skills`,
    description: skill.description,
  };
}

export default async function SkillDetailPage({ params }: Props) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) {
    return <SavedSkillDetail slug={slug} />;
  }

  const result = await remark().use(html).process(skill.content);
  const renderedHtml = result.toString();

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/skills"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-[#f0f0fa]"
        >
          <ArrowLeft size={16} /> Back to Skills
        </Link>

        <div className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-[rgba(240,240,250,0.15)] bg-[rgba(240,240,250,0.05)] px-2.5 py-1 text-xs text-[#f0f0fa]">
              <Sparkles size={12} />
              {skill.category}
            </span>
            <span className="text-xs text-text-muted">
              v{skill.version}
            </span>
            <span className="text-xs text-text-muted">
              by {skill.author}
            </span>
          </div>

          <h1 className="mb-3 text-3xl font-bold text-text-primary md:text-4xl">
            {skill.title}
          </h1>

          <p className="mb-4 max-w-3xl text-lg text-text-muted">
            {skill.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {skill.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-sm border border-[rgba(240,240,250,0.15)] bg-[rgba(240,240,250,0.05)] px-2 py-0.5 font-mono text-xs text-[rgba(240,240,250,0.5)]"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-text-primary">
            Skill File
          </h2>
          <SkillViewer rawFile={skill.rawFile} slug={skill.slug} />
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-text-primary">
            Preview
          </h2>
          <div
            className="skill-preview rounded-sm border border-[rgba(240,240,250,0.1)] bg-[rgba(240,240,250,0.03)] p-6 md:p-8"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </div>
    </div>
  );
}
