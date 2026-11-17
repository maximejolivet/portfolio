# Logo

**🇫🇷 Utiliser le logo : `<LogoMark />` (36px par défaut), couleur héritée du texte parent, ~18px de marge libre autour.** · **🇬🇧 Use the logo: `<LogoMark />` (36px default), color inherited from parent text, ~18px clear space around.**

> Source réelle / real source: [`components/ui/LogoMark.vue`](../../components/ui/LogoMark.vue) — inline SVG `viewBox="0 0 1040 1040"`. Couleurs / colors: [COLOR_PALETTE.md](./COLOR_PALETTE.md). Exports à produire / exports to produce: [ASSETS.md](./ASSETS.md).

---

## 🇫🇷 Français

### Règles d'usage

| Règle                  | Valeur                                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **Couleur**            | Une seule, `currentColor` — le logo se comporte comme un caractère typographique, pas une image figée |
| **Zone de protection** | Moitié de la hauteur du cercle (~50 % de la taille) avant tout élément, texte ou bord. À 36px : ~18px |
| **Taille min. écran**  | 24×24px. En dessous le M + barre devient illisible ; favicon extrême (16px) : cercle plein seul       |
| **Taille min. print**  | 10mm de diamètre                                                                                      |
| **Ratio**              | 1:1 strict                                                                                            |

### Interdictions

**Forme & couleur**

- ❌ Recolorer le cercle et le M en deux couleurs différentes (casse le "monochrome par construction").
- ❌ Étirer hors du ratio 1:1.
- ❌ Ajouter ombre portée, contour (stroke), dégradé ou effet 3D.
- ❌ Gold sur fond gold, mint sur fond mint (perte de contraste).

**Usage**

- ❌ Répéter le logo en motif décoratif — c'est un identifiant unique, pas une texture.
- ❌ Utiliser l'animation `logo-letters` hors de l'écran d'intro / des points d'entrée — elle reste un moment, pas un état permanent.

### Variantes

**Natives via `currentColor`** (aucun asset séparé)

| Variante                 | `currentColor`                                 | Statut              |
| ------------------------ | ---------------------------------------------- | ------------------- |
| **Couleur / marque**     | `--gold` ou `--ink` selon contexte             | ✅ Existe (nav)     |
| **Claire (fond sombre)** | `--on-panel` (`#F3F4F0`)                       | ✅ Native           |
| **Sombre (fond clair)**  | `--ink` (`#1D3540`)                            | ✅ Native           |
| **Monochrome**           | Une couleur à la fois, jamais dégradé/bicolore | ✅ Par construction |

**Assets dédiés**

| Variante                  | Description                                              | Statut                                                                                                      |
| ------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Wordmark (logo + nom)** | "Maxime Jolivet" à côté du monogramme, Space Grotesk 600 | ⚠️ À produire — le monogramme est seul dans la nav, le nom complet est un texte séparé (hero)               |
| **Favicon**               | Version simplifiée 16-32px                               | ✅ `public/favicon.ico`, `public/favicon.png`, `public/maxime.svg` — vérifier que le M reste lisible à 16px |

### Où il apparaît

- **Navigation** — `LogoMark.vue`, 36px, couleur héritée du header
- **Écran d'intro** — animation `intro-logo-in` : fade + scale depuis 0.85, `cubic-bezier(0.16, 1, 0.3, 1)`, 700ms (timing retravaillé, voir mémoire de session)
- **Favicon** — `public/favicon.ico`, `public/favicon.png`
- **Open Graph** — `public/open-graph-maximejolivet.jpg` (vérifier que le monogramme y figure si la reconnaissance sociale compte)

### Concept

- **Monogramme M** dans un cercle organique légèrement irrégulier (contour qui respire, comme tracé à main levée puis vectorisé).
- **Le M** : deux pointes descendantes qui se lisent aussi comme des chevrons `< >`.
- **Une barre horizontale** dessous : curseur de terminal ou ligne de base.

### Symbolique

- **Le M** — initiale de Maxime ; on perçoit la forme avant de la "lire" comme lettre.
- **Le cercle organique** — continuité, fiabilité, pas d'angle mort ; cohérent avec "code qui dure" ([BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md)).
- **Les chevrons implicites** — seconde lecture `< M >`, clin d'œil au dev sans le cliché `</>`.
- **L'animation `logo-letters`** (`--animate-logo-letters`, 3s ease-in-out infinite, `scale(1)` → `scale(0.82)` → `scale(1)`) — le M "respire" dans le cercle fixe sur l'écran d'intro. Système vivant : un dev qui maintient ses projets dans la durée plutôt que de les livrer et les oublier.

### Construction

