# Prompts IA / AI Prompts

**🇫🇷 Générer un visuel : coller le bloc de marque ci-dessous, puis le prompt du livrable, puis remplacer le texte et corriger les couleurs à la main.**
**🇬🇧 Generate a visual: paste the brand block below, then the deliverable's prompt, then replace the text and correct colors by hand.**

> Prompts en anglais (standard du secteur, meilleure fidélité) ; titres bilingues. / Prompts in English (industry standard, better fidelity); bilingual headings. Bibliothèques détaillées / detailed libraries: [LOGO.md](./LOGO.md), [PHOTOGRAPHY.md](./PHOTOGRAPHY.md), [MOODBOARD.md](./MOODBOARD.md).

## Étapes / Steps

1. **FR** Coller le bloc de marque en préfixe. **EN** Prepend the brand block.
   - Midjourney : `--sref` (style de référence) une fois quelques rendus validés / once a few outputs are validated.
   - Flux/SD : concaténer directement au prompt / concatenate directly.
2. **FR** Ajouter le prompt du livrable (sections ci-dessous). **EN** Add the deliverable's prompt (sections below).
3. **FR** Remplacer tout texte généré par le vrai texte (Space Grotesk / JetBrains Mono) en post-production — l'IA gère mal la typo. **EN** Replace any generated text with real text (Space Grotesk / JetBrains Mono) in post — AI handles typography poorly.
4. **FR** Comparer les couleurs aux HEX exacts ([COLOR_PALETTE.md](./COLOR_PALETTE.md)) et corriger — les moteurs dérivent presque toujours. **EN** Compare colors to exact HEX ([COLOR_PALETTE.md](./COLOR_PALETTE.md)) and correct — engines almost always drift.
5. **FR** Vérifier contre [TYPOGRAPHY.md](./TYPOGRAPHY.md) et [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md). **EN** Check against [TYPOGRAPHY.md](./TYPOGRAPHY.md) and [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md).

**⚠️ Logo** — jamais un rendu IA comme asset final / never use an AI render as the final asset. Le SVG codé [`components/ui/LogoMark.vue`](../../components/ui/LogoMark.vue) reste l'unique source de vérité / stays the single source of truth ([LOGO.md](./LOGO.md)).

## Bloc de marque / Brand block

```
Brand color palette: warm cream background #F3F4F0 (or deep navy
#152833 for dark mode), deep ink #1D3540 text, gold #EFC78A primary
accent, seafoam mint #7FD9C4 secondary accent, terracotta #C65B4F
alert only. Typography feel: geometric sans-serif (Space Grotesk-like)
for headings, monospace (JetBrains Mono-like) for data/labels. Flat
design, no gradients, no drop shadows, generous rounded corners
(16px+), thin 1px borders, organic circular logo motif. Warm,
minimal, technical-but-approachable senior developer personal brand.
```

---

## Identité / Identity

### Logo

```
Minimalist single-color monogram logo, letter "M" abstracted into two
downward chevron shapes suggesting code brackets < >, enclosed in a
slightly organic hand-drawn circle, flat vector, solid fill only, no
gradient, no stroke outline, currentColor single-tone, professional
tech-personal-brand aesthetic, Space Grotesk typography influence
```

_(Bibliothèque complète et variantes : [LOGO.md](./LOGO.md))_

### Icônes / Icons

```
Icon set, outline style, 2px rounded stroke, 24x24px grid, single
color currentColor, lucide-icon-style minimalism, subjects: code
brackets, terminal, gear, checkmark, arrow, document, rocket —
consistent stroke weight across all icons, no fill, rounded caps and
joins, vector, flat
```

### Illustrations

```
Flat vector illustration, empty-state / 404 concept, single-color
line art matching a warm cream and deep-navy palette, thin 2px
strokes, rounded caps, minimal geometric character or object, no
gradients, no textures, clean editorial tech-illustration style,
24-32px icon grid consistency
```

## Interfaces

### Homepage (desktop hero)

```
Website homepage hero section mockup, warm cream background #F3F4F0,
deep ink #1D3540 large bold geometric-sans headline on the left,
gold #EFC78A rounded-full pill call-to-action button, seafoam mint
#7FD9C4 accent underline, monospace small caption label above
headline, circular portrait photo on warm gold background on the
right, generous whitespace, flat design, no shadows, thin borders,
16px+ rounded corners on all cards, professional developer portfolio
website, clean modern layout, high fidelity UI mockup
```

### Dashboard

