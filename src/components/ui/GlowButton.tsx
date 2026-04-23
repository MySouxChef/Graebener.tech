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
    "relative inline-flex items-center justify-center gap-2 px-6 py-[16px] text-sm font-semibold tracking-[0.06em] transition-all duration-200 rounded-xl",
    variant === "primary"
      ? "bg-[#cc785c] text-[#141413] border border-[#cc785c] hover:bg-[#d97757] hover:shadow-[0_0_32px_0_rgba(204,120,92,0.35)]"
      : "bg-transparent border border-[rgba(244,243,238,0.25)] text-[#f4f3ee] hover:border-[rgba(244,243,238,0.5)]",
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
