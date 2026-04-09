import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Globe, ExternalLink } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { ProjectViewer } from "@/components/projects/ProjectViewer";
import { GlowButton } from "@/components/ui/GlowButton";
import { GridBackground } from "@/components/ui/GridBackground";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <GridBackground className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Back link */}
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        {/* Header */}
        <h1 className="mb-4 font-mono text-3xl font-bold text-text-primary md:text-4xl">
          <span className="text-accent">&gt;</span> {project.title}
        </h1>

        {/* Tech stack */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-sm border border-border bg-bg-card px-3 py-1 font-mono text-xs text-accent/80"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-text-muted">
          {project.longDescription}
        </p>

        {/* Links */}
        <div className="mb-10 flex gap-4">
          {project.githubUrl && (
            <GlowButton href={project.githubUrl} variant="outline">
              <Globe size={16} /> Source Code
            </GlowButton>
          )}
          {project.liveUrl && (
            <GlowButton href={project.liveUrl} variant="outline">
              <ExternalLink size={16} /> Live Site
            </GlowButton>
          )}
        </div>

        {/* Demo viewer */}
        <div className="mb-6">
          <h2 className="mb-4 font-mono text-xl font-semibold text-text-primary">
            <span className="text-accent">$</span> Live Demo
          </h2>
          <ProjectViewer demoPath={project.demoPath} title={project.title} />
        </div>
      </div>
    </GridBackground>
  );
}
