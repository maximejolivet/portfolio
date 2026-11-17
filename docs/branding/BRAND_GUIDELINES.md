# Charte graphique / Brand Guidelines

**🇫🇷 Avant de livrer un élément visuel : tokens sémantiques uniquement, vérifié en mode jour ET nuit, gold/mint réservés aux CTA/focus/statut.** · **🇬🇧 Before shipping a visual element: semantic tokens only, checked in day AND night mode, gold/mint reserved for CTA/focus/status.**

> Document stratégique. Application concrète / concrete application: [COLOR_PALETTE.md](./COLOR_PALETTE.md), [TYPOGRAPHY.md](./TYPOGRAPHY.md), [LOGO.md](./LOGO.md), [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md). Ton / tone: [BRAND_VOICE.md](./BRAND_VOICE.md).

---

## 🇫🇷 Français

### Les 5 principes graphiques

1. **Deux couleurs de marque fixes** (gold, mint), jamais inversées entre jour et nuit — la seule constante visuelle absolue.
2. **Deux polices, pas trois** — Space Grotesk = propos, JetBrains Mono = données, jamais interchangeables.
3. **Actions rondes, contenus arrondis** — `rounded-full` pour ce qui s'actionne, `rounded-2xl` pour ce qui se lit.
4. **Bordures plutôt qu'ombres** — l'ombre est réservée à l'élévation réelle (éléments flottants).
5. **Honnêteté visuelle** — un placeholder dit qu'il est un placeholder ; un site en construction le dit.

### Checklist avant livraison