```
SaaS dashboard UI mockup, dark navy #152833 sidebar with cream text,
main content area cream background, data cards with 16px rounded
corners and 1px thin borders (no drop shadow), gold #EFC78A accent
for primary metrics, seafoam mint #7FD9C4 for positive trend
indicators, monospace font for numeric data and labels, geometric
sans-serif for headings, minimal line chart in mint, flat design,
professional developer-tool aesthetic, high fidelity
```

### Application mobile / Mobile app

```
Mobile app UI screens mockup, iOS-style status bar, warm cream
background, bottom rounded-full pill navigation bar in deep ink with
gold active-state indicator, cards with generous 20px rounded
corners and thin borders, monospace badges for tags, geometric
sans-serif headings, flat minimal design, no gradients no shadows,
professional developer/productivity app aesthetic, two screens shown
side by side, high fidelity UI mockup
```

## Print

### Cartes de visite / Business cards

```
Minimalist business card design, front side: cream background
#F3F4F0, small circular organic monogram logo (letter M as code
chevrons) in gold, name "Maxime Jolivet" in bold geometric sans-serif
deep ink text, role "Développeur Web Full-Stack Senior" in small
monospace caption below; back side: deep navy #152833 background,
same monogram logo in cream, contact details in monospace mint text,
flat design, no gradients, elegant thick matte cardstock texture,
print mockup, professional
```

### Flyers

```
A5 flyer design, warm cream background, bold geometric sans-serif
headline in deep ink, gold rounded-full accent shapes as decorative
elements (sparse, not cluttered), monospace small print details
section, circular organic logo monogram in a corner, generous
whitespace margins, flat print design, professional tech-personal-
brand event flyer, clean editorial layout, print-ready mockup
```

### Affiches / Posters

```
Large format poster design, deep navy #152833 background, oversized
bold geometric sans-serif typography in cream taking up most of the
composition, single gold circular organic monogram logo mark small
in a corner, minimal mint accent line, flat design, no gradients,
confident minimal typographic poster, professional developer/tech
event poster aesthetic, print-ready
```

## Réseaux & produits / Social & products

### Réseaux sociaux / Social media

```
Social media post template, square 1:1 format, warm cream background
#F3F4F0, bold geometric sans-serif headline in deep ink #1D3540,
small monospace caption label, gold #EFC78A rounded pill badge
accent, circular organic monogram logo watermark bottom corner, flat
design, generous padding, professional developer personal-brand
social content, clean minimal editorial style, Instagram/LinkedIn
carousel-ready
```

```
LinkedIn banner design, 1584x396px format, deep navy #152833
background, cream bold geometric sans-serif tagline text left-
aligned, seafoam mint thin accent line, circular organic gold
monogram logo right side, flat minimal professional design, no
clutter, senior developer personal brand banner
```

### Mockups

```
Realistic laptop and smartphone mockup on a warm cream flat surface,
soft natural diffused lighting from the left, minimal styling props
(a matte ceramic mug, a brass pen), screen displaying a clean flat
cream-and-navy UI design with gold accent buttons, top-down or
45-degree angle, editorial product photography style, shallow depth
of field, professional presentation mockup
```

### Packaging

```
Minimalist matte cream product box packaging design, hot-stamped
gold foil circular organic monogram logo centered, small monospace
serial-number-style label in a corner, deep navy accent trim on the
box edge, no gloss, premium craftsman-tool aesthetic, studio product
photography, soft diffused lighting, flat design, professional
```

### Goodies

```
Branded merchandise mockup: matte ceramic mug in seafoam mint with a
small gold circular organic monogram logo, and a cream tote bag with
the same logo printed in deep ink, flat lay product photography,
soft natural light, warm minimal styling, no clutter, professional
brand merchandise presentation
```

## Ambiance / Mood

### Moodboard

_(Bibliothèque complète : [MOODBOARD.md](./MOODBOARD.md))_

```
Warm minimalist brand moodboard collage, cream and deep navy color
blocks, gold and seafoam mint accent swatches, matte brass and
ceramic material textures, geometric sans-serif and monospace
typography samples, flat vector organic circle shapes, editorial
studio photography lighting, no neon, no glossy plastic, clean
professional brand identity board layout
```

### Photos marketing / Marketing photography

_(Bibliothèque complète : [PHOTOGRAPHY.md](./PHOTOGRAPHY.md))_

```
Professional studio headshot photography, solid warm gold background
#EFC78A, soft frontal diffused studio lighting, no harsh shadows,
subject centered chest-up crop, natural genuine smile, approachable
professional look, minimal color grading, high resolution, shallow
depth of field on background only
```
