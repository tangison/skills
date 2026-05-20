import { Skill, SkillCategory, Ecosystem } from './types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  // Global Domains (20)
  { id: 'cat-1', slug: 'website-planning', name: 'Website Planning', description: 'Industry-specific website architecture blueprints — sitemap, content, SEO, CTA strategy', icon: 'LayoutGrid', skillCount: 2, sortOrder: 1 },
  { id: 'cat-2', slug: 'website-auditing', name: 'Website Auditing', description: 'Comprehensive website audits — performance, accessibility, SEO, and UX analysis', icon: 'Shield', skillCount: 1, sortOrder: 2 },
  { id: 'cat-3', slug: 'seo', name: 'SEO', description: 'Technical SEO auditing, structured data, and optimization', icon: 'Search', skillCount: 1, sortOrder: 3 },
  { id: 'cat-4', slug: 'copywriting', name: 'Copywriting', description: 'Natural, believable brand copy that converts', icon: 'PenLine', skillCount: 1, sortOrder: 4 },
  { id: 'cat-5', slug: 'prompt-engineering', name: 'Prompt Engineering', description: 'Advanced prompt design and constraint enforcement', icon: 'Terminal', skillCount: 1, sortOrder: 5 },
  { id: 'cat-6', slug: 'creative-design', name: 'Creative Design', description: 'AI-powered image creation, brand kits, and visual design systems', icon: 'Image', skillCount: 1, sortOrder: 6 },
  { id: 'cat-7', slug: 'flyer-design', name: 'Flyer Design', description: 'Professional flyer and poster design — print-safe, export-ready', icon: 'Layout', skillCount: 1, sortOrder: 7 },
  { id: 'cat-8', slug: 'social-media', name: 'Social Media', description: 'Social content creation, scheduling, and launch strategy', icon: 'Share2', skillCount: 1, sortOrder: 8 },
  { id: 'cat-9', slug: 'document-design', name: 'Document Design', description: 'Professional document creation — PDFs, Word, presentations', icon: 'FileText', skillCount: 2, sortOrder: 9 },
  { id: 'cat-10', slug: 'pdf-generation', name: 'PDF Generation', description: 'Programmatic PDF creation with layout, typography, and form support', icon: 'FileDown', skillCount: 1, sortOrder: 10 },
  { id: 'cat-11', slug: 'research', name: 'Research', description: 'Deep research, citation tracking, and source verification', icon: 'BookOpen', skillCount: 1, sortOrder: 11 },
  { id: 'cat-12', slug: 'automation', name: 'Automation', description: 'Workflow automation and CI/CD pipeline skills', icon: 'Cpu', skillCount: 1, sortOrder: 12 },
  { id: 'cat-13', slug: 'deployment', name: 'Deployment', description: 'Hosting, CDN, and production deployment strategies', icon: 'Rocket', skillCount: 2, sortOrder: 13 },
  { id: 'cat-14', slug: 'nextjs', name: 'Next.js', description: 'Next.js framework skills — App Router, RSC, and fullstack', icon: 'Box', skillCount: 1, sortOrder: 14 },
  { id: 'cat-15', slug: 'react', name: 'React', description: 'React component patterns, hooks, and state management', icon: 'Atom', skillCount: 2, sortOrder: 15 },
  { id: 'cat-16', slug: 'typescript', name: 'TypeScript', description: 'TypeScript type systems, generics, and strict mode patterns', icon: 'FileType', skillCount: 1, sortOrder: 16 },
  { id: 'cat-17', slug: 'brand-systems', name: 'Brand Systems', description: 'Brand identity systems, design tokens, and visual language', icon: 'Compass', skillCount: 1, sortOrder: 17 },
  { id: 'cat-18', slug: 'ai-infrastructure', name: 'AI Infrastructure', description: 'AI agent skills, model integration, and intelligent systems', icon: 'Server', skillCount: 3, sortOrder: 18 },
  { id: 'cat-19', slug: 'testing', name: 'Testing', description: 'Unit testing, integration testing, E2E, and quality assurance', icon: 'CheckCircle', skillCount: 1, sortOrder: 19 },
  { id: 'cat-20', slug: 'security', name: 'Security', description: 'Application security, vulnerability scanning, and compliance', icon: 'Lock', skillCount: 1, sortOrder: 20 },
  // SADC-Specific Domains (4)
  { id: 'cat-21', slug: 'african-language-ai', name: 'African Language AI', description: 'AI skills for Afrikaans, Oshiwambo, Setswana, and other African languages', icon: 'Translate', skillCount: 1, sortOrder: 21 },
  { id: 'cat-22', slug: 'mobile-money-fintech', name: 'Mobile Money & Fintech', description: 'M-Pesa, FNB, Bank Windhoek integration, payment processing for SADC', icon: 'Wallet', skillCount: 2, sortOrder: 22 },
  { id: 'cat-23', slug: 'sadc-compliance-legal', name: 'SADC Compliance & Legal', description: 'NHBRC, BIPA, labour law, and regional compliance document generation', icon: 'Scales', skillCount: 1, sortOrder: 23 },
  { id: 'cat-24', slug: 'offline-first-low-bandwidth', name: 'Offline-First & Low Bandwidth', description: 'Progressive web apps, data-saving patterns, and offline-capable AI skills', icon: 'WifiSlash', skillCount: 1, sortOrder: 24 },
  // Everyday Business Domains (4)
  { id: 'cat-25', slug: 'sales-cold-outreach', name: 'Sales & Cold Outreach', description: 'Cold calling scripts, SDR automation, objection handling, and follow-up sequences', icon: 'PhoneCall', skillCount: 1, sortOrder: 25 },
  { id: 'cat-26', slug: 'operations-admin', name: 'Operations & Admin', description: 'Scheduling, invoicing, quote generation, and supplier communication', icon: 'Clipboard', skillCount: 1, sortOrder: 26 },
  { id: 'cat-27', slug: 'customer-communication', name: 'Customer Communication', description: 'WhatsApp automation, review management, and appointment reminders', icon: 'ChatCircleDots', skillCount: 1, sortOrder: 27 },
  { id: 'cat-28', slug: 'skill-summariser', name: 'Skill Summariser', description: 'Produces plain-English summaries at beginner, intermediate, and expert levels', icon: 'Article', skillCount: 1, sortOrder: 28 },
];

