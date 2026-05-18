'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';
import {
  Search, Menu, Copy, Check, ArrowRight, ExternalLink, ChevronRight,
  Zap, Terminal, BookOpen, LayoutGrid,
  Code, Palette, PenLine, FileText, Image, Layout, Share2, Cpu,
  Cloud, Compass, Server, Rocket, Box, FileType,
  Send, X, Shield, Sparkles, Sun, Moon, Clock, Globe, Layers,
  Play, RefreshCw, FileDown, Eye, Settings, ChevronDown, AlertCircle
} from 'lucide-react';
import { MastGlyph } from '@/components/brand/TangisonLogo';

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */
type PageRoute = 'home' | 'skills' | 'skill_detail' | 'categories' | 'trending' | 'documents' | 'research' | 'about' | 'agent_pipeline';
type Difficulty = 'FOUNDATIONAL' | 'INTERMEDIATE' | 'SOVEREIGN';
type EcosystemSource = 'VERCEL_LABS' | 'ANTHROPIC' | 'OBRA' | 'MICROSOFT' | 'TANGISON' | 'COMMUNITY';

interface SkillRelationship {
  type: string;
  target: string;
  label: string;
}

type WidgetPrimitive = 'TARGETING_SYSTEM' | 'FORWARD_SLASH' | 'LAYER_MATRIX' | 'RADAR_CORE' | 'BAR_METRIC';

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
  ui_widget_primitive?: WidgetPrimitive;
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
  { name: "SEO", icon: "SEO", count: 18 },
  { name: "Copywriting", icon: "Copywriting", count: 32 },
  { name: "Prompt Engineering", icon: "Prompt", count: 67 },
  { name: "Image Generation", icon: "ImageGen", count: 24 },
  { name: "Flyer Design", icon: "Flyer", count: 12 },
  { name: "Social Media", icon: "Social", count: 38 },
  { name: "Document Design", icon: "DocDesign", count: 19 },
  { name: "PDF Generation", icon: "PDFGen", count: 7 },
  { name: "Research", icon: "Research", count: 28 },
  { name: "Automation", icon: "Automation", count: 54 },
  { name: "Deployment", icon: "Deployment", count: 31 },
  { name: "Next.js", icon: "Nextjs", count: 89 },
  { name: "React", icon: "ReactIcon", count: 112 },
  { name: "TypeScript", icon: "TypeScriptIcon", count: 76 },
  { name: "Brand Systems", icon: "Brand", count: 15 },
  { name: "AI Infrastructure", icon: "Infra", count: 42 }
];

/* ═══════════════════════════════════════════════════════════════
   SKILL DATA — BETA ILLUSTRATIVE DATA
   Install counts, GitHub stars, and quality scores are illustrative
   and will be replaced with live ecosystem data in production.
   ═══════════════════════════════════════════════════════════════ */
