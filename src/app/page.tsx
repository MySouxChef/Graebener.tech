import { HeroSection } from "@/components/hero/HeroSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ApproachSection } from "@/components/approach/ApproachSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCarousel } from "@/components/projects/ProjectCarousel";
import { BlogCard } from "@/components/blog/BlogCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/mdx";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 2);

  return (
    <>
      <HeroSection />

      <ServicesSection />

      {/* Section divider */}
      <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-[rgba(244,243,238,0.06)] to-transparent" />

      {/* Featured Projects */}
      <section className="py-32 sm:py-40">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Featured work">Projects</SectionHeading>
        </div>
        <ProjectCarousel projects={projects} />
      </section>

      {/* Section divider */}
      <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-[rgba(244,243,238,0.06)] to-transparent" />

      <ApproachSection />

      {/* Section divider */}
      <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-[rgba(244,243,238,0.06)] to-transparent" />

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="py-32 sm:py-40">
          <div className="mx-auto max-w-4xl px-6">
            <SectionHeading eyebrow="Insights">Latest writing</SectionHeading>
            <div className="grid gap-6 sm:grid-cols-2">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <GlowButton href="/blog" variant="outline">
                Read more
              </GlowButton>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 sm:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <span className="eyebrow mb-3 block">Get started</span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#f4f3ee] md:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mb-8 text-lg text-[rgba(244,243,238,0.6)]">
            Tell me what you&apos;re building and I&apos;ll show you how AI can
            accelerate it.
          </p>
          <GlowButton href="/contact">Book a consultation</GlowButton>
        </div>
      </section>
    </>
  );
}
