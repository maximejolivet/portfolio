# Palette de couleurs / Color Palette

**🇫🇷 Colorer un élément : classe Tailwind sémantique (`bg-primary`, `text-muted-foreground`, `border-border`), jamais `bg-[#EFC78A]`.** · **🇬🇧 Color an element: semantic Tailwind class (`bg-primary`, `text-muted-foreground`, `border-border`), never `bg-[#EFC78A]`.**

> Source de vérité / source of truth: [`assets/css/main.css`](../../assets/css/main.css) (`@theme inline` tokens + `:root` variables). Usage en composants / in components: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md). Logique de marque / brand logic: [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md).

---

## 🇫🇷 Français

### Les 5 règles

1. **Toujours passer par les tokens** : couleur brute → token sémantique → classe Tailwind. Jamais de couleur codée en dur dans un composant.
2. **Texte sur gold = `--on-primary` (encre)**, contraste 8.2:1. Jamais de texte blanc sur gold.
3. **Jamais de texte de corps en mint** sur fond clair (2.1:1) — mint = focus rings, soulignements, icônes, petites touches.
4. **Destructive (`#C65B4F`) jamais seul en petit texte** (3.9:1) — toujours avec une icône ou un fond `bg-destructive/10`.
5. **Gold et mint sont rares** — des accents, pas des fonds de section.

### Comment ça marche

- **Deux thèmes** (jour/nuit) via l'attribut `data-theme` sur `<html>` et la composable `useThemeMode`. Les tokens sémantiques (`--color-primary`, `--color-background`…) changent de valeur selon le thème.
- **Gold (`--gold`) et mint (`--mint` / `--accent`) sont fixes** dans les deux thèmes, jamais inversés — la signature chromatique de la marque.
- **Un troisième thème** ? Uniquement via le même mécanisme `data-theme`.

### Palette primaire

| Nom               | Token CSS             | HEX       | RGB             | HSL            | CMYK (approx.)  | Usage                                                                   |
| ----------------- | --------------------- | --------- | --------------- | -------------- | --------------- | ----------------------------------------------------------------------- |
| **Encre** (Ink)   | `--ink`               | `#1D3540` | `29, 53, 64`    | `199° 38% 18%` | `55, 17, 0, 75` | Texte principal (mode jour), fond profond en mode nuit (`--panel-2`)    |
| **Gold**          | `--gold`              | `#EFC78A` | `239, 199, 138` | `36° 71% 74%`  | `0, 17, 42, 6`  | Couleur primaire de marque — CTA principal, accents forts, halo du logo |
| **Mint / Accent** | `--mint` / `--accent` | `#7FD9C4` | `127, 217, 196` | `165° 47% 67%` | `41, 0, 10, 15` | Couleur secondaire de marque — liens actifs, focus ring, hover d'accent |

### Fonds

| Nom            | Token CSS                      | Jour (HEX)           | Nuit (HEX)              | Usage                                                                    |
| -------------- | ------------------------------ | -------------------- | ----------------------- | ------------------------------------------------------------------------ |
| **Background** | `--bg` → `--color-background`  | `#F3F4F0`            | `#152833`               | Fond de page                                                             |
| **Foreground** | `--ink` → `--color-foreground` | `#1D3540`            | `#F3F4F0`               | Texte principal                                                          |
| **Card**       | `--card` → `--color-card`      | `#FBFCFA`            | `#1E3945`               | Fond des cartes, badges secondaires                                      |
| **Panel**      | `--panel` → `--color-panel`    | `#24414F`            | `#10202A`               | Blocs contrastés (bannières, footer, sections sombres même en mode jour) |
| **Panel 2**    | `--panel-2`                    | `#16303C`            | `#0D1B23`               | Variante plus sombre de panel (dégradés, superposition)                  |
| **Stripe**     | `--stripe`                     | `rgba(29,53,64,.09)` | `rgba(243,244,240,.07)` | Rayures/texture de fond décorative, très faible opacité                  |

