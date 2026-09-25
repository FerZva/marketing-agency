import React, { useState } from 'react';
import { AGENCY_CONFIG } from '@/src/lib/constants';

interface SMGLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function SMGLogo({
  className = "h-8 w-auto",
  showSubtitle = false
}: SMGLogoProps) {
  const [src, setSrc] = useState(AGENCY_CONFIG.logoUrl);

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={src}
        alt="SMG Marketing Agency"
        className="h-full w-auto max-h-full object-contain select-none"
        onError={() => {
          if (src !== AGENCY_CONFIG.logoFallback) {
            setSrc(AGENCY_CONFIG.logoFallback);
          }
        }}
      />
      {showSubtitle && (
        <span className="hidden text-sm font-bold tracking-tight text-zinc-800 sm:inline-block">
          Social Media Growth
        </span>
      )}
    </div>
  );
}
