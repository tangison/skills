# Task 8-a: Systematic Debugging Skill Upgrade

## Summary
Upgraded the Systematic Debugging skill (skill-5) in `/home/z/my-project/src/app/page.tsx` to match the depth of the real Obra Superpowers SKILL.md specification.

## Changes Made

### 1. Tagline (line 500)
- **Before**: 'Methodical debugging methodology that eliminates root causes, not symptoms'
- **After**: 'Structured debugging methodology that mandates root cause investigation before attempting any fixes'

### 2. usageExamples (lines 516-540)
- **Before**: Simple 5-line example with `approach: "binary-search"`
- **After**: Comprehensive 25-line example with:
  - 4-phase process with constraints (maxFixAttempts, requireReproduction, blockSymptomPatching)
  - Phase 1 gatherEvidence with layers, traceDataFlow, instrumentBoundaries
  - Phase 3 testHypothesis with claim, test, controlGroup

### 3. contentMdx (lines 545-721)
- **Before**: ~58 lines (shallow Debugging Methodology + Techniques + Anti-patterns)
- **After**: ~177 lines matching Obra SKILL.md spec:
  - When to Use (6 scenarios + 5 ESPECIALLY-when)
  - The Iron Law: NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
  - The Four Phases table
  - Phase 1: Root Cause Investigation (5-step table + Diagnostic Instrumentation + Backward Call-Stack Tracing)
  - Phase 2: Pattern Analysis (4-step table)
  - Phase 3: Hypothesis and Testing (scientific method)
  - Phase 4: Implementation (3-step table + When Fix Does Not Work + Architecture Question)
  - Red Flags: STOP and Follow Process (8 warning signs)
  - Common Rationalizations table (6 excuses vs reality)
  - Supporting Techniques (3 techniques)
  - Related Skills (3 related skills)

### 4. aiInsight (line 722)
- **Before**: 'Part of Obra Superpowers: one of the most popular debugging methodologies in the ecosystem with ~100.3K installs.'
- **After**: 'The Iron Law skill from Obra Superpowers: mandates root cause investigation before any fix attempts. After 3 failed fixes, stops and questions the architecture instead of continuing to patch symptoms.'

### 5. tangisonRecommendation (line 723)
- **Before**: 'Use Systematic Debugging for any production issue. The binary-search approach eliminates guesswork.'
- **After**: 'Apply the Iron Law on every issue: no fixes without root cause investigation first. When 3+ fixes fail, stop debugging and question the architecture.'

## Verification
- `bun run lint` passed with zero errors
- Work record appended to `/home/z/my-project/worklog.md`
