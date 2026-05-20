import { NextResponse } from 'next/server';
import { aiChat } from '@/lib/ai-provider';

/* ═══════════════════════════════════════════════════════════════
   TANGISON SKILLSCAMP — AI Document Generation Engine v1.0

   Generates professional documents (proposals, reports, briefs,
   invoices, memos, contracts, pitch decks, SOWs) using the
   existing AI provider adapter.

   Architecture: Type-mapped section structures + strict system
   prompt + Tangison Agency branding enforcement
   ═══════════════════════════════════════════════════════════════ */

// ── Types ──

type DocumentType =
  | 'proposal'
  | 'report'
  | 'brief'
  | 'invoice'
  | 'memo'
  | 'contract'
  | 'pitch_deck'
  | 'sow';

type Tone =
  | 'professional'
  | 'technical'
  | 'concise'
  | 'authoritative'
  | 'conversational';

interface DocumentRequest {
  documentType: DocumentType;
  title: string;
  client?: string;
  author?: string;
  tone?: Tone;
  description: string;
}

// ── Document Section Structures ──

const DOCUMENT_STRUCTURES: Record<DocumentType, string[]> = {
  proposal: [
    'Cover Page',
    'Executive Summary',
    'Problem Statement',
    'Proposed Solution',
    'Timeline',
    'Investment',
    'Terms & Conditions',
  ],
  report: [
    'Cover Page',
    'Executive Summary',
    'Findings',
    'Analysis',
    'Recommendations',
    'Appendix',
  ],
  brief: [
    'Cover Page',
    'Background',
    'Objective',
    'Key Points',
    'Recommendations',
    'Next Steps',
  ],
  invoice: [
    'Header (Company / Client Info)',
    'Line Items',
    'Subtotal',
    'Tax',
    'Total',
    'Payment Terms',
  ],
  memo: [
    'Header (TO / FROM / DATE / RE)',
    'Summary',
    'Context',
    'Action Items',
    'Deadline',
  ],
  contract: [
    'Parties',
    'Recitals',
    'Terms',
    'Obligations',
    'Payment',
    'Termination',
    'Signatures',
  ],
  pitch_deck: [
    'Cover',
    'Problem',
    'Solution',
    'Market',
    'Traction',
    'Team',
    'Ask',
  ],
  sow: [
    'Cover Page',
    'Scope',
    'Deliverables',
    'Timeline',
    'Acceptance Criteria',
    'Payment Schedule',
    'Terms & Conditions',
  ],
};

// ── Tone Descriptions ──

const TONE_DESCRIPTIONS: Record<Tone, string> = {
  professional:
    'Formal, polished, confident. Use precise business language. No slang, no jargon unless industry-standard. Write like a senior partner at a top consulting firm.',
  technical:
    'Precise, detailed, engineering-focused. Use domain-specific terminology with clarity. Include specifications, metrics, and technical rationale where appropriate. Write like a principal engineer reviewing architecture.',
  concise:
    'Direct, brief, to-the-point. Every sentence carries weight. No qualifiers, no hedging, no filler. Write like a CFO who bills by the hour.',
  authoritative:
    'Commanding, definitive, assertive. State conclusions with conviction. Reference standards, regulations, and precedent. Write like a regulatory authority issuing guidance.',
  conversational:
    'Warm, clear, approachable. Professional but not stiff. Use active voice and direct address. Write like a trusted advisor explaining something over a working lunch.',
};

// ── Banned Phrases ──

const BANNED_PHRASES = [
  'Elevate',
  'Seamless',
  'Unleash',
  'Next-Gen',
  'Game-changer',
  'Leverage',
  'Synergy',
  'Disrupt',
  'Innovative',
  'Cutting-edge',
  'Best-in-class',
  'World-class',
  'Holistic',
  'Paradigm shift',
  'Deep dive',
  'Low-hanging fruit',
  'Move the needle',
  'Circle back',
  'Pivot',
  'Optimize',
  'Streamline',
  'Robust',
  'Scalable solution',
  'Value-added',
  'End-to-end',
  'Thought leader',
  'Empower',
  'Transformative',
];

// ── System Prompt ──

