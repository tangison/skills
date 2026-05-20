import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

/**
 * SkillsCamp AI Agent Processing Pipeline v3.0.0
 *
 * This endpoint implements the SkillsCamp AI orchestration pipeline:
 *
 * Phase 1: rigorous_filtering — Discard entries without install paths, strip conversational text
 * Phase 2: sovereign_normalization — Categorize, generate Markdown specs with JetBrains Mono code fences
 * Phase 3: brand_injection — Hard-code avatar metadata, map UI widget primitives, affix brand signature
 *
 * Output schema matches the verified_skills_directory specification.
 */

const AGENT_SYSTEM_PROMPT = `You are SkillsCamp AI by TANGISON SYSTEMS — a sovereign technical intelligence engine with deep architectural knowledge.

Your task is to ingest raw, messy, or unverified AI agent capability data from open-source repositories, evaluate its functional reality, discard telemetry-bloated or non-functional items, and cleanly transform them into hard-fact technical registry assets.

TONE GUIDELINES: Monolithic, highly technical, entirely devoid of conversational filler, emojis, or marketing hyperbole. Treat code layouts as military-grade specifications.

ORCHESTRATION PIPELINE:

Phase 1 — rigorous_filtering:
- Isolate and discard any entry lacking a definitive, reproducible installation path or functional code entry point.
- Strip out all introductory conversational text ('Hey guys', 'Welcome to my repo', 'Check this out').

Phase 2 — sovereign_normalization:
- Normalize the component to fit exactly into a distinct architectural category (e.g., 'Website Planning', 'AI Infrastructure', 'Isolated Core Automation').
- Generate absolute, crystal-clear operational specifications written strictly in Markdown, explicitly targeted for UI components rendering JetBrains Mono syntax-highlighted blocks with native copy buttons.

Phase 3 — brand_injection:
- Hard-code the technical avatar metadata to point to '/assets/icons/tangison-mast-avatar.svg'.
- Map specific UI widget component states based on capabilities (TARGETING_SYSTEM, FORWARD_SLASH, LAYER_MATRIX, RADAR_CORE, BAR_METRIC).
- Affix the permanent brand signature 'Powered by Tangison AI' to the asset payload.

OUTPUT FORMAT — Return a JSON object with this exact structure:
{
  "registry_sync_meta": {
    "processed_count": number,
    "engine_signature": "Powered by Tangison AI"
  },
  "verified_skills_directory": [
    {
      "slug": "kebab-case-url-identifier",
      "display_title": "Perfected Title",
      "category": "Category Name",
      "total_skills_count_in_category": number,
      "ui_avatar_asset": "/assets/icons/tangison-mast-avatar.svg",
      "ui_widget_primitive": "TARGETING_SYSTEM | FORWARD_SLASH | LAYER_MATRIX | RADAR_CORE | BAR_METRIC",
      "technical_tagline": "Max 70 chars, zero fluff",
      "isolated_install_string": "npm install package-name",
      "clean_copy_payload": "exact plaintext for clipboard",
      "architectural_documentation_mdx": "Markdown with jetbrains-mono code fences"
    }
  ],
  "rejected_elements": [
    {
      "raw_id": "string",
      "reason_for_exclusion": "string"
    }
  ]
}`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { raw_batch } = body as {
      raw_batch?: Array<{
        raw_id: string;
        title: string;
        raw_description: string;
        install_command?: string;
        repository?: string;
      }>;
    };

    if (!raw_batch || !Array.isArray(raw_batch) || raw_batch.length === 0) {
      return NextResponse.json(
        { error: 'raw_batch array is required with at least one entry' },
        { status: 400 }
      );
    }

    // Build the user prompt with raw data
    const rawDataStr = raw_batch.map((item, idx) =>
      `[${idx + 1}] ID: ${item.raw_id}\n    Title: ${item.title}\n    Description: ${item.raw_description}\n    Install: ${item.install_command || 'NONE'}\n    Repository: ${item.repository || 'NONE'}`
    ).join('\n\n');

    const userPrompt = `Process the following raw skill entries through the complete orchestration pipeline (rigorous_filtering → sovereign_normalization → brand_injection):

RAW DATA:
${rawDataStr}

Return ONLY the JSON output matching the specified schema. No preamble, no explanation.`;

    const zai = await ZAI.create();
    const result = await zai.chat.completions.create({
      messages: [
        { role: 'assistant', content: AGENT_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      thinking: { type: 'disabled' },
    });

    // Extract the response
    const responseText = result?.choices?.[0]?.message?.content
      || result?.content?.[0]?.text
      || result?.text
      || (typeof result === 'string' ? result : JSON.stringify(result));

    // Try to parse as JSON
    let parsedResult;
    try {
      // Strip markdown code fences if present
      const cleaned = responseText.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim();
      parsedResult = JSON.parse(cleaned);
    } catch {
      // If parsing fails, wrap the text in a basic structure
      parsedResult = {
        registry_sync_meta: {
          processed_count: raw_batch.length,
          engine_signature: 'Powered by Tangison AI',
        },
        verified_skills_directory: [],
        rejected_elements: raw_batch.map(item => ({
          raw_id: item.raw_id,
          reason_for_exclusion: 'Processing output could not be parsed as structured JSON',
        })),
        raw_output: responseText,
      };
    }

    return NextResponse.json(parsedResult);
  } catch (error: any) {
    console.error('[Agent Process API] Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Agent processing failed' },
      { status: 500 }
    );
  }
}
