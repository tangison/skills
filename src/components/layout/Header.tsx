'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { MastGlyph } from '@/components/brand/TangisonLogo';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  ChatCircle,
  Sun,
  Moon,
  List,
  Globe,
} from '@phosphor-icons/react';
import { NAV_ITEMS, OFFCANVAS_LINKS, FOOTER_LINKS, type Section } from '@/lib/constants';

interface HeaderProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  onSelectedSkillClear: () => void;
  chatOpen: boolean;
  onChatToggle: () => void;
}

export function Header({
  activeSection,
  onSectionChange,
  onSelectedSkillClear,
  chatOpen,
  onChatToggle,
}: HeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [offCanvasOpen, setOffCanvasOpen] = useState(false);

  const handleNavAction = (action: 'home' | 'skills' | 'documents' | 'tools' | 'about' | 'chat' | 'external-tangison') => {
    setOffCanvasOpen(false);
    if (action === 'home') {
      onSectionChange('skills');
      onSelectedSkillClear();
    } else if (action === 'chat') {
      onChatToggle();
    } else if (action === 'external-tangison') {
      window.open('https://tangison.com', '_blank', 'noopener,noreferrer');
    } else {
      onSectionChange(action as Section);
      onSelectedSkillClear();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-[var(--border-subtle-value)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Logo + Wordmark */}
        <button
          onClick={() => { onSelectedSkillClear(); onSectionChange('skills'); }}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          aria-label="Go to home page"
        >
          <MastGlyph className="h-7 w-auto" />
          <div className="flex flex-col leading-none">
            <span className="font-display text-xs tracking-[0.14em] uppercase">Tangison</span>
            <span className="font-editorial-serif text-[9px] tracking-[0.2em] uppercase text-secondary mt-0.5">SkillsCamp</span>
          </div>
        </button>

        {/* Center: Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { onSectionChange(item.id); onSelectedSkillClear(); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] rounded-md transition-all ${
                  activeSection === item.id
                    ? 'text-primary bg-[var(--surface-02)]'
                    : 'text-secondary hover:text-primary hover:bg-[var(--surface-02)]'
                }`}
                aria-label={item.label}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                <Icon size={13} weight={activeSection === item.id ? 'fill' : 'regular'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onChatToggle()}
            className={`p-2 rounded-md transition-all ${chatOpen ? 'bg-[var(--surface-02)]' : 'hover:bg-[var(--surface-02)]'}`}
            aria-label="Toggle AI chat"
          >
            <ChatCircle size={16} weight="fill" className={chatOpen ? 'text-brand' : 'text-secondary'} />
          </button>
          {resolvedTheme && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-[var(--surface-02)] transition-all"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={16} weight="bold" /> : <Moon size={16} weight="bold" />}
            </button>
          )}

          {/* Mobile: Off-canvas trigger */}
          <Sheet open={offCanvasOpen} onOpenChange={setOffCanvasOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden p-2 rounded-md hover:bg-[var(--surface-02)] transition-all"
                aria-label="Open menu"
              >
                <List size={18} weight="bold" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0 bg-[var(--surface-01)]">
              <SheetHeader className="px-5 pt-6 pb-4 border-b border-[var(--border-subtle-value)]">
                <div className="flex items-center gap-2.5">
                  <MastGlyph className="h-7 w-auto" />
                  <div className="flex flex-col leading-none">
                    <SheetTitle className="font-display text-xs tracking-[0.14em] uppercase">Tangison</SheetTitle>
                    <span className="font-editorial-serif text-[9px] tracking-[0.2em] uppercase text-secondary mt-0.5">SkillsCamp</span>
                  </div>
                </div>
              </SheetHeader>

              <nav className="flex flex-col py-2">
                {OFFCANVAS_LINKS.map(link => {
                  const Icon = link.icon;
                  const isActive = (link.action === 'skills' && activeSection === 'skills') ||
                    (link.action === 'documents' && activeSection === 'documents') ||
                    (link.action === 'tools' && activeSection === 'tools') ||
                    (link.action === 'chat' && chatOpen);
                  return (
                    <button
                      key={link.action}
                      onClick={() => handleNavAction(link.action)}
                      className={`flex items-center gap-3 px-5 py-3 text-sm transition-all text-left ${
                        isActive
                          ? 'text-primary bg-[var(--surface-02)] font-medium'
                          : 'text-secondary hover:text-primary hover:bg-[var(--surface-02)]'
                      }`}
                    >
                      <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
                      {link.label}
                    </button>
                  );
                })}
              </nav>

              <div className="border-t border-[var(--border-subtle-value)] px-5 py-4 space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary">Ecosystem</p>
                {FOOTER_LINKS.ecosystem.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-secondary hover:text-primary transition-colors"
                  >
                    <Globe size={13} />
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="border-t border-[var(--border-subtle-value)] px-5 py-4 space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary">Legal</p>
                {FOOTER_LINKS.legal.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-secondary hover:text-primary transition-colors"
                  >
                    <Globe size={13} />
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--border-subtle-value)] px-5 py-4">
                <p className="text-[10px] text-muted">
                  © 2026 Tangison Agency. All rights reserved.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
