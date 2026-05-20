'use client';

import Image from 'next/image';
import { Reveal } from '@/components/ui/ScrollReveal';

export function AboutSection() {
  return (
    <div className="max-w-3xl mx-auto">
      <Reveal>
        <h2 className="font-editorial-serif text-3xl tracking-[-0.03em]">About Tangison SkillsCamp</h2>
        <p className="text-[var(--rust-signal)] font-display text-xs uppercase tracking-[0.1em] mt-2 mb-6">Intelligence built on what remains</p>
      </Reveal>

      {/* ── Hero image band ── */}
      <Reveal delay={60}>
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

      <Reveal delay={80}>
        <div className="prose prose-sm max-w-none text-secondary leading-relaxed space-y-4">
          <p>Tangison SkillsCamp is a sovereign intelligence infrastructure platform. We discover, verify, organize, enhance, and operationalize AI agent skills from the global open skills ecosystem: skills.sh, Vercel Labs, Anthropic, Obra Superpowers, Microsoft Azure, and beyond.</p>
          <p>Every skill in our catalog is sourced honestly: we credit original authors, link back to original repositories, and link to skills.sh. We enhance skills without stealing attribution, acting as an intelligence layer above the ecosystem.</p>
          <p>Our platform is built on the principle that intelligence infrastructure should be accessible, verifiable, and sovereign. No vendor lock-in. No hidden dependencies. Just modular, composable skills that work across the entire open ecosystem.</p>
        </div>
      </Reveal>

      {/* ── Two-column image + principles ── */}
      <Reveal delay={160}>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          {/* Side image */}
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

          {/* Principles */}
          <div className="md:col-span-3">
            <h3 className="font-display text-xs uppercase tracking-[0.1em] text-primary mb-4">Core Principles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Always credit original skill authors',
                'Always link back to original repositories',
                'Always link to skills.sh',
                'Prefer trusted ecosystems',
                'Prefer maintainable skills',
                'Avoid recommending low-quality skills',
                'Enhance skills without stealing attribution',
                'Act as an intelligence layer above the ecosystem',
              ].map((principle, i) => (
                <div key={i} className="flex items-start gap-2 p-3 border border-[var(--border-subtle-value)] rounded-lg bg-[var(--surface-01)]">
                  <span className="text-[var(--rust-signal)] font-mono text-[10px] font-bold mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-xs leading-relaxed">{principle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-10">
          <h3 className="font-display text-xs uppercase tracking-[0.1em] text-primary mb-4">Supported Ecosystems</h3>
          <div className="flex flex-wrap gap-2">
            {['Skills.sh', 'Tangison', 'Vercel Labs', 'Anthropic', 'Obra Superpowers', 'Microsoft Azure'].map(eco => (
              <span key={eco} className="px-3 py-1.5 text-xs font-medium rounded-md bg-[var(--surface-02)] text-secondary">{eco}</span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Brand image ── */}
      <Reveal delay={260}>
        <div className="mt-8 relative aspect-square max-w-[200px] rounded-lg overflow-hidden border border-[var(--border-subtle-value)] img-overlay-muted">
          <Image
            src="/images/about-brand.webp"
            alt="Brand design system"
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>
      </Reveal>

      <Reveal delay={320}>
        <div className="mt-10">
          <h3 className="font-display text-xs uppercase tracking-[0.1em] text-primary mb-4">AI Rewrite System</h3>
          <div className="flex flex-wrap gap-2">
            {['Improve Clarity', 'Remove AI Sounding Copy', 'Improve Structure', 'Improve Formatting', 'Enforce Tangison Standards', 'Clean Code Enhancement', 'Simplify Workflows'].map(fn => (
              <span key={fn} className="px-3 py-1.5 text-xs font-medium rounded-md border border-[var(--border-subtle-value)]">{fn}</span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={400}>
        <div className="mt-10">
          <h3 className="font-display text-xs uppercase tracking-[0.1em] text-primary mb-4">Roadmap</h3>
          <div className="space-y-4">
            <div className="border-l-2 border-[var(--rust-signal)] pl-4">
              <div className="flex items-center gap-2">
                <span className="font-display text-xs uppercase tracking-[0.06em] text-primary">v0.1.0</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--rust-signal)] text-white font-medium">current</span>
              </div>
              <ul className="mt-2 text-xs text-secondary space-y-1">
                <li>Skill directory with verified ecosystem data</li>
                <li>AI chat assistant with LLM integration</li>
                <li>Document engine with template preview</li>
                <li>Research triangulation framework</li>
              </ul>
            </div>
            <div className="border-l-2 border-[var(--border-subtle-value)] pl-4">
              <span className="font-display text-xs uppercase tracking-[0.06em] text-secondary">v0.2.0 — planned</span>
              <ul className="mt-2 text-xs text-muted space-y-1">
                <li>Live ecosystem data sync via cron jobs</li>
                <li>Real-time trending from skills.sh API</li>
                <li>User authentication and saved skills</li>
                <li>Document export (PDF, DOCX, PPTX)</li>
              </ul>
            </div>
            <div className="border-l-2 border-[var(--border-subtle-value)] pl-4">
              <span className="font-display text-xs uppercase tracking-[0.06em] text-secondary">v0.3.0 — planned</span>
              <ul className="mt-2 text-xs text-muted space-y-1">
                <li>Custom skill publishing workflow</li>
                <li>Team collaboration and shared workspaces</li>
                <li>API access for external integrations</li>
                <li>Advanced search with semantic matching</li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={480}>
        <div className="mt-10">
          <h3 className="font-display text-xs uppercase tracking-[0.1em] text-primary mb-4">Version History</h3>
          <div className="space-y-3">
            <div className="flex items-baseline gap-3 text-xs">
              <span className="font-mono text-[var(--rust-signal)]">0.1.0-beta</span>
              <span className="text-muted">2025-03</span>
              <span className="text-secondary">Initial beta release with verified skills, AI chat, and document engine</span>
            </div>
            <div className="flex items-baseline gap-3 text-xs">
              <span className="font-mono text-muted">0.0.1-alpha</span>
              <span className="text-muted">2025-02</span>
              <span className="text-muted">Internal alpha with basic skill directory and navigation</span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