### Texte

| Nom                        | Token CSS      | Jour                 | Nuit                    | Usage                                                 |
| -------------------------- | -------------- | -------------------- | ----------------------- | ----------------------------------------------------- |
| **Texte principal**        | `--ink`        | `#1D3540`            | `#F3F4F0`               | Titres, corps de texte                                |
| **Texte secondaire (sub)** | `--sub`        | `rgba(29,53,64,.62)` | `rgba(243,244,240,.62)` | Sous-titres, texte de support                         |
| **Texte discret (subtle)** | `--subtle`     | `rgba(29,53,64,.45)` | `rgba(243,244,240,.42)` | Légendes, métadonnées, texte tertiaire                |
| **Texte sur primary**      | `--on-primary` | `#1D3540` (fixe)     | `#1D3540` (fixe)        | Texte sur fond gold — toujours encre, jamais inversé  |
| **Texte sur panel**        | `--on-panel`   | `#F3F4F0` (fixe)     | `#F3F4F0` (fixe)        | Texte sur fond panel — toujours clair, jamais inversé |

### Bordures

| Nom               | Token CSS                                    | Jour                                          | Nuit                    |
| ----------------- | -------------------------------------------- | --------------------------------------------- | ----------------------- |
| **Border / Line** | `--line` → `--color-border`, `--color-input` | `rgba(29,53,64,.16)`                          | `rgba(243,244,240,.16)` |
| **Ring (focus)**  | `--color-ring`                               | = `--accent` (`#7FD9C4`) dans les deux thèmes |

### États

**Destructive / alerte** — terracotta rompu : reste dans la gamme chaude plutôt qu'un rouge alarmiste ("chaleureux mais sérieux").

| Nom             | Token CSS             | HEX       | RGB           | Usage                                       |
| --------------- | --------------------- | --------- | ------------- | ------------------------------------------- |
| **Destructive** | `--color-destructive` | `#C65B4F` | `198, 91, 79` | Erreurs, suppression, actions irréversibles |

**Succès / info** — **aucun token dédié aujourd'hui** ; le mint sert de couleur positive. Proposition pour une extension future (formulaires, notifications) :

| Nom proposé | Token CSS proposé | HEX                                        | Usage                    |
| ----------- | ----------------- | ------------------------------------------ | ------------------------ |
| Success     | `--color-success` | `#7FD9C4` (= mint existant)                | Confirmation, validation |
| Info        | `--color-info`    | `#8AB4EF` _(à créer, cousin bleu du gold)_ | Messages informatifs     |

### Contrastes (WCAG 2.1)

| Paire                              | Contraste | Niveau                                                                                                |
| ---------------------------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| `--ink` sur `--bg` (jour)          | 11.9:1    | AAA                                                                                                   |
| `--bg` sur `--ink` (nuit, inversé) | 11.9:1    | AAA                                                                                                   |
| `--on-primary` sur `--gold`        | 8.2:1     | AAA                                                                                                   |
| `--sub` sur `--bg`                 | 5.1:1     | AA (texte normal)                                                                                     |
| `--subtle` sur `--bg`              | 3.4:1     | AA texte large uniquement                                                                             |
| `--accent` (texte) sur `--bg`      | 2.1:1     | ⚠️ Insuffisant pour texte — accent réservé aux bordures, icônes, éléments graphiques ≥3:1 (non-texte) |

### Variables CSS complètes

