# Iconographie / Iconography

> Source de vérité : [`components/ui/AppIcon.vue`](../../components/ui/AppIcon.vue) + dépendances `@iconify-json/lucide` et `@iconify-json/logos` (`package.json`). Voir [logo.md](./logo.md) pour le monogramme de marque et [design-system.md](./design-system.md) pour l'usage en composants.

---

## 🇫🇷 Français

### Système technique

Les icônes ne sont **pas** importées individuellement composant par composant : `AppIcon.vue` résout dynamiquement une icône par nom de chaîne (`icon="lucide:arrow-right"` par ex.) via une fonction `resolveIcon`, rendue en `<svg v-html>` avec `fill="currentColor"`. Deux collections Iconify sont disponibles :

- **`lucide`** — la bibliothèque d'icônes principale (déclarée `"iconLibrary": "lucide"` dans `components.json`).
- **`logos`** — logos de marques tierces (technologies, réseaux sociaux) pour la section stack technique / réseaux.

### Style des icônes

Hérité directement du style Lucide : **outline (contour), pas de remplissage plein**, sauf exceptions explicites (voir logo, chevrons décoratifs).

| Propriété                       | Valeur                                                                                                                                                                                       |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Style**                       | Trait (stroke-based), contour uniquement                                                                                                                                                     |
| **Épaisseur de trait**          | 2px (standard Lucide, non surchargé)                                                                                                                                                         |
| **Rayon des angles (cap/join)** | `round` (arrondi) — cohérent avec le cercle organique du logo et les radius généreux du design system                                                                                        |
| **Grille source**               | 24×24px (grille native Lucide)                                                                                                                                                               |
| **Couleur**                     | Toujours `currentColor` — jamais de couleur codée en dur sur une icône, elle hérite du texte parent                                                                                          |
| **Remplissage**                 | Aucun remplissage plein par défaut ; le composant force `fill="currentColor"` au niveau du SVG racine mais les tracés Lucide eux-mêmes restent des strokes fins, pas des silhouettes pleines |

### Tailles standard

| Taille  | Classe Tailwind     | Usage                                         |
| ------- | ------------------- | --------------------------------------------- |
| 12px    | `size-3`            | Icône dans badge                              |
| 16px    | `size-4`            | Icône dans bouton standard                    |
| 32px    | `size-8`            | Icône d'en-tête de section (`SectionHeading`) |
| 40-56px | `size-10`/`size-14` | Icônes de FAB (boutons d'action flottants)    |

### Formes

- Angles arrondis systématiques (`stroke-linecap: round`, `stroke-linejoin: round` — comportement natif Lucide).
- Pas de mix outline/filled dans une même vue : une page ne doit pas combiner des icônes Lucide (outline) avec des icônes pleines d'une autre lib.
- Les logos de marques tierces (`@iconify-json/logos`) restent dans leur charte graphique d'origine (couleurs officielles conservées) — seule exception à la règle `currentColor`, car reproduire un logo de techno (React, Vue, PHP...) sans ses couleurs propres nuirait à sa reconnaissance.

### Couleurs

- Icônes fonctionnelles/UI : `currentColor`, héritent de `--ink`, `--primary` (gold) ou `--mint` selon contexte (voir `SectionHeading` : `text-mint` ou `text-primary` selon prop `diamond`).
- Icônes de statut : mint pour positif/disponible, `--color-destructive` pour erreur/urgent.
- Logos de technologies : couleurs de marque officielles, non themées.

### Illustrations

Le système **ne comporte pas d'illustrations custom** (pas de style d'illustration maison type blob/character design) — le portfolio s'appuie sur photographie réelle ([photographie.md](./photographie.md)) et iconographie fonctionnelle plutôt que sur de l'illustration décorative. `ImagePlaceholder.vue` gère les états de chargement/absence d'image via un fond neutre + icône, pas via une illustration dédiée.

**Recommandation si besoin futur d'illustrations** (ex. état vide, 404) : rester en ligne fine monochrome (`currentColor`), grille 24-32px, cohérent avec le style Lucide plutôt que d'introduire un style pictural séparé.

### Pictogrammes

Utilisés pour : navigation (flèches, menu burger), réseaux sociaux (via `logos` collection), statuts (point de pulsation `pulse-dot` + icône), actions de carte projet (lien externe, github). Toujours accompagnés d'un label texte ou d'un `aria-label` — jamais d'icône seule sans alternative accessible (icônes marquées `aria-hidden="true"` dans `AppIcon.vue`, donc le texte/label porteur de sens doit être présent à côté).

### Emoji de marque

Un seul emoji est actuellement utilisé dans le contenu produit : 🚧 (`hero.underConstructionNote` : "site toujours en construction 🚧"). C'est un usage **ponctuel et fonctionnel** (statut honnête, ton décontracté), pas une charte emoji étendue.

