"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[rgba(10,10,9,0.8)] backdrop-blur-xl border-b border-[rgba(244,243,238,0.08)]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-bold tracking-[0.08em] uppercase text-[#f4f3ee]"
        >
          GRAEBENER.TECH
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-semibold tracking-[0.08em] uppercase text-[rgba(244,243,238,0.55)] transition-colors hover:text-[#f4f3ee]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop coral pill */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center rounded-full border border-[rgba(204,120,92,0.35)] bg-[rgba(204,120,92,0.12)] px-4 py-1.5 text-[12px] font-semibold tracking-[0.08em] uppercase text-[#f4f3ee] transition-colors hover:bg-[rgba(204,120,92,0.2)] hover:border-[#cc785c]"
        >
          Get in touch
        </Link>

        <button
          className="text-[#f4f3ee] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="bg-[rgba(10,10,9,0.97)] backdrop-blur-xl md:hidden border-b border-[rgba(244,243,238,0.08)]">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-semibold tracking-[0.08em] uppercase text-[rgba(244,243,238,0.55)] transition-colors hover:text-[#f4f3ee]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex w-fit items-center rounded-full border border-[rgba(204,120,92,0.35)] bg-[rgba(204,120,92,0.12)] px-4 py-1.5 text-[12px] font-semibold tracking-[0.08em] uppercase text-[#f4f3ee]"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