- [ ] Tokens sémantiques (`bg-primary`, `text-muted-foreground`), jamais de couleur codée en dur — [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- [ ] Rendu vérifié en mode jour **et** nuit
- [ ] Gold et mint seulement sur ce qui compte (CTA, focus, statut) — leur rareté leur donne du poids
- [ ] Chaque affirmation forte (expertise, expérience) adossée à un élément concret (étude de cas, stack, CV)

### À éviter

**Visuel**

- ❌ Une troisième couleur de marque ou un dégradé décoratif.
- ❌ Mélanger angles droits et arrondis sur un même type d'élément.
- ❌ Multiplier les emoji — un seul usage assumé (🚧), voir [ICONOGRAPHY.md](./ICONOGRAPHY.md).

**Technique & ton**

- ❌ Réintroduire une lib d'animation (GSAP, motion-v retirées exprès — voir `CLAUDE.md`). CSS natif.
- ❌ Ton marketing gonflé ("révolutionnaire", "disruptif") — voir [BRAND_VOICE.md](./BRAND_VOICE.md).
- ❌ Sortir le site de sa sobriété volontaire (pas de recherche de reach maximal ; le travail client reste en `noindex, nofollow`).

### ADN

Maxime Jolivet : développeur web full-stack senior, 10 ans d'expérience (surtout en agence digitale), expert Drupal et WordPress, solide en PHP et JavaScript modernes. Un développeur qui **pense expérience utilisateur, pas juste code** — l'UI/UX fait partie de sa pratique.

1. **Rigueur technique** — code de qualité, choix pérennes, accessibilité, performance.
2. **Sens du design** — concevoir, pas seulement exécuter une maquette.
3. **Sobriété assumée** — pas de sur-promesse, pas de jargon marketing, le travail parle.

### Positionnement

**"Le développeur senior qui pense produit, pas seulement code."** Ni agence, ni simple exécutant : un profil hybride dev/design, du cadrage à la maintenance long terme.

- **Expertise CMS pointue** (Drupal, WordPress) sur des projets B2B complexes — un créneau précis, pas un généraliste vague.
- **Orientation durée** — "pérennité des choix techniques" vient du bio original : une conviction, pas un mot-clé ajouté.
- **Sensibilité UI/UX** en plus du code — rare chez les profils backend/CMS.

### Objectifs

1. Prouver (études de cas, stack réelle, 10 ans d'expérience) plutôt que déclarer.
2. Se positionner senior polyvalent : technique (PHP/JS/Drupal/WordPress) + design (UI/UX).
3. Rassurer sur la fiabilité et la pérennité — différenciant pour des clients B2B échaudés par du code jetable.
4. Rester crédible pour un recruteur (salarié) comme pour un décideur B2B (freelance) — double lecture, pas double discours.

### Public cible

| Cible                                                          | Ce qu'elle cherche                                                                | Ce que le portfolio doit prouver                                                                               |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Décideurs techniques/marketing en agence ou entreprise B2B** | Un développeur senior fiable pour une mission ou un projet complexe (souvent CMS) | Études de cas concrètes, stack maîtrisée, expérience longue                                                    |
| **Recruteurs / responsables techniques (poste salarié)**       | Un profil senior capable d'autonomie et de leadership technique                   | Parcours (5 postes, `ExperienceSection`), CV téléchargeable, stack complète (`TechStackSection`, 9 catégories) |

Le site ne tranche pas : il documente honnêtement un parcours, chaque visiteur y projette son besoin (mission ou embauche).

### Personnalité

| Trait                         | Se traduit par                                                                                                                                                                                           | Ne se traduit PAS par                               |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| **Rigoureux**                 | Code de qualité, palette et typo cohérentes partout, accessibilité pensée (contrastes, focus visibles)                                                                                                   | Rigidité visuelle, absence de personnalité          |
| **Chaleureux**                | Gold + mint, portrait souriant sur fond couleur de marque, formulations directes et personnelles ("Bonjour, moi c'est Maxime")                                                                           | Familiarité excessive, ton "startup fun" artificiel |
| **Technique sans être froid** | JetBrains Mono sur les métadonnées (clin d'œil constant au métier), logo en chevrons de code                                                                                                             | Jargon technique imposé au visiteur non-dev         |
| **Honnête**                   | Placeholders explicites ("capture - bientôt"), badge "site en construction 🚧", captures brutes sans mockup                                                                                              | Sur-promesse, mise en scène artificielle du travail |
| **Discret**                   | Site indexable, mais travail client confidentiel : projets `pro`, `/projets`, `/cv` en `noindex, nofollow`, logos clients hors recherche d'images — un support de conversation plutôt qu'une vitrine SEO | Recherche d'audience large                          |

### Univers graphique

- **Style** — minimalisme fonctionnel à touches chaleureuses. Fond neutre et discret ; le contenu porte le message ; gold et mint guident l'œil (CTA, focus, accents), jamais décoratifs.
- **Ambiance** — studio de dev senior, pas vitrine d'agence : sobre, net, un peu "terminal chic" (JetBrains Mono, curseur clignotant, points de statut) sans le cliché "hacker" noir/vert néon.
- **Palette** — fond neutre chaud (crème / encre profonde selon thème) + gold et mint comme accents ciblés, jamais mélangés décorativement ([COLOR_PALETTE.md](./COLOR_PALETTE.md)).
- **Formes** — cercles organiques (logo), radius généreux et cohérents (`rounded-2xl` cartes, `rounded-full` actions) — rien d'anguleux.
- **Densité** — sections aérées (`py-16`/`py-24`) ; la rigueur passe par la clarté, pas l'exhaustivité.

Typographie : duo Space Grotesk / JetBrains Mono, voir [TYPOGRAPHY.md](./TYPOGRAPHY.md).

---

## 🇬🇧 English

### The 5 graphic principles

1. **Two fixed brand colors** (gold, mint), never inverted between day and night — the one absolute visual constant.
2. **Two fonts, not three** — Space Grotesk = prose, JetBrains Mono = data, never interchangeable.
3. **Round actions, rounded content** — `rounded-full` for anything actionable, `rounded-2xl` for anything readable.
4. **Borders over shadows** — shadow is reserved for genuine elevation (floating elements).
5. **Visual honesty** — a placeholder says it's a placeholder; a site under construction says so.

### Pre-ship checklist

- [ ] Semantic tokens (`bg-primary`, `text-muted-foreground`), never hardcoded colors — [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- [ ] Rendering checked in day **and** night mode
- [ ] Gold and mint only on what matters (CTA, focus, status) — scarcity gives them weight
- [ ] Every strong claim (expertise, experience) backed by something concrete (case study, stack, CV)

### Avoid

**Visual**

- ❌ A third brand color or a decorative gradient.
- ❌ Mixing sharp and rounded corners on the same element type.
- ❌ Multiplying emoji — one deliberate use (🚧), see [ICONOGRAPHY.md](./ICONOGRAPHY.md).

**Tech & tone**

- ❌ Reintroducing an animation library (GSAP, motion-v removed on purpose — see `CLAUDE.md`). Native CSS.
- ❌ Inflated marketing tone ("revolutionary", "disruptive") — see [BRAND_VOICE.md](./BRAND_VOICE.md).
- ❌ Pulling the site out of its deliberate sobriety (no maximum-reach strategy; client work stays `noindex, nofollow`).

### DNA

Maxime Jolivet: senior full-stack web developer, 10 years of experience (mostly in digital agencies), Drupal and WordPress expert, solid in modern PHP and JavaScript. A developer who **thinks user experience, not just code** — UI/UX is part of his core practice.

1. **Technical rigor** — quality code, durable choices, accessibility, performance.
2. **Design sensibility** — designs, doesn't just execute a mockup.
3. **Deliberate sobriety** — no overpromising, no marketing jargon, the work speaks.

### Positioning

**"The senior developer who thinks product, not just code."** Neither an agency nor a pure executor: a hybrid dev/design profile, from scoping to long-term maintenance.

- **Sharp CMS expertise** (Drupal, WordPress) on complex B2B projects — a precise niche, not a vague generalist.
- **Durability-oriented** — "the durability of technical choices" comes from the original bio: a conviction, not a bolted-on keyword.
- **UI/UX sensibility** on top of code — rare among backend/CMS profiles.

### Objectives

1. Prove (case studies, real stack, 10 years of experience) rather than claim.
2. Position as a versatile senior: technical (PHP/JS/Drupal/WordPress) + design (UI/UX).
3. Reassure on reliability and durability — a differentiator for B2B clients burned by throwaway code.
4. Stay credible for a recruiter (salaried) and a B2B decision-maker (freelance) — dual reading, no double discourse.

### Target audience

| Audience                                                            | What they're looking for                                                 | What the portfolio must prove                                                                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Technical/marketing decision-makers at an agency or B2B company** | A reliable senior developer for a complex mission or project (often CMS) | Concrete case studies, mastered stack, long track record                                                             |
| **Recruiters / technical managers (salaried role)**                 | A senior profile capable of autonomy and technical leadership            | Career path (5 roles, `ExperienceSection`), downloadable CV, full stack breakdown (`TechStackSection`, 9 categories) |

The site doesn't pick a side: it honestly documents a career, each visitor projects their own need (mission or hire).

### Personality

| Trait                            | Translates into                                                                                                                                                                                           | Does NOT translate into                              |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Rigorous**                     | Quality code, palette and type consistent everywhere, accessibility built in (contrasts, visible focus)                                                                                                   | Visual rigidity, lack of personality                 |
| **Warm**                         | Gold + mint, smiling portrait on brand-color background, direct and personal phrasing ("Hi, I'm Maxime")                                                                                                  | Excessive familiarity, artificial "startup fun" tone |
| **Technical without being cold** | JetBrains Mono on metadata (a constant nod to the trade), logo built from code chevrons                                                                                                                   | Technical jargon imposed on non-dev visitors         |
| **Honest**                       | Explicit placeholders ("capture coming soon"), "site under construction 🚧" badge, raw captures with no mockup staging                                                                                    | Overpromising, artificially staging the work         |
| **Discreet**                     | Site indexable, but client work stays confidential: `pro` projects, `/projects`, `/cv` set to `noindex, nofollow`, client logos kept out of image search — a conversation aid rather than an SEO showcase | Chasing broad reach                                  |

### Visual world

- **Style** — functional minimalism with warm touches. Neutral, discreet background; content carries the message; gold and mint guide the eye (CTA, focus, accents), never decorate.
- **Mood** — a senior dev's studio, not an agency showcase: sober, clean, a touch "terminal chic" (JetBrains Mono, blinking cursor, status dots) without the black/neon-green "hacker" cliché.
- **Palette** — warm neutral background (cream / deep ink by theme) + gold and mint as targeted accents, never mixed decoratively ([COLOR_PALETTE.md](./COLOR_PALETTE.md)).
- **Shapes** — organic circles (logo), generous consistent radii (`rounded-2xl` cards, `rounded-full` actions) — nothing angular.
- **Density** — airy sections (`py-16`/`py-24`); rigor through clarity, not exhaustiveness.

Typography: the Space Grotesk / JetBrains Mono duo, see [TYPOGRAPHY.md](./TYPOGRAPHY.md).
