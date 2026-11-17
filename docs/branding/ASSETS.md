# Assets

**🇫🇷 Prochaine action : remplacer les captures placeholder de `constants/projects.ts`.** · **🇬🇧 Next action: replace the placeholder screenshots in `constants/projects.ts`.**

> Specs par type d'asset / per-asset specs: [LOGO.md](./LOGO.md), [PHOTOGRAPHY.md](./PHOTOGRAPHY.md), [COLOR_PALETTE.md](./COLOR_PALETTE.md).

---

## 🇫🇷 Français

### Priorités

1. **Remplacer les captures placeholder** — contenu fictif dans `constants/projects.ts` (voir mémoire projet, "Content still fictional, needs replacing by Maxime").
2. **Exporter le logo en PNG/PDF** — candidatures, print.
3. **Produire une signature mail** — usage fréquent, coût faible.

### Existe déjà

**Identité**

| Asset                 | Statut             | Emplacement                                                                                               |
| --------------------- | ------------------ | --------------------------------------------------------------------------------------------------------- |
| Logo SVG (monogramme) | ✅ Existe          | [`components/ui/LogoMark.vue`](../../components/ui/LogoMark.vue) (inline, pas un fichier `.svg` statique) |
| Logo SVG statique     | ⚠️ Partiel         | `public/maxime.svg` — à vérifier si identique au composant `LogoMark`                                     |
| Favicon               | ✅ Existe          | `public/favicon.ico`, `public/favicon.png`                                                                |
| Textures / motifs     | ✅ Génératif (CSS) | Motif de rayures `--stripe` en CSS (`ImagePlaceholder.vue`), pas un fichier image                         |

**Contenu**

| Asset             | Statut     | Emplacement                                                                                                                                 |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Portrait          | ✅ Existe  | `public/maximejolivet.jpg`                                                                                                                  |
| Image Open Graph  | ✅ Existe  | `public/open-graph-maximejolivet.jpg`                                                                                                       |
| CV (PDF)          | ✅ Existe  | `public/cv-maximejolivet-developpeur-web-fullstack-senior-lead-dev-php-symfony-drupal-wordpress-javascript-vuejs-ia.pdf` (fichier unique)   |
| Capture de projet | ⚠️ 1 seule | `public/projects/vygon.jpg` — les autres études de cas (`constants/projects.ts` : ecommerce/marque/interventions/media) sont en placeholder |

### À produire

**Logo & print**

| Asset                      | Notes                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------- |
| Logo PNG                   | Export du SVG à 512px, 256px, 128px (fond transparent)                              |
| Logo PDF (vectoriel print) | Supports imprimés (cartes de visite, etc.)                                          |
| Cartes de visite           | Prompts dans [AI_PROMPTS.md](./AI_PROMPTS.md)                                       |
| Signature mail             | Nom en Space Grotesk 600, rôle en JetBrains Mono, logo 24px, lien vers le portfolio |

**Réseaux & marketing**

| Asset                             | Notes                                         |
| --------------------------------- | --------------------------------------------- |
| Bannières réseaux sociaux         | LinkedIn (1584×396) ; Open Graph déjà couvert |
| Réseaux sociaux (avatars, covers) | —                                             |
| Photos marketing additionnelles   | Voir [PHOTOGRAPHY.md](./PHOTOGRAPHY.md)       |
| Mockups (device/produit)          | Prompts dans [AI_PROMPTS.md](./AI_PROMPTS.md) |
| Templates (deck, doc), PowerPoint | —                                             |

### Hors scope

| Asset         | Raison                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------- |
| Icônes custom | N/A — Lucide via Iconify, voir [ICONOGRAPHY.md](./ICONOGRAPHY.md)                           |
| Illustrations | Aucun style établi — recommandation si besoin futur dans [ICONOGRAPHY.md](./ICONOGRAPHY.md) |
| Goodies       | Non prioritaire pour un portfolio personnel                                                 |
| Packaging     | Aucun produit physique associé à la marque                                                  |

### Nommer un fichier

Pattern de `public/` : `[nom-du-fichier]-maximejolivet[-descripteur].{ext}` — minuscules, tirets, sans accents.

### Formats et résolutions

