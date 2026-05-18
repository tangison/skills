# Task 2 — Replace fabricated skills with real skills.sh leaderboard data

## Agent: main

## Summary
All 4 fabricated skills (find-skills with wrong data, military-prompt-architect, flyer-luxury-generator, seo-auditor-pro) replaced with 6 real skills from the skills.sh leaderboard. All Pokais/Impeccable references eliminated. Install commands use real `npx skills add owner/repo` format.

## Changes Made (page.tsx only)

### Type Changes
- `EcosystemSource`: removed `'POKAIS'` and `'IMPECCABLE'`, added `'MICROSOFT'`

### Data Changes
- `INITIAL_SKILLS`: replaced 4 fabricated → 6 real skills from leaderboard
- `SUPPORTED_ECOSYSTEMS`: removed Pokais/Impeccable, added Tangison, Obra Superpowers, Microsoft Azure with real GitHub URLs
- `SKILL_CATEGORIES`: reduced inflated counts to more realistic numbers
- `ECOSYSTEM_LABELS`: removed POKAIS/IMpeccable, added OBRA='Obra Superpowers', MICROSOFT='Microsoft Azure'

### UI Changes
- Terminal animation: `npx skills find --domain='african-enterprise'` → `npx skills add vercel-labs/skills`
- Terminal title bar: `skills-sh — find` → `skills — add`
- Terminal results: added Obra Superpowers scan line
- Terminal output: "4 optimized intelligence modules" → "6 verified skills located across 3 registries"
- About page: replaced "African enterprise" with real ecosystem references and repo names
- Chat fallback: updated slug matches for new skills
- Cron job: replaced "Scanning Pokais skills" with Obra Superpowers + Microsoft Azure scans

## Lint
- Passes clean with zero errors
