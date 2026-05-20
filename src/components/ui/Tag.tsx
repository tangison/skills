export function Tag({ children, variant = 'pastel-blue' }: { children: React.ReactNode; variant?: string }) {
  return (
    <span
      className={`${variant} inline-flex items-center rounded-[6px] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.05em] leading-none`}
    >
      {children}
    </span>
  );
}
