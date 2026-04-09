import Link from "next/link";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  onClick?: () => void;
  type?: "button" | "submit";
}

export function GlowButton({
  href,
  children,
  className,
  variant = "primary",
  onClick,
  type = "button",
}: GlowButtonProps) {
  const baseClasses = cn(
    "relative inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium tracking-wider uppercase transition-all duration-300 rounded-sm",
    variant === "primary"
      ? "border border-accent bg-accent/10 text-accent hover:bg-accent/20 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] active:scale-95"
      : "border border-border text-text-primary hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] active:scale-95",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
