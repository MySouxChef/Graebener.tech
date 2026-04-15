import { Globe, Link2, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-[rgba(240,240,250,0.3)]">
          &copy; {new Date().getFullYear()} Graebener.tech
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgba(240,240,250,0.3)] transition-colors hover:text-[#f0f0fa]"
            aria-label="GitHub"
          >
            <Globe size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgba(240,240,250,0.3)] transition-colors hover:text-[#f0f0fa]"
            aria-label="LinkedIn"
          >
            <Link2 size={20} />
          </a>
          <a
            href="mailto:hello@graebener.tech"
            className="text-[rgba(240,240,250,0.3)] transition-colors hover:text-[#f0f0fa]"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
