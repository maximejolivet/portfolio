# Assets

> Inventaire des ressources de marque : ce qui existe déjà dans le repo, ce qui reste à produire. Voir [logo.md](./logo.md), [photographie.md](./photographie.md) et [palette-couleurs.md](./palette-couleurs.md) pour les spécifications de chaque type d'asset.

---

## 🇫🇷 Français

### État des lieux

| Asset | Statut | Emplacement |
|---|---|---|
| Logo SVG (monogramme) | ✅ Existe | [`components/ui/LogoMark.vue`](../../components/ui/LogoMark.vue) (inline, pas un fichier `.svg` statique) |
| Logo SVG statique | ⚠️ Partiel | `public/maxime.svg` — à vérifier si identique au composant `LogoMark` |
| Favicon | ✅ Existe | `public/favicon.ico`, `public/favicon.png` |
| Portrait | ✅ Existe | `public/maximejolivet.jpg` |
| Image Open Graph | ✅ Existe | `public/open-graph-maximejolivet.jpg` |
| CV (PDF) | ✅ Existe (3 versions) | `public/cv-maximejolivet-developpeur.pdf`, `public/cv-maximejolivet-developpeur-web-fullstack-senior-lead-dev-tech-lead.pdf`, `public/cv-maximejolivet-developpeur-web-fullstack-senior-lead-dev-tech-lead-ia.pdf` — ⚠️ 3 versions actives, clarifier laquelle est canonique ou pourquoi 3 sont nécessaires |
| Capture de projet | ⚠️ 1 seule | `public/projects/vygon.jpg` — les autres études de cas (`constants/projects.ts` : ecommerce/marque/interventions/media) utilisent du contenu placeholder, voir mémoire projet |
| Logo PNG | ❌ À produire | Export du SVG à 512px, 256px, 128px (fond transparent) |
| Logo PDF (vectoriel print) | ❌ À produire | Pour supports imprimés (cartes de visite, etc.) |
| Icônes custom | N/A | Le système utilise Lucide (bibliothèque tierce via Iconify), pas d'icônes custom à produire — voir [iconographie.md](./iconographie.md) |
| Illustrations | ❌ Non existantes | Pas de style d'illustration établi — voir [iconographie.md](./iconographie.md) pour la recommandation si besoin futur |
| Bannières réseaux sociaux | ❌ À produire | LinkedIn (1584×396), Open Graph déjà couvert |
| Photos marketing additionnelles | ❌ À produire | Voir [photographie.md](./photographie.md) |
| Textures / motifs | ✅ Génératif (CSS) | Motif de rayures `--stripe` défini en CSS (`ImagePlaceholder.vue`), pas un fichier image |
| Templates (deck, doc) | ❌ À produire | — |
| Réseaux sociaux (avatars, covers) | ❌ À produire | — |
| Présentation PowerPoint | ❌ À produire | — |
| Cartes de visite | ❌ À produire | Voir prompts dans [prompts-ia.md](./prompts-ia.md) |
| Signature mail | ❌ À produire | Recommandation : nom en Space Grotesk 600, rôle en JetBrains Mono, logo 24px, lien vers le portfolio |
| Goodies | ❌ Non prioritaire | Hors scope actuel d'un portfolio personnel |
| Mockups (device/produit) | ❌ À produire | Voir prompts dans [prompts-ia.md](./prompts-ia.md) |
| Packaging | ❌ Non pertinent | Pas de produit physique associé à la marque actuellement |

### Priorités recommandées

1. **Clarifier les 3 CV PDF** — un seul fichier canonique évite la confusion (nom de fichier, contenu à jour).
2. **Compléter les captures de projets réelles** — remplacer le contenu placeholder de `constants/projects.ts` (voir mémoire projet, "Content still fictional, needs replacing by Maxime").
3. **Exporter le logo en PNG/PDF** pour les usages hors-web (candidature, print).
4. **Produire une signature mail** — usage fréquent, coût de production faible.

### Conventions de nommage

Suivre le pattern déjà en place dans `public/` : `[nom-du-fichier]-maximejolivet[-descripteur].{ext}`, en minuscules, mots séparés par des tirets, sans accents.

### Formats et résolutions recommandés

