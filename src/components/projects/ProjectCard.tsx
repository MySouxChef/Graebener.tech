import Image from "next/image";
import Link from "next/link";
import { GlowCard } from "@/components/ui/GlowCard";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <GlowCard className="h-full cursor-pointer">
        {/* Thumbnail */}
        <div className="mb-4 aspect-video overflow-hidden rounded-sm bg-bg-secondary border border-border relative">
          {project.thumbnailExists ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-xs text-text-muted">
              <div className="text-center">
                <div className="mb-2 text-2xl text-accent/30">&lt;/&gt;</div>
                <span>{project.title}</span>
              </div>
            </div>
          )}
        </div>

        <h3 className="mb-2 font-mono text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-text-muted">
          {project.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-sm border border-border bg-bg-secondary px-2 py-0.5 font-mono text-[10px] text-accent/80"
            >
              {tech}
            </span>
          ))}
        </div>
      </GlowCard>
    </Link>
  );
}
