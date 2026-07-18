# Design System

> Stack : Nuxt 4 + Tailwind v4 (`@tailwindcss/vite`, tokens `@theme inline` dans [`assets/css/main.css`](../../assets/css/main.css)) + shadcn-vue (style "new-york", composants sous `components/ui/shadcn/`, enveloppés par des wrappers `Ui*` dans `components/ui/`). Voir [palette-couleurs.md](./palette-couleurs.md) et [typographie.md](./typographie.md) pour les tokens couleur/texte détaillés, [iconographie.md](./iconographie.md) pour les icônes.

---

## 🇫🇷 Français

### Grid

| Breakpoint Tailwind | Largeur min | Usage                                                                           |
| ------------------- | ----------- | ------------------------------------------------------------------------------- |
| (base, mobile)      | 0px         | 1 colonne, empilement vertical                                                  |
| `sm`                | 640px       | Ajustements mineurs, certains flex passent en ligne                             |
| `md`                | 768px       | 2 colonnes possibles, nav mobile → nav desktop bascule ici sur certains layouts |
| `lg`                | 1024px      | Layouts multi-colonnes complets (cartes projets, grilles de compétences)        |
| `xl`                | 1280px      | Marges latérales élargies                                                       |
| `2xl`               | 1536px      | Rare, contenu déjà plafonné par le container                                    |

**Container** (`Container.vue`) : `max-width: 1180px`, centré (`mx-auto`), padding horizontal fixe `px-4` (16px) à tous les breakpoints. C'est le conteneur unique de toutes les sections — ne pas recréer de largeur max ad hoc ailleurs.

- **Desktop** (≥1024px) : grilles 2 à 4 colonnes selon densité de contenu (cartes projets = 2-3 col, tags/stack = grille dense).
- **Tablet** (640-1023px) : généralement 1-2 colonnes, la nav bascule en `MobileMenu`.
- **Mobile** (<640px) : 1 colonne stricte, empilement vertical, `Container` garde son `px-4`.

### Spacing

Échelle Tailwind standard (multiples de 4px), utilisée telle quelle sans extension custom :

| Token Tailwind | Valeur | rem     |
| -------------- | ------ | ------- |
| `1`            | 4px    | 0.25rem |
| `2`            | 8px    | 0.5rem  |
| `3`            | 12px   | 0.75rem |
| `4`            | 16px   | 1rem    |
| `6`            | 24px   | 1.5rem  |
| `8`            | 32px   | 2rem    |
| `12`           | 48px   | 3rem    |
| `16`           | 64px   | 4rem    |
| `24`           | 96px   | 6rem    |

**Règles d'usage observées** :

- Padding interne des cartes : `p-6` (24px).
- Gap entre icône et titre de section (`SectionHeading`) : `gap-4` (16px).
- Marge basse avant contenu de section : `mb-10` (40px).
- Padding des boutons pill : `px-6.5 py-3` (~26px/12px).
- Espacement vertical entre sections de page : 64-96px (`py-16` à `py-24`) selon la densité.

### Radius

Basé sur un token racine `--radius: 1rem` (16px), décliné :

```css
--radius: 1rem;
--radius-sm: calc(var(--radius) - 0.5rem); /* 0.5rem / 8px */
--radius-md: calc(var(--radius) - 0.25rem); /* 0.75rem / 12px */
--radius-lg: var(--radius); /* 1rem / 16px */
--radius-xl: calc(var(--radius) + 0.25rem); /* 1.25rem / 20px */
```

| Composant                       | Radius appliqué                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------- |
| Card (`Card.vue`)               | `rounded-2xl` (16px, hors-échelle Tailwind défaut mais alignée à `--radius-lg`) |
| Boutons `pill` / `pill-outline` | `rounded-full`                                                                  |
| Boutons standard shadcn         | `rounded-md`                                                                    |
| Badges                          | `rounded-full`                                                                  |
| Menu mobile                     | `rounded-2xl`                                                                   |
| Boutons flottants (FAB)         | `rounded-full` (`size-11`/`size-14`)                                            |

