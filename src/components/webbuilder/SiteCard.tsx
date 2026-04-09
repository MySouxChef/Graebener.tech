"use client";

import { motion } from "motion/react";
import { Globe, ExternalLink } from "lucide-react";

interface SiteCardProps {
  slug: string;
  title: string;
  description: string;
  industry: string;
  tags: string[];
  colorAccent?: string;
}

export function SiteCard({
  slug,
  title,
  description,
  industry,
  tags,
  colorAccent = "#6366f1",
}: SiteCardProps) {
  return (
    <motion.a
      href={`/webbuilder/sites/${slug}/index.html`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group block rounded-sm border border-border bg-bg-card p-5 transition-colors duration-300 hover:border-accent/50 hover:bg-bg-card-hover hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]"
    >
      {/* Preview bar */}
      <div className="mb-4 aspect-video overflow-hidden rounded-sm border border-border bg-bg-secondary relative">
        <iframe
          src={`/webbuilder/sites/${slug}/index.html`}
          title={title}
          className="h-full w-full border-0 pointer-events-none scale-[0.5] origin-top-left"
          style={{ width: "200%", height: "200%" }}
          loading="lazy"
          sandbox=""
        />
        <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-accent/90 text-bg-primary px-3 py-1.5 rounded-sm font-mono text-xs font-medium flex items-center gap-1.5">
            <ExternalLink size={12} /> Open Site
          </span>
        </div>
      </div>

      <div className="mb-2 flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ background: colorAccent }}
        />
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
          {industry}
        </span>
      </div>

      <h3 className="mb-1.5 font-mono text-base font-semibold text-text-primary group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="mb-3 text-sm leading-relaxed text-text-muted line-clamp-2">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-sm border border-border bg-bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-accent/80"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
