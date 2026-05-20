'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';
import { SEED_SKILLS } from '@/lib/data';
import { MastGlyph } from '@/components/brand/TangisonLogo';

import {
  MagnifyingGlass,
  FileText,
  PencilSimple,
  ChatCircle,
  Sun,
  Moon,
  Copy,
  Check,
  Printer,
  ArrowRight,
  ArrowsClockwise,
  X,
  Lightning,
  Code,
  PencilLine,
  Rocket,
  ShieldCheck,
  File,
  ChartBar,
  Briefcase,
  PaperPlane,
  CaretLeft,
} from '@phosphor-icons/react';

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */
type Section = 'skills' | 'documents' | 'tools';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */
const PASTEL_MAP: Record<string, string> = {
  TANGISON: 'pastel-yellow',
  VERCEL_LABS: 'pastel-blue',
  ANTHROPIC: 'pastel-green',
  OBRA: 'pastel-red',
  COMMUNITY: 'pastel-blue',
  POKAIS: 'pastel-green',
  IMPECCABLE: 'pastel-yellow',
};

const DIFFICULTY_PASTEL: Record<string, string> = {
  BEGINNER: 'pastel-green',
  INTERMEDIATE: 'pastel-yellow',
  ADVANCED: 'pastel-red',
};

const DOC_TYPES = [
  { value: 'proposal', label: 'Proposal', icon: Briefcase },
  { value: 'report', label: 'Report', icon: ChartBar },
  { value: 'brief', label: 'Brief', icon: FileText },
  { value: 'invoice', label: 'Invoice', icon: File },
  { value: 'memo', label: 'Memo', icon: PencilLine },
  { value: 'contract', label: 'Contract', icon: ShieldCheck },
  { value: 'pitch_deck', label: 'Pitch Deck', icon: Rocket },
  { value: 'sow', label: 'SOW', icon: FileText },
] as const;

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'technical', label: 'Technical' },
  { value: 'concise', label: 'Concise' },
  { value: 'authoritative', label: 'Authoritative' },
  { value: 'conversational', label: 'Conversational' },
] as const;

const PROMPT_CONTEXTS = [
  'Agent Builder', 'Chat', 'RAG', 'Workflow', 'Code Review',
  'Data Analysis', 'Creative Writing', 'Research', 'Customer Support', 'Education',
] as const;

const REWRITE_FUNCTIONS = [
  { id: 'clarity', label: 'Clarity', enabled: true },
  { id: 'remove-ai', label: 'Remove AI Copy', enabled: true },
  { id: 'structure', label: 'Structure', enabled: true },
  { id: 'format', label: 'Format', enabled: true },
  { id: 'standards', label: 'Standards', enabled: false },
  { id: 'simplify', label: 'Simplify', enabled: false },
];

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: 'skills', label: 'Skills' },
  { id: 'documents', label: 'Documents' },
  { id: 'tools', label: 'Tools' },
];

