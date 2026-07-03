
# Enhance existing Cybersecurity platform → Enterprise Learning OS

Nothing existing gets deleted. All current routes, tables, auth, mission engine, sidebar, AI mentor, and progress hooks stay working. Enhancements land as additive files + surgical extensions.

## Scope guardrails
- Keep `src/routes/_authenticated/*` shells and current mission page working end-to-end.
- Extend the `Session` type in `src/content/month1.ts` with optional fields so old data still renders.
- No schema-breaking migrations; only additive tables.
- No Docker / container labs (out of scope for Lovable web runtime). "Enterprise labs" render as guided simulated terminals + dataset explorers, not real VMs.
- Real-time datasets are shipped as static JSON under `src/content/datasets/` (Windows Event Log samples, Sysmon, firewall, DNS, phishing email, AD auth, CloudTrail). This is the "local dataset engine."

## What ships

### 1. Enterprise Universe layer
- `src/content/enterprise.ts` — "Global Financial Corp" org model: business units, sites, systems, users, dataflows.
- `src/components/enterprise-map.tsx` — interactive SVG map (endpoint → switch → firewall → app → DB → SIEM → SOC), clickable nodes → node drawer.
- New route `/_authenticated/enterprise.tsx` — the map + node detail panel; each node lists related missions + concepts.

### 2. Expanded Mission Block (10-part structure)
Extend `Session` with optional: `businessContext`, `preConcepts[]`, `enterpriseView` (node refs), `simulation`, `postLearning` (flashcards, mindmap, mistakes), `skillsUnlocked[]`, `careerUnlock`.
- Update `session.$slug.tsx` to render new sections only when present (backward compatible with current 8 missions).
- Add reusable components: `BusinessContextCard`, `PreConceptGraph`, `EnterpriseViewPanel`, `SimulationPanel`, `PostLearningPanel`, `SkillsUnlockedPanel`, `CareerUnlockPanel`.
- Backfill the 8 Month-1 missions with the new fields.

### 3. AI Mentor personas + functions
- Extend `src/lib/ai-mentor.functions.ts` with a `persona` and `mode` input: personas (Cyber Trainer, SOC Analyst, Network Engineer, Linux Admin, Windows Admin, Cloud Architect, CISO, Hiring Manager, Interviewer); modes (Explain, Simplify, Deep Dive, Enterprise View, Generate Quiz, Generate Flashcards, Generate Commands, Interview Q, Career Guidance, Lab Assist).
- Update `ai-mentor-drawer.tsx` with persona picker + quick-action mode buttons.
- System prompt injects current mission slug + enterprise context so answers stay in-universe.

### 4. Knowledge Graph
- `src/content/knowledge-graph.ts` — nodes (concepts) + edges.
- `/_authenticated/graph.tsx` — force-directed graph (lightweight, custom SVG, no new heavy dep) with search + highlight of completed concepts (from `user_progress`).

### 5. Daily Enterprise Mission
- `src/content/daily-missions.ts` — pool of scenario missions ("ABC Bank users can't log in…") each with objective checklist + dataset ref.
- New route `/_authenticated/daily.tsx` — today's mission (deterministic pick by date), checklist state, AI evaluation via mentor function `evaluate_mission`.
- Additive table `daily_mission_attempts` (user_id, mission_id, date, findings jsonb, score, ai_feedback).

### 6. Dashboards
- Enhance `dashboard.tsx` with widget grid: Career Readiness, Skills, Missions, SOC Alert Feed (from dataset), Streak, Next Mission (keep existing behavior).
- New `/_authenticated/skills.tsx` — Skill Tree (OS → Networking → … → AI Security), unlocked branches computed from progress.
- New `/_authenticated/career.tsx` — role ladder with salary bands + gap analysis vs skills earned.

### 7. Local Dataset Engine
- `src/content/datasets/*.json` — small realistic samples (Windows 4624/4625, Sysmon 1/3/11, firewall deny, DNS, phishing email headers, AD lockout, CloudTrail ConsoleLogin, MITRE ATT&CK subset).
- `src/routes/_authenticated/labs.tsx` upgraded from stub → Dataset Explorer with filter/search + "Ask Mentor about this row".

### 8. Gamification
- Additive `user_xp` table (user_id, xp, level, streak_days, last_active).
- `awardXp(slug, kind)` helper called on mission complete, quiz score, daily mission.
- Badges shown on dashboard + profile.

### 9. UI polish
- Animated grid + subtle scanline overlay on shell background.
- Glass cards already present — extend to new pages.
- Skeleton loaders for new dashboards.
- Preserve existing tokens in `src/styles.css`.

## Additive migrations (one migration call)
- `daily_mission_attempts` — RLS: user owns rows.
- `user_xp` — RLS: user owns row; instructors read all via `has_role`.
- `skill_unlocks` — user_id, skill_key, unlocked_at.
- All with GRANTs per rules.

## Explicit non-goals (call out to user)
- No real Docker/K8s/VM labs — simulated only.
- No real SIEM ingestion — static dataset samples.
- Curriculum expansion beyond Month 1 not included this pass (structure supports it; content stays Month 1 for now).

## Order of implementation
1. Migration (additive tables).
2. Types + content scaffolding (enterprise, knowledge graph, datasets, daily missions).
3. Session block extension + backfill Month 1.
4. AI Mentor personas.
5. New routes: enterprise, graph, daily, skills, career + labs upgrade.
6. Dashboard widget grid + XP wiring.
7. UI polish pass + verify existing flows still work (auth → dashboard → mission → complete).

Confirm and I'll build it in that order.
