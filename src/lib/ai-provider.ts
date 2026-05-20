/**
 * AI Provider — Smart adapter that works in both sandbox and Vercel
 *
 * Sandbox (dev): Uses z-ai-web-dev-sdk with internal AI gateway
 * Vercel (prod): Uses OpenRouter API directly with OPENROUTER_API_KEY env var
 *
 * Auto-detects environment based on whether .z-ai-config exists.
 */

import ZAI from 'z-ai-web-dev-sdk';

// ── Types ──
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIResult {
  text: string;
  provider: 'z-ai-sdk' | 'openrouter';
}

// ── OpenRouter fallback (for Vercel deployment) ──
async function callOpenRouter(
  messages: ChatMessage[],
  maxTokens: number = 1000
): Promise<AIResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set. Required for Vercel deployment.');
  }

  // Convert 'assistant' role to 'system' for OpenRouter convention
  const formattedMessages = messages.map(m => ({
    role: m.role === 'assistant' ? 'system' : m.role,
    content: m.content,
  }));

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://skillscamp.tangison.com',
      'X-Title': 'SkillsCamp AI',
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || 'openrouter/free',
      max_tokens: maxTokens,
      messages: formattedMessages,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`OpenRouter error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content || '';

  return { text, provider: 'openrouter' };
}

// ── z-ai-web-dev-sdk (for sandbox / local dev) ──
async function callZaiSdk(
  messages: ChatMessage[]
): Promise<AIResult> {
  const zai = await ZAI.create();
  const result = await zai.chat.completions.create({
    messages: messages.map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    thinking: { type: 'disabled' },
  });

  const text = result?.choices?.[0]?.message?.content
    || result?.content?.[0]?.text
    || result?.text
    || (typeof result === 'string' ? result : JSON.stringify(result));

  return { text, provider: 'z-ai-sdk' };
}

// ── Smart provider detection ──
let useZaiSdk: boolean | null = null;

async function detectProvider(): Promise<boolean> {
  if (useZaiSdk !== null) return useZaiSdk;

  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const os = await import('os');

    const configPaths = [
      path.join(process.cwd(), '.z-ai-config'),
      path.join(os.homedir(), '.z-ai-config'),
      '/etc/.z-ai-config',
    ];

    for (const filePath of configPaths) {
      try {
        const configStr = await fs.readFile(filePath, 'utf-8');
        const config = JSON.parse(configStr);
        if (config.baseUrl && config.apiKey) {
          useZaiSdk = true;
          return true;
        }
      } catch {
        // Continue checking next path
      }
    }
  } catch {
    // fs not available (edge runtime) — fall through to OpenRouter
  }

  useZaiSdk = false;
  return false;
}

/**
 * Main AI chat function — auto-detects provider
 *
 * Usage:
 *   const { text } = await aiChat([
 *     { role: 'assistant', content: systemPrompt },
 *     { role: 'user', content: userMessage },
 *   ]);
 */
export async function aiChat(
  messages: ChatMessage[],
  maxTokens: number = 1000
): Promise<AIResult> {
  const hasSdk = await detectProvider();

  if (hasSdk) {
    try {
      return await callZaiSdk(messages);
    } catch (error) {
      console.warn('[AI Provider] z-ai-sdk failed, falling back to OpenRouter:', error);
      // Fall through to OpenRouter
    }
  }

  return await callOpenRouter(messages, maxTokens);
}

/**
 * Check which provider is active (for health checks / debug)
 */
export async function getActiveProvider(): Promise<'z-ai-sdk' | 'openrouter' | 'none'> {
  const hasSdk = await detectProvider();
  const hasOpenRouter = !!process.env.OPENROUTER_API_KEY;

  if (hasSdk) return 'z-ai-sdk';
  if (hasOpenRouter) return 'openrouter';
  return 'none';
}
