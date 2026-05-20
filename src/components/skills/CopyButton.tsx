'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type CopyState = 'idle' | 'copying' | 'success';

interface CopyButtonProps {
  content: string;
  label?: string;
  successLabel?: string;
  variant?: 'default' | 'ghost' | 'rust';
  className?: string;
  onCopy?: () => void;
}

const variantStyles: Record<string, string> = {
  default:
    'bg-surface-02 text-warm-bone hover:bg-[var(--surface-02)] active:bg-[var(--border-default-value)]',
  ghost:
    'border border-[var(--border-subtle-value)] text-secondary bg-transparent hover:bg-[var(--surface-02)] active:bg-[var(--border-default-value)]',
  rust: 'bg-brand text-off-black hover:opacity-85 active:opacity-75',
};

export function CopyButton({
  content,
  label = 'Copy Skill',
  successLabel = 'Copied!',
  variant = 'default',
  className,
  onCopy,
}: CopyButtonProps) {
  const [state, setState] = useState<CopyState>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    if (state !== 'idle') return;

    setState('copying');

    try {
      await navigator.clipboard.writeText(content);
      setState('success');
      onCopy?.();

      // Reset back to idle after 1.5s
      timeoutRef.current = setTimeout(() => {
        setState('idle');
      }, 1500);
    } catch {
      // Fallback — just reset to idle if copy fails
      setState('idle');
    }
  }, [content, state, onCopy]);

  const isSuccess = state === 'success';
  const isCopying = state === 'copying';

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={isCopying}
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-3 py-1.5',
        'text-xs font-mono tracking-wide',
        'transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-signal focus-visible:ring-offset-2 focus-visible:ring-offset-atlantic-black',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        className
      )}
      aria-label={isSuccess ? successLabel : label}
    >
      <span
        className={cn(
          'transition-transform duration-200',
          isSuccess && 'scale-110'
        )}
      >
        {isSuccess ? (
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
        ) : (
          <Copy className="h-3.5 w-3.5" strokeWidth={2} />
        )}
      </span>
      <span
        className={cn(
          'transition-opacity duration-200',
          isCopying && 'opacity-0'
        )}
      >
        {isSuccess ? successLabel : label}
      </span>
    </button>
  );
}

export default CopyButton;
