# SkillsCamp AI Agent Instructions

## Mission
You are the SkillsCamp Population Agent. Your job is to populate this static site with **real, high-quality AI skills** across all categories. No fake data. No broken links. No complex backend.

## What You Must Do

### 1. Expand the Skills Database
- Edit `src/lib/data.ts`
- Add **minimum 200 real skills** across all 28 categories
- Each skill MUST have:
  - Real GitHub/npm/HuggingFace URL (test it returns 200)
  - Actual install command that works
  - Real author/provider name
  - Accurate star count (check the repo)
  - Specific description (no generic filler)
  - At least one user class (A-F)
  - Proper tier assignment

### 2. Quality Standards
- **NO fictional install counts** - use 0 if unknown
- **NO made-up GitHub stars** - look up real numbers or use 0
- **NO broken URLs** - verify every link before adding
- **NO duplicate slugs** - check existing skills first
- **Every skill must be useful** to a real human (plumber, developer, student, etc.)

### 3. Categories to Populate
Focus on these priority areas first:
1. **Prompt Engineering** (33+ skills)
2. **Copywriting** (32+ skills) 
3. **Automation** (29+ skills)
4. **Next.js** (126+ skills)
5. **React** (112+ skills)
6. **Creative Design** (161+ skills)
7. **Testing** (63+ skills)
8. **Security** (34+ skills)

Then fill remaining categories with quality skills.

### 4. User Classes
Assign at least one class per skill:
- **A**: Everyday users (no code needed)
- **B**: Sole traders (plumbers, electricians, etc.)
- **C**: Small businesses
- **D**: Enterprise
- **E**: Developers
- **F**: Creatives

Example: A cold-calling script generator = B (sole traders) + C (small business)

### 5. Static Site Requirements
- All data stays in `src/lib/data.ts`
- No database calls
- No API endpoints for skill data
- Everything pre-built for Vercel static hosting
- Keep file under 50KB if possible (split into multiple files if needed)

### 6. Skill Summarizer Feature
For each skill, add a simple summary field:
```typescript
summary: {
  oneLiner: "If you do X, this skill does Y",
  whoItsFor: ["Plumber", "Developer"],
  problemSolved: "Saves 2 hours on cold calling",
  quickStart: "npx skills add coreyhaines/cold-call"
}
```

## Execution Steps

1. **Research**: Find real skills from:
   - GitHub (trending AI repos)
   - npm (ai-skill-, agent-, llm- packages)
   - Hugging Face (popular models/tools)
   - LangChain, CrewAI, AutoGen ecosystems
   - Known creators (Andrej Karpathy, Simon Willison, etc.)

2. **Verify**: For each skill:
   - Check URL loads
   - Confirm install command works
   - Count actual GitHub stars
   - Read README to understand purpose

3. **Add**: Insert into `src/lib/data.ts`:
   ```typescript
   {
     slug: "anthropics/claude-prompt",
     name: "Claude Prompt Optimizer",
     category: "Prompt Engineering",
     tier: "INTERMEDIATE",
     userClasses: ["A", "E"],
     description: "Optimizes prompts for Claude models automatically.",
     oneLiner: "Turns weak prompts into high-performance ones",
     installCommand: "npx @anthropic/prompt-optimizer",
     sourceUrl: "https://github.com/anthropics/prompt-optimizer",
     provider: "Anthropic",
     stars: 2847,
     verified: true,
     qualityScore: 0.75,
     summary: { ... }
   }
   ```

4. **Repeat** until you have 200+ quality skills

## Forbidden Actions
- ❌ Do NOT invent fake metrics
- ❌ Do NOT add skills with 404 URLs
- ❌ Do NOT copy skills with generic descriptions
- ❌ Do NOT ignore user classes
- ❌ Do NOT create placeholder entries

## Success Criteria
- ✅ 200+ real skills populated
- ✅ Zero broken URLs
- ✅ Zero fake star/install counts
- ✅ Every skill has user class
- ✅ Every skill has working install command
- ✅ Site remains static (no database)
- ✅ Loads fast on Vercel hobby plan

## Start Now
Begin by researching and adding 20 high-quality skills to `src/lib/data.ts`. Focus on **Prompt Engineering** and **Automation** categories first. Verify every URL before committing.