| Type                   | Format               | Résolution / poids                                          |
| ---------------------- | -------------------- | ----------------------------------------------------------- |
| Logo web               | SVG (préféré) ou PNG | SVG vectoriel ; PNG 512×512 min si raster nécessaire        |
| Favicon                | ICO + PNG            | 16×16, 32×32, 180×180 (apple-touch-icon)                    |
| Photos web             | JPG/WebP             | Largeur max 1600px (`@nuxt/image` optimise automatiquement) |
| Open Graph             | JPG                  | 1200×630px                                                  |
| CV                     | PDF                  | A4, < 2 Mo                                                  |
| Print (cartes, flyers) | PDF vectoriel (CMJN) | 300 DPI minimum                                             |

---

## 🇬🇧 English

### Priorities

1. **Replace placeholder screenshots** — fictional content in `constants/projects.ts` (see project memory, "Content still fictional, needs replacing by Maxime").
2. **Export the logo as PNG/PDF** — applications, print.
3. **Produce an email signature** — frequent use, low cost.

### Already exists

**Identity**

| Asset               | Status              | Location                                                                                            |
| ------------------- | ------------------- | --------------------------------------------------------------------------------------------------- |
| Logo SVG (monogram) | ✅ Exists           | [`components/ui/LogoMark.vue`](../../components/ui/LogoMark.vue) (inline, not a static `.svg` file) |
| Static logo SVG     | ⚠️ Partial          | `public/maxime.svg` — verify whether it matches the `LogoMark` component                            |
| Favicon             | ✅ Exists           | `public/favicon.ico`, `public/favicon.png`                                                          |
| Textures / patterns | ✅ Generative (CSS) | `--stripe` stripe pattern in CSS (`ImagePlaceholder.vue`), not an image file                        |

**Content**

| Asset              | Status    | Location                                                                                                                               |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Portrait           | ✅ Exists | `public/maximejolivet.jpg`                                                                                                             |
| Open Graph image   | ✅ Exists | `public/open-graph-maximejolivet.jpg`                                                                                                  |
| CV (PDF)           | ✅ Exists | `public/cv-maximejolivet-developpeur-web-fullstack-senior-lead-dev-php-symfony-drupal-wordpress-javascript-vuejs-ia.pdf` (single file) |
| Project screenshot | ⚠️ Only 1 | `public/projects/vygon.jpg` — the other case studies (`constants/projects.ts`: ecommerce/marque/interventions/media) are placeholders  |

### To produce

**Logo & print**

| Asset                   | Notes                                                                        |
| ----------------------- | ---------------------------------------------------------------------------- |
| Logo PNG                | SVG export at 512px, 256px, 128px (transparent background)                   |
| Logo PDF (print vector) | Printed materials (business cards, etc.)                                     |
| Business cards          | Prompts in [AI_PROMPTS.md](./AI_PROMPTS.md)                                  |
| Email signature         | Name in Space Grotesk 600, role in JetBrains Mono, 24px logo, portfolio link |

**Social & marketing**

| Asset                             | Notes                                           |
| --------------------------------- | ----------------------------------------------- |
| Social media banners              | LinkedIn (1584×396); Open Graph already covered |
| Social media (avatars, covers)    | —                                               |
| Additional marketing photos       | See [PHOTOGRAPHY.md](./PHOTOGRAPHY.md)          |
| Mockups (device/product)          | Prompts in [AI_PROMPTS.md](./AI_PROMPTS.md)     |
| Templates (deck, doc), PowerPoint | —                                               |

### Out of scope

| Asset         | Reason                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------ |
| Custom icons  | N/A — Lucide via Iconify, see [ICONOGRAPHY.md](./ICONOGRAPHY.md)                           |
| Illustrations | No established style — recommendation if ever needed in [ICONOGRAPHY.md](./ICONOGRAPHY.md) |
| Goodies       | Not a priority for a personal portfolio                                                    |
| Packaging     | No physical product associated with the brand                                              |

### Naming a file

Pattern used in `public/`: `[filename]-maximejolivet[-descriptor].{ext}` — lowercase, hyphens, no accents.

### Formats and resolutions

| Type                  | Format                 | Resolution / weight                                      |
| --------------------- | ---------------------- | -------------------------------------------------------- |
| Web logo              | SVG (preferred) or PNG | Vector SVG; PNG 512×512 min if raster required           |
| Favicon               | ICO + PNG              | 16×16, 32×32, 180×180 (apple-touch-icon)                 |
| Web photos            | JPG/WebP               | Max width 1600px (`@nuxt/image` optimizes automatically) |
| Open Graph            | JPG                    | 1200×630px                                               |
| CV                    | PDF                    | A4, < 2MB                                                |
| Print (cards, flyers) | Vector PDF (CMYK)      | 300 DPI minimum                                          |
