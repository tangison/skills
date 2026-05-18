# Task 3-data: Data Layer Update

## Summary
Updated `/home/z/my-project/src/lib/data.ts` to remove fictional metrics, update ecosystems, and update categories to match agent config.

## Changes Made

### 1. Removed Fictional Metrics from All Skills
Deleted these 7 fields from all 12 skill objects in `SEED_SKILLS`:
- `installCount`
- `githubStars`
- `qualityScore`
- `isTrending`
- `trendingDelta`
- `viewCount`
- `copyCount`

### 2. Updated SUPPORTED_ECOSYSTEMS
Changed `'Obra Superpower'` → `'Obra'` to match agent config exactly.

### 3. Rebuilt SKILL_CATEGORIES (18 categories)
New categories matching agent config:
1. Website Planning
2. Website Auditing (NEW)
3. SEO
4. Copywriting
5. Prompt Engineering
6. Image Generation
7. Flyer Design
8. Social Media
9. Document Design
10. PDF Generation (NEW)
11. Research
12. Automation
13. Deployment
14. Next.js
15. React (NEW)
16. TypeScript
17. Brand Systems
18. AI Infrastructure

Removed categories: Web Development, Creative Design, DevOps
All `skillCount` set to `0`.

### 4. Reassigned Skill Category Mappings
- Find Skills: `cat-15` → `cat-18` (AI Infrastructure)
- Frontend Design: `cat-2` → `cat-15` (React)
- PDF: `cat-5` → `cat-10` (PDF Generation)

### 5. Updated types.ts
Added `skillCount?: number` to `SkillCategory` interface.

### 6. Fixed chat/route.ts
Removed `qualityScore` reference from skill summary string.

## Preserved Fields
All `content`, `description`, `usageExamples`, and `tangisonRewrite` fields were preserved intact.

## Known Dependencies
- `page.tsx` still references removed Skill fields (`isTrending`, `installCount`, `qualityScore`, `trendingDelta`, `copyCount`) — needs separate update
- API routes in `/api/skills/` reference DB columns (`installCount`, `qualityScore`, `copyCount`) — may need Prisma schema update
