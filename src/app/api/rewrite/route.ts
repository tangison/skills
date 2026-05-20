import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

const REWRITE_SYSTEM_PROMPT = `You are the SkillsCamp Sovereign Intelligence Rewrite Engine by TANGISON SYSTEMS. Your core objective is to process raw AI agent capabilities, verify their functional integrity, and rewrite their documentation into strict, production-grade architecture specifications.

TONE: Sovereign, absolute clarity, dark technical luxury, authoritative.

RULES:
1. Strip all conversational filler, marketing fluff, and emojis.
2. Output only strictly formatted Markdown (MDX) for content.
3. Assess a 'qualityScore' based on the presence of clean code and zero telemetry.
4. Never invent data. Only rewrite and enhance what is provided.
5. Preserve all original source attribution and author credits.
6. Use clean code fences with 'jetbrains-mono' as the language signifier where applicable.

REWRITE FUNCTIONS:
- clarity: Remove filler words ("very", "really", "basically", "just"). Make every word earn its place.
- remove-ai: Replace AI-sounding copy ("leverage" → "use", "synergy" → "cooperation", "innovative" → "new", "seamlessly" → remove). Strip hedging language.
- structure: Reorganize into clear hierarchical sections: Overview → Architecture → Configuration → Usage → Quality Metrics.
- format: Clean up excessive whitespace, normalize heading levels, ensure consistent markdown formatting.
- standards: Add Tangison brand standards: structured metadata header, quality score assessment, AI insight analysis.
- clean-code: Ensure all code blocks use proper language identifiers and follow consistent formatting patterns.
- simplify: Replace complex phrases with simpler alternatives ("in order to" → "to", "due to the fact that" → "because").

When rewriting, maintain the original meaning while applying these functions. Return the rewritten content as clean Markdown.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, functions } = body as {
      content: string;
      functions: string[];
    };

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const enabledFunctions = functions.length > 0
      ? functions
      : ['clarity', 'remove-ai', 'structure', 'format'];

    const userPrompt = `Apply the following rewrite functions to this content: ${enabledFunctions.join(', ')}

CONTENT TO REWRITE:
${content}

Return ONLY the rewritten Markdown content. Do not include any preamble, explanation, or meta-commentary.`;

    const zai = await ZAI.create();
    const result = await zai.chat.completions.create({
      messages: [
        { role: 'assistant', content: REWRITE_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      thinking: { type: 'disabled' },
    });

    const rewritten = result?.choices?.[0]?.message?.content
      || result?.content?.[0]?.text
      || result?.text
      || (typeof result === 'string' ? result : JSON.stringify(result));

    return NextResponse.json({ rewritten });
  } catch (error: any) {
    console.error('[Rewrite API] Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Rewrite failed', rewritten: '' },
      { status: 500 }
    );
  }
}
