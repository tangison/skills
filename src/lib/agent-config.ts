export const AGENT_CONFIG = {
  agent: {
    name: 'SkillsCamp AI',
    type: 'AI-native skills discovery and recommendation agent',
    purpose: 'Help users discover, evaluate, and deploy AI agent skills from the global ecosystem with honest, structured recommendations.',
  },

  core_behavior: {
    principles: [
      'Always credit original skill authors and link to source repositories',
      'Always provide install commands with every recommendation',
      'Always explain WHY a skill fits the user\'s need',
      'Prefer verified skills with higher quality scores',
      'Never invent skills that don\'t exist in the catalog',
      'Ask for clarification instead of guessing when intent is ambiguous',
      'Provide structured, actionable responses — no filler or hype',
      'Act as an intelligence layer above the ecosystem',
    ],
  },

  // Agent Harness Construction — Action Space Quality
  action_space: {
    tools: [
      { name: 'RECOMMEND', description: 'Suggest specific skills with reasoning', risk: 'low' },
      { name: 'COMPARE', description: 'Contrast skills across quality, installs, fit', risk: 'low' },
      { name: 'EXPLAIN', description: 'Describe what a skill does and when to use it', risk: 'low' },
      { name: 'INSTALL', description: 'Provide exact install command', risk: 'medium' },
      { name: 'CLARIFY', description: 'Ask follow-up questions for ambiguous requests', risk: 'low' },
      { name: 'ADVISE', description: 'Recommend skill combinations and workflows', risk: 'medium' },
    ],
    granularity_rules: {
      micro_tools: 'Use for install and deployment actions (high-risk operations)',
      medium_tools: 'Use for recommendation and comparison (standard edit/read loops)',
      macro_tools: 'Use only when round-trip overhead dominates (batch operations)',
    },
  },

  // Agent Harness Construction — Observation Design
  observation_design: {
    required_fields: ['status', 'summary', 'recommendation', 'next_actions'],
    status_values: ['certain', 'likely', 'uncertain'],
    error_recovery: {
      root_cause_hint: true,
      safe_retry_instruction: true,
      explicit_stop_condition: true,
    },
  },

  // Agent Harness Construction — Error Recovery Contract
  error_recovery: {
    rate_limited: 'The AI service is busy right now. Please wait a moment and try again.',
    timeout: 'The request timed out. Please try a shorter or more specific question.',
    auth_failure: 'The AI service is not configured correctly. Please contact support.',
    unknown: 'I encountered an error processing your request. Please try again.',
  },

  // Agent Harness Construction — Context Budgeting
  context_budget: {
    system_prompt_max_tokens: 500,
    catalog_context_max_tokens: 2000,
    conversation_window: 8,
    compaction_at: 'phase_boundaries',
  },

  // Agent Harness Construction — Architecture Pattern
  architecture: {
    pattern: 'hybrid',
    planning: 'ReAct',
    execution: 'typed_tool_execution',
    benchmarking: {
      completion_rate: true,
      retries_per_task: true,
      pass_at_1: true,
      pass_at_3: true,
      cost_per_successful_task: true,
    },
  },

  supported_ecosystems: [
    { name: 'Skills.sh', url: 'https://skills.sh' },
    { name: 'Tangison Skills', url: 'https://github.com/tangison/skills' },
    { name: 'Vercel Labs Skills', url: 'https://github.com/vercel-labs/skills' },
    { name: 'Anthropic Skills', url: 'https://github.com/anthropics/skills' },
    { name: 'Obra Superpowers', url: 'https://github.com/obra/superpowers' },
    { name: 'Microsoft Azure Skills', url: 'https://github.com/microsoft/azure-skills' },
  ],

  skill_discovery_engine: {
    enabled: true,
    foundation_skill: 'find-skills',
    commands: {
      find: 'skillscamp find [query]',
      add: 'skillscamp install <slug>',
      update: 'skillscamp update',
      check: 'skillscamp check',
    },
    workflow: [
      'Understand user intent',
      'Determine skill domain',
      'Search skills ecosystem',
      'Verify install counts',
      'Verify source reputation',
      'Verify GitHub stars',
      'Categorize results',
      'Recommend best skills with reasoning',
      'Generate install commands',
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
      'tangison_enhancement',
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
