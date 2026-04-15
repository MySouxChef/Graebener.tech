import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { BlogCard } from "@/components/blog/BlogCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on agentic engineering, AI, and modern development.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading>Blog</SectionHeading>
        <p className="mb-12 max-w-2xl text-lg text-text-muted">
          Writing about agentic engineering, AI integration, and the
          future of software development.
        </p>

        {posts.length === 0 ? (
          <p className="text-text-muted">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
