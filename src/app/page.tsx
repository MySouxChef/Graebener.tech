import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { BlogCard } from "@/components/blog/BlogCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/mdx";

const HOME_PROJECT_SLUGS = ["mysouxchef", "db-reactivation", "speed-to-lead"];

export default function HomePage() {
  const homeProjects = HOME_PROJECT_SLUGS.map(
    (slug) => projects.find((p) => p.slug === slug)!
  ).filter(Boolean);
  const recentPosts = getAllPosts().slice(0, 2);

  return (
    <>
      <HeroSection />

      <AboutSection />

      {/* Featured Projects */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading>Featured Projects</SectionHeading>
          <ProjectGrid projects={homeProjects} />
          <div className="mt-12 text-center">
            <GlowButton href="/projects" variant="outline">
              View All Projects
            </GlowButton>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <SectionHeading>Latest Writing</SectionHeading>
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
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-[0.96px] uppercase text-[#f0f0fa] md:text-4xl">
            Let&apos;s Build Something Impressive
          </h2>
          <p className="mb-8 text-lg text-[rgba(240,240,250,0.5)]">
            Ready to bring your ideas to life with agentic engineering and modern
            development? Let&apos;s talk.
          </p>
          <GlowButton href="/contact">Get In Touch</GlowButton>
        </div>
      </section>
    </>
  );
}
