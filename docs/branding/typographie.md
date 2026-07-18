# Typographie / Typography

> Source de vérité : [`assets/css/main.css`](../../assets/css/main.css) (`@theme inline`) et [`nuxt.config.ts`](../../nuxt.config.ts) (`googleFonts`). Voir [design-system.md](./design-system.md) pour les composants qui consomment ces styles et [palette-couleurs.md](./palette-couleurs.md) pour les couleurs de texte.

---

## 🇫🇷 Français

### Polices

Deux familles, aucune tierce cachée — chargées via `@nuxtjs/google-fonts` avec `display: swap` et auto-hébergement (`download: true`, donc pas de requête réseau vers Google Fonts en prod, cohérent avec la CSP stricte du projet).

| Rôle | Police | Token CSS | Graisses chargées |
|---|---|---|---|
| **Principale (sans-serif)** | Space Grotesk | `--font-sans` | 500 (medium), 600 (semibold), 700 (bold) |
| **Monospace** | JetBrains Mono | `--font-mono` | 400 (regular), 500 (medium), 700 (bold), 400 italique |
| **Secondaire** | — | — | Aucune troisième famille : Space Grotesk et JetBrains Mono suffisent à toute la hiérarchie. Ne pas en ajouter une troisième sans revalidation du budget de poids de page. |

```css
--font-sans: 'Space Grotesk', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

**Pourquoi ce duo** : Space Grotesk est une géométrique contemporaine avec un caractère légèrement technique (bon pour un profil dev) sans être froide — les courbes ouvertes lui donnent de la chaleur. JetBrains Mono, conçue pour le code, est utilisée volontairement en dehors des blocs de code : sur les badges, labels, métadonnées et captions, pour rappeler visuellement le métier (développeur) à chaque micro-interaction du site.

### Échelle de tailles

Échelle définie dans `@theme inline`, non-linéaire (ratio ~1.19, proche du Major Third adouci) :

| Token | Taille | Line-height | Usage typique |
|---|---|---|---|
| `--text-xs` | 13px (0.8125rem) | 1.4 | Captions, métadonnées, badges |
| `--text-sm` | 15px (0.9375rem) | 1.5 | Texte de support, labels de formulaire |
| `--text-base` | 16px (1rem) | 1.6 | Corps de texte par défaut |
| `--text-lg` | 19px (1.1875rem) | 1.5 | Intro de paragraphe, sous-titres courts |
| `--text-xl` | 21px (1.3125rem) | 1.4 | Petits titres de carte |
| `--text-2xl` | 25px (1.5625rem) | 1.3 | Titres de section secondaires |
| `--text-3xl` | 31px (1.9375rem) | 1.2 | Titres de section principaux |
| *(hors token, observé en usage)* | 32px (2rem) | 1.1 | `SectionHeading` H2 — `font-bold tracking-tight` |

### Hiérarchie complète

| Niveau | Taille | Graisse | Police | Line-height | Letter-spacing | Casse |
|---|---|---|---|---|---|---|
| **H1 (hero)** | ~40-56px responsive (`clamp`) | 700 (bold) | Space Grotesk | 1.05-1.1 | `tracking-tight` (léger resserrement) | Normale |
| **H2 (section)** | 32px / `--text-3xl` (31px) | 700 (bold) / 600 (semibold) | Space Grotesk | 1.1-1.2 | `tracking-tight` | Normale |
| **H3 (sous-section / carte)** | `--text-xl` (21px) | 600 (semibold) | Space Grotesk | 1.4 | Normal | Normale |
| **Paragraphe / corps** | `--text-base` (16px) | 400-500 | Space Grotesk | 1.6 | Normal | Normale |
| **Intro / lead** | `--text-lg` (19px) | 400-500 | Space Grotesk | 1.5 | Normal | Normale |
| **Bouton** | `--text-sm` (15px) | 600 (semibold) | Space Grotesk (`pill`) ou JetBrains Mono (`pill-outline`) | 1 | Normal | Normale |
| **Badge / tag** | 12.5px (`0.7812rem`) | 500 (medium) | JetBrains Mono | 1 | `tracking-wide` | Normale (`normal-case` — jamais de majuscules forcées) |
| **Caption / métadonnée** | `--text-xs` (13px) | 400-500 | JetBrains Mono | 1.4 | Normal à légèrement élargi | Normale |
| **Code inline / CV** | Variable | 400 | JetBrains Mono | 1.5 | Normal | — |

### Règles de composition

- **Titres** : toujours Space Grotesk, toujours `font-bold` ou `font-semibold`, jamais `font-normal`. `tracking-tight` systématique sur H1/H2 pour compenser l'ouverture naturelle de la police à grande taille.
- **Corps de texte** : Space Grotesk, poids 400-500 uniquement — ne jamais mettre un paragraphe entier en 600+.
- **Badges, labels, chiffres-clés, dates** : JetBrains Mono. C'est la marque de fabrique typographique du site — dès qu'un élément a une fonction de "donnée" ou de "métadonnée" plutôt que de "propos", il bascule en monospace.
- **Ne jamais** mélanger plus de 2 graisses dans un même bloc de texte.
- **Ne jamais** utiliser `text-transform: uppercase` de force sur les badges (le composant `Badge.vue` impose explicitement `normal-case` — décision assumée contre la convention "badge = majuscules").

### Responsive

Les titres hero utilisent des tailles fluides (`clamp()` ou classes responsive Tailwind `text-4xl md:text-5xl lg:text-6xl`) plutôt que des breakpoints figés, pour une transition douce entre mobile et desktop. Le corps de texte reste fixe à `--text-base` sur tous les écrans — pas de réduction en dessous de 16px, seuil d'accessibilité mobile (évite le zoom automatique iOS sur les inputs).

---

## 🇬🇧 English

### Fonts

Two families, no hidden third one — loaded via `@nuxtjs/google-fonts` with `display: swap` and self-hosting (`download: true`, so no runtime request to Google Fonts in production, consistent with the project's strict CSP).

| Role | Font | CSS token | Loaded weights |
|---|---|---|---|
| **Primary (sans-serif)** | Space Grotesk | `--font-sans` | 500 (medium), 600 (semibold), 700 (bold) |
| **Monospace** | JetBrains Mono | `--font-mono` | 400 (regular), 500 (medium), 700 (bold), 400 italic |
| **Secondary** | — | — | No third family: Space Grotesk and JetBrains Mono cover the entire hierarchy. Don't add a third without revalidating the page-weight budget. |

```css
--font-sans: 'Space Grotesk', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

