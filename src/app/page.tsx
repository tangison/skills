'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';
import {
  Search, Menu, Copy, Check, ArrowRight, ExternalLink, ChevronRight,
  Zap, Terminal, BookOpen, LayoutGrid,
  Code, Palette, PenLine, FileText, Image, Layout, Share2, Cpu,
  Cloud, Compass, Server, Rocket, Box, FileType, MessageSquare,
  Send, X, Shield, Sparkles, Sun, Moon, Clock, Globe, Layers,
  Play, RefreshCw, FileDown, Eye, Settings, ChevronDown, AlertCircle
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */
type PageRoute = 'home' | 'skills' | 'skill_detail' | 'categories' | 'trending' | 'documents' | 'research' | 'about';
type Difficulty = 'FOUNDATIONAL' | 'INTERMEDIATE' | 'SOVEREIGN';
type EcosystemSource = 'VERCEL_LABS' | 'ANTHROPIC' | 'POKAIS' | 'IMPECCABLE' | 'OBRA' | 'TANGISON' | 'COMMUNITY';

interface SkillRelationship {
  type: string;
  target: string;
  label: string;
}

interface Skill {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  difficulty: Difficulty;
  installCount: number;
  githubStars: number;
  qualityScore: number;
  isTrending: boolean;
  trendingDelta: number;
  installCommand: string;
  dependencies: string[];
  originalAuthor: string;
  repositoryName: string;
  sourceUrl: string;
  skillsShUrl: string;
  license: string;
  ecosystemSource: EcosystemSource;
  usageExamples: string;
  relationships: SkillRelationship[];
  contentMdx: string;
  aiInsight: string;
  tangisonRecommendation: string;
  citations: string[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface RewriteFunction {
  id: string;
  label: string;
  enabled: boolean;
}

interface AutomationJob {
  name: string;
  schedule: string;
  description: string;
}

interface Ecosystem {
  name: string;
  url: string;
}

/* ═══════════════════════════════════════════════════════════════
   DATA CONSTANTS
   ═══════════════════════════════════════════════════════════════ */
const SKILL_CATEGORIES = [
  { name: "Website Planning", icon: "Planning", count: 14 },
  { name: "Website Auditing", icon: "Auditing", count: 8 },
  { name: "SEO", icon: "SEO", count: 22 },
  { name: "Copywriting", icon: "Copywriting", count: 45 },
  { name: "Prompt Engineering", icon: "Prompt", count: 112 },
  { name: "Image Generation", icon: "ImageGen", count: 34 },
  { name: "Flyer Design", icon: "Flyer", count: 19 },
  { name: "Social Media", icon: "Social", count: 56 },
  { name: "Document Design", icon: "DocDesign", count: 27 },
  { name: "PDF Generation", icon: "PDFGen", count: 11 },
  { name: "Research", icon: "Research", count: 38 },
  { name: "Automation", icon: "Automation", count: 89 },
  { name: "Deployment", icon: "Deployment", count: 41 },
  { name: "Next.js", icon: "Nextjs", count: 156 },
  { name: "React", icon: "ReactIcon", count: 204 },
  { name: "TypeScript", icon: "TypeScriptIcon", count: 118 },
  { name: "Brand Systems", icon: "Brand", count: 21 },
  { name: "AI Infrastructure", icon: "Infra", count: 67 }
];

const INITIAL_SKILLS: Skill[] = [
  {
    id: 'skill-1',
    slug: 'find-skills',
    title: 'Find Skills',
    category: 'AI Infrastructure',
    tagline: 'Discover the perfect AI skill for any task — search across the entire ecosystem',
    difficulty: 'SOVEREIGN',
    installCount: 12847,
    githubStars: 2340,
    qualityScore: 97,
    isTrending: true,
    trendingDelta: 18,
    installCommand: 'npx skills-sh find-skills',
    dependencies: [],
    originalAuthor: 'Vercel Labs',
    repositoryName: 'vercel-labs/skills',
    sourceUrl: 'https://github.com/vercel-labs/skills/tree/main/find-skills',
    skillsShUrl: 'https://skills.sh/skills/find-skills',
    license: 'MIT',
    ecosystemSource: 'VERCEL_LABS',
    usageExamples: `// Search for a skill by natural language
const results = await findSkills("create a landing page for a restaurant");

// Filter by category
const designSkills = await findSkills({
  query: "brand design",
  category: "creative-design"
});

// Get trending skills
const trending = await findSkills({ trending: true, limit: 10 });`,
    relationships: [
      { type: 'complementary', target: 'military-prompt-architect', label: 'Use for prompt optimization' },
      { type: 'complementary', target: 'seo-auditor-pro', label: 'Research before choosing' }
    ],
    contentMdx: `# Find Skills

## Overview

Find Skills is the sovereign discovery engine that searches across the entire Skills.sh ecosystem and compatible sources to find the best AI skill for your task.

## How It Works

1. **Natural Language Query** — Describe what you want to accomplish in plain English
2. **Multi-Ecosystem Search** — Searches Vercel Labs, Anthropic, Pokais, Impeccable, Obra, and community sources
3. **Quality Scoring** — Results ranked by composite quality score based on install count, GitHub stars, and verification status
4. **Smart Matching** — Uses semantic understanding to match intent, not just keywords

## Features

- **Fuzzy Matching**: Handles typos and partial names gracefully
- **Category Filters**: Narrow results by category, difficulty, or ecosystem
- **Trending Boost**: Trending skills get a relevance boost
- **Dependency Awareness**: Shows compatible and complementary skills`,
    aiInsight: 'The most-installed skill in the ecosystem — acts as the gateway to discovering all other skills. Quality score of 97 is the highest in the catalog.',
    tangisonRecommendation: 'Start here for any project — Find Skills will point you to the right tool for the job.',
    citations: ['skills.sh/docs/find-skills', 'vercel-labs/skills/README.md', 'ecosystem-report-2025.pdf']
  },
  {
    id: 'skill-2',
    slug: 'military-prompt-architect',
    title: 'Military Prompt Architect',
    category: 'Prompt Engineering',
    tagline: 'Battle-tested prompt frameworks with constraint enforcement and adversarial testing',
    difficulty: 'INTERMEDIATE',
    installCount: 8923,
    githubStars: 1876,
    qualityScore: 94,
    isTrending: true,
    trendingDelta: 24,
    installCommand: 'npx skills-sh military-prompt-architect',
    dependencies: ['find-skills'],
    originalAuthor: 'Anthropic',
    repositoryName: 'anthropics/skills',
    sourceUrl: 'https://github.com/anthropics/skills/tree/main/military-prompt-architect',
    skillsShUrl: 'https://skills.sh/skills/military-prompt-architect',
    license: 'Apache-2.0',
    ecosystemSource: 'ANTHROPIC',
    usageExamples: `// Architect a constraint-enforced prompt
const prompt = await militaryPromptArchitect({
  objective: "Generate a compliant financial report",
  constraints: ["no speculation", "cite all sources", "SEC Regulation S-K compliant"],
  adversarialTests: ["hallucination resistance", "instruction leakage"],
  outputFormat: "structured-markdown"
});

// Validate an existing prompt
const validation = await militaryPromptArchitect.validate({
  prompt: existingPrompt,
  testSuite: "adversarial-v2"
});`,
    relationships: [
      { type: 'requires', target: 'find-skills', label: 'Search for complementary skills' },
      { type: 'complementary', target: 'seo-auditor-pro', label: 'Optimize content prompts' }
    ],
    contentMdx: `# Military Prompt Architect

## Overview

Military Prompt Architect applies adversarial engineering principles to prompt design. Every prompt is structured as a mission brief with clear objectives, constraints, rules of engagement, and success criteria.

## Architecture

1. **Mission Brief** — Define the objective with precision
2. **Rules of Engagement** — Set hard constraints that cannot be violated
3. **Threat Model** — Identify failure modes and adversarial inputs
4. **Verification Protocol** — Automated testing against known attack vectors
5. **After-Action Review** — Post-execution analysis and refinement

## Prompt Structure

\`\`\`
OBJECTIVE: [Clear, measurable goal]
CONSTRAINTS: [Hard limits that cannot be violated]
RULES: [Guidelines that should be followed]
THREATS: [Known failure modes]
VERIFICATION: [How to validate success]
OUTPUT: [Expected format and structure]
\`\`\``,
    aiInsight: 'The most sophisticated prompt engineering skill in the ecosystem — its adversarial testing framework catches 94% of prompt injection attacks before deployment.',
    tangisonRecommendation: 'Use Military Prompt Architect for any production prompt — the constraint enforcement alone prevents most common LLM failures.',
    citations: ['anthropics/skills/docs/prompt-architect', 'arxiv.org/abs/2401-prompt-security', 'skills.sh/blog/military-prompts']
  },
  {
    id: 'skill-3',
    slug: 'flyer-luxury-generator',
    title: 'Flyer Luxury Generator',
    category: 'Flyer Design',
    tagline: 'Premium, print-safe flyer and poster design — luxury aesthetics, export-ready output',
    difficulty: 'FOUNDATIONAL',
    installCount: 5412,
    githubStars: 923,
    qualityScore: 89,
    isTrending: false,
    trendingDelta: 5,
    installCommand: 'npx skills-sh flyer-luxury-generator',
    dependencies: [],
    originalAuthor: 'Obra Superpowers',
    repositoryName: 'obra-superpowers/skills',
    sourceUrl: 'https://github.com/obra-superpowers/skills/tree/main/flyer-luxury-generator',
    skillsShUrl: 'https://skills.sh/skills/flyer-luxury-generator',
    license: 'MIT',
    ecosystemSource: 'OBRA',
    usageExamples: `// Generate a luxury event flyer
const flyer = await flyerLuxuryGenerator({
  event: "Annual Gala Dinner",
  date: "2026-03-15",
  venue: "The Grand Terrace, Windhoek",
  style: "minimal-luxury",
  palette: ["#1a1a2e", "#d4a843", "#f5f0e8"],
  format: "A5-print"
});

// Generate a social media version
const socialFlyer = await flyerLuxuryGenerator({
  ...flyerConfig,
  format: "instagram-story"
});`,
    relationships: [
      { type: 'complementary', target: 'find-skills', label: 'Discover design skill combinations' },
      { type: 'complementary', target: 'military-prompt-architect', label: 'Optimize design prompts' }
    ],
    contentMdx: `# Flyer Luxury Generator

## Overview

Flyer Luxury Generator creates premium, print-safe flyers and posters with luxury aesthetics. Every output is designed for both print and digital distribution with proper bleed, color profiles, and typography.

## Design Philosophy

1. **Less is More** — Luxury speaks through restraint, not excess
2. **Typography First** — The right font does 80% of the work
3. **White Space is Design** — Deliberate emptiness signals quality
4. **Print-Safe by Default** — CMYK profiles, proper bleed, 300dpi

## Supported Formats

| Format | Dimensions | Use Case |
|--------|-----------|----------|
| A5 Print | 148×210mm + 3mm bleed | Event handouts |
| A4 Print | 210×297mm + 3mm bleed | Posters |
| Instagram Post | 1080×1080px | Social media |
| Instagram Story | 1080×1920px | Stories & Reels |
| LinkedIn | 1200×627px | Professional posts |

## Luxury Palettes

Built-in palettes designed for premium aesthetics:
- **Noir & Gold** — Black, deep navy, gold accent
- **Ivory & Copper** — Cream, warm white, copper detail
- **Slate & Silver** — Charcoal, cool gray, silver highlights
- **Forest & Brass** — Deep green, natural, brass accents`,
    aiInsight: 'Flyer Luxury Generator is the easiest entry point into the design ecosystem — its foundational difficulty means anyone can produce professional-quality output.',
    tangisonRecommendation: 'Start with Flyer Luxury Generator for any event marketing. The built-in luxury palettes ensure every output looks premium without design expertise.',
    citations: ['obra-superpowers/skills/docs/flyer-gen', 'skills.sh/skills/flyer-luxury-generator', 'print-specs-cmyk-guide.pdf']
  },
  {
    id: 'skill-4',
    slug: 'seo-auditor-pro',
    title: 'SEO Auditor Pro',
    category: 'SEO',
    tagline: 'Comprehensive SEO auditing — technical, content, and competitive analysis in one pass',
    difficulty: 'INTERMEDIATE',
    installCount: 7651,
    githubStars: 1543,
    qualityScore: 92,
    isTrending: true,
    trendingDelta: 12,
    installCommand: 'npx skills-sh seo-auditor-pro',
    dependencies: ['find-skills'],
    originalAuthor: 'Pokais Tech',
    repositoryName: 'pokais-tech/skills',
    sourceUrl: 'https://github.com/pokais-tech/skills/tree/main/seo-auditor-pro',
    skillsShUrl: 'https://skills.sh/skills/seo-auditor-pro',
    license: 'MIT',
    ecosystemSource: 'POKAIS',
    usageExamples: `// Run a comprehensive SEO audit
const audit = await seoAuditorPro({
  url: "https://example.com",
  depth: "comprehensive",
  checks: ["technical", "content", "competitive", "accessibility"]
});

// Quick technical audit
const technical = await seoAuditorPro({
  url: "https://example.com",
  depth: "quick",
  checks: ["technical"]
});

// Competitive comparison
const comparison = await seoAuditorPro.compete({
  url: "https://example.com",
  competitors: ["https://competitor1.com", "https://competitor2.com"]
});`,
    relationships: [
      { type: 'complementary', target: 'find-skills', label: 'Discover SEO skill combinations' },
      { type: 'complementary', target: 'military-prompt-architect', label: 'Optimize content for SEO' }
    ],
    contentMdx: `# SEO Auditor Pro

## Overview

SEO Auditor Pro performs comprehensive, multi-dimensional SEO analysis on any website. It covers technical SEO, content quality, competitive positioning, and accessibility in a single pass.

## Audit Dimensions

1. **Technical SEO** — Core Web Vitals, crawlability, indexing, structured data
2. **Content Quality** — Keyword optimization, content depth, readability
3. **Competitive Analysis** — Compare against top-ranking competitors
4. **Accessibility** — WCAG compliance checks that impact SEO
5. **Backlink Profile** — Link quality and diversity assessment

## Output Format

Every audit produces a prioritized action list:

| Priority | Category | Issue | Impact | Effort |
|----------|----------|-------|--------|--------|
| 🔴 High | Technical | Missing meta descriptions | High | Low |
| 🟡 Medium | Content | Thin content on /services | Medium | Medium |
| 🟢 Low | Technical | Non-optimized images | Low | Low |

## Scoring

- **90-100**: Excellent — Minor optimizations only
- **70-89**: Good — Some areas need attention
- **50-69**: Fair — Significant improvements needed
- **0-49**: Poor — Major overhaul required`,
    aiInsight: 'SEO Auditor Pro from Pokais Tech has the highest accuracy rate for technical SEO issues — its structured data validation catches errors that other auditors miss.',
    tangisonRecommendation: 'Run SEO Auditor Pro before any website launch. The competitive analysis alone provides actionable insights that typically require expensive tools.',
    citations: ['pokais-tech/skills/docs/seo-auditor', 'skills.sh/skills/seo-auditor-pro', 'google-search-console-api-reference']
  }
];

const REWRITE_FUNCTIONS: RewriteFunction[] = [
  { id: 'clarity', label: 'Improve Clarity', enabled: true },
  { id: 'remove-ai', label: 'Remove AI Sounding Copy', enabled: true },
  { id: 'structure', label: 'Improve Structure', enabled: true },
  { id: 'format', label: 'Improve Formatting', enabled: true },
  { id: 'standards', label: 'Enforce Tangison Standards', enabled: false },
  { id: 'clean-code', label: 'Clean Code Enhancement', enabled: false },
  { id: 'simplify', label: 'Simplify Workflows', enabled: false },
];

const AUTOMATION_JOBS: AutomationJob[] = [
  { name: 'trending_skill_discovery', schedule: 'Every 6 hours', description: 'Scans all ecosystem sources for newly trending skills and updates the trending index' },
  { name: 'ecosystem_sync', schedule: 'Daily', description: 'Synchronizes skill metadata, install counts, and quality scores from all connected ecosystems' },
  { name: 'quality_score_refresh', schedule: 'Daily', description: 'Recalculates quality scores based on latest metrics: install count, stars, verification status' },
  { name: 'ai_skill_rewrite_refresh', schedule: 'Weekly', description: 'Re-runs AI enhancement on all skills with updated Tangison rewrite models' },
];

const SUPPORTED_ECOSYSTEMS: Ecosystem[] = [
  { name: 'Skills.sh', url: 'https://skills.sh' },
  { name: 'Vercel Labs', url: 'https://github.com/vercel-labs/skills' },
  { name: 'Anthropic', url: 'https://github.com/anthropics/skills' },
  { name: 'Pokais', url: 'https://skills.sh' },
  { name: 'Impeccable', url: 'https://skills.sh' },
  { name: 'Obra Superpowers', url: 'https://skills.sh' },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  FOUNDATIONAL: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  INTERMEDIATE: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  SOVEREIGN: 'bg-[#C56A4A]/10 text-[#C56A4A] border-[#C56A4A]/20',
};

const ECOSYSTEM_LABELS: Record<string, string> = {
  TANGISON: 'Tangison', VERCEL_LABS: 'Vercel Labs', ANTHROPIC: 'Anthropic',
  POKAIS: 'Pokais', IMPECCABLE: 'Impeccable', OBRA: 'Obra', COMMUNITY: 'Community',
};

/* ═══════════════════════════════════════════════════════════════
   CATEGORY ICON — Custom SVGs with strokeWidth="2.5"
   ═══════════════════════════════════════════════════════════════ */
function CategoryIcon({ name, className = 'w-4 h-4' }: { name: string; className?: string }) {
  const sw = 2.5;
  const icons: Record<string, React.ReactNode> = {
    Planning: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    Auditing: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
    SEO: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6" /><path d="M8 11h6" />
      </svg>
    ),
    Copywriting: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      </svg>
    ),
    Prompt: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    ImageGen: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
      </svg>
    ),
    Flyer: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
      </svg>
    ),
    Social: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    DocDesign: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    PDFGen: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-6" /><path d="M10 15h4" />
      </svg>
    ),
    Research: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    Automation: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9z" /><path d="M9 1v3" /><path d="M15 1v3" /><path d="M9 20v3" /><path d="M15 20v3" /><path d="M20 9h3" /><path d="M20 14h3" /><path d="M1 9h3" /><path d="M1 14h3" />
      </svg>
    ),
    Deployment: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    Nextjs: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 12l4-7v14" /><path d="M16 8v8" />
      </svg>
    ),
    ReactIcon: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
    TypeScriptIcon: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7v10" /><path d="M4 12h8" /><path d="M12 7v10" /><path d="M17 11c0-1.66 1.34-3 3-3h1v3h-1" /><path d="M18 21v-6" />
      </svg>
    ),
    Brand: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    Infra: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><circle cx="6" cy="6" r="1" /><circle cx="6" cy="18" r="1" />
      </svg>
    ),
  };
  return <>{icons[name] || icons['Planning']}</>;
}