const DOCUMENT_SYSTEM_PROMPT = `You are the Tangison Agency Document Engine — a senior consultant and technical writer with 20 years of experience producing high-stakes documents for Fortune 500 clients, government agencies, and venture-backed startups.

## CORE IDENTITY
You write like a senior consultant: no filler, no generic copy, no AI clichés. Every paragraph earns its place. Every section delivers substantive, specific content that a real professional would be proud to put their name on.

## MANDATORY RULES

### Content Quality
1. Write FULL sections with REAL, SUBSTANTIVE content — never placeholders, never "insert here", never "TBD"
2. Every section must contain at least 2-3 substantive paragraphs or a detailed table/list
3. Use specific numbers, dates, and details — not vague generalities
4. Include realistic data points, percentages, and timelines where appropriate
5. Every claim must be grounded and credible

### Document Structure
6. Include a cover page with: Document Title, Client Name, Author, Date, Tangison Agency branding
7. Include a Table of Contents after the cover page
8. Follow the section structure provided for the document type — do not skip or merge sections
9. Use proper Markdown heading hierarchy: # for document title, ## for major sections, ### for subsections
10. Include page-style footer on cover: "Tangison Agency | Confidential"

### Writing Standards
11. BANNED PHRASES — NEVER use these: ${BANNED_PHRASES.join(', ')}
12. Replace banned words with plain language: "use" not "leverage", "improve" not "elevate", "integrated" not "seamless"
13. No hedging: "very", "really", "basically", "just", "quite", "somewhat" — strike them all
14. Active voice. Direct statements. Short sentences when making a point.
15. No rhetorical questions. No exclamation marks outside of direct quotes.

### Formatting
16. Output as clean Markdown with proper heading hierarchy
17. Use tables for structured data (timelines, pricing, deliverables, line items)
18. Use bullet lists for enumeration, numbered lists for sequential steps
19. Use bold for key terms, not for entire sentences
20. Use horizontal rules (---) to separate major document sections

### Brand
21. This document is produced by Tangison Agency (Tangison Systems)
22. Cover page footer: "Prepared by Tangison Agency | Confidential"
23. Tone is professional by default unless otherwise specified

## DOCUMENT TYPE STRUCTURES

The following section order is MANDATORY for each document type:

- **proposal**: Cover, Executive Summary, Problem Statement, Proposed Solution, Timeline, Investment, Terms
- **report**: Cover, Executive Summary, Findings, Analysis, Recommendations, Appendix
- **brief**: Cover, Background, Objective, Key Points, Recommendations, Next Steps
- **invoice**: Header (Company/Client info), Line Items, Subtotal, Tax, Total, Payment Terms
- **memo**: Header (TO/FROM/DATE/RE), Summary, Context, Action Items, Deadline
- **contract**: Parties, Recitals, Terms, Obligations, Payment, Termination, Signatures
- **pitch_deck**: Cover, Problem, Solution, Market, Traction, Team, Ask
- **sow**: Cover, Scope, Deliverables, Timeline, Acceptance Criteria, Payment Schedule, Terms

## OUTPUT FORMAT
Return ONLY the document content as clean Markdown. No preamble, no meta-commentary, no "Here is your document" — just the document itself starting with the cover page.`;

// ── Route Handler ──

export async function POST(request: Request) {
  try {
    const body = await request.json() as DocumentRequest;

    // ── Validate required fields ──
    const { documentType, title, description, client, author, tone } = body;

    if (!documentType) {
      return NextResponse.json(
        { error: 'documentType is required' },
        { status: 400 }
      );
    }

    const validDocTypes: DocumentType[] = [
      'proposal', 'report', 'brief', 'invoice', 'memo', 'contract', 'pitch_deck', 'sow',
    ];
    if (!validDocTypes.includes(documentType)) {
      return NextResponse.json(
        { error: `Invalid documentType. Must be one of: ${validDocTypes.join(', ')}` },
        { status: 400 }
      );
    }

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: 'title is required' },
        { status: 400 }
      );
    }

    if (!description || !description.trim()) {
      return NextResponse.json(
        { error: 'description is required' },
        { status: 400 }
      );
    }

    const validTones: Tone[] = [
      'professional', 'technical', 'concise', 'authoritative', 'conversational',
    ];
    if (tone && !validTones.includes(tone)) {
      return NextResponse.json(
        { error: `Invalid tone. Must be one of: ${validTones.join(', ')}` },
        { status: 400 }
      );
    }

    // ── Build the user prompt ──
    const resolvedTone = tone || 'professional';
    const toneInstruction = TONE_DESCRIPTIONS[resolvedTone];
    const sections = DOCUMENT_STRUCTURES[documentType].join(' → ');
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const userPrompt = `Generate a ${documentType.replace('_', ' ')} document with the following parameters:

**Document Type:** ${documentType.replace('_', ' ')}
**Title:** ${title}
**Client:** ${client || 'Not specified'}
**Author:** ${author || 'Tangison Agency'}
**Date:** ${today}
**Tone:** ${resolvedTone} — ${toneInstruction}

**Required Sections (in order):**
${DOCUMENT_STRUCTURES[documentType].map((s, i) => `${i + 1}. ${s}`).join('\n')}

**Description / Context:**
${description}

REQUIREMENTS:
- Follow the section structure exactly as listed above
- Write full, substantive content for every section — no placeholders
- Tone: ${resolvedTone} (${toneInstruction})
- Include a cover page and table of contents
- Use tables for structured data (pricing, timelines, deliverables, line items)
- Date: ${today}
- Client: ${client || 'Not specified'}
- Author: ${author || 'Tangison Agency'}
- Do NOT use any banned phrases
- Output clean Markdown only, starting with the cover page`;

    // ── Call AI provider ──
    const { text: document } = await aiChat(
      [
        { role: 'assistant', content: DOCUMENT_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      4000
    );

    if (!document || document.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'The AI service returned an empty document. Please try again with a more detailed description.',
          document: '',
          documentType,
          title,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      document,
      documentType,
      title,
    });
  } catch (error: unknown) {
    console.error('[Document API] Error:', error);

    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    let userMessage = 'Document generation failed. Please try again.';

    if (errorMsg.includes('rate') || errorMsg.includes('429')) {
      userMessage =
        'The AI service is currently at capacity. Please wait a moment and try again.';
    } else if (errorMsg.includes('timeout') || errorMsg.includes('ETIMEDOUT')) {
      userMessage =
        'Document generation timed out. Try shortening your description or try again shortly.';
    } else if (
      errorMsg.includes('key') ||
      errorMsg.includes('auth') ||
      errorMsg.includes('OPENROUTER_API_KEY')
    ) {
      userMessage =
        'The AI service is not configured correctly. Please contact support.';
    } else if (errorMsg.includes('JSON') || errorMsg.includes('parse')) {
      userMessage =
        'Invalid request format. Please check your input and try again.';
    }

    return NextResponse.json(
      { error: userMessage, detail: errorMsg },
      { status: 500 }
    );
  }
}