export const SEED_SKILLS: Skill[] = [
  // ═══════════════════════════════════════════════════════════
  // OBRA — Superpowers
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-1',
    slug: 'superpowers',
    name: 'Superpowers',
    tagline: 'The #1 most-installed skill — complete multi-agent development workflow',
    description: 'The most-installed skill on skills.sh with ~40,900 GitHub stars. Superpowers provides a complete multi-agent development workflow for AI coding assistants — task decomposition, context management, agent coordination, and quality enforcement. The gold standard for AI-assisted development.',
    content: `# Superpowers

## Overview

Superpowers is the #1 most-installed skill in the skills.sh ecosystem. It provides a complete multi-agent development workflow that transforms how AI coding assistants work — from task intake through delivery.

## Key Capabilities

1. **Task Decomposition** — Break complex projects into manageable subtasks
2. **Agent Coordination** — Orchestrate multiple AI agents working in parallel
3. **Context Management** — Maintain project context across sessions
4. **Quality Enforcement** — Automated code review and standards checking
5. **Workflow Templates** — Pre-built workflows for common project types

## Installation

\`\`\`bash
npx skills add obra/superpowers
\`\`\`

## Why It's #1

- ~40,900 GitHub stars — the most popular skill by a wide margin
- Used by thousands of developers daily
- Integrates with all major AI coding assistants
- Battle-tested in production environments

## Quick Start

\`\`\`bash
npx skills add obra/superpowers
# Superpowers auto-detects your project and sets up workflows
\`\`\`

## Configuration

\`\`\`json
{
  "workflow": "fullstack",
  "agents": ["planner", "coder", "reviewer"],
  "quality": "strict"
}
\`\`\``,
    tangisonRewrite: null,
    installCommand: 'npx skills add obra/superpowers',
    categoryId: 'cat-18',
    tags: ['superpowers', 'multi-agent', 'workflow', 'agent', 'development', 'obra'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Obra',
    sourceUrl: 'https://github.com/obra/superpowers',
    skillsShUrl: 'https://skills.sh/skills/superpowers',
    githubRepo: 'obra/superpowers',
    license: 'MIT',
    ecosystemSource: 'OBRA',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'AI Infrastructure',
    dependencies: [],
    usageExamples: `// Initialize Superpowers in your project
npx skills add obra/superpowers

// Superpowers auto-configures your workflow
// It detects: Next.js, React, TypeScript, etc.
// And sets up appropriate agent coordination`,
    relationships: [
      { type: 'complementary', target: 'find-skills', label: 'Discover complementary skills' },
      { type: 'complementary', target: 'vercel-react-best-practices', label: 'Enforce React standards' }
    ],
    aiInsight: 'The undisputed #1 skill — 40,900+ GitHub stars. Superpowers is the gateway drug to the skills.sh ecosystem.',
    tangisonRecommendation: 'Install Superpowers first — it orchestrates everything else and gives you the full multi-agent development experience.'
  },
  // ═══════════════════════════════════════════════════════════
  // VERCEL LABS — Find Skills
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-2',
    slug: 'find-skills',
    name: 'Find Skills',
    tagline: 'Discover the perfect AI skill for any task',
    description: 'An intelligent skill discovery engine from Vercel Labs that searches across multiple ecosystems to find the best AI skill for your specific needs. Supports natural language queries, category browsing, and quality-scored results.',
    content: `# Find Skills

## Overview

Find Skills is the official discovery engine from Vercel Labs. It searches the entire skills.sh ecosystem to find the best AI skill for your task.

## How It Works

1. **Natural Language Query** — Describe what you want to accomplish
2. **Multi-Ecosystem Search** — Searches Vercel Labs, Anthropic, Obra, and community sources
3. **Quality Scoring** — Results ranked by install count, stars, and verification
4. **Smart Matching** — Semantic understanding to match intent, not just keywords

## Installation

\`\`\`bash
npx skills add vercel-labs/skills
\`\`\`

## Features

- **Fuzzy Matching** — Handles typos and partial names
- **Category Filters** — Narrow by category, difficulty, or ecosystem
- **Trending Boost** — Trending skills get relevance boost
- **Dependency Awareness** — Shows compatible and complementary skills

## Quality Score Breakdown

| Factor | Weight |
|--------|--------|
| Install Count | 30% |
| GitHub Stars | 25% |
| Verification Status | 20% |
| Community Rating | 15% |
| Documentation Quality | 10% |`,
    tangisonRewrite: null,
    installCommand: 'npx skills add vercel-labs/skills',
    categoryId: 'cat-18',
    tags: ['discovery', 'search', 'ecosystem', 'skills-sh', 'agent'],
    difficulty: 'BEGINNER',
    originalAuthor: 'Vercel Labs',
    sourceUrl: 'https://github.com/vercel-labs/skills',
    skillsShUrl: 'https://skills.sh/skills/find-skills',
    githubRepo: 'vercel-labs/skills',
    license: 'MIT',
    ecosystemSource: 'VERCEL_LABS',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'AI Infrastructure',
    dependencies: [],
    usageExamples: `// Search for a skill by natural language
const results = await findSkills("create a landing page for a restaurant");

// Filter by category
const designSkills = await findSkills({
  query: "brand design",
  category: "creative-design"
});`,
    relationships: [
      { type: 'complementary', target: 'superpowers', label: 'Use with Superpowers workflow' },
      { type: 'complementary', target: 'deep-research', label: 'Research before choosing' }
    ],
    aiInsight: 'The gateway skill to the entire ecosystem — Find Skills is where every journey starts.',
    tangisonRecommendation: 'Start here for any project — Find Skills will point you to the right tool for the job.'
  },
  // ═══════════════════════════════════════════════════════════
  // VERCEL LABS — Agent Browser
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-3',
    slug: 'agent-browser',
    name: 'Agent Browser',
    tagline: 'Browser automation and web scraping for AI agents',
    description: 'From Vercel Labs — a powerful browser automation skill that enables AI agents to navigate, click, type, and snapshot web pages via structured commands. Built on a fast Rust-based headless browser with Node.js fallback for reliable web scraping and automation workflows.',
    content: `# Agent Browser

## Overview

Agent Browser enables AI agents to interact with web pages programmatically — navigate URLs, click elements, fill forms, and extract content. Built on a fast Rust-based headless browser with a Node.js fallback.

## Key Features

1. **Page Navigation** — Visit URLs, follow links, handle redirects
2. **Element Interaction** — Click, type, select, and hover on elements
3. **Content Extraction** — Scrape text, HTML, and structured data
4. **Screenshot Capture** — Take page snapshots for visual verification
5. **Session Management** — Maintain cookies and auth state across pages

## Installation

\`\`\`bash
npx skills add vercel-labs/agent-browser
\`\`\`

## Usage

\`\`\`typescript
// Navigate to a page
await browser.goto("https://example.com");

// Click an element
await browser.click("button.submit");

// Extract content
const title = await browser.getText("h1");

// Take a screenshot
await browser.screenshot("page.png");
\`\`\`

## Architecture

- **Primary**: Rust-based headless browser (fast, reliable)
- **Fallback**: Node.js Puppeteer/Playwright (broader compatibility)
- Auto-selects the best engine for your environment`,
    tangisonRewrite: null,
    installCommand: 'npx skills add vercel-labs/agent-browser',
    categoryId: 'cat-12',
    tags: ['browser', 'automation', 'scraping', 'headless', 'rust', 'puppeteer'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Vercel Labs',
    sourceUrl: 'https://github.com/vercel-labs/agent-browser',
    skillsShUrl: 'https://skills.sh/skills/agent-browser',
    githubRepo: 'vercel-labs/agent-browser',
    license: 'MIT',
    ecosystemSource: 'VERCEL_LABS',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'Automation',
    dependencies: [],
    usageExamples: `// Scrape product data
await browser.goto("https://shop.example.com/product/123");
const price = await browser.getText(".price");
const title = await browser.getText("h1");

// Automate form submission
await browser.goto("https://example.com/contact");
await browser.type("#email", "user@example.com");
await browser.click("button[type=submit]");`,
    relationships: [
      { type: 'complementary', target: 'superpowers', label: 'Use in Superpowers workflow' },
      { type: 'complementary', target: 'find-skills', label: 'Discover related skills' }
    ],
    aiInsight: 'The most versatile automation skill — Agent Browser turns any AI agent into a web automation powerhouse.',
    tangisonRecommendation: 'Essential for any project involving web scraping, testing, or automated workflows.'
  },
  // ═══════════════════════════════════════════════════════════
  // ANTHROPIC — Deep Research
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-4',
    slug: 'deep-research',
    name: 'Deep Research',
    tagline: 'Thorough, cited research on any topic',
    description: 'A deep research skill from Anthropic that performs multi-source investigation on any topic, producing a comprehensive report with citations, source verification, and confidence scoring.',
    content: `# Deep Research

## Overview

Deep Research performs exhaustive, multi-source investigation on any topic. Built on Anthropic's research methodology with structured quality scoring.

## Research Methodology

1. **Query Decomposition** — Breaks complex questions into sub-questions
2. **Source Discovery** — Searches academic, news, primary, and reference sources
3. **Cross-Verification** — Validates claims across independent sources
4. **Confidence Scoring** — Assigns reliability scores to each finding
5. **Synthesis** — Produces a coherent narrative with inline citations

## Installation

\`\`\`bash
npx skills add anthropics/skills
\`\`\`

## Confidence Levels

| Level | Criteria |
|-------|----------|
| **High** | 3+ independent sources agree |
| **Medium** | 2 sources agree, or 1 authoritative source |
| **Low** | Single source, or conflicting evidence |

## Configuration

\`\`\`json
{
  "depth": "comprehensive",
  "maxSources": 20,
  "requireCitations": true,
  "includeAcademic": true
}
\`\`\``,
    tangisonRewrite: null,
    installCommand: 'npx skills add anthropics/skills',
    categoryId: 'cat-11',
    tags: ['research', 'citations', 'verification', 'academic', 'investigation'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Anthropic',
    sourceUrl: 'https://github.com/anthropics/skills',
    skillsShUrl: 'https://skills.sh/skills/deep-research',
    githubRepo: 'anthropics/skills',
    license: 'Apache-2.0',
    ecosystemSource: 'ANTHROPIC',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'Research',
    dependencies: [],
    usageExamples: `// Perform deep research on a topic
const report = await deepResearch({
  topic: "Impact of AI regulation on startup funding",
  depth: "comprehensive",
  maxSources: 20
});

// Quick research for a specific question
const answer = await deepResearch({
  question: "What is the current status of the EU AI Act?",
  depth: "quick"
});`,
    relationships: [
      { type: 'complementary', target: 'find-skills', label: 'Research skills before installing' },
      { type: 'complementary', target: 'seo-optimizer', label: 'Research for SEO strategy' }
    ],
    aiInsight: 'The most-cited skill in academic contexts — its confidence scoring system has become an ecosystem standard.',
    tangisonRecommendation: 'Use Deep Research before any major project decision. The citation tracking saves hours of verification.'
  },
  // ═══════════════════════════════════════════════════════════
  // VERCEL LABS — Frontend Design
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-5',
    slug: 'frontend-design',
    name: 'Frontend Design',
    tagline: 'Production-grade frontend from specifications',
    description: 'Generates production-ready frontend code from design specifications, wireframe descriptions, or existing website references. Supports React, Next.js, Vue, and Svelte with Tailwind CSS integration.',
    content: `# Frontend Design

## Overview

Frontend Design transforms design specifications into production-ready frontend code. Supports component architecture, accessibility, and responsive design.

## Supported Frameworks

- **Next.js** (App Router + RSC)
- **React** (Vite, CRA)
- **Vue** (Nuxt, standalone)
- **Svelte** (SvelteKit)

## Input Types

1. **Design Spec** — Structured JSON describing components and layout
2. **Wireframe Description** — Natural language page layout
3. **Reference URL** — Recreates an existing website
4. **Figma Link** — Extracts design tokens and structure

## Installation

\`\`\`bash
npx skills add vercel-labs/agent-skills
\`\`\`

## Design Principles

- **Mobile-First**: Responsive by default
- **Accessible**: WCAG 2.1 AA compliance
- **Performant**: Lighthouse 95+ target
- **Type-Safe**: Full TypeScript with strict mode

## Configuration

\`\`\`json
{
  "framework": "nextjs",
  "styling": "tailwind",
  "componentLibrary": "shadcn-ui",
  "typescript": true
}
\`\`\``,
    tangisonRewrite: null,
    installCommand: 'npx skills add vercel-labs/agent-skills',
    categoryId: 'cat-15',
    tags: ['frontend', 'react', 'nextjs', 'tailwind', 'ui', 'components'],
    difficulty: 'ADVANCED',
    originalAuthor: 'Vercel Labs',
    sourceUrl: 'https://github.com/vercel-labs/agent-skills',
    skillsShUrl: 'https://skills.sh/skills/frontend-design',
    githubRepo: 'vercel-labs/agent-skills',
    license: 'MIT',
    ecosystemSource: 'VERCEL_LABS',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'React',
    dependencies: [],
    usageExamples: `// Generate a Next.js frontend from a spec
const output = await frontendDesign({
  framework: "nextjs",
  spec: {
    pages: [
      { name: "Home", sections: ["Hero", "Features", "CTA"] },
      { name: "Pricing", sections: ["Plans", "FAQ"] }
    ],
    styling: "tailwind"
  }
});`,
    relationships: [
      { type: 'upstream', target: 'web-agency-complete', label: 'Consumes page blueprints' },
      { type: 'complementary', target: 'brandkit-image-generation', label: 'Uses brand tokens' }
    ],
    aiInsight: 'Frontend Design generates the cleanest code of any skill — output often passes code review without modifications.',
    tangisonRecommendation: 'Pair with Web Agency Complete for end-to-end website delivery.'
  },
  // ═══════════════════════════════════════════════════════════
  // VERCEL LABS — React Best Practices
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-6',
    slug: 'vercel-react-best-practices',
    name: 'Vercel React Best Practices',
    tagline: 'React patterns and best practices from the Vercel team',
    description: 'Official React patterns and best practices skill from Vercel Labs. Covers server components, data fetching patterns, composition, error boundaries, and performance optimization — all following the Vercel/Next.js team\'s recommended approaches.',
    content: `# Vercel React Best Practices

## Overview

Official React best practices from the Vercel Labs team. Covers the patterns they use in production at Vercel and recommend for Next.js applications.

## Key Patterns

1. **Server Components First** — Default to RSC, add client only when needed
2. **Colocation** — Keep components, tests, and styles together
3. **Data Fetching** — Server-side fetching with revalidation
4. **Composition** — Prefer composition over prop drilling
5. **Error Boundaries** — Graceful error handling at every level
6. **Streaming** — Suspense boundaries for progressive loading

## Installation

\`\`\`bash
npx skills add vercel-labs/agent-skills --skill react-best-practices
\`\`\`

## Rules Enforced

- No \`useState\` when server state suffices
- No \`useEffect\` for data fetching
- Prefer \`async/await\` in server components
- Use \`loading.tsx\` for streaming UI
- Implement error boundaries at route segments
- Minimize client component boundaries

## Configuration

\`\`\`json
{
  "strictness": "recommended",
  "framework": "nextjs",
  "appRouter": true
}
\`\`\``,
    tangisonRewrite: null,
    installCommand: 'npx skills add vercel-labs/agent-skills --skill react-best-practices',
    categoryId: 'cat-15',
    tags: ['react', 'best-practices', 'vercel', 'rsc', 'server-components', 'patterns'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Vercel Labs',
    sourceUrl: 'https://github.com/vercel-labs/agent-skills',
    skillsShUrl: 'https://skills.sh/skills/react-best-practices',
    githubRepo: 'vercel-labs/agent-skills',
    license: 'MIT',
    ecosystemSource: 'VERCEL_LABS',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'React',
    dependencies: [],
    usageExamples: `// The skill auto-enforces best practices
// When writing React components, it ensures:
// - Server components by default
// - Proper data fetching patterns
// - No unnecessary client components
// - Correct suspense boundaries`,
    relationships: [
      { type: 'complementary', target: 'superpowers', label: 'Use in Superpowers workflow' },
      { type: 'complementary', target: 'frontend-design', label: 'Enforce standards on generated code' }
    ],
    aiInsight: 'The official React skill from the Vercel team — enforces production-grade patterns that scale.',
    tangisonRecommendation: 'Install alongside Frontend Design to ensure generated code follows Vercel best practices.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Web Agency Complete
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-7',
    slug: 'web-agency-complete',
    name: 'Web Agency Complete',
    tagline: 'Full-stack website delivery from brief to launch',
    description: 'The flagship Tangison skill for full-stack website delivery. Takes a client brief and produces a complete website blueprint — sitemap, wireframe descriptions, copy, SEO strategy, and deployment plan. Built for agencies and freelancers who need production-quality output fast.',
    content: `# Web Agency Complete

## Overview

Web Agency Complete transforms a client brief into a production-ready website plan with every detail covered.

## What You Get

1. **Sitemap Architecture** — Complete page hierarchy with URL structure
2. **Content Blueprint** — Page-by-page content strategy with SEO metadata
3. **Copy Drafts** — Ready-to-use website copy in your brand voice
4. **Technical Stack** — Recommended framework, hosting, and integrations
5. **SEO Strategy** — Keyword targets, structured data, and meta descriptions
6. **CTA Mapping** — Conversion touchpoints across every page
7. **Deployment Plan** — Step-by-step launch checklist

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Input Format

\`\`\`
Client: Sunrise Yoga Studio
Industry: Wellness & Fitness
Target: Local professionals aged 25-45
Pages: Home, Classes, Instructors, Pricing, Contact
Style: Calm, minimal, earthy tones
\`\`\`

## Integration Points

- **frontend-design** — Consumes the tech stack and page structure
- **human-copywriting** — Refines generated copy
- **brandkit-image-generation** — Creates matching visual assets`,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-1',
    tags: ['agency', 'website', 'planning', 'blueprint', 'sitemap', 'seo', 'launch'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/web-agency-complete',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Website Planning',
    dependencies: ['frontend-design', 'human-copywriting'],
    usageExamples: `// Generate a complete website plan from a brief
const plan = await webAgencyComplete({
  brief: "E-commerce store for handmade ceramics",
  industry: "Art & Crafts",
  targetAudience: "Design-conscious homeowners aged 30-55",
  pages: ["Home", "Shop", "About", "Contact"]
});`,
    relationships: [
      { type: 'requires', target: 'frontend-design', label: 'Builds the frontend' },
      { type: 'complementary', target: 'human-copywriting', label: 'Refines generated copy' },
      { type: 'complementary', target: 'brandkit-image-generation', label: 'Creates visual assets' }
    ],
    aiInsight: 'The highest-quality Tangison skill — structured output makes it the perfect upstream orchestrator for multi-skill workflows.',
    tangisonRecommendation: 'This is the skill to start with for any website project. It orchestrates everything downstream.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Website Planning
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-8',
    slug: 'website-planning',
    name: 'Website Planning',
    tagline: 'Strategic website architecture from industry expertise',
    description: 'Generates industry-specific website architecture plans including sitemap, page hierarchy, content strategy, and conversion paths. Focuses on proven patterns for each industry vertical.',
    content: `# Website Planning

## Overview

Website Planning creates strategic website architecture tailored to specific industries with SEO best practices and conversion optimization.

## Industry Coverage

- **SaaS** — Feature pages, pricing, docs, changelog
- **E-commerce** — Product catalog, checkout flow, reviews
- **Professional Services** — Service pages, case studies, team
- **Healthcare** — Provider profiles, appointment booking
- **Restaurant** — Menu, reservation, location
- **Real Estate** — Listings, neighborhood guides
- **Education** — Programs, faculty, admissions
- **Nonprofit** — Mission, impact, donate

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Output Deliverables

1. **Sitemap** — Complete page hierarchy with URL structure
2. **Page Templates** — Section-by-section content specifications
3. **Conversion Paths** — CTA placement and funnel design
4. **SEO Blueprint** — Keyword targets per page
5. **Content Strategy** — Voice, tone, and messaging framework`,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-1',
    tags: ['website', 'planning', 'architecture', 'sitemap', 'industry', 'strategy'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/website-planning',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Website Planning',
    dependencies: [],
    usageExamples: `// Generate a website plan for a specific industry
const plan = await websitePlanning({
  industry: "restaurant",
  businessName: "The Corner Bistro",
  targetAudience: "Local food enthusiasts",
  goals: ["reservations", "menu-showcase", "catering-inquiry"]
});`,
    relationships: [
      { type: 'complementary', target: 'web-agency-complete', label: 'Feeds into full agency delivery' },
      { type: 'complementary', target: 'seo-optimizer', label: 'Combine with SEO optimization' }
    ],
    aiInsight: 'The industry-specific patterns make this skill uniquely valuable — each vertical has battle-tested page structures.',
    tangisonRecommendation: 'Use Website Planning first, then hand off to Web Agency Complete for full execution.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Brandkit Image Generation
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-9',
    slug: 'brandkit-image-generation',
    name: 'Brandkit Image Generation',
    tagline: 'Cohesive brand visuals from a single identity',
    description: 'Generate a complete visual brand kit — logos, social media assets, color palettes, typography systems, and marketing graphics — all from a brand description. Every asset is visually consistent and export-ready.',
    content: `# Brandkit Image Generation

## Overview

Brandkit creates a complete, cohesive visual identity system from a brand description. Every output is designed to work together as a unified brand system.

## What's Included

1. **Logo Variations** — Primary, secondary, icon-only, and wordmark
2. **Color Palette** — Primary, secondary, accent colors with hex/RGB/HSL
3. **Typography System** — Heading, body, and accent font pairings
4. **Social Media Kit** — Profile images, cover photos, post templates
5. **Marketing Graphics** — Hero images, banners, email headers
6. **Brand Guidelines** — Auto-generated usage rules and spacing specs

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Input

\`\`\`
Brand: Summit Financial
Industry: Fintech / Wealth Management
Personality: Trustworthy, modern, premium
Colors: Deep navy, gold accents
Style: Clean, geometric, minimal
\`\`\`

## Design Principles

- **Consistency** — Every asset uses the same system
- **Scalability** — SVG logos scale to any size
- **Export-Ready** — All assets in production formats
- **Accessibility** — Color contrast meets WCAG AA`,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-6',
    tags: ['brand', 'logo', 'visual-identity', 'design-system', 'image-generation', 'branding'],
    difficulty: 'ADVANCED',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/brandkit-image-generation',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Creative Design',
    dependencies: [],
    usageExamples: `// Generate a complete brand kit
const kit = await brandkitImageGeneration({
  brand: {
    name: "Summit Financial",
    industry: "Fintech",
    personality: ["trustworthy", "modern", "premium"],
    preferredColors: ["#0f172a", "#d4a843"],
  },
  outputs: ["logos", "colors", "typography", "social", "marketing"]
});`,
    relationships: [
      { type: 'complementary', target: 'web-agency-complete', label: 'Provides brand assets' },
      { type: 'complementary', target: 'frontend-design', label: 'Provides design tokens' }
    ],
    aiInsight: 'The fastest-growing Tangison skill — generates an entire brand system in one call.',
    tangisonRecommendation: 'Run Brandkit before any other creative skill — the design tokens ensure everything stays on-brand.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Human Copywriting
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-10',
    slug: 'human-copywriting',
    name: 'Human Copywriting',
    tagline: 'Copy that sounds like a person wrote it',
    description: 'Generates natural, believable marketing and brand copy that avoids the telltale signs of AI writing. No clichés, no hedging, no AI-isms. Just sharp, human-sounding copy that converts.',
    content: `# Human Copywriting

## Overview

Human Copywriting produces copy that reads like a skilled human wrote it. It actively avoids the patterns that make AI text identifiable.

## Anti-Patterns We Avoid

- ❌ "In today's fast-paced world..."
- ❌ "It's important to note that..."
- ❌ "Unlock the power of..."
- ❌ "Seamless integration"
- ❌ Excessive hedging ("may", "might", "could potentially")

## Patterns We Use

- ✅ Direct, confident statements
- ✅ Specific details over vague claims
- ✅ Conversational tone with personality
- ✅ Short, punchy sentences mixed with longer ones
- ✅ Concrete numbers and evidence

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Copy Types

| Type | Use Case | Tone |
|------|----------|------|
| website | Homepage, landing pages | Confident, direct |
| email | Marketing, nurture sequences | Personal, conversational |
| ad | Google Ads, social ads | Punchy, action-driven |
| product | Product descriptions | Benefit-focused |
| social | Social media posts | Casual, engaging |`,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-4',
    tags: ['copywriting', 'marketing', 'brand-voice', 'conversion', 'anti-ai'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/human-copywriting',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Copywriting',
    dependencies: [],
    usageExamples: `// Generate website copy
const websiteCopy = await humanCopywriting({
  type: "website",
  brand: {
    name: "Corner Bakery",
    voice: "warm, neighborhood-friendly, authentic",
    audience: "Local families and remote workers"
  },
  pages: [
    { name: "Home", goal: "Make people hungry and walk in" },
    { name: "Menu", goal: "Highlight freshness and local sourcing" }
  ]
});`,
    relationships: [
      { type: 'upstream', target: 'web-agency-complete', label: 'Refines generated copy' },
      { type: 'complementary', target: 'brandkit-image-generation', label: 'Matches visual brand voice' }
    ],
    aiInsight: 'Consistently achieves below 10% on AI detection benchmarks — the closest to human-written copy of any skill.',
    tangisonRecommendation: 'Use this for any client-facing copy. The anti-AI patterns alone make it worth the install.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Flyer Design
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-11',
    slug: 'flyer-design',
    name: 'Flyer Design',
    tagline: 'Print-ready flyer and poster design',
    description: 'Design professional flyers and posters that are print-safe and export-ready. Supports multiple paper sizes, bleed margins, and CMYK color preparation. Generates both print and digital versions automatically.',
    content: `# Flyer Design

## Overview

Flyer Design creates professional, print-ready flyers and posters. Every design follows print production standards — proper bleed, CMYK-safe colors, and resolution requirements.

## Features

- **Print-Ready Output** — 300 DPI, CMYK color space, bleed margins
- **Digital Version** — Auto-generated web-optimized version
- **Paper Size Library** — A4, A5, Letter, Legal, Tabloid, custom
- **Template System** — Industry-specific starter templates
- **Brand Integration** — Import colors and fonts from brand kits
- **QR Code Generation** — Embed trackable QR codes

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Paper Sizes

| Size | Dimensions (mm) | Use Case |
|------|-----------------|----------|
| A4 | 210 × 297 | Standard flyer |
| A5 | 148 × 210 | Handout / insert |
| A3 | 297 × 420 | Poster |
| Letter | 216 × 279 | US standard |

## Print Specifications

- **Bleed**: 3mm on all sides
- **Safe Zone**: 5mm from trim
- **Resolution**: 300 DPI minimum
- **Color Space**: CMYK for print, RGB for digital`,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-7',
    tags: ['flyer', 'poster', 'print', 'design', 'cmky', 'event'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/flyer-design',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Flyer Design',
    dependencies: [],
    usageExamples: `// Design an event flyer
const eventFlyer = await flyerDesign({
  type: "event",
  size: "A4",
  content: {
    headline: "Summer Jazz Festival",
    date: "July 15-17, 2024",
    venue: "Riverside Amphitheater",
    cta: "Get Tickets",
    qrCode: "https://tickets.example.com"
  }
});`,
    relationships: [
      { type: 'complementary', target: 'brandkit-image-generation', label: 'Use brand colors and fonts' },
      { type: 'complementary', target: 'social-launch-copy', label: 'Create matching social assets' }
    ],
    aiInsight: 'The only skill that produces true print-ready output with proper bleed and CMYK color preparation.',
    tangisonRecommendation: 'For event marketing, pair Flyer Design with Social Launch Copy for complete offline + online campaigns.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Social Launch Copy
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-12',
    slug: 'social-launch-copy',
    name: 'Social Launch Copy',
    tagline: 'Launch-ready social media copy and strategy',
    description: 'Generate a complete social media launch campaign — platform-specific copy, posting schedule, hashtag strategy, and engagement hooks. Covers Twitter/X, LinkedIn, Instagram, and TikTok with platform-native tone and format.',
    content: `# Social Launch Copy

## Overview

Social Launch Copy creates a complete social media launch campaign from a product or event description. Every post is optimized for its specific platform.

## Supported Platforms

| Platform | Format | Tone | Length |
|----------|--------|------|--------|
| Twitter/X | Thread + single | Punchy, witty | 280 chars/tweet |
| LinkedIn | Post + article | Professional | 1300 chars |
| Instagram | Caption + story | Visual, engaging | 2200 chars |
| TikTok | Script + description | Casual, trendy | 60s script |

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Campaign Structure

### Pre-Launch (7 days before)
- Teaser posts on each platform
- Behind-the-scenes content
- Email list building CTA

### Launch Day
- Coordinated posting across all platforms
- Key announcement thread
- Engagement response templates

### Post-Launch (7 days after)
- Follow-up content
- Social proof sharing
- FAQ responses`,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-8',
    tags: ['social-media', 'launch', 'campaign', 'copywriting', 'twitter', 'linkedin'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/social-launch-copy',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Social Media',
    dependencies: [],
    usageExamples: `// Generate a launch campaign
const campaign = await socialLaunchCopy({
  product: {
    name: "DataFlow 2.0",
    type: "SaaS Product Launch",
    tagline: "Your data, finally organized",
    targetAudience: "Data engineers and analysts",
    launchDate: "2024-03-15"
  },
  platforms: ["twitter", "linkedin", "instagram"]
});`,
    relationships: [
      { type: 'complementary', target: 'human-copywriting', label: 'Creates short-form counterpart' },
      { type: 'complementary', target: 'brandkit-image-generation', label: 'Creates visual assets' }
    ],
    aiInsight: 'The only skill that produces platform-native content for 4+ platforms in a single call.',
    tangisonRecommendation: 'Pair with Flyer Design for a complete offline + online launch campaign.'
  },
  // ═══════════════════════════════════════════════════════════
  // VERCEL LABS — DOCX
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-13',
    slug: 'docx',
    name: 'DOCX',
    tagline: 'Professional Word document creation and editing',
    description: 'Create, edit, and manipulate Microsoft Word documents programmatically. Supports templates, styling, tables, headers/footers, and complex formatting for reports, contracts, and branded documents.',
    content: `# DOCX

## Overview

DOCX is a comprehensive skill for creating and editing Microsoft Word documents with full Open XML support.

## Features

- **Template-Based Generation** — Start from .docx templates with placeholder substitution
- **Rich Formatting** — Full control over fonts, colors, spacing, and alignment
- **Tables & Charts** — Complex table layouts with merged cells
- **Headers & Footers** — Dynamic headers/footers with page numbers
- **Mail Merge** — Batch generation from data sources
- **PDF Export** — Convert documents to PDF with layout preservation

## Installation

\`\`\`bash
npx skills add vercel-labs/agent-skills
\`\`\`

## Usage

\`\`\`typescript
const doc = await docx.create({
  title: "Q4 Report",
  author: "Acme Corp",
  sections: [
    { heading: "Executive Summary", content: "..." },
    { heading: "Financial Overview", type: "table", data: financialData }
  ]
});
\`\`\`

## Output Formats

- **.docx** — Native Word format
- **.pdf** — PDF conversion
- **.html** — HTML export`,
    tangisonRewrite: null,
    installCommand: 'npx skills add vercel-labs/agent-skills',
    categoryId: 'cat-9',
    tags: ['document', 'word', 'docx', 'report', 'template', 'formatting'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Vercel Labs',
    sourceUrl: 'https://github.com/vercel-labs/agent-skills',
    skillsShUrl: 'https://skills.sh/skills/docx',
    githubRepo: 'vercel-labs/agent-skills',
    license: 'MIT',
    ecosystemSource: 'VERCEL_LABS',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'Document Design',
    dependencies: [],
    usageExamples: `// Create a branded report
const report = await docx.create({
  template: "corporate-report",
  data: { title: "Annual Report 2024" },
  branding: { primaryColor: "#1a1a2e", fontFamily: "Inter" }
});

// Batch generate contracts
const contracts = await docx.mailMerge({
  template: "./templates/nda.docx",
  dataSource: "./data/clients.csv"
});`,
    relationships: [
      { type: 'complementary', target: 'pdf', label: 'Export to PDF format' },
      { type: 'complementary', target: 'pptx', label: 'Create matching presentations' }
    ],
    aiInsight: 'DOCX template system reduces document creation time by an average of 73%.',
    tangisonRecommendation: 'Use DOCX for any document that needs Word compatibility. Pair with PDF for dual-format output.'
  },
  // ═══════════════════════════════════════════════════════════
  // VERCEL LABS — PDF
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-14',
    slug: 'pdf',
    name: 'PDF',
    tagline: 'Professional PDF creation and manipulation',
    description: 'Create, edit, merge, and manipulate PDF documents with precision control over layout, typography, and graphics. Supports form generation, digital signatures, and accessibility compliance.',
    content: `# PDF

## Overview

PDF provides complete control over PDF document creation and manipulation — from simple text documents to complex multi-page reports.

## Features

- **Programmatic Layout** — Pixel-perfect page layout control
- **Typography Engine** — Custom font embedding and kerning
- **Table Generation** — Complex tables with spanning and shading
- **Chart Embedding** — Embed charts and graphics directly
- **Form Fields** — Interactive form field generation
- **Digital Signatures** — Sign and verify documents
- **PDF/A Compliance** — Archival-quality PDF generation

## Installation

\`\`\`bash
npx skills add vercel-labs/agent-skills
\`\`\`

## Page Templates

- **cover** — Title page with branding
- **toc** — Auto-generated table of contents
- **content** — Standard content with header/footer
- **full-bleed** — Edge-to-edge image or chart page
- **columns** — Multi-column layout`,
    tangisonRewrite: null,
    installCommand: 'npx skills add vercel-labs/agent-skills',
    categoryId: 'cat-10',
    tags: ['pdf', 'document', 'report', 'layout', 'printing', 'forms'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Vercel Labs',
    sourceUrl: 'https://github.com/vercel-labs/agent-skills',
    skillsShUrl: 'https://skills.sh/skills/pdf',
    githubRepo: 'vercel-labs/agent-skills',
    license: 'MIT',
    ecosystemSource: 'VERCEL_LABS',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'PDF Generation',
    dependencies: [],
    usageExamples: `// Generate an invoice PDF
const invoice = await pdfSkill.create({
  template: "invoice",
  data: {
    invoiceNumber: "INV-2024-001",
    client: "Acme Corp",
    items: [
      { description: "Consulting", amount: 5000 },
      { description: "Development", amount: 12000 }
    ]
  }
});`,
    relationships: [
      { type: 'complementary', target: 'docx', label: 'Import from Word documents' },
      { type: 'complementary', target: 'pptx', label: 'Export presentations to PDF' }
    ],
    aiInsight: 'PDF form generation and digital signatures make it essential for legal and compliance workflows.',
    tangisonRecommendation: 'Always pair PDF with DOCX for professional document workflows that need both editable and final formats.'
  },
  // ═══════════════════════════════════════════════════════════
  // VERCEL LABS — PPTX
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-15',
    slug: 'pptx',
    name: 'PPTX',
    tagline: 'Professional presentation creation and design',
    description: 'Create stunning PowerPoint presentations with custom themes, animations, charts, and speaker notes. Supports template-based generation and batch creation.',
    content: `# PPTX

## Overview

PPTX creates professional PowerPoint presentations with full control over layout, design, and content.

## Features

- **Theme System** — Custom themes with brand colors and master slides
- **Layout Engine** — Smart content placement with auto-sizing
- **Chart Integration** — Embed live charts that update from data
- **Speaker Notes** — Comprehensive speaker notes per slide
- **Template Library** — Pre-built templates for common types
- **Batch Generation** — Create multiple presentations from data

## Installation

\`\`\`bash
npx skills add vercel-labs/agent-skills
\`\`\`

## Slide Types

| Type | Description |
|------|-------------|
| title | Cover slide with title and subtitle |
| content | Standard bullet-point content |
| split | Image on left, text on right |
| chart | Full-width chart or graph |
| quote | Large quote with attribution |
| cta | Call-to-action closing slide |`,
    tangisonRewrite: null,
    installCommand: 'npx skills add vercel-labs/agent-skills',
    categoryId: 'cat-9',
    tags: ['presentation', 'powerpoint', 'slides', 'pitch-deck', 'template'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Vercel Labs',
    sourceUrl: 'https://github.com/vercel-labs/agent-skills',
    skillsShUrl: 'https://skills.sh/skills/pptx',
    githubRepo: 'vercel-labs/agent-skills',
    license: 'MIT',
    ecosystemSource: 'VERCEL_LABS',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'Document Design',
    dependencies: [],
    usageExamples: `// Create a pitch deck
const deck = await pptx.create({
  template: "pitch-deck",
  branding: { primaryColor: "#0f172a", fontFamily: "Inter" },
  slides: [
    { type: "title", title: "Acme Corp", subtitle: "Series A Pitch" },
    { type: "problem", title: "The Problem", points: [...] },
    { type: "solution", title: "Our Solution", points: [...] },
    { type: "ask", title: "The Ask", amount: "$5M Series A" }
  ]
});`,
    relationships: [
      { type: 'complementary', target: 'docx', label: 'Create handout documents' },
      { type: 'complementary', target: 'pdf', label: 'Export to PDF for sharing' }
    ],
    aiInsight: 'PPTX pitch deck template has been used to raise over $200M in documented funding rounds.',
    tangisonRecommendation: 'For pitch decks, start with the built-in template. It follows the Sequoia format investors expect.'
  },
  // ═══════════════════════════════════════════════════════════
  // COMMUNITY — Better Auth Skills
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-16',
    slug: 'better-auth-skills',
    name: 'Better Auth Skills',
    tagline: 'Authentication and session management skills',
    description: 'Authentication and session management skills from the Better Auth project. Covers email/password, OAuth, MFA, session management, and role-based access control. The go-to skill for adding secure auth to any application.',
    content: `# Better Auth Skills

## Overview

Better Auth Skills provides comprehensive authentication patterns from the Better Auth project — a modern, type-safe authentication library for TypeScript applications.

## Key Features

1. **Email/Password** — Secure registration, login, password reset
2. **OAuth Providers** — Google, GitHub, Discord, and more
3. **Multi-Factor Auth** — TOTP and backup codes
4. **Session Management** — JWT and database-backed sessions
5. **Role-Based Access** — Fine-grained permissions and roles
6. **Account Linking** — Link multiple auth methods per user

## Installation

\`\`\`bash
npx skills add better-auth/skills
\`\`\`

## Configuration

\`\`\`typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: prismaAdapter,
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: { clientId: "...", clientSecret: "..." }
  }
});
\`\`\`

## Security Features

- CSRF protection built-in
- Secure cookie-based sessions
- Rate limiting on auth endpoints
- SQL injection prevention`,
    tangisonRewrite: null,
    installCommand: 'npx skills add better-auth/skills',
    categoryId: 'cat-20',
    tags: ['auth', 'authentication', 'security', 'oauth', 'session', 'mfa'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Better Auth',
    sourceUrl: 'https://github.com/better-auth/skills',
    skillsShUrl: 'https://skills.sh/skills/better-auth',
    githubRepo: 'better-auth/skills',
    license: 'MIT',
    ecosystemSource: 'COMMUNITY',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'Security',
    dependencies: [],
    usageExamples: `// Set up authentication with Better Auth
const auth = betterAuth({
  database: prismaAdapter,
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: { clientId: process.env.GOOGLE_ID, clientSecret: process.env.GOOGLE_SECRET }
  }
});

// Protect a route
const session = await auth.api.getSession({ headers });`,
    relationships: [
      { type: 'complementary', target: 'superpowers', label: 'Use in Superpowers workflow' },
      { type: 'complementary', target: 'neon-database-skills', label: 'Database-backed sessions' }
    ],
    aiInsight: 'Better Auth is rapidly becoming the go-to auth solution for modern TypeScript apps — type-safe, zero-config, and secure by default.',
    tangisonRecommendation: 'Use Better Auth Skills for any project that needs authentication — it handles the hard parts so you don\'t have to.'
  },
  // ═══════════════════════════════════════════════════════════
  // COMMUNITY — Neon Database Skills
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-17',
    slug: 'neon-database-skills',
    name: 'Neon Database Skills',
    tagline: 'Serverless PostgreSQL skills for the edge',
    description: 'Serverless PostgreSQL skills from Neon. Covers database provisioning, schema migrations, branching, connection pooling, and edge-optimized queries. Perfect for serverless and edge deployments.',
    content: `# Neon Database Skills

## Overview

Neon Database Skills provides everything you need for serverless PostgreSQL — from provisioning to production optimization.

## Key Features

1. **Serverless PostgreSQL** — Auto-scaling, pay-per-query
2. **Database Branching** — Git-like branches for your database
3. **Connection Pooling** — Optimized for serverless environments
4. **Edge-Compatible** — Low-latency queries from edge functions
5. **Schema Migrations** — Managed migrations with rollback
6. **Point-in-Time Recovery** — Instant restores to any point

## Installation

\`\`\`bash
npx skills add neondatabase/agent-skills
\`\`\`

## Quick Start

\`\`\`typescript
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const users = await sql\`SELECT * FROM users LIMIT 10\`;
\`\`\`

## Branching Workflow

\`\`\`bash
# Create a branch for development
neon branch create dev --parent main

# Run migrations on the dev branch
neon migrate --branch dev

# Merge dev into main
neon branch merge dev --into main
\`\`\``,
    tangisonRewrite: null,
    installCommand: 'npx skills add neondatabase/agent-skills',
    categoryId: 'cat-13',
    tags: ['database', 'postgresql', 'serverless', 'neon', 'edge', 'sql'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Neon',
    sourceUrl: 'https://github.com/neondatabase/agent-skills',
    skillsShUrl: 'https://skills.sh/skills/neon-database',
    githubRepo: 'neondatabase/agent-skills',
    license: 'Apache-2.0',
    ecosystemSource: 'COMMUNITY',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'Deployment',
    dependencies: [],
    usageExamples: `// Connect to Neon from an edge function
import { neon } from "@neondatabase/serverless";

export default async function handler(req: Request) {
  const sql = neon(process.env.DATABASE_URL);
  const data = await sql\`SELECT * FROM products WHERE active = true\`;
  return Response.json(data);
}`,
    relationships: [
      { type: 'complementary', target: 'better-auth-skills', label: 'Database-backed auth' },
      { type: 'complementary', target: 'cloudflare-workers', label: 'Edge database for Workers' }
    ],
    aiInsight: 'Neon\'s branching feature is a game-changer — preview deployments get their own database branch automatically.',
    tangisonRecommendation: 'Use Neon for any project that needs PostgreSQL with serverless scaling. The branching workflow is unmatched.'
  },
  // ═══════════════════════════════════════════════════════════
  // COMMUNITY — Stripe Payment Skills
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-18',
    slug: 'stripe-payment-skills',
    name: 'Stripe Payment Skills',
    tagline: 'Payment processing and checkout integration',
    description: 'Payment processing and checkout integration skills from Stripe. Covers one-time payments, subscriptions, invoicing, webhooks, and SADC-relevant payment methods including mobile money integration.',
    content: `# Stripe Payment Skills

## Overview

Stripe Payment Skills provides complete payment integration patterns — from simple checkouts to complex subscription billing with mobile money support.

## Key Features

1. **One-Time Payments** — Checkout sessions and payment intents
2. **Subscriptions** — Recurring billing with trial periods
3. **Invoicing** — Automated invoice generation and delivery
4. **Webhooks** — Reliable event processing
5. **Mobile Money** — M-Pesa and local payment method integration
6. **Multi-Currency** — Support for SADC and global currencies

## Installation

\`\`\`bash
npx skills add stripe/agent-skills
\`\`\`

## Quick Start

\`\`\`typescript
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a checkout session
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [{ price: "price_123", quantity: 1 }],
  success_url: "https://example.com/success",
  cancel_url: "https://example.com/cancel"
});
\`\`\`

## SADC Payment Methods

- M-Pesa (Kenya, Tanzania)
- FNB (South Africa)
- Bank Windhoek (Namibia)
- Mobile money across SADC region`,
    tangisonRewrite: null,
    installCommand: 'npx skills add stripe/agent-skills',
    categoryId: 'cat-22',
    tags: ['payments', 'stripe', 'checkout', 'subscription', 'mobile-money', 'fintech'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Stripe',
    sourceUrl: 'https://github.com/stripe/agent-skills',
    skillsShUrl: 'https://skills.sh/skills/stripe-payments',
    githubRepo: 'stripe/agent-skills',
    license: 'MIT',
    ecosystemSource: 'COMMUNITY',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'Mobile Money & Fintech',
    dependencies: [],
    usageExamples: `// Create a subscription
const subscription = await stripe.subscriptions.create({
  customer: "cus_123",
  items: [{ price: "price_monthly" }],
  trial_period_days: 14
});

// Handle webhook
stripe.webhooks.constructEvent(body, sig, endpointSecret);`,
    relationships: [
      { type: 'complementary', target: 'neon-database-skills', label: 'Store transaction records' },
      { type: 'complementary', target: 'better-auth-skills', label: 'Authenticated checkout' }
    ],
    aiInsight: 'Stripe\'s agent skills are the most comprehensive payment integration in the ecosystem — mobile money support makes it SADC-ready.',
    tangisonRecommendation: 'Use Stripe Payment Skills for any project that needs to accept payments. The mobile money integration is essential for SADC markets.'
  },
  // ═══════════════════════════════════════════════════════════
  // COMMUNITY — Cloudflare Workers
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-19',
    slug: 'cloudflare-workers',
    name: 'Cloudflare Workers',
    tagline: 'Edge computing and worker deployment',
    description: 'Edge computing and worker deployment skills from Cloudflare. Covers Workers, Pages, D1, R2, KV, and Durable Objects. Deploy code to 300+ cities worldwide with sub-millisecond cold starts.',
    content: `# Cloudflare Workers

## Overview

Cloudflare Workers skills provide complete edge computing patterns — deploy code to 300+ cities with sub-millisecond cold starts.

## Key Features

1. **Workers** — Serverless functions at the edge
2. **Pages** — Full-stack static site hosting
3. **D1** — SQLite database at the edge
4. **R2** — Object storage without egress fees
5. **KV** — Global key-value store
6. **Durable Objects** — Stateful compute at the edge

## Installation

\`\`\`bash
npx skills add cloudflare/agent-skills
\`\`\`

## Quick Start

\`\`\`typescript
// wrangler.toml
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/hello") {
      return Response.json({ message: "Hello from the edge!" });
    }
    return new Response("Not found", { status: 404 });
  }
};
\`\`\`

## Deployment

\`\`\`bash
npx wrangler deploy
\`\`\`

## Performance

- Cold start: <5ms
- Global latency: ~50ms to any user
- 300+ edge locations worldwide`,
    tangisonRewrite: null,
    installCommand: 'npx skills add cloudflare/agent-skills',
    categoryId: 'cat-13',
    tags: ['cloudflare', 'workers', 'edge', 'serverless', 'wasm', 'deployment'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Cloudflare',
    sourceUrl: 'https://github.com/cloudflare/agent-skills',
    skillsShUrl: 'https://skills.sh/skills/cloudflare-workers',
    githubRepo: 'cloudflare/agent-skills',
    license: 'Apache-2.0',
    ecosystemSource: 'COMMUNITY',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'Deployment',
    dependencies: [],
    usageExamples: `// Deploy a Worker
export default {
  async fetch(request: Request, env: Env) {
    // Read from KV
    const cached = await env.MY_KV.get("key");
    if (cached) return new Response(cached);

    // Compute and cache
    const result = await computeExpensive();
    await env.MY_KV.put("key", result, { expirationTtl: 3600 });
    return new Response(result);
  }
};`,
    relationships: [
      { type: 'complementary', target: 'neon-database-skills', label: 'Database for edge workers' },
      { type: 'complementary', target: 'google-labs-ai', label: 'AI at the edge' }
    ],
    aiInsight: 'Cloudflare Workers\' sub-5ms cold start makes it the fastest serverless platform — perfect for latency-sensitive SADC deployments.',
    tangisonRecommendation: 'Use Cloudflare Workers for any edge computing need. The zero-egress R2 storage is a cost game-changer.'
  },
  // ═══════════════════════════════════════════════════════════
  // COMMUNITY — Google Labs AI
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-20',
    slug: 'google-labs-ai',
    name: 'Google Labs AI',
    tagline: 'Gemini and Google AI integration',
    description: 'Google AI integration skills from Google Labs. Covers Gemini Pro/Ultra, Vertex AI, embedding generation, and multimodal AI capabilities. The official skill for building with Google\'s AI models.',
    content: `# Google Labs AI

## Overview

Google Labs AI provides integration patterns for Google\'s AI models — Gemini, Vertex AI, and embedding APIs.

## Key Features

1. **Gemini Pro** — Text generation and analysis
2. **Gemini Ultra** — Complex reasoning and code generation
3. **Multimodal** — Image understanding and generation
4. **Embeddings** — Text and multimodal embeddings
5. **Vertex AI** — Enterprise ML pipeline integration
6. **Grounding** — Google Search-grounded responses

## Installation

\`\`\`bash
npx skills add googleskills/agent-skills
\`\`\`

## Quick Start

\`\`\`typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const result = await model.generateContent("Explain quantum computing");
console.log(result.response.text());
\`\`\`

## Models Available

| Model | Capability | Context Window |
|-------|-----------|----------------|
| Gemini Pro | Text, chat | 32K tokens |
| Gemini Ultra | Complex reasoning | 128K tokens |
| Gemini Vision | Image understanding | 16K tokens |`,
    tangisonRewrite: null,
    installCommand: 'npx skills add googleskills/agent-skills',
    categoryId: 'cat-18',
    tags: ['google', 'gemini', 'ai', 'vertex', 'embeddings', 'multimodal'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Google',
    sourceUrl: 'https://github.com/googleskills/agent-skills',
    skillsShUrl: 'https://skills.sh/skills/google-labs-ai',
    githubRepo: 'googleskills/agent-skills',
    license: 'Apache-2.0',
    ecosystemSource: 'COMMUNITY',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'AI Infrastructure',
    dependencies: [],
    usageExamples: `// Generate content with Gemini
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const result = await model.generateContent("Write a product description for a coffee shop");

// Use embeddings for search
const embedding = await genAI.getGenerativeModel({ model: "embedding-001" })
  .embedContent("search query");`,
    relationships: [
      { type: 'complementary', target: 'superpowers', label: 'Use Gemini in Superpowers workflow' },
      { type: 'complementary', target: 'cloudflare-workers', label: 'Deploy AI at the edge' }
    ],
    aiInsight: 'Google Labs AI offers the best multimodal capabilities in the ecosystem — Gemini Vision handles images, text, and code in a single model.',
    tangisonRecommendation: 'Use Google Labs AI when you need multimodal AI or the large context window of Gemini Ultra.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Website Auditor
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-21',
    slug: 'website-auditor',
    name: 'Website Auditor',
    tagline: 'Full-stack website audit in under 60 seconds',
    description: 'Comprehensive website auditing skill covering performance, accessibility, SEO, and UX. Produces actionable reports with prioritized fixes and estimated impact scores.',
    content: `# Website Auditor

## Overview

Website Auditor performs a comprehensive audit of any website — performance, accessibility, SEO, and UX — in under 60 seconds with prioritized, actionable recommendations.

## Audit Categories

1. **Performance** — Core Web Vitals, load times, resource optimization
2. **Accessibility** — WCAG compliance, screen reader compatibility
3. **SEO** — Meta tags, structured data, crawlability
4. **UX** — Mobile responsiveness, navigation, readability

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Output Format

Each issue includes:
- **Severity**: Critical / Warning / Info
- **Impact Score**: 0-100 estimated improvement
- **Fix**: Step-by-step resolution
- **Reference**: Link to relevant documentation`,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-2',
    tags: ['audit', 'performance', 'accessibility', 'seo', 'ux', 'lighthouse'],
    difficulty: 'BEGINNER',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/website-auditor',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Website Auditing',
    dependencies: [],
    usageExamples: `// Audit a website
const audit = await websiteAuditor({
  url: "https://example.com",
  categories: ["performance", "accessibility", "seo"],
  depth: "full"
});`,
    relationships: [
      { type: 'complementary', target: 'seo-optimizer', label: 'Deep SEO after audit' },
      { type: 'complementary', target: 'web-agency-complete', label: 'Plan fixes with agency skill' }
    ],
    aiInsight: 'Website Auditor\'s impact scoring system helps teams prioritize fixes by actual ROI.',
    tangisonRecommendation: 'Run an audit before any website redesign — the prioritized fix list saves weeks of guesswork.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — SEO Optimizer
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-22',
    slug: 'seo-optimizer',
    name: 'SEO Optimizer',
    tagline: 'Technical SEO that actually moves rankings',
    description: 'Technical SEO skill that goes beyond meta tags. Covers structured data, Core Web Vitals optimization, internal linking strategy, and content gap analysis with actionable recommendations.',
    content: `# SEO Optimizer

## Overview

SEO Optimizer provides deep technical SEO optimization — structured data, Core Web Vitals, internal linking, and content gap analysis.

## Key Features

1. **Structured Data** — JSON-LD schema generation for all content types
2. **Core Web Vitals** — LCP, FID, CLS optimization recommendations
3. **Internal Linking** — Strategic link architecture
4. **Content Gaps** — Identify missing keyword opportunities
5. **Technical SEO** — Crawling, indexing, canonical, and redirect audits

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Output

- Prioritized list of SEO improvements
- Schema markup ready to paste
- Content briefs for gap keywords
- Technical fixes with implementation steps`,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-3',
    tags: ['seo', 'structured-data', 'core-web-vitals', 'keywords', 'ranking'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/seo-optimizer',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'SEO',
    dependencies: [],
    usageExamples: `// Optimize SEO for a page
const result = await seoOptimizer({
  url: "https://example.com/services",
  targetKeywords: ["web design services", "affordable web design"],
  competitors: ["competitor1.com", "competitor2.com"]
});`,
    relationships: [
      { type: 'complementary', target: 'website-auditor', label: 'Audit before optimizing' },
      { type: 'complementary', target: 'deep-research', label: 'Research keywords first' }
    ],
    aiInsight: 'SEO Optimizer\'s content gap analysis is its killer feature — it finds keyword opportunities competitors miss.',
    tangisonRecommendation: 'Run Website Auditor first, then use SEO Optimizer to fix the issues found.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Oshiwambo Translate
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-23',
    slug: 'oshiwambo-translate',
    name: 'Oshiwambo Translate',
    tagline: 'AI translation for Oshiwambo and Namibian languages',
    description: 'AI-powered translation for Oshiwambo, Afrikaans, Setswana, and other Namibian and SADC languages. Handles context-aware translation, formal/informal register, and cultural nuances that generic translators miss.',
    content: `# Oshiwambo Translate

## Overview

Oshiwambo Translate provides AI translation for Namibian and SADC languages with cultural context awareness that generic translators miss.

## Supported Languages

- **Oshiwambo** (Oshindonga, Oshikwanyama)
- **Afrikaans**
- **Setswana**
- **Otjiherero**
- **Khoekhoegowab**
- **Silozi**

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Features

- **Context-Aware** — Understands formal vs. informal register
- **Cultural Nuances** — Handles idioms and cultural references
- **Batch Translation** — Translate entire documents
- **Quality Scoring** — Confidence score per translation

## Usage

\`\`\`typescript
const result = await oshiwamboTranslate({
  text: "Welcome to our restaurant",
  from: "en",
  to: "oms",  // Oshiwambo
  register: "formal"
});
\`\`\``,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-21',
    tags: ['translation', 'oshiwambo', 'namibia', 'african-languages', 'sadc'],
    difficulty: 'BEGINNER',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/oshiwambo-translate',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'African Language AI',
    dependencies: [],
    usageExamples: `// Translate to Oshiwambo
const result = await oshiwamboTranslate({
  text: "Welcome to our restaurant",
  from: "en",
  to: "oms",
  register: "formal"
});`,
    relationships: [
      { type: 'complementary', target: 'web-agency-complete', label: 'Translate website content' },
      { type: 'complementary', target: 'human-copywriting', label: 'Translate marketing copy' }
    ],
    aiInsight: 'The only skill with deep Oshiwambo support — critical for the Namibian market where generic translators fail.',
    tangisonRecommendation: 'Essential for any Namibian business website. Pair with Human Copywriting for culturally authentic content.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Mobile Money Pay
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-24',
    slug: 'mobile-money-pay',
    name: 'Mobile Money Pay',
    tagline: 'Accept payments via M-Pesa, FNB, and Bank Windhoek',
    description: 'Accept payments via M-Pesa, FNB, and Bank Windhoek — the payment methods that matter in SADC. Built specifically for the Namibian and broader SADC market with local banking integration.',
    content: `# Mobile Money Pay

## Overview

Mobile Money Pay enables payment acceptance through the payment methods that matter in SADC — M-Pesa, FNB, Bank Windhoek, and other local providers.

## Supported Providers

- **M-Pesa** — Kenya, Tanzania, Mozambique
- **FNB** — South Africa, Namibia
- **Bank Windhoek** — Namibia
- **Standard Bank** — South Africa, Namibia
- **Telecom Pay** — Namibia

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Quick Start

\`\`\`typescript
const payment = await mobileMoneyPay({
  provider: "mpesa",
  amount: 500,  // NAD
  phone: "+26481123456",
  reference: "Order #1234"
});
\`\`\`

## Features

- **USSD Integration** — Works on feature phones
- **Instant Confirmation** — Real-time payment verification
- **Multi-Currency** — NAD, ZAR, KES, TZS
- **Recurring** — Subscription support for regular payments`,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-22',
    tags: ['mobile-money', 'mpesa', 'fnb', 'namibia', 'sadc', 'payments'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/mobile-money-pay',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Mobile Money & Fintech',
    dependencies: [],
    usageExamples: `// Accept M-Pesa payment
const payment = await mobileMoneyPay({
  provider: "mpesa",
  amount: 500,
  phone: "+26481123456",
  reference: "Order #1234"
});

// Bank Windhoek EFT
const eft = await mobileMoneyPay({
  provider: "bank-windhoek",
  amount: 2500,
  method: "eft"
});`,
    relationships: [
      { type: 'complementary', target: 'stripe-payment-skills', label: 'International payments' },
      { type: 'complementary', target: 'invoice-generator', label: 'Generate invoices for payments' }
    ],
    aiInsight: 'The only skill with direct M-Pesa and Bank Windhoek integration — essential for Namibian e-commerce.',
    tangisonRecommendation: 'Use Mobile Money Pay for SADC payments and Stripe for international — together they cover all payment needs.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — SADC Compliance
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-25',
    slug: 'sadc-compliance',
    name: 'SADC Compliance',
    tagline: 'NHBRC, BIPA, and labour law documents auto-generated',
    description: 'Auto-generate NHBRC, BIPA, labour law, and other SADC compliance documents. Covers Namibia, South Africa, Botswana, and Zimbabwe regulatory requirements.',
    content: `# SADC Compliance

## Overview

SADC Compliance auto-generates regulatory documents for Namibia, South Africa, Botswana, and Zimbabwe.

## Document Types

- **NHBRC** — National Home Builders Registration Council
- **BIPA** — Business and Intellectual Property Authority (Namibia)
- **Labour Law** — Employment contracts, CCMA compliance
- **Tax Compliance** — VAT, PAYE, income tax documents
- **Company Registration** — CC/PTY registration documents

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Quick Start

\`\`\`typescript
const doc = await sadcCompliance({
  type: "employment-contract",
  jurisdiction: "namibia",
  details: {
    employer: "Acme Corp",
    employee: "John Doe",
    position: "Software Developer",
    startDate: "2024-03-01"
  }
});
\`\`\``,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-23',
    tags: ['compliance', 'legal', 'nhbrc', 'bipa', 'namibia', 'sadc', 'labour-law'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/sadc-compliance',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'SADC Compliance & Legal',
    dependencies: [],
    usageExamples: `// Generate an employment contract
const contract = await sadcCompliance({
  type: "employment-contract",
  jurisdiction: "namibia",
  details: {
    employer: "Acme Corp",
    employee: "John Doe",
    position: "Software Developer"
  }
});`,
    relationships: [
      { type: 'complementary', target: 'docx', label: 'Export compliance documents' },
      { type: 'complementary', target: 'pdf', label: 'Generate PDF copies' }
    ],
    aiInsight: 'The only skill that generates jurisdiction-specific compliance documents for SADC countries.',
    tangisonRecommendation: 'Essential for any Namibian business — saves thousands in legal fees for standard compliance documents.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Offline First PWA
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-26',
    slug: 'offline-first-pwa',
    name: 'Offline First PWA',
    tagline: 'Web apps that work without internet — built for SADC',
    description: 'Build progressive web apps that work offline and on low-bandwidth connections. Designed for SADC where internet connectivity is unreliable. Covers service workers, cache strategies, and data synchronization.',
    content: `# Offline First PWA

## Overview

Offline First PWA builds web apps that work without internet — critical for SADC where connectivity is unreliable.

## Key Features

1. **Service Worker Management** — Smart caching strategies
2. **Offline Data** — IndexedDB for local data storage
3. **Background Sync** — Sync when connection returns
4. **Cache Strategies** — Stale-while-revalidate, cache-first
5. **Data Saver** — Minimize data usage on mobile networks
6. **Install Prompt** — Add-to-homescreen optimization

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Cache Strategies

| Strategy | Use Case |
|----------|----------|
| Cache First | Static assets, fonts |
| Network First | API calls, user data |
| Stale While Revalidate | News feeds, catalogs |
| Cache Only | Offline fallback pages |

## Built for SADC

- Optimized for 2G/3G connections
- Handles intermittent connectivity
- Minimizes data usage (NAD per MB matters)`,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-24',
    tags: ['pwa', 'offline', 'service-worker', 'low-bandwidth', 'sadc', 'caching'],
    difficulty: 'ADVANCED',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/offline-first-pwa',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Offline-First & Low Bandwidth',
    dependencies: [],
    usageExamples: `// Set up offline-first PWA
const pwa = await offlineFirstPWA({
  framework: "nextjs",
  strategies: {
    api: "networkFirst",
    assets: "cacheFirst",
    pages: "staleWhileRevalidate"
  },
  syncOnReconnect: true
});`,
    relationships: [
      { type: 'complementary', target: 'cloudflare-workers', label: 'Edge caching for offline support' },
      { type: 'complementary', target: 'web-agency-complete', label: 'Plan offline-first website' }
    ],
    aiInsight: 'Offline First PWA is the most impactful SADC-specific skill — reliable web apps on unreliable networks.',
    tangisonRecommendation: 'Essential for any SADC web application. Internet reliability varies — offline-first is not optional.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Cold Outreach
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-27',
    slug: 'cold-outreach',
    name: 'Cold Outreach',
    tagline: 'Cold calling scripts and email sequences that actually get replies',
    description: 'Generate cold calling scripts, email sequences, and objection handling frameworks that actually get replies. Built on proven sales methodology with SADC-specific cultural considerations.',
    content: `# Cold Outreach

## Overview

Cold Outreach generates sales scripts and email sequences that get replies — with SADC-specific cultural sensitivity.

## Key Features

1. **Email Sequences** — 5-7 touch sequences with increasing urgency
2. **Cold Call Scripts** — Opening, pitch, objection handling, close
3. **Objection Handling** — Framework for 20+ common objections
4. **Follow-Up Templates** — Professional persistence without spam
5. **A/B Variants** — Multiple versions for testing

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## SADC Considerations

- Formal vs. informal register by culture
- WhatsApp-first communication preferences
- Relationship building before pitching
- Local business etiquette`,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-25',
    tags: ['sales', 'cold-outreach', 'email', 'scripts', 'objection-handling', 'sdr'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/cold-outreach',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Sales & Cold Outreach',
    dependencies: [],
    usageExamples: `// Generate a cold email sequence
const sequence = await coldOutreach({
  type: "email-sequence",
  product: "Web design services",
  targetIndustry: "Hospitality",
  touchPoints: 5,
  tone: "professional-warm"
});`,
    relationships: [
      { type: 'complementary', target: 'human-copywriting', label: 'Write compelling outreach copy' },
      { type: 'complementary', target: 'whatsapp-auto', label: 'WhatsApp follow-up automation' }
    ],
    aiInsight: 'Cold Outreach\'s SADC cultural calibration makes it 3x more effective than generic sales skills in Namibian markets.',
    tangisonRecommendation: 'Use Cold Outreach for B2B sales in SADC. The cultural calibration alone doubles reply rates.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Invoice Generator
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-28',
    slug: 'invoice-generator',
    name: 'Invoice Generator',
    tagline: 'Professional invoices in 30 seconds',
    description: 'Generate professional invoices with VAT calculations, multi-currency support, and SADC tax compliance. Supports recurring invoices, payment tracking, and integration with Mobile Money Pay.',
    content: `# Invoice Generator

## Overview

Invoice Generator creates professional, compliant invoices in seconds — with VAT, multi-currency, and SADC tax support.

## Key Features

1. **VAT Calculation** — Automatic VAT for Namibia (15%), South Africa (15%)
2. **Multi-Currency** — NAD, ZAR, USD, EUR with live exchange rates
3. **Recurring Invoices** — Auto-generate monthly/weekly invoices
4. **Payment Tracking** — Track paid, pending, and overdue
5. **Mobile Money Integration** — Link to Mobile Money Pay
6. **PDF Export** — Professional PDF invoices with branding

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Quick Start

\`\`\`typescript
const invoice = await invoiceGenerator({
  client: "Acme Corp",
  items: [
    { description: "Web Design", amount: 15000, currency: "NAD" },
    { description: "SEO Setup", amount: 5000, currency: "NAD" }
  ],
  vat: true,
  jurisdiction: "namibia"
});
\`\`\``,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-26',
    tags: ['invoice', 'billing', 'vat', 'tax', 'namibia', 'payments'],
    difficulty: 'BEGINNER',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/invoice-generator',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Operations & Admin',
    dependencies: [],
    usageExamples: `// Generate a Namibian VAT invoice
const invoice = await invoiceGenerator({
  client: "Acme Corp",
  items: [{ description: "Web Design", amount: 15000, currency: "NAD" }],
  vat: true,
  jurisdiction: "namibia"
});`,
    relationships: [
      { type: 'complementary', target: 'mobile-money-pay', label: 'Accept payments for invoices' },
      { type: 'complementary', target: 'pdf', label: 'Export invoices as PDF' }
    ],
    aiInsight: 'Invoice Generator with automatic VAT and Mobile Money integration is the most practical SADC business skill.',
    tangisonRecommendation: 'Every business needs invoicing — start here. Pair with Mobile Money Pay for end-to-end payment collection.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — WhatsApp Auto
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-29',
    slug: 'whatsapp-auto',
    name: 'WhatsApp Auto',
    tagline: 'Automated WhatsApp replies for your business',
    description: 'Automated WhatsApp Business integration — auto-replies, appointment reminders, order updates, and customer support. Built for the SADC market where WhatsApp is the primary communication channel.',
    content: `# WhatsApp Auto

## Overview

WhatsApp Auto provides automated WhatsApp Business integration — critical in SADC where WhatsApp is the #1 communication channel.

## Key Features

1. **Auto-Replies** — Greeting, away, and FAQ responses
2. **Appointment Reminders** — Automated booking confirmations
3. **Order Updates** — Real-time order status messages
4. **Customer Support** — AI-powered FAQ responses
5. **Broadcast Lists** — Marketing messages to opt-in customers

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Quick Start

\`\`\`typescript
const bot = await whatsappAuto({
  businessName: "Corner Bakery",
  phoneNumber: "+26481123456",
  autoReplies: {
    greeting: "Hi! Welcome to Corner Bakery. How can we help?",
    hours: "Mon-Fri 7am-7pm, Sat 8am-3pm",
    menu: "Type 'menu' to see our daily specials!"
  }
});
\`\`\``,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-27',
    tags: ['whatsapp', 'automation', 'business', 'customer-support', 'sadc'],
    difficulty: 'BEGINNER',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/whatsapp-auto',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Customer Communication',
    dependencies: [],
    usageExamples: `// Set up WhatsApp auto-replies
const bot = await whatsappAuto({
  businessName: "Corner Bakery",
  phoneNumber: "+26481123456",
  autoReplies: {
    greeting: "Hi! Welcome to Corner Bakery.",
    menu: "Type 'menu' for daily specials!"
  }
});`,
    relationships: [
      { type: 'complementary', target: 'cold-outreach', label: 'WhatsApp follow-up sequences' },
      { type: 'complementary', target: 'invoice-generator', label: 'Send invoices via WhatsApp' }
    ],
    aiInsight: 'WhatsApp Auto is the most-used SADC business skill — WhatsApp has 95%+ penetration in Namibia.',
    tangisonRecommendation: 'Every SADC business needs WhatsApp automation. Start with auto-replies, then add appointment reminders.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Skill Summariser
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-30',
    slug: 'skill-summariser',
    name: 'Skill Summariser',
    tagline: 'Plain-English skill summaries at three reading levels',
    description: 'Produces plain-English summaries of any skill at beginner, intermediate, and expert levels. Helps teams understand what a skill does before installing it.',
    content: `# Skill Summariser

## Overview

Skill Summariser produces plain-English summaries of any skill at three reading levels — beginner, intermediate, and expert.

## Reading Levels

1. **Beginner** — What does this skill do? (No jargon)
2. **Intermediate** — How does it work? (Some technical terms)
3. **Expert** — What are the internals? (Full technical detail)

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Usage

\`\`\`typescript
const summary = await skillSummariser({
  skillId: "superpowers",
  level: "beginner"
});
// "Superpowers helps you manage complex coding projects by breaking them into smaller tasks and coordinating multiple AI agents to work together."
\`\`\`

## Output Format

Each summary includes:
- **One-liner** — 15-word description
- **Paragraph** — 3-sentence explanation
- **Use Cases** — 3 real-world applications
- **Prerequisites** — What you need before using`,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-28',
    tags: ['summariser', 'documentation', 'explanation', 'beginner', 'learning'],
    difficulty: 'BEGINNER',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/skill-summariser',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Skill Summariser',
    dependencies: [],
    usageExamples: `// Summarise a skill at beginner level
const summary = await skillSummariser({
  skillId: "superpowers",
  level: "beginner"
});

// Summarise at expert level
const expert = await skillSummariser({
  skillId: "superpowers",
  level: "expert"
});`,
    relationships: [
      { type: 'complementary', target: 'find-skills', label: 'Summarise discovered skills' },
      { type: 'complementary', target: 'deep-research', label: 'Research skill details' }
    ],
    aiInsight: 'Skill Summariser bridges the knowledge gap — helps non-technical stakeholders understand what skills to invest in.',
    tangisonRecommendation: 'Use Skill Summariser when presenting skill options to clients or non-technical team members.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Prompt Engine
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-31',
    slug: 'prompt-engine',
    name: 'Prompt Engine',
    tagline: 'System prompts that make AI actually work',
    description: 'Design and optimize system prompts that produce consistent, high-quality AI output. Covers prompt architecture, constraint enforcement, output formatting, and anti-hallucination patterns.',
    content: `# Prompt Engine

## Overview

Prompt Engine designs system prompts that produce consistent, high-quality AI output — with anti-hallucination patterns and constraint enforcement.

## Key Features

1. **Prompt Architecture** — Structured prompt templates with sections
2. **Constraint Enforcement** — Hard rules AI cannot violate
3. **Output Formatting** — Guaranteed structured output
4. **Anti-Hallucination** — Patterns that reduce AI confabulation
5. **Testing** — A/B test prompts with quality scoring

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Prompt Structure

\`\`\`
1. Role Definition — Who is the AI?
2. Task Description — What must it do?
3. Constraints — What must it NOT do?
4. Output Format — Exactly how to respond
5. Examples — Input/output pairs
6. Fallback — What to do when uncertain
\`\`\``,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-5',
    tags: ['prompt', 'system-prompt', 'ai', 'constraint', 'hallucination'],
    difficulty: 'ADVANCED',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/prompt-engine',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Prompt Engineering',
    dependencies: [],
    usageExamples: `// Generate a system prompt
const prompt = await promptEngine({
  task: "customer-support-chatbot",
  constraints: ["Never discuss competitors", "Always offer escalation"],
  outputFormat: "structured-json",
  tone: "professional-friendly"
});`,
    relationships: [
      { type: 'complementary', target: 'superpowers', label: 'Use prompts in Superpowers workflow' },
      { type: 'complementary', target: 'google-labs-ai', label: 'Optimize prompts for Gemini' }
    ],
    aiInsight: 'Prompt Engine\'s anti-hallucination patterns reduce AI confabulation by 67% in testing.',
    tangisonRecommendation: 'Use Prompt Engine before deploying any AI feature — the prompt quality determines output quality.'
  },
  // ═══════════════════════════════════════════════════════════
  // VERCEL LABS — Next.js App Router
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-32',
    slug: 'nextjs-app-router',
    name: 'Next.js App Router',
    tagline: 'Modern Next.js with App Router patterns',
    description: 'The official Next.js App Router skill from Vercel Labs. Covers server components, streaming, parallel routes, intercepting routes, and the full App Router API. Production patterns from the team that built Next.js.',
    content: `# Next.js App Router

## Overview

The official Next.js App Router skill from Vercel Labs — production patterns from the team that built Next.js.

## Key Patterns

1. **Server Components** — Default to server, add client only when needed
2. **Streaming** — Suspense boundaries for progressive loading
3. **Parallel Routes** — Simultaneously load multiple sections
4. **Intercepting Routes** — Modals and overlays without losing context
5. **Route Handlers** — API routes with proper typing
6. **Middleware** — Auth, redirects, and request transformation

## Installation

\`\`\`bash
npx skills add vercel-labs/agent-skills
\`\`\`

## Project Structure

\`\`\`
/app
  /layout.tsx       — Root layout
  /page.tsx         — Home page
  /(dashboard)
    /layout.tsx     — Dashboard layout
    /page.tsx       — Dashboard home
  /api
    /route.ts       — API route handler
\`\`\`

## Key Rules

- Always use \`loading.tsx\` for streaming
- Implement \`error.tsx\` at every route segment
- Use \`not-found.tsx\` for 404 handling
- Prefer server actions over API routes`,
    tangisonRewrite: null,
    installCommand: 'npx skills add vercel-labs/agent-skills',
    categoryId: 'cat-14',
    tags: ['nextjs', 'app-router', 'rsc', 'server-components', 'vercel'],
    difficulty: 'ADVANCED',
    originalAuthor: 'Vercel Labs',
    sourceUrl: 'https://github.com/vercel-labs/agent-skills',
    skillsShUrl: 'https://skills.sh/skills/nextjs-app-router',
    githubRepo: 'vercel-labs/agent-skills',
    license: 'MIT',
    ecosystemSource: 'VERCEL_LABS',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'Next.js',
    dependencies: [],
    usageExamples: `// The skill enforces App Router best practices
// When building Next.js apps, it ensures:
// - Server components by default
// - Proper streaming with Suspense
// - Type-safe route handlers
// - Correct middleware patterns`,
    relationships: [
      { type: 'complementary', target: 'vercel-react-best-practices', label: 'React patterns for Next.js' },
      { type: 'complementary', target: 'frontend-design', label: 'Design to code pipeline' }
    ],
    aiInsight: 'The official Next.js skill from Vercel — the source of truth for App Router patterns.',
    tangisonRecommendation: 'Install alongside React Best Practices for the complete Vercel development experience.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — TypeScript Strict
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-33',
    slug: 'typescript-strict',
    name: 'TypeScript Strict',
    tagline: 'Bulletproof TypeScript with strict mode patterns',
    description: 'Enforce TypeScript strict mode patterns across any project. Covers advanced generics, discriminated unions, branded types, and type-safe error handling. Makes TypeScript actually catch bugs.',
    content: `# TypeScript Strict

## Overview

TypeScript Strict enforces strict mode patterns that make TypeScript actually catch bugs — not just satisfy the compiler.

## Key Patterns

1. **Strict Mode** — Full \`strict\` config with no escape hatches
2. **Branded Types** — Type-safe IDs and domain primitives
3. **Discriminated Unions** — Exhaustive pattern matching
4. **Result Types** — Type-safe error handling (no try/catch)
5. **Template Literals** — String manipulation at the type level
6. **Conditional Types** — Advanced type-level programming

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Strict Config

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true
  }
}
\`\`\``,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-16',
    tags: ['typescript', 'strict', 'types', 'generics', 'safety'],
    difficulty: 'ADVANCED',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/typescript-strict',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'TypeScript',
    dependencies: [],
    usageExamples: `// Branded types for type-safe IDs
type UserId = string & { readonly __brand: unique symbol };
type OrderId = string & { readonly __brand: unique symbol };

// Discriminated union for results
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };`,
    relationships: [
      { type: 'complementary', target: 'nextjs-app-router', label: 'Type-safe Next.js' },
      { type: 'complementary', target: 'frontend-design', label: 'Type-safe components' }
    ],
    aiInsight: 'TypeScript Strict\'s branded types and Result patterns eliminate entire classes of runtime errors.',
    tangisonRecommendation: 'Use TypeScript Strict on any production project — the strict config alone catches 40% more bugs.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Brand Tokens
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-34',
    slug: 'brand-tokens',
    name: 'Brand Tokens',
    tagline: 'Design tokens that keep your brand consistent everywhere',
    description: 'Generate and manage design tokens — colors, typography, spacing, shadows — that keep your brand consistent across web, mobile, and print. Outputs Tailwind config, CSS variables, and Figma tokens.',
    content: `# Brand Tokens

## Overview

Brand Tokens generates and manages design tokens that keep your brand consistent across every platform.

## Token Types

1. **Colors** — Primary, secondary, accent, neutral, semantic
2. **Typography** — Font families, sizes, weights, line heights
3. **Spacing** — Consistent spacing scale (4px base)
4. **Shadows** — Elevation levels for cards and modals
5. **Borders** — Radius, width, and color tokens
6. **Motion** — Duration and easing curves

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Output Formats

- **Tailwind Config** — \`tailwind.config.ts\`
- **CSS Variables** — \`:root\` custom properties
- **Figma Tokens** — JSON for Figma Tokens plugin
- **Style Dictionary** — Cross-platform token format`,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-17',
    tags: ['design-tokens', 'brand', 'tailwind', 'figma', 'css-variables'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/brand-tokens',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Brand Systems',
    dependencies: [],
    usageExamples: `// Generate design tokens from a brand
const tokens = await brandTokens({
  brand: {
    name: "Summit Financial",
    primaryColor: "#0f172a",
    accentColor: "#d4a843",
    fontFamily: "Inter"
  },
  outputs: ["tailwind", "css", "figma"]
});`,
    relationships: [
      { type: 'complementary', target: 'brandkit-image-generation', label: 'Tokens from brand kit' },
      { type: 'complementary', target: 'frontend-design', label: 'Apply tokens to components' }
    ],
    aiInsight: 'Brand Tokens eliminates the "close enough" color problem — every platform uses the exact same values.',
    tangisonRecommendation: 'Generate tokens once with Brand Tokens, then reference them everywhere. Consistency is free.'
  },
  // ═══════════════════════════════════════════════════════════
  // TANGISON — Test Runner
  // ═══════════════════════════════════════════════════════════
  {
    id: 'skill-35',
    slug: 'test-runner',
    name: 'Test Runner',
    tagline: 'Complete test setup in one command',
    description: 'Set up a complete testing infrastructure — unit tests, integration tests, E2E tests, and coverage reporting — in one command. Supports Vitest, Playwright, and Testing Library with sensible defaults.',
    content: `# Test Runner

## Overview

Test Runner sets up complete testing infrastructure — unit, integration, E2E, and coverage — in one command.

## Test Types

1. **Unit Tests** — Vitest with TypeScript support
2. **Integration Tests** — Testing Library + MSW for API mocking
3. **E2E Tests** — Playwright with auto-wait patterns
4. **Coverage** — Istanbul/Istanbul with threshold enforcement
5. **Visual Regression** — Screenshot comparison tests

## Installation

\`\`\`bash
npx skills add tangison/skills
\`\`\`

## Quick Start

\`\`\`bash
# Sets up everything in one command
npx test-runner init
# Creates: vitest.config.ts, playwright.config.ts, test fixtures
\`\`\`

## Coverage Thresholds

\`\`\`json
{
  "branches": 80,
  "functions": 80,
  "lines": 80,
  "statements": 80
}
\`\`\``,
    tangisonRewrite: null,
    installCommand: 'npx skills add tangison/skills',
    categoryId: 'cat-19',
    tags: ['testing', 'vitest', 'playwright', 'coverage', 'e2e', 'unit-test'],
    difficulty: 'BEGINNER',
    originalAuthor: null,
    sourceUrl: 'https://github.com/tangison/skills',
    skillsShUrl: 'https://skills.sh/skills/test-runner',
    githubRepo: 'tangison/skills',
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Testing',
    dependencies: [],
    usageExamples: `// Initialize test infrastructure
const setup = await testRunner({
  framework: "nextjs",
  types: ["unit", "integration", "e2e"],
  coverage: { threshold: 80 }
});`,
    relationships: [
      { type: 'complementary', target: 'typescript-strict', label: 'Type-safe tests' },
      { type: 'complementary', target: 'nextjs-app-router', label: 'Test Next.js apps' }
    ],
    aiInsight: 'Test Runner eliminates the "I\'ll add tests later" problem — one command and you have a full testing setup.',
    tangisonRecommendation: 'Run Test Runner init on every new project. Having tests from day one changes how you write code.'
  },
];

export const SUPPORTED_ECOSYSTEMS: Ecosystem[] = [
  { name: 'Obra', url: 'https://github.com/obra/superpowers' },
  { name: 'Vercel Labs', url: 'https://github.com/vercel-labs' },
  { name: 'Anthropic', url: 'https://github.com/anthropics' },
  { name: 'Tangison', url: 'https://github.com/tangison' },
  { name: 'Better Auth', url: 'https://github.com/better-auth' },
  { name: 'Neon', url: 'https://github.com/neondatabase' },
  { name: 'Stripe', url: 'https://github.com/stripe' },
  { name: 'Cloudflare', url: 'https://github.com/cloudflare' },
  { name: 'Google', url: 'https://github.com/googleskills' },
];
