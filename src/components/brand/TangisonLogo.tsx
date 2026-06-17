'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MastGlyphProps {
  className?: string;
  /** Force the rust accent even on light mode — useful for footer/chat */
  forceRustAccent?: boolean;
  /** Override the structural stroke color (defaults to currentColor) */
  strokeColor?: string;
}

/**
 * Tangison mark — sovereign intelligence infrastructure glyph.
 *
 * Replaced the legacy SVG mast glyph with the official Tangison logo PNG
 * (uploaded by the brand owner on 2026-06-17). The mark is rendered through
 * next/image so it participates in the Next.js image optimization pipeline.
 *
 * `forceRustAccent` and `strokeColor` are retained for backwards
 * compatibility with existing call sites but are no-ops on the new asset.
 */
export function MastGlyph({ className, forceRustAccent, strokeColor }: MastGlyphProps) {
  // Props intentionally accepted but unused — kept for API compatibility.
  void forceRustAccent;
  void strokeColor;
  return (
    <Image
      src="/icon.png"
      alt="Tangison"
      width={40}
      height={40}
      priority
      className={cn('h-10 w-10 object-contain', className)}
    />
  );
}

interface TangisonLogoProps {
  variant?: 'mark-only' | 'mark-wordmark' | 'mark-wordmark-product';
  className?: string;
  isDark?: boolean;
}

export function TangisonLogo({
  variant = 'mark-only',
  className,
  isDark = true,
}: TangisonLogoProps) {
  const textColor = isDark ? 'text-warm-bone' : 'text-off-black';
  const subTextColor = isDark ? 'text-secondary' : 'text-off-black/50';

  if (variant === 'mark-only') {
    return <MastGlyph className={cn('h-10 w-10', className)} />;
  }

  if (variant === 'mark-wordmark') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <MastGlyph className="h-10 w-10 shrink-0" />
        <span className={cn('font-display text-lg tracking-[0.12em] uppercase select-none', textColor)}>
          TANGISON
        </span>
      </div>
    );
  }

  // variant === 'mark-wordmark-product'
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <MastGlyph className="h-10 w-10 shrink-0" />
      <div className="flex flex-col leading-none">
        <span className={cn('font-display text-lg tracking-[0.12em] uppercase select-none', textColor)}>
          TANGISON
        </span>
        <span className={cn('font-editorial-serif text-xs tracking-[0.2em] uppercase select-none mt-1', subTextColor)}>
          SKILLSCAMP
        </span>
      </div>
    </div>
  );
}

export default TangisonLogo;
