# Identité de marque — Maxime Jolivet, Développeur Web

> Documentation de marque du portfolio personnel de Maxime Jolivet, développeur web full-stack senior. Cette documentation **audite et formalise l'identité visuelle déjà implémentée dans le code** — elle n'introduit pas de nouvelle direction créative, elle rend explicites les décisions de design existantes pour qu'elles puissent être appliquées de façon cohérente par toute personne (design, marketing, développement) amenée à étendre le site ou produire des supports dérivés.

---

## 🇫🇷 Français

### Vision de la marque

Un développeur senior qui prouve son expertise par le travail plutôt que par la déclaration — un portfolio qui fonctionne comme une étude de cas vivante de ce qu'il produit : du code rigoureux, des interfaces pensées, une présentation honnête et sans esbroufe.

### Mission

Donner à un interlocuteur — décideur B2B cherchant une mission, ou recruteur évaluant un profil senior — une preuve concrète et vérifiable des compétences de Maxime Jolivet en développement web (PHP, JavaScript, Drupal, WordPress) et en conception d'interfaces, en dix minutes de visite.

### Valeurs

| Valeur              | Ce qu'elle signifie concrètement                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Rigueur**         | Code de qualité, choix techniques pérennes, accessibilité et performance non négociables                             |
| **Honnêteté**       | Placeholders explicites, statut "en construction" assumé, aucune sur-promesse                                        |
| **Sobriété**        | Palette et typographie disciplinées, pas de décoration gratuite, site volontairement `noindex, nofollow`             |
| **Sens du produit** | UI/UX pensée au même niveau que le code — pas un développeur qui exécute une maquette, un développeur qui la conçoit |

### Positionnement

**"Le développeur senior qui pense produit, pas seulement code."** Détail complet : [charte-graphique.md](./charte-graphique.md#positionnement).

### Résumé de l'identité graphique

| Élément           | Résumé                                                                                                                     | Détail                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Logo**          | Monogramme "M" en chevrons de code, inscrit dans un cercle organique, monochrome (`currentColor`)                          | [logo.md](./logo.md)                         |
| **Couleurs**      | Fond neutre chaud (crème jour / bleu-nuit nuit) + deux couleurs de marque fixes : **gold `#EFC78A`** et **mint `#7FD9C4`** | [palette-couleurs.md](./palette-couleurs.md) |
| **Typographie**   | **Space Grotesk** (titres, corps de texte) + **JetBrains Mono** (badges, métadonnées, données)                             | [typographie.md](./typographie.md)           |
| **Formes**        | `rounded-full` pour les actions, `rounded-2xl` pour le contenu, bordures fines plutôt qu'ombres                            | [design-system.md](./design-system.md)       |
| **Ton éditorial** | Direct, factuel, anti-jargon marketing, preuve plutôt que promesse                                                         | [brand-voice.md](./brand-voice.md)           |

### Comment utiliser cette documentation

Cette documentation est organisée en 12 fichiers autonomes, chacun bilingue FR/EN, avec des liens croisés vers les documents connexes. Aucune information n'est dupliquée entre les fichiers — chaque fichier est la source de vérité pour son sujet.

| Fichier                                        | Utile pour                                                                          |
| ---------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`charte-graphique.md`](./charte-graphique.md) | Comprendre le _pourquoi_ : ADN, positionnement, personnalité, principes graphiques  |
| [`palette-couleurs.md`](./palette-couleurs.md) | Implémenter des couleurs : tokens CSS, HEX/RGB/HSL/CMYK, contrastes d'accessibilité |
| [`typographie.md`](./typographie.md)           | Implémenter du texte : polices, échelle de tailles, hiérarchie complète             |
| [`logo.md`](./logo.md)                         | Utiliser ou décliner le logo : construction, variantes, interdictions               |
| [`iconographie.md`](./iconographie.md)         | Choisir/styler une icône : style Lucide, tailles, couleurs                          |
| [`photographie.md`](./photographie.md)         | Produire ou sélectionner une photo : style, cadrage, lumière                        |
| [`moodboard.md`](./moodboard.md)               | S'imprégner de l'ambiance générale avant une exploration créative                   |
| [`design-system.md`](./design-system.md)       | Construire un composant UI : grid, spacing, radius, boutons, cards, états           |
| [`prompts-ia.md`](./prompts-ia.md)             | Générer un visuel avec une IA (logo, UI, print, social)                             |
| [`assets.md`](./assets.md)                     | Savoir ce qui existe déjà et ce qui reste à produire                                |
| [`brand-voice.md`](./brand-voice.md)           | Rédiger un texte (UI, email, réseaux sociaux) dans le bon ton                       |

**Pour une équipe Design** : commencer par `charte-graphique.md` puis `palette-couleurs.md` / `typographie.md` / `logo.md` / `iconographie.md` / `photographie.md`.

**Pour une équipe Développement** : `design-system.md` en priorité (tokens CSS directement copiables), avec `palette-couleurs.md` et `typographie.md` en référence.