/* ═══════════════════════════════════════════════════════════════
   ANIMATION HOOK
   ═══════════════════════════════════════════════════════════════ */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════════════════════════ */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs text-secondary hover:text-primary transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={12} weight="bold" /> : <Copy size={12} weight="bold" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function Tag({ children, variant = 'pastel-blue' }: { children: React.ReactNode; variant?: string }) {
  return (
    <span
      className={`${variant} inline-flex items-center rounded-[6px] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.05em] leading-none`}
    >
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Page() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('skills');
  const [chatOpen, setChatOpen] = useState(false);

  // Skills state
  const [skillFilter, setSkillFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Document state
  const [docType, setDocType] = useState('proposal');
  const [docTitle, setDocTitle] = useState('');
  const [docClient, setDocClient] = useState('');
  const [docAuthor, setDocAuthor] = useState('');
  const [docTone, setDocTone] = useState('professional');
  const [docDescription, setDocDescription] = useState('');
  const [docGenerating, setDocGenerating] = useState(false);
  const [docResult, setDocResult] = useState('');
  const [docError, setDocError] = useState('');

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

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Filter skills
  const filteredSkills = SEED_SKILLS.filter(s => {
    const matchesCategory = skillFilter === 'all' || s.categoryName === skillFilter;
    const matchesSearch = searchQuery === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...Array.from(new Set(SEED_SKILLS.map(s => s.categoryName)))];

  /* ── API Handlers ── */

  const handleGenerateDoc = async () => {
    if (!docTitle.trim() || !docDescription.trim()) return;
    setDocGenerating(true);
    setDocError('');
    setDocResult('');
    try {
      const res = await fetch('/api/document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: docType,
          title: docTitle,
          client: docClient,
          author: docAuthor,
          tone: docTone,
          description: docDescription,
        }),
      });
      const data = await res.json();
      if (data.error) { setDocError(data.error); return; }
      setDocResult(data.document);
    } catch { setDocError('Network error. Please try again.'); }
    finally { setDocGenerating(false); }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !docResult) return;
    printWindow.document.write(`
      <!DOCTYPE html><html><head><title>${docTitle}</title>
      <style>
        body { font-family: Georgia, 'Times New Roman', serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #111; line-height: 1.7; }
        h1 { font-size: 28px; margin-bottom: 4px; letter-spacing: -0.02em; }
        h2 { font-size: 20px; margin-top: 32px; border-bottom: 1px solid #EAEAEA; padding-bottom: 8px; }
        h3 { font-size: 16px; margin-top: 24px; }
        table { border-collapse: collapse; width: 100%; margin: 16px 0; }
        th, td { border: 1px solid #EAEAEA; padding: 8px 12px; text-align: left; font-size: 14px; }
        th { background: #F7F6F3; font-weight: 600; }
        code { font-family: 'JetBrains Mono', monospace; font-size: 13px; background: #F7F6F3; padding: 2px 6px; border-radius: 4px; }
        pre { background: #F7F6F3; padding: 16px; border-radius: 8px; overflow-x: auto; }
        pre code { background: none; padding: 0; }
        hr { border: none; border-top: 1px solid #EAEAEA; margin: 32px 0; }
        ul, ol { padding-left: 24px; }
        li { margin-bottom: 4px; }
        blockquote { border-left: 3px solid #EAEAEA; margin-left: 0; padding-left: 16px; color: #787774; }
      </style></head><body>${docResult}</body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

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

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatMessages, { role: 'user', content: userMsg }] }),
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'No response.' }]);
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    }
    finally { setChatLoading(false); }
  };

  const currentSkill = selectedSkill ? SEED_SKILLS.find(s => s.slug === selectedSkill) : null;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">

      {/* ═══════════════ NAVIGATION ═══════════════ */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-[var(--border-subtle-value)]">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          {/* Left: Logo mark */}
          <button
            onClick={() => { setSelectedSkill(null); setActiveSection('skills'); }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <MastGlyph className="h-6 w-auto" />
          </button>

          {/* Center: Section tabs */}
          <div className="flex items-center gap-0.5">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setSelectedSkill(null); }}
                className={`px-3 py-1 text-[11px] font-medium uppercase tracking-[0.06em] rounded-md transition-all ${
                  activeSection === item.id
                    ? 'text-primary bg-[var(--surface-02)]'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className={`p-1.5 rounded-md transition-all ${chatOpen ? 'bg-[var(--surface-02)]' : 'hover:bg-[var(--surface-02)]'}`}
              aria-label="Toggle AI chat"
            >
              <ChatCircle size={16} weight="fill" className={chatOpen ? 'text-brand' : 'text-secondary'} />
            </button>
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-1.5 rounded-md hover:bg-[var(--surface-02)] transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={16} weight="bold" /> : <Moon size={16} weight="bold" />}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      {activeSection === 'skills' && !selectedSkill && (
        <section className="border-b border-[var(--border-subtle-value)]">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
            <Reveal>
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary mb-3">Intelligence Built On What Remains</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-editorial-serif text-4xl md:text-5xl tracking-[-0.03em] leading-[1.1] max-w-2xl">
                The open directory for AI agent skills
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-secondary text-sm md:text-base leading-relaxed max-w-lg">
                Browse, install, and deploy modular skills. Generate documents. Write prompts. Ship faster.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSection('documents')}
                  className="inline-flex items-center gap-2 bg-[var(--off-black)] text-white dark:bg-white dark:text-[var(--off-black)] px-4 py-2 rounded-md text-xs font-medium hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Document Engine <ArrowRight size={12} weight="bold" />
                </button>
                <button
                  onClick={() => setActiveSection('tools')}
                  className="inline-flex items-center gap-2 border border-[var(--border-subtle-value)] px-4 py-2 rounded-md text-xs font-medium hover:bg-[var(--surface-02)] active:scale-[0.98] transition-all"
                >
                  <PencilSimple size={12} weight="bold" /> Prompt Tools
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">

          {/* ─── SKILLS SECTION ─── */}
          {activeSection === 'skills' && (
            <div>
              {currentSkill ? (
                /* ── Skill Detail ── */
                <Reveal>
                  <div>
                    <button
                      onClick={() => setSelectedSkill(null)}
                      className="text-[11px] text-secondary hover:text-primary uppercase tracking-[0.04em] mb-5 inline-flex items-center gap-1"
                    >
                      <CaretLeft size={10} weight="bold" /> Back
                    </button>
                    <div className="border border-[var(--border-subtle-value)] rounded-lg p-6 md:p-8 bg-[var(--surface-01)]">
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        <Tag variant={DIFFICULTY_PASTEL[currentSkill.difficulty] || 'pastel-blue'}>
                          {currentSkill.difficulty}
                        </Tag>
                        <Tag variant={PASTEL_MAP[currentSkill.ecosystemSource] || 'pastel-blue'}>
                          {currentSkill.ecosystemSource}
                        </Tag>
                        {currentSkill.isTangisonOriginal && <Tag variant="pastel-yellow">Tangison Original</Tag>}
                      </div>
                      <h2 className="font-editorial-serif text-2xl tracking-[-0.02em]">{currentSkill.name}</h2>
                      <p className="mt-1.5 text-secondary text-sm leading-relaxed">{currentSkill.tagline}</p>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-secondary">
                        <span className="inline-flex items-center gap-1">
                          <Code size={12} weight="bold" />
                          <code className="font-mono text-[11px] bg-[var(--surface-02)] px-1.5 py-0.5 rounded">{currentSkill.installCommand}</code>
                        </span>
                        {currentSkill.originalAuthor && <span>by {currentSkill.originalAuthor}</span>}
                      </div>

                      <div className="mt-8 prose prose-sm max-w-none">
                        <ReactMarkdown>{currentSkill.content}</ReactMarkdown>
                      </div>

                      {currentSkill.aiInsight && (
                        <div className="mt-8 border-t border-[var(--border-subtle-value)] pt-5">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1.5">AI Insight</p>
                          <p className="text-sm leading-relaxed">{currentSkill.aiInsight}</p>
                        </div>
                      )}

                      {currentSkill.usageExamples && (
                        <div className="mt-5 border-t border-[var(--border-subtle-value)] pt-5">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary">Usage</p>
                            <CopyBtn text={currentSkill.usageExamples} />
                          </div>
                          <pre className="bg-[var(--surface-02)] rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                            <code>{currentSkill.usageExamples}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ) : (
                /* ── Skills Grid ── */
                <div>
                  <Reveal>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                      <div className="relative flex-1 max-w-xs">
                        <MagnifyingGlass size={13} weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                        <input
                          type="text"
                          placeholder="Search skills..."
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 text-xs border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
                        />
                      </div>
                      <p className="text-[11px] text-secondary">{SEED_SKILLS.length} skills</p>
                    </div>
                  </Reveal>

                  {/* Category Filter */}
                  <Reveal delay={60}>
                    <div className="flex gap-1 overflow-x-auto pb-3 mb-5 no-scrollbar">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSkillFilter(cat)}
                          className={`whitespace-nowrap px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                            skillFilter === cat
                              ? 'bg-[var(--off-black)] text-white dark:bg-white dark:text-[var(--off-black)]'
                              : 'bg-[var(--surface-02)] text-secondary hover:text-primary'
                          }`}
                        >
                          {cat === 'all' ? 'All' : cat}
                        </button>
                      ))}
                    </div>
                  </Reveal>

                  {/* Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredSkills.map((skill, i) => (
                      <Reveal key={skill.id} delay={Math.min(i * 50, 300)}>
                        <button
                          onClick={() => setSelectedSkill(skill.slug)}
                          className="w-full text-left border border-[var(--border-subtle-value)] rounded-lg p-4 bg-[var(--surface-01)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all group"
                        >
                          <div className="flex flex-wrap gap-1 mb-2">
                            <Tag variant={DIFFICULTY_PASTEL[skill.difficulty] || 'pastel-blue'}>{skill.difficulty}</Tag>
                            <Tag variant={PASTEL_MAP[skill.ecosystemSource] || 'pastel-blue'}>{skill.ecosystemSource}</Tag>
                          </div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm group-hover:text-brand transition-colors">{skill.name}</h3>
                              <p className="text-secondary text-xs mt-0.5 line-clamp-2 leading-relaxed">{skill.tagline}</p>
                            </div>
                            <ArrowRight size={12} className="text-muted mt-1 shrink-0 group-hover:text-brand transition-colors" />
                          </div>
                          <div className="mt-2.5 pt-2.5 border-t border-[var(--border-subtle-value)] flex items-center gap-2 text-[10px] text-secondary">
                            {skill.categoryName && <span>{skill.categoryName}</span>}
                            {skill.originalAuthor && <span>by {skill.originalAuthor}</span>}
                          </div>
                        </button>
                      </Reveal>
                    ))}
                  </div>

                  {filteredSkills.length === 0 && (
                    <div className="text-center py-16">
                      <p className="text-secondary text-sm">No skills found.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ─── DOCUMENTS SECTION ─── */}
          {activeSection === 'documents' && (
            <div>
              <Reveal>
                <h2 className="font-editorial-serif text-2xl tracking-[-0.02em]">Document Engine</h2>
                <p className="text-secondary text-xs mt-1 mb-6">AI writes the content. You print or download it.</p>
              </Reveal>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {/* Form */}
                <div className="lg:col-span-2">
                  <Reveal delay={60}>
                    <div className="border border-[var(--border-subtle-value)] rounded-lg p-5 bg-[var(--surface-01)] space-y-3.5">
                      {/* Document Type */}
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1.5 block">Type</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {DOC_TYPES.map(dt => (
                            <button
                              key={dt.value}
                              onClick={() => setDocType(dt.value)}
                              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded-md border transition-all ${
                                docType === dt.value
                                  ? 'border-[var(--off-black)] bg-[var(--off-black)] text-white dark:border-white dark:bg-white dark:text-[var(--off-black)]'
                                  : 'border-[var(--border-subtle-value)] hover:border-[var(--off-black)]'
                              }`}
                            >
                              <dt.icon size={12} weight="bold" />
                              {dt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Title */}
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1 block">Title</label>
                        <input
                          type="text"
                          value={docTitle}
                          onChange={e => setDocTitle(e.target.value)}
                          placeholder="Q4 Performance Review"
                          className="w-full px-3 py-1.5 text-xs border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
                        />
                      </div>

                      {/* Client & Author */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1 block">Client</label>
                          <input
                            type="text"
                            value={docClient}
                            onChange={e => setDocClient(e.target.value)}
                            placeholder="Acme Corp"
                            className="w-full px-3 py-1.5 text-xs border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1 block">Author</label>
                          <input
                            type="text"
                            value={docAuthor}
                            onChange={e => setDocAuthor(e.target.value)}
                            placeholder="Tangison Agency"
                            className="w-full px-3 py-1.5 text-xs border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
                          />
                        </div>
                      </div>

                      {/* Tone */}
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1.5 block">Tone</label>
                        <div className="flex flex-wrap gap-1">
                          {TONES.map(t => (
                            <button
                              key={t.value}
                              onClick={() => setDocTone(t.value)}
                              className={`px-2 py-0.5 text-[10px] font-medium rounded-md transition-all ${
                                docTone === t.value
                                  ? 'bg-[var(--surface-02)] text-primary'
                                  : 'text-secondary hover:text-primary'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1 block">Brief</label>
                        <textarea
                          value={docDescription}
                          onChange={e => setDocDescription(e.target.value)}
                          placeholder="Describe the document purpose and requirements..."
                          rows={3}
                          className="w-full px-3 py-1.5 text-xs border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)] resize-none"
                        />
                      </div>

                      {/* Generate */}
                      <button
                        onClick={handleGenerateDoc}
                        disabled={docGenerating || !docTitle.trim() || !docDescription.trim()}
                        className="w-full flex items-center justify-center gap-2 bg-[var(--off-black)] text-white dark:bg-white dark:text-[var(--off-black)] px-4 py-2 rounded-md text-xs font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {docGenerating ? (
                          <><ArrowsClockwise size={12} className="animate-spin" /> Generating...</>
                        ) : (
                          <><Lightning size={12} weight="fill" /> Generate</>
                        )}
                      </button>

                      {docError && <p className="text-[11px] text-red-500">{docError}</p>}
                    </div>
                  </Reveal>
                </div>

                {/* Preview */}
                <div className="lg:col-span-3">
                  <Reveal delay={120}>
                    {docResult ? (
                      <div className="border border-[var(--border-subtle-value)] rounded-lg bg-[var(--surface-01)]">
                        <div className="flex items-center justify-between px-5 py-2.5 border-b border-[var(--border-subtle-value)]">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary">Preview</span>
                          <div className="flex items-center gap-3">
                            <CopyBtn text={docResult} />
                            <button
                              onClick={handlePrint}
                              className="inline-flex items-center gap-1 text-[11px] font-medium hover:text-primary transition-colors"
                            >
                              <Printer size={11} weight="bold" /> Print
                            </button>
                          </div>
                        </div>
                        <div className="p-5 max-h-[70vh] overflow-y-auto">
                          <div className="prose prose-sm max-w-none">
                            <ReactMarkdown>{docResult}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-[var(--border-subtle-value)] rounded-lg bg-[var(--surface-01)] h-full min-h-[360px] flex items-center justify-center">
                        <div className="text-center">
                          <FileText size={28} weight="thin" className="mx-auto text-muted mb-2" />
                          <p className="text-secondary text-xs">Fill in the form and generate</p>
                          <p className="text-muted text-[10px] mt-0.5">Document will appear here</p>
                        </div>
                      </div>
                    )}
                  </Reveal>
                </div>
              </div>
            </div>
          )}

          {/* ─── TOOLS SECTION ─── */}
          {activeSection === 'tools' && (
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
          )}
        </div>
      </main>

      {/* ═══════════════ CHAT PANEL ═══════════════ */}
      {chatOpen && (
        <div className="fixed right-4 bottom-4 w-[340px] max-w-[calc(100vw-2rem)] z-50 border border-[var(--border-subtle-value)] rounded-lg bg-[var(--surface-01)] shadow-[0_4px_24px_rgba(0,0,0,0.08)] flex flex-col max-h-[460px]">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-subtle-value)]">
            <div className="flex items-center gap-1.5">
              <ChatCircle size={12} weight="fill" className="text-brand" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.06em]">SkillsCamp AI</span>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-secondary hover:text-primary transition-colors">
              <X size={12} weight="bold" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[180px]">
            {chatMessages.length === 0 && (
              <p className="text-secondary text-[11px] text-center py-6">Ask about skills, workflows, or recommendations.</p>
            )}
            {chatMessages.map((msg, i) => (
              <div key={i} className={`${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-[85%] rounded-md px-2.5 py-1.5 text-[11px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[var(--off-black)] text-white dark:bg-white dark:text-[var(--off-black)]'
                    : 'bg-[var(--surface-02)]'
                }`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="text-left">
                <div className="inline-block bg-[var(--surface-02)] rounded-md px-2.5 py-1.5 text-[11px] text-secondary">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-[var(--border-subtle-value)] p-2.5">
            <form
              onSubmit={e => { e.preventDefault(); handleChat(); }}
              className="flex gap-1.5"
            >
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask about skills..."
                className="flex-1 px-2.5 py-1.5 text-[11px] border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
              />
              <button
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="p-1.5 bg-[var(--off-black)] text-white dark:bg-white dark:text-[var(--off-black)] rounded-md hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40"
              >
                <PaperPlane size={11} weight="bold" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-[var(--border-subtle-value)] mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MastGlyph className="h-4 w-auto opacity-40" />
            <span className="text-[10px] text-secondary">Tangison Agency</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-muted">
            <a href="https://skills.sh" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">skills.sh</a>
            <a href="https://github.com/tangison/skills" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
