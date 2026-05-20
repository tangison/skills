import {
  Briefcase,
  ChartBar,
  FileText,
  File,
  PencilLine,
  ShieldCheck,
  Rocket,
  FolderOpen,
  Wrench,
  Info,
  House,
  ChatTeardropText,
  Globe,
} from '@phosphor-icons/react';

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */
export type Section = 'skills' | 'documents' | 'tools' | 'about';

/* ═══════════════════════════════════════════════════════════════
   PASTEL / TAG MAPS
   ═══════════════════════════════════════════════════════════════ */
export const PASTEL_MAP: Record<string, string> = {
  TANGISON: 'pastel-yellow',
  VERCEL_LABS: 'pastel-blue',
  ANTHROPIC: 'pastel-green',
  OBRA: 'pastel-red',
  COMMUNITY: 'pastel-blue',
  POKAIS: 'pastel-green',
  IMPECCABLE: 'pastel-yellow',
};

export const DIFFICULTY_PASTEL: Record<string, string> = {
  BEGINNER: 'pastel-green',
  INTERMEDIATE: 'pastel-yellow',
  ADVANCED: 'pastel-red',
};

/* ═══════════════════════════════════════════════════════════════
   DOCUMENT ENGINE
   ═══════════════════════════════════════════════════════════════ */
export const DOC_TYPES = [
  { value: 'proposal', label: 'Proposal', icon: Briefcase },
  { value: 'report', label: 'Report', icon: ChartBar },
  { value: 'brief', label: 'Brief', icon: FileText },
  { value: 'invoice', label: 'Invoice', icon: File },
  { value: 'memo', label: 'Memo', icon: PencilLine },
  { value: 'contract', label: 'Contract', icon: ShieldCheck },
  { value: 'pitch_deck', label: 'Pitch Deck', icon: Rocket },
  { value: 'sow', label: 'SOW', icon: FileText },
] as const;

export const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'technical', label: 'Technical' },
  { value: 'concise', label: 'Concise' },
  { value: 'authoritative', label: 'Authoritative' },
  { value: 'conversational', label: 'Conversational' },
] as const;

/* ═══════════════════════════════════════════════════════════════
   PROMPT / REWRITE TOOLS
   ═══════════════════════════════════════════════════════════════ */
export const PROMPT_CONTEXTS = [
  'Agent Builder', 'Chat', 'RAG', 'Workflow', 'Code Review',
  'Data Analysis', 'Creative Writing', 'Research', 'Customer Support', 'Education',
] as const;

export const REWRITE_FUNCTIONS = [
  { id: 'clarity', label: 'Clarity', enabled: true },
  { id: 'remove-ai', label: 'Remove AI Copy', enabled: true },
  { id: 'structure', label: 'Structure', enabled: true },
  { id: 'format', label: 'Format', enabled: true },
  { id: 'standards', label: 'Standards', enabled: false },
  { id: 'simplify', label: 'Simplify', enabled: false },
];

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════════ */
export const NAV_ITEMS: { id: Section; label: string; icon: typeof House }[] = [
  { id: 'skills', label: 'Skills', icon: FolderOpen },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'tools', label: 'Tools', icon: Wrench },
];

export const OFFCANVAS_LINKS = [
  { label: 'Home', icon: House, action: 'home' as const },
  { label: 'Skills', icon: FolderOpen, action: 'skills' as const },
  { label: 'Documents', icon: FileText, action: 'documents' as const },
  { label: 'Tools', icon: Wrench, action: 'tools' as const },
  { label: 'About', icon: Info, action: 'about' as const },
  { label: 'AI Chat', icon: ChatTeardropText, action: 'chat' as const },
  { label: 'Tangison.com', icon: Globe, action: 'external-tangison' as const },
];

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
export const FOOTER_LINKS = {
  product: [
    { label: 'Skills', href: '#skills' },
    { label: 'Document Engine', href: '#documents' },
    { label: 'Prompt Writer', href: '#tools' },
    { label: 'AI Chat', href: '#chat' },
  ],
  company: [
    { label: 'About', href: '#about' },
    { label: 'Tangison.com', href: 'https://tangison.com' },
    { label: 'GitHub', href: 'https://github.com/tangison/skills' },
  ],
  ecosystem: [
    { label: 'Skills.sh', href: 'https://skills.sh' },
    { label: 'Vercel Labs', href: 'https://github.com/vercel-labs/skills' },
    { label: 'Anthropic', href: 'https://github.com/anthropics/skills' },
    { label: 'Obra Superpowers', href: 'https://github.com/obra/superpowers' },
  ],
  legal: [
    { label: 'Privacy Policy', href: 'https://tangison.com/privacy' },
    { label: 'Terms of Service', href: 'https://tangison.com/terms' },
    { label: 'Cookie Policy', href: 'https://tangison.com/cookies' },
  ],
};
