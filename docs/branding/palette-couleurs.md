# Palette de couleurs / Color Palette

> Source de vérité : [`assets/css/main.css`](../../assets/css/main.css) (tokens `@theme inline` + variables `:root`). Voir aussi [design-system.md](./design-system.md) pour l'usage en composants et [charte-graphique.md](./charte-graphique.md) pour la logique de marque derrière ces choix.

---

## 🇫🇷 Français

### Logique du système de couleurs

Le portfolio fonctionne en **deux thèmes** (jour/nuit), pilotés par l'attribut `data-theme` sur `<html>` et la composable `useThemeMode`. Les couleurs ne sont **pas** dupliquées à la main dans chaque composant : tout passe par des tokens sémantiques (`--color-primary`, `--color-background`, etc.) qui changent de valeur selon le thème actif. C'est ce niveau d'indirection — couleur brute → token sémantique → classe Tailwind — qu'il faut respecter pour toute nouvelle UI.

Deux couleurs sont **fixes quel que soit le thème** : le gold (`--gold`) et le mint (`--mint` / `--accent`). Elles ne s'inversent jamais en négatif, ce qui en fait la signature chromatique reconnaissable de la marque dans les deux modes.

### Palette primaire

| Nom | Token CSS | HEX | RGB | HSL | CMYK (approx.) | Usage |
|---|---|---|---|---|---|---|
| **Encre** (Ink) | `--ink` | `#1D3540` | `29, 53, 64` | `199° 38% 18%` | `55, 17, 0, 75` | Texte principal (mode jour), fond profond en mode nuit (`--panel-2`) |
| **Gold** | `--gold` | `#EFC78A` | `239, 199, 138` | `36° 71% 74%` | `0, 17, 42, 6` | Couleur primaire de marque — CTA principal, accents forts, halo du logo |
| **Mint / Accent** | `--mint` / `--accent` | `#7FD9C4` | `127, 217, 196` | `165° 47% 67%` | `41, 0, 10, 15` | Couleur secondaire de marque — liens actifs, focus ring, hover d'accent |

**Accessibilité** : le gold `#EFC78A` est une couleur claire — il ne doit **jamais** porter de texte sombre ou clair sans vérification de contraste. Le token `--on-primary` (`#1D3540`, encre) est réservé pour tout texte posé sur `--gold`, garantissant un contraste ≥ 4.5:1 (AA) quel que soit le thème. Ne jamais poser de texte blanc sur gold.

### Palette secondaire / fonds

| Nom | Token CSS | Jour (HEX) | Nuit (HEX) | Usage |
|---|---|---|---|---|
| **Background** | `--bg` → `--color-background` | `#F3F4F0` | `#152833` | Fond de page |
| **Foreground** | `--ink` → `--color-foreground` | `#1D3540` | `#F3F4F0` | Texte principal |
| **Card** | `--card` → `--color-card` | `#FBFCFA` | `#1E3945` | Fond des cartes, badges secondaires |
| **Panel** | `--panel` → `--color-panel` | `#24414F` | `#10202A` | Blocs contrastés (bannières, footer, sections sombres même en mode jour) |
| **Panel 2** | `--panel-2` | `#16303C` | `#0D1B23` | Variante plus sombre de panel (dégradés, superposition) |
| **Stripe** | `--stripe` | `rgba(29,53,64,.09)` | `rgba(243,244,240,.07)` | Rayures/texture de fond décorative, très faible opacité |

### Couleurs de texte

| Nom | Token CSS | Jour | Nuit | Usage |
|---|---|---|---|---|
| **Texte principal** | `--ink` | `#1D3540` | `#F3F4F0` | Titres, corps de texte |
| **Texte secondaire (sub)** | `--sub` | `rgba(29,53,64,.62)` | `rgba(243,244,240,.62)` | Sous-titres, texte de support |
| **Texte discret (subtle)** | `--subtle` | `rgba(29,53,64,.45)` | `rgba(243,244,240,.42)` | Légendes, métadonnées, texte tertiaire |
| **Texte sur primary** | `--on-primary` | `#1D3540` (fixe) | `#1D3540` (fixe) | Texte sur fond gold — toujours encre, jamais inversé |
| **Texte sur panel** | `--on-panel` | `#F3F4F0` (fixe) | `#F3F4F0` (fixe) | Texte sur fond panel — toujours clair, jamais inversé |

### Bordures

| Nom | Token CSS | Jour | Nuit |
|---|---|---|---|
| **Border / Line** | `--line` → `--color-border`, `--color-input` | `rgba(29,53,64,.16)` | `rgba(243,244,240,.16)` |
| **Ring (focus)** | `--color-ring` | = `--accent` (`#7FD9C4`) dans les deux thèmes |

