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
    "relative inline-flex items-center justify-center gap-2 px-6 py-[18px] text-sm font-bold tracking-[1.17px] uppercase transition-all duration-300 rounded-[32px]",
    variant === "primary"
      ? "bg-[rgba(240,240,250,0.1)] border border-[rgba(240,240,250,0.35)] text-[#f0f0fa] hover:bg-[rgba(240,240,250,0.2)]"
      : "bg-transparent border border-[rgba(240,240,250,0.2)] text-[rgba(240,240,250,0.7)] hover:border-[rgba(240,240,250,0.35)] hover:text-[#f0f0fa]",
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
