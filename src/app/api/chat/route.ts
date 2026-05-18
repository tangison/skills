import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import { SEED_SKILLS } from '@/lib/data';

const SYSTEM_PROMPT = `You are Skillsmith AI, the intelligence layer of Tangison Skillsmith. Your job is to help users find, understand, install, and use AI agent skills from the open skills ecosystem. When a user describes what they want to build or do, you: 1) Identify the relevant skill domain, 2) Recommend the best skills with reasoning, 3) Provide the exact install command, 4) Link to the skill page. You always credit original authors. You speak in precise, calm, intelligent language. Never use hype words. If no skill exists, say so honestly.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, skillContext } = body as {
      messages: { role: 'user' | 'assistant'; content: string }[];
      skillContext?: string;
    };

    // Build skill data context for the AI
    const skillSummary = SEED_SKILLS.map(s =>
      `- **${s.name}** (${s.difficulty}): ${s.tagline} | Install: \`${s.installCommand}\` | Category: ${s.categoryName} | Score: ${s.qualityScore}/100 | Author: ${s.originalAuthor || 'Tangison'} | URL: ${s.skillsShUrl}`
    ).join('\n');

    const contextBlock = skillContext
      ? `\n\nUser is currently viewing: ${skillContext}`
      : '';

    const fullSystemPrompt = `${SYSTEM_PROMPT}\n\nHere is the current skills catalog you can reference:\n${skillSummary}${contextBlock}`;

    // Create ZAI instance and call the LLM
    const zai = await ZAI.create();
    const result = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: fullSystemPrompt },
        ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      ],
      model: 'claude-sonnet-4-20250514',
    });

    // Extract the assistant's reply text
    const reply = result?.choices?.[0]?.message?.content
      || result?.content?.[0]?.text
      || result?.text
      || (typeof result === 'string' ? result : JSON.stringify(result));

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('[Chat API] Error:', error);
    return NextResponse.json(
      { reply: 'I encountered an error processing your request. Please try again.', error: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
