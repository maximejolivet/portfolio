# Graph Report - .  (2026-06-09)

## Corpus Check
- Corpus is ~3,344 words - fits in a single context window. You may not need a graph.

## Summary
- 126 nodes · 113 edges · 22 communities (17 shown, 5 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_English Locales|English Locales]]
- [[_COMMUNITY_French Locales|French Locales]]
- [[_COMMUNITY_CICD & Public Assets|CI/CD & Public Assets]]
- [[_COMMUNITY_Package Metadata|Package Metadata]]
- [[_COMMUNITY_Build Scripts|Build Scripts]]
- [[_COMMUNITY_Claude Config & Skills|Claude Config & Skills]]
- [[_COMMUNITY_Nuxt Config & Routes|Nuxt Config & Routes]]
- [[_COMMUNITY_i18n & Translation Skill|i18n & Translation Skill]]
- [[_COMMUNITY_Hooks Settings|Hooks Settings]]
- [[_COMMUNITY_Permissions Settings|Permissions Settings]]
- [[_COMMUNITY_Server TypeScript Config|Server TypeScript Config]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Public Assets|Public Assets]]

## God Nodes (most connected - your core abstractions)
1. `scripts` - 9 edges
2. `error` - 7 edges
3. `error` - 7 edges
4. `Portfolio Project (Nuxt 4 SSR)` - 5 edges
5. `i18n Localization System` - 4 edges
6. `Deployment Workflow (develop → master → GitHub Pages)` - 4 edges
7. `deploy Skill` - 4 edges
8. `cv` - 3 edges
9. `cv` - 3 edges
10. `home` - 3 edges

## Surprising Connections (you probably didn't know these)
- `npm run deploy Command` --conceptually_related_to--> `Portfolio Project (Nuxt 4 SSR)`  [INFERRED]
  .claude/skills/deploy/SKILL.md → CLAUDE.md
- `CV Maxime Jolivet Developpeur PDF` --conceptually_related_to--> `Portfolio README - Maxime Jolivet Nuxt 4 SSR`  [INFERRED]
  /Users/maxime/Sites/portfolio/public/cv-maximejolivet-developpeur.pdf → /Users/maxime/Sites/portfolio/README.md
- `Open Graph Image - Maxime Jolivet` --conceptually_related_to--> `Portfolio README - Maxime Jolivet Nuxt 4 SSR`  [INFERRED]
  /Users/maxime/Sites/portfolio/public/open-graph-maximejolivet.jpg → /Users/maxime/Sites/portfolio/README.md
- `Allow All Crawlers Policy` --rationale_for--> `Open Graph Image - Maxime Jolivet`  [INFERRED]
  /Users/maxime/Sites/portfolio/public/robots.txt → /Users/maxime/Sites/portfolio/public/open-graph-maximejolivet.jpg
- `Deployment Workflow (develop → master → GitHub Pages)` --references--> `GitHub Actions Workflow`  [INFERRED]
  CLAUDE.md → .claude/skills/deploy/SKILL.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Nuxt CI/CD GitHub Pages Pipeline** — nuxtjs_workflow, nuxtjs_workflow_build_job, nuxtjs_workflow_deploy_job, nuxtjs_workflow_github_pages [EXTRACTED 1.00]
- **i18n Dual Locale Synchronization (en + fr always updated together)** — skill_add_translation_skill, skill_add_translation_en_json, skill_add_translation_fr_json [EXTRACTED 1.00]
- **Deploy Pipeline (skill + npm command + GitHub Actions + GitHub Pages)** — skill_deploy_skill, skill_deploy_github_actions, skill_deploy_github_pages [EXTRACTED 1.00]
- **Portfolio Project Governed by Skills and Deployment Workflow** — claude_md_portfolio_project, claude_md_deployment_workflow, claude_md_i18n_system [EXTRACTED 1.00]

## Communities (22 total, 5 thin omitted)

### Community 0 - "Dev Dependencies"
Cohesion: 0.07
Nodes (30): devDependencies, autoprefixer, conventional-changelog-atom, eslint, eslint-config-prettier, eslint-plugin-prettier, eslint-plugin-vue, lint-staged (+22 more)

### Community 1 - "English Locales"
Cohesion: 0.15
Nodes (12): about, cv, download, read, error, back_home, generic, page_not_found (+4 more)

### Community 2 - "French Locales"
Cohesion: 0.15
Nodes (12): about, cv, download, read, error, back_home, generic, page_not_found (+4 more)

### Community 3 - "CI/CD & Public Assets"
Cohesion: 0.20
Nodes (11): Deploy Nuxt site to Pages Workflow, CI Build Job, CI Deploy Job, GitHub Pages Deployment Target, CV Maxime Jolivet Developpeur PDF, Maxime SVG Illustration, Open Graph Image - Maxime Jolivet, Nuxt 4 SSR Framework (+3 more)

### Community 4 - "Package Metadata"
Cohesion: 0.18
Nodes (10): author, engines, node, license, lint-staged, *.(json|js|ts|vue), name, private (+2 more)

### Community 5 - "Build Scripts"
Cohesion: 0.22
Nodes (9): scripts, build, deploy, dev, generate, lint, lintfix, postinstall (+1 more)

### Community 6 - "Claude Config & Skills"
Cohesion: 0.36
Nodes (8): Code Style Configuration, Deployment Workflow (develop → master → GitHub Pages), Non-Obvious Nuxt Gotchas, Portfolio Project (Nuxt 4 SSR), GitHub Actions Workflow, GitHub Pages Hosting, npm run deploy Command, deploy Skill

### Community 7 - "Nuxt Config & Routes"
Cohesion: 0.25
Nodes (6): cv, en, fr, home, en, fr

### Community 8 - "i18n & Translation Skill"
Cohesion: 0.83
Nodes (4): i18n Localization System, i18n/en.json Locale File, i18n/fr.json Locale File, add-translation Skill

## Knowledge Gaps
- **78 isolated node(s):** `PostToolUse`, `allow`, `welcome`, `about`, `read` (+73 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Dev Dependencies` to `Package Metadata`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `scripts` connect `Build Scripts` to `Package Metadata`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `PostToolUse`, `allow`, `welcome` to the rest of the system?**
  _80 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dev Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._