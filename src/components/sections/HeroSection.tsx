'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowRight, PencilSimple, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Reveal } from '@/components/ui/ScrollReveal';
import type { Section } from '@/lib/constants';

interface HeroSectionProps {
  onSectionChange: (section: Section) => void;
}

const HERO_SLIDES = [
  {
    image: '/images/hero-skill-discovery.webp',
    label: 'Skill Discovery',
    title: 'The open directory for AI agent skills',
    description: 'Browse, install, and deploy modular skills across 28 categories. From plumbing to prompt engineering, find what you need.',
    cta: { label: 'Explore Skills', section: 'skills' as Section },
    overlay: 'img-overlay-warm',
  },
  {
    image: '/images/hero-document-engine.webp',
    label: 'Document Engine',
    title: 'AI writes the documents. You ship them.',
    description: 'Generate proposals, reports, contracts, invoices, and pitch decks in seconds. Professional tone, every time.',
    cta: { label: 'Document Engine', section: 'documents' as Section },
    overlay: 'img-overlay-duotone',
  },
  {
    image: '/images/hero-tools.webp',
    label: 'Prompt Tools',
    title: 'Craft prompts that actually work',
    description: 'Write, rewrite, and optimize prompts with AI-powered tools. Remove AI copy, enforce structure, ship clean output.',
    cta: { label: 'Prompt Tools', section: 'tools' as Section },
    overlay: 'img-overlay-warm',
  },
  {
    image: '/images/hero-sadc.webp',
    label: 'SADC Region',
    title: 'Built for Africa, useful everywhere',
    description: 'African Language AI, Mobile Money integration, SADC compliance, and offline-first skills for low-bandwidth environments.',
    cta: { label: 'Learn More', section: 'about' as Section },
    overlay: 'img-overlay-muted',
  },
];

const STATS = [
  { value: '28', label: 'Skill Domains' },
  { value: '30+', label: 'Curated Skills' },
  { value: '6', label: 'User Classes' },
  { value: '8', label: 'Document Types' },
];

export function HeroSection({ onSectionChange }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="border-b border-[var(--border-subtle-value)]">
      {/* ═══════════════ CAROUSEL ═══════════════ */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-12 md:py-20">
            {/* Left: Text Content */}
            <div className="flex flex-col justify-center">
              <Reveal>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brand mb-3">
                  {slide.label}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] leading-[1.1]">
                  {slide.title}
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-secondary text-sm md:text-base leading-relaxed max-w-lg">
                  {slide.description}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-6 flex flex-wrap gap-2">
                  <button
                    onClick={() => onSectionChange(slide.cta.section)}
                    className="inline-flex items-center gap-2 bg-[var(--off-black)] text-white dark:bg-white dark:text-[var(--off-black)] px-4 py-2 rounded-md text-xs font-medium hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    {slide.cta.label} <ArrowRight size={12} weight="bold" />
                  </button>
                  {slide.cta.section !== 'tools' && (
                    <button
                      onClick={() => onSectionChange('tools')}
                      className="inline-flex items-center gap-2 border border-[var(--border-subtle-value)] px-4 py-2 rounded-md text-xs font-medium hover:bg-[var(--surface-02)] active:scale-[0.98] transition-all"
                    >
                      <PencilSimple size={12} weight="bold" /> Prompt Tools
                    </button>
                  )}
                </div>
              </Reveal>

              {/* Carousel Controls */}
              <div className="mt-8 flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="p-1.5 rounded-md border border-[var(--border-subtle-value)] hover:bg-[var(--surface-02)] transition-all"
                  aria-label="Previous slide"
                >
                  <CaretLeft size={14} weight="bold" />
                </button>
                <div className="flex gap-1.5">
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentSlide
                          ? 'w-6 bg-[var(--rust-signal)]'
                          : 'w-1.5 bg-[var(--border-subtle-value)] hover:bg-[var(--text-secondary-value)]'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="p-1.5 rounded-md border border-[var(--border-subtle-value)] hover:bg-[var(--surface-02)] transition-all"
                  aria-label="Next slide"
                >
                  <CaretRight size={14} weight="bold" />
                </button>
              </div>
            </div>

            {/* Right: Image with overlay */}
            <div className="relative flex items-center justify-center">
              <div className={`relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-[var(--border-subtle-value)] ${slide.overlay}`}>
                <Image
                  src={slide.image}
                  alt={slide.label}
                  fill
                  className="object-cover transition-opacity duration-500"
                  key={currentSlide}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={currentSlide === 0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ BENTO STATS ═══════════════ */}
      <div className="border-t border-[var(--border-subtle-value)] bg-[var(--surface-02)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="text-center p-4 rounded-lg bg-[var(--surface-01)] border border-[var(--border-subtle-value)]">
                  <p className="font-editorial-serif text-2xl md:text-3xl tracking-[-0.02em] text-brand">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mt-1">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
