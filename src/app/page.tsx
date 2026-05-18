'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search, Menu, Copy, Check, ArrowRight, ExternalLink, ChevronRight,
  Zap, Terminal, BookOpen, LayoutGrid,
  Code, Palette, PenLine, FileText, Image, Layout, Share2, Cpu,
  Cloud, Compass, Server, Rocket, Box, FileType, MessageSquare,
  Send, X, Shield, Sparkles, Sun, Moon
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { SEED_SKILLS, SKILL_CATEGORIES, SUPPORTED_ECOSYSTEMS } from '@/lib/data';
import { AGENT_CONFIG } from '@/lib/agent-config';
import type { Skill, PageRoute, ChatMessage } from '@/lib/types';

/* ═══════════════════════════════════════════════════════════════
   TANGISON LOGO - Brand Asset
   ═══════════════════════════════════════════════════════════════ */
function TangisonLogo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="Tangison logo — shipwreck mast glyph representing resilience, direction, structure"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION TAG
   ═══════════════════════════════════════════════════════════════ */
function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-[0.7rem] font-mono uppercase tracking-[0.2em] text-foreground">
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COPY BUTTON
   ═══════════════════════════════════════════════════════════════ */
function CopyButton({ text, variant = 'default', label }: { text: string; variant?: 'default' | 'rust'; label?: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      timerRef.current = setTimeout(() => setCopied(false), 1500);
    } catch { /* fallback */ }
  }, [text]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  if (variant === 'rust') {
    return (
      <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-[2px] bg-primary text-primary-foreground font-mono text-xs uppercase font-bold hover:bg-foreground transition-colors">
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? 'Copied!' : (label || 'Copy Skill')}
      </button>
    );
  }

  return (
    <button onClick={handleCopy} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] text-xs font-mono bg-muted hover:bg-muted/80 text-foreground border border-border hover:border-foreground/20 transition-colors">
      {copied ? <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   THEME TOGGLE
   ═══════════════════════════════════════════════════════════════ */
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-[2px] text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="w-4 h-4 block dark:hidden" />
      <Moon className="w-4 h-4 hidden dark:block" />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */
const ICON_MAP: Record<string, React.ElementType> = {
  LayoutGrid, Code, Palette, PenLine, FileText, Terminal, Image, Layout, Share2,
  BookOpen, Cpu, Search, Cloud, Compass, Server, Rocket, Box, FileType,
};

function CategoryIcon({ name, className = 'w-4 h-4' }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] || LayoutGrid;
  return <Icon className={className} />;
}

const ECOSYSTEM_LABELS: Record<string, string> = {
  TANGISON: 'Tangison', VERCEL_LABS: 'Vercel Labs', ANTHROPIC: 'Anthropic',
  POKAIS: 'Pokais', IMPECCABLE: 'Impeccable', OBRA: 'Obra', COMMUNITY: 'Community',
};

const ECOSYSTEM_COLORS: Record<string, string> = {
  TANGISON: 'bg-primary/15 text-primary border-primary/25',
  VERCEL_LABS: 'bg-foreground/5 text-foreground/70 border-foreground/10',
  ANTHROPIC: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  POKAIS: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  IMPECCABLE: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  OBRA: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
  COMMUNITY: 'bg-foreground/5 text-foreground/50 border-foreground/10',
};