**Règle** : les éléments d'action (boutons, badges, FAB) sont **toujours** en `rounded-full` — c'est une signature du système. Les conteneurs de contenu (cartes, panneaux, menus) utilisent l'échelle `--radius-*`, jamais `rounded-full`.

### Ombres / Elevation

Le système n'a **pas** de token d'ombre custom dans `@theme` — il s'appuie sur l'échelle Tailwind native (`shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`) appliquée au cas par cas, plus une ombre custom colorée pour le curseur personnalisé.

| Niveau         | Classe                                                               | Usage observé                                                                                                  |
| -------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 0 — Flat       | `shadow-none`                                                        | Cartes de contenu (`Card.vue`) — le système préfère la **bordure** à l'ombre pour la séparation visuelle       |
| 1 — Léger      | `shadow-xs`                                                          | Bouton `outline`                                                                                               |
| 2 — Moyen      | `shadow-md`                                                          | Bouton d'action secondaire flottant                                                                            |
| 3 — Fort       | `shadow-lg`                                                          | FAB primaire, menu mobile ouvert, CTA flottant CV                                                              |
| Spécial — glow | `shadow-[0_0_18px_color-mix(in_srgb,var(--accent)_55%,transparent)]` | Curseur personnalisé (`CustomCursor.vue`) — seule ombre colorée du système, réservée à cette micro-interaction |

**Principe d'élévation** : le z-index et l'ombre montent ensemble uniquement pour les éléments _flottants au-dessus du flux_ (FAB, menu mobile, curseur). Le contenu structurel (cartes, sections) reste plat avec des bordures — évite l'effet "skeuomorphique" sur un site qui se veut net et technique.

### Bordures

- Couleur unique : `border-border` (= `--line`, voir [palette-couleurs.md](./palette-couleurs.md)).
- Épaisseur par défaut : `1px` (`border`), jamais de `border-2`+ observé dans le système actuel.
- `* { border-color: var(--color-border); }` est posé globalement au niveau `@layer base` — toute classe `border` sans couleur explicite hérite automatiquement de la bonne teinte de thème.

### Boutons

Deux familles de variantes coexistent : les variantes **shadcn standard** (héritage du kit, utile pour usages génériques/futurs) et les variantes **de marque**, réellement utilisées sur le site.

| Variant                   | Style                                                                                      | Usage                              |
| ------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------- |
| `pill` _(marque, défaut)_ | `rounded-full bg-primary` (gold) `font-sans font-semibold`, hover → `bg-accent` (mint)     | CTA principal                      |
| `pill-outline` _(marque)_ | `rounded-full border` transparent, `font-mono font-semibold`, hover → bordure/texte accent | CTA secondaire                     |
| `default`                 | `bg-primary`, `rounded-md`                                                                 | Usage générique shadcn             |
| `outline`                 | Bordure + `shadow-xs`                                                                      | Actions secondaires génériques     |
| `secondary`               | `bg-secondary`                                                                             | Actions tertiaires                 |
| `ghost`                   | Transparent, hover `bg-accent`                                                             | Actions discrètes (icônes toolbar) |
| `link`                    | Souligné au hover, couleur primary                                                         | Lien inline stylé bouton           |
| `destructive`             | `bg-destructive`                                                                           | Suppression, actions irréversibles |

Tailles : `default` (36px), `xs` (24px), `sm` (32px), `lg` (40px), `icon`/`icon-xs`/`icon-sm`/`icon-lg` (carrés), `pill`/`pill-md`/`pill-sm` (hauteur auto, familles CTA).

**État hover** systématique : changement de fond (`bg-primary` → `bg-accent` pour `pill`) plutôt que simple assombrissement — le hover bascule littéralement vers la couleur de marque secondaire, renforçant le duo gold/mint à chaque interaction.

### Inputs

_(Non encore massivement implémentés dans les pages actuelles — recommandation basée sur les tokens existants pour cohérence future.)_

