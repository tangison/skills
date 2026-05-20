import { Skill, SkillCategory, Ecosystem } from './types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  // Global Domains (20)
  { id: 'cat-1', slug: 'website-planning', name: 'Website Planning', description: 'Industry-specific website architecture blueprints — sitemap, content, SEO, CTA strategy', icon: 'LayoutGrid', skillCount: 14, sortOrder: 1 },
  { id: 'cat-2', slug: 'website-auditing', name: 'Website Auditing', description: 'Comprehensive website audits — performance, accessibility, SEO, and UX analysis', icon: 'Shield', skillCount: 8, sortOrder: 2 },
  { id: 'cat-3', slug: 'seo', name: 'SEO', description: 'Technical SEO auditing, structured data, and optimization', icon: 'Search', skillCount: 18, sortOrder: 3 },
  { id: 'cat-4', slug: 'copywriting', name: 'Copywriting', description: 'Natural, believable brand copy that converts', icon: 'PenLine', skillCount: 32, sortOrder: 4 },
  { id: 'cat-5', slug: 'prompt-engineering', name: 'Prompt Engineering', description: 'Advanced prompt design and constraint enforcement', icon: 'Terminal', skillCount: 33, sortOrder: 5 },
  { id: 'cat-6', slug: 'creative-design', name: 'Creative Design', description: 'AI-powered image creation, brand kits, and visual design systems', icon: 'Image', skillCount: 161, sortOrder: 6 },
  { id: 'cat-7', slug: 'flyer-design', name: 'Flyer Design', description: 'Professional flyer and poster design — print-safe, export-ready', icon: 'Layout', skillCount: 12, sortOrder: 7 },
  { id: 'cat-8', slug: 'social-media', name: 'Social Media', description: 'Social content creation, scheduling, and launch strategy', icon: 'Share2', skillCount: 38, sortOrder: 8 },
  { id: 'cat-9', slug: 'document-design', name: 'Document Design', description: 'Professional document creation — PDFs, Word, presentations', icon: 'FileText', skillCount: 19, sortOrder: 9 },
  { id: 'cat-10', slug: 'pdf-generation', name: 'PDF Generation', description: 'Programmatic PDF creation with layout, typography, and form support', icon: 'FileDown', skillCount: 7, sortOrder: 10 },
  { id: 'cat-11', slug: 'research', name: 'Research', description: 'Deep research, citation tracking, and source verification', icon: 'BookOpen', skillCount: 28, sortOrder: 11 },
  { id: 'cat-12', slug: 'automation', name: 'Automation', description: 'Workflow automation and CI/CD pipeline skills', icon: 'Cpu', skillCount: 29, sortOrder: 12 },
  { id: 'cat-13', slug: 'deployment', name: 'Deployment', description: 'Hosting, CDN, and production deployment strategies', icon: 'Rocket', skillCount: 31, sortOrder: 13 },
  { id: 'cat-14', slug: 'nextjs', name: 'Next.js', description: 'Next.js framework skills — App Router, RSC, and fullstack', icon: 'Box', skillCount: 126, sortOrder: 14 },
  { id: 'cat-15', slug: 'react', name: 'React', description: 'React component patterns, hooks, and state management', icon: 'Atom', skillCount: 112, sortOrder: 15 },
  { id: 'cat-16', slug: 'typescript', name: 'TypeScript', description: 'TypeScript type systems, generics, and strict mode patterns', icon: 'FileType', skillCount: 76, sortOrder: 16 },
  { id: 'cat-17', slug: 'brand-systems', name: 'Brand Systems', description: 'Brand identity systems, design tokens, and visual language', icon: 'Compass', skillCount: 15, sortOrder: 17 },
  { id: 'cat-18', slug: 'ai-infrastructure', name: 'AI Infrastructure', description: 'AI agent skills, model integration, and intelligent systems', icon: 'Server', skillCount: 42, sortOrder: 18 },
  { id: 'cat-19', slug: 'testing', name: 'Testing', description: 'Unit testing, integration testing, E2E, and quality assurance', icon: 'CheckCircle', skillCount: 63, sortOrder: 19 },
  { id: 'cat-20', slug: 'security', name: 'Security', description: 'Application security, vulnerability scanning, and compliance', icon: 'Lock', skillCount: 34, sortOrder: 20 },
  // SADC-Specific Domains (4)
  { id: 'cat-21', slug: 'african-language-ai', name: 'African Language AI', description: 'AI skills for Afrikaans, Oshiwambo, Setswana, and other African languages', icon: 'Translate', skillCount: 12, sortOrder: 21 },
  { id: 'cat-22', slug: 'mobile-money-fintech', name: 'Mobile Money & Fintech', description: 'M-Pesa, FNB, Bank Windhoek integration, payment processing for SADC', icon: 'Wallet', skillCount: 18, sortOrder: 22 },
  { id: 'cat-23', slug: 'sadc-compliance-legal', name: 'SADC Compliance & Legal', description: 'NHBRC, BIPA, labour law, and regional compliance document generation', icon: 'Scales', skillCount: 9, sortOrder: 23 },
  { id: 'cat-24', slug: 'offline-first-low-bandwidth', name: 'Offline-First & Low Bandwidth', description: 'Progressive web apps, data-saving patterns, and offline-capable AI skills', icon: 'WifiSlash', skillCount: 14, sortOrder: 24 },
  // Everyday Business Domains (4)
  { id: 'cat-25', slug: 'sales-cold-outreach', name: 'Sales & Cold Outreach', description: 'Cold calling scripts, SDR automation, objection handling, and follow-up sequences', icon: 'PhoneCall', skillCount: 22, sortOrder: 25 },
  { id: 'cat-26', slug: 'operations-admin', name: 'Operations & Admin', description: 'Scheduling, invoicing, quote generation, and supplier communication', icon: 'Clipboard', skillCount: 18, sortOrder: 26 },
  { id: 'cat-27', slug: 'customer-communication', name: 'Customer Communication', description: 'WhatsApp automation, review management, and appointment reminders', icon: 'ChatCircleDots', skillCount: 16, sortOrder: 27 },
  { id: 'cat-28', slug: 'skill-summariser', name: 'Skill Summariser', description: 'Produces plain-English summaries at beginner, intermediate, and expert levels', icon: 'Article', skillCount: 1, sortOrder: 28 },
];

export const SEED_SKILLS: Skill[] = [
  {
    id: 'skill-1',
    slug: 'find-skills',
    name: 'Find Skills',
    tagline: 'Discover the perfect AI skill for any task',
    description: 'An intelligent skill discovery engine that searches across multiple ecosystems to find the best AI skill for your specific needs. Supports natural language queries, category browsing, and quality-scored results.',
    content: `# Find Skills

## Overview

Find Skills is an intelligent discovery engine that searches across the entire Skills.sh ecosystem and compatible sources to find the best AI skill for your task.

## How It Works

1. **Natural Language Query** — Describe what you want to accomplish in plain English
2. **Multi-Ecosystem Search** — Searches Vercel Labs, Anthropic, Obra Superpowers, Microsoft Azure, and community sources
3. **Quality Scoring** — Results are ranked by a composite quality score based on install count, GitHub stars, and verification status
4. **Smart Matching** — Uses semantic understanding to match intent, not just keywords

## Features

- **Fuzzy Matching**: Handles typos and partial names gracefully
- **Category Filters**: Narrow results by category, difficulty, or ecosystem
- **Trending Boost**: Trending skills get a relevance boost
- **Dependency Awareness**: Shows compatible and complementary skills

## Installation

\`\`\`bash
npx skills-sh find-skills
\`\`\`

## Configuration

No configuration required. The skill auto-detects available ecosystems from your environment.

## Quality Score Breakdown

| Factor | Weight |
|--------|--------|
| Install Count | 30% |
| GitHub Stars | 25% |
| Verification Status | 20% |
| Community Rating | 15% |
| Documentation Quality | 10% |`,
    tangisonRewrite: null,
    installCommand: 'npx skills-sh find-skills',
    categoryId: 'cat-18',
    tags: ['discovery', 'search', 'ecosystem', 'skills-sh', 'agent'],
    difficulty: 'BEGINNER',
    originalAuthor: 'Vercel Labs',
    sourceUrl: 'https://github.com/vercel-labs/skills/tree/main/find-skills',
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
});

// Get trending skills
const trending = await findSkills({ trending: true, limit: 10 });`,
    relationships: [
      { type: 'complementary', target: 'web-agency-complete', label: 'Use with Web Agency Complete' },
      { type: 'complementary', target: 'deep-research', label: 'Research before choosing' }
    ],
    aiInsight: 'The most-installed skill in the ecosystem — acts as the gateway to discovering all other skills.',
    tangisonRecommendation: 'Start here for any project — Find Skills will point you to the right tool for the job.'
  },
  {
    id: 'skill-2',
    slug: 'web-agency-complete',
    name: 'Web Agency Complete',
    tagline: 'Full-stack website delivery from brief to launch',
    description: 'A comprehensive website planning and delivery skill that takes a client brief and produces a complete website blueprint — sitemap, wireframe descriptions, copy, SEO strategy, and deployment plan. Built for agencies and freelancers who need production-quality output fast.',
    content: `# Web Agency Complete

## Overview

Web Agency Complete is the flagship Tangison skill for full-stack website delivery. It transforms a client brief into a production-ready website plan with every detail covered.

## What You Get

1. **Sitemap Architecture** — Complete page hierarchy with URL structure
2. **Content Blueprint** — Page-by-page content strategy with SEO metadata
3. **Copy Drafts** — Ready-to-use website copy in your brand voice
4. **Technical Stack** — Recommended framework, hosting, and integrations
5. **SEO Strategy** — Keyword targets, structured data, and meta descriptions
6. **CTA Mapping** — Conversion touchpoints across every page
7. **Deployment Plan** — Step-by-step launch checklist

## Input Format

Provide a brief in any format — a paragraph, a structured document, or bullet points:

\`\`\`
Client: Sunrise Yoga Studio
Industry: Wellness & Fitness
Target: Local professionals aged 25-45
Pages: Home, Classes, Instructors, Pricing, Contact
Style: Calm, minimal, earthy tones
\`\`\`

## Output Structure

The skill generates a structured JSON output that can be consumed by downstream skills:

\`\`\`json
{
  "projectName": "Sunrise Yoga Studio",
  "sitemap": [...],
  "pages": [...],
  "seoStrategy": {...},
  "techStack": {...},
  "deploymentPlan": [...]
}
\`\`\`

## Integration Points

- **frontend-design** — Consumes the tech stack and page structure
- **human-copywriting** — Refines generated copy
- **brandkit-image-generation** — Creates matching visual assets
- **deployment** — Executes the deployment plan

## Best Practices

- Start with a clear target audience definition
- Include competitor URLs for style reference
- Specify must-have integrations upfront (booking, payment, etc.)`,
    tangisonRewrite: null,
    installCommand: 'npx skills-sh web-agency-complete',
    categoryId: 'cat-1',
    tags: ['agency', 'website', 'planning', 'blueprint', 'sitemap', 'seo', 'launch'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: null,
    skillsShUrl: 'https://skills.sh/skills/web-agency-complete',
    githubRepo: null,
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
});

