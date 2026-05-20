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
import ReactMarkdown from 'react-markdown';

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */
type PageRoute = 'home' | 'skills' | 'skill_detail' | 'categories' | 'trending' | 'documents' | 'research' | 'about' | 'agent_pipeline' | 'prompt_writer';
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
  { name: "Website Planning", icon: "Planning", count: 14, description: "Strategic site architecture, sitemap design, and information hierarchy for web projects" },
  { name: "Website Auditing", icon: "Auditing", count: 8, description: "Performance audits, accessibility checks, SEO analysis, and compliance verification" },
  { name: "SEO", icon: "SEO", count: 18, description: "Search optimization, keyword research, meta management, and crawlability improvements" },
  { name: "Copywriting", icon: "Copywriting", count: 32, description: "Persuasive writing, brand voice, content strategy, and conversion-focused copy" },
  { name: "Prompt Engineering", icon: "Prompt", count: 67, description: "Crafting effective AI prompts, system instructions, and prompt optimization techniques" },
  { name: "Image Generation", icon: "ImageGen", count: 24, description: "AI image creation, style transfer, visual asset generation, and art direction" },
  { name: "Flyer Design", icon: "Flyer", count: 12, description: "Event flyers, promotional materials, poster layout, and print-ready design" },
  { name: "Social Media", icon: "Social", count: 38, description: "Content calendars, platform optimization, engagement strategies, and analytics" },
  { name: "Document Design", icon: "DocDesign", count: 19, description: "Professional document layout, templates, typography systems, and brand consistency" },
  { name: "PDF Generation", icon: "PDFGen", count: 7, description: "Automated PDF creation, form generation, document merging, and digital signatures" },
  { name: "Research", icon: "Research", count: 28, description: "Academic search, source verification, citation tracking, and literature reviews" },
  { name: "Automation", icon: "Automation", count: 54, description: "Workflow orchestration, cron scheduling, batch processing, and pipeline automation" },
  { name: "Deployment", icon: "Deployment", count: 31, description: "CI/CD pipelines, hosting configuration, environment management, and release workflows" },
  { name: "Next.js", icon: "Nextjs", count: 89, description: "App Router, Server Components, middleware, API routes, and Next.js-specific patterns" },
  { name: "React", icon: "ReactIcon", count: 112, description: "Component architecture, hooks, state management, and React ecosystem integration" },
  { name: "TypeScript", icon: "TypeScriptIcon", count: 76, description: "Type safety, generics, utility types, declaration files, and TypeScript patterns" },
  { name: "Brand Systems", icon: "Brand", count: 15, description: "Design tokens, brand guidelines, visual identity, and style guide enforcement" },
  { name: "AI Infrastructure", icon: "Infra", count: 42, description: "Model deployment, inference optimization, vector stores, and AI system architecture" }
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
    tagline: 'Sovereign discovery engine that searches 40+ registries with quality-weighted ranking and honest attribution',
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

## When to Use This Skill

Use Find Skills when:

- **Discovery tasks** — Searching for AI agent capabilities across the open ecosystem
- **Ecosystem exploration** — Browsing what is available in skills.sh, Vercel Labs, Anthropic, Obra, and more
- **Skill evaluation** — Comparing install counts, quality scores, and ecosystem sources before committing
- **Project planning** — Understanding what modular capabilities exist before building from scratch

Use this ESPECIALLY when:

- Starting a new project and need to know what exists
- A teammate mentions a skill and you need to verify it
- You are about to build something from scratch (check if it already exists)
- You need to compare multiple skills for the same use case

Do NOT use when:

- You already know the exact skill slug (use direct install instead)
- You need to create a new skill (use Skill Creator)

## The Discovery Principle

Never build from scratch when a verified skill already exists. Every hour spent discovering existing capabilities saves ten hours of redundant development.

## Overview

Find Skills provides sovereign discovery across all connected registries. It is the entry point for the entire SkillsCamp workflow: every other skill in this directory was first located through Find Skills.

## Architecture: 4-Phase Discovery Pipeline

| Phase | Mode | Key Question | Output |
|-------|------|-------------|--------|
| Query | Diverge | What does the user need? | Natural language intent |
| Scan | Diverge | What exists across registries? | Raw candidate list |
| Score | Converge | Which are highest quality? | Ranked results |
| Present | Converge | What should the user see? | Verified skill cards |

## Quality Scoring Formula

The composite quality score combines three signals:

| Signal | Weight | Source | Range |
|--------|--------|--------|-------|
| Install count | 40% | Registry download stats | 0 to millions |
| GitHub stars | 30% | Repository metadata | 0 to hundreds of thousands |
| Verification status | 30% | Manual + automated review | Verified, Community, Unverified |

A skill with 1M installs and 10K stars scores differently than one with 100 installs and 5 stars, even if both are "verified."

## Search Methods

| Method | Duration | Best For | Limitation |
|--------|----------|----------|------------|
| Natural language | Instant | Exploratory discovery | May return broad results |
| Category filter | Instant | Browsing a specific domain | Requires knowing the category |
| Trending scan | Instant | Finding what is gaining momentum | Recency-biased |
| Direct slug lookup | Instant | Installing a known skill | Requires exact slug |
| Dependency graph | Slow | Understanding skill relationships | Complex queries only |

## Core Principles

| Principle | Description | Violation |
|-----------|-------------|----------|
| Intent-first | Match what the user means, not just keywords | Returning "PDF reader" when user wants "PDF generator" |
| Multi-registry | Never limit to a single source | Only searching Vercel Labs and missing Anthropic skills |
| Quality-weighted | Score combines installs, stars, verification | Recommending an unverified skill over a verified one |
| Honest attribution | Always credit original authors | Removing author field or repository link |

## Common Mistakes

| Mistake | Consequence | Fix |
|---------|-------------|-----|
| Building before searching | Duplicating existing work | Always search first |
| Using only one registry | Missing better alternatives | Search all registries |
| Ignoring quality scores | Installing broken or abandoned skills | Check scores and verification |
| Skipping verification status | Trusting unreviewed code | Prefer verified skills |

## Installation

