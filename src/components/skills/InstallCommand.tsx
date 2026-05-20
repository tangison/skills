'use client';

import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/skills/CopyButton';

interface InstallCommandProps {
  command: string;
  className?: string;
}

export function InstallCommand({ command, className }: InstallCommandProps) {
  const fullCommand = `npx skills add ${command}`;

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4',
        'rounded-lg border border-border-subtle bg-surface-02',
        'px-4 py-3',
        className
      )}
    >
      <code className="font-mono text-sm text-warm-bone truncate min-w-0">
        <span className="text-brand select-none">$ </span>
        {fullCommand}
      </code>

      <CopyButton
        content={fullCommand}
        label="Copy"
        successLabel="Copied!"
        variant="ghost"
        className="shrink-0"
      />
    </div>
  );
}

export default InstallCommand;
