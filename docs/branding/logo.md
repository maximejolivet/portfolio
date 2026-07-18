# Logo

> Fichier source réel : [`components/ui/LogoMark.vue`](../../components/ui/LogoMark.vue) — SVG inline `viewBox="0 0 1040 1040"`. Voir [palette-couleurs.md](./palette-couleurs.md) pour les couleurs et [assets.md](./assets.md) pour les exports à produire.

---

## 🇫🇷 Français

### Concept

Le logo est un **monogramme M** inscrit dans un cercle organique légèrement irrégulier (pas un cercle géométrique parfait — le contour respire, comme tracé à main levée puis vectorisé). À l'intérieur, deux formes : un **M** composé de deux pointes descendantes qui rappellent aussi des chevrons `< >` (le code), et une **barre horizontale** en dessous qui évoque un curseur de terminal ou une ligne de base.

Le logo n'utilise **qu'une seule couleur** (`currentColor`) — il hérite toujours de la couleur du texte environnant plutôt que d'imposer sa propre palette. C'est un choix fort : le logo est traité comme un caractère typographique, pas comme une image figée.

### Symbolique

- **Le M** : initiale de Maxime — lisible sans être criant, un détecteur de forme le voit avant de le "lire" comme lettre.
- **Le cercle organique** : la continuité, la fiabilité, l'absence d'angles morts — cohérent avec le positionnement "code qui dure" (voir [charte-graphique.md](./charte-graphique.md)).
- **Les chevrons implicites** : lecture seconde en `< M >`, un clin d'œil discret au développement sans tomber dans le cliché `</>` trop utilisé par les portfolios dev.
- **L'animation `logo-letters`** (`--animate-logo-letters`, 3s ease-in-out infinite, `scale(1)` → `scale(0.82)` → `scale(1)`) : le M "respire" légèrement à l'intérieur du cercle fixe. Utilisée sur l'écran d'intro (voir mémoire du projet : timing d'animation d'intro retravaillé). Symbolise un système vivant plutôt qu'un logo statique — cohérent avec un développeur qui maintient et fait évoluer ses projets dans la durée plutôt que de les livrer et les oublier.

### Construction

- **Grille** : `viewBox 0 0 1040 1040` — carré, ratio 1:1 strict.
- **Deux groupes de tracés** :
  1. Le contour circulaire organique (path unique, fond du cercle en `currentColor`).
  2. Le groupe `.animate-logo-letters` (M + barre), qui pulse indépendamment du cercle — `transform-origin: center`, `transform-box: view-box`.
- **Épaisseur des traits** : formes pleines (fill), pas de contour (stroke) — cohérent avec le style d'icônes plates du reste du système (voir [iconographie.md](./iconographie.md)).
- **Taille par défaut du composant** : `size="36"` (36×36px), utilisé dans la nav ; scalable à n'importe quelle taille sans perte car SVG vectoriel pur.

### Variantes

| Variante | Description | Statut |
|---|---|---|
| **Version couleur / marque** | `currentColor` réglé sur `--gold` ou `--ink` selon le contexte | ✅ Existe (usage actuel dans la nav) |
| **Version claire (fond sombre)** | `currentColor` réglé sur `--on-panel` (`#F3F4F0`) | ✅ Native via `currentColor`, aucun asset séparé requis |
| **Version sombre (fond clair)** | `currentColor` réglé sur `--ink` (`#1D3540`) | ✅ Native via `currentColor` |
| **Version monochrome** | Le logo *est* nativement monochrome — une seule couleur à la fois, jamais de dégradé ni de bicolore | ✅ Par construction |
| **Wordmark (logo + nom)** | "Maxime Jolivet" à côté du monogramme, en Space Grotesk 600 | ⚠️ À produire — actuellement le monogramme est utilisé seul dans la nav, le nom complet apparaît en texte séparé (hero) |
| **Favicon** | Version simplifiée pour petites tailles (16-32px) | ✅ Existe (`public/favicon.ico`, `public/favicon.png`, `public/maxime.svg`) — à vérifier que le detail du M reste lisible à 16px |