| Type | Format | Résolution / poids |
|---|---|---|
| Logo web | SVG (préféré) ou PNG | SVG vectoriel ; PNG à 512×512 min si raster nécessaire |
| Favicon | ICO + PNG | 16×16, 32×32, 180×180 (apple-touch-icon) |
| Photos web | JPG/WebP | Largeur max 1600px, compression optimisée (`@nuxt/image` déjà en place pour l'optimisation automatique) |
| Open Graph | JPG | 1200×630px |
| CV | PDF | A4, poids < 2Mo |
| Print (cartes, flyers) | PDF vectoriel (CMJN) | 300 DPI minimum |

---

## 🇬🇧 English

### Current inventory

| Asset | Status | Location |
|---|---|---|
| Logo SVG (monogram) | ✅ Exists | [`components/ui/LogoMark.vue`](../../components/ui/LogoMark.vue) (inline, not a static `.svg` file) |
| Static logo SVG | ⚠️ Partial | `public/maxime.svg` — verify whether it matches the `LogoMark` component |
| Favicon | ✅ Exists | `public/favicon.ico`, `public/favicon.png` |
| Portrait | ✅ Exists | `public/maximejolivet.jpg` |
| Open Graph image | ✅ Exists | `public/open-graph-maximejolivet.jpg` |
| CV (PDF) | ✅ Exists (3 versions) | `public/cv-maximejolivet-developpeur.pdf`, `public/cv-maximejolivet-developpeur-web-fullstack-senior-lead-dev-tech-lead.pdf`, `public/cv-maximejolivet-developpeur-web-fullstack-senior-lead-dev-tech-lead-ia.pdf` — ⚠️ 3 active versions, clarify which is canonical or why 3 are needed |
| Project screenshot | ⚠️ Only 1 | `public/projects/vygon.jpg` — the other case studies (`constants/projects.ts`: ecommerce/marque/interventions/media) use placeholder content, see project memory |
| Logo PNG | ❌ To produce | SVG export at 512px, 256px, 128px (transparent background) |
| Logo PDF (print vector) | ❌ To produce | For printed materials (business cards, etc.) |
| Custom icons | N/A | The system uses Lucide (third-party library via Iconify), no custom icons to produce — see [iconographie.md](./iconographie.md) |
| Illustrations | ❌ None existing | No established illustration style — see [iconographie.md](./iconographie.md) for the recommendation if needed in the future |
| Social media banners | ❌ To produce | LinkedIn (1584×396), Open Graph already covered |
| Additional marketing photos | ❌ To produce | See [photographie.md](./photographie.md) |
| Textures / patterns | ✅ Generative (CSS) | `--stripe` stripe pattern defined in CSS (`ImagePlaceholder.vue`), not an image file |
| Templates (deck, doc) | ❌ To produce | — |
| Social media (avatars, covers) | ❌ To produce | — |
| PowerPoint presentation | ❌ To produce | — |
| Business cards | ❌ To produce | See prompts in [prompts-ia.md](./prompts-ia.md) |
| Email signature | ❌ To produce | Recommendation: name in Space Grotesk 600, role in JetBrains Mono, 24px logo, link to the portfolio |
| Goodies | ❌ Not a priority | Out of scope for a personal portfolio currently |
| Mockups (device/product) | ❌ To produce | See prompts in [prompts-ia.md](./prompts-ia.md) |
| Packaging | ❌ Not applicable | No physical product associated with the brand currently |

### Recommended priorities

1. **Clarify the 3 CV PDFs** — a single canonical file avoids confusion (file naming, up-to-date content).
2. **Complete real project screenshots** — replace the placeholder content in `constants/projects.ts` (see project memory, "Content still fictional, needs replacing by Maxime").
3. **Export the logo as PNG/PDF** for non-web usage (applications, print).
4. **Produce an email signature** — frequent use, low production cost.

### Naming conventions

Follow the pattern already in place under `public/`: `[filename]-maximejolivet[-descriptor].{ext}`, lowercase, words separated by hyphens, no accented characters.

### Recommended formats and resolutions

| Type | Format | Resolution / weight |
|---|---|---|
| Web logo | SVG (preferred) or PNG | Vector SVG; PNG at 512×512 min if raster is required |
| Favicon | ICO + PNG | 16×16, 32×32, 180×180 (apple-touch-icon) |
| Web photos | JPG/WebP | Max width 1600px, optimized compression (`@nuxt/image` already in place for automatic optimization) |
| Open Graph | JPG | 1200×630px |
| CV | PDF | A4, weight < 2MB |
| Print (cards, flyers) | Vector PDF (CMYK) | 300 DPI minimum |