### Couleur de succès / information

Le design system actuel **n'a pas de token succès/info dédié** — le mint (`--accent`, `#7FD9C4`) fait office de couleur positive/confirmation (déjà associé au succès par sa teinte verte). Pour une future extension (formulaires, notifications), recommandation :

| Nom proposé | Token CSS proposé | HEX | Usage |
|---|---|---|---|
| Success | `--color-success` | `#7FD9C4` (= mint existant) | Confirmation, validation |
| Info | `--color-info` | `#8AB4EF` *(à créer, cousin bleu du gold)* | Messages informatifs |

### Couleur d'alerte / destructive

| Nom | Token CSS | HEX | RGB | Usage |
|---|---|---|---|---|
| **Destructive** | `--color-destructive` | `#C65B4F` | `198, 91, 79` | Erreurs, suppression, actions irréversibles. Terracotta rompu — reste dans la gamme chaude de la marque plutôt qu'un rouge alarmiste pur, cohérent avec l'univers "chaleureux mais sérieux" |

**Accessibilité** : `#C65B4F` sur fond `--card` (`#FBFCFA`) donne un contraste d'environ 3.9:1 — suffisant pour du texte large (≥18px ou gras ≥14px) mais **insuffisant pour du texte de corps standard en AA (4.5:1)**. Toujours accompagner d'une icône ou d'un fond `bg-destructive/10` plutôt que du texte seul en petite taille.

### Contrastes recommandés (WCAG 2.1)

| Paire | Contraste | Niveau |
|---|---|---|
| `--ink` sur `--bg` (jour) | 11.9:1 | AAA |
| `--bg` sur `--ink` (nuit, inversé) | 11.9:1 | AAA |
| `--on-primary` sur `--gold` | 8.2:1 | AAA |
| `--sub` sur `--bg` | 5.1:1 | AA (texte normal) |
| `--subtle` sur `--bg` | 3.4:1 | AA texte large uniquement |
| `--accent` (texte) sur `--bg` | 2.1:1 | ⚠️ Insuffisant pour texte — accent réservé aux bordures, icônes, éléments graphiques ≥3:1 (non-texte) |

**Règle d'usage** : le mint (`--accent`) ne doit jamais porter de texte de corps sur fond clair — réserver aux focus rings, soulignements, icônes, petites touches décoratives.

### Variables CSS complètes