### Zone de protection

Réserver un espace libre autour du logo égal à **la moitié de la hauteur du cercle** (soit ~50% de la taille du logo) avant tout autre élément graphique, texte ou bord de fenêtre. À 36px d'usage courant (nav), cela signifie ~18px de marge minimale.

### Taille minimale

- **Écran** : 24×24px. En dessous, le détail intérieur (M + barre) devient illisible ; ne conserver que le cercle plein en usage favicon extrême (16px).
- **Print** : 10mm de diamètre.

### Interdictions d'utilisation

- ❌ Ne jamais recolorer le cercle et le M en deux couleurs différentes (rompt la règle "monochrome par construction").
- ❌ Ne jamais étirer le logo hors de son ratio 1:1.
- ❌ Ne jamais ajouter d'ombre portée, de contour (stroke), de dégradé ou d'effet 3D.
- ❌ Ne jamais poser le logo en gold sur un fond gold, ou en mint sur un fond mint (perte de contraste).
- ❌ Ne jamais dupliquer/répéter le logo en pattern décoratif — c'est un identifiant unique, pas une texture.
- ❌ Ne jamais figer l'animation `logo-letters` en dehors de l'écran d'intro / des points d'entrée du site (elle doit rester un moment, pas un état permanent).

### Exemples d'application

- **Navigation** (`LogoMark.vue`, 36px, couleur héritée du header)
- **Écran d'intro** (animation `intro-logo-in` : fade + scale depuis 0.85, `cubic-bezier(0.16, 1, 0.3, 1)`, 700ms — voir mémoire de session sur le timing retravaillé)
- **Favicon** (`public/favicon.ico`, `public/favicon.png`)
- **Open Graph** (`public/open-graph-maximejolivet.jpg` — à vérifier que le monogramme y apparaît si besoin de reconnaissance sociale)

### Prompts IA pour générer le logo

À utiliser pour explorer des variations ou produire des déclinaisons (packaging, goodies) — **le SVG existant reste la source de vérité**, ces prompts servent à l'exploration créative ou à des supports dérivés, pas à remplacer l'asset codé.

```
Minimalist single-color monogram logo, letter "M" abstracted into two
downward chevron shapes suggesting code brackets < >, enclosed in a
slightly organic hand-drawn circle (not a perfect geometric circle),
flat vector, no gradient, no stroke outline, solid fill only,
currentColor / single ink color, on white background, professional
tech-personal-brand aesthetic, warm minimal, Space Grotesk typography
family influence, --v 6 --style raw
```

```
Flat vector monogram icon, initial "M" built from two triangular
chevron points plus a thin horizontal baseline stroke below (evokes a
terminal cursor / code baseline), housed in an organic slightly
imperfect circle outline, single solid color fill, no gradients, no
drop shadow, clean geometric-but-warm style, suitable for favicon at
16px, vector illustration, minimalist branding mark
```

```
Wordmark logo design: circular monogram mark (letter M as code
chevrons in an organic circle) paired horizontally with the text
"Maxime Jolivet" set in a geometric sans-serif typeface (Space
Grotesk-like), semibold weight, tight letter spacing, single color,
flat design, developer personal brand, minimal and confident
```

---

## 🇬🇧 English

### Concept

The logo is an **M monogram** set inside a slightly irregular organic circle (not a perfect geometric circle — the outline breathes, as if hand-drawn then vectorized). Inside: two shapes — an **M** built from two downward points that also read as chevrons `< >` (code), and a **horizontal bar** underneath evoking a terminal cursor or baseline.

The logo uses **only one color** (`currentColor`) — it always inherits the surrounding text color rather than imposing its own palette. That's a deliberate choice: the logo is treated as a typographic character, not a fixed image.

### Symbolism

