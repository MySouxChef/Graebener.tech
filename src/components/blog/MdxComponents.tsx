import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="mt-10 mb-4 text-3xl font-bold text-text-primary" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-8 mb-3 text-2xl font-bold text-text-primary" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-6 mb-2 text-xl font-semibold text-text-primary" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 leading-relaxed text-text-muted" {...props} />
  ),
  a: (props) => (
    <a
      className="text-[#f0f0fa] underline underline-offset-4 transition-colors hover:text-[rgba(240,240,250,0.7)]"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="mb-4 ml-6 list-disc space-y-1 text-text-muted" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1 text-text-muted" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mb-4 border-l-2 border-[#f0f0fa] pl-4 italic text-text-muted"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-[rgba(240,240,250,0.05)] px-1.5 py-0.5 font-mono text-sm text-[#f0f0fa]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-6 overflow-x-auto rounded-sm border border-[rgba(240,240,250,0.1)] bg-[rgba(240,240,250,0.03)] p-4 font-mono text-sm"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-[rgba(240,240,250,0.1)]" />,
};