function ecosystemBadge(source: string) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${ECOSYSTEM_COLORS[source] || ECOSYSTEM_COLORS.COMMUNITY}`}>
      {ECOSYSTEM_LABELS[source] || source}
    </span>
  );
}

const DIFFICULTY_COLORS: Record<string, string> = {
  BEGINNER: 'bg-emerald-600 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-600/20 dark:border-emerald-500/20',
  INTERMEDIATE: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  ADVANCED: 'bg-primary/10 text-primary border-primary/20',
};

/* ═══════════════════════════════════════════════════════════════
   TERMINAL ANIMATION
   ═══════════════════════════════════════════════════════════════ */
function TerminalAnimation() {
  const [displayedText, setDisplayedText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const fullCommand = 'npx skills find --domain="african-enterprise"';
  const resultLines = [
    { text: '[SYSTEM] Establishing sovereign connection...', color: 'text-muted-foreground/70' },
    { text: 'Scanning Vercel Labs registry... 200 OK', color: 'text-emerald-600/80 dark:text-emerald-500/80' },
    { text: 'Scanning Anthropic primitives... 200 OK', color: 'text-emerald-600/80 dark:text-emerald-500/80' },
    { text: '', color: '' },
    { text: '4 optimized intelligence modules located.', color: 'text-foreground' },
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullCommand.length) {
        setDisplayedText(fullCommand.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowResults(true), 400);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card rounded-[4px] border border-border overflow-hidden shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
        <span className="ml-3 text-[10px] font-mono text-muted-foreground/60">skills-sh — find</span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[200px]">
        <div className="flex items-center gap-2 text-foreground">
          <span className="text-primary font-bold">❯</span>
          <span>{displayedText}</span>
          {!showResults && <span className="w-2 h-4 bg-emerald-600 dark:bg-emerald-500 animate-pulse" />}
        </div>
        {showResults && (
          <div className="mt-3 space-y-1.5">
            {resultLines.map((line, idx) => (
              <div key={idx} className={`pl-5 ${line.color || ''}`}>
                {line.text || '\u00A0'}
              </div>
            ))}
            <div className="flex items-center gap-2 pt-2 text-foreground">
              <span className="text-primary font-bold">❯</span>
              <span className="w-2 h-4 bg-emerald-600 dark:bg-emerald-500 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SKILL CARD
   ═══════════════════════════════════════════════════════════════ */
function SkillCard({ skill, onClick }: { skill: Skill; onClick: () => void }) {
  const cat = SKILL_CATEGORIES.find((c) => c.id === skill.categoryId);
  return (
    <button onClick={onClick} className="group w-full text-left bg-card border border-border rounded-[2px] p-5 hover:border-l-primary hover:border-l-2 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {cat && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] text-[10px] font-mono bg-primary/10 text-primary border border-primary/20">
              {cat.name}
            </span>
          )}
          {ecosystemBadge(skill.ecosystemSource)}
        </div>
      </div>
      <h3 className="text-foreground font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{skill.name}</h3>
      <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">{skill.tagline}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {skill.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted/30 text-muted-foreground/70">{tag}</span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono border ${DIFFICULTY_COLORS[skill.difficulty] || ''}`}>
          {skill.difficulty}
        </span>
        <CopyButton text={skill.installCommand} />
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: `I am ${AGENT_CONFIG.agent.name}. ${AGENT_CONFIG.agent.purpose}` },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [detailTab, setDetailTab] = useState<'original' | 'enhanced'>('enhanced');
  const [dirSearch, setDirSearch] = useState('');
  const [dirCategories, setDirCategories] = useState<string[]>([]);
  const [dirEcosystems, setDirEcosystems] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key === 'Escape') { setSearchOpen(false); }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

  const navigate = useCallback((page: PageRoute, skillId?: string) => {
    setCurrentPage(page);
    if (skillId) setSelectedSkillId(skillId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setDrawerOpen(false);
  }, []);

  const selectedSkill = SEED_SKILLS.find((s) => s.id === selectedSkillId) || null;
  const alphabeticalSkills = [...SEED_SKILLS].sort((a, b) => a.name.localeCompare(b.name));
  const featuredSkills = SEED_SKILLS.filter((s) => s.isTangisonOriginal || s.ecosystemSource === 'TANGISON');

  const handleChatSend = useCallback(async () => {
    if (!chatInput.trim() || isAiTyping) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setChatInput('');
    setIsAiTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, { role: 'user' as const, content: userMsg }],
          skillContext: selectedSkill ? selectedSkill.name : undefined,
        }),
      });
      const data = await res.json();
      setChatMessages((prev) => [...prev, { role: 'assistant', content: data.reply || 'I could not process that request. Please try again.' }]);
    } catch {
      // Fallback to simulated response
      const lowerInput = userMsg.toLowerCase();
      let matchedSkill: Skill | null = null;
      if (lowerInput.includes('seo') || lowerInput.includes('audit')) matchedSkill = SEED_SKILLS.find(s => s.slug === 'find-skills') || null;
      else if (lowerInput.includes('website') || lowerInput.includes('web')) matchedSkill = SEED_SKILLS.find(s => s.slug === 'web-agency-complete') || null;
      else if (lowerInput.includes('research')) matchedSkill = SEED_SKILLS.find(s => s.slug === 'deep-research') || null;
      else if (lowerInput.includes('frontend') || lowerInput.includes('design')) matchedSkill = SEED_SKILLS.find(s => s.slug === 'frontend-design') || null;
      else if (lowerInput.includes('doc') || lowerInput.includes('pdf')) matchedSkill = SEED_SKILLS.find(s => s.slug === 'docx') || null;
      else if (lowerInput.includes('image') || lowerInput.includes('brand')) matchedSkill = SEED_SKILLS.find(s => s.slug === 'brandkit-image-generation') || null;
      else if (lowerInput.includes('copy') || lowerInput.includes('writing')) matchedSkill = SEED_SKILLS.find(s => s.slug === 'human-copywriting') || null;
      else matchedSkill = SEED_SKILLS[Math.floor(Math.random() * SEED_SKILLS.length)];

      const fallbackReply = matchedSkill
        ? `For that use case, I recommend **${matchedSkill.name}** — ${matchedSkill.tagline}\n\nCommand: \`${matchedSkill.installCommand}\`\n\n${matchedSkill.aiInsight || ''}`
        : 'No exact match found. Try `find-skills` for a deeper search.';
      setChatMessages((prev) => [...prev, { role: 'assistant', content: fallbackReply }]);
    } finally {
      setIsAiTyping(false);
    }
  }, [chatInput, isAiTyping, chatMessages, selectedSkill]);

  const filteredSkills = SEED_SKILLS.filter((s) => {
    if (dirSearch && !s.name.toLowerCase().includes(dirSearch.toLowerCase()) && !s.tagline.toLowerCase().includes(dirSearch.toLowerCase())) return false;
    if (dirCategories.length && !dirCategories.includes(s.categoryId)) return false;
    if (dirEcosystems.length && !dirEcosystems.includes(s.ecosystemSource)) return false;
    return true;
  });

  const searchResults = SEED_SKILLS.filter((s) =>
    searchQuery.length > 0 && (s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) || s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const headerSolid = currentPage !== 'home' || scrollY > 80;

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased">
      {/* Subtle grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:24px_24px] text-foreground" />

      {/* ═══ HEADER ═══ */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${headerSolid ? 'bg-card/95 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => navigate('home')} className="flex items-center gap-3 focus:outline-none" aria-label="Home">
              <TangisonLogo className="h-8 w-auto" />
              <div className="hidden sm:flex flex-col">
                <span className="font-display text-sm font-bold tracking-[0.15em] text-foreground uppercase block leading-none">TANGISON</span>
                <span className="text-[8px] font-mono tracking-widest uppercase text-primary block mt-0.5">SKILLSMITH</span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {(['skills', 'categories', 'trending', 'about'] as PageRoute[]).map((page) => (
                <button key={page} onClick={() => navigate(page)} className={`hover:text-foreground transition-colors ${currentPage === page ? 'text-primary font-bold' : ''}`}>{page}</button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-[2px] text-sm text-muted-foreground/75 border border-border hover:border-foreground/20 hover:text-foreground transition-colors">
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-xs font-mono">⌘K</span>
              </button>
              <ThemeToggle />
              <button className="hidden md:block font-mono text-[10px] border border-foreground/20 px-4 py-2 hover:bg-foreground hover:text-background uppercase transition-colors">Sign In</button>

              <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                <SheetTrigger asChild>
                  <button className="md:hidden p-2 text-muted-foreground hover:text-foreground"><Menu className="w-5 h-5" /></button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-card border-l border-border w-72">
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <div className="flex flex-col gap-1 mt-8">
                    {(['home', 'skills', 'categories', 'trending', 'about'] as PageRoute[]).map((page) => (
                      <button key={page} onClick={() => navigate(page)} className={`flex items-center gap-3 px-4 py-3 rounded-[2px] text-sm font-medium transition-colors ${currentPage === page ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                        <ChevronRight className="w-4 h-4" />{page.charAt(0).toUpperCase() + page.slice(1)}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ MAIN ═══ */}
      <main className="flex-1 relative z-10">

        {/* ─── HOME ─── */}
        {currentPage === 'home' && (
          <div>
            {/* HERO */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/ocean-view.jpeg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 pointer-events-none" />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  <div className="lg:col-span-7">
                    <SectionTag>TANGISON SKILLSMITH // V1.8.0</SectionTag>
                    <h1 className="mt-6 text-[clamp(3rem,6vw,5.5rem)] font-display leading-[1.05] tracking-tight text-foreground">
                      Intelligence <br />built on what <span className="italic font-normal text-primary">remains.</span>
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl font-sans">
                      Sovereign intelligence infrastructure for African enterprise. Discover, copy, and deploy modular AI agent skills — no installation required.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest font-bold">
                      <button onClick={() => navigate('skills')} className="bg-primary text-primary-foreground px-8 py-4 hover:bg-foreground transition-colors rounded-[2px]">Explore Skills</button>
                      <button onClick={() => navigate('categories')} className="bg-transparent border border-foreground/20 text-foreground px-8 py-4 hover:border-primary hover:bg-card transition-colors rounded-[2px]">Browse Ecosystems</button>
                    </div>
                    <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground/60 font-mono">
                      <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" />{SKILL_CATEGORIES.length} categories</span>
                    </div>
                  </div>
                  <div className="lg:col-span-5 hidden lg:block">
                    <TerminalAnimation />
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURED SKILLS */}
            <section className="py-20 border-t border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <SectionTag>CURATED SELECTION</SectionTag>
                    <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-display text-foreground">Featured Skills</h2>
                  </div>
                  <button onClick={() => navigate('skills')} className="text-xs font-mono uppercase text-primary hover:text-foreground">View All →</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                  {featuredSkills.map((skill) => (
                    <div key={skill.id} className="min-w-[300px] max-w-[320px]">
                      <SkillCard skill={skill} onClick={() => navigate('skill_detail', skill.id)} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CATEGORIES */}
            <section className="py-20 bg-card/50 border-t border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                  <SectionTag>SYSTEM CLASSIFICATION</SectionTag>
                  <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-display text-foreground">Explore Domains</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {SKILL_CATEGORIES.map((cat) => (
                    <button key={cat.id} onClick={() => { setDirCategories([cat.id]); navigate('skills'); }} className="group p-5 bg-card border border-border hover:border-l-primary hover:border-l-2 hover:bg-muted transition-all text-left rounded-[2px]">
                      <div className="w-8 h-8 rounded-[2px] bg-accent/50 flex items-center justify-center mb-3">
                        <CategoryIcon name={cat.icon} className="w-4 h-4 text-primary" />
                      </div>
                      <span className="block text-sm font-sans font-medium text-foreground mb-1">{cat.name}</span>
                      <span className="block text-[10px] font-mono text-muted-foreground/60">{cat.skillCount} Skills</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* ECOSYSTEM SOURCES */}
            <section className="py-16 border-t border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-8">Built honestly on the open ecosystem</p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-60">
                  {SUPPORTED_ECOSYSTEMS.map((eco) => (
                    <a key={eco.name} href={eco.url} target="_blank" rel="noopener noreferrer" className="text-sm font-display font-bold tracking-wider text-foreground hover:text-primary transition-colors uppercase">{eco.name}</a>
                  ))}
                </div>
              </div>
            </section>

            {/* FEATURED SYSTEMS */}
            <section className="py-20 bg-card/50 border-t border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                  <SectionTag>FLAGSHIP SYSTEMS</SectionTag>
                  <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-display text-foreground">Featured Systems</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: 'Website Delivery OS', desc: 'From client brief to deployed website — plan, design, build, and launch. Chains Web Agency Complete, Frontend Design, and Human Copywriting into a single sovereign workflow.', slugs: ['web-agency-complete', 'frontend-design', 'human-copywriting'], icon: LayoutGrid },
                    { title: 'Document Creation System', desc: 'Generate branded documents — DOCX reports, PDF invoices, PPTX pitch decks — with template systems and brand consistency. Every document on-brand and export-ready.', slugs: ['docx', 'pdf', 'pptx'], icon: FileText },
                  ].map((system) => (
                    <div key={system.title} className="bg-card border border-border rounded-[2px] p-6 hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-[2px] bg-accent flex items-center justify-center">
                          <system.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-foreground font-semibold">{system.title}</h3>
                          <p className="text-[11px] font-mono text-muted-foreground/70">{system.slugs.length} skills in system</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{system.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {system.slugs.map((slug) => {
                          const s = SEED_SKILLS.find((sk) => sk.slug === slug);
                          return s ? (
                            <button key={s.id} onClick={() => navigate('skill_detail', s.id)} className="text-[10px] font-mono px-2 py-1 rounded-[2px] bg-muted text-foreground/60 hover:text-primary transition-colors">{s.name}</button>
                          ) : null;
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* AI CTA */}
            <section className="py-20 bg-accent">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="space-y-4 max-w-xl">
                  <SectionTag>EMBEDDED INTELLIGENCE</SectionTag>
                  <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-display text-foreground">Ask the Skillsmith.</h2>
                  <p className="text-sm text-foreground/70 leading-relaxed font-sans">Describe what you want to build. The AI finds, recommends, and installs the right skills.</p>
                </div>
                <button onClick={() => setChatOpen(true)} className="shrink-0 bg-foreground text-background font-mono text-xs uppercase font-bold px-8 py-5 hover:bg-primary hover:text-primary-foreground transition-colors rounded-[2px]">Initialize AI Agent</button>
              </div>
            </section>
          </div>
        )}

        {/* ─── SKILLS DIRECTORY ─── */}
        {currentPage === 'skills' && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <SectionTag>VERIFIED CAPABILITIES</SectionTag>
                <h1 className="mt-3 text-3xl font-display text-foreground">Skills Directory</h1>
              </div>
              <div className="flex flex-col lg:flex-row gap-8">
                <aside className="w-full lg:w-64 shrink-0">
                  <div className="bg-card border border-border rounded-[2px] p-4 space-y-6 sticky top-24">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-2 block">Search</label>
                      <input type="text" value={dirSearch} onChange={(e) => setDirSearch(e.target.value)} placeholder="Filter skills..." className="w-full px-3 py-2 rounded-[2px] bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 font-mono" />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-2 block">Category</label>
                      <div className="space-y-1 max-h-64 overflow-y-auto">
                        {SKILL_CATEGORIES.map((cat) => (
                          <label key={cat.id} className="flex items-center gap-2 px-2 py-1.5 rounded-[2px] text-xs text-foreground/60 hover:bg-muted cursor-pointer transition-colors">
                            <input type="checkbox" checked={dirCategories.includes(cat.id)} onChange={(e) => setDirCategories(e.target.checked ? [...dirCategories, cat.id] : dirCategories.filter(c => c !== cat.id))} className="rounded border-border bg-muted text-primary" />
                            <span className="truncate">{cat.name}</span>
                            <span className="ml-auto text-[10px] font-mono text-muted-foreground/60">{cat.skillCount}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-2 block">Source</label>
                      <div className="space-y-1">
                        {Object.entries(ECOSYSTEM_LABELS).map(([key, label]) => (
                          <label key={key} className="flex items-center gap-2 px-2 py-1.5 rounded-[2px] text-xs text-foreground/60 hover:bg-muted cursor-pointer transition-colors">
                            <input type="checkbox" checked={dirEcosystems.includes(key)} onChange={(e) => setDirEcosystems(e.target.checked ? [...dirEcosystems, key] : dirEcosystems.filter(ec => ec !== key))} className="rounded border-border bg-muted text-primary" />
                            {label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                    <span className="font-mono text-xs text-muted-foreground/70">{filteredSkills.length} Verified Capabilities Found</span>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {filteredSkills.map((skill) => (
                      <SkillCard key={skill.id} skill={skill} onClick={() => navigate('skill_detail', skill.id)} />
                    ))}
                    {filteredSkills.length === 0 && (
                      <div className="col-span-full text-center py-16 text-muted-foreground/70 font-mono text-sm">No skills found. Try a different query or ask the AI agent.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── SKILL DETAIL ─── */}
        {currentPage === 'skill_detail' && selectedSkill && (() => {
          const skill = selectedSkill;
          const cat = SKILL_CATEGORIES.find(c => c.id === skill.categoryId);
          return (
            <section className="py-10">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 items-start">
                {/* LEFT: Metadata */}
                <aside className="w-full lg:w-[240px] shrink-0 bg-card border border-border rounded-[2px] p-5 space-y-5">
                  <div className="space-y-2 border-b border-border pb-4">
                    <span className="text-[9px] font-mono uppercase text-muted-foreground/60 block">Classification</span>
                    <span className="text-xs font-mono text-primary font-bold block">{cat?.name || skill.categoryId}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono border ${DIFFICULTY_COLORS[skill.difficulty] || ''}`}>{skill.difficulty}</span>
                  </div>
                  <div className="space-y-3 border-b border-border pb-4 text-xs">
                    {skill.originalAuthor && <div><span className="text-[10px] font-mono uppercase text-muted-foreground/60 block mb-1">Author</span><span className="text-foreground">{skill.originalAuthor}</span></div>}
                    {skill.githubRepo && <div><span className="text-[10px] font-mono uppercase text-muted-foreground/60 block mb-1">Repository</span><a href={`https://github.com/${skill.githubRepo}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block">{skill.githubRepo.replace('https://github.com/', '')}</a></div>}
                    {skill.skillsShUrl && <div><span className="text-[10px] font-mono uppercase text-muted-foreground/60 block mb-1">Skills.sh</span><a href={skill.skillsShUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View on skills.sh ↗</a></div>}
                    {skill.license && <div className="flex justify-between"><span className="text-[10px] font-mono uppercase text-muted-foreground/60">License</span><span className="font-mono text-foreground bg-muted px-1.5 py-0.5">{skill.license}</span></div>}
                  </div>
                  {skill.relationships && skill.relationships.length > 0 && (
                    <div className="border-t border-border pt-4 space-y-3">
                      <span className="text-[10px] font-mono uppercase text-muted-foreground/60 block">Related Skills</span>
                      {skill.relationships.slice(0, 3).map((rel, idx) => (
                        <div key={idx}>
                          <span className="text-[9px] font-mono uppercase text-primary bg-background px-1.5 py-0.5">{rel.type.replace('_', ' ')}</span>
                          <span className="text-sm text-foreground block font-medium mt-1">{rel.target}</span>
                          <span className="text-xs text-muted-foreground/70 block">{rel.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </aside>

                {/* CENTER: Content */}
                <main className="flex-grow min-w-0 bg-card border border-border rounded-[2px] overflow-hidden">
                  <div className="p-8 border-b border-border bg-background relative">
                    <SectionTag>{ECOSYSTEM_LABELS[skill.ecosystemSource] || skill.ecosystemSource}</SectionTag>
                    <h1 className="mt-4 text-4xl md:text-5xl font-display tracking-tight text-foreground">{skill.name}</h1>
                    <p className="mt-3 text-sm font-sans text-muted-foreground max-w-2xl">{skill.tagline}</p>
                    <div className="absolute top-8 right-8">
                      <CopyButton text={skill.content} variant="rust" label="Copy as Prompt" />
                    </div>
                  </div>
                  {/* Install Command */}
                  <div className="p-6 border-b border-border bg-muted flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="font-mono text-sm text-foreground flex items-center gap-3">
                      <span className="text-primary font-bold select-none">$</span>
                      <code>{skill.installCommand}</code>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-muted-foreground/60 hidden sm:inline">Run this in your project terminal</span>
                      <CopyButton text={skill.installCommand} />
                    </div>
                  </div>
                  {/* Tabs + Content */}
                  <div className="p-8 space-y-6">
                    <div className="flex gap-6 border-b border-border pb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground/60">
                      <button onClick={() => setDetailTab('enhanced')} className={`pb-4 -mb-[17px] ${detailTab === 'enhanced' ? 'text-primary border-b-2 border-primary font-bold' : 'hover:text-foreground'}`}>Tangison Enhanced</button>
                      <button onClick={() => setDetailTab('original')} className={`pb-4 -mb-[17px] ${detailTab === 'original' ? 'text-primary border-b-2 border-primary font-bold' : 'hover:text-foreground'}`}>Original Source</button>
                    </div>
                    <div className="bg-background border border-border rounded-[2px] p-6 font-mono text-xs overflow-x-auto text-foreground/80 whitespace-pre-wrap leading-relaxed">
                      {detailTab === 'enhanced' && skill.tangisonRewrite ? skill.tangisonRewrite : skill.content}
                    </div>
                    {skill.usageExamples && (
                      <div className="pt-4 border-t border-border">
                        <h3 className="font-display text-lg text-foreground mb-4">Implementation Syntax</h3>
                        <div className="bg-background border border-border rounded-[2px] p-6 font-mono text-xs overflow-x-auto text-primary/80 whitespace-pre-wrap">
                          {skill.usageExamples}
                        </div>
                      </div>
                    )}
                  </div>
                </main>

                {/* RIGHT: AI Insights */}
                <aside className="w-full lg:w-[280px] shrink-0 space-y-6">
                  <div className="bg-accent border border-border rounded-[2px] p-5 space-y-4">
                    <span className="text-[10px] font-mono uppercase text-foreground/70 flex items-center gap-2 border-b border-foreground/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" /> AI Intelligence
                    </span>
                    <p className="text-sm text-foreground font-sans leading-relaxed">{skill.aiInsight}</p>
                    {skill.tangisonRecommendation && (
                      <div className="bg-background/50 p-3 text-xs font-mono text-foreground/70 italic">&ldquo; {skill.tangisonRecommendation} &rdquo;</div>
                    )}
                    <button onClick={() => setChatOpen(true)} className="w-full border border-primary/50 text-foreground text-xs font-mono uppercase py-2 hover:bg-primary hover:border-primary transition-colors rounded-[2px]">Ask AI About This Skill</button>
                  </div>
                  {skill.relationships && skill.relationships.length > 0 && (
                    <div className="bg-card border border-border rounded-[2px] p-5 space-y-4">
                      <span className="text-[10px] font-mono uppercase text-muted-foreground/60 border-b border-border pb-2 block">System Relationships</span>
                      {skill.relationships.map((rel, idx) => (
                        <div key={idx} className="space-y-1">
                          <span className="text-[9px] font-mono uppercase text-primary bg-background px-1.5 py-0.5">{rel.type.replace('_', ' ')}</span>
                          <span className="text-sm font-sans text-foreground block font-medium">{rel.target}</span>
                          <span className="text-xs font-sans text-muted-foreground/70 block">{rel.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </aside>
              </div>
            </section>
          );
        })()}

        {/* ─── CATEGORIES ─── */}
        {currentPage === 'categories' && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <SectionTag>SOVEREIGN DOMAINS</SectionTag>
                <h1 className="mt-3 text-4xl font-display text-foreground">All Classification Categories</h1>
                <p className="mt-3 text-sm text-muted-foreground/75 font-sans">Our registry categorizes operational logic into {SKILL_CATEGORIES.length} strict domain structures mapping the entire enterprise delivery layer.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {SKILL_CATEGORIES.map((cat) => (
                  <button key={cat.id} onClick={() => { setDirCategories([cat.id]); navigate('skills'); }} className="group flex flex-col items-center text-center p-6 bg-card border border-border hover:border-primary transition-all rounded-[2px]">
                    <div className="w-12 h-12 rounded-[2px] bg-background flex items-center justify-center border border-border mb-4 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                      <CategoryIcon name={cat.icon} className="w-5 h-5 text-foreground group-hover:text-primary" />
                    </div>
                    <span className="text-sm font-sans font-medium text-foreground block mb-2">{cat.name}</span>
                    <span className="text-[10px] font-mono text-muted-foreground/60 bg-background px-2">{cat.skillCount} SKILLS</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── TRENDING (Alphabetical) ─── */}
        {currentPage === 'trending' && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-4">
                <SectionTag>COMPLETE REGISTRY</SectionTag>
                <h1 className="text-4xl font-display text-foreground">All Capabilities</h1>
                <p className="text-sm font-mono text-muted-foreground/60 uppercase">Alphabetically indexed. {SEED_SKILLS.length} skills in registry.</p>
              </div>
              <div className="space-y-3">
                {alphabeticalSkills.map((skill, index) => (
                  <div key={skill.id} className="bg-card border border-border p-6 flex items-center gap-6 hover:border-primary transition-all cursor-pointer rounded-[2px]" onClick={() => navigate('skill_detail', skill.id)}>
                    <div className="text-4xl font-display font-light text-muted/50">{(index + 1).toString().padStart(2, '0')}</div>
                    <div className="flex-grow">
                      <div className="flex gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase text-primary bg-background px-2">{SKILL_CATEGORIES.find(c => c.id === skill.categoryId)?.name}</span>
                        <span className={`text-[10px] font-mono px-2 rounded-full border ${DIFFICULTY_COLORS[skill.difficulty] || ''}`}>{skill.difficulty}</span>
                      </div>
                      <h3 className="text-xl font-display text-foreground">{skill.name}</h3>
                      <span className="text-xs text-muted-foreground font-sans">{skill.tagline}</span>
                    </div>
                    <div className="hidden md:block">
                      {ecosystemBadge(skill.ecosystemSource)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── ABOUT ─── */}
        {currentPage === 'about' && (
          <section className="py-20">
            <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-6 pb-8 border-b border-border">
                <SectionTag>TANGISON AGENCY</SectionTag>
                <h1 className="text-4xl md:text-5xl font-display text-foreground leading-tight">What is Tangison Skillsmith?</h1>
              </div>
              <div className="space-y-6 text-base text-foreground/80 font-sans leading-relaxed">
                <p className="text-lg text-foreground font-medium">We don&apos;t build skills. We curate, verify, enhance, and operationalize them.</p>
                <p>Tangison Skillsmith is the intelligence layer above the open AI skills ecosystem. Every skill here has been sourced, scored, and in many cases rewritten to meet strict Tangison architectural standards.</p>
                <h3 className="text-2xl font-display text-foreground mt-12 mb-4 pt-8 border-t border-border">Absolute Attribution. Zero Theft.</h3>
                <p>We credit every original author. We link to every source repository. We build on the work of the open-source community—and we make it robust for sovereign enterprise contexts.</p>
                <h3 className="text-2xl font-display text-foreground mt-12 mb-4 pt-8 border-t border-border">Core Principles</h3>
                <ul className="space-y-2">
                  {AGENT_CONFIG.core_behavior.principles.map((principle, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-foreground/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {principle}
                    </li>
                  ))}
                </ul>
                <h3 className="text-2xl font-display text-foreground mt-12 mb-4 pt-8 border-t border-border">Sovereign by Design.</h3>
                <p>Skills are infrastructure. Infrastructure should be sovereign. The African enterprise demands systems that can run isolated, without bleeding telemetry to foreign aggregators. We evaluate the core logic of these tools to ensure strict network compliance.</p>
              </div>
              <div className="bg-card border border-border rounded-[2px] p-8 mt-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block mb-6">INTEGRITY RECORD: Open Ecosystem Sources</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  {SUPPORTED_ECOSYSTEMS.map((eco) => (
                    <div key={eco.name} className="flex justify-between items-center border-b border-border pb-2">
                      <span className="text-foreground">{eco.name}</span>
                      <a href={eco.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Verify ↗</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="w-full bg-background border-t border-border py-12 px-4 sm:px-6 lg:px-8 z-10 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 space-y-4">
            <TangisonLogo className="h-12 w-auto" />
            <p className="font-sans text-xs text-muted-foreground/75 leading-relaxed max-w-xs font-light">Tangison Agency</p>
            <p className="font-sans text-xs text-muted-foreground/50 leading-relaxed max-w-xs font-light">Intelligence built on what remains. Windhoek, Namibia.</p>
          </div>
          <div className="md:col-span-2 space-y-2 font-mono text-[10px]">
            <span className="uppercase text-primary font-bold block mb-3">Platform</span>
            {['Skills Directory', 'Categories', 'Trending', 'About'].map((item) => (
              <button key={item} onClick={() => navigate(item === 'Skills Directory' ? 'skills' : item === 'Categories' ? 'categories' : item === 'Trending' ? 'trending' : 'about')} className="block text-muted-foreground/75 hover:text-foreground transition-colors">{item}</button>
            ))}
          </div>
          <div className="md:col-span-3 space-y-2 font-mono text-[10px]">
            <span className="uppercase text-primary font-bold block mb-3">Ecosystem</span>
            {SUPPORTED_ECOSYSTEMS.map((eco) => (
              <a key={eco.name} href={eco.url} target="_blank" rel="noopener noreferrer" className="block text-muted-foreground/75 hover:text-foreground transition-colors">{eco.name} ↗</a>
            ))}
          </div>
          <div className="md:col-span-3 space-y-2 font-mono text-[10px]">
            <span className="uppercase text-primary font-bold block mb-3">Legal</span>
            <span className="block text-muted-foreground/50">Privacy Policy</span>
            <span className="block text-muted-foreground/50">Terms of Service</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-border flex flex-col md:flex-row justify-between font-mono text-[10px] text-muted-foreground/60">
          <span>© {new Date().getFullYear()} Tangison Agency. All rights reserved.</span>
          <span>Built by Tangison Agency · AI-Powered</span>
        </div>
      </footer>

      {/* ═══ AI AGENT WIDGET ═══ */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {chatOpen && (
          <div className="mb-4 w-[340px] md:w-[380px] h-[520px] bg-card border border-border shadow-2xl flex flex-col overflow-hidden" style={{ animation: 'fadeInUp 0.3s cubic-bezier(0.4,0,0.2,1) forwards' }}>
            <div className="bg-background border-b border-border px-4 py-3 flex justify-between items-center">
              <div>
                <span className="block font-display text-foreground text-sm">{AGENT_CONFIG.agent.name}</span>
                <span className="block font-mono text-[9px] text-muted-foreground/60 uppercase">Powered by {AGENT_CONFIG.agent.type.split(' ').slice(-1)[0]}</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-muted-foreground/60 hover:text-foreground p-1"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-card font-sans text-sm" style={{ scrollbarWidth: 'thin' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-[2px] whitespace-pre-wrap leading-relaxed text-[13px] ${msg.role === 'user' ? 'bg-accent text-foreground' : 'bg-muted text-foreground border border-border'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isAiTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground/70 p-3 rounded-[2px] font-mono text-xs animate-pulse">Retrieving sovereign primitives...</div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleChatSend(); }} className="border-t border-border bg-background p-3 flex gap-2">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="What do you want to build?" className="flex-grow bg-muted border border-border px-3 py-2 text-foreground font-mono text-xs focus:outline-none focus:border-primary/40 rounded-[2px]" disabled={isAiTyping} />
              <button type="submit" disabled={isAiTyping || !chatInput.trim()} className="bg-primary text-primary-foreground px-3 rounded-[2px] hover:bg-foreground transition-colors disabled:opacity-50"><Send className="w-3.5 h-3.5" /></button>
            </form>
          </div>
        )}
        {!chatOpen && (
          <button onClick={() => setChatOpen(true)} className="w-14 h-14 bg-background rounded-full flex items-center justify-center border border-primary/50 shadow-xl relative group">
            <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-30 group-hover:opacity-100" />
            <MessageSquare className="w-5 h-5 text-primary" />
          </button>
        )}
      </div>

      {/* ═══ SEARCH MODAL ═══ */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-start justify-center pt-[15vh]" onClick={() => setSearchOpen(false)}>
          <div className="w-full max-w-lg bg-card border border-border rounded-[2px] shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="w-4 h-4 text-muted-foreground/60" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search skills..." className="flex-grow bg-transparent text-foreground font-mono text-sm focus:outline-none" autoFocus />
              <kbd className="text-[10px] font-mono text-muted-foreground/60 border border-border px-1.5 py-0.5 rounded-[2px]">ESC</kbd>
            </div>
            {searchQuery.length > 0 && (
              <div className="max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? searchResults.map((skill) => (
                  <button key={skill.id} onClick={() => { navigate('skill_detail', skill.id); setSearchOpen(false); setSearchQuery(''); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left">
                    <div className="flex-grow">
                      <span className="text-sm text-foreground font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground/70 ml-2">{SKILL_CATEGORIES.find(c => c.id === skill.categoryId)?.name}</span>
                    </div>
                    {ecosystemBadge(skill.ecosystemSource)}
                  </button>
                )) : (
                  <div className="px-4 py-8 text-center text-muted-foreground/70 font-mono text-xs">No skills found matching &ldquo;{searchQuery}&rdquo;</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Inline animation keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}