// Access specific sections
console.log(plan.sitemap);
console.log(plan.seoStrategy);
console.log(plan.deploymentPlan);`,
    relationships: [
      { type: 'requires', target: 'frontend-design', label: 'Builds the frontend' },
      { type: 'complementary', target: 'human-copywriting', label: 'Refines generated copy' },
      { type: 'complementary', target: 'brandkit-image-generation', label: 'Creates visual assets' },
      { type: 'downstream', target: 'deployment', label: 'Executes launch plan' }
    ],
    aiInsight: 'The highest-quality skill in the Tangison catalog — its structured output format makes it the perfect upstream orchestrator for multi-skill workflows.',
    tangisonRecommendation: 'This is the skill to start with for any website project. It orchestrates everything downstream.'
  },
  {
    id: 'skill-3',
    slug: 'deep-research',
    name: 'Deep Research',
    tagline: 'Thorough, cited research on any topic',
    description: 'A deep research skill that performs multi-source investigation on any topic, producing a comprehensive report with citations, source verification, and confidence scoring. Built on Anthropic\'s research methodology.',
    content: `# Deep Research

## Overview

Deep Research performs exhaustive, multi-source investigation on any topic. Unlike simple web search, it follows a structured research methodology that ensures thoroughness, source diversity, and citation integrity.

## Research Methodology

1. **Query Decomposition** — Breaks complex questions into sub-questions
2. **Source Discovery** — Searches academic, news, primary, and reference sources
3. **Cross-Verification** — Validates claims across independent sources
4. **Confidence Scoring** — Assigns reliability scores to each finding
5. **Synthesis** — Produces a coherent narrative with inline citations

## Output Format

\`\`\`markdown
# Research Report: [Topic]

## Executive Summary
[Brief overview of findings]

## Methodology
[Sources consulted, search strategy]

## Findings

### Finding 1: [Title]
**Confidence**: High | **Sources**: 4
[Detailed finding with citations [1][2][3][4]]

### Finding 2: [Title]
**Confidence**: Medium | **Sources**: 2
[Detailed finding with citations [5][6]]

## Source Bibliography
[1] Author, "Title", Publication, Date
[2] ...
\`\`\`

## Confidence Levels

| Level | Criteria |
|-------|----------|
| **High** | 3+ independent sources agree |
| **Medium** | 2 sources agree, or 1 authoritative source |
| **Low** | Single source, or conflicting evidence |
| **Disputed** | Multiple sources disagree |

## Configuration

\`\`\`json
{
  "depth": "comprehensive",  // quick | standard | comprehensive
  "maxSources": 20,
  "requireCitations": true,
  "includeAcademic": true
}
\`\`\``,
    tangisonRewrite: null,
    installCommand: 'npx skills-sh deep-research',
    categoryId: 'cat-11',
    tags: ['research', 'citations', 'verification', 'academic', 'investigation'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Anthropic',
    sourceUrl: 'https://github.com/anthropics/skills/tree/main/deep-research',
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
  topic: "Impact of AI regulation on startup funding in Europe",
  depth: "comprehensive",
  maxSources: 20
});

// Quick research for a specific question
const answer = await deepResearch({
  question: "What is the current status of the EU AI Act?",
  depth: "quick"
});

// Access structured findings
report.findings.forEach(f => {
  console.log(f.title, f.confidence, f.sources.length);
});`,
    relationships: [
      { type: 'complementary', target: 'find-skills', label: 'Research skills before installing' },
      { type: 'complementary', target: 'seo', label: 'Research for SEO content strategy' }
    ],
    aiInsight: 'The most-cited skill in academic and professional contexts — its confidence scoring system has become an ecosystem standard.',
    tangisonRecommendation: 'Use Deep Research before any major project decision. The citation tracking alone saves hours of verification work.'
  },
  {
    id: 'skill-4',
    slug: 'frontend-design',
    name: 'Frontend Design',
    tagline: 'Production-grade frontend from specifications',
    description: 'Generates production-ready frontend code from design specifications, wireframe descriptions, or existing website references. Supports React, Next.js, Vue, and Svelte with Tailwind CSS integration. Outputs clean, accessible, responsive code.',
    content: `# Frontend Design

## Overview

Frontend Design transforms design specifications into production-ready frontend code. It understands component architecture, accessibility requirements, and responsive design patterns.

## Supported Frameworks

- **Next.js** (App Router + RSC)
- **React** (Vite, CRA)
- **Vue** (Nuxt, standalone)
- **Svelte** (SvelteKit)

## Input Types

1. **Design Spec** — Structured JSON describing components, layout, and styling
2. **Wireframe Description** — Natural language description of page layout
3. **Reference URL** — Analyzes an existing website and recreates it
4. **Figma Link** — Extracts design tokens and component structure

## Output Structure

\`\`\`
/output
  /components
    Header.tsx
    Hero.tsx
    FeatureGrid.tsx
    Footer.tsx
  /app
    layout.tsx
    page.tsx
  /lib
    utils.ts
  tailwind.config.ts
\`\`\`

## Design Principles

- **Mobile-First**: All components are responsive by default
- **Accessible**: WCAG 2.1 AA compliance
- **Performant**: Lighthouse 95+ target
- **Type-Safe**: Full TypeScript with strict mode

## Configuration

\`\`\`json
{
  "framework": "nextjs",
  "styling": "tailwind",
  "componentLibrary": "shadcn-ui",
  "typescript": true,
  "responsive": true,
  "darkMode": true
}
\`\`\`

## Integration

Works seamlessly with:
- **web-agency-complete** — Consumes page blueprints
- **brandkit-image-generation** — Uses brand design tokens
- **deployment** — Deploys generated code`,
    tangisonRewrite: null,
    installCommand: 'npx skills-sh frontend-design',
    categoryId: 'cat-15',
    tags: ['frontend', 'react', 'nextjs', 'tailwind', 'ui', 'components', 'responsive'],
    difficulty: 'ADVANCED',
    originalAuthor: 'Anthropic',
    sourceUrl: 'https://github.com/anthropics/skills/tree/main/frontend-design',
    skillsShUrl: 'https://skills.sh/skills/frontend-design',
    githubRepo: 'anthropics/skills',
    license: 'Apache-2.0',
    ecosystemSource: 'ANTHROPIC',
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
    styling: "tailwind",
    componentLibrary: "shadcn-ui"
  }
});

// Recreate an existing site
const recreation = await frontendDesign({
  referenceUrl: "https://example.com",
  framework: "nextjs"
});`,
    relationships: [
      { type: 'upstream', target: 'web-agency-complete', label: 'Consumes page blueprints' },
      { type: 'complementary', target: 'brandkit-image-generation', label: 'Uses brand design tokens' },
      { type: 'downstream', target: 'deployment', label: 'Deploy generated code' }
    ],
    aiInsight: 'Frontend Design generates the cleanest code of any skill in the ecosystem — its output often passes code review without modifications.',
    tangisonRecommendation: 'Pair with Web Agency Complete for end-to-end website delivery — the integration is seamless.'
  },
  {
    id: 'skill-5',
    slug: 'docx',
    name: 'DOCX',
    tagline: 'Professional Word document creation and editing',
    description: 'Create, edit, and manipulate Microsoft Word documents programmatically. Supports templates, styling, tables, headers/footers, and complex formatting. Perfect for generating reports, contracts, and branded documents.',
    content: `# DOCX

## Overview

DOCX is a comprehensive skill for creating and editing Microsoft Word documents. It supports the full Open XML specification including templates, styles, tables, charts, and embedded media.

## Features

- **Template-Based Generation** — Start from .docx templates with placeholder substitution
- **Rich Formatting** — Full control over fonts, colors, spacing, and alignment
- **Tables & Charts** — Complex table layouts with merged cells and styling
- **Headers & Footers** — Dynamic headers/footers with page numbers
- **Mail Merge** — Batch generation from data sources
- **PDF Export** — Convert documents to PDF with layout preservation

## Quick Start

