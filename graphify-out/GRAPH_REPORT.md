# Graph Report - .  (2026-07-01)

## Corpus Check
- Corpus is ~9,084 words - fits in a single context window. You may not need a graph.

## Summary
- 510 nodes · 518 edges · 69 communities (47 shown, 22 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 46 edges (avg confidence: 0.87)
- Token cost: 17,400 input · 7,600 output

## Community Hubs (Navigation)
- [[_COMMUNITY_EN i18n Core Keys|EN i18n Core Keys]]
- [[_COMMUNITY_FR i18n Core Keys|FR i18n Core Keys]]
- [[_COMMUNITY_EN Tech Stack Labels|EN Tech Stack Labels]]
- [[_COMMUNITY_FR Tech Stack Labels|FR Tech Stack Labels]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_Client Projects & Experience|Client Projects & Experience]]
- [[_COMMUNITY_UI Components & Animations|UI Components & Animations]]
- [[_COMMUNITY_Site Constants & Data|Site Constants & Data]]
- [[_COMMUNITY_EN About Section|EN About Section]]
- [[_COMMUNITY_FR About Section|FR About Section]]
- [[_COMMUNITY_Nuxt Config & Routes|Nuxt Config & Routes]]
- [[_COMMUNITY_Blog Data Layer|Blog Data Layer]]
- [[_COMMUNITY_EN Projects Section|EN Projects Section]]
- [[_COMMUNITY_FR Projects Section|FR Projects Section]]
- [[_COMMUNITY_Project Config & Docs|Project Config & Docs]]
- [[_COMMUNITY_EN Blog Translations|EN Blog Translations]]
- [[_COMMUNITY_FR Blog Translations|FR Blog Translations]]
- [[_COMMUNITY_CICD Pipeline|CI/CD Pipeline]]
- [[_COMMUNITY_Blog Feature|Blog Feature]]
- [[_COMMUNITY_Scroll Animation Composables|Scroll Animation Composables]]
- [[_COMMUNITY_CMS Skills|CMS Skills]]
- [[_COMMUNITY_Personal Brand|Personal Brand]]
- [[_COMMUNITY_Deployment Skill|Deployment Skill]]
- [[_COMMUNITY_Claude Code Hooks|Claude Code Hooks]]
- [[_COMMUNITY_Claude Code Permissions|Claude Code Permissions]]
- [[_COMMUNITY_Social Links|Social Links]]
- [[_COMMUNITY_Cloud & DevOps Skills|Cloud & DevOps Skills]]
- [[_COMMUNITY_Version Control Skills|Version Control Skills]]
- [[_COMMUNITY_Frontend Frameworks|Frontend Frameworks]]
- [[_COMMUNITY_GSAP Plugin|GSAP Plugin]]
- [[_COMMUNITY_CV Documents|CV Documents]]
- [[_COMMUNITY_Early Education|Early Education]]
- [[_COMMUNITY_Tech School|Tech School]]
- [[_COMMUNITY_Higher Education|Higher Education]]
- [[_COMMUNITY_Code Quality Tools|Code Quality Tools]]
- [[_COMMUNITY_Design Tools|Design Tools]]
- [[_COMMUNITY_BaaS Platforms|BaaS Platforms]]
- [[_COMMUNITY_Core Languages|Core Languages]]
- [[_COMMUNITY_Career Roles|Career Roles]]
- [[_COMMUNITY_Server TypeScript Config|Server TypeScript Config]]
- [[_COMMUNITY_Root TypeScript Config|Root TypeScript Config]]
- [[_COMMUNITY_Package Manifest|Package Manifest]]
- [[_COMMUNITY_Home Page Concept|Home Page Concept]]
- [[_COMMUNITY_Projects Page Concept|Projects Page Concept]]
- [[_COMMUNITY_Favicon|Favicon]]
- [[_COMMUNITY_Server Config|Server Config]]
- [[_COMMUNITY_TypeScript Root|TypeScript Root]]

