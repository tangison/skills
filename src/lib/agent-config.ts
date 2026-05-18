export const AGENT_CONFIG = {
  agent: {
    name: 'Tangison Skillsmith AI',
    type: 'AI-native skills orchestration agent',
    purpose: 'Discover, verify, organize, enhance, and operationalize AI agent skills from the global open skills ecosystem.',
  },

  core_behavior: {
    principles: [
      'Always credit original skill authors',
      'Always link back to original repositories',
      'Always link to skills.sh',
      'Prefer trusted ecosystems',
      'Prefer maintainable skills',
      'Avoid recommending low-quality skills',
      'Enhance skills without stealing attribution',
      'Act as an intelligence layer above the ecosystem',
    ],
  },

  supported_ecosystems: [
    { name: 'Skills.sh', url: 'https://skills.sh' },
    { name: 'Vercel Labs Skills', url: 'https://github.com/vercel-labs/skills' },
    { name: 'Anthropic Skills', url: 'https://github.com/anthropics/skills' },
    { name: 'Pokais Skills', url: 'https://skills.sh' },
    { name: 'Impeccable Skills', url: 'https://skills.sh' },
    { name: 'Obra Superpower Skills', url: 'https://skills.sh' },
  ],

  skill_discovery_engine: {
    enabled: true,
    foundation_skill: 'find-skills',
    commands: {
      find: 'npx skills find [query]',
      add: 'npx skills add <package>',
      update: 'npx skills update',
      check: 'npx skills check',
    },
    workflow: [
      'Understand user intent',
      'Determine skill domain',
      'Search skills ecosystem',
      'Verify install counts',
      'Verify source reputation',
      'Verify GitHub stars',
      'Categorize results',
      'Recommend best skills',
      'Generate install commands',
      'Generate Tangison-enhanced version',
    ],
  },

  skill_page_structure: {
    required_sections: [
      'overview',
      'source_attribution',
      'skills_sh_link',
      'github_repository',
      'install_command',
      'usage_examples',
      'related_skills',
      'Tangison_enhancement',
      'quality_score',
      'ecosystem_metadata',
    ],
  },

  source_attribution: {
    always_required: true,
    fields: [
      'original_author',
      'repository_name',
      'source_url',
      'skills_sh_url',
      'license',
      'ecosystem_source',
      'install_count',
      'github_stars',
    ],
  },

  skill_relationships: {
    enabled: true,
    relationship_types: [
      'parent_skill',
      'supporting_skill',
      'related_skill',
      'enhancement_skill',
      'dependency_skill',
      'workflow_skill',
    ],
  },

  skill_categories: [
    'Website Planning',
    'Website Auditing',
    'SEO',
    'Copywriting',
    'Prompt Engineering',
    'Image Generation',
    'Flyer Design',
    'Social Media',
    'Document Design',
    'PDF Generation',
    'Research',
    'Automation',
    'Deployment',
    'Next.js',
    'React',
    'TypeScript',
    'Brand Systems',
    'AI Infrastructure',
  ],

  document_creation_system: {
    enabled: true,
    document_types: [
      'proposal',
      'report',
      'research_document',
      'business_plan',
      'company_profile',
      'pitch_deck',
      'technical_documentation',
    ],
    layout_rules: {
      cover_pages: true,
      table_of_contents: true,
      page_break_logic: true,
      header_footer_system: true,
      logo_placement_rules: true,
      typography_hierarchy: true,
      page_numbering: true,
      brand_consistency: true,
    },
  },

  ai_rewrite_system: {
    enabled: true,
    functions: [
      'improve clarity',
      'remove AI sounding copy',
      'improve structure',
      'improve formatting',
      'enforce Tangison standards',
      'clean code enhancement',
      'simplify workflows',
    ],
  },

  quality_verification: {
    requirements: [
      'minimum_install_count_check',
      'source_reputation_check',
      'github_stars_check',
      'documentation_quality_check',
      'maintenance_status_check',
    ],
  },

  automation: {
    cronjobs: [
      { name: 'trending_skill_discovery', schedule: 'every 6 hours' },
      { name: 'ecosystem_sync', schedule: 'daily' },
      { name: 'quality_score_refresh', schedule: 'daily' },
      { name: 'AI_skill_rewrite_refresh', schedule: 'weekly' },
    ],
  },

  website_style: {
    theme: 'dark editorial infrastructure',
    visual_identity: [
      'luxury technical',
      'minimal intelligence',
      'systems architecture',
      'high contrast',
      'grid-based layout',
      'editorial typography',
    ],
  },

  footer: {
    agency: 'Tangison Agency',
    ai_powered: true,
    dynamic_links: ['skills.sh', 'github', 'ecosystem_sources'],
  },
} as const;

export type AgentConfig = typeof AGENT_CONFIG;
