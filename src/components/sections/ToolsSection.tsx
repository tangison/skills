'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { PencilSimple, ArrowsClockwise } from '@phosphor-icons/react';
import { Reveal } from '@/components/ui/ScrollReveal';
import { CopyBtn } from '@/components/ui/CopyBtn';
import { PROMPT_CONTEXTS, REWRITE_FUNCTIONS } from '@/lib/constants';

export function ToolsSection() {
  // Prompt Writer state
  const [promptContext, setPromptContext] = useState('Agent Builder');
  const [promptTone, setPromptTone] = useState('Professional');
  const [promptInput, setPromptInput] = useState('');
  const [promptGenerating, setPromptGenerating] = useState(false);
  const [promptResult, setPromptResult] = useState('');

  // Rewrite state
  const [rewriteInput, setRewriteInput] = useState('');
  const [rewriteFunctions, setRewriteFunctions] = useState(REWRITE_FUNCTIONS);
  const [rewriteGenerating, setRewriteGenerating] = useState(false);
  const [rewriteResult, setRewriteResult] = useState('');

  const handleGeneratePrompt = async () => {
    if (!promptInput.trim()) return;
    setPromptGenerating(true);
    try {
      const res = await fetch('/api/prompt-writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: promptContext, tone: promptTone, input: promptInput }),
      });
      const data = await res.json();
      setPromptResult(data.result || data.error || 'No result');
    } catch { setPromptResult('Network error. Please try again.'); }
    finally { setPromptGenerating(false); }
  };

  const handleRewrite = async () => {
    if (!rewriteInput.trim()) return;
    setRewriteGenerating(true);
    try {
      const enabledFns = rewriteFunctions.filter(f => f.enabled).map(f => f.id);
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: rewriteInput, functions: enabledFns }),
      });
      const data = await res.json();
      setRewriteResult(data.rewritten || data.error || 'No result');
    } catch { setRewriteResult('Network error. Please try again.'); }
    finally { setRewriteGenerating(false); }
  };

  return (
    <div>
      <Reveal>
        <h2 className="font-editorial-serif text-2xl tracking-[-0.02em]">Tools</h2>
        <p className="text-secondary text-xs mt-1 mb-6">Prompt engineering and content refinement</p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Prompt Writer */}
        <Reveal delay={60}>
          <div className="border border-[var(--border-subtle-value)] rounded-lg p-5 bg-[var(--surface-01)]">
            <div className="flex items-center gap-2 mb-3">
              <PencilSimple size={16} weight="bold" className="text-brand" />
              <h3 className="font-medium text-sm">Prompt Writer</h3>
            </div>

            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-0.5 block">Context</label>
                  <select
                    value={promptContext}
                    onChange={e => setPromptContext(e.target.value)}
                    className="w-full px-2 py-1 text-[11px] border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
                  >
                    {PROMPT_CONTEXTS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-0.5 block">Tone</label>
                  <select
                    value={promptTone}
                    onChange={e => setPromptTone(e.target.value)}
                    className="w-full px-2 py-1 text-[11px] border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
                  >
                    {['Professional', 'Technical', 'Concise', 'Detailed', 'Authoritative', 'Conversational', 'Academic', 'Minimal'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-0.5 block">Describe the AI you need</label>
                <textarea
                  value={promptInput}
                  onChange={e => setPromptInput(e.target.value)}
                  placeholder="An AI that reviews pull requests for security vulnerabilities..."
                  rows={2}
                  className="w-full px-3 py-1.5 text-xs border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)] resize-none"
                />
              </div>

              <button
                onClick={handleGeneratePrompt}
                disabled={promptGenerating || !promptInput.trim()}
                className="w-full flex items-center justify-center gap-1.5 bg-[var(--off-black)] text-white dark:bg-white dark:text-[var(--off-black)] px-3 py-1.5 rounded-md text-[11px] font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {promptGenerating ? <ArrowsClockwise size={11} className="animate-spin" /> : <PencilSimple size={11} weight="bold" />}
                {promptGenerating ? 'Writing...' : 'Write Prompt'}
              </button>

              {promptResult && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary">Result</span>
                    <CopyBtn text={promptResult} />
                  </div>
                  <pre className="bg-[var(--surface-02)] rounded-md p-3 text-[11px] font-mono overflow-x-auto max-h-56 overflow-y-auto leading-relaxed">
                    <code>{promptResult}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* Rewrite Engine */}
        <Reveal delay={120}>
          <div className="border border-[var(--border-subtle-value)] rounded-lg p-5 bg-[var(--surface-01)]">
            <div className="flex items-center gap-2 mb-3">
              <ArrowsClockwise size={16} weight="bold" className="text-brand" />
              <h3 className="font-medium text-sm">Rewrite Engine</h3>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1 block">Functions</label>
                <div className="flex flex-wrap gap-1">
                  {rewriteFunctions.map(fn => (
                    <button
                      key={fn.id}
                      onClick={() => setRewriteFunctions(prev => prev.map(f => f.id === fn.id ? { ...f, enabled: !f.enabled } : f))}
                      className={`px-2 py-0.5 text-[10px] font-medium rounded-md transition-all ${
                        fn.enabled
                          ? 'bg-[var(--surface-02)] text-primary'
                          : 'text-muted line-through'
                      }`}
                    >
                      {fn.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-0.5 block">Content to rewrite</label>
                <textarea
                  value={rewriteInput}
                  onChange={e => setRewriteInput(e.target.value)}
                  placeholder="Paste the content you want to improve..."
                  rows={2}
                  className="w-full px-3 py-1.5 text-xs border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)] resize-none"
                />
              </div>

              <button
                onClick={handleRewrite}
                disabled={rewriteGenerating || !rewriteInput.trim()}
                className="w-full flex items-center justify-center gap-1.5 bg-[var(--off-black)] text-white dark:bg-white dark:text-[var(--off-black)] px-3 py-1.5 rounded-md text-[11px] font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {rewriteGenerating ? <ArrowsClockwise size={11} className="animate-spin" /> : <ArrowsClockwise size={11} weight="bold" />}
                {rewriteGenerating ? 'Rewriting...' : 'Rewrite'}
              </button>

              {rewriteResult && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary">Result</span>
                    <CopyBtn text={rewriteResult} />
                  </div>
                  <div className="bg-[var(--surface-02)] rounded-md p-3 text-xs leading-relaxed max-h-56 overflow-y-auto">
                    <ReactMarkdown>{rewriteResult}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
