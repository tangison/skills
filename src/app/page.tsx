'use client';

import { useState, useCallback, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { DocumentsSection } from '@/components/sections/DocumentsSection';
import { ToolsSection } from '@/components/sections/ToolsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ChatPanel } from '@/components/chat/ChatPanel';
import type { Section } from '@/lib/constants';

const VALID_SECTIONS: Section[] = ['skills', 'documents', 'tools', 'about'];

function getSectionFromHash(): Section {
  if (typeof window === 'undefined') return 'skills';
  const hash = window.location.hash.replace('#', '');
  if (VALID_SECTIONS.includes(hash as Section)) return hash as Section;
  return 'skills';
}

export default function Page() {
  const [activeSection, setActiveSection] = useState<Section>(getSectionFromHash);
  const [chatOpen, setChatOpen] = useState(false);
  const [hasSelectedSkill, setHasSelectedSkill] = useState(false);

  /* ── Sync hash → section on browser back/forward ── */
  useEffect(() => {
    const handleHashChange = () => {
      const section = getSectionFromHash();
      setActiveSection(section);
      setHasSelectedSkill(false);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  /* ── Section change handler (updates URL hash) ── */
  const handleSectionChange = useCallback((section: Section) => {
    setActiveSection(section);
    setHasSelectedSkill(false);
    window.location.hash = section;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectedSkillClear = useCallback(() => {
    setHasSelectedSkill(false);
  }, []);

  const handleChatToggle = useCallback(() => {
    setChatOpen(prev => !prev);
  }, []);

  const handleSkillSelected = useCallback((selected: boolean) => {
    setHasSelectedSkill(selected);
  }, []);

  /* ── Determine if hero should show ── */
  const showHero = activeSection === 'skills' && !hasSelectedSkill;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ═══════════════ HEADER ═══════════════ */}
      <Header
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onSelectedSkillClear={handleSelectedSkillClear}
        chatOpen={chatOpen}
        onChatToggle={handleChatToggle}
      />

      {/* ═══════════════ BETA BANNER ═══════════════ */}
      <div className="bg-[var(--rust-signal)] text-white text-center py-1.5 px-4">
        <p className="text-[11px] font-medium">
          SkillsCamp is in early beta — features under active development. Data shown is illustrative.
          <span className="ml-2 opacity-70">v0.1.0-beta</span>
        </p>
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      {showHero && (
        <HeroSection onSectionChange={handleSectionChange} />
      )}

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <main className="flex-1" id={activeSection}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          {activeSection === 'skills' && <SkillsSection onSkillSelected={handleSkillSelected} />}
          {activeSection === 'documents' && <DocumentsSection />}
          {activeSection === 'tools' && <ToolsSection />}
          {activeSection === 'about' && <AboutSection />}
        </div>
      </main>

      {/* ═══════════════ CHAT PANEL ═══════════════ */}
      <ChatPanel chatOpen={chatOpen} onChatToggle={handleChatToggle} />

      {/* ═══════════════ FOOTER ═══════════════ */}
      <Footer
        onSectionChange={handleSectionChange}
        onSelectedSkillClear={handleSelectedSkillClear}
        onChatToggle={handleChatToggle}
      />
    </div>
  );
}
