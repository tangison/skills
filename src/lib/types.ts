export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type EcosystemSource = 'VERCEL_LABS' | 'ANTHROPIC' | 'POKAIS' | 'IMPECCABLE' | 'OBRA' | 'TANGISON' | 'COMMUNITY';

export type PageRoute = 'home' | 'skills' | 'skill_detail' | 'categories' | 'trending' | 'about';

export interface SkillRelationship {
  type: string;
  target: string;
  label: string;
}

export interface Skill {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  content: string;
  tangisonRewrite: string | null;
  installCommand: string;
  categoryId: string;
  tags: string[];
  difficulty: Difficulty;
  originalAuthor: string | null;
  sourceUrl: string | null;
  skillsShUrl: string | null;
  githubRepo: string | null;
  license: string | null;
  ecosystemSource: EcosystemSource;
  installCount: number;
  githubStars: number;
  qualityScore: number;
  isTangisonOriginal: boolean;
  isVerified: boolean;
  isTrending: boolean;
  viewCount: number;
  copyCount: number;
  categoryName?: string;
  trendingDelta?: string;
  dependencies?: string[];
  usageExamples?: string;
  relationships?: SkillRelationship[];
  aiInsight?: string;
  tangisonRecommendation?: string;
}

export interface SkillCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  skillCount: number;
  sortOrder: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Ecosystem {
  name: string;
  url: string;
}