- Bordure : `border-input` (= `--line`).
- Focus : `ring-3 ring-ring/50` avec `--color-ring = --accent` — le mint sert de couleur de focus dans tout le système (cohérent avec son rôle d'accent interactif).
- Radius : `rounded-md` (aligné boutons standard, pas `pill`).
- État erreur : `aria-invalid:border-destructive aria-invalid:ring-destructive/20`.

### Cards

`Card.vue` (wrapper) : `gap-3.5 rounded-2xl p-6 shadow-none` posé sur le `Card` shadcn qui apporte `bg-card text-card-foreground flex flex-col border`.

- Fond : `--card` (blanc cassé jour / bleu-nuit foncé nuit).
- Pas d'ombre — séparation par bordure `border` (1px, `--line`) uniquement.
- Padding interne généreux : 24px, jamais moins.
- Gap interne entre éléments empilés : 14px (`gap-3.5`).

### Navigation

- **Desktop** : nav horizontale, logo (`LogoMark`, 36px) + liens + switch de thème + sélecteur de langue.
- **Mobile** (`MobileMenu.vue`) : panneau flottant `rounded-2xl border bg-background shadow-lg`, positionné `absolute right-0 top-[calc(100%+10px)]`, `gap-4`, `p-5`, `z-50`.
- **Actions flottantes** (`FloatingActions.vue`) : FAB primaire `size-11` mobile / `size-14` desktop, `bg-primary shadow-lg`, hover `scale-105` ; FAB secondaire caché sur mobile (`hidden md:flex`), fond `bg-background border shadow-md`.

### Modales

_(Pattern shadcn-vue disponible via Dialog, non massivement déployé actuellement.)_ Recommandation de cohérence : `rounded-2xl`, `shadow-lg`, overlay `bg-ink/40` (jour) ou `bg-black/60` (nuit), animation d'entrée `intro-logo-in`-like (fade + scale léger) plutôt qu'un slide, pour rester cohérent avec le langage d'animation du logo.

### Badges / Tags

`Badge.vue` : `rounded-full border px-2 py-0.5`, forcé en `font-mono text-[0.7812rem] font-medium tracking-wide normal-case` — **toujours monospace, jamais de majuscules forcées** (déviation assumée du défaut shadcn). Variant par défaut : `outline`.

| Variant              | Usage                        |
| -------------------- | ---------------------------- |
| `outline` _(défaut)_ | Tags de compétences, filtres |
| `default`            | Statut actif / mis en avant  |
| `secondary`          | Statut neutre                |
| `destructive`        | Statut erreur / urgent       |

### Alertes

_(Pas de composant Alert dédié actuellement.)_ Recommandation basée sur `--color-destructive` et le mint comme succès (voir [palette-couleurs.md](./palette-couleurs.md)) : fond `bg-destructive/10` + bordure `border-destructive/30` + texte `text-destructive` pour les erreurs ; `bg-accent/10` + `border-accent/30` pour succès/info.

### Icônes

Voir [iconographie.md](./iconographie.md) pour le détail complet. Résumé : `lucide` via `@iconify-json/lucide` + composant `AppIcon.vue` (résolution dynamique par nom de string), taille standard `size-8` en en-tête de section, `size-4`/`size-3` dans les boutons.

### Animations

Aucune librairie d'animation (GSAP et motion-v ont été délibérément retirées — voir `CLAUDE.md`) : uniquement CSS natif (`@keyframes` + transitions Tailwind).

| Animation       | Token                     | Durée                                           | Usage                                                 |
| --------------- | ------------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| `marquee`       | `--animate-marquee`       | 26s linear infinite                             | Bandeau défilant (stack tech, logos clients)          |
| `blink`         | `--animate-blink`         | 1.1s step-end infinite                          | Curseur clignotant façon terminal                     |
| `pulse-dot`     | `--animate-pulse-dot`     | 1.6s ease-in-out infinite                       | Indicateur de statut (dispo, en ligne)                |
| `logo-letters`  | `--animate-logo-letters`  | 3s ease-in-out infinite                         | Respiration du monogramme (voir [logo.md](./logo.md)) |
| `intro-logo-in` | `--animate-intro-logo-in` | 700ms `cubic-bezier(0.16, 1, 0.3, 1)`, one-shot | Entrée du logo à l'écran d'intro                      |

Transitions ponctuelles (hover, focus) : `transition-all` / `transition-colors` / `transition-transform`, durées `duration-300`, easing `ease-out` par défaut. `scale-105` est le pattern standard de hover sur les éléments circulaires (FAB, logo).

### Responsive

Mobile-first strict : classes de base = mobile, préfixes `sm:`/`md:`/`lg:` ajoutent la complexité. Pas de breakpoints custom — échelle Tailwind par défaut (640/768/1024/1280/1536). `Container` garde une largeur max fixe (1180px) plutôt que de scaler indéfiniment sur très grands écrans.

### États

| État         | Traitement                                                                                                                                                                                                                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hover**    | Changement de fond/couleur vers la palette de marque (gold→mint sur `pill`), `scale-105` sur éléments circulaires, `translate-x-1` sur l'icône de flèche des boutons (`group-hover:translate-x-1`)                                                                                                               |
| **Active**   | Hérite du hover shadcn standard (`active:` peu utilisé explicitement — à renforcer si interactions tactiles fréquentes)                                                                                                                                                                                          |
| **Focus**    | `ring-3 ring-ring/50` (mint), `focus-visible:border-ring` — focus toujours visible, jamais supprimé (`outline-none` compensé par le ring)                                                                                                                                                                        |
| **Disabled** | `disabled:pointer-events-none disabled:opacity-50` — pattern shadcn standard, cohérent partout                                                                                                                                                                                                                   |
| **Loading**  | Géré au niveau page (voir mémoire projet : "improved loading states and error handling" sur blog/projets) plutôt qu'au niveau composant atomique — pas de spinner de bouton standardisé actuellement, à définir si besoin (recommandation : `animate-pulse-dot` réutilisé comme indicateur de chargement inline) |

### Tokens Design (résumé)

```
Couleur     → voir palette-couleurs.md (tokens sémantiques @theme)
Typographie → voir typographie.md (--font-sans, --font-mono, --text-*)
Radius      → --radius: 1rem (+ sm/md/lg/xl dérivés)
Spacing     → échelle Tailwind par défaut (4/8/12/16/24/32/48/64/96px)
Shadow      → échelle Tailwind par défaut (xs/sm/md/lg), shadow-none par défaut sur cards
Animation   → 5 keyframes custom (marquee, blink, pulse-dot, logo-letters, intro-logo-in)
```

### Variables CSS (extrait complet, hors couleurs déjà documentées)

```css
@theme inline {
  --font-sans: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  --text-xs: 0.8125rem;
  --text-xs--line-height: 1.4;
  --text-sm: 0.9375rem;
  --text-sm--line-height: 1.5;
  --text-base: 1rem;
  --text-base--line-height: 1.6;
  --text-lg: 1.1875rem;
  --text-lg--line-height: 1.5;
  --text-xl: 1.3125rem;
  --text-xl--line-height: 1.4;
  --text-2xl: 1.5625rem;
  --text-2xl--line-height: 1.3;
  --text-3xl: 1.9375rem;
  --text-3xl--line-height: 1.2;

  --radius: 1rem;
  --radius-sm: calc(var(--radius) - 0.5rem);
  --radius-md: calc(var(--radius) - 0.25rem);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 0.25rem);

  --animate-marquee: marquee 26s linear infinite;
  --animate-blink: blink 1.1s step-end infinite;
  --animate-pulse-dot: pulse-dot 1.6s ease-in-out infinite;
  --animate-logo-letters: logo-letters 3s ease-in-out infinite;
  --animate-intro-logo-in: intro-logo-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

Voir [palette-couleurs.md](./palette-couleurs.md) pour le bloc complet des tokens couleur (`:root`, `:root[data-theme='night']`).

---

## 🇬🇧 English

### Grid

| Tailwind breakpoint | Min width | Usage                                                                      |
| ------------------- | --------- | -------------------------------------------------------------------------- |
| (base, mobile)      | 0px       | 1 column, vertical stack                                                   |
| `sm`                | 640px     | Minor adjustments, some flex rows appear                                   |
| `md`                | 768px     | 2 columns possible, mobile nav → desktop nav switches here on some layouts |
| `lg`                | 1024px    | Full multi-column layouts (project cards, skill grids)                     |
| `xl`                | 1280px    | Wider side margins                                                         |
| `2xl`               | 1536px    | Rare, content already capped by the container                              |

**Container** (`Container.vue`): `max-width: 1180px`, centered (`mx-auto`), fixed horizontal padding `px-4` (16px) at every breakpoint. This is the single container for all sections — don't recreate an ad hoc max-width elsewhere.

- **Desktop** (≥1024px): 2-4 column grids depending on content density (project cards = 2-3 col, tags/stack = dense grid).
- **Tablet** (640-1023px): generally 1-2 columns, nav switches to `MobileMenu`.
- **Mobile** (<640px): strict 1 column, vertical stack, `Container` keeps its `px-4`.

### Spacing

Standard Tailwind scale (multiples of 4px), used as-is with no custom extension:

| Tailwind token | Value | rem     |
| -------------- | ----- | ------- |
| `1`            | 4px   | 0.25rem |
| `2`            | 8px   | 0.5rem  |
| `3`            | 12px  | 0.75rem |
| `4`            | 16px  | 1rem    |
| `6`            | 24px  | 1.5rem  |
| `8`            | 32px  | 2rem    |
| `12`           | 48px  | 3rem    |
| `16`           | 64px  | 4rem    |
| `24`           | 96px  | 6rem    |

**Observed usage rules**:

- Card inner padding: `p-6` (24px).
- Gap between icon and section title (`SectionHeading`): `gap-4` (16px).
- Bottom margin before section content: `mb-10` (40px).
- Pill button padding: `px-6.5 py-3` (~26px/12px).
- Vertical spacing between page sections: 64-96px (`py-16` to `py-24`) depending on density.

### Radius

Based on a root token `--radius: 1rem` (16px), derived into:

```css
--radius: 1rem;
--radius-sm: calc(var(--radius) - 0.5rem); /* 0.5rem / 8px */
--radius-md: calc(var(--radius) - 0.25rem); /* 0.75rem / 12px */
--radius-lg: var(--radius); /* 1rem / 16px */
--radius-xl: calc(var(--radius) + 0.25rem); /* 1.25rem / 20px */
```

| Component                       | Applied radius                                                                    |
| ------------------------------- | --------------------------------------------------------------------------------- |
| Card (`Card.vue`)               | `rounded-2xl` (16px, off Tailwind's default scale but aligned with `--radius-lg`) |
| `pill` / `pill-outline` buttons | `rounded-full`                                                                    |
| Standard shadcn buttons         | `rounded-md`                                                                      |
| Badges                          | `rounded-full`                                                                    |
| Mobile menu                     | `rounded-2xl`                                                                     |
| Floating action buttons (FAB)   | `rounded-full` (`size-11`/`size-14`)                                              |

**Rule**: action elements (buttons, badges, FABs) are **always** `rounded-full` — that's a system signature. Content containers (cards, panels, menus) use the `--radius-*` scale, never `rounded-full`.

### Shadows / Elevation

The system has **no** custom shadow token in `@theme` — it relies on the native Tailwind scale (`shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`) applied case by case, plus one custom colored shadow for the cursor.

| Level          | Class                                                                | Observed usage                                                                                             |
| -------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 0 — Flat       | `shadow-none`                                                        | Content cards (`Card.vue`) — the system prefers **borders** over shadows for visual separation             |
| 1 — Light      | `shadow-xs`                                                          | `outline` button                                                                                           |
| 2 — Medium     | `shadow-md`                                                          | Secondary floating action button                                                                           |
| 3 — Strong     | `shadow-lg`                                                          | Primary FAB, open mobile menu, floating CV CTA                                                             |
| Special — glow | `shadow-[0_0_18px_color-mix(in_srgb,var(--accent)_55%,transparent)]` | Custom cursor (`CustomCursor.vue`) — the system's only colored shadow, reserved for this micro-interaction |

**Elevation principle**: z-index and shadow rise together only for elements _floating above the flow_ (FAB, mobile menu, cursor). Structural content (cards, sections) stays flat with borders — avoids a skeuomorphic feel on a site meant to read as clean and technical.

### Borders

- Single color: `border-border` (= `--line`, see [palette-couleurs.md](./palette-couleurs.md)).
- Default weight: `1px` (`border`), no `border-2`+ observed anywhere in the current system.
- `* { border-color: var(--color-border); }` is set globally at `@layer base` — any `border` class without an explicit color automatically inherits the correct theme tint.

### Buttons

Two variant families coexist: standard **shadcn variants** (kit inheritance, useful for generic/future use) and **brand variants**, the ones actually used across the site.

| Variant                   | Style                                                                                    | Usage                          |
| ------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------ |
| `pill` _(brand, default)_ | `rounded-full bg-primary` (gold) `font-sans font-semibold`, hover → `bg-accent` (mint)   | Primary CTA                    |
| `pill-outline` _(brand)_  | `rounded-full border` transparent, `font-mono font-semibold`, hover → accent border/text | Secondary CTA                  |
| `default`                 | `bg-primary`, `rounded-md`                                                               | Generic shadcn usage           |
| `outline`                 | Border + `shadow-xs`                                                                     | Generic secondary actions      |
| `secondary`               | `bg-secondary`                                                                           | Tertiary actions               |
| `ghost`                   | Transparent, hover `bg-accent`                                                           | Subtle actions (toolbar icons) |
| `link`                    | Underlines on hover, primary color                                                       | Inline link styled as a button |
| `destructive`             | `bg-destructive`                                                                         | Deletion, irreversible actions |

Sizes: `default` (36px), `xs` (24px), `sm` (32px), `lg` (40px), `icon`/`icon-xs`/`icon-sm`/`icon-lg` (square), `pill`/`pill-md`/`pill-sm` (auto height, CTA families).

**Systematic hover state**: background change (`bg-primary` → `bg-accent` for `pill`) rather than simple darkening — hover literally flips to the secondary brand color, reinforcing the gold/mint duo on every interaction.

### Inputs

_(Not yet heavily implemented across current pages — recommendation based on existing tokens for future consistency.)_

- Border: `border-input` (= `--line`).
- Focus: `ring-3 ring-ring/50` with `--color-ring = --accent` — mint serves as the focus color across the whole system (consistent with its role as the interactive accent).
- Radius: `rounded-md` (aligned with standard buttons, not `pill`).
- Error state: `aria-invalid:border-destructive aria-invalid:ring-destructive/20`.

### Cards

`Card.vue` (wrapper): `gap-3.5 rounded-2xl p-6 shadow-none` layered on the shadcn `Card` which provides `bg-card text-card-foreground flex flex-col border`.

- Background: `--card` (off-white in day mode / dark navy in night mode).
- No shadow — separation via a 1px `border` (`--line`) only.
- Generous inner padding: 24px, never less.
- Inner gap between stacked elements: 14px (`gap-3.5`).

### Navigation

- **Desktop**: horizontal nav, logo (`LogoMark`, 36px) + links + theme switch + language selector.
- **Mobile** (`MobileMenu.vue`): floating panel `rounded-2xl border bg-background shadow-lg`, positioned `absolute right-0 top-[calc(100%+10px)]`, `gap-4`, `p-5`, `z-50`.
- **Floating actions** (`FloatingActions.vue`): primary FAB `size-11` mobile / `size-14` desktop, `bg-primary shadow-lg`, hover `scale-105`; secondary FAB hidden on mobile (`hidden md:flex`), `bg-background border shadow-md`.

### Modals

_(shadcn-vue Dialog pattern available, not heavily deployed yet.)_ Consistency recommendation: `rounded-2xl`, `shadow-lg`, overlay `bg-ink/40` (day) or `bg-black/60` (night), entrance animation similar to `intro-logo-in` (fade + slight scale) rather than a slide, to stay consistent with the logo's animation language.

### Badges / Tags

`Badge.vue`: `rounded-full border px-2 py-0.5`, forced to `font-mono text-[0.7812rem] font-medium tracking-wide normal-case` — **always monospace, never forced uppercase** (a deliberate deviation from the shadcn default). Default variant: `outline`.

| Variant               | Usage                       |
| --------------------- | --------------------------- |
| `outline` _(default)_ | Skill tags, filters         |
| `default`             | Active / highlighted status |
| `secondary`           | Neutral status              |
| `destructive`         | Error / urgent status       |

### Alerts

_(No dedicated Alert component currently.)_ Recommendation based on `--color-destructive` and mint as success (see [palette-couleurs.md](./palette-couleurs.md)): `bg-destructive/10` fill + `border-destructive/30` border + `text-destructive` text for errors; `bg-accent/10` + `border-accent/30` for success/info.

### Icons

See [iconographie.md](./iconographie.md) for full detail. Summary: `lucide` via `@iconify-json/lucide` + `AppIcon.vue` component (dynamic resolution by string name), standard size `size-8` in section headers, `size-4`/`size-3` inside buttons.

### Animations

No animation library (GSAP and motion-v were deliberately removed — see `CLAUDE.md`): native CSS only (`@keyframes` + Tailwind transitions).

| Animation       | Token                     | Duration                                        | Usage                                         |
| --------------- | ------------------------- | ----------------------------------------------- | --------------------------------------------- |
| `marquee`       | `--animate-marquee`       | 26s linear infinite                             | Scrolling banner (tech stack, client logos)   |
| `blink`         | `--animate-blink`         | 1.1s step-end infinite                          | Terminal-style blinking cursor                |
| `pulse-dot`     | `--animate-pulse-dot`     | 1.6s ease-in-out infinite                       | Status indicator (available, online)          |
| `logo-letters`  | `--animate-logo-letters`  | 3s ease-in-out infinite                         | Monogram breathing (see [logo.md](./logo.md)) |
| `intro-logo-in` | `--animate-intro-logo-in` | 700ms `cubic-bezier(0.16, 1, 0.3, 1)`, one-shot | Logo entrance on the intro screen             |

One-off transitions (hover, focus): `transition-all` / `transition-colors` / `transition-transform`, `duration-300`, default `ease-out` easing. `scale-105` is the standard hover pattern on circular elements (FAB, logo).

### Responsive

Strict mobile-first: base classes = mobile, `sm:`/`md:`/`lg:` prefixes add complexity. No custom breakpoints — default Tailwind scale (640/768/1024/1280/1536). `Container` keeps a fixed max-width (1180px) rather than scaling indefinitely on very large screens.

### States

| State        | Treatment                                                                                                                                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Hover**    | Background/color shift toward the brand palette (gold→mint on `pill`), `scale-105` on circular elements, `translate-x-1` on button arrow icons (`group-hover:translate-x-1`)                                                                                                                           |
| **Active**   | Inherits standard shadcn hover (`active:` rarely used explicitly — worth reinforcing if touch interactions become frequent)                                                                                                                                                                            |
| **Focus**    | `ring-3 ring-ring/50` (mint), `focus-visible:border-ring` — focus is always visible, never suppressed (`outline-none` compensated by the ring)                                                                                                                                                         |
| **Disabled** | `disabled:pointer-events-none disabled:opacity-50` — standard shadcn pattern, consistent everywhere                                                                                                                                                                                                    |
| **Loading**  | Handled at the page level (see project memory: "improved loading states and error handling" on blog/projects) rather than at the atomic component level — no standardized button spinner currently, to be defined if needed (recommendation: reuse `animate-pulse-dot` as an inline loading indicator) |

### Design Tokens (summary)

```
Color       → see palette-couleurs.md (semantic @theme tokens)
Typography  → see typographie.md (--font-sans, --font-mono, --text-*)
Radius      → --radius: 1rem (+ derived sm/md/lg/xl)
Spacing     → default Tailwind scale (4/8/12/16/24/32/48/64/96px)
Shadow      → default Tailwind scale (xs/sm/md/lg), shadow-none by default on cards
Animation   → 5 custom keyframes (marquee, blink, pulse-dot, logo-letters, intro-logo-in)
```

### CSS Variables (full excerpt, colors excluded — see palette doc)

See the FR section above for the complete `@theme inline` code block (identical in both languages, taken directly from the source file). Color tokens (`:root`, `:root[data-theme='night']`) are documented in full in [palette-couleurs.md](./palette-couleurs.md).