```css
:root {
  /* Marque — fixes, ne changent jamais avec le thème */
  --gold: #efc78a;
  --mint: #7fd9c4;
  --accent: #7fd9c4;
  --on-primary: #1d3540; /* texte sur --gold, toujours sombre */
  --on-panel: #f3f4f0;   /* texte sur --panel, toujours clair */

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

### Bonnes pratiques

- Toujours utiliser les classes Tailwind sémantiques (`bg-primary`, `text-muted-foreground`, `border-border`) plutôt que des couleurs codées en dur (`bg-[#EFC78A]`).
- Ne jamais créer un troisième thème sans passer par le même mécanisme `data-theme`.
- Le gold et le mint sont rares par design — ce sont des accents, pas des couleurs de fond de section.

---

## 🇬🇧 English

### Color system logic

The portfolio runs on **two themes** (day/night) driven by the `data-theme` attribute on `<html>` and the `useThemeMode` composable. Colors are never hardcoded per component — everything flows through semantic tokens (`--color-primary`, `--color-background`, …) that swap value depending on the active theme. That indirection layer — raw color → semantic token → Tailwind class — must be respected for any new UI.

Two colors are **fixed regardless of theme**: gold (`--gold`) and mint (`--mint` / `--accent`). They never invert, which makes them the recognizable chromatic signature of the brand across both modes.

### Primary palette

| Name | CSS token | HEX | RGB | HSL | CMYK (approx.) | Usage |
|---|---|---|---|---|---|---|
| **Ink** | `--ink` | `#1D3540` | `29, 53, 64` | `199° 38% 18%` | `55, 17, 0, 75` | Primary text (day mode), deep background in night mode (`--panel-2`) |
| **Gold** | `--gold` | `#EFC78A` | `239, 199, 138` | `36° 71% 74%` | `0, 17, 42, 6` | Primary brand color — main CTA, strong accents, logo glow |
| **Mint / Accent** | `--mint` / `--accent` | `#7FD9C4` | `127, 217, 196` | `165° 47% 67%` | `41, 0, 10, 15` | Secondary brand color — active links, focus ring, accent hover |

**Accessibility**: gold `#EFC78A` is a light color — never place dark or light text on it without checking contrast. The `--on-primary` token (`#1D3540`, ink) is reserved for any text sitting on `--gold`, guaranteeing ≥4.5:1 contrast (AA) in either theme. Never place white text on gold.

### Secondary palette / backgrounds

| Name | CSS token | Day (HEX) | Night (HEX) | Usage |
|---|---|---|---|---|
| **Background** | `--bg` → `--color-background` | `#F3F4F0` | `#152833` | Page background |
| **Foreground** | `--ink` → `--color-foreground` | `#1D3540` | `#F3F4F0` | Primary text |
| **Card** | `--card` → `--color-card` | `#FBFCFA` | `#1E3945` | Card backgrounds, secondary badges |
| **Panel** | `--panel` → `--color-panel` | `#24414F` | `#10202A` | High-contrast blocks (banners, footer, dark sections even in day mode) |
| **Panel 2** | `--panel-2` | `#16303C` | `#0D1B23` | Darker panel variant (gradients, overlays) |
| **Stripe** | `--stripe` | `rgba(29,53,64,.09)` | `rgba(243,244,240,.07)` | Decorative background texture/stripes, very low opacity |

### Text colors

| Name | CSS token | Day | Night | Usage |
|---|---|---|---|---|
| **Primary text** | `--ink` | `#1D3540` | `#F3F4F0` | Headings, body copy |
| **Secondary text (sub)** | `--sub` | `rgba(29,53,64,.62)` | `rgba(243,244,240,.62)` | Subtitles, supporting text |
| **Subtle text** | `--subtle` | `rgba(29,53,64,.45)` | `rgba(243,244,240,.42)` | Captions, metadata, tertiary text |
| **Text on primary** | `--on-primary` | `#1D3540` (fixed) | `#1D3540` (fixed) | Text on gold background — always ink, never inverted |
| **Text on panel** | `--on-panel` | `#F3F4F0` (fixed) | `#F3F4F0` (fixed) | Text on panel background — always light, never inverted |

### Borders

| Name | CSS token | Day | Night |
|---|---|---|---|
| **Border / Line** | `--line` → `--color-border`, `--color-input` | `rgba(29,53,64,.16)` | `rgba(243,244,240,.16)` |
| **Ring (focus)** | `--color-ring` | = `--accent` (`#7FD9C4`) in both themes |

### Success / info colors

The current design system has **no dedicated success/info token** — mint (`--accent`, `#7FD9C4`) already doubles as the positive/confirmation color thanks to its green hue. For a future extension (forms, notifications), recommendation:

| Proposed name | Proposed CSS token | HEX | Usage |
|---|---|---|---|
| Success | `--color-success` | `#7FD9C4` (= existing mint) | Confirmation, validation |
| Info | `--color-info` | `#8AB4EF` *(to create, blue cousin of gold)* | Informational messages |

### Alert / destructive color

| Name | CSS token | HEX | RGB | Usage |
|---|---|---|---|---|
| **Destructive** | `--color-destructive` | `#C65B4F` | `198, 91, 79` | Errors, deletion, irreversible actions. A broken terracotta — stays within the brand's warm range rather than an alarmist pure red, consistent with the "warm but serious" world |

**Accessibility**: `#C65B4F` on `--card` (`#FBFCFA`) gives roughly 3.9:1 contrast — sufficient for large text (≥18px or bold ≥14px) but **insufficient for standard body text at AA (4.5:1)**. Always pair with an icon or a `bg-destructive/10` fill rather than small standalone text.

### Recommended contrasts (WCAG 2.1)

| Pair | Contrast | Level |
|---|---|---|
| `--ink` on `--bg` (day) | 11.9:1 | AAA |
| `--bg` on `--ink` (night, inverted) | 11.9:1 | AAA |
| `--on-primary` on `--gold` | 8.2:1 | AAA |
| `--sub` on `--bg` | 5.1:1 | AA (normal text) |
| `--subtle` on `--bg` | 3.4:1 | AA large text only |
| `--accent` (as text) on `--bg` | 2.1:1 | ⚠️ Insufficient for text — accent reserved for focus rings, underlines, icons, small non-text decorative touches (≥3:1) |

**Usage rule**: mint (`--accent`) should never carry body text on light backgrounds — reserve it for focus rings, underlines, icons, small decorative touches.

### Full CSS variables

See the FR section above — the code block is identical (`:root`, `:root[data-theme='night']`, `@theme inline`) since it's the literal source from [`assets/css/main.css`](../../assets/css/main.css).

### Best practices

- Always use semantic Tailwind classes (`bg-primary`, `text-muted-foreground`, `border-border`) rather than hardcoded colors (`bg-[#EFC78A]`).
- Never introduce a third theme without going through the same `data-theme` mechanism.
- Gold and mint are rare by design — they're accents, not section background colors.