**Why this duo**: Space Grotesk is a contemporary geometric sans with a slightly technical character (fitting for a dev profile) without reading cold — its open curves keep it warm. JetBrains Mono, designed for code, is deliberately used *outside* of code blocks: on badges, labels, metadata and captions, as a constant visual nod to the profession (developer) in every micro-interaction on the site.

### Size scale

Scale defined in `@theme inline`, non-linear (~1.19 ratio, close to a softened Major Third):

| Token | Size | Line-height | Typical usage |
|---|---|---|---|
| `--text-xs` | 13px (0.8125rem) | 1.4 | Captions, metadata, badges |
| `--text-sm` | 15px (0.9375rem) | 1.5 | Supporting text, form labels |
| `--text-base` | 16px (1rem) | 1.6 | Default body copy |
| `--text-lg` | 19px (1.1875rem) | 1.5 | Paragraph intro, short subtitles |
| `--text-xl` | 21px (1.3125rem) | 1.4 | Small card headings |
| `--text-2xl` | 25px (1.5625rem) | 1.3 | Secondary section headings |
| `--text-3xl` | 31px (1.9375rem) | 1.2 | Primary section headings |
| *(off-token, observed in use)* | 32px (2rem) | 1.1 | `SectionHeading` H2 — `font-bold tracking-tight` |

### Full hierarchy

| Level | Size | Weight | Font | Line-height | Letter-spacing | Case |
|---|---|---|---|---|---|---|
| **H1 (hero)** | ~40-56px responsive (`clamp`) | 700 (bold) | Space Grotesk | 1.05-1.1 | `tracking-tight` (slight tightening) | Normal |
| **H2 (section)** | 32px / `--text-3xl` (31px) | 700 (bold) / 600 (semibold) | Space Grotesk | 1.1-1.2 | `tracking-tight` | Normal |
| **H3 (sub-section / card)** | `--text-xl` (21px) | 600 (semibold) | Space Grotesk | 1.4 | Normal | Normal |
| **Paragraph / body** | `--text-base` (16px) | 400-500 | Space Grotesk | 1.6 | Normal | Normal |
| **Intro / lead** | `--text-lg` (19px) | 400-500 | Space Grotesk | 1.5 | Normal | Normal |
| **Button** | `--text-sm` (15px) | 600 (semibold) | Space Grotesk (`pill`) or JetBrains Mono (`pill-outline`) | 1 | Normal | Normal |
| **Badge / tag** | 12.5px (`0.7812rem`) | 500 (medium) | JetBrains Mono | 1 | `tracking-wide` | Normal (`normal-case` — never forced uppercase) |
| **Caption / metadata** | `--text-xs` (13px) | 400-500 | JetBrains Mono | 1.4 | Normal to slightly wide | Normal |
| **Inline code / CV** | Variable | 400 | JetBrains Mono | 1.5 | Normal | — |

### Composition rules

- **Headings**: always Space Grotesk, always `font-bold` or `font-semibold`, never `font-normal`. Systematic `tracking-tight` on H1/H2 to offset the font's natural openness at large sizes.
- **Body copy**: Space Grotesk, weight 400-500 only — never set an entire paragraph at 600+.
- **Badges, labels, key figures, dates**: JetBrains Mono. This is the site's typographic signature — anything functioning as "data" or "metadata" rather than "prose" switches to monospace.
- **Never** mix more than 2 weights within a single block of text.
- **Never** force `text-transform: uppercase` on badges (the `Badge.vue` component explicitly enforces `normal-case` — a deliberate choice against the "badge = uppercase" convention).

### Responsive

Hero headings use fluid sizes (`clamp()` or responsive Tailwind classes `text-4xl md:text-5xl lg:text-6xl`) rather than fixed breakpoints, for a smooth transition between mobile and desktop. Body text stays fixed at `--text-base` across all screens — never reduced below 16px, the mobile accessibility threshold (avoids iOS auto-zoom on inputs).
