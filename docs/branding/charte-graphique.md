# Charte graphique / Brand Guidelines

> Document stratégique de référence. Pour l'application concrète des règles ci-dessous, voir [palette-couleurs.md](./palette-couleurs.md), [typographie.md](./typographie.md), [logo.md](./logo.md), [design-system.md](./design-system.md). Pour le ton éditorial, voir [brand-voice.md](./brand-voice.md).

---

## 🇫🇷 Français

### ADN de la marque

Maxime Jolivet est développeur web full-stack senior (10 ans d'expérience, principalement en agence digitale), expert Drupal et WordPress, solide en PHP et JavaScript modernes. Son portfolio personnel est la vitrine de ce positionnement : un développeur qui **pense expérience utilisateur, pas juste code** — la conception d'interfaces (UI/UX) fait partie intégrante de sa pratique, pas une compétence annexe.

L'ADN se résume en trois idées :

1. **La rigueur technique** — code de qualité, choix pérennes, accessibilité, performance.
2. **Le sens du design** — un développeur qui sait aussi concevoir, pas seulement exécuter une maquette.
3. **La sobriété assumée** — pas de sur-promesse, pas de jargon marketing, le travail parle.

### Objectifs

- Démontrer par la preuve (études de cas, stack technique réelle, 10 ans d'expérience) plutôt que par la déclaration.
- Se positionner comme un profil senior polyvalent : à la fois technique (PHP/JS/Drupal/WordPress) et sensible au design (UI/UX).
- Rassurer sur la fiabilité et la pérennité des choix techniques — un critère différenciant pour des clients B2B qui ont déjà été échaudés par du code jetable.
- Rester crédible aussi bien pour un recruteur (poste salarié) que pour un décideur B2B (mission freelance) — double lecture sans double discours.

### Positionnement

**"Le développeur senior qui pense produit, pas seulement code."** Ni une agence, ni un simple exécutant technique : un profil hybride dev/design, capable de tenir un projet du cadrage jusqu'à la maintenance long terme. Le positionnement se distingue par :

- **Expertise CMS pointue** (Drupal, WordPress) sur des projets B2B complexes — un créneau technique précis, pas un généraliste vague.
- **Approche orientée durée** — "pérennité des choix techniques" est une expression du bio original, pas un mot-clé ajouté après coup : c'est une vraie conviction professionnelle.
- **Sensibilité UI/UX** en plus du code — rare chez les profils purement backend/CMS.

### Public cible

| Cible | Ce qu'elle cherche | Ce que le portfolio doit prouver |
|---|---|---|
| **Décideurs techniques/marketing en agence ou entreprise B2B** | Un développeur senior fiable pour une mission ou un projet complexe (souvent CMS) | Études de cas concrètes, stack maîtrisée, expérience longue |
| **Recruteurs / responsables techniques (poste salarié)** | Un profil senior capable d'autonomie et de leadership technique | Parcours (5 postes, `ExperienceSection`), CV téléchargeable, stack complète (`TechStackSection`, 9 catégories) |

Le site ne tranche pas entre les deux cibles — il documente honnêtement un parcours et laisse chaque visiteur y projeter son propre besoin (mission ou embauche).

### Personnalité de marque

| Trait | Se traduit par | Ne se traduit PAS par |
|---|---|---|
| **Rigoureux** | Code den qualité, palette et typo cohérentes partout, accessibilité pensée (contrastes, focus visibles) | Rigidité visuelle, absence de personnalité |
| **Chaleureux** | Gold + mint, portrait souriant sur fond couleur de marque, formulations directes et personnelles ("Bonjour, moi c'est Maxime") | Familiarité excessive, ton "startup fun" artificiel |
| **Technique sans être froid** | JetBrains Mono sur les métadonnées (clin d'œil constant au métier), logo en chevrons de code | Jargon technique imposé au visiteur non-dev |
| **Honnête** | Placeholders explicites ("capture - bientôt"), badge "site en construction 🚧", captures brutes sans mockup | Sur-promesse, mise en scène artificielle du travail |
| **Discret** | Site volontairement `noindex, nofollow` — pas une vitrine de visibilité SEO mais un support de conversation avec des interlocuteurs déjà en contact | Recherche d'audience large |

### Univers graphique

- **Palette** : un fond neutre chaud (crème/encre profonde selon le thème) porté par deux couleurs de marque fixes — gold et mint — jamais mélangées de façon décorative, toujours utilisées comme accents ciblés (voir [palette-couleurs.md](./palette-couleurs.md)).
- **Typographie** : duo Space Grotesk (propos) / JetBrains Mono (données), voir [typographie.md](./typographie.md).
- **Formes** : cercles organiques (logo), radius généreux et cohérents (`rounded-2xl` sur cartes, `rounded-full` sur actions) — rien d'anguleux ou de dur.
- **Densité** : sections aérées (`py-16`/`py-24`), pas de sur-densité d'information — la rigueur passe par la clarté, pas par l'exhaustivité visuelle.

### Style général

Minimalisme fonctionnel à touches chaleureuses. Le fond est neutre et discret pour laisser le contenu (études de cas, stack, expérience) porter le message ; le gold et le mint interviennent uniquement pour guider l'œil (CTA, focus, accents) — jamais pour décorer.

### Ambiance

Studio de développeur senior plutôt que vitrine d'agence : sobre, net, un peu "terminal chic" (JetBrains Mono, curseur clignotant, points de statut façon indicateur système) sans jamais tomber dans l'esthétique "hacker" clichée à fond noir/vert néon.

### Principes graphiques

1. **Deux couleurs de marque fixes** (gold, mint) qui ne s'inversent jamais entre thème jour/nuit — la seule constante visuelle absolue du système.
2. **Deux polices, pas trois** — chaque police a un rôle fixe (Space Grotesk = propos, JetBrains Mono = données), jamais interchangeables.
3. **Actions rondes, contenus arrondis-mais-carrés** — `rounded-full` pour tout ce qui s'actionne, `rounded-2xl` pour tout ce qui se lit.
4. **Bordures plutôt qu'ombres** pour la séparation de contenu — l'ombre est réservée à l'élévation réelle (éléments flottants).
5. **Honnêteté visuelle** — un placeholder dit qu'il est un placeholder, un site en construction le dit.

### Bonnes pratiques

- Toujours utiliser les tokens sémantiques (`bg-primary`, `text-muted-foreground`) plutôt que des couleurs codées en dur — voir [design-system.md](./design-system.md).
- Toujours vérifier le rendu en mode jour **et** nuit avant de valider un nouvel élément visuel.
- Réserver gold et mint aux moments qui comptent (CTA, focus, statut) — leur rareté est ce qui leur donne du poids.
- Garder le ton "preuve" : chaque affirmation forte (expertise, expérience) doit pouvoir être adossée à un élément concret du site (étude de cas, stack, CV).

### Ce qu'il faut éviter

- ❌ Ajouter une troisième couleur de marque ou un dégradé décoratif.
- ❌ Réintroduire une librairie d'animation (GSAP, motion-v ont été délibérément retirées — voir `CLAUDE.md`) — rester sur CSS natif.
- ❌ Utiliser un ton marketing gonflé ("révolutionnaire", "disruptif") — voir [brand-voice.md](./brand-voice.md) pour le ton réel attendu.
- ❌ Casser la règle radius (mélanger angles droits et arrondis sur un même type d'élément).
- ❌ Multiplier les emoji dans l'UI — un seul usage assumé actuellement (🚧), voir [iconographie.md](./iconographie.md).
- ❌ Sortir le site de sa sobriété volontaire (`noindex, nofollow` assumé, pas une recherche de reach maximal).

---

## 🇬🇧 English

### Brand DNA

Maxime Jolivet is a senior full-stack web developer (10 years of experience, mostly in digital agencies), a Drupal and WordPress expert, solid across modern PHP and JavaScript. His personal portfolio showcases that positioning: a developer who **thinks in terms of user experience, not just code** — UI/UX design is part of his core practice, not a side skill.

The DNA boils down to three ideas:

1. **Technical rigor** — quality code, durable choices, accessibility, performance.
2. **Design sensibility** — a developer who can also design, not just execute a mockup.
3. **Deliberate sobriety** — no overpromising, no marketing jargon, the work speaks.

### Objectives

- Prove through evidence (case studies, real tech stack, 10 years of experience) rather than through claims.
- Position as a versatile senior profile: both technical (PHP/JS/Drupal/WordPress) and design-sensitive (UI/UX).
- Reassure on reliability and long-term durability of technical choices — a differentiator for B2B clients who've already been burned by throwaway code.
- Stay credible for both a recruiter (salaried role) and a B2B decision-maker (freelance engagement) — a dual reading without a double discourse.

### Positioning

**"The senior developer who thinks product, not just code."** Neither an agency nor a pure technical executor: a hybrid dev/design profile, able to own a project from scoping through long-term maintenance. The positioning stands out through:

- **Sharp CMS expertise** (Drupal, WordPress) on complex B2B projects — a precise technical niche, not a vague generalist.
- **Durability-oriented approach** — "the durability of technical choices" is a phrase from the original bio, not a keyword bolted on afterward: it's a genuine professional conviction.
- **UI/UX sensibility** on top of code — rare among purely backend/CMS profiles.

### Target audience

| Audience | What they're looking for | What the portfolio must prove |
|---|---|---|
| **Technical/marketing decision-makers at an agency or B2B company** | A reliable senior developer for a complex mission or project (often CMS) | Concrete case studies, mastered stack, long track record |
| **Recruiters / technical managers (salaried role)** | A senior profile capable of autonomy and technical leadership | Career path (5 roles, `ExperienceSection`), downloadable CV, full stack breakdown (`TechStackSection`, 9 categories) |

The site doesn't pick a side between the two audiences — it honestly documents a career and lets each visitor project their own need onto it (mission or hire).

### Brand personality

| Trait | Translates into | Does NOT translate into |
|---|---|---|
| **Rigorous** | Quality code, palette and type consistent everywhere, accessibility built in (contrasts, visible focus) | Visual rigidity, lack of personality |
| **Warm** | Gold + mint, smiling portrait on brand-color background, direct and personal phrasing ("Hi, I'm Maxime") | Excessive familiarity, artificial "startup fun" tone |
| **Technical without being cold** | JetBrains Mono on metadata (a constant nod to the trade), logo built from code chevrons | Technical jargon imposed on non-dev visitors |
| **Honest** | Explicit placeholders ("capture coming soon"), "site under construction 🚧" badge, raw captures with no mockup staging | Overpromising, artificially staging the work |
| **Discreet** | Site deliberately set to `noindex, nofollow` — not an SEO visibility showcase but a conversation aid with people already in contact | Chasing broad reach |

### Visual world

- **Palette**: a warm neutral background (cream/deep ink depending on theme) carried by two fixed brand colors — gold and mint — never mixed decoratively, always used as targeted accents (see [palette-couleurs.md](./palette-couleurs.md)).
- **Typography**: the Space Grotesk (prose) / JetBrains Mono (data) duo, see [typographie.md](./typographie.md).
- **Shapes**: organic circles (logo), generous and consistent radii (`rounded-2xl` on cards, `rounded-full` on actions) — nothing angular or hard.
- **Density**: airy sections (`py-16`/`py-24`), no information over-density — rigor comes through clarity, not visual exhaustiveness.

### General style

Functional minimalism with warm touches. The background stays neutral and discreet so the content (case studies, stack, experience) carries the message; gold and mint appear only to guide the eye (CTA, focus, accents) — never to decorate.

### Mood

A senior developer's studio rather than an agency showcase: sober, clean, a touch "terminal chic" (JetBrains Mono, blinking cursor, system-indicator-style status dots) without ever tipping into the clichéd black/neon-green "hacker" aesthetic.

### Graphic principles

1. **Two fixed brand colors** (gold, mint) that never invert between day/night theme — the system's one absolute visual constant.
2. **Two fonts, not three** — each font has a fixed role (Space Grotesk = prose, JetBrains Mono = data), never interchangeable.
3. **Round actions, rounded-but-square content** — `rounded-full` for anything actionable, `rounded-2xl` for anything readable.
4. **Borders over shadows** for content separation — shadow is reserved for genuine elevation (floating elements).
5. **Visual honesty** — a placeholder says it's a placeholder, a site under construction says so.

### Best practices

- Always use semantic tokens (`bg-primary`, `text-muted-foreground`) rather than hardcoded colors — see [design-system.md](./design-system.md).
- Always check rendering in day **and** night mode before shipping a new visual element.
- Reserve gold and mint for moments that matter (CTA, focus, status) — their scarcity is what gives them weight.
- Keep the "proof" tone: every strong claim (expertise, experience) should be backed by something concrete on the site (case study, stack, CV).

### What to avoid

- ❌ Adding a third brand color or a decorative gradient.
- ❌ Reintroducing an animation library (GSAP, motion-v were deliberately removed — see `CLAUDE.md`) — stay on native CSS.
- ❌ Using inflated marketing tone ("revolutionary", "disruptive") — see [brand-voice.md](./brand-voice.md) for the expected real tone.
- ❌ Breaking the radius rule (mixing sharp and rounded corners on the same element type).
- ❌ Multiplying emoji across the UI — currently a single deliberate use (🚧), see [iconographie.md](./iconographie.md).
- ❌ Pulling the site out of its deliberate sobriety (`noindex, nofollow` is intentional, not a maximum-reach strategy).
