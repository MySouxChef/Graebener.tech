import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { ProjectViewer } from "@/components/projects/ProjectViewer";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { GlowButton } from "@/components/ui/GlowButton";
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

  const hasGallery = project.gallery && project.gallery.length > 0;
  const hasDemo = Boolean(project.demoPath);

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-[#f0f0fa]"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
          {project.title}
        </h1>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-sm border border-[rgba(240,240,250,0.15)] bg-[rgba(240,240,250,0.05)] px-3 py-1 text-xs text-[rgba(240,240,250,0.7)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-text-muted">
          {project.longDescription}
        </p>

        {project.liveUrl && (
          <div className="mb-10 flex gap-4">
            <GlowButton href={project.liveUrl} variant="outline">
              <ExternalLink size={16} /> Live Site
            </GlowButton>
          </div>
        )}

        <div className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-text-primary">
            Tech Details
          </h2>
          <div className="max-w-3xl space-y-4 leading-relaxed text-text-muted whitespace-pre-line">
            {project.techDetails}
          </div>
        </div>

        {hasGallery && (
          <div className="mb-6">
            <ProjectGallery images={project.gallery!} title={project.title} />
          </div>
        )}

        {!hasGallery && hasDemo && (
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold text-text-primary">
              Live Demo
            </h2>
            <ProjectViewer demoPath={project.demoPath} title={project.title} />
          </div>
        )}
      </div>
    </div>
  );
}
