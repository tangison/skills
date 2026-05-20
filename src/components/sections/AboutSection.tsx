'use client';

import Image from 'next/image';
import { Reveal } from '@/components/ui/ScrollReveal';
import { Tag } from '@/components/ui/Tag';
import {
  Lightning,
  GlobeSimple,
  Translate,
  WifiHigh,
  CodeBlock,
  Terminal,
  ArrowSquareOut,
} from '@phosphor-icons/react';

const ECOSYSTEM_BADGES = [
  { label: 'Skills.sh', sub: 'Vercel Labs', variant: 'pastel-blue' },
  { label: 'Anthropic', sub: null, variant: 'pastel-green' },
  { label: 'Obra Superpowers', sub: null, variant: 'pastel-red' },
  { label: 'Google Labs', sub: null, variant: 'pastel-blue' },
  { label: 'Stripe', sub: null, variant: 'pastel-yellow' },
  { label: 'Cloudflare', sub: null, variant: 'pastel-blue' },
  { label: 'Better Auth', sub: null, variant: 'pastel-green' },
  { label: 'Neon Database', sub: null, variant: 'pastel-yellow' },
  { label: 'Tangison Originals', sub: null, variant: 'pastel-yellow' },
] as const;

export function AboutSection() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* ── Hero image band ── */}
      <Reveal>
        <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden border border-[var(--border-subtle-value)] mb-8 img-overlay-duotone">
          <Image
            src="/images/hero-sadc.webp"
            alt="African technology landscape"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      </Reveal>

      {/* ── Title block ── */}
      <Reveal delay={60}>
        <h2 className="font-editorial-serif text-3xl tracking-[-0.03em]">About SkillsCamp</h2>
        <p className="text-[var(--rust-signal)] font-display text-xs uppercase tracking-[0.1em] mt-2 mb-8">
          Sovereign intelligence infrastructure for the SADC region
        </p>
      </Reveal>

      {/* ── Main paragraphs ── */}
      <Reveal delay={80}>
        <div className="prose prose-sm max-w-none text-secondary leading-relaxed space-y-4">
          <p>
            SkillsCamp is Tangison Agency&rsquo;s sovereign AI skill registry — the first of its kind
            built in the SADC region. We curate, verify, and enhance AI agent skills from the global
            open ecosystem.
          </p>
          <p>
            We source skills from <a href="https://skills.sh" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-[var(--rust-signal)] hover:decoration-primary">skills.sh</a> — the
            open agent skills registry by Vercel Labs — plus Anthropic, Obra Superpowers, Google Labs,
            Stripe, Cloudflare, and dozens of community publishers. Every skill links back to its
            original author and repository.
          </p>
          <p>
            Our platform adds three things the global ecosystem doesn&rsquo;t: SADC-region relevance
            scoring, African language AI support, and offline-first optimization for low-bandwidth
            environments.
          </p>
        </div>
      </Reveal>

      {/* ── Three differentiators ── */}
      <Reveal delay={120}>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-start gap-3 p-4 border border-[var(--border-subtle-value)] rounded-lg bg-[var(--surface-01)]">
            <Lightning size={18} weight="fill" className="text-[var(--rust-signal)] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-primary">SADC Relevance</p>
              <p className="text-[11px] text-secondary mt-0.5">Region-weighted scoring for Southern Africa</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 border border-[var(--border-subtle-value)] rounded-lg bg-[var(--surface-01)]">
            <Translate size={18} weight="fill" className="text-[var(--rust-signal)] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-primary">African Language AI</p>
              <p className="text-[11px] text-secondary mt-0.5">Multilingual support across African languages</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 border border-[var(--border-subtle-value)] rounded-lg bg-[var(--surface-01)]">
            <WifiHigh size={18} weight="fill" className="text-[var(--rust-signal)] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-primary">Offline-First</p>
              <p className="text-[11px] text-secondary mt-0.5">Optimized for low-bandwidth environments</p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Two-column image + ecosystem badges ── */}
      <Reveal delay={160}>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          {/* Portrait image */}
          <div className="md:col-span-2">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[var(--border-subtle-value)] img-overlay-warm">
              <Image
                src="/images/about-portrait.webp"
                alt="Tangison team member"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          </div>

          {/* Ecosystem badges */}
          <div className="md:col-span-3">
            <h3 className="font-display text-xs uppercase tracking-[0.1em] text-primary mb-4">Ecosystem</h3>
            <div className="flex flex-wrap gap-2">
              {ECOSYSTEM_BADGES.map(eco => (
                <Tag key={eco.label} variant={eco.variant}>
                  {eco.sub ? `${eco.label} (${eco.sub})` : eco.label}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── How Skills Work ── */}
      <Reveal delay={240}>
        <div className="mt-10 border border-[var(--border-subtle-value)] rounded-lg bg-[var(--surface-01)] p-6">
          <div className="flex items-center gap-2 mb-4">
            <CodeBlock size={18} weight="fill" className="text-[var(--rust-signal)]" />
            <h3 className="font-display text-xs uppercase tracking-[0.1em] text-primary">How Skills Work</h3>
          </div>
          <ul className="space-y-3 text-xs text-secondary leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[var(--rust-signal)] font-mono text-[10px] font-bold mt-0.5 shrink-0">01</span>
              <span>Skills are reusable instruction sets defined in <code className="font-mono text-[11px] bg-[var(--surface-02)] px-1 py-0.5 rounded">SKILL.md</code> files with YAML frontmatter</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--rust-signal)] font-mono text-[10px] font-bold mt-0.5 shrink-0">02</span>
              <span>Install any skill:</span>
            </li>
          </ul>
          <div className="mt-3 flex items-center gap-2 bg-[var(--surface-02)] rounded-md px-3 py-2 border border-[var(--border-subtle-value)]">
            <Terminal size={14} className="text-secondary shrink-0" />
            <code className="font-mono text-[11px] text-primary">npx skills add &lt;owner/repo&gt;</code>
          </div>
          <ul className="mt-3 space-y-3 text-xs text-secondary leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[var(--rust-signal)] font-mono text-[10px] font-bold mt-0.5 shrink-0">03</span>
              <span>
                Browse the registry:{' '}
                <a href="https://skills.sh" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-[var(--rust-signal)] hover:decoration-primary">
                  skills.sh
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--rust-signal)] font-mono text-[10px] font-bold mt-0.5 shrink-0">04</span>
              <span>Works with Claude Code, Cursor, Windsurf, OpenCode, and 50+ agents</span>
            </li>
          </ul>
        </div>
      </Reveal>

      {/* ── Visit Tangison CTA ── */}
      <Reveal delay={320}>
        <div className="mt-10 text-center">
          <a
            href="https://tangison.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--rust-signal)] text-white font-display text-sm uppercase tracking-[0.06em] rounded-md hover:opacity-90 transition-opacity"
          >
            Visit tangison.com
            <ArrowSquareOut size={16} weight="bold" />
          </a>
          <p className="mt-3 text-xs text-secondary">
            For company information, careers, legal policies, and more.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
