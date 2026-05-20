'use client';

import { cn } from '@/lib/utils';

interface MastGlyphProps {
  className?: string;
  /** Force the rust accent even on light mode — useful for footer/chat */
  forceRustAccent?: boolean;
  /** Override the structural stroke color (defaults to currentColor) */
  strokeColor?: string;
}

/**
 * Tangison shipwreck mast glyph.
 *
 * The mark consists of:
 *  - A vertical main mast pole
 *  - A diagonal sail spar angling up-right from near the top
 *  - A horizontal cross-beam
 *  - A secondary shorter diagonal (rigging hint)
 *  - A curved accent stroke in rust_signal (#C56A4A)
 *  - A small base anchor point
 *
 * All structural strokes use `currentColor` so the glyph adapts to
 * surrounding text colour. Only the accent uses a hard-coded brand value.
 */
export function MastGlyph({ className, forceRustAccent, strokeColor }: MastGlyphProps) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* ── Main vertical mast ── */}
      <line
        x1="50" y1="8" x2="50" y2="112"
        stroke={strokeColor || 'currentColor'}
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* ── Horizontal cross-beam ── */}
      <line
        x1="24" y1="52" x2="76" y2="52"
        stroke={strokeColor || 'currentColor'}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* ── Diagonal sail spar (up-right) ── */}
      <line
        x1="50" y1="22" x2="82" y2="8"
        stroke={strokeColor || 'currentColor'}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* ── Secondary shorter diagonal (down-left rigging hint) ── */}
      <line
        x1="50" y1="22" x2="22" y2="38"
        stroke={strokeColor || 'currentColor'}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* ── Rust accent — curved pennant / signal line ── */}
      <path
        d="M82 8 C86 18, 80 26, 76 22"
        stroke={forceRustAccent ? '#E8643A' : '#E8643A'}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── Small base anchor point ── */}
      <circle cx="50" cy="112" r="3" fill={strokeColor || 'currentColor'} opacity="0.6" />
    </svg>
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
  const textColor = isDark ? 'text-skeleton-bone' : 'text-atlantic-black';
  const subTextColor = isDark ? 'text-fog-gray' : 'text-atlantic-black/50';

  if (variant === 'mark-only') {
    return <MastGlyph className={cn('h-10 w-auto', className)} />;
  }

  if (variant === 'mark-wordmark') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <MastGlyph className="h-10 w-auto shrink-0" />
        <span className={cn('font-display text-lg tracking-[0.12em] uppercase select-none', textColor)}>
          TANGISON
        </span>
      </div>
    );
  }

  // variant === 'mark-wordmark-product'
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <MastGlyph className="h-10 w-auto shrink-0" />
      <div className="flex flex-col leading-none">
        <span className={cn('font-display text-lg tracking-[0.12em] uppercase select-none', textColor)}>
          TANGISON
        </span>
        <span className={cn('font-editorial text-xs tracking-[0.2em] uppercase select-none mt-1', subTextColor)}>
          SKILLSMITH
        </span>
      </div>
    </div>
  );
}

export default TangisonLogo;