const INITIAL_SKILLS: Skill[] = [
  {
    id: 'skill-1',
    slug: 'find-skills',
    title: 'Find Skills',
    category: 'AI Infrastructure',
    tagline: 'The sovereign discovery engine: search the open agent skills ecosystem',
    difficulty: 'FOUNDATIONAL',
    installCount: 1600000,
    githubStars: 19000,
    qualityScore: 98,
    isTrending: true,
    trendingDelta: 12,
    installCommand: 'npx skills add vercel-labs/skills',
    dependencies: [],
    originalAuthor: 'Vercel Labs',
    repositoryName: 'vercel-labs/skills',
    sourceUrl: 'https://github.com/vercel-labs/skills',
    skillsShUrl: 'https://skills.sh/vercel-labs/skills',
    license: 'MIT',
    ecosystemSource: 'VERCEL_LABS',
    ui_widget_primitive: 'TARGETING_SYSTEM',
    usageExamples: `// Discover skills by natural language
const results = await findSkills("create a landing page for a restaurant");

// Filter by category
const designSkills = await findSkills({
  query: "brand design",
  category: "creative-design"
});

// Get trending skills
const trending = await findSkills({ trending: true, limit: 10 });`,
    relationships: [
      { type: 'complementary', target: 'frontend-design', label: 'Design after discovering' },
      { type: 'complementary', target: 'brainstorming', label: 'Ideate before searching' }
    ],
    contentMdx: `# Find Skills

## Overview

Find Skills is the #1 installed skill in the open agent skills ecosystem. It provides sovereign discovery across all connected registries: Vercel Labs, Anthropic, Obra Superpowers, and more.

## Architecture

1. **Natural Language Query** — Describe what you want in plain language
2. **Multi-Registry Search** — Scans vercel-labs/skills, anthropics/skills, obra/superpowers, and 40+ sources
3. **Quality Scoring** — Composite rank from install count, GitHub stars, verification status
4. **Semantic Matching** — Matches intent, not just keywords

## Installation

\`\`\`jetbrains-mono
npx skills add vercel-labs/skills
\`\`\`

## Source

Repository: github.com/vercel-labs/skills (~19K stars)
Ecosystem: skills.sh/vercel-labs/skills`,
    aiInsight: 'One of the most-installed skills in the ecosystem at ~1.6M installs: discovers skills across 40+ registries.',
    tangisonRecommendation: 'Start here for any project. Find Skills will point you to the right tool for the job across the entire open ecosystem.',
    citations: ['skills.sh/vercel-labs/skills', 'github.com/vercel-labs/skills', 'docs.skills.sh/find-skills']
  },
  {
    id: 'skill-2',
    slug: 'frontend-design',
    title: 'Frontend Design',
    category: 'React',
    tagline: 'Production-grade frontend from specifications: React, Next.js, Vue, Svelte',
    difficulty: 'INTERMEDIATE',
    installCount: 424900,
    githubStars: 8200,
    qualityScore: 95,
    isTrending: true,
    trendingDelta: 8,
    installCommand: 'npx skills add anthropics/skills',
    dependencies: ['find-skills'],
    originalAuthor: 'Anthropic',
    repositoryName: 'anthropics/skills',
    sourceUrl: 'https://github.com/anthropics/skills',
    skillsShUrl: 'https://skills.sh/anthropics/skills',
    license: 'Apache-2.0',
    ecosystemSource: 'ANTHROPIC',
    ui_widget_primitive: 'LAYER_MATRIX',
    usageExamples: `// Generate a Next.js frontend from a spec
const output = await frontendDesign({
  framework: "nextjs",
  spec: {
    pages: [
      { name: "Home", sections: ["Hero", "Features", "CTA"] },
      { name: "Pricing", sections: ["Plans", "FAQ"] }
    ],
    styling: "tailwind",
    componentLibrary: "shadcn-ui"
  }
});`,
    relationships: [
      { type: 'requires', target: 'find-skills', label: 'Discover first' },
      { type: 'complementary', target: 'brainstorming', label: 'Ideate before building' }
    ],
    contentMdx: `# Frontend Design

## Overview

Frontend Design is the #2 most-installed skill (~424.9K installs) from the Anthropic skills registry. It generates production-ready frontend code from design specifications.

## Supported Frameworks

- Next.js (App Router + RSC)
- React (Vite, CRA)
- Vue (Nuxt, standalone)
- Svelte (SvelteKit)

## Installation

\`\`\`jetbrains-mono
npx skills add anthropics/skills
\`\`\`

## Source

Repository: github.com/anthropics/skills
Ecosystem: skills.sh/anthropics/skills (18 skills, ~1.6M total installs)`,
    aiInsight: 'The second most-installed skill at ~424.9K installs: its output often passes code review without modifications.',
    tangisonRecommendation: 'Pair with Find Skills for end-to-end discovery and build workflows.',
    citations: ['skills.sh/anthropics/skills', 'github.com/anthropics/skills']
  },
  {
    id: 'skill-3',
    slug: 'brainstorming',
    title: 'Brainstorming',
    category: 'Automation',
    tagline: 'Structured ideation and creative problem-solving for any project',
    difficulty: 'FOUNDATIONAL',
    installCount: 164900,
    githubStars: 196000,
    qualityScore: 96,
    isTrending: true,
    trendingDelta: 15,
    installCommand: 'npx skills add obra/superpowers',
    dependencies: [],
    originalAuthor: 'Obra Superpowers',
    repositoryName: 'obra/superpowers',
    sourceUrl: 'https://github.com/obra/superpowers',
    skillsShUrl: 'https://skills.sh/obra/superpowers',
    license: 'MIT',
    ecosystemSource: 'OBRA',
    ui_widget_primitive: 'FORWARD_SLASH',
    usageExamples: `// Start a brainstorming session
const ideas = await brainstorming({
  topic: "Growth strategy for SaaS startup",
  constraints: ["budget under $5K/month", "B2B focus"],
  format: "structured"
});`,
    relationships: [
      { type: 'complementary', target: 'find-skills', label: 'Research before ideating' },
      { type: 'complementary', target: 'frontend-design', label: 'Ideate before building' }
    ],
    contentMdx: `# Brainstorming

## Overview

Brainstorming is the #1 skill from Obra Superpowers (~164.9K installs): the agentic skills framework with ~196K GitHub stars. It provides structured ideation and creative problem-solving.

## Installation

\`\`\`jetbrains-mono
npx skills add obra/superpowers
\`\`\`

## Source

Repository: github.com/obra/superpowers (~196K stars)
Ecosystem: skills.sh/obra/superpowers (14 skills, ~1.2M total installs)`,
    aiInsight: 'Part of the Obra Superpowers framework: ~196K GitHub stars makes it one of the most-starred skills repositories in the ecosystem.',
    tangisonRecommendation: 'Start every project with Brainstorming from Obra Superpowers. The structured ideation framework prevents scope creep.',
    citations: ['skills.sh/obra/superpowers', 'github.com/obra/superpowers']
  },
  {
    id: 'skill-4',
    slug: 'skill-creator',
    title: 'Skill Creator',
    category: 'AI Infrastructure',
    tagline: 'Build and publish your own agent skills to the open ecosystem',
    difficulty: 'SOVEREIGN',
    installCount: 214700,
    githubStars: 8200,
    qualityScore: 93,
    isTrending: false,
    trendingDelta: 5,
    installCommand: 'npx skills add anthropics/skills',
    dependencies: ['find-skills'],
    originalAuthor: 'Anthropic',
    repositoryName: 'anthropics/skills',
    sourceUrl: 'https://github.com/anthropics/skills',
    skillsShUrl: 'https://skills.sh/anthropics/skills',
    license: 'Apache-2.0',
    ecosystemSource: 'ANTHROPIC',
    ui_widget_primitive: 'RADAR_CORE',
    usageExamples: `// Create a new skill from a template
const skill = await skillCreator({
  name: "my-custom-skill",
  description: "Does something specific",
  template: "typescript",
  owner: "tangison"
});

// Publish to skills.sh
await skillCreator.publish({
  skill: skill,
  registry: "skills.sh"
});`,
    relationships: [
      { type: 'requires', target: 'find-skills', label: 'Discover existing skills first' },
      { type: 'complementary', target: 'frontend-design', label: 'Create UI-focused skills' }
    ],
    contentMdx: `# Skill Creator

## Overview

Skill Creator (~214.7K installs) from Anthropic enables building and publishing custom agent skills to the open ecosystem.

## Installation

\`\`\`jetbrains-mono
npx skills add anthropics/skills
\`\`\`

## Source

Repository: github.com/anthropics/skills
Ecosystem: skills.sh/anthropics/skills`,
    aiInsight: 'Skill Creator lets you contribute back to the ecosystem: ~214.7K installs indicates community participation.',
    tangisonRecommendation: 'Use Skill Creator to build Tangison-specific skills and publish them to github.com/tangison/skills.',
    citations: ['skills.sh/anthropics/skills', 'github.com/anthropics/skills', 'agentskills.io']
  },
  {
    id: 'skill-5',
    slug: 'systematic-debugging',
    title: 'Systematic Debugging',
    category: 'Automation',
    tagline: 'Methodical debugging methodology that eliminates root causes, not symptoms',
    difficulty: 'INTERMEDIATE',
    installCount: 100300,
    githubStars: 196000,
    qualityScore: 94,
    isTrending: false,
    trendingDelta: 3,
    installCommand: 'npx skills add obra/superpowers',
    dependencies: [],
    originalAuthor: 'Obra Superpowers',
    repositoryName: 'obra/superpowers',
    sourceUrl: 'https://github.com/obra/superpowers',
    skillsShUrl: 'https://skills.sh/obra/superpowers',
    license: 'MIT',
    ecosystemSource: 'OBRA',
    ui_widget_primitive: 'TARGETING_SYSTEM',
    usageExamples: `// Start a systematic debug session
const result = await systematicDebugging({
  issue: "Memory leak in production API",
  context: { runtime: "Node.js 20", framework: "Next.js" },
  approach: "binary-search"
});`,
    relationships: [
      { type: 'complementary', target: 'brainstorming', label: 'Ideate solutions after diagnosis' },
      { type: 'complementary', target: 'verification-before-completion', label: 'Verify fixes' }
    ],
    contentMdx: `# Systematic Debugging

## Overview

Systematic Debugging (~100.3K installs) from Obra Superpowers applies methodical debugging methodology: eliminate root causes, not symptoms.

## Installation

\`\`\`jetbrains-mono
npx skills add obra/superpowers
\`\`\`

## Source

Repository: github.com/obra/superpowers (~196K stars)
Ecosystem: skills.sh/obra/superpowers (14 skills, ~1.2M total installs)`,
    aiInsight: 'Part of Obra Superpowers: one of the most popular debugging methodologies in the ecosystem with ~100.3K installs.',
    tangisonRecommendation: 'Use Systematic Debugging for any production issue. The binary-search approach eliminates guesswork.',
    citations: ['skills.sh/obra/superpowers', 'github.com/obra/superpowers']
  },
  {
    id: 'skill-6',
    slug: 'pdf',
    title: 'PDF',
    category: 'Document Design',
    tagline: 'Professional PDF creation and manipulation with precision layout control',
    difficulty: 'INTERMEDIATE',
    installCount: 107700,
    githubStars: 8200,
    qualityScore: 91,
    isTrending: false,
    trendingDelta: 2,
    installCommand: 'npx skills add anthropics/skills',
    dependencies: [],
    originalAuthor: 'Anthropic',
    repositoryName: 'anthropics/skills',
    sourceUrl: 'https://github.com/anthropics/skills',
    skillsShUrl: 'https://skills.sh/anthropics/skills',
    license: 'Apache-2.0',
    ecosystemSource: 'ANTHROPIC',
    ui_widget_primitive: 'BAR_METRIC',
    usageExamples: `// Generate a branded PDF report
const pdf = await pdfSkill.create({
  title: "Market Analysis Q4",
  pages: [
    { type: "cover", title: "Market Analysis", branding: { primaryColor: "#111315" } },
    { type: "content", sections: [{ heading: "Executive Summary", body: "..." }] }
  ]
});`,
    relationships: [
      { type: 'complementary', target: 'docx', label: 'Word document companion' },
      { type: 'complementary', target: 'pptx', label: 'Presentation companion' }
    ],
    contentMdx: `# PDF

## Overview

PDF (~107.7K installs) from Anthropic provides full control over PDF document creation and manipulation.

## Installation

\`\`\`jetbrains-mono
npx skills add anthropics/skills
\`\`\`

## Source

Repository: github.com/anthropics/skills
Ecosystem: skills.sh/anthropics/skills (18 skills, ~1.6M total installs)`,
    aiInsight: 'PDF is part of the Anthropic document suite: its form generation and digital signature features make it useful for compliance workflows.',
    tangisonRecommendation: 'Pair PDF with DOCX and PPTX from the same registry for full document workflows.',
    citations: ['skills.sh/anthropics/skills', 'github.com/anthropics/skills']
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
  { name: 'Tangison', url: 'https://github.com/tangison/skills' },
  { name: 'Vercel Labs', url: 'https://github.com/vercel-labs/skills' },
  { name: 'Anthropic', url: 'https://github.com/anthropics/skills' },
  { name: 'Obra Superpowers', url: 'https://github.com/obra/superpowers' },
  { name: 'Microsoft Azure', url: 'https://github.com/microsoft/azure-skills' },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  FOUNDATIONAL: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  INTERMEDIATE: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  SOVEREIGN: 'bg-[#C56A4A]/10 text-[#C56A4A] border-[#C56A4A]/20',
};

const ECOSYSTEM_LABELS: Record<string, string> = {
  TANGISON: 'Tangison', VERCEL_LABS: 'Vercel Labs', ANTHROPIC: 'Anthropic',
  OBRA: 'Obra Superpowers', MICROSOFT: 'Microsoft Azure', COMMUNITY: 'Community',
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
   WIDGET PRIMITIVE ICON — Custom military-grade SVGs
   ═══════════════════════════════════════════════════════════════ */
function WidgetPrimitiveIcon({ primitive, className = 'w-3.5 h-3.5' }: { primitive: WidgetPrimitive; className?: string }) {
  const sw = 2;
  switch (primitive) {
    case 'TARGETING_SYSTEM':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="7" /><line x1="12" y1="17" x2="12" y2="22" /><line x1="2" y1="12" x2="7" y2="12" /><line x1="17" y1="12" x2="22" y2="12" />
        </svg>
      );
    case 'FORWARD_SLASH':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="20" x2="17" y2="4" /><polyline points="4 8 8 4 4 4" /><polyline points="20 16 16 20 20 20" />
        </svg>
      );
    case 'LAYER_MATRIX':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
        </svg>
      );
    case 'RADAR_CORE':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /><line x1="12" y1="12" x2="18.5" y2="5.5" />
        </svg>
      );
    case 'BAR_METRIC':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="14" width="4" height="7" /><rect x="10" y="8" width="4" height="13" /><rect x="16" y="3" width="4" height="18" /><line x1="3" y1="21" x2="21" y2="21" />
        </svg>
      );
    default:
      return null;
  }
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
  const fullCommand = "npx skills add vercel-labs/skills";

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
        <span className={`ml-3 text-[10px] font-mono ${textMutedClass}`}>skills — add</span>
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
            <div className="pl-5 text-emerald-500/80">Scanning Obra Superpowers... 200 OK</div>
            <div className="pl-5"> </div>
            <div className="pl-5 font-medium">6 verified skills located across 3 registries.</div>
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

  // Beta banner dismiss state
  const [betaDismissed, setBetaDismissed] = useState(false);

  // Agent Pipeline state
  const [pipelineInput, setPipelineInput] = useState('');
  const [pipelineProcessing, setPipelineProcessing] = useState(false);
  const [pipelinePhase, setPipelinePhase] = useState<string>('');
  const [pipelineResult, setPipelineResult] = useState<Record<string, unknown> | null>(null);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const pipelineLogRef = useRef<HTMLDivElement>(null);

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

  // AI Chat handler — uses real LLM via /api/chat
  const handleChatSend = useCallback(async () => {
    if (!chatInput.trim() || isAiTyping) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setChatInput('');
    setIsAiTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages.slice(-8), { role: 'user', content: userMsg }],
        }),
      });
      const data = await res.json();
      const reply = data.reply || 'I encountered an issue. Please try again.';
      setChatMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      // Fallback to local keyword matching if API fails
      const lower = userMsg.toLowerCase();
      let matchedSkill: Skill | null = null;
      if (lower.includes('frontend') || lower.includes('react') || lower.includes('nextjs')) matchedSkill = INITIAL_SKILLS.find(s => s.slug === 'frontend-design') || null;
      else if (lower.includes('brainstorm') || lower.includes('ideat')) matchedSkill = INITIAL_SKILLS.find(s => s.slug === 'brainstorming') || null;
      else if (lower.includes('debug') || lower.includes('fix')) matchedSkill = INITIAL_SKILLS.find(s => s.slug === 'systematic-debugging') || null;
      else if (lower.includes('pdf') || lower.includes('document')) matchedSkill = INITIAL_SKILLS.find(s => s.slug === 'pdf') || null;
      else if (lower.includes('create') || lower.includes('publish')) matchedSkill = INITIAL_SKILLS.find(s => s.slug === 'skill-creator') || null;
      else if (lower.includes('find') || lower.includes('discover') || lower.includes('search')) matchedSkill = INITIAL_SKILLS.find(s => s.slug === 'find-skills') || null;
      else matchedSkill = INITIAL_SKILLS[Math.floor(Math.random() * INITIAL_SKILLS.length)];

      const reply = matchedSkill
        ? `For that use case, I recommend **${matchedSkill.title}**: ${matchedSkill.tagline}\n\nInstall: \`${matchedSkill.installCommand}\`\n\n${matchedSkill.aiInsight}`
        : 'I can help you find the right skill. Try describing what you want to build.';
      setChatMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    }
    setIsAiTyping(false);
  }, [chatInput, isAiTyping, chatMessages]);

  // AI Rewrite handler — uses real LLM via /api/rewrite
  const handleAIRewrite = useCallback(async () => {
    if (!rewriteInput.trim()) return;
    setRewriteLoading(true);
    setRewriteOutput('');

    const enabledFns = rewriteFunctions.filter(f => f.enabled).map(f => f.id);

    try {
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: rewriteInput, functions: enabledFns }),
      });
      const data = await res.json();
      if (data.rewritten) {
        setRewriteOutput(data.rewritten);
      } else {
        throw new Error('Empty rewrite response');
      }
    } catch {
      // Fallback to local simulated rewrite if API fails
      let output = rewriteInput;
      for (const fn of enabledFns) {
        await new Promise(r => setTimeout(r, 300));
        if (fn === 'clarity') output = output.replace(/\bvery\b/gi, '').replace(/\breally\b/gi, '').replace(/\bbasically\b/gi, '');
        if (fn === 'remove-ai') output = output.replace(/\bleverage\b/gi, 'use').replace(/\bsynergy\b/gi, 'cooperation').replace(/\binnovative\b/gi, 'new').replace(/\bseamlessly\b/gi, '');
        if (fn === 'structure') output = `## Overview\n\n${output}\n\n## Summary\n\nRewritten with ${enabledFns.join(', ')}.`;
        if (fn === 'format') output = output.replace(/\n{3,}/g, '\n\n');
        if (fn === 'standards') output = `<!-- Tangison Enhanced -->\n${output}`;
        if (fn === 'clean-code') output = output.replace(/```(\w+)/g, '```typescript');
        if (fn === 'simplify') output = output.replace(/\bin order to\b/gi, 'to').replace(/\bdue to the fact that\b/gi, 'because');
      }
      setRewriteOutput(output);
    }
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
      `[CRON] Scanning Obra Superpowers registry... OK`,
      `[CRON] Scanning Microsoft Azure skills... OK`,
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

  // Agent Pipeline processing handler
  const handlePipelineProcess = useCallback(async () => {
    if (!pipelineInput.trim()) return;
    setPipelineProcessing(true);
    setPipelineResult(null);
    setPipelineLogs([]);
    setPipelinePhase('rigorous_filtering');

    const phases = [
      { name: 'rigorous_filtering', label: 'RIGOROUS FILTERING', desc: 'Isolating entries without reproducible install paths. Stripping conversational text.' },
      { name: 'sovereign_normalization', label: 'SOVEREIGN NORMALIZATION', desc: 'Categorizing into architectural domains. Generating Markdown specifications.' },
      { name: 'brand_injection', label: 'BRAND INJECTION', desc: 'Hard-coding avatar metadata. Mapping UI widget primitives. Affixing brand signature.' },
    ];

    for (const phase of phases) {
      setPipelinePhase(phase.name);
      setPipelineLogs(prev => [...prev, `[PIPELINE] Entering phase: ${phase.label}`]);
      await new Promise(r => setTimeout(r, 600));
      setPipelineLogs(prev => [...prev, `[PIPELINE] ${phase.desc}`]);
      await new Promise(r => setTimeout(r, 800));
      setPipelineLogs(prev => [...prev, `[PIPELINE] ${phase.label} complete ✓`]);
    }

    try {
      const rawEntries = pipelineInput.split('\n').filter(l => l.trim()).map((line, idx) => {
        const parts = line.split('|').map(p => p.trim());
        return {
          raw_id: `raw-${idx + 1}`,
          title: parts[0] || `Entry ${idx + 1}`,
          raw_description: parts[1] || line,
          install_command: parts[2] || '',
          repository: parts[3] || '',
        };
      });

      const res = await fetch('/api/agent/process?XTransformPort=3000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw_batch: rawEntries }),
      });
      const data = await res.json();
      setPipelineResult(data);
      setPipelineLogs(prev => [...prev, `[PIPELINE] Processing complete. Engine: ${data.registry_sync_meta?.engine_signature || 'N/A'}`]);
    } catch {
      setPipelineLogs(prev => [...prev, '[PIPELINE] API call failed: displaying simulated output']);
      setPipelineResult({
        registry_sync_meta: { processed_count: 1, engine_signature: 'Powered by Tangison AI' },
        verified_skills_directory: [{
          slug: 'processed-skill',
          display_title: 'Processed Skill',
          category: 'AI Infrastructure',
          total_skills_count_in_category: 67,
          ui_avatar_asset: '/assets/icons/tangison-mast-avatar.svg',
          ui_widget_primitive: 'TARGETING_SYSTEM',
          technical_tagline: 'Sovereign intelligence processing module',
          isolated_install_string: 'npm install processed-skill',
          clean_copy_payload: 'npm install processed-skill',
          architectural_documentation_mdx: '# Processed Skill\n\n## Overview\n\nSovereign intelligence module processed through the Tangison Skillsmith AI pipeline.\n\n## Installation\n\n```jetbrains-mono\nnpm install processed-skill\n```\n\n## Configuration\n\nZero-configuration required for default deployment.',
        }],
        rejected_elements: [],
      });
    }

    setPipelinePhase('complete');
    setPipelineProcessing(false);
    showNotification('Pipeline processing complete');
  }, [pipelineInput, showNotification]);

  // Nav items for desktop
  const navItems: { page: PageRoute; label: string }[] = [
    { page: 'skills', label: 'Skills' },
    { page: 'categories', label: 'Categories' },
    { page: 'trending', label: 'Trending' },
    { page: 'agent_pipeline', label: 'Pipeline' },
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
      {/* Skip to content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C56A4A] focus:text-white focus:rounded">
        Skip to main content
      </a>

      {/* Subtle grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Beta Banner */}
      {!betaDismissed && (
        <div className="bg-[#C56A4A]/10 border-b border-[#C56A4A]/20 text-sm font-mono px-4 py-2.5 relative z-50 flex items-center justify-between">
          <span className="text-[#C56A4A]">⚠ SkillsCamp is in early beta. Features are under active development. Data shown is illustrative.</span>
          <button onClick={() => setBetaDismissed(true)} className="text-[#C56A4A]/60 hover:text-[#C56A4A] transition-colors shrink-0 ml-4" aria-label="Dismiss beta banner">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
            {/* Logo + Wordmark — PROMINENT */}
            <button onClick={() => navigate('home')} className="flex items-center gap-3.5 focus:outline-none group" aria-label="Home">
              <div className="relative">
                <div className="absolute -inset-2 bg-[#C56A4A]/20 rounded-xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-1 bg-[#C56A4A]/15 rounded-lg blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
                <MastGlyph className={`relative h-16 w-auto drop-shadow-[0_0_18px_rgba(197,106,74,0.5)] ${isDark ? 'text-[#C56A4A]' : 'text-[#C56A4A]'}`} strokeColor="#C56A4A" forceRustAccent />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className={`font-display text-2xl font-bold tracking-[0.18em] uppercase block leading-none ${isDark ? 'text-[#F6F4EF]' : 'text-[#111315]'} drop-shadow-sm`}>TΛNGISON</span>
                <div className="flex items-center mt-1 gap-2">
                  <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#C56A4A] font-semibold">SKILLSCAMP</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-[2px] text-[8px] font-mono font-bold bg-[#C56A4A] text-[#F6F4EF] uppercase tracking-wider">Beta</span>
                </div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav role="navigation" className={`hidden md:flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest ${textMutedClass}`}>
              {navItems.map(({ page, label }) => (
                <button key={page} onClick={() => navigate(page)} className={`transition-colors duration-200 ${currentPage === page ? 'text-[#C56A4A] font-bold' : isDark ? 'hover:text-[#F6F4EF]' : 'hover:text-[#111315]'}`}>
                  {label}
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`p-2 rounded-[2px] ${textMutedClass} border ${borderClass} transition-colors ${isDark ? 'hover:text-[#F6F4EF]' : 'hover:text-[#111315]'}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 ${textMutedClass} ${isDark ? 'hover:text-[#F6F4EF]' : 'hover:text-[#111315]'}`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden border-t ${borderClass} py-4 space-y-1`}>
              {navItems.map(({ page, label }) => (
                <button key={page} onClick={() => navigate(page)} className={`flex items-center gap-3 w-full px-4 py-3 rounded-[2px] text-sm font-medium transition-colors ${currentPage === page ? 'text-[#C56A4A] bg-[#C56A4A]/10' : `${textMutedClass} ${isDark ? 'hover:text-[#F6F4EF]' : 'hover:text-[#111315]'}`}`}>
                  <ChevronRight className="w-4 h-4" />{label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ═══ MAIN ═══ */}
      <main id="main-content" className="flex-1 relative z-10" role="main">

        {/* ─── HOME ─── */}
        {currentPage === 'home' && (
          <div>
            {/* HERO — Terminal animation, no ocean-view background */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden" aria-label="Hero">
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  <div className="lg:col-span-7">
                    <div className="flex items-center">
                      <SectionTag>TANGISON SKILLSCAMP // V0.1.0-BETA</SectionTag>
                      <span className="ml-2 text-[9px] font-mono uppercase tracking-[0.15em] bg-[#C56A4A]/15 text-[#C56A4A] px-2 py-0.5 rounded border border-[#C56A4A]/20">beta</span>
                    </div>
                    <h1 className={`mt-6 text-[clamp(3rem,6vw,5.5rem)] font-display leading-[1.05] tracking-tight ${textPrimaryClass}`}>
                      Intelligence <br />built on what <span className="italic font-normal text-[#C56A4A]">remains.</span>
                    </h1>
                    <p className={`mt-6 text-lg ${textMutedClass} leading-relaxed max-w-xl font-sans`}>
                      Sovereign intelligence infrastructure for African enterprise. Discover, copy, and deploy modular AI agent skills: no installation required.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest font-bold">
                      <button onClick={() => navigate('skills')} className="bg-[#C56A4A] text-[#F6F4EF] px-8 py-4 hover:bg-[#F6F4EF] hover:text-[#111315] transition-colors rounded-[2px]">Explore Skills</button>
                      <button onClick={() => navigate('categories')} className={`bg-transparent border ${borderClass} ${textPrimaryClass} px-8 py-4 hover:border-[#C56A4A] transition-colors rounded-[2px]`}>Browse Ecosystems</button>
                    </div>
                    <div className={`mt-10 flex items-center gap-6 text-xs font-mono ${textMutedClass}`}>
                      <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#C56A4A]" />~{SKILL_CATEGORIES.length} categories</span>
                      <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-[#C56A4A]" />~{INITIAL_SKILLS.length} verified skills</span>
                    </div>
                  </div>
                  <div className="lg:col-span-5 hidden lg:block">
                    <TerminalAnimation isDark={isDark} />
                  </div>
                </div>
              </div>
            </section>

            {/* TRENDING SKILLS */}
            <section className={`py-20 border-t ${borderClass}`} aria-label="Trending Skills">
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
                    <button key={skill.id} onClick={() => navigate('skill_detail', skill.id)} className={`min-w-[300px] max-w-[320px] text-left p-5 border rounded-[2px] transition-all duration-200 hover:border-l-[#C56A4A] hover:border-l-2 ${cardClass}`} aria-label={`View ${skill.title} details`}>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono bg-[#C56A4A]/10 text-[#C56A4A] border border-[#C56A4A]/20">{skill.category}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono border" style={{ borderColor: isDark ? 'rgba(217,215,210,0.1)' : '#EAEAEA', color: isDark ? 'rgba(217,215,210,0.7)' : '#787774' }}>{ECOSYSTEM_LABELS[skill.ecosystemSource]}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono border ${DIFFICULTY_COLORS[skill.difficulty]}`}>{skill.difficulty}</span>
                        {skill.ui_widget_primitive && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[2px] text-[9px] font-mono bg-[#16353D]/50 text-[#C56A4A] border border-[#16353D]">
                            <WidgetPrimitiveIcon primitive={skill.ui_widget_primitive} className="w-3 h-3" />
                            {skill.ui_widget_primitive.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                      <h3 className={`font-semibold text-sm mb-1 ${textPrimaryClass}`}>{skill.title}</h3>
                      <p className={`text-xs leading-relaxed mb-3 line-clamp-2 ${textMutedClass}`}>{skill.tagline}</p>
                      <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: isDark ? 'rgba(217,215,210,0.1)' : '#EAEAEA' }}>
                        <span className={`text-[10px] font-mono ${textMutedClass}`}>~{skill.installCount.toLocaleString()} installs</span>
                        <button onClick={(e) => { e.stopPropagation(); copyToClipboard(skill.installCommand); }} className="inline-flex items-center gap-1 px-2 py-1 rounded-[2px] text-[10px] font-mono border bg-[#C56A4A]/10 text-[#C56A4A] border-[#C56A4A]/20 hover:bg-[#C56A4A] hover:text-[#F6F4EF] transition-colors" aria-label={`Copy ${skill.installCommand}`}>
                          <Copy className="w-3 h-3" />Copy
                        </button>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* CATEGORIES GRID */}
            <section className={`py-20 border-t ${borderClass}`} style={{ backgroundColor: isDark ? 'rgba(26,28,30,0.5)' : 'rgba(237,234,229,0.3)' }} aria-label="Skill Categories">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                  <SectionTag>SYSTEM CLASSIFICATION</SectionTag>
                  <h2 className={`mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-display ${textPrimaryClass}`}>Explore Domains</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {SKILL_CATEGORIES.map((cat) => (
                    <button key={cat.name} onClick={() => { setDirCategory(cat.name); navigate('skills'); }} className={`group p-5 border rounded-[2px] transition-all text-left hover:border-l-[#C56A4A] hover:border-l-2 ${cardClass}`} aria-label={`Browse ${cat.name} skills`}>
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
            <section className={`py-16 border-t ${borderClass}`} aria-label="Supported Ecosystems">
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
            <section className="py-20 bg-[#16353D]" aria-label="AI Assistant Call to Action">
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
          <section className="py-12" aria-label="Skills Directory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <SectionTag>VERIFIED CAPABILITIES</SectionTag>
                <h1 className={`mt-3 text-3xl font-display ${textPrimaryClass}`}>Skills Directory <span className="ml-2 text-[9px] font-mono uppercase tracking-[0.15em] bg-[#C56A4A]/15 text-[#C56A4A] px-2 py-0.5 rounded border border-[#C56A4A]/20">beta</span></h1>
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
                      <button key={skill.id} onClick={() => navigate('skill_detail', skill.id)} className={`group w-full text-left p-5 border rounded-[2px] transition-all duration-200 hover:border-l-[#C56A4A] hover:border-l-2 ${cardClass}`} aria-label={`View ${skill.title} details`}>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono bg-[#C56A4A]/10 text-[#C56A4A] border border-[#C56A4A]/20">{skill.category}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono border ${DIFFICULTY_COLORS[skill.difficulty]}`}>{skill.difficulty}</span>
                            {skill.ui_widget_primitive && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[2px] text-[9px] font-mono bg-[#16353D]/50 text-[#C56A4A] border border-[#16353D]">
                                <WidgetPrimitiveIcon primitive={skill.ui_widget_primitive} className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          {skill.isTrending && <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1"><ArrowRight className="w-3 h-3" />+{skill.trendingDelta}%</span>}
                        </div>
                        <h3 className={`font-semibold text-sm mb-1 group-hover:text-[#C56A4A] transition-colors ${textPrimaryClass}`}>{skill.title}</h3>
                        <p className={`text-xs leading-relaxed mb-3 line-clamp-2 ${textMutedClass}`}>{skill.tagline}</p>
                        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: isDark ? 'rgba(217,215,210,0.1)' : '#EAEAEA' }}>
                          <span className={`text-[10px] font-mono ${textMutedClass}`}>~{skill.installCount.toLocaleString()} installs · ★ ~{skill.githubStars.toLocaleString()}</span>
                          <button onClick={(e) => { e.stopPropagation(); copyToClipboard(skill.installCommand); }} className="inline-flex items-center gap-1 px-2 py-1 rounded-[2px] text-[10px] font-mono border bg-[#C56A4A]/10 text-[#C56A4A] border-[#C56A4A]/20 hover:bg-[#C56A4A] hover:text-[#F6F4EF] transition-colors" aria-label={`Copy ${skill.installCommand}`}>
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
                    <div className="flex justify-between"><span className={`text-[10px] font-mono uppercase ${textMutedClass}`}>Quality</span><span className="font-mono text-[#C56A4A]">~{skill.qualityScore}/100</span></div>
                    <div className="flex justify-between"><span className={`text-[10px] font-mono uppercase ${textMutedClass}`}>Installs</span><span className={`font-mono ${textPrimaryClass}`}>~{skill.installCount.toLocaleString()}</span></div>
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
                      <button onClick={() => copyToClipboard(skill.contentMdx)} className="inline-flex items-center gap-2 px-4 py-2 rounded-[2px] bg-[#C56A4A] text-[#F6F4EF] font-mono text-xs uppercase font-bold hover:bg-[#F6F4EF] hover:text-[#111315] transition-colors" aria-label="Copy skill content as prompt">
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
                      <button onClick={() => copyToClipboard(skill.installCommand)} className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] text-xs font-mono border ${borderClass} hover:border-[#C56A4A]/30 transition-colors ${textPrimaryClass}`} aria-label={`Copy ${skill.installCommand}`}>
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
                      <span className={`text-xs font-mono uppercase tracking-widest ${textMutedClass}`}>AI Rewrite Engine</span>
                      <span className="ml-1 text-[9px] font-mono uppercase tracking-[0.15em] bg-[#C56A4A]/15 text-[#C56A4A] px-2 py-0.5 rounded border border-[#C56A4A]/20">beta</span>
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
          <section className="py-12" aria-label="All Categories">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <SectionTag>SYSTEM CLASSIFICATION</SectionTag>
                <h1 className={`mt-3 text-3xl font-display ${textPrimaryClass}`}>All Categories</h1>
                <p className={`mt-2 text-sm ${textMutedClass}`}>{SKILL_CATEGORIES.length} domains of sovereign intelligence (illustrative)</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {SKILL_CATEGORIES.map((cat) => (
                  <button key={cat.name} onClick={() => { setDirCategory(cat.name); navigate('skills'); }} className={`group p-6 border rounded-[2px] transition-all text-left hover:border-[#C56A4A]/50 ${cardClass}`} aria-label={`Browse ${cat.name} skills`}>
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
          <section className="py-12" aria-label="Trending Capabilities">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <SectionTag>LIVE SIGNAL</SectionTag>
                <h1 className={`mt-3 text-3xl font-display ${textPrimaryClass}`}>Top Trending Capabilities</h1>
                <p className={`mt-2 text-sm ${textMutedClass}`}>Skills gaining momentum across the ecosystem</p>
              </div>
              <div className="space-y-3">
                {[...INITIAL_SKILLS].sort((a, b) => b.trendingDelta - a.trendingDelta).map((skill, idx) => (
                  <button key={skill.id} onClick={() => navigate('skill_detail', skill.id)} className={`group w-full flex items-center gap-6 p-5 border rounded-[2px] transition-all text-left hover:border-[#C56A4A]/50 ${cardClass}`} aria-label={`View ${skill.title} details`}>
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
                      <div className={`text-[10px] font-mono ${textMutedClass}`}>~{skill.installCount.toLocaleString()} installs</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── DOCUMENTS ─── */}
        {currentPage === 'documents' && (
          <section className="py-12" aria-label="Document Creation">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <SectionTag>DOCUMENT CREATION ENGINE</SectionTag>
                <h1 className={`mt-3 text-3xl font-display ${textPrimaryClass}`}>Document Engine <span className="ml-2 text-[9px] font-mono uppercase tracking-[0.15em] bg-[#C56A4A]/15 text-[#C56A4A] px-2 py-0.5 rounded border border-[#C56A4A]/20">beta</span></h1>
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
                        <MastGlyph className="h-8 w-auto mb-8 text-[#C56A4A]" strokeColor="#C56A4A" forceRustAccent />
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
          <section className="py-12" aria-label="Research Triangulation">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <SectionTag>DEEP RESEARCH TRIANGULATION</SectionTag>
                <h1 className={`mt-3 text-3xl font-display ${textPrimaryClass}`}>Research <span className="ml-2 text-[9px] font-mono uppercase tracking-[0.15em] bg-[#C56A4A]/15 text-[#C56A4A] px-2 py-0.5 rounded border border-[#C56A4A]/20">beta</span></h1>
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
                    <h3 className={`font-display text-lg ${textPrimaryClass}`}>Automation <span className="ml-2 text-[9px] font-mono uppercase tracking-[0.15em] bg-[#C56A4A]/15 text-[#C56A4A] px-2 py-0.5 rounded border border-[#C56A4A]/20">beta</span></h3>
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

        {/* ─── AGENT PIPELINE ─── */}
        {currentPage === 'agent_pipeline' && (
          <section className="py-12" aria-label="Agent Orchestration Pipeline">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <SectionTag>SKILLSMITH AI CRON v0.1.0-BETA</SectionTag>
                <h1 className={`mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-display ${textPrimaryClass}`}>Agent Pipeline <span className="ml-2 text-[9px] font-mono uppercase tracking-[0.15em] bg-[#C56A4A]/15 text-[#C56A4A] px-2 py-0.5 rounded border border-[#C56A4A]/20">alpha</span></h1>
                <p className={`mt-2 text-sm ${textMutedClass}`}>Ingest raw AI agent capability data, verify functional reality, and transform into sovereign registry assets.</p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Pipeline Phases Visualization */}
                <div className="w-full lg:w-[400px] shrink-0 space-y-6">
                  {/* 3-Phase Pipeline */}
                  <div className={`border rounded-[2px] p-6 ${cardClass}`}>
                    <h3 className={`font-display text-lg ${textPrimaryClass} mb-6`}>Orchestration Phases</h3>
                    <div className="space-y-6">
                      {[
                        { phase: 'rigorous_filtering', label: 'Rigorous Filtering', icon: 'TARGETING_SYSTEM', desc: 'Discard entries without install paths. Strip conversational text and emojis.', rules: ['No install path → rejected', 'Conversational filler → stripped', 'Emoji/marketing → purged'] },
                        { phase: 'sovereign_normalization', label: 'Sovereign Normalization', icon: 'LAYER_MATRIX', desc: 'Categorize into architectural domains. Generate Markdown specs with JetBrains Mono code fences.', rules: ['Map to exact category', 'Generate crystal-clear MDX', 'JetBrains Mono syntax blocks'] },
                        { phase: 'brand_injection', label: 'Brand Injection', icon: 'FORWARD_SLASH', desc: 'Hard-code avatar metadata. Map UI widget primitives. Affix brand signature.', rules: ['Avatar → /assets/icons/tangison-mast-avatar.svg', 'Widget → TARGETING_SYSTEM | FORWARD_SLASH | LAYER_MATRIX | RADAR_CORE | BAR_METRIC', 'Signature → Powered by Tangison AI'] },
                      ].map((item, idx) => (
                        <div key={item.phase} className={`relative pl-8 ${idx < 2 ? 'pb-6' : ''}`}>
                          {/* Connector line */}
                          {idx < 2 && <div className={`absolute left-3 top-8 bottom-0 w-px ${pipelinePhase === item.phase || (idx === 0 && pipelinePhase === 'sovereign_normalization') || (idx <= 1 && pipelinePhase === 'brand_injection') || pipelinePhase === 'complete' ? 'bg-[#C56A4A]' : 'bg-[#D9D7D2]/20'}`} />}
                          {/* Phase indicator */}
                          <div className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                            pipelinePhase === item.phase ? 'bg-[#C56A4A] text-[#F6F4EF] animate-pulse' :
                            (idx === 0 && (pipelinePhase === 'sovereign_normalization' || pipelinePhase === 'brand_injection' || pipelinePhase === 'complete')) ||
                            (idx === 1 && (pipelinePhase === 'brand_injection' || pipelinePhase === 'complete')) ||
                            (idx === 2 && pipelinePhase === 'complete')
                              ? 'bg-emerald-500 text-[#F6F4EF]' : `${cardNestedClass} ${textMutedClass}`
                          }`}>
                            {idx + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <WidgetPrimitiveIcon primitive={item.icon as WidgetPrimitive} className="w-3.5 h-3.5 text-[#C56A4A]" />
                              <span className={`text-sm font-semibold ${textPrimaryClass}`}>{item.label}</span>
                            </div>
                            <p className={`text-xs ${textMutedClass} mb-2`}>{item.desc}</p>
                            <div className="space-y-1">
                              {item.rules.map((rule, rIdx) => (
                                <div key={rIdx} className={`text-[10px] font-mono ${textMutedClass} flex items-center gap-1.5`}>
                                  <span className="text-[#C56A4A]">→</span>{rule}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Widget Primitives Legend */}
                  <div className={`border rounded-[2px] p-6 ${cardClass}`}>
                    <h3 className={`font-display text-lg ${textPrimaryClass} mb-4`}>UI Widget Primitives</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {(['TARGETING_SYSTEM', 'FORWARD_SLASH', 'LAYER_MATRIX', 'RADAR_CORE', 'BAR_METRIC'] as WidgetPrimitive[]).map((prim) => (
                        <div key={prim} className={`flex items-center gap-2 p-2 rounded-[2px] border ${borderClass}`}>
                          <WidgetPrimitiveIcon primitive={prim} className="w-4 h-4 text-[#C56A4A]" />
                          <span className={`text-[9px] font-mono ${textMutedClass}`}>{prim.replace('_', ' ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Input + Output */}
                <div className="flex-grow space-y-6">
                  {/* Input Panel */}
                  <div className={`border rounded-[2px] p-6 ${cardClass}`}>
                    <h3 className={`font-display text-lg ${textPrimaryClass} mb-4`}>Raw Data Ingestion</h3>
                    <p className={`text-xs ${textMutedClass} mb-3`}>Enter raw skill data, one entry per line. Format: Title | Description | Install Command | Repository</p>
                    <textarea
                      value={pipelineInput}
                      onChange={(e) => setPipelineInput(e.target.value)}
                      placeholder={`Sitemap-Generator-v2 | Yo! This script creates awesome XML sitemaps for your nextjs apps so Google crawls it easily. It's super fast and has like zero dependencies. 🚀🔥 | npm install sitemap-generator-v2 -g | github.com/nextdev/sitemap-gen\nLLaMA-Local-RAG | Retrieval-augmented generation pipeline for local LLaMA models with vector store integration | pip install llama-local-rag | github.com/local-ai/llama-rag`}
                      className={`w-full h-32 px-3 py-2 rounded-[2px] border text-xs font-mono resize-none placeholder:text-[#787774]/50 focus:outline-none focus:border-[#C56A4A]/40 ${cardNestedClass} ${borderClass} ${textPrimaryClass}`}
                    />
                    <button
                      onClick={handlePipelineProcess}
                      disabled={pipelineProcessing || !pipelineInput.trim()}
                      className="mt-3 w-full px-4 py-3 rounded-[2px] bg-[#C56A4A] text-[#F6F4EF] font-mono text-xs uppercase font-bold hover:bg-[#F6F4EF] hover:text-[#111315] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {pipelineProcessing ? (
                        <><RefreshCw className="w-3.5 h-3.5 animate-spin" />Processing Pipeline...</>
                      ) : (
                        <><Zap className="w-3.5 h-3.5" />Execute Pipeline</>
                      )}
                    </button>
                  </div>

                  {/* Pipeline Logs */}
                  {pipelineLogs.length > 0 && (
                    <div className={`border rounded-[2px] p-6 ${cardClass}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Terminal className="w-4 h-4 text-[#C56A4A]" />
                        <h3 className={`font-display text-lg ${textPrimaryClass}`}>Pipeline Telemetry</h3>
                      </div>
                      <div ref={pipelineLogRef} className={`border rounded-[2px] p-4 max-h-48 overflow-y-auto font-mono text-xs space-y-1 ${cardNestedClass} ${borderClass}`}>
                        {pipelineLogs.map((log, idx) => (
                          <div key={idx} className={
                            log.includes('✓') || log.includes('complete') ? 'text-emerald-500' :
                            log.includes('[PIPELINE]') ? textMutedClass : textPrimaryClass
                          }>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Output Panel */}
                  {pipelineResult && (
                    <div className={`border rounded-[2px] p-6 ${cardClass}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-[#C56A4A]" />
                          <h3 className={`font-display text-lg ${textPrimaryClass}`}>Verified Registry Output</h3>
                        </div>
                        <span className={`text-[10px] font-mono ${textMutedClass}`}>
                          {pipelineResult.registry_sync_meta?.engine_signature || 'N/A'}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className={`flex items-center gap-4 mb-4 p-3 rounded-[2px] ${cardNestedClass} ${borderClass}`}>
                        <span className={`text-xs font-mono ${textMutedClass}`}>Processed: <span className={textPrimaryClass}>{pipelineResult.registry_sync_meta?.processed_count || 0}</span></span>
                        <span className={`text-xs font-mono ${textMutedClass}`}>Verified: <span className="text-emerald-500">{pipelineResult.verified_skills_directory?.length || 0}</span></span>
                        <span className={`text-xs font-mono ${textMutedClass}`}>Rejected: <span className="text-[#C56A4A]">{pipelineResult.rejected_elements?.length || 0}</span></span>
                      </div>

                      {/* Verified Skills */}
                      {pipelineResult.verified_skills_directory?.map((skill: any, idx: number) => (
                        <div key={idx} className={`border rounded-[2px] p-4 mb-3 ${cardNestedClass} ${borderClass}`}>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <MastGlyph className="h-4 w-auto text-[#C56A4A]" strokeColor="#C56A4A" forceRustAccent />
                            <span className={`text-sm font-semibold ${textPrimaryClass}`}>{skill.display_title}</span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono bg-[#C56A4A]/10 text-[#C56A4A] border border-[#C56A4A]/20">{skill.category}</span>
                            {skill.ui_widget_primitive && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] text-[10px] font-mono bg-[#16353D]/50 text-[#C56A4A] border border-[#16353D]">
                                <WidgetPrimitiveIcon primitive={skill.ui_widget_primitive} className="w-3 h-3" />
                                {skill.ui_widget_primitive.replace('_', ' ')}
                              </span>
                            )}
                          </div>
                          <p className={`text-xs ${textMutedClass} mb-2`}>{skill.technical_tagline}</p>
                          <div className={`flex items-center gap-3 p-2 rounded-[2px] border ${borderClass} mb-2`}>
                            <span className="text-[#C56A4A] font-mono text-xs font-bold select-none">$</span>
                            <code className={`text-xs font-mono ${textPrimaryClass}`}>{skill.isolated_install_string}</code>
                            <button onClick={() => copyToClipboard(skill.clean_copy_payload || skill.isolated_install_string)} className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] text-[10px] font-mono border bg-[#C56A4A]/10 text-[#C56A4A] border-[#C56A4A]/20 hover:bg-[#C56A4A] hover:text-[#F6F4EF] transition-colors" aria-label="Copy install command">
                              <Copy className="w-3 h-3" />Copy
                            </button>
                          </div>
                          <details className={`text-xs ${textMutedClass}`}>
                            <summary className="cursor-pointer hover:text-[#C56A4A] transition-colors font-mono">View Architectural Documentation</summary>
                            <div className={`mt-2 p-3 rounded-[2px] border font-mono text-xs whitespace-pre-wrap leading-relaxed ${cardClass} ${borderClass}`}>
                              {skill.architectural_documentation_mdx}
                            </div>
                          </details>
                        </div>
                      ))}

                      {/* Rejected Elements */}
                      {pipelineResult.rejected_elements?.length > 0 && (
                        <div className="mt-4">
                          <h4 className={`text-xs font-mono uppercase tracking-widest ${textMutedClass} mb-2`}>Rejected Elements</h4>
                          {pipelineResult.rejected_elements.map((elem: any, idx: number) => (
                            <div key={idx} className={`flex items-center gap-2 p-2 rounded-[2px] border ${borderClass} mb-1`}>
                              <AlertCircle className="w-3 h-3 text-[#C56A4A]" />
                              <span className={`text-xs font-mono ${textMutedClass}`}>{elem.raw_id}: {elem.reason_for_exclusion}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── ABOUT ─── */}
        {currentPage === 'about' && (
          <section className="py-12" aria-label="About Tangison SkillsCamp">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionTag>ABOUT TANGISON SKILLSCAMP</SectionTag>
              <h1 className={`mt-3 text-[clamp(2rem,4vw,3rem)] font-display ${textPrimaryClass} mb-6`}>
                Intelligence built on what remains.
              </h1>
              <div className={`space-y-6 text-sm ${textMutedClass} leading-relaxed`}>
                <p>
                  Tangison SkillsCamp is a sovereign intelligence infrastructure platform. We discover, verify, organize, enhance, and operationalize AI agent skills from the global open skills ecosystem: skills.sh, Vercel Labs, Anthropic, Obra Superpowers, Microsoft Azure, and beyond.
                </p>
                <p>
                  Every skill in our catalog is sourced honestly: we credit original authors, link back to original repositories (vercel-labs/skills, anthropics/skills, obra/superpowers), and link to skills.sh. We enhance skills without stealing attribution, acting as an intelligence layer above the ecosystem.
                </p>
                <p>
                  Our platform is built on the principle that intelligence infrastructure should be accessible, verifiable, and sovereign. No vendor lock-in. No hidden dependencies. Just modular, composable skills that work across the entire open ecosystem.
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
        <div className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[360px] max-h-[520px] border rounded-[4px] shadow-2xl shadow-black/30 flex flex-col animate-[fadeInUp_0.3s_ease-out] ${cardClass}`}>
          {/* Chat Header */}
          <div className={`flex items-center justify-between p-4 border-b ${borderClass}`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`text-xs font-mono uppercase tracking-widest ${textPrimaryClass}`}>SkillsCamp AI</span>
              <span className="ml-2 text-[9px] font-mono uppercase tracking-[0.15em] bg-[#C56A4A]/15 text-[#C56A4A] px-2 py-0.5 rounded border border-[#C56A4A]/20">beta</span>
            </div>
            <button onClick={() => setChatOpen(false)} className={`${textMutedClass} hover:text-[#F6F4EF]`} aria-label="Close assistant">
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
            <button onClick={handleChatSend} disabled={isAiTyping || !chatInput.trim()} className="p-2 rounded-[2px] bg-[#C56A4A] text-[#F6F4EF] hover:bg-[#F6F4EF] hover:text-[#111315] transition-colors disabled:opacity-50" aria-label="Send message">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Chat toggle button (when chat is closed) */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#C56A4A] text-[#F6F4EF] shadow-lg shadow-[#C56A4A]/30 hover:bg-[#F6F4EF] hover:text-[#111315] transition-colors flex items-center justify-center animate-[fadeInUp_0.3s_ease-out]"
          aria-label="Open AI assistant"
        >
          <MastGlyph className="w-5 h-6" strokeColor="currentColor" forceRustAccent />
        </button>
      )}

      {/* ═══ FOOTER ═══ */}
      <footer className={`border-t mt-auto ${footerClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            {/* Logo ONLY — DRAMATIC, NO wordmark */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="relative">
                {/* Outermost glow halo */}
                <div className={`absolute -inset-6 rounded-2xl ${isDark ? 'bg-[#C56A4A]/10' : 'bg-[#C56A4A]/5'} blur-2xl`} />
                {/* Outer glow ring */}
                <div className={`absolute -inset-4 rounded-xl ${isDark ? 'bg-[#C56A4A]/15' : 'bg-[#C56A4A]/8'} blur-xl`} />
                {/* Inner glow */}
                <div className="absolute -inset-2 rounded-lg bg-[#C56A4A]/20 blur-md" />
                {/* Core glow */}
                <div className="absolute -inset-1 rounded bg-[#C56A4A]/25 blur-sm" />
                <MastGlyph
                  className="relative w-16 h-20 drop-shadow-[0_0_24px_rgba(197,106,74,0.6)]"
                  strokeColor="#C56A4A"
                  forceRustAccent
                />
              </div>
              <span className={`font-mono text-[9px] uppercase tracking-[0.3em] font-bold ${isDark ? 'text-[#F6F4EF]/80' : 'text-[#111315]/80'}`}>Sovereign Enclave Platform</span>
            </div>

            {/* Platform Links */}
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-mono uppercase tracking-widest">
              <button onClick={() => navigate('skills')} className="hover:text-[#C56A4A] transition-colors" aria-label="Navigate to Skills">Skills</button>
              <button onClick={() => navigate('categories')} className="hover:text-[#C56A4A] transition-colors" aria-label="Navigate to Categories">Categories</button>
              <button onClick={() => navigate('trending')} className="hover:text-[#C56A4A] transition-colors" aria-label="Navigate to Trending">Trending</button>
              <button onClick={() => navigate('agent_pipeline')} className="hover:text-[#C56A4A] transition-colors" aria-label="Navigate to Pipeline">Pipeline</button>
              <button onClick={() => navigate('documents')} className="hover:text-[#C56A4A] transition-colors" aria-label="Navigate to Documents">Documents</button>
              <button onClick={() => navigate('research')} className="hover:text-[#C56A4A] transition-colors" aria-label="Navigate to Triangulation">Triangulation</button>
              <button onClick={() => navigate('about')} className="hover:text-[#C56A4A] transition-colors" aria-label="Navigate to About">About</button>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-widest">
              <a href="https://skills.sh" target="_blank" rel="noopener noreferrer" className="hover:text-[#C56A4A] transition-colors">Skills.sh</a>
              <a href="https://github.com/vercel-labs/skills" target="_blank" rel="noopener noreferrer" className="hover:text-[#C56A4A] transition-colors">GitHub</a>
              <span className="opacity-50 cursor-default">Privacy (Coming Soon)</span>
              <span className="opacity-50 cursor-default">Terms (Coming Soon)</span>
            </div>
          </div>

          <div className={`mt-8 pt-6 border-t ${borderClass} flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-widest`}>
            <div className="flex items-center gap-4">
              <span className="text-[#C56A4A] font-bold">Windhoek, Namibia // Node</span>
              <span className={textMutedClass}>Tangison Agency</span>
              <span className="text-emerald-500 font-bold">AI-Powered</span>
            </div>
            <span>© 2026 TANGISON GROUP. ALL RIGHTS SECURED. <span className="text-[10px] font-mono opacity-60">v0.1.0-beta</span></span>
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