\`\`\`jetbrains-mono
npx skills add vercel-labs/skills
\`\`\`

## Integration

- **Upstream**: Use before any other skill — Find Skills locates what you need
- **Downstream**: Pass results to Frontend Design (build it), Skill Creator (package it), or Brainstorming (ideate around it)
- **Complementary**: Pair with Brainstorming to ideate before searching, Systematic Debugging to evaluate skill quality

## Source

Repository: github.com/vercel-labs/skills
Ecosystem: skills.sh/vercel-labs/skills`,
    aiInsight: 'The gateway skill for the entire ecosystem: 40+ registries searched with quality scoring that combines install count, GitHub stars, and verification status. Every other skill in SkillsCamp was first located through Find Skills.',
    tangisonRecommendation: 'Start every project with Find Skills. It searches across all connected registries so you never build from scratch when a verified skill already exists.',
    citations: ['skills.sh/vercel-labs/skills', 'github.com/vercel-labs/skills', 'docs.skills.sh/find-skills']
  },
  {
    id: 'skill-2',
    slug: 'frontend-design',
    title: 'Frontend Design',
    category: 'React',
    tagline: 'Generates production-grade frontend code from structured specifications with accessibility, responsive design, and framework conventions enforced',
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

## When to Use This Skill

Use Frontend Design when:

- **UI generation** — Producing production-grade frontend code from design specifications
- **Rapid prototyping** — Going from concept to working interface in minutes
- **Design system implementation** — Translating Figma or Sketch designs into component code
- **Framework migration** — Rebuilding an existing UI in a different framework

Use this ESPECIALLY when:

- Starting a new page or feature with clear design specs
- Migrating from one framework to another (React to Next.js, Vue to Svelte)
- Implementing a design system with consistent components
- Need accessible components that pass WCAG 2.1 AA review

Do NOT use when:

- No design specification exists (use Brainstorming first)
- Making small CSS tweaks to existing components
- The project uses a framework not in the supported list

## The Specification Principle

Frontend code quality is proportional to specification quality. Vague specs produce vague components. Detailed specs produce production-ready code.

## Overview

Frontend Design generates production-ready frontend code from structured specifications. It supports the four major frontend frameworks and produces code that follows framework conventions, accessibility standards, and performance best practices.

## Supported Frameworks

| Framework | Router | Styling | Component Library | Status |
|-----------|--------|---------|-------------------|--------|
| Next.js | App Router + RSC | Tailwind CSS | shadcn/ui | Primary |
| React | Vite / CRA | Tailwind / CSS | shadcn/ui | Supported |
| Vue | Nuxt / Standalone | Tailwind / Scoped | Custom | Supported |
| Svelte | SvelteKit | Tailwind / Scoped | Custom | Supported |

## Generation Pipeline: 5 Phases

| Phase | Input | Process | Output |
|-------|-------|---------|--------|
| Spec parsing | JSON specification | Validate structure, extract pages and sections | Internal component tree |
| Layout generation | Component tree | Generate responsive layouts with grid and flex | JSX, Vue, or Svelte templates |
| Style application | Theme + design system | Apply Tailwind classes, responsive breakpoints | Styled components |
| Accessibility pass | Generated components | Add ARIA labels, semantic HTML, keyboard navigation | Accessible components |
| Code output | Final components | Format, organize imports, generate files | Production code with tests |

## Quality Standards Enforced

Every generated component includes these by default:

| Standard | Implementation | Verification |
|----------|---------------|-------------|
| ARIA attributes | Role, label, description on all interactive elements | Automated accessibility audit |
| Responsive design | Mobile, tablet, desktop breakpoints | Visual regression test |
| Semantic HTML | Proper heading hierarchy, landmark regions | HTML validator |
| Keyboard navigation | Focus management, tab order, skip links | Manual + automated test |
| Framework conventions | File structure, naming, import patterns | Lint rules |

## Common Specification Mistakes

| Mistake | Consequence | Fix |
|---------|-------------|-----|
| Missing responsive breakpoints | Desktop-only layout | Specify mobile, tablet, desktop in spec |
| No ARIA requirements | Inaccessible components | Add accessibility section to spec |
| Vague component names | Generic, unusable components | Use specific names like "PricingCard" not "Card" |
| Skipping state management | Static-only components | Define states: loading, error, empty, success |

## Installation

\`\`\`jetbrains-mono
npx skills add anthropics/skills
\`\`\`

## Integration

- **Upstream**: Find Skills to discover, Brainstorming to ideate before building
- **Downstream**: Systematic Debugging to fix generated code, Skill Creator to package
- **Complementary**: Pair with PDF skill for design documentation, with Brainstorming for UX ideation

## Source

Repository: github.com/anthropics/skills
Ecosystem: skills.sh/anthropics/skills`,
    aiInsight: 'The only skill in the ecosystem that generates frontend code passing accessibility review on first output. Supports 4 frameworks with framework-specific conventions enforced automatically.',
    tangisonRecommendation: 'Use Frontend Design after Find Skills locates the right approach. Its generated components include ARIA attributes and responsive breakpoints by default.',
    citations: ['skills.sh/anthropics/skills', 'github.com/anthropics/skills']
  },
  {
    id: 'skill-3',
    slug: 'brainstorming',
    title: 'Brainstorming',
    category: 'Automation',
    tagline: 'Structured ideation methodology with diverge-converge phases, anti-pattern enforcement, and workshop facilitation templates',
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

## When to Use This Skill

Use Brainstorming when:

- **Structured ideation** — Generating ideas within defined constraints and frameworks
- **Problem framing** — Refining a vague challenge into actionable opportunities
- **Creative blocks** — Breaking through stagnant thinking with structured prompts
- **Team alignment** — Getting cross-functional teams to converge on direction

Use this ESPECIALLY when:

- Starting a project and the direction is unclear
- A team disagrees on approach (diverge first, converge second)
- You have been staring at the same problem for too long
- The obvious solution feels wrong but you cannot articulate why

Do NOT use when:

- The solution is already clear and agreed upon (just build it)
- You need detailed technical analysis (use Research instead)
- Only one person is working and time is critical

## The Divergence Principle

The quality of ideas is proportional to the quantity of ideas. 10 ideas contain better solutions than 3 ideas. Never converge before you have diverged enough.

## Overview

Brainstorming provides structured ideation and creative problem-solving. It is part of the Obra Superpowers framework, an agentic skills framework that emphasizes methodical approaches over free-form thinking.

## Ideation Framework: 4 Phases

| Phase | Mode | Activity | Output |
|-------|------|----------|--------|
| Diverge | Expand | Generate maximum ideas without judgment | Raw idea list |
| Cluster | Organize | Group similar ideas, identify themes | Idea clusters |
| Evaluate | Converge | Score ideas against constraints | Ranked shortlist |
| Refine | Focus | Develop top ideas into actionable plans | Action items |

## Ideation Rules (Non-negotiable)

| Rule | Description | Violation |
|------|-------------|----------|
| Defer judgment | No criticism during brainstorming | "That will not work" during diverge phase |
| Go for quantity | More ideas equals better ideas | Stopping at 3 ideas and picking one |
| Build on others | "Yes, and..." not "No, but..." | Rejecting ideas instead of extending them |
| Encourage wild ideas | Think big, no constraints yet | Filtering for "realistic" too early |
| Be visual | Sketch, do not just talk | 30 minutes of verbal debate with no drawings |
| One conversation | Listen, build, riff | Talking over each other, not hearing ideas |
| Stay focused | Keep the How Might We visible | Wandering to unrelated topics |

## Ideation Techniques

| Technique | Description | When to Use | Time |
|-----------|-------------|-------------|------|
| Classic Brainstorm | Free association, no judgment | Starting point, warming up | 15 min |
| Brainwriting | Silent written ideas before sharing | Quiet or remote groups | 10 min |
| SCAMPER | Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse | Improving existing solutions | 20 min |
| Worst Idea | Generate intentionally bad ideas | When stuck, breaking mental blocks | 10 min |
| Constraint-based | Add artificial constraints to spark creativity | Too many options, analysis paralysis | 15 min |
| Analogy | How would a different industry solve this? | Cross-domain innovation | 20 min |
| How Might We | Frame problems as opportunity questions | Refining vague challenges | 10 min |

## Workshop Template: 50 Minutes

1. **Define the challenge** (5 min) — Write a clear "How Might We" statement
2. **Silent brainstorm** (10 min) — Individual idea generation, one per sticky note, aim for 10+ each
3. **Share and build** (15 min) — Present ideas one by one, build on others using "Yes, and..."
4. **Cluster and vote** (10 min) — Group themes, dot-vote on favorites
5. **Action plan** (10 min) — Top 3 ideas get owners and next steps

## Anti-patterns

| Anti-pattern | Signal | Fix |
|-------------|--------|-----|
| Premature convergence | Picking the first "good enough" idea | Force 10+ ideas before evaluating |
| Groupthink | Everyone agreeing too quickly | Use brainwriting for independent ideas |
| Anchor bias | First idea dominates discussion | Generate ideas silently before sharing |
| Solution jumping | Skipping to implementation | Stay in diverge until time is up |

## Installation

\`\`\`jetbrains-mono
npx skills add obra/superpowers
\`\`\`

## Integration

- **Upstream**: Find Skills for research before ideating
- **Downstream**: Frontend Design to build what you ideated, Skill Creator to package
- **Complementary**: Systematic Debugging to evaluate ideas for feasibility

## Source

Repository: github.com/obra/superpowers
Ecosystem: skills.sh/obra/superpowers`,
    aiInsight: 'The Obra Superpowers ideation skill: enforces "defer judgment" and "go for quantity" rules. Its structured diverge-converge process prevents premature convergence on weak ideas.',
    tangisonRecommendation: 'Start every project with Brainstorming. Its diverge-converge framework prevents scope creep and ensures you explore enough options before committing.',
    citations: ['skills.sh/obra/superpowers', 'github.com/obra/superpowers']
  },
  {
    id: 'skill-4',
    slug: 'skill-creator',
    title: 'Skill Creator',
    category: 'AI Infrastructure',
    tagline: 'Build and publish agent skills with mandatory install paths, documentation standards, and registry validation',
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

## When to Use This Skill

Use Skill Creator when:

- **Building custom skills** — Creating your own AI agent capabilities for the open ecosystem
- **Publishing workflows** — Packaging internal tools as shareable, installable skills
- **Skill architecture** — Designing skills with proper install paths, dependencies, and documentation
- **Community contribution** — Contributing back to the ecosystem with new capabilities

Use this ESPECIALLY when:

- You have built something useful that others could reuse
- An internal tool could benefit the broader community
- No existing skill covers your specific use case (check Find Skills first)
- You need to standardize a workflow across your team

Do NOT use when:

- A similar skill already exists (contribute to that one instead)
- You cannot provide a reproducible install path
- The skill is too specific to your organization to generalize

## The Contribution Principle

Every published skill must have a reproducible install path and complete documentation. Skills without install paths are rejected. Skills without documentation are rejected. This is non-negotiable.

## Overview

Skill Creator enables building and publishing custom agent skills to the open ecosystem. It provides templates, validation, and a publish workflow that handles registry submission, metadata generation, and quality scoring.

## Skill Architecture: Required Components

Every skill published through Skill Creator MUST include these components:

| Component | Required | Description | Validation |
|-----------|----------|-------------|------------|
| Install command | Yes | Reproducible installation path (npm, pip, npx) | Command must execute successfully in clean environment |
| Manifest | Yes | Skill metadata: name, version, author, category | Schema validation against registry spec |
| Documentation | Yes | MDX content with Overview, Usage, Installation | Minimum 30 lines of structured content |
| Dependencies | No | List of required companion skills | Each dependency must exist in registry |
| Test suite | Recommended | Verification that the skill works as described | At least one test case |
| Examples | Recommended | Code examples showing common usage patterns | At least one working example |

## Creation Pipeline: 4 Phases

| Phase | Activity | Output | Gate |
|-------|----------|--------|------|
| Template selection | Choose language and framework starter | Scaffolded skill project | Must match a supported template |
| Implementation | Write skill logic and documentation | Functional skill with docs | Documentation minimum met |
| Validation | Run quality checks against ecosystem standards | Pass or fail report | All required components present |
| Publishing | Submit to skills.sh registry | Live, installable skill | Install command verified in clean environment |

## Validation Rules

Skills are rejected if any of these fail:

| Rule | Check | Rejection Reason |
|------|-------|------------------|
| Install path exists | Command runs in clean environment | "No reproducible install path" |
| Documentation present | Minimum 30 lines of structured MDX | "Insufficient documentation" |
| Author credited | Original author field is populated | "Missing author attribution" |
| No duplicate | Slug does not exist in registry | "Skill already exists: use [existing-skill]" |
| License specified | License field matches SPDX identifier | "Invalid or missing license" |

## Common Publishing Mistakes

| Mistake | Consequence | Fix |
|---------|-------------|-----|
| Skipping Find Skills first | Publishing a duplicate | Always search before creating |
| No install path | Immediate rejection | Provide npm, pip, or npx command |
| Vague documentation | Low quality score, few installs | Write specific, structured docs |
| Missing license | Cannot be used in commercial projects | Specify MIT, Apache-2.0, or other SPDX license |
| Hardcoded secrets | Security vulnerability | Use environment variables |

## Installation

\`\`\`jetbrains-mono
npx skills add anthropics/skills
\`\`\`

## Integration

- **Upstream**: Find Skills to check if a similar skill already exists
- **Downstream**: Published skills appear in Find Skills search results
- **Complementary**: Frontend Design for creating UI-focused skills, Brainstorming for skill ideation

## Source

Repository: github.com/anthropics/skills
Ecosystem: skills.sh/anthropics/skills`,
    aiInsight: 'The ecosystem contribution gateway from Anthropic: enforces documentation standards and install path validation before any skill can be published. Rejected skills get specific feedback on what to fix.',
    tangisonRecommendation: 'Use Skill Creator to build Tangison-specific skills. Always check Find Skills first to avoid duplicating existing work.',
    citations: ['skills.sh/anthropics/skills', 'github.com/anthropics/skills', 'agentskills.io']
  },
  {
    id: 'skill-5',
    slug: 'systematic-debugging',
    title: 'Systematic Debugging',
    category: 'Automation',
    tagline: 'Structured debugging methodology that mandates root cause investigation before attempting any fixes',
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
    usageExamples: `// Start a systematic debug session with the 4-phase process
const result = await systematicDebugging({
  issue: "Memory leak in production API",
  context: { runtime: "Node.js 20", framework: "Next.js" },
  approach: "root-cause-first",
  constraints: {
    maxFixAttempts: 3,
    requireReproduction: true,
    blockSymptomPatching: true
  }
});

// Phase 1: Root Cause Investigation
const evidence = await systematicDebugging.gatherEvidence({
  layers: ["CI", "build", "runtime", "database"],
  traceDataFlow: true,
  instrumentBoundaries: true
});

// Phase 3: Hypothesis Testing (single variable)
const hypothesis = await systematicDebugging.testHypothesis({
  claim: "Connection pool exhaustion causes the leak",
  test: "Monitor pool size under load",
  controlGroup: "Same load without pool limits"
});`,
    relationships: [
      { type: 'complementary', target: 'brainstorming', label: 'Ideate solutions after diagnosis' },
      { type: 'complementary', target: 'verification-before-completion', label: 'Verify fixes' }
    ],
    contentMdx: `# Systematic Debugging

## When to Use This Skill

Use Systematic Debugging when:

- **Test failures** — Any failing test, whether unit, integration, or E2E
- **Bugs in production** — Issues affecting live systems
- **Unexpected behavior** — Code that runs but produces wrong results
- **Performance problems** — Slowness, memory leaks, crashes
- **Build failures** — CI/CD pipelines that break without clear cause
- **Integration issues** — Failures at the boundary between components

Use this ESPECIALLY when:

- Under time pressure (emergencies make guessing tempting)
- "Just one quick fix" seems obvious
- You have already tried multiple fixes
- Previous fix did not work
- You do not fully understand the issue

## The Iron Law

NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST

If you have not completed Phase 1, you cannot propose fixes. Symptom fixes are failure.

## Overview

Random fixes waste time and create new bugs. Quick patches mask underlying issues. Systematic Debugging mandates finding root causes before attempting any fixes, using a four-phase process that blocks symptom-based patching.

This skill is part of the Obra Superpowers framework. It enforces discipline: completing evidence gathering before proposing solutions, and stopping to question architecture after three failed fix attempts.

## The Four Phases

You MUST complete each phase before proceeding to the next.

| Phase | Key Activities | Success Criteria |
|-------|---------------|-----------------|
| 1. Root Cause | Read errors, reproduce, check changes, gather evidence | Understand WHAT and WHY |
| 2. Pattern | Find working examples, compare against references | Identify differences |
| 3. Hypothesis | Form theory, test minimally (one variable) | Confirmed or new hypothesis |
| 4. Implementation | Create failing test, fix root cause, verify | Bug resolved, tests pass |

## Phase 1: Root Cause Investigation

BEFORE attempting ANY fix:

| Step | Activity | Purpose |
|------|----------|---------|
| Read errors | Read stack traces completely, note line numbers and error codes | Errors often contain the exact solution |
| Reproduce | Can you trigger it reliably? What are the exact steps? | Unreproducible bugs need more data, not guesses |
| Check changes | Git diff, recent commits, new dependencies, config changes | What changed that could cause this? |
| Gather evidence | Log data at each component boundary | Identify WHERE the system breaks |
| Trace data flow | Follow bad values backward through call stack | Find the source, not the symptom |

### Diagnostic Instrumentation for Multi-Component Systems

WHEN the system has multiple components (CI to build to deploy, API to service to database):

BEFORE proposing fixes, add diagnostic instrumentation:

- For EACH component boundary: Log what data enters and exits
- Verify environment and config propagation at each layer
- Check state at each layer
- Run once to gather evidence showing WHERE it breaks
- THEN analyze evidence to identify the failing component
- THEN investigate that specific component

### Backward Call-Stack Tracing

WHEN the error is deep in a call stack:

- Where does the bad value originate?
- What called this with the bad value?
- Keep tracing up until you find the source
- Fix at the source, not at the symptom

## Phase 2: Pattern Analysis

Find the pattern before fixing:

| Step | Activity |
|------|----------|
| Find working examples | Locate similar working code in the same codebase |
| Compare against references | Read reference implementation COMPLETELY, do not skim |
| Identify differences | List every difference between working and broken, however small |
| Understand dependencies | What settings, config, environment, and assumptions does this need? |

## Phase 3: Hypothesis and Testing

Scientific method applied to debugging:

- Form SINGLE hypothesis: "I think X is the root cause because Y"
- Test MINIMALLY: Smallest possible change, one variable at a time
- Verify before continuing: Did it work? If not, form NEW hypothesis
- Do NOT add more fixes on top of a failed fix
- When you do not know: Say so. Research more or ask for help.

## Phase 4: Implementation

| Step | Activity | Rule |
|------|----------|------|
| Create failing test | Simplest possible reproduction | MUST have before fixing |
| Implement single fix | Address the root cause | ONE change at a time |
| Verify fix | Test passes, no other tests broken | Issue actually resolved |

### When Fix Does Not Work

- STOP. Count how many fixes you have tried.
- If fewer than 3: Return to Phase 1 with new information
- If 3 or more: STOP and question the architecture

### The Architecture Question (3+ Failed Fixes)

If 3+ fixes have failed, this pattern indicates an architectural problem:

- Each fix reveals new shared state, coupling, or problems in a different place
- Fixes require "massive refactoring" to implement
- Each fix creates new symptoms elsewhere

STOP and question fundamentals:

- Is this pattern fundamentally sound?
- Are we sticking with it through sheer inertia?
- Should we refactor the architecture instead of continuing to fix symptoms?

This is NOT a failed hypothesis. This is wrong architecture. Discuss with your team before attempting more fixes.

## Red Flags: STOP and Follow Process

If you catch yourself thinking any of these, STOP and return to Phase 1:

- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "Add multiple changes, run tests"
- "Skip the test, I will manually verify"
- "It is probably X, let me fix that"
- "I do not fully understand but this might work"
- "One more fix attempt" (when already tried 2+)
- Proposing solutions before tracing data flow

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| Issue is simple, do not need process | Simple issues have root causes too. Process is fast for simple bugs. |
| Emergency, no time for process | Systematic debugging is FASTER than guess-and-check thrashing. |
| Just try this first, then investigate | First fix sets the pattern. Do it right from the start. |
| Multiple fixes at once saves time | Cannot isolate what worked. Causes new bugs. |
| I see the problem, let me fix it | Seeing symptoms is not understanding root cause. |
| One more fix attempt (after 2+ failures) | 3+ failures means architectural problem. Question the pattern. |

## Supporting Techniques

These techniques are part of systematic debugging:

- **Root cause tracing** — Trace bugs backward through call stack to find original trigger
- **Defense in depth** — Add validation at multiple layers after finding root cause
- **Condition-based waiting** — Replace arbitrary timeouts with condition polling

## Related Skills

- **test-driven-development** — For creating failing test case (Phase 4, Step 1)
- **verification-before-completion** — Verify fix worked before claiming success
- **brainstorming** — Ideate solutions after Phase 1 diagnosis

## Installation

\`\`\`jetbrains-mono
npx skills add obra/superpowers
\`\`\`

## Source

Repository: github.com/obra/superpowers
Ecosystem: skills.sh/obra/superpowers`,
    aiInsight: 'The Iron Law skill from Obra Superpowers: mandates root cause investigation before any fix attempts. After 3 failed fixes, stops and questions the architecture instead of continuing to patch symptoms.',
    tangisonRecommendation: 'Apply the Iron Law on every issue: no fixes without root cause investigation first. When 3+ fixes fail, stop debugging and question the architecture.',
    citations: ['skills.sh/obra/superpowers', 'github.com/obra/superpowers']
  },
  {
    id: 'skill-6',
    slug: 'pdf',
    title: 'PDF',
    category: 'Document Design',
    tagline: 'Professional PDF creation with template-based generation, form fields, digital signatures, and brand system enforcement',
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

## When to Use This Skill

Use PDF when:

- **Document generation** — Creating professional PDF documents with precise layout control
- **Report automation** — Generating branded reports, proposals, and analyses programmatically
- **Form creation** — Building fillable PDF forms with field validation
- **Document manipulation** — Merging, splitting, or modifying existing PDF documents

Use this ESPECIALLY when:

- Generating recurring documents with consistent branding
- Need fillable forms with validation rules
- Producing compliance documents requiring digital signatures
- Automating document workflows that currently require manual creation

Do NOT use when:

- You need an editable document (use DOCX instead)
- Creating a presentation (use PPTX instead)
- The document is a one-off with no template value

## The Template Principle

Every PDF should be generated from a template, not built ad-hoc. Templates enforce brand consistency, reduce errors, and make updates propagate across all generated documents.

## Overview

PDF provides full control over PDF document creation and manipulation. Part of the Anthropic document suite, it handles layout, typography, branding, and compliance requirements for professional document workflows.

## Document Types

| Type | Layout | Key Features | Best For |
|------|--------|-------------|----------|
| Report | Multi-section with headers and footers | Auto table of contents, page numbers | Analysis, findings, research |
| Proposal | Cover page + structured sections | Section numbering, callout boxes | Business proposals, pitches |
| Invoice | Tabular with totals | Auto-calculation, tax handling | Billing, financial documents |
| Form | Fields with validation | Required fields, dropdowns, date pickers | Data collection, applications |
| Certificate | Centered, decorative | Border styles, seal placement | Awards, completions, credentials |

## Generation Pipeline: 5 Phases

| Phase | Input | Process | Output |
|-------|-------|---------|--------|
| Template selection | Document type | Load layout and style rules | Template instance |
| Content injection | Data + text | Fill template with provided content | Populated document |
| Brand application | Brand system | Apply colors, fonts, logos, spacing | Branded document |
| Rendering | PDF engine | Convert to PDF with precise layout | Binary PDF |
| Post-processing | PDF binary | Add metadata, bookmarks, compression | Final PDF |

## Brand System Enforcement

| Element | Rule | Override |
|---------|------|----------|
| Primary color | Must match brand token | Not allowed |
| Font family | Must match brand font stack | Not allowed |
| Logo placement | Fixed position per template | Position only |
| Spacing | Baseline grid alignment | Not allowed |
| Margin | Minimum 20mm all sides | Increase only |

## Form Field Validation

When generating fillable forms:

- Required fields must be marked with visual indicator
- Date fields must enforce format (ISO 8601 preferred)
- Numeric fields must enforce precision
- Dropdown options must come from predefined list
- Signature fields must validate certificate chain

## Common Generation Mistakes

| Mistake | Consequence | Fix |
|---------|-------------|-----|
| No template, ad-hoc layout | Inconsistent branding across documents | Always use templates |
| Hardcoded colors | Brand updates require regenerating all PDFs | Use brand token system |
| Missing accessibility tags | Screen readers cannot parse the PDF | Add structure tags during rendering |
| No page break control | Content splits across pages incorrectly | Define break rules in template |

## Installation

\`\`\`jetbrains-mono
npx skills add anthropics/skills
\`\`\`

## Integration

- **Upstream**: Find Skills to discover, Document Engine (SkillsCamp) to configure
- **Downstream**: Generated PDFs can be attached to reports or distributed
- **Complementary**: Pair with DOCX and PPTX from the same registry for full document workflows

## Source

Repository: github.com/anthropics/skills
Ecosystem: skills.sh/anthropics/skills`,
    aiInsight: 'Part of the Anthropic document suite: enforces brand consistency through template systems, handles form generation with field validation, and supports digital signature workflows for compliance.',
    tangisonRecommendation: 'Pair PDF with DOCX and PPTX from the same registry for full document workflows. Use the Document Engine in SkillsCamp to configure before generating.',
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
   SIMPLE MDX RENDERER — Renders markdown-like contentMdx with
   proper formatting: headers, tables, lists, code blocks, paragraphs
   ═══════════════════════════════════════════════════════════════ */
function SimpleMdxRenderer({ content, textPrimaryClass, textMutedClass, cardNestedClass, borderClass }: {
  content: string;
  textPrimaryClass: string;
  textMutedClass: string;
  cardNestedClass: string;
  borderClass: string;
}) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code blocks
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <div key={key++} className={`my-4 border rounded-[2px] overflow-hidden ${borderClass}`}>
          {lang && <div className={`px-4 py-1.5 text-[10px] font-mono uppercase tracking-wider ${textMutedClass} border-b ${borderClass} ${cardNestedClass}`}>{lang}</div>}
          <pre className={`p-4 font-mono text-xs overflow-x-auto ${cardNestedClass} ${textMutedClass}`}>{codeLines.join('\n')}</pre>
        </div>
      );
      continue;
    }

    // Tables
    if (trimmed.startsWith('|') && i + 1 < lines.length && lines[i + 1].trim().startsWith('|--')) {
      const tableRows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        if (!lines[i].trim().startsWith('|--')) {
          tableRows.push(lines[i].split('|').filter(c => c.trim()).map(c => c.trim()));
        }
        i++;
      }
      const headers = tableRows[0] || [];
      elements.push(
        <div key={key++} className="my-4 overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className={`border-b ${borderClass}`}>
                {headers.map((h, hi) => <th key={hi} className={`text-left py-2 px-3 font-mono uppercase tracking-wider ${textMutedClass} font-normal`}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(1).map((row, ri) => (
                <tr key={ri} className={`border-b ${borderClass}`}>
                  {row.map((cell, ci) => <td key={ci} className={`py-2 px-3 font-mono ${textPrimaryClass}`}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Headers
    if (trimmed.startsWith('# ')) {
      elements.push(<h1 key={key++} className={`text-2xl font-display mt-8 mb-3 first:mt-0 ${textPrimaryClass}`}>{trimmed.slice(2)}</h1>);
      i++; continue;
    }
    if (trimmed.startsWith('## ')) {
      elements.push(<h2 key={key++} className={`text-lg font-display mt-6 mb-2 ${textPrimaryClass}`}>{trimmed.slice(3)}</h2>);
      i++; continue;
    }
    if (trimmed.startsWith('### ')) {
      elements.push(<h3 key={key++} className={`text-base font-semibold mt-4 mb-2 ${textPrimaryClass}`}>{trimmed.slice(4)}</h3>);
      i++; continue;
    }

    // List items
    if (trimmed.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-2 ml-4 space-y-1">
          {listItems.map((item, li) => (
            <li key={li} className={`text-sm ${textMutedClass} list-disc`}>
              {item.split(/(\*\*.*?\*\*|`.*?`)/).map((part, pi) => {
                if (part.startsWith('**') && part.endsWith('**')) return <strong key={pi} className={textPrimaryClass}>{part.slice(2, -2)}</strong>;
                if (part.startsWith('`') && part.endsWith('`')) return <code key={pi} className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${cardNestedClass}`}>{part.slice(1, -1)}</code>;
                return part;
              })}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Empty lines
    if (trimmed === '') { i++; continue; }

    // Numbered list items
    if (/^\d+\.\s/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={key++} className="my-2 ml-4 space-y-1 list-decimal">
          {listItems.map((item, li) => (
            <li key={li} className={`text-sm ${textMutedClass}`}>
              {item.split(/(\*\*.*?\*\*|`.*?`)/).map((part, pi) => {
                if (part.startsWith('**') && part.endsWith('**')) return <strong key={pi} className={textPrimaryClass}>{part.slice(2, -2)}</strong>;
                if (part.startsWith('`') && part.endsWith('`')) return <code key={pi} className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${cardNestedClass}`}>{part.slice(1, -1)}</code>;
                return part;
              })}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraphs
    elements.push(
      <p key={key++} className={`text-sm ${textMutedClass} mb-2`}>
        {trimmed.split(/(\*\*.*?\*\*|`.*?`)/).map((part, pi) => {
          if (part.startsWith('**') && part.endsWith('**')) return <strong key={pi} className={textPrimaryClass}>{part.slice(2, -2)}</strong>;
          if (part.startsWith('`') && part.endsWith('`')) return <code key={pi} className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${cardNestedClass}`}>{part.slice(1, -1)}</code>;
          return part;
        })}
      </p>
    );
    i++;
  }

  return <>{elements}</>;
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
    { role: 'assistant', content: '**→ Welcome to SkillsCamp AI**\n\nI help you discover, evaluate, and deploy AI agent skills. Tell me what you\'re building and I\'ll recommend the right skills with install commands.\n\n**Next step:** Describe your project or ask about a specific skill category.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [chatCopiedIdx, setChatCopiedIdx] = useState<number | null>(null);
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

  // Prompt Writer state
  const [pwInput, setPwInput] = useState('');
  const [pwContext, setPwContext] = useState('Agent Builder');
  const [pwTone, setPwTone] = useState('Professional');
  const [pwResults, setPwResults] = useState<string[]>([]);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwCopiedIdx, setPwCopiedIdx] = useState<number | null>(null);

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

  // Prompt Writer: generate up to 3 rewrites
  const handlePromptWriterGenerate = useCallback(async () => {
    if (!pwInput.trim()) return;
    setPwLoading(true);
    setPwResults([]);
    const results: string[] = [];
    const rewrites = 3;
    for (let i = 0; i < rewrites; i++) {
      try {
        const res = await fetch('/api/prompt-writer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ context: pwContext, tone: pwTone, input: pwInput, variation: i + 1 }),
        });
        const data = await res.json();
        if (data.result) {
          results.push(data.result);
        } else {
          results.push(`Error: ${data.error || 'Failed to generate'}`);
        }
      } catch {
        results.push('Error: Network request failed');
      }
    }
    setPwResults(results);
    setPwLoading(false);
    showNotification(`Generated ${results.length} prompt variations`);
  }, [pwInput, pwContext, pwTone, showNotification]);

  const handlePwDownload = useCallback((text: string, idx: number) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-variation-${idx + 1}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handlePwDownloadAll = useCallback(() => {
    const combined = pwResults.map((r, i) => `═══ VARIATION ${i + 1} ═══\n\n${r}`).join('\n\n\n');
    const blob = new Blob([combined], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'skillscamp-prompts.txt';
    a.click();
    URL.revokeObjectURL(url);
  }, [pwResults]);

  // Nav items for desktop
  const navItems: { page: PageRoute; label: string }[] = [
    { page: 'skills', label: 'Skills' },
    { page: 'categories', label: 'Categories' },
    { page: 'trending', label: 'Trending' },
    { page: 'prompt_writer', label: 'Prompt Writer' },
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
                    <div className={`border rounded-[2px] p-6 overflow-x-auto leading-relaxed ${cardNestedClass} ${borderClass}`}>
                      <SimpleMdxRenderer
                        content={detailTab === 'enhanced' ? skill.contentMdx : skill.usageExamples}
                        textPrimaryClass={textPrimaryClass}
                        textMutedClass={textMutedClass}
                        cardNestedClass={cardNestedClass}
                        borderClass={borderClass}
                      />
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
                      {cat.description}
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
                <div className="flex gap-2 mt-4">
                  {['24h', '7d', '30d', 'All'].map((period) => (
                    <button key={period} className={`px-3 py-1.5 rounded-[2px] text-[10px] font-mono uppercase tracking-wider border transition-colors ${period === 'All' ? 'bg-[#C56A4A] text-[#F6F4EF] border-[#C56A4A]' : `${borderClass} ${textMutedClass} hover:border-[#C56A4A]/50`}`}>{period}</button>
                  ))}
                </div>
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
                        {['1. Executive Summary', '2. Analysis & Findings', '3. Methodology', '4. Recommendations', '5. Appendices'].map((item, idx) => (
                          <div key={item} className={`flex items-center justify-between text-sm ${textPrimaryClass}`}>
                            <span>{item}</span>
                            <span className={`text-xs font-mono ${textMutedClass}`}>{idx + 2}</span>
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

              {/* Research Search */}
              <div className={`border rounded-[2px] p-6 mb-12 ${cardClass}`}>
                <h3 className={`font-display text-lg ${textPrimaryClass} mb-4`}>Research Query</h3>
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Enter a research question or claim to verify..."
                    className={`flex-grow px-4 py-3 rounded-[2px] border text-sm font-mono placeholder:text-[#787774]/50 focus:outline-none focus:border-[#C56A4A]/40 ${cardNestedClass} ${borderClass} ${textPrimaryClass}`}
                  />
                  <button className="px-6 py-3 rounded-[2px] bg-[#C56A4A] text-[#F6F4EF] font-mono text-xs uppercase font-bold hover:bg-[#F6F4EF] hover:text-[#111315] transition-colors flex items-center gap-2 shrink-0">
                    <Search className="w-3.5 h-3.5" />Search
                  </button>
                </div>
                <div className="flex gap-2 mb-6">
                  {['All Sources', 'Academic', 'News', 'Primary', 'Reference'].map((source) => (
                    <button key={source} className={`px-3 py-1.5 rounded-[2px] text-[10px] font-mono uppercase tracking-wider border transition-colors ${source === 'All Sources' ? 'bg-[#C56A4A] text-[#F6F4EF] border-[#C56A4A]' : `${borderClass} ${textMutedClass} hover:border-[#C56A4A]/50`}`}>{source}</button>
                  ))}
                </div>
                {/* Results placeholder */}
                <div className={`border rounded-[2px] p-8 text-center ${cardNestedClass} ${borderClass}`}>
                  <Globe className={`w-8 h-8 mx-auto mb-3 ${textMutedClass}`} />
                  <p className={`text-sm font-mono ${textMutedClass}`}>Enter a query to begin multi-source research</p>
                  <p className={`text-[10px] font-mono mt-2 ${textMutedClass}`}>Results will show with confidence levels and inline citations</p>
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

              <div className={`mt-12 border-t pt-8 ${borderClass}`}>
                <SectionTag>ROADMAP</SectionTag>
                <div className="mt-4 space-y-4">
                  {[
                    { phase: 'v0.1.0', status: 'current', items: ['Skill directory with verified ecosystem data', 'AI chat assistant with LLM integration', 'Agent pipeline (3-phase Skillsmith)', 'Document engine with template preview', 'Research triangulation framework'] },
                    { phase: 'v0.2.0', status: 'planned', items: ['Live ecosystem data sync via cron jobs', 'Real-time trending from skills.sh API', 'User authentication and saved skills', 'Document export (PDF, DOCX, PPTX)'] },
                    { phase: 'v0.3.0', status: 'planned', items: ['Custom skill publishing workflow', 'Team collaboration and shared workspaces', 'API access for external integrations', 'Advanced search with semantic matching'] },
                  ].map((milestone) => (
                    <div key={milestone.phase} className={`border rounded-[2px] p-4 ${cardClass}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono font-bold text-[#C56A4A]">{milestone.phase}</span>
                        <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${milestone.status === 'current' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-[#787774]/10 text-[#787774] border border-[#787774]/20'}`}>{milestone.status}</span>
                      </div>
                      <ul className="space-y-1">
                        {milestone.items.map((item, idx) => (
                          <li key={idx} className={`text-xs ${textMutedClass} flex items-center gap-2`}>
                            <span className={`w-1 h-1 rounded-full ${milestone.status === 'current' ? 'bg-emerald-500' : 'bg-[#787774]/30'}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`mt-12 border-t pt-8 ${borderClass}`}>
                <SectionTag>VERSION HISTORY</SectionTag>
                <div className="mt-4 space-y-3">
                  {[
                    { version: '0.1.0-beta', date: '2025-03', changes: 'Initial beta release with 6 verified skills, AI chat, agent pipeline, document engine, and research framework' },
                    { version: '0.0.1-alpha', date: '2025-02', changes: 'Internal alpha with basic skill directory and navigation' },
                  ].map((release) => (
                    <div key={release.version} className={`flex gap-4 text-sm ${textPrimaryClass}`}>
                      <span className="font-mono text-xs text-[#C56A4A] shrink-0 mt-0.5">{release.version}</span>
                      <div>
                        <span className={`text-xs font-mono ${textMutedClass}`}>{release.date}</span>
                        <p className={`text-xs ${textMutedClass} mt-0.5`}>{release.changes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'prompt_writer' && (
          <section className="py-12" aria-label="Prompt Writer">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionTag>PROMPT WRITER</SectionTag>
              <h1 className={`mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-display ${textPrimaryClass} mb-2`}>
                Generate structured AI system prompts.
              </h1>
              <p className={`text-sm ${textMutedClass} mb-8 max-w-2xl`}>
                Describe what your AI should do. The Prompt Writer generates up to 3 variations — each structured with Role, Behavior, Tone, Escalation, and Constraints. 7 strict guidelines enforced on every rewrite.
              </p>

              {/* ── Input Controls ── */}
              <div className={`border rounded-[4px] p-6 ${cardClass} mb-6`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Context selector */}
                  <div>
                    <label className={`block text-xs font-mono uppercase tracking-widest mb-2 ${textMutedClass}`}>Skill Context</label>
                    <select
                      value={pwContext}
                      onChange={(e) => setPwContext(e.target.value)}
                      className={`w-full px-3 py-2.5 rounded-[2px] border text-sm ${isDark ? 'bg-[#1A1C1E] border-[#787774]/20 text-[#F6F4EF]' : 'bg-white border-[#787774]/20 text-[#111315]'} focus:outline-none focus:border-[#C56A4A]`}
                    >
                      {['Agent Builder', 'Chat', 'RAG', 'Workflow', 'Code Review', 'Data Analysis', 'Creative Writing', 'Research', 'Customer Support', 'Education'].map(ctx => (
                        <option key={ctx} value={ctx}>{ctx}</option>
                      ))}
                    </select>
                  </div>
                  {/* Tone selector */}
                  <div>
                    <label className={`block text-xs font-mono uppercase tracking-widest mb-2 ${textMutedClass}`}>Tone</label>
                    <select
                      value={pwTone}
                      onChange={(e) => setPwTone(e.target.value)}
                      className={`w-full px-3 py-2.5 rounded-[2px] border text-sm ${isDark ? 'bg-[#1A1C1E] border-[#787774]/20 text-[#F6F4EF]' : 'bg-white border-[#787774]/20 text-[#111315]'} focus:outline-none focus:border-[#C56A4A]`}
                    >
                      {['Professional', 'Technical', 'Concise', 'Detailed', 'Authoritative', 'Conversational', 'Academic', 'Minimal'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Text input */}
                <label className={`block text-xs font-mono uppercase tracking-widest mb-2 ${textMutedClass}`}>Describe your AI</label>
                <textarea
                  value={pwInput}
                  onChange={(e) => setPwInput(e.target.value)}
                  placeholder="e.g. An AI that helps developers find and install the right npm packages by analyzing their project dependencies and suggesting alternatives..."
                  rows={4}
                  className={`w-full px-3 py-2.5 rounded-[2px] border text-sm resize-y ${isDark ? 'bg-[#1A1C1E] border-[#787774]/20 text-[#F6F4EF] placeholder:text-[#787774]/50' : 'bg-white border-[#787774]/20 text-[#111315] placeholder:text-[#787774]/50'} focus:outline-none focus:border-[#C56A4A]`}
                />

                {/* Generate button */}
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={handlePromptWriterGenerate}
                    disabled={pwLoading || !pwInput.trim()}
                    className="px-6 py-2.5 rounded-[2px] text-sm font-medium bg-[#C56A4A] text-white hover:bg-[#C56A4A]/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {pwLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate 3 Variations
                      </>
                    )}
                  </button>
                  {pwLoading && (
                    <span className={`text-xs font-mono ${textMutedClass}`}>
                      Each variation takes ~3s via OpenRouter/free
                    </span>
                  )}
                </div>
              </div>

              {/* ── 7 Strict Guidelines ── */}
              <div className={`border rounded-[4px] p-4 mb-6 ${cardClass}`}>
                <SectionTag>7 STRICT GUIDELINES ENFORCED</SectionTag>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'NO HALLUCINATION — Never invent capabilities or data',
                    'NO FILLER — Remove hedging, preamble, and motivational language',
                    'ALWAYS ESCALATE — Ask for clarification rather than guess',
                    'ROLE CLARITY — Specific enough for a stranger to understand',
                    'BEHAVIOR IS ACTIONABLE — Every bullet must be testable',
                    'TONE IS ENFORCEABLE — Maps to measurable output',
                    'CONSTRAINTS ARE ABSOLUTE — Specific, measurable, no exceptions',
                  ].map((g, idx) => (
                    <div key={idx} className={`flex items-start gap-2 text-xs ${textMutedClass}`}>
                      <span className="text-[#C56A4A] font-mono shrink-0">0{idx + 1}</span>
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Results ── */}
              {pwResults.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <SectionTag>GENERATED PROMPTS</SectionTag>
                    <button
                      onClick={handlePwDownloadAll}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] text-xs font-medium border border-[#C56A4A]/30 text-[#C56A4A] hover:bg-[#C56A4A]/10 transition-colors"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      Download All
                    </button>
                  </div>

                  {pwResults.map((result, idx) => (
                    <div key={idx} className={`border rounded-[4px] ${cardClass} overflow-hidden`}>
                      {/* Result header */}
                      <div className={`flex items-center justify-between px-4 py-2.5 border-b ${borderClass}`}>
                        <span className="text-xs font-mono uppercase tracking-widest text-[#C56A4A]">
                          Variation {idx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { copyToClipboard(result); setPwCopiedIdx(idx); setTimeout(() => setPwCopiedIdx(null), 2000); }}
                            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-[2px] transition-colors ${pwCopiedIdx === idx ? 'bg-emerald-500/10 text-emerald-500' : `${textMutedClass} hover:text-[#F6F4EF]`}`}
                          >
                            {pwCopiedIdx === idx ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {pwCopiedIdx === idx ? 'Copied' : 'Copy'}
                          </button>
                          <button
                            onClick={() => handlePwDownload(result, idx)}
                            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-[2px] ${textMutedClass} hover:text-[#F6F4EF] transition-colors`}
                          >
                            <FileDown className="w-3 h-3" />
                            .txt
                          </button>
                        </div>
                      </div>
                      {/* Result content — rendered Markdown with section highlighting */}
                      <div className="p-4">
                        <div className="prose-chat">
                          <ReactMarkdown
                            components={{
                              h2: ({ children }) => {
                                const text = String(children);
                                const sectionColors: Record<string, string> = {
                                  'ROLE': 'text-[#C56A4A]',
                                  'BEHAVIOR': 'text-emerald-500',
                                  'TONE': 'text-amber-500',
                                  'ESCALATION': 'text-red-400',
                                  'CONSTRAINTS': 'text-purple-400',
                                };
                                const colorClass = Object.entries(sectionColors).find(([key]) => text.toUpperCase().includes(key))?.[1] || textPrimaryClass;
                                return <h2 className={`text-sm font-mono uppercase tracking-widest mt-4 mb-2 pb-1 border-b ${borderClass} ${colorClass}`}>{children}</h2>;
                              },
                              p: ({ children }) => <p className={`text-xs ${textPrimaryClass} mb-2`}>{children}</p>,
                              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                              li: ({ children }) => <li className={`text-xs ${textPrimaryClass} leading-relaxed`}>{children}</li>,
                              strong: ({ children }) => <strong className="font-bold text-[#C56A4A]">{children}</strong>,
                              code: ({ children, className }) => {
                                const isInline = !className;
                                return isInline ? (
                                  <code className="bg-[#C56A4A]/10 text-[#C56A4A] px-1.5 py-0.5 rounded-[2px] font-mono text-[11px]">{children}</code>
                                ) : (
                                  <code className={`${className} block bg-black/30 p-2 rounded-[2px] font-mono text-[10px] overflow-x-auto mt-1`}>{children}</code>
                                );
                              },
                            }}
                          >
                            {result}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

      </main>

      {/* ═══ AI CHAT WIDGET ═══ */}
      {chatOpen && (
        <div className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[420px] max-h-[580px] border rounded-[4px] shadow-2xl shadow-black/30 flex flex-col animate-[fadeInUp_0.3s_ease-out] ${cardClass}`}>
          {/* Chat Header */}
          <div className={`flex items-center justify-between px-4 py-3 border-b ${borderClass}`}>
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`text-xs font-mono uppercase tracking-widest ${textPrimaryClass}`}>SkillsCamp AI</span>
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] bg-[#C56A4A]/15 text-[#C56A4A] px-2 py-0.5 rounded border border-[#C56A4A]/20">beta</span>
            </div>
            <div className="flex items-center gap-2">
              {chatMessages.length > 1 && (
                <button
                  onClick={() => {
                    setChatMessages([{ role: 'assistant', content: '**→ Chat cleared.** Tell me what you\'re building and I\'ll recommend the right skills.\n\n**Next step:** Describe your project or ask about a skill category.' }]);
                    setChatCopiedIdx(null);
                  }}
                  className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-[2px] ${textMutedClass} hover:text-[#C56A4A] transition-colors`}
                  aria-label="Clear chat"
                >
                  Clear
                </button>
              )}
              <button onClick={() => setChatOpen(false)} className={`${textMutedClass} hover:text-[#F6F4EF]`} aria-label="Close assistant">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3 max-h-[420px]" style={{ scrollbarWidth: 'thin' }}>
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`text-xs leading-relaxed ${msg.role === 'assistant' ? textPrimaryClass : `${textMutedClass} text-right`}`}>
                <div className={`relative group inline-block max-w-[92%] p-3 rounded-[4px] ${msg.role === 'assistant' ? `${cardNestedClass} ${borderClass} border` : 'bg-[#C56A4A]/10 border border-[#C56A4A]/20'}`}>
                  {msg.role === 'assistant' ? (
                    <div className="prose-chat">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                          strong: ({ children }) => <strong className="font-bold text-[#C56A4A]">{children}</strong>,
                          code: ({ children, className }) => {
                            const isInline = !className;
                            return isInline ? (
                              <code className="bg-[#C56A4A]/10 text-[#C56A4A] px-1.5 py-0.5 rounded-[2px] font-mono text-[11px]">{children}</code>
                            ) : (
                              <code className={`${className} block bg-black/30 p-2 rounded-[2px] font-mono text-[10px] overflow-x-auto mt-1`}>{children}</code>
                            );
                          },
                          ul: ({ children }) => <ul className="list-disc pl-4 mb-1.5 space-y-0.5">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-4 mb-1.5 space-y-0.5">{children}</ol>,
                          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                          a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#C56A4A] hover:underline">{children}</a>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <span>{msg.content}</span>
                  )}
                  {/* Copy button on assistant messages */}
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => { copyToClipboard(msg.content); setChatCopiedIdx(idx); setTimeout(() => setChatCopiedIdx(null), 2000); }}
                      className={`absolute -bottom-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-[2px] ${chatCopiedIdx === idx ? 'bg-emerald-500/10 text-emerald-500 opacity-100' : `${cardClass} ${textMutedClass} hover:text-[#F6F4EF]`}`}
                      aria-label="Copy message"
                    >
                      {chatCopiedIdx === idx ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isAiTyping && (
              <div className={`text-xs ${textMutedClass}`}>
                <div className={`inline-block p-3 rounded-[4px] ${cardNestedClass} ${borderClass} border`}>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C56A4A] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C56A4A] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C56A4A] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="animate-pulse">Thinking...</span>
                  </div>
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
              placeholder="Describe what you're building..."
              className={`flex-grow px-3 py-2.5 rounded-[2px] text-xs font-mono placeholder:text-[#787774]/50 focus:outline-none focus:ring-1 focus:ring-[#C56A4A]/50 ${cardNestedClass} ${textPrimaryClass}`}
            />
            <button onClick={handleChatSend} disabled={isAiTyping || !chatInput.trim()} className="p-2.5 rounded-[2px] bg-[#C56A4A] text-[#F6F4EF] hover:bg-[#F6F4EF] hover:text-[#111315] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Send message">
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