```css
:root {
  /* Marque — fixes, ne changent jamais avec le thème */
  --gold: #efc78a;
  --mint: #7fd9c4;
  --accent: #7fd9c4;
  --on-primary: #1d3540; /* texte sur --gold, toujours sombre */
  --on-panel: #f3f4f0; /* texte sur --panel, toujours clair */

  /* Thème jour */
  --bg: #f3f4f0;
  --ink: #1d3540;
  --sub: rgba(29, 53, 64, 0.62);
  --subtle: rgba(29, 53, 64, 0.45);
  --line: rgba(29, 53, 64, 0.16);
  --card: #fbfcfa;
  --panel: #24414f;
  --panel-2: #16303c;
  --stripe: rgba(29, 53, 64, 0.09);
  color-scheme: light;
}

:root[data-theme='night'] {
  --bg: #152833;
  --ink: #f3f4f0;
  --sub: rgba(243, 244, 240, 0.62);
  --subtle: rgba(243, 244, 240, 0.42);
  --line: rgba(243, 244, 240, 0.16);
  --card: #1e3945;
  --panel: #10202a;
  --panel-2: #0d1b23;
  --stripe: rgba(243, 244, 240, 0.07);
  color-scheme: dark;
}

/* Mapping sémantique Tailwind (@theme inline) */
@theme inline {
  --color-background: var(--bg);
  --color-foreground: var(--ink);
  --color-primary: var(--gold);
  --color-primary-foreground: var(--on-primary);
  --color-secondary: var(--card);
  --color-secondary-foreground: var(--ink);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--bg);
  --color-mint: var(--mint);
  --color-muted: var(--card);
  --color-muted-foreground: var(--sub);
  --color-subtle: var(--subtle);
  --color-stripe: var(--stripe);
  --color-card: var(--card);
  --color-card-foreground: var(--ink);
  --color-panel: var(--panel);
  --color-panel-2: var(--panel-2);
  --color-panel-foreground: var(--on-panel);
  --color-border: var(--line);
  --color-input: var(--line);
  --color-ring: var(--accent);
  --color-destructive: #c65b4f;
}
```

---

## 🇬🇧 English

### The 5 rules

1. **Always go through tokens**: raw color → semantic token → Tailwind class. Never a hardcoded color in a component.
2. **Text on gold = `--on-primary` (ink)**, 8.2:1 contrast. Never white text on gold.
3. **Never body text in mint** on light backgrounds (2.1:1) — mint = focus rings, underlines, icons, small touches.
4. **Destructive (`#C65B4F`) never alone as small text** (3.9:1) — always with an icon or a `bg-destructive/10` fill.
5. **Gold and mint are rare** — accents, not section backgrounds.

### How it works

- **Two themes** (day/night) via the `data-theme` attribute on `<html>` and the `useThemeMode` composable. Semantic tokens (`--color-primary`, `--color-background`…) swap value per theme.
- **Gold (`--gold`) and mint (`--mint` / `--accent`) are fixed** in both themes, never inverted — the brand's chromatic signature.
- **A third theme**? Only through the same `data-theme` mechanism.

### Primary palette

| Name              | CSS token             | HEX       | RGB             | HSL            | CMYK (approx.)  | Usage                                                                |
| ----------------- | --------------------- | --------- | --------------- | -------------- | --------------- | -------------------------------------------------------------------- |
| **Ink**           | `--ink`               | `#1D3540` | `29, 53, 64`    | `199° 38% 18%` | `55, 17, 0, 75` | Primary text (day mode), deep background in night mode (`--panel-2`) |
| **Gold**          | `--gold`              | `#EFC78A` | `239, 199, 138` | `36° 71% 74%`  | `0, 17, 42, 6`  | Primary brand color — main CTA, strong accents, logo glow            |
| **Mint / Accent** | `--mint` / `--accent` | `#7FD9C4` | `127, 217, 196` | `165° 47% 67%` | `41, 0, 10, 15` | Secondary brand color — active links, focus ring, accent hover       |

### Backgrounds

