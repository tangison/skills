import { NextResponse } from 'next/server';
import { aiChat } from '@/lib/ai-provider';

/* ═══════════════════════════════════════════════════════════════
   SKILLSCAMP PROMPT WRITER — Sovereign Prompt Engineering Engine v2.0

   Generates structured, production-grade AI system prompts with:
   - Context-specific framing for 10 skill domains
   - Tone control that maps to measurable output
   - 7 strict guidelines enforced on every rewrite
   - Role / Behavior / Tone / Escalation / Constraints structure
   ═══════════════════════════════════════════════════════════════ */

// Context-specific framing instructions
const CONTEXT_FRAMING: Record<string, string> = {
  'Agent Builder': 'The AI being prompted is an autonomous agent that plans, uses tools, and iterates toward a goal. Focus on action space design, observation formatting, and recovery patterns.',
  'Chat': 'The AI being prompted is a conversational assistant. Focus on turn management, context tracking, personality consistency, and escalation to human support.',
  'RAG': 'The AI being prompted retrieves from a knowledge base and generates grounded answers. Focus on retrieval strategy, citation enforcement, hallucination prevention, and source attribution.',
  'Workflow': 'The AI being prompted orchestrates multi-step processes. Focus on phase transitions, state management, error recovery at boundaries, and completion verification.',
  'Code Review': 'The AI being prompted reviews code for quality, security, and correctness. Focus on pattern detection, severity classification, actionable fix suggestions, and style enforcement.',
  'Data Analysis': 'The AI being prompted analyzes datasets and produces insights. Focus on statistical rigor, visualization recommendations, anomaly detection, and confidence scoring.',
  'Creative Writing': 'The AI being prompted generates creative content. Focus on voice consistency, structure variation, audience adaptation, and avoiding repetitive patterns.',
  'Research': 'The AI being prompted conducts research and produces reports. Focus on source verification, methodology transparency, citation tracking, and confidence levels.',
  'Customer Support': 'The AI being prompted handles customer inquiries. Focus on issue classification, resolution paths, escalation triggers, and empathy calibration.',
  'Education': 'The AI being prompted teaches or tutors. Focus on scaffolding, concept progression, assessment design, and adaptive difficulty.',
};

const TONE_MAPPING: Record<string, string> = {
  'Professional': 'Uses industry-standard terminology without condescension. Sentences are direct and evidence-based. No colloquialisms.',
  'Technical': 'Uses domain-specific jargon freely. Assumes reader expertise. Prioritizes precision over accessibility. References specifications and standards.',
  'Concise': 'Maximum information density. Every sentence must convey new information. No transitions, no meta-commentary, no hedging. Bullet points over paragraphs.',
  'Detailed': 'Thorough explanations with examples. Anticipates edge cases. Provides context for every instruction. Uses numbered steps and explicit conditions.',
  'Authoritative': 'Declarative statements only. No qualifiers ("might", "could", "perhaps"). Instructions are commands, not suggestions. Sounds like a specification document.',
  'Conversational': 'Natural, approachable language. Uses second person. Explains reasoning behind instructions. Balances friendliness with clarity.',
  'Academic': 'Formal, precise, citation-aware. Uses passive voice where appropriate. Qualifies claims with evidence levels. Follows academic writing conventions.',
  'Minimal': 'Extreme brevity. Keyword-driven. Each instruction is a single imperative. No explanations. No examples. Pure specification.',
};