## God Nodes (most connected - your core abstractions)
1. `Maxime Jolivet` - 50 edges
2. `aboutSection` - 12 edges
3. `aboutSection` - 12 edges
4. `categories` - 10 edges
5. `blog` - 10 edges
6. `categories` - 10 edges
7. `blog` - 10 edges
8. `scripts` - 10 edges
9. `hero` - 8 edges
10. `sectors` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Add Translation Skill` --conceptually_related_to--> `i18n URL Prefix Strategy`  [INFERRED]
  .claude/skills/add-translation/SKILL.md → nuxt.config.ts
- `CLAUDE.md Project Documentation` --rationale_for--> `CSP Nonce Security Policy`  [INFERRED]
  CLAUDE.md → nuxt.config.ts
- `CLAUDE.md Project Documentation` --rationale_for--> `PDF.js Vite Optimization Exclusion`  [INFERRED]
  CLAUDE.md → nuxt.config.ts
- `resolveIcon Utility` --shares_data_with--> `TechItem`  [INFERRED]
  utils/resolveIcon.ts → types/content.types.ts
- `Open Graph Image - Maxime Jolivet` --conceptually_related_to--> `Portfolio README - Maxime Jolivet Nuxt 4 SSR`  [INFERRED]
  /Users/maxime/Sites/portfolio/public/open-graph-maximejolivet.jpg → /Users/maxime/Sites/portfolio/README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Deploy Pipeline (skill + npm command + GitHub Actions + GitHub Pages)** - skill_deploy_skill, skill_deploy_github_actions, skill_deploy_github_pages [EXTRACTED 1.00]
- **Nuxt CI/CD GitHub Pages Pipeline** - nuxtjs_workflow, nuxtjs_workflow_build_job, nuxtjs_workflow_deploy_job, nuxtjs_workflow_github_pages [EXTRACTED 1.00]
- **Animation Component System (gradient bg, magnetic button, scroll reveal)** - animations_animatedgradientbg, animations_magneticbutton, animations_scrollreveal [INFERRED 0.95]
- **Persistent Page Shell (app root, header, footer)** - app, layout_appheader, layout_appfooter [INFERRED 0.95]
- **Scroll-Driven Entrance Animation Pattern (all page sections using ScrollReveal)** - sections_herosection, sections_aboutsection, sections_projectssection, sections_techstacksection, sections_pageintro [EXTRACTED 1.00]
- **GSAP scroll animation system** -  [INFERRED 0.95]
- **Supabase blog data access layer** -  [EXTRACTED 1.00]
- **i18n bilingual translation system** -  [EXTRACTED 1.00]
- **PDF.js custom element integration: dynamic import in client plugin, excluded from Vite optimization, rendered in CV page** - plugins_pdfjs_viewer_client_plugin, nuxt_config_pdfjs_vite_exclusion, pages_cv_page [INFERRED 0.85]
- **i18n routing and key management: prefix strategy in nuxt config drives route definitions in routes.json, managed by add-translation skill** - nuxt_config_i18n_prefix_strategy, routes_i18n_config, claude_skills_add_translation_skill_doc [INFERRED 0.85]
- **Supabase blog data layer: useArticle and useArticles composables tested with mocked SupabaseClient in parallel spec files** - composables_usearticle_composable, test_usearticle_spec_suite, test_usearticles_spec_suite [INFERRED 0.85]

## Communities (69 total, 22 thin omitted)

### Community 0 - "EN i18n Core Keys"
Cohesion: 0.05
Nodes (43): a11y, skipToContent, about, construction, message, cv, download, read (+35 more)

### Community 1 - "FR i18n Core Keys"
Cohesion: 0.05
Nodes (43): a11y, skipToContent, about, construction, message, cv, download, read (+35 more)

### Community 2 - "EN Tech Stack Labels"
Cohesion: 0.06
Nodes (33): description, label, backend, cms, database, devops, frontend, languages (+25 more)

### Community 3 - "FR Tech Stack Labels"
Cohesion: 0.06
Nodes (33): description, label, backend, cms, database, devops, frontend, languages (+25 more)

### Community 4 - "Dev Dependencies"
Cohesion: 0.06
Nodes (33): devDependencies, autoprefixer, conventional-changelog-atom, eslint, eslint-config-prettier, eslint-plugin-prettier, eslint-plugin-vue, @iconify-json/logos (+25 more)

### Community 5 - "Runtime Dependencies"
Cohesion: 0.08
Nodes (25): author, dependencies, gsap, motion-v, @nuxt/image, @supabase/supabase-js, engines, node (+17 more)

### Community 6 - "Client Projects & Experience"
Cohesion: 0.09
Nodes (24): Bootstrap, Centre Hospitalier Simone Veil, Don Jigi Fest, Gingerminds, Google Analytics, Google Cloud, Greentech, IA & Automatisation (+16 more)

### Community 8 - "Site Constants & Data"
Cohesion: 0.15
Nodes (13): CLIENT_SECTORS, NAV_ITEMS, TECH_CATEGORIES, ClientSector, Content Type Interfaces, NavItem, TechCategory, TechItem (+5 more)

### Community 9 - "EN About Section"
Cohesion: 0.11
Nodes (18): aboutSection, eyebrow, highlight1, highlight2, highlight3, imageAlt, paragraph1, paragraph2 (+10 more)

### Community 10 - "FR About Section"
Cohesion: 0.11
Nodes (18): aboutSection, eyebrow, highlight1, highlight2, highlight3, imageAlt, paragraph1, paragraph2 (+10 more)

### Community 11 - "Nuxt Config & Routes"
Cohesion: 0.12
Nodes (15): blog, en, fr, blog-slug, en, fr, cv, en (+7 more)

### Community 12 - "Blog Data Layer"
Cohesion: 0.21
Nodes (8): Article, fetchArticle(), useArticle(), ArticleSummary, fetchArticles(), useArticles(), useSupabase(), Supabase singleton client pattern

### Community 13 - "EN Projects Section"
Cohesion: 0.15
Nodes (13): projectsSection, eyebrow, sectors, titleEnd, titleHighlight, titleStart, agriculture, construction (+5 more)

### Community 14 - "FR Projects Section"
Cohesion: 0.15
Nodes (13): projectsSection, eyebrow, sectors, titleEnd, titleHighlight, titleStart, agriculture, construction (+5 more)

### Community 15 - "Project Config & Docs"
Cohesion: 0.20
Nodes (11): CLAUDE.md Project Documentation, Add Translation Skill, Nuxt Configuration, CSP Nonce Security Policy, i18n URL Prefix Strategy, PDF.js Vite Optimization Exclusion, Supabase Runtime Config (Public Keys), CV Page (+3 more)

### Community 16 - "EN Blog Translations"
Cohesion: 0.20
Nodes (10): blog, back, back_to_list, empty, error, loading, not_found, read_more (+2 more)

### Community 17 - "FR Blog Translations"
Cohesion: 0.20
Nodes (10): blog, back, back_to_list, empty, error, loading, not_found, read_more (+2 more)

### Community 18 - "CI/CD Pipeline"
Cohesion: 0.22
Nodes (10): Deploy Nuxt site to Pages Workflow, CI Build Job, CI Deploy Job, GitHub Pages Deployment Target, Maxime SVG Illustration, Open Graph Image - Maxime Jolivet, Nuxt 4 SSR Framework, Portfolio README - Maxime Jolivet Nuxt 4 SSR (+2 more)

### Community 19 - "Blog Feature"
Cohesion: 0.33
Nodes (7): useArticle Composable, useArticles Composable, Blog Index Page, Blog Article Detail Page, useArticle Test Suite, useArticles Test Suite, Vitest Configuration

### Community 20 - "Scroll Animation Composables"
Cohesion: 0.33
Nodes (5): ParallaxOptions, useParallax(), ScrollRevealOptions, useScrollReveal(), prefers-reduced-motion accessibility pattern

### Community 22 - "CMS Skills"
Cohesion: 0.50
Nodes (4): Drupal, Drupal Développeur Back-End Certification, Trained People, WordPress

### Community 23 - "Personal Brand"
Cohesion: 0.67
Nodes (4): Maxime Jolivet - Person, Personal Brand - Approachable Creative Professional, Maxime Jolivet - Professional Headshot, Presentation Style - Casual-Professional, Warm Studio Setting

### Community 24 - "Deployment Skill"
Cohesion: 0.50
Nodes (4): GitHub Actions Workflow, GitHub Pages Hosting, npm run deploy Command, deploy Skill

### Community 28 - "Cloud & DevOps Skills"
Cohesion: 0.67
Nodes (3): Cloud & DevOps, Docker, Vercel

### Community 29 - "Version Control Skills"
Cohesion: 0.67
Nodes (3): Git, GitHub, GitLab

### Community 30 - "Frontend Frameworks"
Cohesion: 0.67
Nodes (3): Nuxt, React, Vue.js

## Knowledge Gaps
- **304 isolated node(s):** `PostToolUse`, `allow`, `isExternal`, `ParallaxOptions`, `ScrollRevealOptions` (+299 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **22 thin communities (<3 nodes) omitted from report** - run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `techSection` connect `EN Tech Stack Labels` to `EN i18n Core Keys`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `techSection` connect `FR Tech Stack Labels` to `FR i18n Core Keys`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `PostToolUse`, `allow`, `isExternal` to the rest of the system?**
  _305 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `EN i18n Core Keys` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `FR i18n Core Keys` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `EN Tech Stack Labels` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `FR Tech Stack Labels` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._