**Règle** : ne pas généraliser l'usage d'emoji dans l'UI ou le contenu. Le système typographique (JetBrains Mono pour les métadonnées, voir [typographie.md](./typographie.md)) et l'iconographie Lucide couvrent déjà le besoin de signalétique visuelle légère — un emoji supplémentaire romprait la cohérence du système d'icônes vectorielles. Si un marqueur d'humeur/statut est nécessaire ailleurs, préférer 🚧 (chantier/travail en cours) ou rester sur les pictos `pulse-dot` existants.

---

## 🇬🇧 English

### Technical system

Icons are **not** imported individually component-by-component: `AppIcon.vue` dynamically resolves an icon by string name (e.g. `icon="lucide:arrow-right"`) via a `resolveIcon` function, rendered as `<svg v-html>` with `fill="currentColor"`. Two Iconify collections are available:

- **`lucide`** — the main icon library (declared as `"iconLibrary": "lucide"` in `components.json`).
- **`logos`** — third-party brand logos (technologies, social networks) for the tech-stack / social section.

### Icon style

Directly inherited from the Lucide style: **outline (stroke-based), no solid fill**, aside from explicit exceptions (see logo, decorative chevrons).

| Property                     | Value                                                                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Style**                    | Stroke-based, outline only                                                                                                                                    |
| **Stroke weight**            | 2px (Lucide standard, not overridden)                                                                                                                         |
| **Corner radius (cap/join)** | `round` — consistent with the logo's organic circle and the design system's generous radii                                                                    |
| **Source grid**              | 24×24px (native Lucide grid)                                                                                                                                  |
| **Color**                    | Always `currentColor` — never a hardcoded color on an icon, it inherits from parent text                                                                      |
| **Fill**                     | No solid fill by default; the component forces `fill="currentColor"` at the root SVG level, but Lucide's own paths remain thin strokes, not solid silhouettes |

### Standard sizes

| Size    | Tailwind class      | Usage                                  |
| ------- | ------------------- | -------------------------------------- |
| 12px    | `size-3`            | Icon inside a badge                    |
| 16px    | `size-4`            | Icon inside a standard button          |
| 32px    | `size-8`            | Section header icon (`SectionHeading`) |
| 40-56px | `size-10`/`size-14` | FAB icons (floating action buttons)    |

### Shapes

- Consistently rounded corners (`stroke-linecap: round`, `stroke-linejoin: round` — native Lucide behavior).
- No mixing of outline/filled styles within one view: a page must not combine Lucide (outline) icons with solid icons from another library.
- Third-party brand logos (`@iconify-json/logos`) keep their original brand colors — the sole exception to the `currentColor` rule, since reproducing a tech logo (React, Vue, PHP…) without its own colors would hurt recognizability.

### Colors

- Functional/UI icons: `currentColor`, inheriting `--ink`, `--primary` (gold) or `--mint` depending on context (see `SectionHeading`: `text-mint` or `text-primary` per the `diamond` prop).
- Status icons: mint for positive/available, `--color-destructive` for error/urgent.
- Technology logos: official brand colors, not themed.

### Illustrations

The system **has no custom illustration style** (no in-house blob/character illustration style) — the portfolio relies on real photography ([photographie.md](./photographie.md)) and functional iconography rather than decorative illustration. `ImagePlaceholder.vue` handles loading/missing-image states via a neutral background + icon, not a dedicated illustration.

**Recommendation if illustrations are needed in the future** (e.g. empty state, 404): stay in thin monochrome line art (`currentColor`), 24-32px grid, consistent with the Lucide style rather than introducing a separate pictorial style.

### Pictograms

Used for: navigation (arrows, burger menu), social networks (via the `logos` collection), status (`pulse-dot` + icon), project card actions (external link, GitHub). Always paired with a text label or `aria-label` — never a standalone icon with no accessible alternative (icons are marked `aria-hidden="true"` in `AppIcon.vue`, so the meaning-carrying text/label must sit alongside).

### Brand emoji

Only one emoji currently appears in shipped content: 🚧 (`hero.underConstructionNote`: "site toujours en construction 🚧" / "site still under construction 🚧"). This is a **one-off, functional use** (honest status, casual tone), not an extended emoji system.

**Rule**: don't generalize emoji usage across UI or content. The typography system (JetBrains Mono for metadata, see [typographie.md](./typographie.md)) and the Lucide iconography already cover the need for lightweight visual signaling — an additional emoji would break the vector-icon system's consistency. If a mood/status marker is needed elsewhere, prefer 🚧 (work in progress) or stick to the existing `pulse-dot` pictograms.