**Pour une équipe Marketing/Contenu** : `brand-voice.md` en priorité, `prompts-ia.md` pour la production visuelle, `assets.md` pour l'inventaire disponible.

### Note méthodologique

Cette documentation a été produite par audit du code source réel (`assets/css/main.css`, `components/ui/*`, `i18n/locales/*.json`, `nuxt.config.ts`) plutôt que par un exercice de branding _ex nihilo_. Chaque règle énoncée est traçable à une implémentation existante ; les rares recommandations pour du contenu non encore implémenté (inputs, modales, alertes) sont explicitement marquées comme telles dans [design-system.md](./design-system.md).

---

## 🇬🇧 English

### Brand vision

A senior developer who proves his expertise through work rather than claims — a portfolio that functions as a living case study of what he produces: rigorous code, thoughtfully designed interfaces, an honest and unpretentious presentation.

### Mission

Give a visitor — a B2B decision-maker looking for a mission, or a recruiter evaluating a senior profile — concrete, verifiable proof of Maxime Jolivet's web development skills (PHP, JavaScript, Drupal, WordPress) and interface design sensibility, within a ten-minute visit.

### Values

| Value             | What it means in practice                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| **Rigor**         | Quality code, durable technical choices, non-negotiable accessibility and performance                  |
| **Honesty**       | Explicit placeholders, an openly stated "under construction" status, no overpromising                  |
| **Sobriety**      | Disciplined palette and typography, no gratuitous decoration, site deliberately `noindex, nofollow`    |
| **Product sense** | UI/UX considered at the same level as code — not a developer who executes a mockup, one who designs it |

### Positioning

**"The senior developer who thinks product, not just code."** Full detail: [charte-graphique.md](./charte-graphique.md#positioning).

### Visual identity summary

| Element            | Summary                                                                                                                   | Detail                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Logo**           | "M" monogram built from code chevrons, set inside an organic circle, monochrome (`currentColor`)                          | [logo.md](./logo.md)                         |
| **Colors**         | Warm neutral background (cream day / deep navy night) + two fixed brand colors: **gold `#EFC78A`** and **mint `#7FD9C4`** | [palette-couleurs.md](./palette-couleurs.md) |
| **Typography**     | **Space Grotesk** (headings, body copy) + **JetBrains Mono** (badges, metadata, data)                                     | [typographie.md](./typographie.md)           |
| **Shapes**         | `rounded-full` for actions, `rounded-2xl` for content, thin borders over shadows                                          | [design-system.md](./design-system.md)       |
| **Editorial tone** | Direct, factual, anti marketing-jargon, proof over promise                                                                | [brand-voice.md](./brand-voice.md)           |

### How to use this documentation

This documentation is organized into 12 standalone files, each bilingual FR/EN, with cross-links to related documents. No information is duplicated across files — each file is the source of truth for its own subject.

| File                                           | Useful for                                                                 |
| ---------------------------------------------- | -------------------------------------------------------------------------- |
| [`charte-graphique.md`](./charte-graphique.md) | Understanding the _why_: DNA, positioning, personality, graphic principles |
| [`palette-couleurs.md`](./palette-couleurs.md) | Implementing colors: CSS tokens, HEX/RGB/HSL/CMYK, accessibility contrasts |
| [`typographie.md`](./typographie.md)           | Implementing text: fonts, size scale, full hierarchy                       |
| [`logo.md`](./logo.md)                         | Using or adapting the logo: construction, variants, restrictions           |
| [`iconographie.md`](./iconographie.md)         | Choosing/styling an icon: Lucide style, sizes, colors                      |
| [`photographie.md`](./photographie.md)         | Producing or selecting a photo: style, framing, lighting                   |
| [`moodboard.md`](./moodboard.md)               | Absorbing the general mood before a creative exploration                   |
| [`design-system.md`](./design-system.md)       | Building a UI component: grid, spacing, radius, buttons, cards, states     |
| [`prompts-ia.md`](./prompts-ia.md)             | Generating a visual with AI (logo, UI, print, social)                      |
| [`assets.md`](./assets.md)                     | Knowing what already exists and what's left to produce                     |
| [`brand-voice.md`](./brand-voice.md)           | Writing copy (UI, email, social) in the right tone                         |

**For a Design team**: start with `charte-graphique.md`, then `palette-couleurs.md` / `typographie.md` / `logo.md` / `iconographie.md` / `photographie.md`.

**For a Development team**: `design-system.md` first (directly copyable CSS tokens), with `palette-couleurs.md` and `typographie.md` as reference.

**For a Marketing/Content team**: `brand-voice.md` first, `prompts-ia.md` for visual production, `assets.md` for the available inventory.

### Methodological note

This documentation was produced by auditing the actual source code (`assets/css/main.css`, `components/ui/*`, `i18n/locales/*.json`, `nuxt.config.ts`) rather than through a from-scratch branding exercise. Every stated rule traces back to an existing implementation; the rare recommendations for not-yet-implemented content (inputs, modals, alerts) are explicitly flagged as such in [design-system.md](./design-system.md).
