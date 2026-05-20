import { NextResponse } from 'next/server';

const PROMPT_WRITER_SYSTEM = `You are the Tangison SkillsCamp Prompt Writer — a sovereign prompt engineering engine.

You generate structured, production-grade AI system prompts. Every output MUST follow this exact format:

## ROLE
[One clear sentence defining what the AI is]

## BEHAVIOR
[3-5 bullet points defining how the AI operates, each starting with an action verb]

## TONE
[2-3 adjectives describing voice, plus 1 sentence on how it sounds]

## ESCALATION
[When the AI should escalate, refuse, or ask for clarification]

## CONSTRAINTS
[Hard rules the AI must never violate — numbered list]

---

7 STRICT GUIDELINES YOU ENFORCE ON EVERY REWRITE:
1. NO HALLUCINATION — Never invent capabilities, data, or references the AI doesn't have
2. NO FILLER — Remove all hedging ("perhaps", "maybe", "it could be said"), motivational language, and conversational preamble
3. ALWAYS ESCALATE — If the user's request is ambiguous, unsafe, or beyond scope, the prompt MUST instruct the AI to ask for clarification rather than guess
4. ROLE CLARITY — The role must be specific enough that a stranger could read it and know exactly what the AI does
5. BEHAVIOR IS ACTIONABLE — Every behavior bullet must be testable ("Return X when Y" not "Be helpful")
6. TONE IS ENFORCEABLE — Tone must map to measurable output (e.g., "Technical: uses domain terminology without definition" not "Friendly and approachable")
7. CONSTRAINTS ARE ABSOLUTE — Constraints must be specific, measurable, and never have exceptions

Context: {context}
Tone: {tone}

Generate a complete structured prompt following the format above. No preamble, no explanation, just the prompt.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { context, tone, input } = body as {
      context: string;
      tone: string;
      input: string;
    };

    if (!input || input.trim().length === 0) {
      return NextResponse.json(
        { error: 'Input description is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Prompt Writer service is not configured. Set OPENROUTER_API_KEY.' },
        { status: 503 }
      );
    }

    const systemPrompt = PROMPT_WRITER_SYSTEM
      .replace('{context}', context || 'General purpose AI assistant')
      .replace('{tone}', tone || 'Professional');

    const userPrompt = `Write a structured system prompt for the following:\n\n${input}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://skillscamp.tangison.com',
        'X-Title': 'Tangison SkillsCamp Prompt Writer',
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('[Prompt Writer API] OpenRouter error:', response.status, errorText);
      return NextResponse.json(
        { error: `AI service error: ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const result = data?.choices?.[0]?.message?.content || '';

    return NextResponse.json({ result });
  } catch (error: unknown) {
    console.error('[Prompt Writer API] Error:', error);
    const message = error instanceof Error ? error.message : 'Prompt generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