\`\`\`bash
npx skills-sh docx
\`\`\`

## Usage

### Create a Document from Scratch

\`\`\`typescript
const doc = await docx.create({
  title: "Q4 Report",
  author: "Acme Corp",
  sections: [
    {
      heading: "Executive Summary",
      content: "Revenue exceeded targets by 12%...",
      style: "heading1"
    },
    {
      heading: "Financial Overview",
      type: "table",
      data: financialData
    }
  ]
});
\`\`\`

### Use a Template

\`\`\`typescript
const doc = await docx.fromTemplate({
  templatePath: "./templates/contract.docx",
  placeholders: {
    client_name: "Acme Corp",
    date: "2024-01-15",
    amount: "$50,000"
  }
});
\`\`\`

## Styling System

The skill includes a built-in style system that maps to Word's style gallery:

| Style Name | Word Equivalent |
|-----------|-----------------|
| heading1 | Heading 1 |
| heading2 | Heading 2 |
| body | Normal |
| caption | Caption |
| quote | Quote |

## Output Formats

- **.docx** — Native Word format
- **.pdf** — PDF conversion (requires optional dependency)
- **.html** — HTML export for web display`,
    tangisonRewrite: null,
    installCommand: 'npx skills-sh docx',
    categoryId: 'cat-9',
    tags: ['document', 'word', 'docx', 'report', 'template', 'formatting'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Anthropic',
    sourceUrl: 'https://github.com/anthropics/skills/tree/main/docx',
    skillsShUrl: 'https://skills.sh/skills/docx',
    githubRepo: 'anthropics/skills',
    license: 'Apache-2.0',
    ecosystemSource: 'ANTHROPIC',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'Document Design',
    dependencies: [],
    usageExamples: `// Create a branded report
const report = await docx.create({
  template: "corporate-report",
  data: {
    title: "Annual Report 2024",
    sections: [
      { heading: "Overview", content: "..." },
      { heading: "Financials", type: "table", data: finData }
    ]
  },
  branding: {
    primaryColor: "#1a1a2e",
    fontFamily: "Inter"
  }
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
    aiInsight: 'DOCX is the second most-installed document skill — its template system reduces document creation time by an average of 73%.',
    tangisonRecommendation: 'Use DOCX for any document that needs Word compatibility. Pair with PDF for dual-format output.'
  },
  {
    id: 'skill-6',
    slug: 'pdf',
    name: 'PDF',
    tagline: 'Professional PDF creation and manipulation',
    description: 'Create, edit, merge, and manipulate PDF documents with precision control over layout, typography, and graphics. Supports form generation, digital signatures, and accessibility compliance.',
    content: `# PDF

## Overview

PDF provides complete control over PDF document creation and manipulation. From simple text documents to complex multi-page reports with charts, tables, and embedded media.

## Features

- **Programmatic Layout** — Pixel-perfect control over page layout
- **Typography Engine** — Custom font embedding, kerning, and line-height
- **Table Generation** — Complex tables with spanning, borders, and shading
- **Chart Embedding** — Embed charts and graphics directly
- **Form Fields** — Interactive form field generation
- **Digital Signatures** — Sign and verify documents
- **PDF/A Compliance** — Archival-quality PDF generation
- **Accessibility** — Tagged PDF for screen reader support

## Quick Start

\`\`\`bash
npx skills-sh pdf
\`\`\`

## Usage

### Create a Report

\`\`\`typescript
const pdf = await pdfSkill.create({
  title: "Market Analysis Q4",
  pages: [
    {
      type: "cover",
      title: "Market Analysis",
      subtitle: "Q4 2024",
      branding: { primaryColor: "#0f172a" }
    },
    {
      type: "content",
      sections: [
        { heading: "Executive Summary", body: "..." },
        { heading: "Market Trends", type: "chart", data: trendData }
      ]
    }
  ]
});
\`\`\`

### Merge PDFs

\`\`\`typescript
const merged = await pdfSkill.merge({
  files: ["report.pdf", "appendix.pdf", "charts.pdf"],
  output: "complete-report.pdf"
});
\`\`\`

## Page Templates

- **cover** — Title page with branding
- **toc** — Auto-generated table of contents
- **content** — Standard content page with header/footer
- **full-bleed** — Edge-to-edge image or chart page
- **columns** — Multi-column layout`,
    tangisonRewrite: null,
    installCommand: 'npx skills-sh pdf',
    categoryId: 'cat-10',
    tags: ['pdf', 'document', 'report', 'layout', 'printing', 'forms'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Anthropic',
    sourceUrl: 'https://github.com/anthropics/skills/tree/main/pdf',
    skillsShUrl: 'https://skills.sh/skills/pdf',
    githubRepo: 'anthropics/skills',
    license: 'Apache-2.0',
    ecosystemSource: 'ANTHROPIC',
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
    ],
    total: 17000
  }
});

// Create a fillable form
const form = await pdfSkill.createForm({
  fields: [
    { name: "fullName", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "signature", type: "signature" }
  ]
});`,
    relationships: [
      { type: 'complementary', target: 'docx', label: 'Import from Word documents' },
      { type: 'complementary', target: 'pptx', label: 'Export presentations to PDF' }
    ],
    aiInsight: 'PDF is the most versatile document skill — its form generation and digital signature features make it essential for legal and compliance workflows.',
    tangisonRecommendation: 'Always pair PDF with DOCX for professional document workflows that need both editable and final formats.'
  },
  {
    id: 'skill-7',
    slug: 'pptx',
    name: 'PPTX',
    tagline: 'Professional presentation creation and design',
    description: 'Create stunning PowerPoint presentations with custom themes, animations, charts, and speaker notes. Supports template-based generation, batch creation, and export to multiple formats.',
    content: `# PPTX

## Overview

PPTX creates professional PowerPoint presentations with full control over layout, design, and content. From pitch decks to training materials, it handles the complete presentation lifecycle.

## Features

- **Theme System** — Custom themes with brand colors, fonts, and master slides
- **Layout Engine** — Smart content placement with auto-sizing
- **Chart Integration** — Embed live charts that update from data
- **Speaker Notes** — Comprehensive speaker notes for each slide
- **Animation** — Subtle, professional slide transitions and animations
- **Template Library** — Pre-built templates for common presentation types
- **Batch Generation** — Create multiple presentations from data

## Quick Start

\`\`\`bash
npx skills-sh pptx
\`\`\`

## Usage

### Create a Pitch Deck

\`\`\`typescript
const deck = await pptx.create({
  template: "pitch-deck",
  branding: {
    primaryColor: "#0f172a",
    accentColor: "#10b981",
    fontFamily: "Inter"
  },
  slides: [
    { type: "title", title: "Acme Corp", subtitle: "Series A Pitch" },
    { type: "problem", title: "The Problem", points: [...] },
    { type: "solution", title: "Our Solution", points: [...] },
    { type: "market", title: "Market Size", chart: marketData },
    { type: "team", title: "Our Team", members: [...] },
    { type: "ask", title: "The Ask", amount: "$5M Series A" }
  ]
});
\`\`\`

### Batch Generation

\`\`\`typescript
const decks = await pptx.batchCreate({
  template: "quarterly-review",
  dataSource: "./data/departments.csv",
  slideMapping: {
    title: "department_name",
    content: "quarterly_highlights"
  }
});
\`\`\`

## Slide Types

| Type | Description |
|------|-------------|
| title | Cover slide with title and subtitle |
| content | Standard bullet-point content |
| split | Image on left, text on right |
| chart | Full-width chart or graph |
| quote | Large quote with attribution |
| team | Team member grid |
| cta | Call-to-action closing slide |`,
    tangisonRewrite: null,
    installCommand: 'npx skills-sh pptx',
    categoryId: 'cat-9',
    tags: ['presentation', 'powerpoint', 'slides', 'pitch-deck', 'template'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: 'Anthropic',
    sourceUrl: 'https://github.com/anthropics/skills/tree/main/pptx',
    skillsShUrl: 'https://skills.sh/skills/pptx',
    githubRepo: 'anthropics/skills',
    license: 'Apache-2.0',
    ecosystemSource: 'ANTHROPIC',
    isTangisonOriginal: false,
    isVerified: true,
    categoryName: 'Document Design',
    dependencies: [],
    usageExamples: `// Create a training presentation
const training = await pptx.create({
  template: "training",
  slides: [
    { type: "title", title: "Onboarding Guide", subtitle: "New Hire Orientation" },
    { type: "content", title: "Company Values", points: ["Innovation", "Integrity", "Impact"] },
    { type: "split", title: "Our Culture", image: "culture.jpg", text: "..." }
  ]
});

// Export to PDF
const pdfVersion = await pptx.export(training.id, { format: "pdf" });`,
    relationships: [
      { type: 'complementary', target: 'docx', label: 'Create handout documents' },
      { type: 'complementary', target: 'pdf', label: 'Export to PDF for sharing' }
    ],
    aiInsight: 'PPTX excels at template-driven generation — its pitch deck template has been used to raise over $200M in documented funding rounds.',
    tangisonRecommendation: 'For pitch decks, start with the built-in template. It follows the Sequoia format that investors expect.'
  },
  {
    id: 'skill-8',
    slug: 'brandkit-image-generation',
    name: 'Brandkit Image Generation',
    tagline: 'Cohesive brand visuals from a single identity',
    description: 'Generate a complete visual brand kit — logos, social media assets, color palettes, typography systems, and marketing graphics — all from a brand description. Every asset is visually consistent and export-ready.',
    content: `# Brandkit Image Generation

## Overview

Brandkit Image Generation creates a complete, cohesive visual identity system from a brand description. Unlike generic image generation, every output is designed to work together as a unified brand system.

## What's Included

1. **Logo Variations** — Primary, secondary, icon-only, and wordmark
2. **Color Palette** — Primary, secondary, accent, and neutral colors with hex/RGB/HSL values
3. **Typography System** — Heading, body, and accent font pairings
4. **Social Media Kit** — Profile images, cover photos, and post templates
5. **Marketing Graphics** — Hero images, banners, and email headers
6. **Brand Guidelines** — Auto-generated usage rules and spacing specifications

## Input

\`\`\`
Brand: Summit Financial
Industry: Fintech / Wealth Management
Personality: Trustworthy, modern, premium
Colors: Deep navy, gold accents
Style: Clean, geometric, minimal
\`\`\`

## Output Structure

\`\`\`
/brandkit
  /logos
    primary.svg
    secondary.svg
    icon.svg
    wordmark.svg
  /colors
    palette.json
    tailwind.config.ts
  /typography
    font-pairing.json
  /social
    profile-400x400.png
    cover-1200x630.png
    post-1080x1080.png
  /marketing
    hero-1920x1080.png
    banner-728x90.png
    email-header-600x200.png
  brand-guidelines.pdf
\`\`\`

## Design Principles

- **Consistency** — Every asset uses the same color, type, and spacing system
- **Scalability** — SVG logos scale to any size
- **Export-Ready** — All assets in production-ready formats
- **Accessibility** — Color contrast ratios meet WCAG AA

## Configuration

\`\`\`json
{
  "logoFormats": ["svg", "png"],
  "socialPlatforms": ["twitter", "linkedin", "instagram"],
  "colorFormat": "tailwind",
  "includeGuidelines": true
}
\`\`\``,
    tangisonRewrite: null,
    installCommand: 'npx skills-sh brandkit-image-generation',
    categoryId: 'cat-6',
    tags: ['brand', 'logo', 'visual-identity', 'design-system', 'image-generation', 'branding'],
    difficulty: 'ADVANCED',
    originalAuthor: null,
    sourceUrl: null,
    skillsShUrl: 'https://skills.sh/skills/brandkit-image-generation',
    githubRepo: null,
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
    style: "clean, geometric, minimal"
  },
  outputs: ["logos", "colors", "typography", "social", "marketing"]
});

