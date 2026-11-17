# Identité de marque — Maxime Jolivet, Développeur Web

**🇫🇷 Par où commencer :** Dev → [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) · Design → [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md) · Contenu → [BRAND_VOICE.md](./BRAND_VOICE.md)
**🇬🇧 Start here:** Dev → [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) · Design → [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md) · Content → [BRAND_VOICE.md](./BRAND_VOICE.md)

---

## 🇫🇷 Français

> Cette doc **formalise l'identité visuelle déjà codée** — aucune nouvelle direction créative. Elle rend explicites les décisions existantes pour que design, marketing et dev les appliquent de façon cohérente.

### Par rôle

| Équipe                | Lire d'abord                              | Puis                                                                               |
| --------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------- |
| **Développement**     | `DESIGN_SYSTEM.md` (tokens CSS copiables) | `COLOR_PALETTE.md`, `TYPOGRAPHY.md`                                                |
| **Design**            | `BRAND_GUIDELINES.md`                     | `COLOR_PALETTE.md`, `TYPOGRAPHY.md`, `LOGO.md`, `ICONOGRAPHY.md`, `PHOTOGRAPHY.md` |
| **Marketing/Contenu** | `BRAND_VOICE.md`                          | `AI_PROMPTS.md` (visuels), `ASSETS.md` (inventaire)                                |

### L'identité en 5 lignes

| Élément           | Résumé                                                                                                                     | Détail                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **Logo**          | Monogramme "M" en chevrons de code, inscrit dans un cercle organique, monochrome (`currentColor`)                          | [LOGO.md](./LOGO.md)                   |
| **Couleurs**      | Fond neutre chaud (crème jour / bleu-nuit nuit) + deux couleurs de marque fixes : **gold `#EFC78A`** et **mint `#7FD9C4`** | [COLOR_PALETTE.md](./COLOR_PALETTE.md) |
| **Typographie**   | **Space Grotesk** (titres, corps de texte) + **JetBrains Mono** (badges, métadonnées, données)                             | [TYPOGRAPHY.md](./TYPOGRAPHY.md)       |
| **Formes**        | `rounded-full` pour les actions, `rounded-2xl` pour le contenu, bordures fines plutôt qu'ombres                            | [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) |
| **Ton éditorial** | Direct, factuel, anti-jargon marketing, preuve plutôt que promesse                                                         | [BRAND_VOICE.md](./BRAND_VOICE.md)     |

### Les fichiers

12 fichiers autonomes, bilingues FR/EN, liés entre eux. Chacun est la seule source de vérité pour son sujet (aucune duplication).

**Fondations**

| Fichier                                        | Utile pour                                                                         |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| [`BRAND_GUIDELINES.md`](./BRAND_GUIDELINES.md) | Comprendre le _pourquoi_ : ADN, positionnement, personnalité, principes graphiques |
| [`BRAND_VOICE.md`](./BRAND_VOICE.md)           | Rédiger un texte (UI, email, réseaux sociaux) dans le bon ton                      |
| [`MOODBOARD.md`](./MOODBOARD.md)               | S'imprégner de l'ambiance avant une exploration créative                           |

**Implémentation**

| Fichier                                  | Utile pour                                                                          |
| ---------------------------------------- | ----------------------------------------------------------------------------------- |
| [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) | Construire un composant UI : grid, spacing, radius, boutons, cards, états           |
| [`COLOR_PALETTE.md`](./COLOR_PALETTE.md) | Implémenter des couleurs : tokens CSS, HEX/RGB/HSL/CMYK, contrastes d'accessibilité |
| [`TYPOGRAPHY.md`](./TYPOGRAPHY.md)       | Implémenter du texte : polices, échelle de tailles, hiérarchie complète             |
| [`ICONOGRAPHY.md`](./ICONOGRAPHY.md)     | Choisir/styler une icône : style Lucide, tailles, couleurs                          |

**Production visuelle**

| Fichier                              | Utile pour                                                            |
| ------------------------------------ | --------------------------------------------------------------------- |
| [`LOGO.md`](./LOGO.md)               | Utiliser ou décliner le logo : construction, variantes, interdictions |
| [`PHOTOGRAPHY.md`](./PHOTOGRAPHY.md) | Produire ou sélectionner une photo : style, cadrage, lumière          |
| [`AI_PROMPTS.md`](./AI_PROMPTS.md)   | Générer un visuel avec une IA (logo, UI, print, social)               |
| [`ASSETS.md`](./ASSETS.md)           | Savoir ce qui existe déjà et ce qui reste à produire                  |

### Vision, mission, valeurs