1. **Grille** : `viewBox 0 0 1040 1040`, carré 1:1.
2. **Groupe 1** : contour circulaire organique (path unique, rempli en `currentColor`).
3. **Groupe 2** : `.animate-logo-letters` (M + barre), pulse indépendamment — `transform-origin: center`, `transform-box: view-box`.
4. **Formes pleines** (fill), pas de stroke — comme les icônes plates du système ([ICONOGRAPHY.md](./ICONOGRAPHY.md)).
5. **Taille par défaut** : `size="36"` (nav) ; SVG pur, scalable sans perte.

### Prompts IA

**Exploration créative ou supports dérivés uniquement** (packaging, goodies). Le SVG codé reste la source de vérité.

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

### Usage rules

| Rule                 | Value                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------- |
| **Color**            | One only, `currentColor` — the logo behaves like a typographic character, not a fixed image |
| **Clear space**      | Half the circle's height (~50% of size) before any element, text or edge. At 36px: ~18px    |
| **Min. screen size** | 24×24px. Below, M + bar becomes illegible; extreme favicon (16px): solid circle only        |
| **Min. print size**  | 10mm diameter                                                                               |
| **Ratio**            | Strict 1:1                                                                                  |

### Restrictions

**Shape & color**

- ❌ Recolor the circle and the M in two different colors (breaks "monochrome by construction").
- ❌ Stretch out of 1:1.
- ❌ Add drop shadows, outline strokes, gradients or 3D effects.
- ❌ Gold on gold, mint on mint (loses contrast).

**Usage**

- ❌ Tile the logo as a decorative pattern — it's a unique identifier, not a texture.
- ❌ Use the `logo-letters` animation outside the intro screen / entry points — it's a moment, not a permanent state.

### Variants

**Native via `currentColor`** (no separate asset)

| Variant                     | `currentColor`                               | Status             |
| --------------------------- | -------------------------------------------- | ------------------ |
| **Color / brand**           | `--gold` or `--ink` by context               | ✅ Exists (nav)    |
| **Light (dark background)** | `--on-panel` (`#F3F4F0`)                     | ✅ Native          |
| **Dark (light background)** | `--ink` (`#1D3540`)                          | ✅ Native          |
| **Monochrome**              | One color at a time, never gradient/two-tone | ✅ By construction |

**Dedicated assets**

| Variant                    | Description                                              | Status                                                                                                  |
| -------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Wordmark (logo + name)** | "Maxime Jolivet" next to the monogram, Space Grotesk 600 | ⚠️ To produce — the monogram stands alone in nav, the full name is separate text (hero)                 |
| **Favicon**                | Simplified 16-32px version                               | ✅ `public/favicon.ico`, `public/favicon.png`, `public/maxime.svg` — verify the M stays legible at 16px |

### Where it appears

- **Navigation** — `LogoMark.vue`, 36px, color inherited from the header
- **Intro screen** — `intro-logo-in` animation: fade + scale from 0.85, `cubic-bezier(0.16, 1, 0.3, 1)`, 700ms (reworked timing, see session memory)
- **Favicon** — `public/favicon.ico`, `public/favicon.png`
- **Open Graph** — `public/open-graph-maximejolivet.jpg` (verify the monogram appears if social recognition matters)

### Concept

- **M monogram** inside a slightly irregular organic circle (the outline breathes, as if hand-drawn then vectorized).
- **The M**: two downward points that also read as chevrons `< >`.
- **A horizontal bar** below: terminal cursor or baseline.

### Symbolism

- **The M** — Maxime's initial; the shape registers before it's "read" as a letter.
- **The organic circle** — continuity, reliability, no blind corners; fits "code that lasts" ([BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md)).
- **The implicit chevrons** — second reading `< M >`, a nod to dev without the `</>` cliché.
- **The `logo-letters` animation** (`--animate-logo-letters`, 3s ease-in-out infinite, `scale(1)` → `scale(0.82)` → `scale(1)`) — the M "breathes" inside the fixed circle on the intro screen. A living system: a developer who maintains projects over time rather than shipping and forgetting them.

### Construction

1. **Grid**: `viewBox 0 0 1040 1040`, square 1:1.
2. **Group 1**: organic circular outline (single path, filled with `currentColor`).
3. **Group 2**: `.animate-logo-letters` (M + bar), pulses independently — `transform-origin: center`, `transform-box: view-box`.
4. **Solid shapes** (fill), no strokes — like the system's flat icons ([ICONOGRAPHY.md](./ICONOGRAPHY.md)).
5. **Default size**: `size="36"` (nav); pure SVG, scales losslessly.

### AI prompts

**Creative exploration or derivative collateral only** (packaging, goodies). The coded SVG stays the source of truth. The three prompts in the FR section above are identical in either language — copy them from there.
