import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import type { BlogPost } from "@/lib/mdx";

interface BlogCardProps {
  post: Omit<BlogPost, "content">;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <GlowCard className="h-full cursor-pointer">
        <div className="mb-3 flex items-center gap-4 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1">
            <Calendar size={12} /> {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} /> {post.readingTime}
          </span>
        </div>

        <h3 className="mb-2 font-mono text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
          {post.title}
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-text-muted">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-border bg-bg-secondary px-2 py-0.5 font-mono text-[10px] text-accent-purple"
            >
              #{tag}
            </span>
          ))}
        </div>
      </GlowCard>
    </Link>
  );
}
