"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";

interface CarouselCardProps {
  project: Project;
  isActive: boolean;
}

export function CarouselCard({ project, isActive }: CarouselCardProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(10,10,15,0.85)]">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/50">
        {project.thumbnailExists ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 85vw, 420px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[rgba(240,240,250,0.3)]">
            <div className="text-center">
              <div className="mb-2 text-2xl text-[rgba(240,240,250,0.15)]">
                &lt;/&gt;
              </div>
              <span>{project.title}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-base font-semibold text-[#f0f0fa]">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-[rgba(240,240,250,0.5)]">
          {project.description}
        </p>

        {/* Tech stack — only visible on active card */}
        {isActive && (
          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] px-2 py-0.5 font-mono text-[10px] text-[rgba(240,240,250,0.6)]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