- **Vision** — Un développeur senior qui prouve son expertise par le travail plutôt que par la déclaration : un portfolio qui sert d'étude de cas vivante — code rigoureux, interfaces pensées, présentation honnête et sans esbroufe.
- **Mission** — Donner à un décideur B2B (mission) ou un recruteur (profil senior), en dix minutes de visite, une preuve concrète et vérifiable des compétences de Maxime Jolivet en développement web (PHP, JavaScript, Drupal, WordPress) et en conception d'interfaces.
- **Positionnement** — **"Le développeur senior qui pense produit, pas seulement code."** Détail : [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md#positionnement).

| Valeur              | Ce qu'elle signifie concrètement                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Rigueur**         | Code de qualité, choix techniques pérennes, accessibilité et performance non négociables                                             |
| **Honnêteté**       | Placeholders explicites, statut "en construction" assumé, aucune sur-promesse                                                        |
| **Sobriété**        | Palette et typographie disciplinées, pas de décoration gratuite, site indexable, mais projets clients (`pro`) en `noindex, nofollow` |
| **Sens du produit** | UI/UX pensée au même niveau que le code — pas un développeur qui exécute une maquette, un développeur qui la conçoit                 |

### Méthode

- Produite par audit du code réel (`assets/css/main.css`, `components/ui/*`, `i18n/locales/*.json`, `nuxt.config.ts`), pas par un exercice de branding _ex nihilo_.
- Chaque règle est traçable à une implémentation existante.
- Exceptions : les recommandations pour du contenu pas encore codé (inputs, modales, alertes) sont marquées comme telles dans [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).

---

## 🇬🇧 English

> This doc **formalizes the visual identity already in the code** — no new creative direction. It makes existing decisions explicit so design, marketing and dev apply them consistently.

### By role

| Team                  | Read first                               | Then                                                                               |
| --------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------- |
| **Development**       | `DESIGN_SYSTEM.md` (copyable CSS tokens) | `COLOR_PALETTE.md`, `TYPOGRAPHY.md`                                                |
| **Design**            | `BRAND_GUIDELINES.md`                    | `COLOR_PALETTE.md`, `TYPOGRAPHY.md`, `LOGO.md`, `ICONOGRAPHY.md`, `PHOTOGRAPHY.md` |
| **Marketing/Content** | `BRAND_VOICE.md`                         | `AI_PROMPTS.md` (visuals), `ASSETS.md` (inventory)                                 |

### The identity in 5 lines

| Element            | Summary                                                                                                                   | Detail                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **Logo**           | "M" monogram built from code chevrons, set inside an organic circle, monochrome (`currentColor`)                          | [LOGO.md](./LOGO.md)                   |
| **Colors**         | Warm neutral background (cream day / deep navy night) + two fixed brand colors: **gold `#EFC78A`** and **mint `#7FD9C4`** | [COLOR_PALETTE.md](./COLOR_PALETTE.md) |
| **Typography**     | **Space Grotesk** (headings, body copy) + **JetBrains Mono** (badges, metadata, data)                                     | [TYPOGRAPHY.md](./TYPOGRAPHY.md)       |
| **Shapes**         | `rounded-full` for actions, `rounded-2xl` for content, thin borders over shadows                                          | [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) |
| **Editorial tone** | Direct, factual, anti marketing-jargon, proof over promise                                                                | [BRAND_VOICE.md](./BRAND_VOICE.md)     |

### The files

12 standalone files, bilingual FR/EN, cross-linked. Each is the single source of truth for its subject (no duplication).

**Foundations**

| File                                           | Useful for                                                                 |
| ---------------------------------------------- | -------------------------------------------------------------------------- |
| [`BRAND_GUIDELINES.md`](./BRAND_GUIDELINES.md) | Understanding the _why_: DNA, positioning, personality, graphic principles |
| [`BRAND_VOICE.md`](./BRAND_VOICE.md)           | Writing copy (UI, email, social) in the right tone                         |
| [`MOODBOARD.md`](./MOODBOARD.md)               | Absorbing the general mood before a creative exploration                   |

**Implementation**

| File                                     | Useful for                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------------- |
| [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) | Building a UI component: grid, spacing, radius, buttons, cards, states     |
| [`COLOR_PALETTE.md`](./COLOR_PALETTE.md) | Implementing colors: CSS tokens, HEX/RGB/HSL/CMYK, accessibility contrasts |
| [`TYPOGRAPHY.md`](./TYPOGRAPHY.md)       | Implementing text: fonts, size scale, full hierarchy                       |
| [`ICONOGRAPHY.md`](./ICONOGRAPHY.md)     | Choosing/styling an icon: Lucide style, sizes, colors                      |

**Visual production**

| File                                 | Useful for                                                       |
| ------------------------------------ | ---------------------------------------------------------------- |
| [`LOGO.md`](./LOGO.md)               | Using or adapting the logo: construction, variants, restrictions |
| [`PHOTOGRAPHY.md`](./PHOTOGRAPHY.md) | Producing or selecting a photo: style, framing, lighting         |
| [`AI_PROMPTS.md`](./AI_PROMPTS.md)   | Generating a visual with AI (logo, UI, print, social)            |
| [`ASSETS.md`](./ASSETS.md)           | Knowing what already exists and what's left to produce           |

### Vision, mission, values

- **Vision** — A senior developer who proves his expertise through work rather than claims: a portfolio that works as a living case study — rigorous code, thoughtful interfaces, honest and unpretentious presentation.
- **Mission** — Give a B2B decision-maker (mission) or a recruiter (senior profile), within a ten-minute visit, concrete and verifiable proof of Maxime Jolivet's web development skills (PHP, JavaScript, Drupal, WordPress) and interface design sensibility.
- **Positioning** — **"The senior developer who thinks product, not just code."** Detail: [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md#positioning).

| Value             | What it means in practice                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Rigor**         | Quality code, durable technical choices, non-negotiable accessibility and performance                                         |
| **Honesty**       | Explicit placeholders, an openly stated "under construction" status, no overpromising                                         |
| **Sobriety**      | Disciplined palette and typography, no gratuitous decoration, site indexable, but client (`pro`) projects `noindex, nofollow` |
| **Product sense** | UI/UX considered at the same level as code — not a developer who executes a mockup, one who designs it                        |

### Method

- Produced by auditing the actual code (`assets/css/main.css`, `components/ui/*`, `i18n/locales/*.json`, `nuxt.config.ts`), not a from-scratch branding exercise.
- Every rule traces back to an existing implementation.
- Exceptions: recommendations for not-yet-built content (inputs, modals, alerts) are flagged as such in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).
