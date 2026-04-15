import Image from "next/image";
import Link from "next/link";
import { GlowCard } from "@/components/ui/GlowCard";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const href = project.externalLink || `/projects/${project.slug}`;
  const isExternal = !!project.externalLink;

  return (
    <Link href={href} target={isExternal ? "_blank" : undefined}>
      <GlowCard className="h-full cursor-pointer">
        <div className="mb-4 aspect-video overflow-hidden rounded-sm bg-transparent border border-[rgba(240,240,250,0.1)] relative">
          {project.thumbnailExists ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-text-muted">
              <div className="text-center">
                <div className="mb-2 text-2xl text-[rgba(240,240,250,0.2)]">&lt;/&gt;</div>
                <span>{project.title}</span>
              </div>
            </div>
          )}
        </div>

        <h3 className="mb-2 text-lg font-semibold text-text-primary group-hover:text-[#f0f0fa] transition-colors">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-text-muted">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-sm border border-[rgba(240,240,250,0.1)] bg-[rgba(240,240,250,0.05)] px-2 py-0.5 font-mono text-[10px] text-[rgba(240,240,250,0.7)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </GlowCard>
    </Link>
  );
}
