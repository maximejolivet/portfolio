# Iconographie / Iconography

**🇫🇷 Ajouter une icône : `<AppIcon icon="lucide:nom" />`, couleur héritée, label texte à côté.** · **🇬🇧 Add an icon: `<AppIcon icon="lucide:name" />`, inherited color, text label alongside.**

> Source de vérité / source of truth: [`components/ui/AppIcon.vue`](../../components/ui/AppIcon.vue) + `@iconify-json/lucide` and `@iconify-json/logos` (`package.json`). Monogramme / monogram: [LOGO.md](./LOGO.md). Usage en composants / in components: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).

---

## 🇫🇷 Français

### Les 5 règles

1. **Lucide outline uniquement** pour l'UI — jamais mélanger avec des icônes pleines d'une autre lib dans une même vue.
2. **Couleur = `currentColor`**, jamais codée en dur. Seule exception : les logos de technos (`logos`).
3. **Jamais d'icône seule** — toujours un label texte ou un `aria-label` (`AppIcon.vue` pose `aria-hidden="true"`).
4. **Tailles standard** uniquement (tableau ci-dessous).
5. **Pas d'emoji** dans l'UI, sauf 🚧 (voir fin de section).

### Système technique

- Pas d'import icône par icône : `AppIcon.vue` résout un nom de chaîne (ex. `icon="lucide:arrow-right"`) via `resolveIcon`, rendu en `<svg v-html>` avec `fill="currentColor"`.
- **`lucide`** — bibliothèque principale (était déclarée `"iconLibrary": "lucide"` dans l'ancien `components.json` shadcn, supprimé depuis).
- **`logos`** — logos de marques tierces (technologies, réseaux sociaux) pour la stack technique / les réseaux.

### Tailles standard

| Taille  | Classe Tailwind     | Usage                                         |
| ------- | ------------------- | --------------------------------------------- |
| 12px    | `size-3`            | Icône dans badge                              |
| 16px    | `size-4`            | Icône dans bouton standard                    |
| 32px    | `size-8`            | Icône d'en-tête de section (`SectionHeading`) |
| 40-56px | `size-10`/`size-14` | Icônes de FAB (boutons d'action flottants)    |

### Style

Hérité de Lucide : **contour, pas de remplissage plein** (exceptions explicites : logo, chevrons décoratifs).

| Propriété              | Valeur                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Style**              | Trait (stroke-based), contour uniquement                                                                            |
| **Épaisseur de trait** | 2px (standard Lucide, non surchargé)                                                                                |
| **Cap/join**           | `round` — cohérent avec le cercle organique du logo et les radius généreux du design system                         |
| **Grille source**      | 24×24px (grille native Lucide)                                                                                      |
| **Remplissage**        | `fill="currentColor"` forcé sur le SVG racine, mais les tracés Lucide restent des strokes fins, pas des silhouettes |

### Couleurs

- **UI** : `currentColor`, hérite de `--ink`, `--primary` (gold) ou `--mint` selon contexte (`SectionHeading` : `text-mint` ou `text-primary` selon la prop `diamond`).
- **Statut** : mint = positif/disponible ; `--color-destructive` = erreur/urgent.
- **Logos de technos** : couleurs officielles, non themées — sans elles, un logo React/Vue/PHP perd sa reconnaissance.

### Pictogrammes

Usages : navigation (flèches, burger), réseaux sociaux (collection `logos`), statuts (`pulse-dot` + icône), actions de carte projet (lien externe, GitHub). Toujours avec label texte ou `aria-label`.

### Illustrations

- **Aucune illustration custom** (pas de style blob/character maison). Le portfolio s'appuie sur la photo réelle ([PHOTOGRAPHY.md](./PHOTOGRAPHY.md)) et l'iconographie fonctionnelle.
- `ImagePlaceholder.vue` gère chargement/absence d'image : fond neutre + icône.
- **Si besoin futur** (état vide, 404) : ligne fine monochrome (`currentColor`), grille 24-32px, style Lucide — pas de style pictural séparé.

### Emoji

- Un seul en production : 🚧 (`hero.underConstructionNote` : "site toujours en construction 🚧"). Usage ponctuel et fonctionnel (statut honnête, ton décontracté), pas une charte emoji.
- **Ne pas généraliser.** JetBrains Mono ([TYPOGRAPHY.md](./TYPOGRAPHY.md)) + Lucide couvrent déjà la signalétique légère ; un emoji de plus casse la cohérence vectorielle.
- Besoin d'un marqueur de statut ailleurs → 🚧 ou les pictos `pulse-dot` existants.

---

## 🇬🇧 English

### The 5 rules

1. **Lucide outline only** for UI — never mix with solid icons from another library in one view.
2. **Color = `currentColor`**, never hardcoded. Only exception: tech logos (`logos`).
3. **Never a standalone icon** — always a text label or `aria-label` (`AppIcon.vue` sets `aria-hidden="true"`).
4. **Standard sizes** only (table below).
5. **No emoji** in UI, except 🚧 (see end of section).

### Technical system

- No per-icon imports: `AppIcon.vue` resolves a string name (e.g. `icon="lucide:arrow-right"`) via `resolveIcon`, rendered as `<svg v-html>` with `fill="currentColor"`.
- **`lucide`** — main library (was declared `"iconLibrary": "lucide"` in the former shadcn `components.json`, since removed).
- **`logos`** — third-party brand logos (technologies, social networks) for the tech stack / social section.

### Standard sizes

| Size    | Tailwind class      | Usage                                  |
| ------- | ------------------- | -------------------------------------- |
| 12px    | `size-3`            | Icon inside a badge                    |
| 16px    | `size-4`            | Icon inside a standard button          |
| 32px    | `size-8`            | Section header icon (`SectionHeading`) |
| 40-56px | `size-10`/`size-14` | FAB icons (floating action buttons)    |

### Style

Inherited from Lucide: **outline, no solid fill** (explicit exceptions: logo, decorative chevrons).

| Property          | Value                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| **Style**         | Stroke-based, outline only                                                                                |
| **Stroke weight** | 2px (Lucide standard, not overridden)                                                                     |
| **Cap/join**      | `round` — consistent with the logo's organic circle and the design system's generous radii                |
| **Source grid**   | 24×24px (native Lucide grid)                                                                              |
| **Fill**          | `fill="currentColor"` forced on the root SVG, but Lucide's paths stay thin strokes, not solid silhouettes |

### Colors

- **UI**: `currentColor`, inherits `--ink`, `--primary` (gold) or `--mint` by context (`SectionHeading`: `text-mint` or `text-primary` per the `diamond` prop).
- **Status**: mint = positive/available; `--color-destructive` = error/urgent.
- **Tech logos**: official colors, not themed — without them a React/Vue/PHP logo loses recognizability.

### Pictograms

Used for: navigation (arrows, burger), social networks (`logos` collection), status (`pulse-dot` + icon), project card actions (external link, GitHub). Always with a text label or `aria-label`.

### Illustrations

- **No custom illustrations** (no in-house blob/character style). The portfolio relies on real photography ([PHOTOGRAPHY.md](./PHOTOGRAPHY.md)) and functional icons.
- `ImagePlaceholder.vue` handles loading/missing images: neutral background + icon.
- **If ever needed** (empty state, 404): thin monochrome line art (`currentColor`), 24-32px grid, Lucide style — no separate pictorial style.

### Emoji

- Only one ships: 🚧 (`hero.underConstructionNote`: "site toujours en construction 🚧" / "site still under construction 🚧"). One-off, functional use (honest status, casual tone), not an emoji system.
- **Don't generalize.** JetBrains Mono ([TYPOGRAPHY.md](./TYPOGRAPHY.md)) + Lucide already cover lightweight signaling; another emoji breaks vector consistency.
- Need a status marker elsewhere → 🚧 or the existing `pulse-dot` pictograms.