- **The M**: Maxime's initial — legible without shouting, a viewer registers the shape before "reading" it as a letter.
- **The organic circle**: continuity, reliability, no blind corners — consistent with the "code that lasts" positioning (see [charte-graphique.md](./charte-graphique.md)).
- **The implicit chevrons**: a second reading as `< M >`, a subtle nod to development without falling into the overused `</>` portfolio cliché.
- **The `logo-letters` animation** (`--animate-logo-letters`, 3s ease-in-out infinite, `scale(1)` → `scale(0.82)` → `scale(1)`): the M "breathes" gently inside the fixed circle. Used on the intro screen (see project memory: intro animation timing reworked). It symbolizes a living system rather than a static logo — consistent with a developer who maintains and evolves projects over time rather than shipping and forgetting them.

### Construction

- **Grid**: `viewBox 0 0 1040 1040` — square, strict 1:1 ratio.
- **Two path groups**:
  1. The organic circular outline (single path, filled with `currentColor`).
  2. The `.animate-logo-letters` group (M + bar), pulsing independently of the circle — `transform-origin: center`, `transform-box: view-box`.
- **Stroke weight**: solid filled shapes, no outline strokes — consistent with the flat icon style used across the rest of the system (see [iconographie.md](./iconographie.md)).
- **Default component size**: `size="36"` (36×36px), used in the nav; scales to any size losslessly since it's a pure vector SVG.

### Variants

| Variant | Description | Status |
|---|---|---|
| **Color / brand version** | `currentColor` set to `--gold` or `--ink` depending on context | ✅ Exists (current nav usage) |
| **Light version (dark background)** | `currentColor` set to `--on-panel` (`#F3F4F0`) | ✅ Native via `currentColor`, no separate asset needed |
| **Dark version (light background)** | `currentColor` set to `--ink` (`#1D3540`) | ✅ Native via `currentColor` |
| **Monochrome version** | The logo *is* natively monochrome — one color at a time, never a gradient or two-tone | ✅ By construction |
| **Wordmark (logo + name)** | "Maxime Jolivet" next to the monogram, in Space Grotesk 600 | ⚠️ To be produced — currently the monogram is used alone in nav, the full name appears as separate text (hero) |
| **Favicon** | Simplified version for small sizes (16-32px) | ✅ Exists (`public/favicon.ico`, `public/favicon.png`, `public/maxime.svg`) — verify the M detail stays legible at 16px |

### Clear space

Reserve free space around the logo equal to **half the circle's height** (~50% of the logo's size) before any other graphic element, text, or window edge. At the common 36px nav usage, that's ~18px minimum margin.

### Minimum size

- **Screen**: 24×24px. Below that, the inner detail (M + bar) becomes illegible; keep only the solid circle for extreme favicon usage (16px).
- **Print**: 10mm diameter.

### Usage restrictions

- ❌ Never recolor the circle and the M in two different colors (breaks the "monochrome by construction" rule).
- ❌ Never stretch the logo out of its 1:1 ratio.
- ❌ Never add drop shadows, outline strokes, gradients, or 3D effects.
- ❌ Never place a gold logo on a gold background, or mint on mint (loses contrast).
- ❌ Never repeat/tile the logo as a decorative pattern — it's a unique identifier, not a texture.
- ❌ Never freeze the `logo-letters` animation outside the intro screen / site entry points (it should stay a moment, not a permanent state).

### Application examples

- **Navigation** (`LogoMark.vue`, 36px, color inherited from the header)
- **Intro screen** (`intro-logo-in` animation: fade + scale from 0.85, `cubic-bezier(0.16, 1, 0.3, 1)`, 700ms — see session memory on reworked timing)
- **Favicon** (`public/favicon.ico`, `public/favicon.png`)
- **Open Graph** (`public/open-graph-maximejolivet.jpg` — verify the monogram appears there if social recognition is needed)

### AI prompts to generate the logo

For exploring variations or producing derivative assets (packaging, goodies) — **the existing SVG remains the source of truth**; these prompts are for creative exploration or derivative collateral, not for replacing the coded asset. See the FR section above for the three ready-to-use prompts (identical in either language, written directly for AI image tools).