const SEVEN_GUIDELINES = `7 STRICT GUIDELINES ENFORCED ON EVERY REWRITE:
1. NO HALLUCINATION — Never invent capabilities, data, or references the AI doesn't have access to. If unsure, the prompt MUST instruct the AI to say so.
2. NO FILLER — Remove all hedging ("perhaps", "maybe", "it could be said"), motivational language ("you can do it!"), and conversational preamble ("Great question!", "Sure!").
3. ALWAYS ESCALATE — If the user's request is ambiguous, unsafe, or beyond scope, the prompt MUST instruct the AI to ask for clarification rather than guess.
4. ROLE CLARITY — The role must be specific enough that a stranger could read it and know exactly what the AI does, what it doesn't do, and where its boundaries are.
5. BEHAVIOR IS ACTIONABLE — Every behavior bullet must be testable: "Return X when Y" not "Be helpful". If you can't write a test for it, it's not actionable.
6. TONE IS ENFORCEABLE — Tone must map to measurable output. "Technical: uses domain terminology without definition" is enforceable. "Friendly and approachable" is not.
7. CONSTRAINTS ARE ABSOLUTE — Constraints must be specific, measurable, and never have exceptions. "Never output more than 500 words" is absolute. "Try to be concise" is not.`;

const PROMPT_WRITER_SYSTEM = `You are the SkillsCamp Prompt Writer — a sovereign prompt engineering engine built by TANGISON SYSTEMS.

You generate structured, production-grade AI system prompts. Every output MUST follow this exact format with these exact section headers:

## ROLE
[One clear, specific sentence defining what the AI is and does. Must be specific enough for a stranger to understand immediately.]

## BEHAVIOR
[3-5 bullet points defining how the AI operates. Each bullet starts with an action verb and is independently testable.]

## TONE
[2-3 enforceable tone descriptors that map to measurable output, plus 1 sentence describing the net effect.]

## ESCALATION
[Specific conditions under which the AI must escalate, refuse, or ask for clarification. Include exact trigger phrases or patterns.]

## CONSTRAINTS
[Hard rules the AI must never violate. Numbered list. Each must be specific, measurable, and absolute.]

---

{CONTEXT_FRAMING}

{TONE_INSTRUCTION}

${SEVEN_GUIDELINES}

Generate a complete structured prompt following the format above. No preamble, no explanation, no meta-commentary. Just the prompt.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { context, tone, input, variation } = body as {
      context: string;
      tone: string;
      input: string;
      variation?: number;
    };

    if (!input || input.trim().length === 0) {
      return NextResponse.json(
        { error: 'Input description is required' },
        { status: 400 }
      );
    }

    // Build context-specific framing
    const contextFraming = CONTEXT_FRAMING[context] || CONTEXT_FRAMING['Agent Builder'];
    const toneInstruction = TONE_MAPPING[tone] || TONE_MAPPING['Professional'];

    const systemPrompt = PROMPT_WRITER_SYSTEM
      .replace('{CONTEXT_FRAMING}', contextFraming)
      .replace('{TONE_INSTRUCTION}', `TONE REQUIREMENT: ${toneInstruction}`);

    const variationNote = variation && variation > 1
      ? `\n\nThis is variation ${variation}. Approach the same requirement from a different angle — use alternative phrasing, different behavioral emphasis, or restructured constraints while maintaining the same core functionality.`
      : '';

    const userPrompt = `Write a structured system prompt for the following AI:\n\n${input}${variationNote}`;

    // Use smart AI provider (z-ai-sdk in sandbox, OpenRouter on Vercel)
    const { text: promptResult } = await aiChat(
      [
        { role: 'assistant', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      1500
    );

    if (!promptResult || promptResult.trim().length === 0) {
      return NextResponse.json(
        { error: 'AI returned an empty response. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ result: promptResult });
  } catch (error: unknown) {
    console.error('[Prompt Writer API] Error:', error);
    const message = error instanceof Error ? error.message : 'Prompt generation failed';

    // Error recovery with root cause hint
    if (message.includes('rate') || message.includes('429')) {
      return NextResponse.json(
        { error: 'AI service is busy. Wait a moment and try again.' },
        { status: 503 }
      );
    }
    if (message.includes('timeout')) {
      return NextResponse.json(
        { error: 'Request timed out. Try a shorter description.' },
        { status: 504 }
      );
    }
    if (message.includes('OPENROUTER_API_KEY')) {
      return NextResponse.json(
        { error: 'AI service not configured. Set OPENROUTER_API_KEY environment variable.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
