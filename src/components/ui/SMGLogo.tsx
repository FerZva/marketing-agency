import React from 'react';

interface SMGLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function SMGLogo({
  className = "h-8 w-auto",
  showSubtitle = false
}: SMGLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <picture className="h-full w-auto inline-flex items-center">
        <source srcSet="/smg-logo.webp" type="image/webp" />
        <img
          src="/smg-logo.png"
          alt="SMG Marketing Agency"
          width={361}
          height={144}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className="h-full w-auto max-h-full object-contain select-none transition-transform group-hover:scale-105"
        />
      </picture>
      {showSubtitle && (
        <span className="hidden text-sm font-bold tracking-tight text-zinc-800 sm:inline-block">
          Social Media Growth
        </span>
      )}
    </div>
  );
}
