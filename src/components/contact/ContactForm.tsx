"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formId) {
      // Fallback: just show success for demo purposes
      setSubmitted(true);
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to send. Please try again later.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-sm border border-border bg-bg-card p-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <h3 className="font-mono text-xl font-semibold text-text-primary">
          Message Sent
        </h3>
        <p className="text-text-muted">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block font-mono text-sm text-text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-sm border border-border bg-bg-card px-4 py-3 font-mono text-sm text-text-primary placeholder-text-muted/50 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block font-mono text-sm text-text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-sm border border-border bg-bg-card px-4 py-3 font-mono text-sm text-text-primary placeholder-text-muted/50 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block font-mono text-sm text-text-muted">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full rounded-sm border border-border bg-bg-card px-4 py-3 font-mono text-sm text-text-primary transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
        >
          <option value="freelance">Freelance Project</option>
          <option value="collaboration">Collaboration</option>
          <option value="general">General Inquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-mono text-sm text-text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-sm border border-border bg-bg-card px-4 py-3 font-mono text-sm text-text-primary placeholder-text-muted/50 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
          placeholder="Tell me about your project..."
        />
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <GlowButton type="submit">
        <Send size={16} /> Send Message
      </GlowButton>
    </form>
  );
}
