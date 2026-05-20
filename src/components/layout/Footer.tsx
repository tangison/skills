import { MastGlyph } from '@/components/brand/TangisonLogo';
import { GithubLogo, Globe, EnvelopeSimple, MapPin } from '@phosphor-icons/react';
import { FOOTER_LINKS, type Section } from '@/lib/constants';

interface FooterProps {
  onSectionChange: (section: Section) => void;
  onSelectedSkillClear: () => void;
  onChatToggle: () => void;
}

export function Footer({ onSectionChange, onSelectedSkillClear, onChatToggle }: FooterProps) {
  return (
    <footer className="border-t border-[var(--border-subtle-value)] mt-auto bg-[var(--surface-01)]">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <MastGlyph className="h-6 w-auto" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-xs tracking-[0.14em] uppercase">Tangison</span>
                <span className="font-editorial-serif text-[9px] tracking-[0.2em] uppercase text-secondary mt-0.5">SkillsCamp</span>
              </div>
            </div>
            <p className="text-secondary text-xs leading-relaxed max-w-[220px]">
              The open directory for AI agent skills. Built in the SADC region for every person on the continent.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <a href="https://github.com/tangison/skills" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                <GithubLogo size={16} weight="bold" />
              </a>
              <a href="https://skills.sh" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                <Globe size={16} weight="bold" />
              </a>
              <a href="mailto:hello@tangison.com" className="text-secondary hover:text-primary transition-colors">
                <EnvelopeSimple size={16} weight="bold" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary mb-3">Product</p>
            <ul className="space-y-2">
              {FOOTER_LINKS.product.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      if (link.href === '#skills') { onSectionChange('skills'); onSelectedSkillClear(); }
                      else if (link.href === '#documents') onSectionChange('documents');
                      else if (link.href === '#tools') onSectionChange('tools');
                      else if (link.href === '#chat') onChatToggle();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary mb-3">Company</p>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map(link => (
                <li key={link.label}>
                  {link.href === '#about' ? (
                    <button
                      onClick={() => { onSectionChange('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-xs text-secondary hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs text-secondary hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary mb-3">Ecosystem</p>
            <ul className="space-y-2">
              {FOOTER_LINKS.ecosystem.map(link => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1">
                    <Globe size={10} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-secondary mb-3">Legal</p>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map(link => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1">
                    <Globe size={10} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border-subtle-value)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-muted">
            © 2026 Tangison Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-muted">
            <MapPin size={10} />
            <span>Windhoek, Namibia</span>
            <span className="mx-1">|</span>
            <span className="text-[var(--rust-signal)] font-medium">AI-Powered</span>
            <span className="mx-1">|</span>
            <span>v0.2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
