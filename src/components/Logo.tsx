"use client";

import Link from "next/link";

interface LogoProps {
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ showTagline = false, size = "md" }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: "text-lg", tagline: "text-[10px]" },
    md: { icon: 36, text: "text-xl", tagline: "text-[11px]" },
    lg: { icon: 44, text: "text-2xl", tagline: "text-xs" },
  };
  const s = sizes[size];

  return (
    <Link href="/" className="inline-flex items-center gap-3 group">
      <div
        className="relative flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ width: s.icon, height: s.icon }}
      >
        <svg width={s.icon} height={s.icon} viewBox="0 0 52 52" fill="none" className="absolute inset-0">
          <rect x="1.5" y="1.5" width="49" height="49" rx="6" stroke="#C23B22" strokeWidth="2" opacity="0.85" />
        </svg>
        <svg width={s.icon * 0.7} height={s.icon * 0.7} viewBox="0 0 36 36" fill="none" className="relative z-10">
          <path d="M2 32 L10 14 L16 22 L22 8 L30 28 L34 32Z" fill="#C23B22" opacity="0.65" />
          <path d="M6 34 L14 20 L20 28 L26 16 L32 30 L36 34Z" fill="#C23B22" opacity="0.4" />
          <circle cx="24" cy="10" r="3" fill="#C23B22" opacity="0.9" />
          <path d="M4 30 Q10 27, 16 30 Q22 33, 28 30 Q32 28, 34 30" stroke="#C23B22" strokeWidth="0.8" fill="none" opacity="0.4" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`${s.text} font-medium tracking-tight text-ink`}>EasyChina</span>
        {showTagline && <span className={`${s.tagline} tracking-[2px] text-stone uppercase`}>China Travel, Made Easy</span>}
      </div>
    </Link>
  );
}
