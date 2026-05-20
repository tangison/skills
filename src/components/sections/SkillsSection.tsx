'use client';

import { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { SEED_SKILLS } from '@/lib/data';
import { MagnifyingGlass, ArrowRight, CaretLeft, Code, Star } from '@phosphor-icons/react';
import { Reveal } from '@/components/ui/ScrollReveal';
import { Tag } from '@/components/ui/Tag';
import { CopyBtn } from '@/components/ui/CopyBtn';
import { PASTEL_MAP, DIFFICULTY_PASTEL } from '@/lib/constants';

interface SkillsSectionProps {
  onSkillSelected?: (selected: boolean) => void;
}

const FEATURED_SLUGS = ['web-agency-complete', 'deep-research', 'brandkit-image-generation', 'human-copywriting', 'find-skills'];

export function SkillsSection({ onSkillSelected }: SkillsSectionProps) {
  const [skillFilter, setSkillFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const handleSkillSelect = (slug: string) => {
    setSelectedSkill(slug);
    onSkillSelected?.(true);
  };

  const handleBack = () => {
    setSelectedSkill(null);
    onSkillSelected?.(false);
  };

  const filteredSkills = SEED_SKILLS.filter(s => {
    const matchesCategory = skillFilter === 'all' || s.categoryName === skillFilter;
    const matchesSearch = searchQuery === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...Array.from(new Set(SEED_SKILLS.map(s => s.categoryName)))];
  const currentSkill = selectedSkill ? SEED_SKILLS.find(s => s.slug === selectedSkill) : null;
  const featuredSkills = FEATURED_SLUGS.map(slug => SEED_SKILLS.find(s => s.slug === slug)).filter(Boolean) as typeof SEED_SKILLS;

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (currentSkill) {
    return (
      <Reveal>
        <div>
          <button
            onClick={handleBack}
            className="text-[11px] text-secondary hover:text-primary uppercase tracking-[0.04em] mb-5 inline-flex items-center gap-1"
          >
            <CaretLeft size={10} weight="bold" /> Back
          </button>
          <div className="border border-[var(--border-subtle-value)] rounded-lg p-6 md:p-8 bg-[var(--surface-01)]">
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <Tag variant={DIFFICULTY_PASTEL[currentSkill.difficulty] || 'pastel-blue'}>
                {currentSkill.difficulty}
              </Tag>
              <Tag variant={PASTEL_MAP[currentSkill.ecosystemSource] || 'pastel-blue'}>
                {currentSkill.ecosystemSource}
              </Tag>
              {currentSkill.isTangisonOriginal && <Tag variant="pastel-yellow">Tangison Original</Tag>}
            </div>
            <h2 className="font-editorial-serif text-2xl tracking-[-0.02em]">{currentSkill.name}</h2>
            <p className="mt-1.5 text-secondary text-sm leading-relaxed">{currentSkill.tagline}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-secondary">
              <span className="inline-flex items-center gap-1">
                <Code size={12} weight="bold" />
                <code className="font-mono text-[11px] bg-[var(--surface-02)] px-1.5 py-0.5 rounded">{currentSkill.installCommand}</code>
              </span>
              {currentSkill.originalAuthor && <span>by {currentSkill.originalAuthor}</span>}
            </div>

            <div className="mt-8 prose prose-sm max-w-none">
              <ReactMarkdown>{currentSkill.content}</ReactMarkdown>
            </div>

            {currentSkill.aiInsight && (
              <div className="mt-8 border-t border-[var(--border-subtle-value)] pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1.5">AI Insight</p>
                <p className="text-sm leading-relaxed">{currentSkill.aiInsight}</p>
              </div>
            )}

            {currentSkill.usageExamples && (
              <div className="mt-5 border-t border-[var(--border-subtle-value)] pt-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary">Usage</p>
                  <CopyBtn text={currentSkill.usageExamples} />
                </div>
                <pre className="bg-[var(--surface-02)] rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                  <code>{currentSkill.usageExamples}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <div>
      {/* ═══════════════ FEATURED CAROUSEL ═══════════════ */}
      <Reveal>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star size={14} weight="fill" className="text-brand" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary">Featured Skills</p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={scrollPrev}
                className="p-1 rounded border border-[var(--border-subtle-value)] hover:bg-[var(--surface-02)] transition-all"
                aria-label="Previous featured skill"
              >
                <CaretLeft size={12} weight="bold" />
              </button>
              <button
                onClick={scrollNext}
                className="p-1 rounded border border-[var(--border-subtle-value)] hover:bg-[var(--surface-02)] transition-all"
                aria-label="Next featured skill"
              >
                <ArrowRight size={12} weight="bold" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3">
              {featuredSkills.map(skill => (
                <button
                  key={skill.id}
                  onClick={() => handleSkillSelect(skill.slug)}
                  className="flex-none w-[280px] sm:w-[320px] text-left border border-[var(--border-subtle-value)] rounded-lg p-4 bg-[var(--surface-01)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all group"
                >
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Tag variant={DIFFICULTY_PASTEL[skill.difficulty] || 'pastel-blue'}>{skill.difficulty}</Tag>
                    <Tag variant={PASTEL_MAP[skill.ecosystemSource] || 'pastel-blue'}>{skill.ecosystemSource}</Tag>
                    {skill.isTangisonOriginal && <Tag variant="pastel-yellow">Original</Tag>}
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-brand transition-colors">{skill.name}</h3>
                  <p className="text-secondary text-xs mt-1 line-clamp-2 leading-relaxed">{skill.tagline}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <code className="font-mono text-[10px] bg-[var(--surface-02)] px-1.5 py-0.5 rounded">{skill.installCommand}</code>
                    <ArrowRight size={10} className="text-muted group-hover:text-brand transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ═══════════════ SEARCH + FILTER ═══════════════ */}
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <MagnifyingGlass size={13} weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
            />
          </div>
          <p className="text-[11px] text-secondary">{SEED_SKILLS.length} skills</p>
        </div>
      </Reveal>

      {/* Category Filter */}
      <Reveal delay={60}>
        <div className="flex gap-1 overflow-x-auto pb-3 mb-5 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSkillFilter(cat)}
              className={`whitespace-nowrap px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                skillFilter === cat
                  ? 'bg-[var(--off-black)] text-white dark:bg-white dark:text-[var(--off-black)]'
                  : 'bg-[var(--surface-02)] text-secondary hover:text-primary'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredSkills.map((skill, i) => (
          <Reveal key={skill.id} delay={Math.min(i * 50, 300)}>
            <button
              onClick={() => handleSkillSelect(skill.slug)}
              className="w-full text-left border border-[var(--border-subtle-value)] rounded-lg p-4 bg-[var(--surface-01)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all group"
            >
              <div className="flex flex-wrap gap-1 mb-2">
                <Tag variant={DIFFICULTY_PASTEL[skill.difficulty] || 'pastel-blue'}>{skill.difficulty}</Tag>
                <Tag variant={PASTEL_MAP[skill.ecosystemSource] || 'pastel-blue'}>{skill.ecosystemSource}</Tag>
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm group-hover:text-brand transition-colors">{skill.name}</h3>
                  <p className="text-secondary text-xs mt-0.5 line-clamp-2 leading-relaxed">{skill.tagline}</p>
                </div>
                <ArrowRight size={12} className="text-muted mt-1 shrink-0 group-hover:text-brand transition-colors" />
              </div>
              <div className="mt-2.5 pt-2.5 border-t border-[var(--border-subtle-value)] flex items-center gap-2 text-[10px] text-secondary">
                {skill.categoryName && <span>{skill.categoryName}</span>}
                {skill.originalAuthor && <span>by {skill.originalAuthor}</span>}
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-16">
          <p className="text-secondary text-sm">No skills found.</p>
        </div>
      )}
    </div>
  );
}
