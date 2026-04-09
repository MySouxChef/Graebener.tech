import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { mdxComponents } from "@/components/blog/MdxComponents";
import { GridBackground } from "@/components/ui/GridBackground";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        rehypePlugins: [
          [rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: true }],
        ],
      },
    },
  });

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <GridBackground className="min-h-screen pt-28 pb-24">
      <article className="mx-auto max-w-3xl px-6">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <h1 className="mb-4 font-mono text-3xl font-bold text-text-primary md:text-4xl">
          <span className="text-accent">&gt;</span> {post.title}
        </h1>

        <div className="mb-4 flex items-center gap-4 text-sm text-text-muted">
          <span className="inline-flex items-center gap-1">
            <Calendar size={14} /> {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={14} /> {post.readingTime}
          </span>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-border bg-bg-card px-2 py-0.5 font-mono text-xs text-accent-purple"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="prose-custom">{content}</div>
      </article>
    </GridBackground>
  );
}