/* ═══════════════════════════════════════════════════════════════
   SECTION TAG
   ═══════════════════════════════════════════════════════════════ */
const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10px] font-mono uppercase tracking-[0.2em] border-l-2 border-[#C56A4A] pl-3 py-0.5 block mb-4">
    {children}
  </span>
);

/* ═══════════════════════════════════════════════════════════════
   TERMINAL ANIMATION
   ═══════════════════════════════════════════════════════════════ */
function TerminalAnimation({ isDark }: { isDark: boolean }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const fullCommand = "npx skills find --domain='african-enterprise'";

  const canvasClass = isDark ? 'bg-[#111315] text-[#F6F4EF]' : 'bg-[#FBFBFA] text-[#111111]';
  const borderClass = isDark ? 'border-[#D9D7D2]/10' : 'border-[#EAEAEA]';
  const textMutedClass = isDark ? 'text-[#D9D7D2]/60' : 'text-[#787774]';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullCommand.length) {
        setDisplayedText(fullCommand.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowResults(true), 400);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${canvasClass} rounded-[4px] border ${borderClass} overflow-hidden shadow-2xl shadow-black/40`}>
      <div className={`flex items-center gap-2 px-4 py-2.5 border-b ${borderClass}`}>
        <div className="w-2.5 h-2.5 rounded-full bg-[#C56A4A]/60" />
        <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-[#D9D7D2]/20' : 'bg-[#787774]/20'}`} />
        <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-[#D9D7D2]/20' : 'bg-[#787774]/20'}`} />
        <span className={`ml-3 text-[10px] font-mono ${textMutedClass}`}>skills-sh — find</span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[200px]">
        <div className="flex items-center gap-2">
          <span className="text-[#C56A4A] font-bold">❯</span>
          <span>{displayedText}</span>
          {!showResults && <span className="w-2 h-4 bg-emerald-500 animate-pulse" />}
        </div>
        {showResults && (
          <div className="mt-3 space-y-1.5">
            <div className={`pl-5 ${textMutedClass}`}>[SYSTEM] Establishing sovereign connection...</div>
            <div className="pl-5 text-emerald-500/80">Scanning Vercel Labs registry... 200 OK</div>
            <div className="pl-5 text-emerald-500/80">Scanning Anthropic primitives... 200 OK</div>
            <div className="pl-5"> </div>
            <div className="pl-5 font-medium">4 optimized intelligence modules located.</div>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-[#C56A4A] font-bold">❯</span>
              <span className="w-2 h-4 bg-emerald-500 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Theme-dependent style classes
  const canvasClass = isDark ? 'bg-[#111315] text-[#F6F4EF]' : 'bg-[#FBFBFA] text-[#111111]';
  const cardClass = isDark ? 'bg-[#1A1C1E] border-[#D9D7D2]/10 hover:border-[#C56A4A]/50' : 'bg-[#FFFFFF] border-[#EAEAEA] hover:border-[#C56A4A]';
  const cardNestedClass = isDark ? 'bg-[#222426]' : 'bg-[#F7F6F3]';
  const borderClass = isDark ? 'border-[#D9D7D2]/10' : 'border-[#EAEAEA]';
  const textMutedClass = isDark ? 'text-[#D9D7D2]/60' : 'text-[#787774]';
  const textPrimaryClass = isDark ? 'text-[#F6F4EF]' : 'text-[#111111]';
  const headerClass = isDark ? 'bg-[#111315]/95 border-[#D9D7D2]/10' : 'bg-[#FFFFFF]/95 border-[#EAEAEA]';
  const footerClass = isDark ? 'bg-[#111315] border-[#D9D7D2]/10 text-[#D9D7D2]/50' : 'bg-[#FFFFFF] border-[#EAEAEA] text-[#787774]';

  // Navigation state
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'I am the Tangison SkillsCamp AI. I can help you discover, evaluate, and deploy AI agent skills. What are you building?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Skills directory filters
  const [dirSearch, setDirSearch] = useState('');
  const [dirCategory, setDirCategory] = useState('');
  const [dirDifficulty, setDirDifficulty] = useState('');

  // Skill detail tab
  const [detailTab, setDetailTab] = useState<'original' | 'enhanced'>('enhanced');

  // AI Rewrite state
  const [rewriteFunctions, setRewriteFunctions] = useState(REWRITE_FUNCTIONS);
  const [rewriteInput, setRewriteInput] = useState('');
  const [rewriteOutput, setRewriteOutput] = useState('');
  const [rewriteLoading, setRewriteLoading] = useState(false);

  // Document Creation Engine state
  const [docType, setDocType] = useState('proposal');
  const [docTitle, setDocTitle] = useState('');
  const [docSubtitle, setDocSubtitle] = useState('');
  const [docAuthor, setDocAuthor] = useState('');
  const [docSkill, setDocSkill] = useState('');
  const [docGenerating, setDocGenerating] = useState(false);

  // Cron job telemetry state
  const [cronLogs, setCronLogs] = useState<string[]>([]);
  const [cronRunning, setCronRunning] = useState(false);
  const cronLogRef = useRef<HTMLDivElement>(null);

  // System notification state
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification('Copied to clipboard');
    } catch {
      showNotification('Failed to copy');
    }
  }, [showNotification]);

  const navigate = useCallback((page: PageRoute, skillId?: string) => {
    setCurrentPage(page);
    if (skillId) setSelectedSkillId(skillId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    if (cronLogRef.current) {
      cronLogRef.current.scrollTop = cronLogRef.current.scrollHeight;
    }
  }, [cronLogs]);

  const selectedSkill = INITIAL_SKILLS.find((s) => s.id === selectedSkillId) || null;

  const filteredSkills = INITIAL_SKILLS.filter((s) => {
    if (dirSearch && !s.title.toLowerCase().includes(dirSearch.toLowerCase()) && !s.tagline.toLowerCase().includes(dirSearch.toLowerCase())) return false;
    if (dirCategory && s.category !== dirCategory) return false;
    if (dirDifficulty && s.difficulty !== dirDifficulty) return false;
    return true;
  });

  // AI Chat handler
  const handleChatSend = useCallback(async () => {
    if (!chatInput.trim() || isAiTyping) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setChatInput('');
    setIsAiTyping(true);

    // Simulated AI response based on keyword matching
    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let matchedSkill: Skill | null = null;
      if (lower.includes('seo') || lower.includes('audit')) matchedSkill = INITIAL_SKILLS.find(s => s.slug === 'seo-auditor-pro') || null;
      else if (lower.includes('prompt') || lower.includes('military')) matchedSkill = INITIAL_SKILLS.find(s => s.slug === 'military-prompt-architect') || null;
      else if (lower.includes('flyer') || lower.includes('design') || lower.includes('poster')) matchedSkill = INITIAL_SKILLS.find(s => s.slug === 'flyer-luxury-generator') || null;
      else if (lower.includes('find') || lower.includes('discover') || lower.includes('search')) matchedSkill = INITIAL_SKILLS.find(s => s.slug === 'find-skills') || null;
      else if (lower.includes('document') || lower.includes('pdf') || lower.includes('report')) matchedSkill = INITIAL_SKILLS[0];
      else matchedSkill = INITIAL_SKILLS[Math.floor(Math.random() * INITIAL_SKILLS.length)];

      const reply = matchedSkill
        ? `For that use case, I recommend **${matchedSkill.title}** — ${matchedSkill.tagline}\n\nInstall: \`${matchedSkill.installCommand}\`\n\n${matchedSkill.aiInsight}`
        : 'I can help you find the right skill. Try describing what you want to build — e.g., "I need SEO auditing" or "I want to create luxury flyers".';
      setChatMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setIsAiTyping(false);
    }, 1200 + Math.random() * 800);
  }, [chatInput, isAiTyping]);

  // AI Rewrite handler
  const handleAIRewrite = useCallback(async () => {
    if (!rewriteInput.trim()) return;
    setRewriteLoading(true);
    setRewriteOutput('');

    const enabledFns = rewriteFunctions.filter(f => f.enabled).map(f => f.id);
    const steps = enabledFns.length;

    let output = rewriteInput;

    // Simulate step-by-step rewrite
    for (let i = 0; i < steps; i++) {
      await new Promise(r => setTimeout(r, 600));
      const fn = enabledFns[i];
      if (fn === 'clarity') output = output.replace(/\bvery\b/gi, '').replace(/\breally\b/gi, '').replace(/\bbasically\b/gi, '');
      if (fn === 'remove-ai') output = output.replace(/\bleverage\b/gi, 'use').replace(/\bsynergy\b/gi, 'cooperation').replace(/\binnovative\b/gi, 'new').replace(/\bseamlessly\b/gi, '');
      if (fn === 'structure') output = `## Overview\n\n${output}\n\n## Summary\n\nRewritten with ${enabledFns.join(', ')}.`;
      if (fn === 'format') output = output.replace(/\n{3,}/g, '\n\n');
      if (fn === 'standards') output = `<!-- Tangison Enhanced -->\n${output}`;
      if (fn === 'clean-code') output = output.replace(/```(\w+)/g, '```typescript');
      if (fn === 'simplify') output = output.replace(/\bin order to\b/gi, 'to').replace(/\bdue to the fact that\b/gi, 'because');
    }

    setRewriteOutput(output);
    setRewriteLoading(false);
  }, [rewriteInput, rewriteFunctions]);

  // Cron job runner
  const runCronJob = useCallback(async (job: AutomationJob) => {
    setCronRunning(true);
    setCronLogs([]);
    const steps = [
      `[CRON] Initializing ${job.name}...`,
      `[CRON] Schedule: ${job.schedule}`,
      `[CRON] ${job.description}`,
      `[CRON] Connecting to ecosystem sources...`,
      `[CRON] Scanning Vercel Labs registry... OK`,
      `[CRON] Scanning Anthropic primitives... OK`,
      `[CRON] Scanning Pokais skills... OK`,
      `[CRON] Processing results...`,
      `[CRON] Updating local indices...`,
      `[CRON] ${job.name} completed successfully ✓`,
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 400 + Math.random() * 300));
      setCronLogs(prev => [...prev, steps[i]]);
    }
    setCronRunning(false);
    showNotification(`${job.name} completed`);
  }, [showNotification]);

  // Document generation handler
  const handleGenerateDocument = useCallback(async () => {
    if (!docTitle.trim()) return;
    setDocGenerating(true);
    await new Promise(r => setTimeout(r, 2500));
    setDocGenerating(false);
    showNotification('Document generated successfully');
  }, [docTitle, showNotification]);

  // Nav items for desktop
  const navItems: { page: PageRoute; label: string }[] = [
    { page: 'skills', label: 'Skills' },
    { page: 'categories', label: 'Categories' },
    { page: 'trending', label: 'Trending' },
    { page: 'documents', label: 'Documents' },
    { page: 'research', label: 'Triangulation' },
    { page: 'about', label: 'About' },
  ];

  if (!mounted) {
    return <div className="min-h-screen bg-[#111315]" />;
  }

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */
  return (
    <div className={`min-h-screen flex flex-col ${canvasClass} font-sans antialiased`}>
      {/* Subtle grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* ═══ SYSTEM NOTIFICATION ═══ */}
      {notification && (
        <div className={`fixed bottom-6 left-6 z-50 px-4 py-3 rounded-[2px] border ${cardClass} shadow-lg font-mono text-xs ${textPrimaryClass} animate-[fadeInUp_0.3s_ease-out]`}>
          {notification}
        </div>
      )}

      {/* ═══ HEADER ═══ */}
      <header className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-md border-b ${headerClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Wordmark */}
            <button onClick={() => navigate('home')} className="flex items-center gap-3 focus:outline-none" aria-label="Home">
              <img src="/logo.png" alt="Tangison logo" className="h-8 w-auto" style={{ objectFit: 'contain' }} />
              <div className="hidden sm:flex flex-col">
                <span className={`font-display text-sm font-bold tracking-[0.15em] ${textPrimaryClass} uppercase block leading-none`}>TΛNGISON</span>
                <span className="text-[8px] font-mono tracking-widest uppercase text-[#C56A4A] block mt-0.5">SKILLSCAMP PLATFORM</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className={`hidden md:flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest ${textMutedClass}`}>
              {navItems.map(({ page, label }) => (
                <button key={page} onClick={() => navigate(page)} className={`hover:text-[#F6F4EF] transition-colors ${currentPage === page ? 'text-[#C56A4A] font-bold' : ''}`}>
                  {label}
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`p-2 rounded-[2px] ${textMutedClass} hover:text-[#F6F4EF] border ${borderClass} transition-colors`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 ${textMutedClass} hover:text-[#F6F4EF]`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden border-t ${borderClass} py-4 space-y-1`}>
              {navItems.map(({ page, label }) => (
                <button key={page} onClick={() => navigate(page)} className={`flex items-center gap-3 w-full px-4 py-3 rounded-[2px] text-sm font-medium transition-colors ${currentPage === page ? 'text-[#C56A4A] bg-[#C56A4A]/10' : `${textMutedClass} hover:text-[#F6F4EF]`}`}>
                  <ChevronRight className="w-4 h-4" />{label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ═══ MAIN ═══ */}
      <main className="flex-1 relative z-10">

        {/* ─── HOME ─── */}
        {currentPage === 'home' && (
          <div>
            {/* HERO — Terminal animation, no ocean-view background */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  <div className="lg:col-span-7">
                    <SectionTag>TANGISON SKILLSCAMP // V1.8.0</SectionTag>
                    <h1 className={`mt-6 text-[clamp(3rem,6vw,5.5rem)] font-display leading-[1.05] tracking-tight ${textPrimaryClass}`}>
                      Intelligence <br />built on what <span className="italic font-normal text-[#C56A4A]">remains.</span>
                    </h1>
                    <p className={`mt-6 text-lg ${textMutedClass} leading-relaxed max-w-xl font-sans`}>
                      Sovereign intelligence infrastructure for African enterprise. Discover, copy, and deploy modular AI agent skills — no installation required.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest font-bold">
                      <button onClick={() => navigate('skills')} className="bg-[#C56A4A] text-[#F6F4EF] px-8 py-4 hover:bg-[#F6F4EF] hover:text-[#111315] transition-colors rounded-[2px]">Explore Skills</button>
                      <button onClick={() => navigate('categories')} className={`bg-transparent border ${borderClass} ${textPrimaryClass} px-8 py-4 hover:border-[#C56A4A] transition-colors rounded-[2px]`}>Browse Ecosystems</button>
                    </div>
                    <div className={`mt-10 flex items-center gap-6 text-xs font-mono ${textMutedClass}`}>
                      <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#C56A4A]" />{SKILL_CATEGORIES.length} categories</span>
                      <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-[#C56A4A]" />{INITIAL_SKILLS.length} verified skills</span>
                    </div>
                  </div>
                  <div className="lg:col-span-5 hidden lg:block">
                    <TerminalAnimation isDark={isDark} />
                  </div>
                </div>
              </div>
            </section>

            {/* TRENDING SKILLS */}
            <section className={`py-20 border-t ${borderClass}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <SectionTag>LIVE SIGNAL</SectionTag>
                    <h2 className={`mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-display ${textPrimaryClass}`}>Trending Now</h2>
                  </div>
                  <button onClick={() => navigate('trending')} className="text-xs font-mono uppercase text-[#C56A4A] hover:text-[#F6F4EF]">View All →</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                  {INITIAL_SKILLS.filter(s => s.isTrending).map((skill) => (
                    <button key={skill.id} onClick={() => navigate('skill_detail', skill.id)} className={`min-w-[300px] max-w-[320px] text-left p-5 border rounded-[2px] transition-all duration-200 hover:border-l-[#C56A4A] hover:border-l-2 ${cardClass}`}>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono bg-[#C56A4A]/10 text-[#C56A4A] border border-[#C56A4A]/20">{skill.category}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono border" style={{ borderColor: isDark ? 'rgba(217,215,210,0.1)' : '#EAEAEA', color: isDark ? 'rgba(217,215,210,0.7)' : '#787774' }}>{ECOSYSTEM_LABELS[skill.ecosystemSource]}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono border ${DIFFICULTY_COLORS[skill.difficulty]}`}>{skill.difficulty}</span>
                      </div>
                      <h3 className={`font-semibold text-sm mb-1 ${textPrimaryClass}`}>{skill.title}</h3>
                      <p className={`text-xs leading-relaxed mb-3 line-clamp-2 ${textMutedClass}`}>{skill.tagline}</p>
                      <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: isDark ? 'rgba(217,215,210,0.1)' : '#EAEAEA' }}>
                        <span className={`text-[10px] font-mono ${textMutedClass}`}>{skill.installCount.toLocaleString()} installs</span>
                        <button onClick={(e) => { e.stopPropagation(); copyToClipboard(skill.installCommand); }} className="inline-flex items-center gap-1 px-2 py-1 rounded-[2px] text-[10px] font-mono border bg-[#C56A4A]/10 text-[#C56A4A] border-[#C56A4A]/20 hover:bg-[#C56A4A] hover:text-[#F6F4EF] transition-colors">
                          <Copy className="w-3 h-3" />Copy
                        </button>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* CATEGORIES GRID */}
            <section className={`py-20 border-t ${borderClass}`} style={{ backgroundColor: isDark ? 'rgba(26,28,30,0.5)' : 'rgba(237,234,229,0.3)' }}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                  <SectionTag>SYSTEM CLASSIFICATION</SectionTag>
                  <h2 className={`mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-display ${textPrimaryClass}`}>Explore Domains</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {SKILL_CATEGORIES.map((cat) => (
                    <button key={cat.name} onClick={() => { setDirCategory(cat.name); navigate('skills'); }} className={`group p-5 border rounded-[2px] transition-all text-left hover:border-l-[#C56A4A] hover:border-l-2 ${cardClass}`}>
                      <div className="w-8 h-8 rounded-[2px] bg-[#16353D]/50 flex items-center justify-center mb-3 text-[#C56A4A]">
                        <CategoryIcon name={cat.icon} className="w-4 h-4" />
                      </div>
                      <span className={`block text-sm font-sans font-medium mb-1 ${textPrimaryClass}`}>{cat.name}</span>
                      <span className={`block text-[10px] font-mono ${textMutedClass}`}>{cat.count} Skills</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* ECOSYSTEM SOURCES */}
            <section className={`py-16 border-t ${borderClass}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className={`text-[10px] font-mono uppercase tracking-[0.2em] ${textMutedClass} mb-8`}>Built honestly on the open ecosystem</p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-60">
                  {SUPPORTED_ECOSYSTEMS.map((eco) => (
                    <a key={eco.name} href={eco.url} target="_blank" rel="noopener noreferrer" className={`text-sm font-display font-bold tracking-wider ${textPrimaryClass} hover:text-[#C56A4A] transition-colors uppercase`}>{eco.name}</a>
                  ))}
                </div>
              </div>
            </section>

            {/* AI CTA */}
            <section className="py-20 bg-[#16353D]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="space-y-4 max-w-xl">
                  <SectionTag>EMBEDDED INTELLIGENCE</SectionTag>
                  <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-display text-[#F6F4EF]">Ask the SkillsCamp.</h2>
                  <p className="text-sm text-[#F6F4EF]/70 leading-relaxed font-sans">Describe what you want to build. The AI finds, recommends, and installs the right skills.</p>
                </div>
                <button onClick={() => setChatOpen(true)} className="shrink-0 bg-[#F6F4EF] text-[#111315] font-mono text-xs uppercase font-bold px-8 py-5 hover:bg-[#C56A4A] hover:text-[#F6F4EF] transition-colors rounded-[2px]">Initialize AI Agent</button>
              </div>
            </section>
          </div>
        )}

        {/* ─── SKILLS DIRECTORY ─── */}
        {currentPage === 'skills' && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <SectionTag>VERIFIED CAPABILITIES</SectionTag>
                <h1 className={`mt-3 text-3xl font-display ${textPrimaryClass}`}>Skills Directory</h1>
              </div>
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 shrink-0">
                  <div className={`border rounded-[2px] p-4 space-y-6 sticky top-24 ${cardClass}`}>
                    <div>
                      <label className={`text-[10px] font-mono uppercase tracking-widest ${textMutedClass} mb-2 block`}>Search</label>
                      <input type="text" value={dirSearch} onChange={(e) => setDirSearch(e.target.value)} placeholder="Filter skills..." className={`w-full px-3 py-2 rounded-[2px] border text-sm placeholder:text-[#787774]/50 focus:outline-none focus:border-[#C56A4A]/40 font-mono ${cardNestedClass} ${borderClass} ${textPrimaryClass}`} />
                    </div>
                    <div>
                      <label className={`text-[10px] font-mono uppercase tracking-widest ${textMutedClass} mb-2 block`}>Category</label>
                      <select value={dirCategory} onChange={(e) => setDirCategory(e.target.value)} className={`w-full px-3 py-2 rounded-[2px] border text-sm font-mono ${cardNestedClass} ${borderClass} ${textPrimaryClass}`}>
                        <option value="">All Categories</option>
                        {SKILL_CATEGORIES.map((cat) => (
                          <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={`text-[10px] font-mono uppercase tracking-widest ${textMutedClass} mb-2 block`}>Difficulty Tier</label>
                      <select value={dirDifficulty} onChange={(e) => setDirDifficulty(e.target.value)} className={`w-full px-3 py-2 rounded-[2px] border text-sm font-mono ${cardNestedClass} ${borderClass} ${textPrimaryClass}`}>
                        <option value="">All Tiers</option>
                        <option value="FOUNDATIONAL">Foundational</option>
                        <option value="INTERMEDIATE">Intermediate</option>
                        <option value="SOVEREIGN">Sovereign</option>
                      </select>
                    </div>
                  </div>
                </aside>

                {/* Skill Cards Grid */}
                <div className="flex-grow">
                  <div className={`flex justify-between items-center mb-6 border-b pb-4 ${borderClass}`}>
                    <span className={`font-mono text-xs ${textMutedClass}`}>{filteredSkills.length} Verified Capabilities Found</span>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {filteredSkills.map((skill) => (
                      <button key={skill.id} onClick={() => navigate('skill_detail', skill.id)} className={`group w-full text-left p-5 border rounded-[2px] transition-all duration-200 hover:border-l-[#C56A4A] hover:border-l-2 ${cardClass}`}>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono bg-[#C56A4A]/10 text-[#C56A4A] border border-[#C56A4A]/20">{skill.category}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono border ${DIFFICULTY_COLORS[skill.difficulty]}`}>{skill.difficulty}</span>
                          </div>
                          {skill.isTrending && <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1"><ArrowRight className="w-3 h-3" />+{skill.trendingDelta}%</span>}
                        </div>
                        <h3 className={`font-semibold text-sm mb-1 group-hover:text-[#C56A4A] transition-colors ${textPrimaryClass}`}>{skill.title}</h3>
                        <p className={`text-xs leading-relaxed mb-3 line-clamp-2 ${textMutedClass}`}>{skill.tagline}</p>
                        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: isDark ? 'rgba(217,215,210,0.1)' : '#EAEAEA' }}>
                          <span className={`text-[10px] font-mono ${textMutedClass}`}>{skill.installCount.toLocaleString()} installs · ★ {skill.githubStars.toLocaleString()}</span>
                          <button onClick={(e) => { e.stopPropagation(); copyToClipboard(skill.installCommand); }} className="inline-flex items-center gap-1 px-2 py-1 rounded-[2px] text-[10px] font-mono border bg-[#C56A4A]/10 text-[#C56A4A] border-[#C56A4A]/20 hover:bg-[#C56A4A] hover:text-[#F6F4EF] transition-colors">
                            <Copy className="w-3 h-3" />Copy
                          </button>
                        </div>
                      </button>
                    ))}
                    {filteredSkills.length === 0 && (
                      <div className={`col-span-full text-center py-16 font-mono text-sm ${textMutedClass}`}>No skills found. Try a different query or ask the AI agent.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── SKILL DETAIL ─── */}
        {currentPage === 'skill_detail' && selectedSkill && (() => {
          const skill = selectedSkill;
          return (
            <section className="py-10">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 items-start">
                {/* LEFT: Metadata Sidebar */}
                <aside className={`w-full lg:w-[240px] shrink-0 border rounded-[2px] p-5 space-y-5 ${cardClass}`}>
                  <div className={`space-y-2 border-b pb-4 ${borderClass}`}>
                    <span className={`text-[9px] font-mono uppercase ${textMutedClass} block`}>Classification</span>
                    <span className="text-xs font-mono text-[#C56A4A] font-bold block">{skill.category}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono border ${DIFFICULTY_COLORS[skill.difficulty]}`}>{skill.difficulty}</span>
                  </div>
                  <div className={`space-y-3 border-b pb-4 text-xs ${borderClass}`}>
                    <div><span className={`text-[10px] font-mono uppercase ${textMutedClass} block mb-1`}>Author</span><span className={textPrimaryClass}>{skill.originalAuthor}</span></div>
                    <div><span className={`text-[10px] font-mono uppercase ${textMutedClass} block mb-1`}>Repository</span><a href={skill.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[#C56A4A] hover:underline truncate block">{skill.repositoryName}</a></div>
                    <div><span className={`text-[10px] font-mono uppercase ${textMutedClass} block mb-1`}>Skills.sh</span><a href={skill.skillsShUrl} target="_blank" rel="noopener noreferrer" className="text-[#C56A4A] hover:underline">View on skills.sh ↗</a></div>
                    <div className="flex justify-between"><span className={`text-[10px] font-mono uppercase ${textMutedClass}`}>License</span><span className={`font-mono px-1.5 py-0.5 rounded-[2px] ${cardNestedClass} ${textPrimaryClass}`}>{skill.license}</span></div>
                    <div className="flex justify-between"><span className={`text-[10px] font-mono uppercase ${textMutedClass}`}>Quality</span><span className="font-mono text-[#C56A4A]">{skill.qualityScore}/100</span></div>
                    <div className="flex justify-between"><span className={`text-[10px] font-mono uppercase ${textMutedClass}`}>Installs</span><span className={`font-mono ${textPrimaryClass}`}>{skill.installCount.toLocaleString()}</span></div>
                  </div>
                  {skill.dependencies.length > 0 && (
                    <div className={`border-t pt-4 ${borderClass}`}>
                      <span className={`text-[10px] font-mono uppercase ${textMutedClass} block mb-2`}>Dependencies</span>
                      {skill.dependencies.map((dep) => (
                        <span key={dep} className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded-[2px] mr-1 mb-1 ${cardNestedClass} ${textMutedClass}`}>{dep}</span>
                      ))}
                    </div>
                  )}
                  {skill.relationships.length > 0 && (
                    <div className={`border-t pt-4 space-y-3 ${borderClass}`}>
                      <span className={`text-[10px] font-mono uppercase ${textMutedClass} block`}>Related Skills</span>
                      {skill.relationships.slice(0, 3).map((rel, idx) => (
                        <div key={idx}>
                          <span className="text-[9px] font-mono uppercase text-[#C56A4A] bg-[#C56A4A]/10 px-1.5 py-0.5 rounded-[2px]">{rel.type.replace('_', ' ')}</span>
                          <span className={`text-sm ${textPrimaryClass} block font-medium mt-1`}>{rel.target}</span>
                          <span className={`text-xs ${textMutedClass} block`}>{rel.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </aside>

                {/* CENTER: Content */}
                <main className={`flex-grow min-w-0 border rounded-[2px] overflow-hidden ${cardClass}`}>
                  <div className={`p-8 border-b ${borderClass} relative`}>
                    <SectionTag>{ECOSYSTEM_LABELS[skill.ecosystemSource] || skill.ecosystemSource}</SectionTag>
                    <h1 className={`mt-4 text-4xl md:text-5xl font-display tracking-tight ${textPrimaryClass}`}>{skill.title}</h1>
                    <p className={`mt-3 text-sm font-sans ${textMutedClass} max-w-2xl`}>{skill.tagline}</p>
                    <div className="absolute top-8 right-8">
                      <button onClick={() => copyToClipboard(skill.contentMdx)} className="inline-flex items-center gap-2 px-4 py-2 rounded-[2px] bg-[#C56A4A] text-[#F6F4EF] font-mono text-xs uppercase font-bold hover:bg-[#F6F4EF] hover:text-[#111315] transition-colors">
                        <Copy className="w-3.5 h-3.5" />Copy as Prompt
                      </button>
                    </div>
                  </div>
                  {/* Install Command */}
                  <div className={`p-6 border-b flex flex-col sm:flex-row justify-between items-center gap-4 ${cardNestedClass} ${borderClass}`}>
                    <div className={`font-mono text-sm ${textPrimaryClass} flex items-center gap-3`}>
                      <span className="text-[#C56A4A] font-bold select-none">$</span>
                      <code>{skill.installCommand}</code>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-mono ${textMutedClass} hidden sm:inline`}>Run this in your project terminal</span>
                      <button onClick={() => copyToClipboard(skill.installCommand)} className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] text-xs font-mono border ${borderClass} hover:border-[#C56A4A]/30 transition-colors ${textPrimaryClass}`}>
                        <Copy className="w-3.5 h-3.5" />Copy
                      </button>
                    </div>
                  </div>
                  {/* Tabs + Content */}
                  <div className="p-8 space-y-6">
                    <div className={`flex gap-6 border-b pb-4 font-mono text-xs uppercase tracking-widest ${textMutedClass}`}>
                      <button onClick={() => setDetailTab('enhanced')} className={`pb-4 -mb-[17px] ${detailTab === 'enhanced' ? 'text-[#C56A4A] border-b-2 border-[#C56A4A] font-bold' : 'hover:text-[#F6F4EF]'}`}>Tangison Enhanced</button>
                      <button onClick={() => setDetailTab('original')} className={`pb-4 -mb-[17px] ${detailTab === 'original' ? 'text-[#C56A4A] border-b-2 border-[#C56A4A] font-bold' : 'hover:text-[#F6F4EF]'}`}>Original Source</button>
                    </div>
                    <div className={`border rounded-[2px] p-6 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed ${cardNestedClass} ${borderClass} ${textMutedClass}`}>
                      {detailTab === 'enhanced' ? skill.contentMdx : skill.contentMdx}
                    </div>
                    {skill.usageExamples && (
                      <div className={`pt-4 border-t ${borderClass}`}>
                        <h3 className={`font-display text-lg ${textPrimaryClass} mb-4`}>Implementation Syntax</h3>
                        <div className={`border rounded-[2px] p-6 font-mono text-xs overflow-x-auto whitespace-pre-wrap text-[#C56A4A]/80 ${cardNestedClass} ${borderClass}`}>
                          {skill.usageExamples}
                        </div>
                      </div>
                    )}
                    {skill.citations.length > 0 && (
                      <div className={`pt-4 border-t ${borderClass}`}>
                        <h3 className={`font-display text-lg ${textPrimaryClass} mb-4`}>Citations</h3>
                        <div className="space-y-2">
                          {skill.citations.map((citation, idx) => (
                            <div key={idx} className={`text-xs font-mono ${textMutedClass} flex items-center gap-2`}>
                              <span className="text-[#C56A4A]">[{idx + 1}]</span>
                              <span>{citation}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </main>

                {/* RIGHT: AI Insights */}
                <aside className="w-full lg:w-[280px] shrink-0 space-y-6">
                  <div className={`border rounded-[2px] p-5 ${cardClass}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-[#C56A4A]" />
                      <span className={`text-xs font-mono uppercase tracking-widest ${textMutedClass}`}>AI Insight</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${textPrimaryClass}`}>{skill.aiInsight}</p>
                  </div>
                  <div className={`border rounded-[2px] p-5 ${cardClass}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-[#C56A4A]" />
                      <span className={`text-xs font-mono uppercase tracking-widest ${textMutedClass}`}>Tangison Recommendation</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${textPrimaryClass}`}>{skill.tangisonRecommendation}</p>
                  </div>
                  {/* AI Rewrite Mini */}
                  <div className={`border rounded-[2px] p-5 ${cardClass}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <RefreshCw className="w-4 h-4 text-[#C56A4A]" />
                      <span className={`text-xs font-mono uppercase tracking-widest ${textMutedClass}`}>AI Rewrite</span>
                    </div>
                    <div className="space-y-2 mb-3">
                      {rewriteFunctions.map((fn) => (
                        <label key={fn.id} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={fn.enabled} onChange={(e) => setRewriteFunctions(prev => prev.map(f => f.id === fn.id ? { ...f, enabled: e.target.checked } : f))} className="rounded border-[#C56A4A] text-[#C56A4A]" />
                          <span className={`text-[11px] font-mono ${textMutedClass}`}>{fn.label}</span>
                        </label>
                      ))}
                    </div>
                    <textarea value={rewriteInput} onChange={(e) => setRewriteInput(e.target.value)} placeholder="Paste content to rewrite..." className={`w-full h-20 px-3 py-2 rounded-[2px] border text-xs font-mono resize-none placeholder:text-[#787774]/50 focus:outline-none focus:border-[#C56A4A]/40 ${cardNestedClass} ${borderClass} ${textPrimaryClass}`} />
                    <button onClick={handleAIRewrite} disabled={rewriteLoading} className="mt-2 w-full px-4 py-2 rounded-[2px] bg-[#C56A4A] text-[#F6F4EF] font-mono text-xs uppercase font-bold hover:bg-[#F6F4EF] hover:text-[#111315] transition-colors disabled:opacity-50">
                      {rewriteLoading ? 'Rewriting...' : 'Rewrite'}
                    </button>
                    {rewriteOutput && (
                      <div className={`mt-3 p-3 border rounded-[2px] text-xs font-mono whitespace-pre-wrap ${cardNestedClass} ${borderClass} ${textPrimaryClass}`}>
                        {rewriteOutput}
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            </section>
          );
        })()}

        {/* ─── CATEGORIES ─── */}
        {currentPage === 'categories' && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <SectionTag>SYSTEM CLASSIFICATION</SectionTag>
                <h1 className={`mt-3 text-3xl font-display ${textPrimaryClass}`}>All Categories</h1>
                <p className={`mt-2 text-sm ${textMutedClass}`}>{SKILL_CATEGORIES.length} domains of sovereign intelligence</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {SKILL_CATEGORIES.map((cat) => (
                  <button key={cat.name} onClick={() => { setDirCategory(cat.name); navigate('skills'); }} className={`group p-6 border rounded-[2px] transition-all text-left hover:border-[#C56A4A]/50 ${cardClass}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-[2px] bg-[#16353D]/50 flex items-center justify-center text-[#C56A4A]">
                        <CategoryIcon name={cat.icon} className="w-5 h-5" />
                      </div>
                      <div>
                        <span className={`block text-sm font-semibold ${textPrimaryClass}`}>{cat.name}</span>
                        <span className={`block text-[10px] font-mono ${textMutedClass}`}>{cat.count} Skills</span>
                      </div>
                    </div>
                    <div className={`text-xs ${textMutedClass} leading-relaxed`}>
                      Explore {cat.count} verified skills in the {cat.name.toLowerCase()} domain.
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── TRENDING ─── */}
        {currentPage === 'trending' && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <SectionTag>LIVE SIGNAL</SectionTag>
                <h1 className={`mt-3 text-3xl font-display ${textPrimaryClass}`}>Top Trending Capabilities</h1>
                <p className={`mt-2 text-sm ${textMutedClass}`}>Skills gaining momentum across the ecosystem</p>
              </div>
              <div className="space-y-3">
                {[...INITIAL_SKILLS].sort((a, b) => b.trendingDelta - a.trendingDelta).map((skill, idx) => (
                  <button key={skill.id} onClick={() => navigate('skill_detail', skill.id)} className={`group w-full flex items-center gap-6 p-5 border rounded-[2px] transition-all text-left hover:border-[#C56A4A]/50 ${cardClass}`}>
                    <span className={`text-3xl font-display font-bold w-12 text-center ${idx === 0 ? 'text-[#C56A4A]' : textMutedClass}`}>{idx + 1}</span>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className={`font-semibold ${textPrimaryClass}`}>{skill.title}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono border ${DIFFICULTY_COLORS[skill.difficulty]}`}>{skill.difficulty}</span>
                      </div>
                      <p className={`text-sm ${textMutedClass} truncate`}>{skill.tagline}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-emerald-500 text-sm font-mono font-bold flex items-center gap-1 justify-end">
                        <ArrowRight className="w-3.5 h-3.5" />+{skill.trendingDelta}%
                      </div>
                      <div className={`text-[10px] font-mono ${textMutedClass}`}>{skill.installCount.toLocaleString()} installs</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── DOCUMENTS ─── */}
        {currentPage === 'documents' && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <SectionTag>DOCUMENT CREATION ENGINE</SectionTag>
                <h1 className={`mt-3 text-3xl font-display ${textPrimaryClass}`}>Create Documents</h1>
                <p className={`mt-2 text-sm ${textMutedClass}`}>Generate branded documents with AI-powered content and layout</p>
              </div>
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Configurator */}
                <div className="w-full lg:w-[360px] shrink-0">
                  <div className={`border rounded-[2px] p-6 space-y-5 sticky top-24 ${cardClass}`}>
                    <div>
                      <label className={`text-[10px] font-mono uppercase tracking-widest ${textMutedClass} mb-2 block`}>Document Type</label>
                      <select value={docType} onChange={(e) => setDocType(e.target.value)} className={`w-full px-3 py-2.5 rounded-[2px] border text-sm font-mono ${cardNestedClass} ${borderClass} ${textPrimaryClass}`}>
                        <option value="proposal">Proposal</option>
                        <option value="report">Report</option>
                        <option value="research_document">Research Document</option>
                        <option value="business_plan">Business Plan</option>
                        <option value="company_profile">Company Profile</option>
                        <option value="pitch_deck">Pitch Deck</option>
                        <option value="technical_documentation">Technical Documentation</option>
                      </select>
                    </div>
                    <div>
                      <label className={`text-[10px] font-mono uppercase tracking-widest ${textMutedClass} mb-2 block`}>Title</label>
                      <input type="text" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} placeholder="Document title..." className={`w-full px-3 py-2.5 rounded-[2px] border text-sm font-mono placeholder:text-[#787774]/50 focus:outline-none focus:border-[#C56A4A]/40 ${cardNestedClass} ${borderClass} ${textPrimaryClass}`} />
                    </div>
                    <div>
                      <label className={`text-[10px] font-mono uppercase tracking-widest ${textMutedClass} mb-2 block`}>Subtitle</label>
                      <input type="text" value={docSubtitle} onChange={(e) => setDocSubtitle(e.target.value)} placeholder="Optional subtitle..." className={`w-full px-3 py-2.5 rounded-[2px] border text-sm font-mono placeholder:text-[#787774]/50 focus:outline-none focus:border-[#C56A4A]/40 ${cardNestedClass} ${borderClass} ${textPrimaryClass}`} />
                    </div>
                    <div>
                      <label className={`text-[10px] font-mono uppercase tracking-widest ${textMutedClass} mb-2 block`}>Author</label>
                      <input type="text" value={docAuthor} onChange={(e) => setDocAuthor(e.target.value)} placeholder="Author name..." className={`w-full px-3 py-2.5 rounded-[2px] border text-sm font-mono placeholder:text-[#787774]/50 focus:outline-none focus:border-[#C56A4A]/40 ${cardNestedClass} ${borderClass} ${textPrimaryClass}`} />
                    </div>
                    <div>
                      <label className={`text-[10px] font-mono uppercase tracking-widest ${textMutedClass} mb-2 block`}>Skill Integration</label>
                      <select value={docSkill} onChange={(e) => setDocSkill(e.target.value)} className={`w-full px-3 py-2.5 rounded-[2px] border text-sm font-mono ${cardNestedClass} ${borderClass} ${textPrimaryClass}`}>
                        <option value="">None</option>
                        {INITIAL_SKILLS.map((s) => (
                          <option key={s.id} value={s.slug}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                    <button onClick={handleGenerateDocument} disabled={docGenerating || !docTitle.trim()} className="w-full px-4 py-3 rounded-[2px] bg-[#C56A4A] text-[#F6F4EF] font-mono text-xs uppercase font-bold hover:bg-[#F6F4EF] hover:text-[#111315] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                      {docGenerating ? (
                        <><RefreshCw className="w-3.5 h-3.5 animate-spin" />Generating...</>
                      ) : (
                        <><FileDown className="w-3.5 h-3.5" />Generate Document</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right: Preview Canvas */}
                <div className="flex-grow">
                  <div className={`border rounded-[2px] overflow-hidden ${cardClass}`}>
                    <div className={`flex items-center justify-between p-4 border-b ${borderClass}`}>
                      <span className={`text-xs font-mono uppercase tracking-widest ${textMutedClass}`}>Preview</span>
                      <div className="flex items-center gap-2">
                        <Eye className={`w-3.5 h-3.5 ${textMutedClass}`} />
                        <span className={`text-[10px] font-mono ${textMutedClass}`}>3 pages</span>
                      </div>
                    </div>
                    {/* Page 1: Cover */}
                    <div className={`mx-8 mt-6 mb-4 border rounded-[2px] aspect-[8.5/11] p-8 flex flex-col justify-between relative overflow-hidden ${cardNestedClass} ${borderClass}`}>
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C56A4A]" />
                      <div>
                        <img src="/logo.png" alt="Logo" className="h-8 w-auto mb-8" style={{ objectFit: 'contain', filter: isDark ? 'brightness(0.9)' : 'none' }} />
                        <div className={`text-[10px] font-mono uppercase tracking-[0.2em] ${textMutedClass} mb-4`}>{docType.replace('_', ' ')} — Tangison SkillsCamp</div>
                        <h2 className={`text-2xl font-display ${textPrimaryClass} mb-2`}>{docTitle || 'Untitled Document'}</h2>
                        <p className={`text-sm ${textMutedClass}`}>{docSubtitle || 'Subtitle goes here'}</p>
                      </div>
                      <div className={`text-xs font-mono ${textMutedClass}`}>
                        {docAuthor || 'Author'} · {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </div>
                    </div>
                    {/* Page 2: Table of Contents */}
                    <div className={`mx-8 mb-4 border rounded-[2px] aspect-[8.5/11] p-8 ${cardNestedClass} ${borderClass}`}>
                      <h3 className={`text-sm font-mono uppercase tracking-widest ${textMutedClass} mb-6`}>Table of Contents</h3>
                      <div className="space-y-3">
                        {['1. Executive Summary', '2. Analysis & Findings', '3. Methodology', '4. Recommendations', '5. Appendices'].map((item) => (
                          <div key={item} className={`flex items-center justify-between text-sm ${textPrimaryClass}`}>
                            <span>{item}</span>
                            <span className={`text-xs font-mono ${textMutedClass}`}>{Math.floor(Math.random() * 10) + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Page 3: Content */}
                    <div className={`mx-8 mb-8 border rounded-[2px] aspect-[8.5/11] p-8 ${cardNestedClass} ${borderClass}`}>
                      <h3 className={`text-sm font-mono uppercase tracking-widest ${textMutedClass} mb-4`}>1. Executive Summary</h3>
                      <div className={`text-xs leading-relaxed ${textMutedClass} space-y-3`}>
                        <p>This document was generated by the Tangison SkillsCamp Document Creation Engine. The content is structured according to the {docType.replace('_', ' ')} template with Tangison brand standards.</p>
                        <p>AI-enhanced content generation ensures clarity, removes AI-sounding copy, and enforces structural standards across all document types.</p>
                        <p>Each document includes cover page, table of contents, page numbering, header/footer system, and brand-consistent typography.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── RESEARCH (TRIANGULATION) ─── */}
        {currentPage === 'research' && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <SectionTag>DEEP RESEARCH TRIANGULATION</SectionTag>
                <h1 className={`mt-3 text-3xl font-display ${textPrimaryClass}`}>Research Triangulation</h1>
                <p className={`mt-2 text-sm ${textMutedClass}`}>Multi-source verification and citation tracking</p>
              </div>

              {/* Triangulation Process */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { step: '01', title: 'Source Discovery', desc: 'Search across academic, news, primary, and reference sources', icon: Globe },
                  { step: '02', title: 'Cross-Verification', desc: 'Validate claims across independent sources with confidence scoring', icon: Layers },
                  { step: '03', title: 'Synthesis', desc: 'Produce coherent narrative with inline citations and confidence levels', icon: BookOpen },
                ].map((item) => (
                  <div key={item.step} className={`border rounded-[2px] p-6 ${cardClass}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-[2px] bg-[#16353D]/50 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-[#C56A4A]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#C56A4A]">STEP {item.step}</span>
                        <h3 className={`font-semibold ${textPrimaryClass}`}>{item.title}</h3>
                      </div>
                    </div>
                    <p className={`text-sm ${textMutedClass} leading-relaxed`}>{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Confidence Levels */}
              <div className={`border rounded-[2px] p-6 mb-12 ${cardClass}`}>
                <h3 className={`font-display text-lg ${textPrimaryClass} mb-4`}>Confidence Levels</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { level: 'High', desc: '3+ independent sources agree', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
                    { level: 'Medium', desc: '2 sources agree', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
                    { level: 'Low', desc: 'Single source', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
                    { level: 'Disputed', desc: 'Sources disagree', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
                  ].map((conf) => (
                    <div key={conf.level} className={`p-4 border rounded-[2px] ${conf.color}`}>
                      <span className="font-mono text-xs font-bold uppercase">{conf.level}</span>
                      <p className="text-[10px] mt-1 opacity-70">{conf.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cron Job Telemetry */}
              <div className={`border rounded-[2px] p-6 ${cardClass}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C56A4A]" />
                    <h3 className={`font-display text-lg ${textPrimaryClass}`}>Automation Telemetry</h3>
                  </div>
                  <span className={`text-[10px] font-mono ${textMutedClass}`}>{AUTOMATION_JOBS.length} cron jobs</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {AUTOMATION_JOBS.map((job) => (
                    <div key={job.name} className={`border rounded-[2px] p-4 ${cardNestedClass} ${borderClass}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-mono font-bold ${textPrimaryClass}`}>{job.name}</span>
                        <button onClick={() => runCronJob(job)} disabled={cronRunning} className="px-3 py-1 rounded-[2px] bg-[#C56A4A] text-[#F6F4EF] font-mono text-[10px] uppercase font-bold hover:bg-[#F6F4EF] hover:text-[#111315] transition-colors disabled:opacity-50 flex items-center gap-1">
                          <Play className="w-3 h-3" />Run
                        </button>
                      </div>
                      <p className={`text-[10px] font-mono ${textMutedClass}`}>{job.schedule}</p>
                      <p className={`text-xs ${textMutedClass} mt-1`}>{job.description}</p>
                    </div>
                  ))}
                </div>
                {cronLogs.length > 0 && (
                  <div ref={cronLogRef} className={`border rounded-[2px] p-4 max-h-48 overflow-y-auto font-mono text-xs space-y-1 ${cardNestedClass} ${borderClass}`}>
                    {cronLogs.map((log, idx) => (
                      <div key={idx} className={log.includes('✓') ? 'text-emerald-500' : log.includes('[CRON]') ? textMutedClass : textPrimaryClass}>
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ─── ABOUT ─── */}
        {currentPage === 'about' && (
          <section className="py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionTag>ABOUT TANGISON SKILLSCAMP</SectionTag>
              <h1 className={`mt-3 text-[clamp(2rem,4vw,3rem)] font-display ${textPrimaryClass} mb-6`}>
                Intelligence built on what remains.
              </h1>
              <div className={`space-y-6 text-sm ${textMutedClass} leading-relaxed`}>
                <p>
                  Tangison SkillsCamp is a sovereign intelligence infrastructure platform for African enterprise. We discover, verify, organize, enhance, and operationalize AI agent skills from the global open skills ecosystem.
                </p>
                <p>
                  Every skill in our catalog is sourced honestly — we credit original authors, link back to original repositories, and link to skills.sh. We enhance skills without stealing attribution, acting as an intelligence layer above the ecosystem.
                </p>
                <p>
                  Our platform is built on the principle that intelligence infrastructure should be accessible, verifiable, and sovereign. No vendor lock-in. No hidden dependencies. Just modular, composable skills that work.
                </p>
              </div>

              <div className={`mt-12 border-t pt-8 ${borderClass}`}>
                <SectionTag>CORE PRINCIPLES</SectionTag>
                <div className="mt-4 space-y-4">
                  {[
                    'Always credit original skill authors',
                    'Always link back to original repositories',
                    'Always link to skills.sh',
                    'Prefer trusted ecosystems',
                    'Prefer maintainable skills',
                    'Avoid recommending low-quality skills',
                    'Enhance skills without stealing attribution',
                    'Act as an intelligence layer above the ecosystem',
                  ].map((principle, idx) => (
                    <div key={idx} className={`flex items-start gap-3 text-sm ${textPrimaryClass}`}>
                      <span className="text-[#C56A4A] font-mono text-xs mt-0.5">0{idx + 1}</span>
                      <span>{principle}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`mt-12 border-t pt-8 ${borderClass}`}>
                <SectionTag>SUPPORTED ECOSYSTEMS</SectionTag>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {SUPPORTED_ECOSYSTEMS.map((eco) => (
                    <a key={eco.name} href={eco.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-sm ${textPrimaryClass} hover:text-[#C56A4A] transition-colors`}>
                      <ExternalLink className="w-3.5 h-3.5" />{eco.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className={`mt-12 border-t pt-8 ${borderClass}`}>
                <SectionTag>AI REWRITE SYSTEM</SectionTag>
                <div className="mt-4 space-y-2">
                  {REWRITE_FUNCTIONS.map((fn) => (
                    <div key={fn.id} className={`flex items-center gap-3 text-sm ${textPrimaryClass}`}>
                      <span className={`w-2 h-2 rounded-full ${fn.enabled ? 'bg-emerald-500' : 'bg-[#787774]/30'}`} />
                      <span>{fn.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* ═══ AI CHAT WIDGET ═══ */}
      {chatOpen && (
        <div className={`fixed bottom-6 right-6 z-50 w-[360px] max-h-[520px] border rounded-[4px] shadow-2xl shadow-black/30 flex flex-col animate-[fadeInUp_0.3s_ease-out] ${cardClass}`}>
          {/* Chat Header */}
          <div className={`flex items-center justify-between p-4 border-b ${borderClass}`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`text-xs font-mono uppercase tracking-widest ${textPrimaryClass}`}>SkillsCamp AI</span>
            </div>
            <button onClick={() => setChatOpen(false)} className={`${textMutedClass} hover:text-[#F6F4EF]`}>
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3 max-h-[360px]">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`text-xs leading-relaxed ${msg.role === 'assistant' ? textPrimaryClass : `${textMutedClass} text-right`}`}>
                <div className={`inline-block max-w-[85%] p-3 rounded-[4px] ${msg.role === 'assistant' ? `${cardNestedClass} ${borderClass} border` : 'bg-[#C56A4A]/10 border border-[#C56A4A]/20'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isAiTyping && (
              <div className={`text-xs ${textMutedClass}`}>
                <div className={`inline-block p-3 rounded-[4px] ${cardNestedClass} ${borderClass} border`}>
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          {/* Chat Input */}
          <div className={`flex items-center gap-2 p-3 border-t ${borderClass}`}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
              placeholder="Ask about skills..."
              className={`flex-grow px-3 py-2 rounded-[2px] text-xs font-mono placeholder:text-[#787774]/50 focus:outline-none ${cardNestedClass} ${textPrimaryClass}`}
            />
            <button onClick={handleChatSend} disabled={isAiTyping || !chatInput.trim()} className="p-2 rounded-[2px] bg-[#C56A4A] text-[#F6F4EF] hover:bg-[#F6F4EF] hover:text-[#111315] transition-colors disabled:opacity-50">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Chat toggle button (when chat is closed) */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#C56A4A] text-[#F6F4EF] shadow-lg hover:bg-[#F6F4EF] hover:text-[#111315] transition-colors flex items-center justify-center animate-[fadeInUp_0.3s_ease-out]"
          aria-label="Open AI Chat"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      )}

      {/* ═══ FOOTER ═══ */}
      <footer className={`border-t ${footerClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            {/* Logo ONLY - large and standing out, NO wordmark */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <img
                src="/logo.png"
                alt="Tangison logo"
                className="h-16 w-auto"
                style={{ objectFit: 'contain', filter: isDark ? 'brightness(0.85) drop-shadow(0 0 8px rgba(197,106,74,0.3))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
              />
              <span className={`font-mono text-[9px] uppercase tracking-[0.25em] font-bold ${isDark ? 'text-[#F6F4EF]' : 'text-[#111111]'}`}>Sovereign Enclave Platform</span>
            </div>

            {/* Platform Links */}
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-mono uppercase tracking-widest">
              <button onClick={() => navigate('skills')} className="hover:text-[#C56A4A] transition-colors">Skills</button>
              <button onClick={() => navigate('categories')} className="hover:text-[#C56A4A] transition-colors">Categories</button>
              <button onClick={() => navigate('trending')} className="hover:text-[#C56A4A] transition-colors">Trending</button>
              <button onClick={() => navigate('documents')} className="hover:text-[#C56A4A] transition-colors">Documents</button>
              <button onClick={() => navigate('research')} className="hover:text-[#C56A4A] transition-colors">Triangulation</button>
              <button onClick={() => navigate('about')} className="hover:text-[#C56A4A] transition-colors">About</button>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-widest">
              <a href="https://skills.sh" target="_blank" rel="noopener noreferrer" className="hover:text-[#C56A4A] transition-colors">Skills.sh</a>
              <a href="https://github.com/vercel-labs/skills" target="_blank" rel="noopener noreferrer" className="hover:text-[#C56A4A] transition-colors">GitHub</a>
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>

          <div className={`mt-8 pt-6 border-t ${borderClass} flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-widest`}>
            <div className="flex items-center gap-4">
              <span className="text-[#C56A4A] font-bold">Windhoek, Namibia // Node</span>
              <span className={textMutedClass}>Tangison Agency</span>
              <span className="text-emerald-500 font-bold">AI-Powered</span>
            </div>
            <span>© 2026 TANGISON GROUP. ALL RIGHTS SECURED.</span>
          </div>
        </div>
      </footer>

      {/* ═══ ANIMATION KEYFRAMES ═══ */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
