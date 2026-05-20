'use client';

import { useState, useCallback } from 'react';
import { Copy, Check } from '@phosphor-icons/react';

export function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs text-secondary hover:text-primary transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={12} weight="bold" /> : <Copy size={12} weight="bold" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
