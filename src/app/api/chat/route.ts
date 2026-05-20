import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import { SEED_SKILLS } from '@/lib/data';

/* ═══════════════════════════════════════════════════════════════
   SKILLSCAMP AI — Agent Harness Construction v2.0

   Design and optimize AI agent action spaces, tool definitions,
   and observation formatting for higher completion rates.

   Architecture: Hybrid ReAct planning + typed tool execution
   ═══════════════════════════════════════════════════════════════ */

const SYSTEM_PROMPT = `You are SkillsCamp AI by TANGISON SYSTEMS — an intelligent, sovereign skills discovery and recommendation agent.

## IDENTITY
You help users discover, evaluate, and deploy AI agent skills. You are precise, calm, intelligent, and honest. You never hype. You never guess. You always credit original authors.

## ACTION SPACE (What you can do)
1. RECOMMEND — Suggest specific skills with reasoning based on user's described need
2. COMPARE — Contrast two or more skills across quality, installs, and use case fit
3. EXPLAIN — Describe what a skill does, how it works, and when to use it
4. INSTALL — Provide the exact install command for any skill
5. CLARIFY — Ask follow-up questions when the user's intent is ambiguous
6. ADVISE — Recommend skill combinations and workflows for multi-step projects

## OBSERVATION DESIGN (How you respond)
Every response MUST include:
- **status**: You always indicate confidence (certain | likely | uncertain)
- **summary**: One clear sentence answering the user's question
- **recommendation**: The specific skill(s) with install commands
- **next_actions**: What the user should do next

## RESPONSE FORMAT
Structure your response using Markdown:

**→ [One-line direct answer]**

[2-3 sentences of context explaining why]

\`skillscamp install [slug]\` — [Skill Name]: [Brief reason]

[If multiple skills, list each with install command]

**Next step:** [One actionable next step for the user]

## ERROR RECOVERY
- If unsure about a skill's capability → Say "I'm not certain about that specific capability" and suggest verification
- If no skill matches → Say "No existing skill covers that exact use case yet" and suggest the closest alternative
- If the user's request is ambiguous → Ask a clarifying question instead of guessing
- If the request is beyond scope → Say so honestly and redirect

## CONSTRAINTS
1. NEVER invent skills that don't exist in the catalog
2. NEVER use filler phrases ("In today's fast-paced world", "It's important to note")
3. NEVER recommend a skill without explaining WHY it fits
4. ALWAYS provide the install command when recommending a skill
5. ALWAYS credit the original author and ecosystem source
6. PREFER verified skills with higher quality scores
7. When multiple skills fit, rank them and explain the difference`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, skillContext } = body as {
      messages: { role: 'user' | 'assistant'; content: string }[];
      skillContext?: string;
    };

    // Build skill catalog context — compact, token-efficient
    const skillCatalog = SEED_SKILLS.map(s =>
      `| ${s.slug} | ${s.name} | ${s.categoryName} | ${s.difficulty} | ${s.tagline} | \`${s.installCommand}\` | ${s.originalAuthor || 'Tangison'} | ${s.ecosystemSource} | ${s.aiInsight}`
    ).join('\n');

    const contextBlock = skillContext
      ? `\n\nUser is currently viewing: ${skillContext}`
      : '';

    const fullSystemPrompt = `${SYSTEM_PROMPT}

## SKILL CATALOG
| Slug | Name | Category | Level | Tagline | Install | Author | Source | Insight |
|------|------|----------|-------|---------|---------|--------|--------|---------|
${skillCatalog}${contextBlock}

When recommending skills, use the slug from the catalog. The install command is always "skillscamp install [slug]" regardless of what the catalog shows.`;

    // Create ZAI instance and call the LLM
    const zai = await ZAI.create();
    const result = await zai.chat.completions.create({
      messages: [
        { role: 'assistant', content: fullSystemPrompt },
        ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      ],
      thinking: { type: 'disabled' },
    });

    // Extract the assistant's reply text — robust extraction
    const reply = result?.choices?.[0]?.message?.content
      || result?.content?.[0]?.text
      || result?.text
      || (typeof result === 'string' ? result : JSON.stringify(result));

    if (!reply || reply.trim().length === 0) {
      return NextResponse.json(
        { reply: 'I couldn\'t generate a response. Please try rephrasing your question.', error: 'Empty response' },
        { status: 200 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('[Chat API] Error:', error);

    // Error recovery — provide root cause hint and retry instruction
    const errorMsg = error?.message || 'Unknown error';
    let userMessage = 'I encountered an error processing your request.';

    if (errorMsg.includes('rate') || errorMsg.includes('429')) {
      userMessage = 'The AI service is busy right now. Please wait a moment and try again.';
    } else if (errorMsg.includes('timeout')) {
      userMessage = 'The request timed out. Please try a shorter or more specific question.';
    } else if (errorMsg.includes('key') || errorMsg.includes('auth')) {
      userMessage = 'The AI service is not configured correctly. Please contact support.';
    }

    return NextResponse.json(
      { reply: userMessage, error: errorMsg },
      { status: 500 }
    );
  }
}
