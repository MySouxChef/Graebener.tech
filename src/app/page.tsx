import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { BlogCard } from "@/components/blog/BlogCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { GridBackground } from "@/components/ui/GridBackground";
import { getFeaturedProjects } from "@/data/projects";
import { getAllPosts } from "@/lib/mdx";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <HeroSection />

      <AboutSection />

      {/* Featured Projects */}
      <GridBackground>
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading>Featured Projects</SectionHeading>
            <ProjectGrid projects={featuredProjects} />
            <div className="mt-12 text-center">
              <GlowButton href="/projects" variant="outline">
                View All Projects
              </GlowButton>
            </div>
          </div>
        </section>
      </GridBackground>

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="border-t border-border py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <SectionHeading prefix="$">Latest Writing</SectionHeading>
            <div className="grid gap-6 sm:grid-cols-2">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <GlowButton href="/blog" variant="outline">
                Read More
              </GlowButton>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t border-border bg-bg-secondary py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 font-mono text-3xl font-bold text-text-primary md:text-4xl">
            Let&apos;s Build Something <span className="text-accent">Impressive</span>
          </h2>
          <p className="mb-8 text-lg text-text-muted">
            Ready to bring your ideas to life with agentic engineering and modern
            development? Let&apos;s talk.
          </p>
          <GlowButton href="/contact">Get In Touch</GlowButton>
        </div>
      </section>
    </>
  );
}
