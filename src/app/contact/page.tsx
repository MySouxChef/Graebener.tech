import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GridBackground } from "@/components/ui/GridBackground";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for agentic engineering and development projects.",
};

export default function ContactPage() {
  return (
    <GridBackground className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-2xl px-6">
        <SectionHeading>Contact</SectionHeading>
        <p className="mb-12 text-lg text-text-muted">
          Have a project in mind? Let&apos;s build something impressive together.
        </p>
        <ContactForm />
      </div>
    </GridBackground>
  );
}
