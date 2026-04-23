"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CarouselCard } from "@/components/projects/CarouselCard";
import type { Project } from "@/data/projects";

interface ProjectCarouselProps {
  projects: Project[];
}

const CARD_WIDTH = 420;
const AUTO_ROTATE_INTERVAL = 5000;

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const count = projects.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-rotation
  useEffect(() => {
    if (isPaused || isMobile) return;
    const timer = setInterval(next, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [next, isPaused, isMobile]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const getOffset = (index: number) => {
    let offset = index - activeIndex;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  };

  const getProjectHref = (project: Project) =>
    project.externalLink || `/projects/${project.slug}`;

  // Mobile: horizontal scroll snap
  if (isMobile) {
    return (
      <div className="relative">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={getProjectHref(project)}
              className="w-[85vw] flex-shrink-0 snap-center cursor-pointer"
            >
              <CarouselCard project={project} isActive={i === activeIndex} />
            </Link>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                scrollRef.current?.children[i]?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center",
                });
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "w-6 bg-[rgba(240,240,250,0.6)]"
                  : "w-1.5 bg-[rgba(240,240,250,0.2)]"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Desktop: CSS 3D carousel (no Motion — pure CSS transitions for GPU performance)
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="relative mx-auto flex items-center justify-center overflow-hidden"
        style={{ perspective: "1200px", height: "480px" }}
      >
        <div
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            width: `${CARD_WIDTH}px`,
            height: "100%",
          }}
        >
          {projects.map((project, i) => {
            const offset = getOffset(i);
            const absOffset = Math.abs(offset);

            if (absOffset > 3) return null;

            const rotateY = offset * 42;
            const translateX = offset * (CARD_WIDTH * 0.55 + 24);
            const translateZ = absOffset === 0 ? 100 : -absOffset * 50;
            const scale = absOffset === 0 ? 1 : Math.max(0.7, 1 - absOffset * 0.15);
            const opacity = absOffset === 0 ? 1 : Math.max(0.2, 0.7 - absOffset * 0.25);
            const zIndex = 10 - absOffset;

            const cardContent = (
              <CarouselCard project={project} isActive={absOffset === 0} />
            );

            return (
              <div
                key={project.slug}
                className="absolute top-0 left-0"
                style={{
                  width: `${CARD_WIDTH}px`,
                  height: "100%",
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease",
                  willChange: "transform, opacity",
                  cursor: absOffset === 0 ? "pointer" : "pointer",
                }}
                onClick={() => {
                  if (absOffset !== 0) goTo(i);
                }}
              >
                {absOffset === 0 ? (
                  <Link
                    href={getProjectHref(project)}
                    className="block h-full"
                    target={project.externalLink ? "_blank" : undefined}
                  >
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Arrow navigation */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.6)] p-2.5 text-[rgba(240,240,250,0.5)] transition-colors hover:border-[rgba(255,255,255,0.2)] hover:text-[#f0f0fa] cursor-pointer"
        aria-label="Previous project"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.6)] p-2.5 text-[rgba(240,240,250,0.5)] transition-colors hover:border-[rgba(255,255,255,0.2)] hover:text-[#f0f0fa] cursor-pointer"
        aria-label="Next project"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="mt-8 flex justify-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIndex
                ? "w-6 bg-[rgba(240,240,250,0.6)]"
                : "w-1.5 bg-[rgba(240,240,250,0.15)] hover:bg-[rgba(240,240,250,0.3)]"
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