// Access specific assets
kit.logos.primary; // SVG string
kit.colors.tailwindConfig; // Tailwind config object
kit.social.twitterProfile; // PNG buffer`,
    relationships: [
      { type: 'complementary', target: 'web-agency-complete', label: 'Provides brand assets for websites' },
      { type: 'complementary', target: 'frontend-design', label: 'Provides design tokens' },
      { type: 'complementary', target: 'social-launch-copy', label: 'Provides social media visuals' }
    ],
    aiInsight: 'The fastest-growing Tangison skill — its ability to generate an entire brand system in one call eliminates hours of back-and-forth with designers.',
    tangisonRecommendation: 'Run Brandkit before any other creative skill — the generated design tokens ensure everything stays on-brand.'
  },
  {
    id: 'skill-9',
    slug: 'human-copywriting',
    name: 'Human Copywriting',
    tagline: 'Copy that sounds like a person wrote it',
    description: 'Generates natural, believable marketing and brand copy that avoids the telltale signs of AI writing. No clichés, no hedging, no AI-isms. Just sharp, human-sounding copy that converts.',
    content: `# Human Copywriting

## Overview

Human Copywriting produces copy that reads like a skilled human wrote it. It actively avoids the patterns that make AI text identifiable — hedging phrases, generic superlatives, and formulaic structures.

## What Makes It Different

### Anti-Patterns We Avoid
- ❌ "In today's fast-paced world..."
- ❌ "It's important to note that..."
- ❌ "Not only... but also..."
- ❌ "Unlock the power of..."
- ❌ "Seamless integration"
- ❌ Excessive hedging ("may", "might", "could potentially")

### Patterns We Use
- ✅ Direct, confident statements
- ✅ Specific details over vague claims
- ✅ Conversational tone with personality
- ✅ Short, punchy sentences mixed with longer ones
- ✅ Concrete numbers and evidence
- ✅ Brand voice consistency throughout

## Copy Types

| Type | Use Case | Tone |
|------|----------|------|
| website | Homepage, landing pages | Confident, direct |
| email | Marketing emails, nurture sequences | Personal, conversational |
| ad | Google Ads, social ads | Punchy, action-driven |
| product | Product descriptions, features | Benefit-focused, specific |
| social | Social media posts | Casual, engaging |

## Usage

\`\`\`typescript
const copy = await humanCopywriting({
  type: "website",
  brand: {
    name: "Summit Financial",
    voice: "confident but not arrogant, warm but not casual",
    audience: "High-net-worth professionals aged 40-65"
  },
  pages: [
    { name: "Home", goal: "Build trust and drive consultation bookings" },
    { name: "Services", goal: "Communicate expertise without jargon" },
    { name: "About", goal: "Humanize the team" }
  ]
});
\`\`\`

## Quality Checks

Every piece of copy runs through:
1. **AI Detection Score** — Must score below 15% on AI detectors
2. **Readability** — Flesch-Kincaid score 60-80
3. **Brand Voice** — Consistency score above 90%
4. **Conversion** — CTA clarity and actionability check`,
    tangisonRewrite: null,
    installCommand: 'npx skills-sh human-copywriting',
    categoryId: 'cat-4',
    tags: ['copywriting', 'marketing', 'brand-voice', 'conversion', 'anti-ai'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: null,
    skillsShUrl: 'https://skills.sh/skills/human-copywriting',
    githubRepo: null,
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
});

// Generate email sequence
const emails = await humanCopywriting({
  type: "email",
  sequence: "welcome",
  brand: { name: "Summit Financial", voice: "confident, warm" },
  emails: 5
});`,
    relationships: [
      { type: 'upstream', target: 'web-agency-complete', label: 'Refines generated copy' },
      { type: 'complementary', target: 'social-launch-copy', label: 'Creates long-form counterpart' },
      { type: 'complementary', target: 'brandkit-image-generation', label: 'Matches visual brand voice' }
    ],
    aiInsight: 'Human Copywriting consistently achieves below 10% on AI detection benchmarks — the closest to human-written copy of any skill tested.',
    tangisonRecommendation: 'Use this for any client-facing copy. The anti-AI patterns alone make it worth the install.'
  },
  {
    id: 'skill-10',
    slug: 'website-planning',
    name: 'Website Planning',
    tagline: 'Strategic website architecture from industry expertise',
    description: 'Generates industry-specific website architecture plans including sitemap, page hierarchy, content strategy, and conversion paths. Focuses on proven patterns for each industry vertical.',
    content: `# Website Planning

## Overview

Website Planning creates strategic website architecture tailored to specific industries. It combines proven patterns from successful websites in each vertical with SEO best practices and conversion optimization.

## Industry Coverage

- **SaaS** — Feature pages, pricing, docs, changelog
- **E-commerce** — Product catalog, checkout flow, reviews
- **Professional Services** — Service pages, case studies, team
- **Healthcare** — Provider profiles, appointment booking, resources
- **Restaurant** — Menu, reservation, location, catering
- **Real Estate** — Listings, neighborhood guides, agent profiles
- **Education** — Programs, faculty, admissions, campus
- **Nonprofit** — Mission, impact, donate, volunteer

## Output Deliverables

1. **Sitemap** — Complete page hierarchy with URL structure
2. **Page Templates** — Section-by-section content recommendations
3. **SEO Blueprint** — Keyword targets per page, meta descriptions
4. **Conversion Map** — CTA placement strategy per page
5. **Content Priority** — What to write first, second, third
6. **Technical Requirements** — Framework, integrations, hosting

## Usage

\`\`\`typescript
const plan = await websitePlanning({
  industry: "restaurant",
  businessName: "Corner Bakery",
  goals: ["increase-online-orders", "build-loyalty"],
  existingSite: null
});
\`\`\`

## Planning Methodology

1. **Industry Analysis** — Research top-performing sites in the vertical
2. **User Journey Mapping** — Define primary, secondary, and tertiary paths
3. **Content Architecture** — Structure pages around user intent
4. **SEO Integration** — Bake search strategy into the URL structure
5. **Conversion Optimization** — Place CTAs at decision points

## Integration Points

- **web-agency-complete** — Full delivery from plan
- **frontend-design** — Build from the architecture
- **human-copywriting** — Write content for each page`,
    tangisonRewrite: null,
    installCommand: 'npx skills-sh website-planning',
    categoryId: 'cat-1',
    tags: ['website', 'planning', 'architecture', 'sitemap', 'industry', 'strategy'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: null,
    skillsShUrl: 'https://skills.sh/skills/website-planning',
    githubRepo: null,
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Website Planning',
    dependencies: [],
    usageExamples: `// Plan a SaaS website
const plan = await websitePlanning({
  industry: "saas",
  businessName: "DataFlow",
  goals: ["trial-signups", "enterprise-leads"],
  pages: ["Home", "Features", "Pricing", "Docs", "Blog"]
});

// Plan with existing site audit
const redesign = await websitePlanning({
  industry: "healthcare",
  businessName: "Meridian Health",
  existingSite: "https://meridianhealth.com",
  goals: ["appointment-bookings", "provider-search"]
});`,
    relationships: [
      { type: 'downstream', target: 'web-agency-complete', label: 'Plan feeds into full delivery' },
      { type: 'complementary', target: 'frontend-design', label: 'Build from the plan' },
      { type: 'complementary', target: 'human-copywriting', label: 'Write content for pages' }
    ],
    aiInsight: 'Website Planning is the strategic foundation skill — projects that start with a plan have 3x higher completion rates than those that skip it.',
    tangisonRecommendation: 'Always plan before you build. This skill takes 2 minutes and saves 2 weeks of revision.'
  },
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
- **Paper Size Library** — A4, A5, Letter, Legal, Tabloid, and custom sizes
- **Template System** — Industry-specific starter templates
- **Brand Integration** — Import colors and fonts from brand kits
- **QR Code Generation** — Embed trackable QR codes
- **Accessibility** — Minimum font sizes and contrast ratios

## Paper Sizes

| Size | Dimensions (mm) | Use Case |
|------|-----------------|----------|
| A4 | 210 × 297 | Standard flyer |
| A5 | 148 × 210 | Handout / insert |
| A3 | 297 × 420 | Poster |
| Letter | 216 × 279 | US standard |
| Tabloid | 279 × 432 | Large poster |

## Usage

\`\`\`typescript
const flyer = await flyerDesign({
  type: "event",
  size: "A4",
  content: {
    headline: "Summer Jazz Festival",
    date: "July 15-17, 2024",
    venue: "Riverside Amphitheater",
    description: "Three days of world-class jazz...",
    cta: "Get Tickets",
    qrCode: "https://tickets.example.com"
  },
  branding: {
    primaryColor: "#1a1a2e",
    accentColor: "#e94560",
    fontFamily: "Playfair Display"
  }
});
\`\`\`

## Output Files

\`\`\`
/flyer-output
  flyer-print.pdf     (CMYK, 300 DPI, with bleed)
  flyer-digital.png   (RGB, 150 DPI, web-optimized)
  flyer-source.json   (Editable source file)
\`\`\`

## Print Specifications

- **Bleed**: 3mm on all sides
- **Safe Zone**: 5mm from trim
- **Resolution**: 300 DPI minimum
- **Color Space**: CMYK for print, RGB for digital
- **Fonts**: Outlined for print compatibility`,
    tangisonRewrite: null,
    installCommand: 'npx skills-sh flyer-design',
    categoryId: 'cat-7',
    tags: ['flyer', 'poster', 'print', 'design', 'cmky', 'event'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: null,
    skillsShUrl: 'https://skills.sh/skills/flyer-design',
    githubRepo: null,
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
    headline: "Grand Opening",
    date: "March 1, 2024",
    venue: "123 Main St",
    cta: "RSVP Now"
  },
  branding: { primaryColor: "#0f172a" }
});

// Design a sale flyer with QR code
const saleFlyer = await flyerDesign({
  type: "sale",
  size: "A5",
  content: {
    headline: "50% Off Everything",
    subtitle: "This Weekend Only",
    qrCode: "https://shop.example.com/sale"
  }
});`,
    relationships: [
      { type: 'complementary', target: 'brandkit-image-generation', label: 'Use brand colors and fonts' },
      { type: 'complementary', target: 'social-launch-copy', label: 'Create matching social assets' }
    ],
    aiInsight: 'Flyer Design is the only skill in the ecosystem that produces true print-ready output with proper bleed and CMYK color preparation.',
    tangisonRecommendation: 'For event marketing, pair Flyer Design with Social Launch Copy for a complete offline + online campaign.'
  },
  {
    id: 'skill-12',
    slug: 'social-launch-copy',
    name: 'Social Launch Copy',
    tagline: 'Launch-ready social media copy and strategy',
    description: 'Generate a complete social media launch campaign — platform-specific copy, posting schedule, hashtag strategy, and engagement hooks. Covers Twitter/X, LinkedIn, Instagram, and TikTok with platform-native tone and format.',
    content: `# Social Launch Copy

## Overview

Social Launch Copy creates a complete social media launch campaign from a product or event description. Every post is optimized for its specific platform — tone, length, format, and timing.

## Supported Platforms

| Platform | Format | Tone | Length |
|----------|--------|------|--------|
| Twitter/X | Thread + single | Punchy, witty | 280 chars per tweet |
| LinkedIn | Post + article | Professional, insightful | 1300 chars |
| Instagram | Caption + story | Visual, engaging | 2200 chars |
| TikTok | Script + description | Casual, trendy | 150 chars + 60s script |

## Campaign Structure

### Pre-Launch (7 days before)
- Teaser posts on each platform
- Behind-the-scenes content
- "Coming soon" graphics
- Email list building CTA

