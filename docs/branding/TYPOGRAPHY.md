# Typographie / Typography

**🇫🇷 Prose → Space Grotesk. Donnée/métadonnée → JetBrains Mono. Rien d'autre.** · **🇬🇧 Prose → Space Grotesk. Data/metadata → JetBrains Mono. Nothing else.**

> Source de vérité / source of truth: [`assets/css/main.css`](../../assets/css/main.css) (`@theme inline`) and [`nuxt.config.ts`](../../nuxt.config.ts) (`googleFonts`). Composants / components: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md). Couleurs de texte / text colors: [COLOR_PALETTE.md](./COLOR_PALETTE.md).

---

## 🇫🇷 Français

### Les 5 règles

1. **Titres** : Space Grotesk, `font-bold` ou `font-semibold`, jamais `font-normal`. `tracking-tight` sur H1/H2 (compense l'ouverture de la police en grand).
2. **Corps** : Space Grotesk 400-500 uniquement — jamais un paragraphe entier en 600+.
3. **Badges, labels, chiffres-clés, dates** : JetBrains Mono. Signature du site : tout ce qui est "donnée" plutôt que "propos" passe en monospace.
4. **Max 2 graisses** par bloc de texte.
5. **Jamais `uppercase` forcé sur les badges** — `Badge.vue` impose `normal-case`, choix assumé contre la convention "badge = majuscules".

### Polices

Chargées via `@nuxtjs/google-fonts`, `display: swap`, auto-hébergées (`download: true` → aucune requête vers Google Fonts en prod, cohérent avec la CSP stricte).

| Rôle                        | Police         | Token CSS     | Graisses chargées                                     |
| --------------------------- | -------------- | ------------- | ----------------------------------------------------- |
| **Principale (sans-serif)** | Space Grotesk  | `--font-sans` | 500 (medium), 600 (semibold), 700 (bold)              |
| **Monospace**               | JetBrains Mono | `--font-mono` | 400 (regular), 500 (medium), 700 (bold), 400 italique |

**Pas de troisième famille.** Ces deux couvrent toute la hiérarchie ; en ajouter une impose de revalider le budget de poids de page.

```css
--font-sans: 'Space Grotesk', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

**Pourquoi ce duo**

- Space Grotesk : géométrique contemporaine, légèrement technique (profil dev) sans froideur — courbes ouvertes, chaleureuses.
- JetBrains Mono : conçue pour le code, utilisée volontairement _hors_ des blocs de code (badges, labels, métadonnées, captions) pour rappeler le métier à chaque micro-interaction.

### Échelle de tailles

Définie dans `@theme inline`, non linéaire (ratio ~1.19, Major Third adouci).

| Token                            | Taille           | Line-height | Usage typique                                    |
| -------------------------------- | ---------------- | ----------- | ------------------------------------------------ |
| `--text-xs`                      | 13px (0.8125rem) | 1.4         | Captions, métadonnées, badges                    |
| `--text-sm`                      | 15px (0.9375rem) | 1.5         | Texte de support, labels de formulaire           |
| `--text-base`                    | 16px (1rem)      | 1.6         | Corps de texte par défaut                        |
| `--text-lg`                      | 19px (1.1875rem) | 1.5         | Intro de paragraphe, sous-titres courts          |
| `--text-xl`                      | 21px (1.3125rem) | 1.4         | Petits titres de carte                           |
| `--text-2xl`                     | 25px (1.5625rem) | 1.3         | Titres de section secondaires                    |
| `--text-3xl`                     | 31px (1.9375rem) | 1.2         | Titres de section principaux                     |
| _(hors token, observé en usage)_ | 32px (2rem)      | 1.1         | `SectionHeading` H2 — `font-bold tracking-tight` |

### Hiérarchie

**Titres & texte** (Space Grotesk, casse normale)

| Niveau                        | Taille                        | Graisse                     | Line-height | Letter-spacing   |
| ----------------------------- | ----------------------------- | --------------------------- | ----------- | ---------------- |
| **H1 (hero)**                 | ~40-56px responsive (`clamp`) | 700 (bold)                  | 1.05-1.1    | `tracking-tight` |
| **H2 (section)**              | 32px / `--text-3xl` (31px)    | 700 (bold) / 600 (semibold) | 1.1-1.2     | `tracking-tight` |
| **H3 (sous-section / carte)** | `--text-xl` (21px)            | 600 (semibold)              | 1.4         | Normal           |
| **Intro / lead**              | `--text-lg` (19px)            | 400-500                     | 1.5         | Normal           |
| **Paragraphe / corps**        | `--text-base` (16px)          | 400-500                     | 1.6         | Normal           |

**UI & données**

| Niveau                   | Taille               | Graisse        | Police                                                    | Line-height | Letter-spacing             | Casse                                    |
| ------------------------ | -------------------- | -------------- | --------------------------------------------------------- | ----------- | -------------------------- | ---------------------------------------- |
| **Bouton**               | `--text-sm` (15px)   | 600 (semibold) | Space Grotesk (`pill`) ou JetBrains Mono (`pill-outline`) | 1           | Normal                     | Normale                                  |
| **Badge / tag**          | 12.5px (`0.7812rem`) | 500 (medium)   | JetBrains Mono                                            | 1           | `tracking-wide`            | `normal-case`, jamais majuscules forcées |
| **Caption / métadonnée** | `--text-xs` (13px)   | 400-500        | JetBrains Mono                                            | 1.4         | Normal à légèrement élargi | Normale                                  |
| **Code inline / CV**     | Variable             | 400            | JetBrains Mono                                            | 1.5         | Normal                     | —                                        |

### Responsive

- **Titres hero** : tailles fluides (`clamp()` ou `text-4xl md:text-5xl lg:text-6xl`), pas de breakpoints figés.
- **Corps** : fixe à `--text-base` sur tous les écrans, **jamais sous 16px** (seuil d'accessibilité mobile, évite le zoom auto iOS sur les inputs).

---

## 🇬🇧 English

### The 5 rules

1. **Headings**: Space Grotesk, `font-bold` or `font-semibold`, never `font-normal`. `tracking-tight` on H1/H2 (offsets the font's openness at large sizes).
2. **Body**: Space Grotesk 400-500 only — never a whole paragraph at 600+.
3. **Badges, labels, key figures, dates**: JetBrains Mono. Site signature: anything that is "data" rather than "prose" goes monospace.
4. **Max 2 weights** per text block.
5. **Never force `uppercase` on badges** — `Badge.vue` enforces `normal-case`, a deliberate choice against the "badge = uppercase" convention.

### Fonts

Loaded via `@nuxtjs/google-fonts`, `display: swap`, self-hosted (`download: true` → no request to Google Fonts in production, consistent with the strict CSP).

| Role                     | Font           | CSS token     | Loaded weights                                      |
| ------------------------ | -------------- | ------------- | --------------------------------------------------- |
| **Primary (sans-serif)** | Space Grotesk  | `--font-sans` | 500 (medium), 600 (semibold), 700 (bold)            |
| **Monospace**            | JetBrains Mono | `--font-mono` | 400 (regular), 500 (medium), 700 (bold), 400 italic |

**No third family.** These two cover the whole hierarchy; adding one means revalidating the page-weight budget.

```css
--font-sans: 'Space Grotesk', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

**Why this duo**

- Space Grotesk: contemporary geometric sans, slightly technical (dev profile) without reading cold — open, warm curves.
- JetBrains Mono: designed for code, deliberately used _outside_ code blocks (badges, labels, metadata, captions) as a nod to the profession in every micro-interaction.

### Size scale

Defined in `@theme inline`, non-linear (~1.19 ratio, softened Major Third).

| Token                          | Size             | Line-height | Typical usage                                    |
| ------------------------------ | ---------------- | ----------- | ------------------------------------------------ |
| `--text-xs`                    | 13px (0.8125rem) | 1.4         | Captions, metadata, badges                       |
| `--text-sm`                    | 15px (0.9375rem) | 1.5         | Supporting text, form labels                     |
| `--text-base`                  | 16px (1rem)      | 1.6         | Default body copy                                |
| `--text-lg`                    | 19px (1.1875rem) | 1.5         | Paragraph intro, short subtitles                 |
| `--text-xl`                    | 21px (1.3125rem) | 1.4         | Small card headings                              |
| `--text-2xl`                   | 25px (1.5625rem) | 1.3         | Secondary section headings                       |
| `--text-3xl`                   | 31px (1.9375rem) | 1.2         | Primary section headings                         |
| _(off-token, observed in use)_ | 32px (2rem)      | 1.1         | `SectionHeading` H2 — `font-bold tracking-tight` |

### Hierarchy

**Headings & text** (Space Grotesk, normal case)

| Level                       | Size                          | Weight                      | Line-height | Letter-spacing   |
| --------------------------- | ----------------------------- | --------------------------- | ----------- | ---------------- |
| **H1 (hero)**               | ~40-56px responsive (`clamp`) | 700 (bold)                  | 1.05-1.1    | `tracking-tight` |
| **H2 (section)**            | 32px / `--text-3xl` (31px)    | 700 (bold) / 600 (semibold) | 1.1-1.2     | `tracking-tight` |
| **H3 (sub-section / card)** | `--text-xl` (21px)            | 600 (semibold)              | 1.4         | Normal           |
| **Intro / lead**            | `--text-lg` (19px)            | 400-500                     | 1.5         | Normal           |
| **Paragraph / body**        | `--text-base` (16px)          | 400-500                     | 1.6         | Normal           |

**UI & data**

| Level                  | Size                 | Weight         | Font                                                      | Line-height | Letter-spacing          | Case                                  |
| ---------------------- | -------------------- | -------------- | --------------------------------------------------------- | ----------- | ----------------------- | ------------------------------------- |
| **Button**             | `--text-sm` (15px)   | 600 (semibold) | Space Grotesk (`pill`) or JetBrains Mono (`pill-outline`) | 1           | Normal                  | Normal                                |
| **Badge / tag**        | 12.5px (`0.7812rem`) | 500 (medium)   | JetBrains Mono                                            | 1           | `tracking-wide`         | `normal-case`, never forced uppercase |
| **Caption / metadata** | `--text-xs` (13px)   | 400-500        | JetBrains Mono                                            | 1.4         | Normal to slightly wide | Normal                                |
| **Inline code / CV**   | Variable             | 400            | JetBrains Mono                                            | 1.5         | Normal                  | —                                     |

### Responsive

- **Hero headings**: fluid sizes (`clamp()` or `text-4xl md:text-5xl lg:text-6xl`), no fixed breakpoints.
- **Body**: fixed at `--text-base` on every screen, **never below 16px** (mobile accessibility threshold, avoids iOS auto-zoom on inputs).
