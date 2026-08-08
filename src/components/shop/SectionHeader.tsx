import type { ReactNode } from "react";

interface Props {
  title: ReactNode;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <div className="text-center mb-10 md:mb-14">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-12 md:w-16 bg-gradient-to-l from-primary-500/40 to-transparent" />
        <svg
          className="w-6 h-6 md:w-7 md:h-7 text-primary-400/60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 20C4 12.5 8.5 6.5 20 4C20 12 15.5 18 4 20Z" />
          <path d="M4 20C9 15 13 11 16 6.5" />
          <path d="M8 16C10.5 14.5 13 12 15 9" opacity="0.6" />
        </svg>
        <div className="h-px w-12 md:w-16 bg-gradient-to-r from-primary-500/40 to-transparent" />
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 md:mt-4 text-sm md:text-lg text-white/55 max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