| Name           | CSS token                      | Day (HEX)            | Night (HEX)             | Usage                                                                  |
| -------------- | ------------------------------ | -------------------- | ----------------------- | ---------------------------------------------------------------------- |
| **Background** | `--bg` → `--color-background`  | `#F3F4F0`            | `#152833`               | Page background                                                        |
| **Foreground** | `--ink` → `--color-foreground` | `#1D3540`            | `#F3F4F0`               | Primary text                                                           |
| **Card**       | `--card` → `--color-card`      | `#FBFCFA`            | `#1E3945`               | Card backgrounds, secondary badges                                     |
| **Panel**      | `--panel` → `--color-panel`    | `#24414F`            | `#10202A`               | High-contrast blocks (banners, footer, dark sections even in day mode) |
| **Panel 2**    | `--panel-2`                    | `#16303C`            | `#0D1B23`               | Darker panel variant (gradients, overlays)                             |
| **Stripe**     | `--stripe`                     | `rgba(29,53,64,.09)` | `rgba(243,244,240,.07)` | Decorative background texture/stripes, very low opacity                |

### Text

| Name                     | CSS token      | Day                  | Night                   | Usage                                                   |
| ------------------------ | -------------- | -------------------- | ----------------------- | ------------------------------------------------------- |
| **Primary text**         | `--ink`        | `#1D3540`            | `#F3F4F0`               | Headings, body copy                                     |
| **Secondary text (sub)** | `--sub`        | `rgba(29,53,64,.62)` | `rgba(243,244,240,.62)` | Subtitles, supporting text                              |
| **Subtle text**          | `--subtle`     | `rgba(29,53,64,.45)` | `rgba(243,244,240,.42)` | Captions, metadata, tertiary text                       |
| **Text on primary**      | `--on-primary` | `#1D3540` (fixed)    | `#1D3540` (fixed)       | Text on gold background — always ink, never inverted    |
| **Text on panel**        | `--on-panel`   | `#F3F4F0` (fixed)    | `#F3F4F0` (fixed)       | Text on panel background — always light, never inverted |

### Borders

| Name              | CSS token                                    | Day                                     | Night                   |
| ----------------- | -------------------------------------------- | --------------------------------------- | ----------------------- |
| **Border / Line** | `--line` → `--color-border`, `--color-input` | `rgba(29,53,64,.16)`                    | `rgba(243,244,240,.16)` |
| **Ring (focus)**  | `--color-ring`                               | = `--accent` (`#7FD9C4`) in both themes |

### States

**Destructive / alert** — a broken terracotta: stays in the warm range rather than an alarmist red ("warm but serious").

| Name            | CSS token             | HEX       | RGB           | Usage                                  |
| --------------- | --------------------- | --------- | ------------- | -------------------------------------- |
| **Destructive** | `--color-destructive` | `#C65B4F` | `198, 91, 79` | Errors, deletion, irreversible actions |

**Success / info** — **no dedicated token today**; mint doubles as the positive color. Proposal for a future extension (forms, notifications):

| Proposed name | Proposed CSS token | HEX                                          | Usage                    |
| ------------- | ------------------ | -------------------------------------------- | ------------------------ |
| Success       | `--color-success`  | `#7FD9C4` (= existing mint)                  | Confirmation, validation |
| Info          | `--color-info`     | `#8AB4EF` _(to create, blue cousin of gold)_ | Informational messages   |

### Contrasts (WCAG 2.1)

| Pair                                | Contrast | Level                                                                                                                   |
| ----------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `--ink` on `--bg` (day)             | 11.9:1   | AAA                                                                                                                     |
| `--bg` on `--ink` (night, inverted) | 11.9:1   | AAA                                                                                                                     |
| `--on-primary` on `--gold`          | 8.2:1    | AAA                                                                                                                     |
| `--sub` on `--bg`                   | 5.1:1    | AA (normal text)                                                                                                        |
| `--subtle` on `--bg`                | 3.4:1    | AA large text only                                                                                                      |
| `--accent` (as text) on `--bg`      | 2.1:1    | ⚠️ Insufficient for text — accent reserved for focus rings, underlines, icons, small non-text decorative touches (≥3:1) |

### Full CSS variables

Identical to the FR section above (`:root`, `:root[data-theme='night']`, `@theme inline`) — it's the literal source from [`assets/css/main.css`](../../assets/css/main.css).
