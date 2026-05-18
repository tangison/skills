'use client';

import { cn } from '@/lib/utils';

interface SectionTagProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTag({ children, className }: SectionTagProps) {
  return (
    <span
      className={cn(
        'inline-block text-fog-gray uppercase',
        'text-[0.7rem] tracking-[0.2em]',
        'border-l-2 border-rust-signal pl-3',
        'font-display',
        className
      )}
    >
      {children}
    </span>
  );
}

export default SectionTag;