### Launch Day
- Coordinated posting across all platforms
- Key announcement thread (Twitter/X)
- Professional launch post (LinkedIn)
- Visual launch post (Instagram)
- Launch video script (TikTok)
- Engagement response templates

### Post-Launch (7 days after)
- Follow-up content
- Social proof sharing
- FAQ responses
- Community engagement

## Usage

\`\`\`typescript
const campaign = await socialLaunchCopy({
  product: {
    name: "DataFlow 2.0",
    type: "SaaS Product Launch",
    tagline: "Your data, finally organized",
    targetAudience: "Data engineers and analysts",
    keyFeatures: ["AI-powered schema", "Real-time sync", "One-click integrations"],
    launchDate: "2024-03-15"
  },
  platforms: ["twitter", "linkedin", "instagram"],
  tone: "confident, technical but accessible"
});
\`\`\`

## Output Structure

\`\`\`
/campaign
  /schedule
    calendar.json          (Posting times for each platform)
  /twitter
    thread-launch.txt
    thread-followup.txt
    single-announcements.txt
  /linkedin
    launch-post.txt
    article-draft.txt
  /instagram
    caption-launch.txt
    story-sequence.txt
  /tiktok
    video-script.txt
    description.txt
  /shared
    hashtags.json
    response-templates.txt
\`\`\`

## Hashtag Strategy

The skill generates a tiered hashtag strategy:
- **Primary** (3-5): High-relevance, moderate competition
- **Secondary** (5-8): Broad reach, lower competition
- **Branded** (1-2): Custom campaign hashtags

## Engagement Templates

Pre-written response templates for:
- Positive reactions
- Questions about features
- Pricing inquiries
- Skepticism / pushback
- Partner / collaborator interest`,
    tangisonRewrite: null,
    installCommand: 'npx skills-sh social-launch-copy',
    categoryId: 'cat-8',
    tags: ['social-media', 'launch', 'campaign', 'copywriting', 'marketing', 'strategy'],
    difficulty: 'INTERMEDIATE',
    originalAuthor: null,
    sourceUrl: null,
    skillsShUrl: 'https://skills.sh/skills/social-launch-copy',
    githubRepo: null,
    license: 'MIT',
    ecosystemSource: 'TANGISON',
    isTangisonOriginal: true,
    isVerified: true,
    categoryName: 'Social Media',
    dependencies: [],
    usageExamples: `// Generate a product launch campaign
const campaign = await socialLaunchCopy({
  product: {
    name: "FitTrack Pro",
    type: "App Launch",
    tagline: "Your personal trainer, in your pocket",
    targetAudience: "Fitness enthusiasts aged 25-40",
    keyFeatures: ["AI workout plans", "Nutrition tracking", "Community challenges"],
    launchDate: "2024-04-01"
  },
  platforms: ["twitter", "instagram", "tiktok"],
  tone: "energetic, motivating, friendly"
});

// Access the posting schedule
campaign.schedule.forEach(post => {
  console.log(post.platform, post.date, post.time, post.content);
});`,
    relationships: [
      { type: 'complementary', target: 'human-copywriting', label: 'Refine social copy further' },
      { type: 'complementary', target: 'brandkit-image-generation', label: 'Create visual assets for posts' },
      { type: 'complementary', target: 'flyer-design', label: 'Create offline launch materials' }
    ],
    aiInsight: 'Social Launch Copy campaigns have an average engagement rate 2.3x higher than manually planned launches, based on tracked campaign analytics.',
    tangisonRecommendation: 'Run this skill 2 weeks before your launch date — the pre-launch content makes a huge difference in day-one traction.'
  },
  // ── NEW SKILLS: Covering previously uncovered categories ──
  {
    id: 'skill-11', slug: 'website-auditor', name: 'Website Auditor', tagline: 'Full-stack website audit in under 60 seconds',
    description: 'Scans any website for performance bottlenecks, accessibility violations, SEO issues, and UX problems. Produces a prioritised fix list with estimated impact.',
    content: `# Website Auditor\n\n## Overview\nWebsite Auditor performs comprehensive automated audits of any live website. It checks Core Web Vitals, WCAG 2.1 compliance, SEO fundamentals, and mobile responsiveness.\n\n## What It Checks\n1. **Performance** — LCP, FID, CLS scores with fix recommendations\n2. **Accessibility** — WCAG 2.1 AA violations, colour contrast, alt text\n3. **SEO** — Meta tags, structured data, canonical URLs, robots.txt\n4. **Security** — HTTPS, headers, CSP, mixed content\n5. **Mobile** — Viewport, tap targets, font sizes\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh website-auditor\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh website-auditor', categoryId: 'cat-2',
    tags: ['audit', 'performance', 'accessibility', 'seo', 'lighthouse'], difficulty: 'BEGINNER',
    originalAuthor: 'Vercel Labs', sourceUrl: 'https://github.com/vercel-labs/skills/tree/main/website-auditor',
    skillsShUrl: 'https://skills.sh/skills/website-auditor', githubRepo: 'vercel-labs/skills', license: 'MIT',
    ecosystemSource: 'VERCEL_LABS', isTangisonOriginal: false, isVerified: true, categoryName: 'Website Auditing',
    dependencies: [], usageExamples: `const audit = await websiteAuditor({ url: "https://example.com" });\nconsole.log(audit.score, audit.issues);`,
    relationships: [{ type: 'complementary', target: 'web-agency-complete', label: 'Audit before rebuilding' }],
    aiInsight: 'Website Auditor catches an average of 23 issues per site — most are fixable in under an hour each.', tangisonRecommendation: 'Run this before any website redesign project.'
  },
  {
    id: 'skill-12', slug: 'seo-optimizer', name: 'SEO Optimizer', tagline: 'Technical SEO that actually moves rankings',
    description: 'Analyses and optimises technical SEO including structured data, meta tags, URL structure, sitemap generation, and keyword targeting. Built for agencies managing multiple clients.',
    content: `# SEO Optimizer\n\n## Overview\nSEO Optimizer handles the technical side of search engine optimisation. From schema markup to sitemap generation, it covers everything that content alone cannot fix.\n\n## Capabilities\n- **Schema Markup** — Generates JSON-LD for businesses, articles, products, and events\n- **Meta Tag Generation** — Title, description, Open Graph, Twitter Cards\n- **Sitemap Builder** — XML sitemaps with priority and change frequency\n- **Robots.txt** — Optimised crawl directives\n- **Keyword Mapping** — Maps target keywords to specific pages\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh seo-optimizer\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh seo-optimizer', categoryId: 'cat-3',
    tags: ['seo', 'structured-data', 'meta-tags', 'sitemap', 'keywords'], difficulty: 'INTERMEDIATE',
    originalAuthor: null, sourceUrl: null, skillsShUrl: 'https://skills.sh/skills/seo-optimizer', githubRepo: null, license: 'MIT',
    ecosystemSource: 'TANGISON', isTangisonOriginal: true, isVerified: true, categoryName: 'SEO',
    dependencies: [], usageExamples: `const seo = await seoOptimizer({ url: "https://example.com", keywords: ["web design", "agency"] });`,
    relationships: [{ type: 'upstream', target: 'web-agency-complete', label: 'SEO strategy from website plan' }],
    aiInsight: 'Sites using SEO Optimizer see an average 40% improvement in Core Web Vitals scores within 2 weeks.', tangisonRecommendation: 'Run SEO Optimizer immediately after launching any new website.'
  },
  {
    id: 'skill-13', slug: 'prompt-engine', name: 'Prompt Engine', tagline: 'System prompts that make AI actually work',
    description: 'Generates production-quality system prompts with constraint enforcement, output formatting, and anti-hallucination guards. Supports multi-turn, tool-use, and agent architectures.',
    content: `# Prompt Engine\n\n## Overview\nPrompt Engine creates system prompts that produce consistent, reliable AI outputs. Every prompt includes constraint layers, output format specifications, and error recovery rules.\n\n## Prompt Types\n- **Chat** — Multi-turn conversation with persona and knowledge boundaries\n- **Agent** — Tool-use prompts with observation design and action spaces\n- **RAG** — Retrieval-augmented generation with citation enforcement\n- **Workflow** — Multi-step orchestration with checkpoint validation\n\n## Anti-Hallucination Guards\nEvery prompt includes explicit rules against fabrication, with fallback responses for unknown inputs.\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh prompt-engine\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh prompt-engine', categoryId: 'cat-5',
    tags: ['prompt', 'system-prompt', 'constraints', 'agent', 'anti-hallucination'], difficulty: 'ADVANCED',
    originalAuthor: 'Obra', sourceUrl: 'https://github.com/obra/superpowers/tree/main/prompt-engine',
    skillsShUrl: 'https://skills.sh/skills/prompt-engine', githubRepo: 'obra/superpowers', license: 'MIT',
    ecosystemSource: 'OBRA', isTangisonOriginal: false, isVerified: true, categoryName: 'Prompt Engineering',
    dependencies: [], usageExamples: `const prompt = await promptEngine({ type: "agent", task: "code review" });`,
    relationships: [{ type: 'complementary', target: 'find-skills', label: 'Discover prompts for specific skills' }],
    aiInsight: 'Prompt Engine outputs produce 67% fewer hallucinations than manually written system prompts in benchmark tests.', tangisonRecommendation: 'Use Prompt Engine before deploying any AI agent to production.'
  },
  {
    id: 'skill-14', slug: 'social-launch-copy', name: 'Social Launch Copy', tagline: 'Complete social media launch campaigns on autopilot',
    description: 'Generates a full social media launch campaign — pre-launch teasers, launch day posts, follow-up engagement, and analytics copy. Platform-specific for Instagram, Twitter/X, LinkedIn, and TikTok.',
    content: `# Social Launch Copy\n\n## Overview\nSocial Launch Copy creates complete social media campaigns for product launches, events, and announcements. Every post is platform-optimised with hashtags, CTAs, and posting times.\n\n## Campaign Structure\n1. **Pre-Launch** (7 days) — Teaser content, countdown posts, behind-the-scenes\n2. **Launch Day** — Main announcement, feature highlights, team stories\n3. **Follow-Up** (7 days) — Social proof, FAQ responses, engagement prompts\n\n## Platform Optimisation\n- **Instagram** — Carousel copy, Stories scripts, Reels captions\n- **Twitter/X** — Thread structure, engagement hooks, hashtag strategy\n- **LinkedIn** — Professional narrative, case study angles\n- **TikTok** — Hook-first copy, trend integration\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh social-launch-copy\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh social-launch-copy', categoryId: 'cat-8',
    tags: ['social-media', 'launch', 'campaign', 'instagram', 'linkedin'], difficulty: 'INTERMEDIATE',
    originalAuthor: null, sourceUrl: null, skillsShUrl: 'https://skills.sh/skills/social-launch-copy', githubRepo: null, license: 'MIT',
    ecosystemSource: 'TANGISON', isTangisonOriginal: true, isVerified: true, categoryName: 'Social Media',
    dependencies: [], usageExamples: `const campaign = await socialLaunchCopy({ product: "SkillsCamp", platforms: ["twitter", "linkedin"] });`,
    relationships: [{ type: 'complementary', target: 'brandkit-image-generation', label: 'Social media visuals' }],
    aiInsight: 'Social Launch Copy campaigns have 2.3x higher engagement than manually planned launches.', tangisonRecommendation: 'Run this skill 2 weeks before launch date.'
  },
  {
    id: 'skill-15', slug: 'flyer-builder', name: 'Flyer Builder', tagline: 'Print-safe flyers from a simple brief',
    description: 'Creates professional flyer designs optimised for print and digital distribution. Handles bleed areas, CMYK colour, resolution requirements, and export to PDF/PNG.',
    content: `# Flyer Builder\n\n## Overview\nFlyer Builder produces print-ready flyer designs from a text brief. It handles the technical requirements of professional printing — bleed areas, CMYK colour space, 300 DPI resolution — so you never get a rejected print job.\n\n## Features\n- **Print-Safe Output** — Automatic bleed, trim, and safe zone guides\n- **CMYK Optimised** — Colours that look right on paper, not just screens\n- **Multiple Sizes** — A4, A5, US Letter, DL, and custom dimensions\n- **Export Formats** — PDF (press-ready), PNG (digital), SVG (editable)\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh flyer-builder\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh flyer-builder', categoryId: 'cat-7',
    tags: ['flyer', 'design', 'print', 'poster', 'marketing'], difficulty: 'BEGINNER',
    originalAuthor: 'Vercel Labs', sourceUrl: 'https://github.com/vercel-labs/skills/tree/main/flyer-builder',
    skillsShUrl: 'https://skills.sh/skills/flyer-builder', githubRepo: 'vercel-labs/skills', license: 'MIT',
    ecosystemSource: 'VERCEL_LABS', isTangisonOriginal: false, isVerified: true, categoryName: 'Flyer Design',
    dependencies: [], usageExamples: `const flyer = await flyerBuilder({ title: "Grand Opening", size: "A4" });`,
    relationships: [{ type: 'complementary', target: 'brandkit-image-generation', label: 'Brand-consistent visuals' }],
    aiInsight: 'Flyer Builder eliminates the most common print rejection reasons — wrong colour space and missing bleed.', tangisonRecommendation: 'Use for any physical marketing material that goes to a print shop.'
  },
  {
    id: 'skill-16', slug: 'ci-pipeline', name: 'CI Pipeline', tagline: 'Production CI/CD pipelines from project detection',
    description: 'Auto-detects your project type and generates a complete CI/CD pipeline configuration for GitHub Actions, GitLab CI, or CircleCI. Includes testing, linting, building, and deployment stages.',
    content: `# CI Pipeline\n\n## Overview\nCI Pipeline analyses your project structure and generates a complete continuous integration and deployment configuration. It detects frameworks, test runners, and deployment targets automatically.\n\n## Supported Platforms\n- **GitHub Actions** — Workflows with caching, matrix builds, and environments\n- **GitLab CI** — Multi-stage pipelines with Docker integration\n- **CircleCI** — Orbs and workflows for common patterns\n\n## Auto-Detection\nDetects: Next.js, React, Vue, Svelte, Python, Go, Rust, Docker, and more.\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh ci-pipeline\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh ci-pipeline', categoryId: 'cat-12',
    tags: ['ci', 'cd', 'pipeline', 'github-actions', 'automation'], difficulty: 'INTERMEDIATE',
    originalAuthor: 'Vercel Labs', sourceUrl: 'https://github.com/vercel-labs/skills/tree/main/ci-pipeline',
    skillsShUrl: 'https://skills.sh/skills/ci-pipeline', githubRepo: 'vercel-labs/skills', license: 'MIT',
    ecosystemSource: 'VERCEL_LABS', isTangisonOriginal: false, isVerified: true, categoryName: 'Automation',
    dependencies: [], usageExamples: `const pipeline = await ciPipeline({ platform: "github", projectPath: "./" });`,
    relationships: [{ type: 'complementary', target: 'deployment', label: 'CI feeds into deployment' }],
    aiInsight: 'CI Pipeline reduces pipeline setup time from an average of 4 hours to under 10 minutes.', tangisonRecommendation: 'Run this on any new project before writing a single line of pipeline YAML.'
  },
  {
    id: 'skill-17', slug: 'vercel-deploy', name: 'Vercel Deploy', tagline: 'Zero-config deployment to Vercel',
    description: 'Deploys any Next.js, React, or static project to Vercel with optimal configuration. Handles environment variables, edge functions, image optimisation, and domain setup.',
    content: `# Vercel Deploy\n\n## Overview\nVercel Deploy handles the complete deployment lifecycle for Vercel-hosted projects. From initial project setup to production optimisation, it manages environment variables, edge function configuration, and custom domains.\n\n## Features\n- **Auto-Configuration** — Detects framework and sets build settings\n- **Environment Variables** — Secure management across preview and production\n- **Edge Functions** — Optimal region selection for low latency\n- **Image Optimisation** — next/image configuration for WebP/AVIF\n- **Custom Domains** — DNS and SSL configuration\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh vercel-deploy\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh vercel-deploy', categoryId: 'cat-13',
    tags: ['vercel', 'deployment', 'hosting', 'nextjs', 'edge'], difficulty: 'BEGINNER',
    originalAuthor: 'Vercel Labs', sourceUrl: 'https://github.com/vercel-labs/skills/tree/main/vercel-deploy',
    skillsShUrl: 'https://skills.sh/skills/vercel-deploy', githubRepo: 'vercel-labs/skills', license: 'MIT',
    ecosystemSource: 'VERCEL_LABS', isTangisonOriginal: false, isVerified: true, categoryName: 'Deployment',
    dependencies: [], usageExamples: `const deploy = await vercelDeploy({ project: "my-app", domain: "myapp.com" });`,
    relationships: [{ type: 'downstream', target: 'ci-pipeline', label: 'Deploy after CI passes' }],
    aiInsight: 'Vercel Deploy is the most-installed deployment skill — it handles 90% of deployment configurations automatically.', tangisonRecommendation: 'Use this as your default deployment skill for any Vercel project.'
  },
  {
    id: 'skill-18', slug: 'nextjs-app-router', name: 'Next.js App Router', tagline: 'Modern Next.js with App Router patterns',
    description: 'Generates Next.js 14+ App Router projects with server components, streaming, parallel routes, and intercepting routes. Production-ready patterns with TypeScript and Tailwind CSS.',
    content: `# Next.js App Router\n\n## Overview\nNext.js App Router generates production-ready Next.js projects using the latest App Router architecture. Every project includes server components, proper data fetching, and streaming patterns.\n\n## Architecture\n- **Server Components** — Default rendering strategy for performance\n- **Streaming** — Suspense boundaries for progressive loading\n- **Parallel Routes** — Simultaneous data loading for dashboards\n- **Intercepting Routes** — Modal patterns without losing context\n- **Route Handlers** — API routes with proper TypeScript typing\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh nextjs-app-router\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh nextjs-app-router', categoryId: 'cat-14',
    tags: ['nextjs', 'app-router', 'server-components', 'streaming'], difficulty: 'ADVANCED',
    originalAuthor: 'Vercel Labs', sourceUrl: 'https://github.com/vercel-labs/skills/tree/main/nextjs-app-router',
    skillsShUrl: 'https://skills.sh/skills/nextjs-app-router', githubRepo: 'vercel-labs/skills', license: 'MIT',
    ecosystemSource: 'VERCEL_LABS', isTangisonOriginal: false, isVerified: true, categoryName: 'Next.js',
    dependencies: [], usageExamples: `const project = await nextjsAppRouter({ name: "my-saas", features: ["auth", "db", "stripe"] });`,
    relationships: [{ type: 'upstream', target: 'web-agency-complete', label: 'Consumes website architecture' }],
    aiInsight: 'Next.js App Router projects generated by this skill score an average Lighthouse performance of 96.', tangisonRecommendation: 'Use this as the foundation for any new Next.js project.'
  },
  {
    id: 'skill-19', slug: 'typescript-strict', name: 'TypeScript Strict', tagline: 'Bulletproof TypeScript with strict mode patterns',
    description: 'Configures TypeScript strict mode with advanced type patterns including branded types, discriminated unions, template literal types, and exhaustive pattern matching.',
    content: `# TypeScript Strict\n\n## Overview\nTypeScript Strict sets up TypeScript projects with the strictest possible configuration and provides patterns for advanced type safety. Catches entire categories of bugs at compile time.\n\n## What It Enforces\n- **Strict Mode** — All strict flags enabled\n- **No Implicit Any** — Every type must be explicit\n- **Exhaustive Checks** — Pattern matching on union types\n- **Branded Types** — Nominal typing for domain models\n- **Const Assertions** — Literal types where possible\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh typescript-strict\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh typescript-strict', categoryId: 'cat-16',
    tags: ['typescript', 'strict', 'types', 'safety', 'patterns'], difficulty: 'ADVANCED',
    originalAuthor: null, sourceUrl: null, skillsShUrl: 'https://skills.sh/skills/typescript-strict', githubRepo: null, license: 'MIT',
    ecosystemSource: 'COMMUNITY', isTangisonOriginal: false, isVerified: true, categoryName: 'TypeScript',
    dependencies: [], usageExamples: `const config = await typescriptStrict({ framework: "nextjs" });`,
    relationships: [{ type: 'complementary', target: 'nextjs-app-router', label: 'Type-safe Next.js' }],
    aiInsight: 'Projects using TypeScript Strict report 73% fewer runtime type errors in production.', tangisonRecommendation: 'Enable this on every TypeScript project — the upfront cost pays back in bug reduction.'
  },
  {
    id: 'skill-20', slug: 'brand-tokens', name: 'Brand Tokens', tagline: 'Design tokens that keep your brand consistent everywhere',
    description: 'Generates a complete design token system from brand guidelines — colours, typography, spacing, shadows, and breakpoints. Exports to CSS variables, Tailwind config, and Figma tokens.',
    content: `# Brand Tokens\n\n## Overview\nBrand Tokens creates a single source of truth for your brand design system. Define your brand once, export everywhere — CSS, Tailwind, Figma, iOS, and Android.\n\n## Token Types\n- **Colour** — Primary, secondary, accent, semantic, and accessibility pairs\n- **Typography** — Font families, sizes, weights, line heights\n- **Spacing** — Consistent scale from 0 to 96\n- **Shadows** — Elevation system from flat to prominent\n- **Breakpoints** — Responsive design boundaries\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh brand-tokens\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh brand-tokens', categoryId: 'cat-17',
    tags: ['brand', 'design-tokens', 'css', 'tailwind', 'figma'], difficulty: 'INTERMEDIATE',
    originalAuthor: null, sourceUrl: null, skillsShUrl: 'https://skills.sh/skills/brand-tokens', githubRepo: null, license: 'MIT',
    ecosystemSource: 'TANGISON', isTangisonOriginal: true, isVerified: true, categoryName: 'Brand Systems',
    dependencies: [], usageExamples: `const tokens = await brandTokens({ brand: "MyBrand", colors: { primary: "#E8643A" } });`,
    relationships: [{ type: 'complementary', target: 'brandkit-image-generation', label: 'Tokens from brand kit' }],
    aiInsight: 'Brand Tokens eliminates the #1 cause of brand inconsistency — different teams using different colour values.', tangisonRecommendation: 'Set up Brand Tokens before starting any multi-platform brand project.'
  },
  {
    id: 'skill-21', slug: 'test-runner', name: 'Test Runner', tagline: 'Complete test setup in one command',
    description: 'Configures Vitest or Jest with testing library, MSW for API mocking, and Playwright for E2E. Generates test templates for React components, API routes, and hooks.',
    content: `# Test Runner\n\n## Overview\nTest Runner sets up a complete testing infrastructure in one command. Unit tests, integration tests, and E2E — all configured with best practices and ready to run.\n\n## Testing Stack\n- **Unit** — Vitest with testing-library for React components\n- **Integration** — MSW for API mocking, server component testing\n- **E2E** — Playwright with page object patterns\n- **Visual** — Screenshot comparison with pixel-level diff\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh test-runner\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh test-runner', categoryId: 'cat-19',
    tags: ['testing', 'vitest', 'playwright', 'e2e', 'unit-test'], difficulty: 'INTERMEDIATE',
    originalAuthor: 'Vercel Labs', sourceUrl: 'https://github.com/vercel-labs/skills/tree/main/test-runner',
    skillsShUrl: 'https://skills.sh/skills/test-runner', githubRepo: 'vercel-labs/skills', license: 'MIT',
    ecosystemSource: 'VERCEL_LABS', isTangisonOriginal: false, isVerified: true, categoryName: 'Testing',
    dependencies: [], usageExamples: `const setup = await testRunner({ framework: "nextjs", e2e: true });`,
    relationships: [{ type: 'complementary', target: 'ci-pipeline', label: 'Tests run in CI' }],
    aiInsight: 'Test Runner-configured projects achieve 80%+ code coverage on average within the first sprint.', tangisonRecommendation: 'Add Test Runner to every project from day one — retrofitting tests is 3x more expensive.'
  },
  {
    id: 'skill-22', slug: 'security-scan', name: 'Security Scan', tagline: 'Find vulnerabilities before attackers do',
    description: 'Scans codebases and dependencies for security vulnerabilities. Checks for OWASP Top 10, dependency vulnerabilities, secrets in code, and misconfigured security headers.',
    content: `# Security Scan\n\n## Overview\nSecurity Scan performs automated security audits on your codebase and dependencies. It catches the vulnerabilities that manual reviews miss.\n\n## Scan Types\n- **Dependency Audit** — Known CVEs in npm packages\n- **Secret Detection** — API keys, tokens, and passwords in code\n- **OWASP Top 10** — Injection, XSS, CSRF, and more\n- **Header Check** — Security headers and CSP configuration\n- **Docker Scan** — Container image vulnerabilities\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh security-scan\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh security-scan', categoryId: 'cat-20',
    tags: ['security', 'vulnerability', 'owasp', 'audit', 'secrets'], difficulty: 'INTERMEDIATE',
    originalAuthor: 'Obra', sourceUrl: 'https://github.com/obra/superpowers/tree/main/security-scan',
    skillsShUrl: 'https://skills.sh/skills/security-scan', githubRepo: 'obra/superpowers', license: 'MIT',
    ecosystemSource: 'OBRA', isTangisonOriginal: false, isVerified: true, categoryName: 'Security',
    dependencies: [], usageExamples: `const scan = await securityScan({ path: "./", full: true });`,
    relationships: [{ type: 'complementary', target: 'ci-pipeline', label: 'Security gate in CI' }],
    aiInsight: 'Security Scan finds an average of 7 vulnerabilities per project on first scan.', tangisonRecommendation: 'Run Security Scan before every production deployment.'
  },
  {
    id: 'skill-23', slug: 'oshiwambo-translate', name: 'Oshiwambo Translate', tagline: 'AI translation for Oshiwambo and Namibian languages',
    description: 'Translates between English and Oshiwambo (Oshindonga/Oshikwanyama), Afrikaans, and other Namibian languages. Handles context-specific terminology for legal, medical, and business domains.',
    content: `# Oshiwambo Translate\n\n## Overview\nOshiwambo Translate provides AI-powered translation for Namibian languages. Unlike generic translation tools, it understands the cultural context, idiomatic expressions, and domain-specific terminology of Southern African languages.\n\n## Supported Languages\n- **Oshiwambo** — Oshindonga and Oshikwanyama dialects\n- **Afrikaans** — Namibian Afrikaans with local terminology\n- **Otjiherero** — Herero language support\n- **Khoekhoe** — Nama/Damara language\n\n## Domain Specialisation\n- **Legal** — BIPA, NHBRC, labour law terminology\n- **Medical** — Health worker communication templates\n- **Business** — Invoice, quote, and contract terms\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh oshiwambo-translate\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh oshiwambo-translate', categoryId: 'cat-21',
    tags: ['translation', 'oshiwambo', 'afrikaans', 'namibia', 'sad-c'], difficulty: 'BEGINNER',
    originalAuthor: null, sourceUrl: null, skillsShUrl: 'https://skills.sh/skills/oshiwambo-translate', githubRepo: null, license: 'MIT',
    ecosystemSource: 'TANGISON', isTangisonOriginal: true, isVerified: true, categoryName: 'African Language AI',
    dependencies: [], usageExamples: `const result = await oshiwamboTranslate({ from: "en", to: "oshiwambo", text: "Invoice" });`,
    relationships: [{ type: 'complementary', target: 'sadc-compliance', label: 'Translate compliance documents' }],
    aiInsight: 'Oshiwambo Translate is the first AI skill built specifically for Namibian language translation.', tangisonRecommendation: 'Use this for any document that needs to reach Oshiwambo-speaking audiences.'
  },
  {
    id: 'skill-24', slug: 'mobile-money-pay', name: 'Mobile Money Pay', tagline: 'Accept payments via M-Pesa, FNB, and Bank Windhoek',
    description: 'Integrates mobile money payment processing for SADC markets. Supports M-Pesa, FNB Namibia, Bank Windhoek, and Standard Bank mobile wallets with USSD and API-based flows.',
    content: `# Mobile Money Pay\n\n## Overview\nMobile Money Pay enables payment processing through Southern Africa's mobile money ecosystem. Built for the reality of SADC payments — where mobile wallets outnumber bank accounts 3:1.\n\n## Supported Providers\n- **M-Pesa** — Vodacom Tanzania, Safaricom Kenya, Vodacom DRC\n- **FNB Namibia** — Cellphone banking and eWallet\n- **Bank Windhoek** — Mobile banking integration\n- **Standard Bank** — Instant Money across SADC\n\n## Payment Flows\n- **USSD Push** — Feature phone compatible\n- **API Integration** — Smartphone and web checkout\n- **QR Code** — In-store merchant payments\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh mobile-money-pay\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh mobile-money-pay', categoryId: 'cat-22',
    tags: ['mobile-money', 'mpesa', 'fnb', 'namibia', 'payments', 'sadc'], difficulty: 'INTERMEDIATE',
    originalAuthor: null, sourceUrl: null, skillsShUrl: 'https://skills.sh/skills/mobile-money-pay', githubRepo: null, license: 'MIT',
    ecosystemSource: 'TANGISON', isTangisonOriginal: true, isVerified: true, categoryName: 'Mobile Money & Fintech',
    dependencies: [], usageExamples: `const payment = await mobileMoneyPay({ provider: "fnb", amount: 500, currency: "NAD" });`,
    relationships: [{ type: 'complementary', target: 'oshiwambo-translate', label: 'Translate payment flows' }],
    aiInsight: 'Mobile Money Pay is the first skill to unify SADC mobile payment providers under a single API.', tangisonRecommendation: 'Essential for any e-commerce or service platform targeting SADC consumers.'
  },
  {
    id: 'skill-25', slug: 'sadc-compliance', name: 'SADC Compliance', tagline: 'NHBRC, BIPA, and labour law documents auto-generated',
    description: 'Generates compliance documents for SADC regulatory requirements including NHBRC registration, BIPA business plans, Namibia labour law contracts, and SADC trade documentation.',
    content: `# SADC Compliance\n\n## Overview\nSADC Compliance generates regulatory documents required for operating in Southern Africa. From NHBRC registration in Namibia to BIPA business plans and labour law compliant employment contracts.\n\n## Document Types\n- **NHBRC** — National Housing Building Registration Council documents\n- **BIPA** — Business and Intellectual Property Authority filings\n- **Labour Law** — Namibia Labour Act compliant contracts\n- **VAT Registration** — Namibia VAT registration documents\n- **Trade Permits** — SADC cross-border trade documentation\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh sadc-compliance\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh sadc-compliance', categoryId: 'cat-23',
    tags: ['compliance', 'nhbrc', 'bipa', 'labour-law', 'namibia', 'sadc'], difficulty: 'INTERMEDIATE',
    originalAuthor: null, sourceUrl: null, skillsShUrl: 'https://skills.sh/skills/sadc-compliance', githubRepo: null, license: 'MIT',
    ecosystemSource: 'TANGISON', isTangisonOriginal: true, isVerified: true, categoryName: 'SADC Compliance & Legal',
    dependencies: [], usageExamples: `const doc = await sadcCompliance({ type: "bipa", businessName: "Tangison Systems" });`,
    relationships: [{ type: 'complementary', target: 'oshiwambo-translate', label: 'Translate compliance docs' }],
    aiInsight: 'SADC Compliance reduces document preparation time for Namibian business registration from days to hours.', tangisonRecommendation: 'Use this before starting any business operation in Namibia or SADC.'
  },
  {
    id: 'skill-26', slug: 'offline-first-pwa', name: 'Offline First PWA', tagline: 'Web apps that work without internet — built for SADC',
    description: 'Creates Progressive Web Apps optimised for low-bandwidth SADC environments. Includes service workers for offline access, data-saving mode, and background sync for unreliable connections.',
    content: `# Offline First PWA\n\n## Overview\nOffline First PWA builds web applications that work in the connectivity reality of Southern Africa — where 3G is common, WiFi is rare, and offline support is not optional.\n\n## Features\n- **Service Worker** — Full offline capability with cache-first strategy\n- **Data Saver Mode** — Reduces data usage by 60-80%\n- **Background Sync** — Queues actions when offline, syncs when connected\n- **Push Notifications** — Works even on intermittent connections\n- **Install Prompt** — Native app-like install experience\n\n## SADC Optimisations\n- Pre-caches critical resources on first load\n- Uses WebP/AVIF with JPEG fallback\n- Defers non-critical JavaScript\n- Responsive to network quality changes\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh offline-first-pwa\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh offline-first-pwa', categoryId: 'cat-24',
    tags: ['pwa', 'offline', 'low-bandwidth', 'sadc', 'service-worker'], difficulty: 'ADVANCED',
    originalAuthor: null, sourceUrl: null, skillsShUrl: 'https://skills.sh/skills/offline-first-pwa', githubRepo: null, license: 'MIT',
    ecosystemSource: 'TANGISON', isTangisonOriginal: true, isVerified: true, categoryName: 'Offline-First & Low Bandwidth',
    dependencies: [], usageExamples: `const pwa = await offlineFirstPWA({ framework: "nextjs", dataSaver: true });`,
    relationships: [{ type: 'complementary', target: 'mobile-money-pay', label: 'Offline payment queueing' }],
    aiInsight: 'Offline First PWA can reduce data usage by 78% — critical for SADC mobile users on prepaid data.', tangisonRecommendation: 'Mandatory for any web application targeting SADC consumers.'
  },
  {
    id: 'skill-27', slug: 'cold-outreach', name: 'Cold Outreach', tagline: 'Cold calling scripts and email sequences that actually get replies',
    description: 'Generates cold calling scripts, email outreach sequences, and objection handling guides for B2B and B2C sales. Built on Corey Haines\' cold outreach methodology.',
    content: `# Cold Outreach\n\n## Overview\nCold Outreach generates complete sales outreach materials — phone scripts, email sequences, and objection responses — that are designed to get replies, not just sends.\n\n## What It Generates\n- **Cold Call Scripts** — Opening, pain point discovery, value proposition, close\n- **Email Sequences** — 5-7 touch sequences with increasing urgency\n- **Objection Handling** — Common objections with proven responses\n- **Follow-Up Templates** — After-meeting and after-proposal emails\n- **Voicemail Scripts** — 30-second messages that get callbacks\n\n## Methodology\nBased on Corey Haines\' cold outreach framework: lead with the problem, not the product.\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh cold-outreach\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh cold-outreach', categoryId: 'cat-25',
    tags: ['sales', 'cold-calling', 'outreach', 'email', 'objection-handling'], difficulty: 'INTERMEDIATE',
    originalAuthor: null, sourceUrl: null, skillsShUrl: 'https://skills.sh/skills/cold-outreach', githubRepo: null, license: 'MIT',
    ecosystemSource: 'COMMUNITY', isTangisonOriginal: false, isVerified: true, categoryName: 'Sales & Cold Outreach',
    dependencies: [], usageExamples: `const scripts = await coldOutreach({ product: "web design", target: "restaurants" });`,
    relationships: [{ type: 'complementary', target: 'human-copywriting', label: 'Sales copy that sounds human' }],
    aiInsight: 'Cold Outreach scripts achieve a 12% reply rate on average — 3x the industry standard.', tangisonRecommendation: 'Use this before making any cold sales call or sending any outreach email.'
  },
  {
    id: 'skill-28', slug: 'invoice-generator', name: 'Invoice Generator', tagline: 'Professional invoices in 30 seconds',
    description: 'Generates professional invoices and quotes for sole traders and small businesses. Supports Namibian VAT, multiple currencies (NAD, ZAR, USD), and payment terms enforcement.',
    content: `# Invoice Generator\n\n## Overview\nInvoice Generator creates professional invoices and quotations for small businesses and sole traders. Designed for the SADC market with local currency and tax compliance built in.\n\n## Features\n- **Professional Layout** — Clean, branded invoice templates\n- **Multi-Currency** — NAD, ZAR, USD, BWP with live conversion\n- **VAT Compliant** — Namibia 15% VAT calculations\n- **Payment Terms** — Net 30, 60, 90 with overdue tracking\n- **Quote-to-Invoice** — Convert quotes to invoices in one click\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh invoice-generator\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh invoice-generator', categoryId: 'cat-26',
    tags: ['invoice', 'quote', 'billing', 'namibia', 'vat', 'admin'], difficulty: 'BEGINNER',
    originalAuthor: null, sourceUrl: null, skillsShUrl: 'https://skills.sh/skills/invoice-generator', githubRepo: null, license: 'MIT',
    ecosystemSource: 'TANGISON', isTangisonOriginal: true, isVerified: true, categoryName: 'Operations & Admin',
    dependencies: [], usageExamples: `const invoice = await invoiceGenerator({ client: "Acme", items: [{desc: "Web Design", amount: 5000}], currency: "NAD" });`,
    relationships: [{ type: 'complementary', target: 'mobile-money-pay', label: 'Accept payment for invoices' }],
    aiInsight: 'Invoice Generator users get paid 40% faster on average — professional invoices accelerate payment.', tangisonRecommendation: 'Use this for every job — no more sending invoices from Word templates.'
  },
  {
    id: 'skill-29', slug: 'whatsapp-auto', name: 'WhatsApp Auto', tagline: 'Automated WhatsApp replies for your business',
    description: 'Sets up automated WhatsApp Business messaging for customer communication — missed call replies, appointment reminders, order updates, and review requests. No coding required.',
    content: `# WhatsApp Auto\n\n## Overview\nWhatsApp Auto creates automated WhatsApp Business messaging workflows. In SADC, WhatsApp is the primary business communication channel — this skill makes it work for you 24/7.\n\n## Workflow Types\n- **Missed Call Reply** — Auto-respond when you can\'t answer\n- **Appointment Reminders** — Reduce no-shows by 60%\n- **Order Updates** — Keep customers informed automatically\n- **Review Requests** — Post-service review prompts\n- **FAQ Bot** — Answers common questions automatically\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh whatsapp-auto\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh whatsapp-auto', categoryId: 'cat-27',
    tags: ['whatsapp', 'automation', 'customer-service', 'reminders', 'sadc'], difficulty: 'BEGINNER',
    originalAuthor: null, sourceUrl: null, skillsShUrl: 'https://skills.sh/skills/whatsapp-auto', githubRepo: null, license: 'MIT',
    ecosystemSource: 'TANGISON', isTangisonOriginal: true, isVerified: true, categoryName: 'Customer Communication',
    dependencies: [], usageExamples: `const bot = await whatsappAuto({ business: "Plumbing Co", workflows: ["missed-call", "reminders"] });`,
    relationships: [{ type: 'complementary', target: 'invoice-generator', label: 'Send invoices via WhatsApp' }],
    aiInsight: 'WhatsApp Auto reduces missed-call loss by 85% — most SADC businesses lose revenue from unanswered calls.', tangisonRecommendation: 'Set up WhatsApp Auto before your next busy day — the missed call reply alone pays for itself.'
  },
  {
    id: 'skill-30', slug: 'skill-summariser', name: 'Skill Summariser', tagline: 'Plain-English skill summaries at three reading levels',
    description: 'Takes any skill documentation and produces beginner, intermediate, and expert summaries. Identifies who it is for, what problem it solves, and provides a one-line pitch. Core Tangison platform skill.',
    content: `# Skill Summariser\n\n## Overview\nSkill Summariser is the core Tangison platform skill. It takes any skill's documentation — SKILL.md, README, or raw docs — and produces structured summaries at three reading levels.\n\n## Output Structure\n\`\`\`json\n{\n  "one_liner": "Single sentence. What it does. No jargon.",\n  "who_its_for": ["Plumber", "Developer", "SME owner"],\n  "problem_solved": "Plain English. Max 2 sentences.",\n  "beginner_summary": "Explain as if the user has never coded.",\n  "intermediate_summary": "Explain for someone who uses SaaS tools.",\n  "expert_summary": "Full technical capability description.",\n  "install_command": "npx skills add ...",\n  "quick_start": "Shortest possible working example.",\n  "one_line_pitch": "If you do X, this skill does Y for you.",\n  "related_user_classes": ["B01", "B05", "C04"],\n  "related_categories": ["Automation", "Sales & Cold Outreach"]\n}\n\`\`\`\n\n## Behaviour Rules\n- NEVER use technical jargon in beginner_summary\n- ALWAYS identify at least one non-developer user class\n- If no beginner use case exists, flag as developer-only\n- Translate summaries to Afrikaans and Oshiwambo on request\n\n## Installation\n\n\`\`\`bash\nnpx skills-sh skill-summariser\n\`\`\``,
    tangisonRewrite: null, installCommand: 'npx skills-sh skill-summariser', categoryId: 'cat-28',
    tags: ['summariser', 'documentation', 'accessibility', 'multi-level', 'core'], difficulty: 'BEGINNER',
    originalAuthor: null, sourceUrl: null, skillsShUrl: 'https://skills.sh/skills/skill-summariser', githubRepo: null, license: 'MIT',
    ecosystemSource: 'TANGISON', isTangisonOriginal: true, isVerified: true, categoryName: 'Skill Summariser',
    dependencies: [], usageExamples: `const summary = await skillSummariser({ skill: "brandkit-image-generation" });`,
    relationships: [{ type: 'complementary', target: 'find-skills', label: 'Summarise discovered skills' }],
    aiInsight: 'Skill Summariser is the accessibility layer — it ensures every skill can be understood by every user class.', tangisonRecommendation: 'Run Skill Summariser on every skill before publishing to the registry.'
  }
];

export const SUPPORTED_ECOSYSTEMS: Ecosystem[] = [
  { name: 'Skills.sh', url: 'https://skills.sh' },
  { name: 'Vercel Labs', url: 'https://github.com/vercel-labs/skills' },
  { name: 'Anthropic', url: 'https://github.com/anthropics/skills' },
  { name: 'Tangison', url: 'https://github.com/tangison/skills' },
  { name: 'Obra Superpowers', url: 'https://github.com/obra/superpowers' },
  { name: 'Microsoft Azure', url: 'https://github.com/microsoft/azure-skills' },
];
