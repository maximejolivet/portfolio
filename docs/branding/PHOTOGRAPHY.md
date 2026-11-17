# Photographie / Photography

**🇫🇷 Deux types de photo seulement : le portrait studio sur fond gold, et des captures réelles non retouchées.** · **🇬🇧 Only two photo types: the studio portrait on gold, and real, unretouched screenshots.**

> Références réelles / real references: [`public/maximejolivet.jpg`](../../public/maximejolivet.jpg) (portrait), [`public/open-graph-maximejolivet.jpg`](../../public/open-graph-maximejolivet.jpg), [`public/projects/vygon.jpg`](../../public/projects/vygon.jpg) (capture). Fonds / backgrounds: [COLOR_PALETTE.md](./COLOR_PALETTE.md). Placeholders (`ImagePlaceholder.vue`): [ICONOGRAPHY.md](./ICONOGRAPHY.md).

---

## 🇫🇷 Français

### Les 5 règles

1. **Portrait** : une seule photo de personne (`maximejolivet.jpg`), la même partout (about, CV, open graph).
2. **Captures** : screenshots réels d'interfaces livrées (`public/projects/`), sans mise en scène ni retouche.
3. **Pas de stock**, pas de lifestyle, pas d'illustration décorative — "preuves concrètes", pas "ambiance de marque".
4. **Pas de filtre couleur** (pas de duotone gold/mint). Seul le fond du portrait utilise le gold, comme choix de studio, pas en post-traitement.
5. **Pas encore de capture ?** Le motif `--stripe` d'`ImagePlaceholder.vue` ("[ capture - bientôt ]") affiche honnêtement l'absence — jamais de fausse texture photo.

### Portrait de référence (analysé depuis l'asset réel)

**Mise en scène**

| Critère     | Traitement observé                                                                                                               |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Fond**    | Uni, **gold de marque** (`#EFC78A`/`--gold`) comme fond de studio, pas un gris neutre. Le portrait _porte_ la couleur de marque. |
| **Cadrage** | Buste serré, tête légèrement au-dessus du centre, format carré/vertical                                                          |
| **Posture** | Face caméra, épaules légèrement de trois-quarts, regard direct                                                                   |
| **Tenue**   | Polo noir uni — sobre, pro sans costume-cravate, profil tech/dev plutôt que corporate                                            |

**Rendu**

| Critère        | Traitement observé                                                    |
| -------------- | --------------------------------------------------------------------- |
| **Expression** | Sourire ouvert, naturel — approchable, pas de pose corporate rigide   |
| **Lumière**    | Douce, diffuse, sans ombre dure — softbox frontale                    |
| **Contraste**  | Modéré — la peau garde ses nuances, pas de look "flash direct" écrasé |
| **Retouche**   | Légère, naturelle — pas de lissage excessif ni de correction visible  |

**Ambiance** : chaleureuse mais pro. Le fond gold ancre le portrait dans la palette à chaque usage (avatar, "à propos", CV, open graph) → reconnaissance immédiate même sans logo.

### Captures de projets

| Règle         | Détail                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| **Ratio**     | Paysage, ~16:9                                                                                          |
| **Cadrage**   | Plein cadre du produit — pas de mockup d'appareil 3D, capture brute dans une carte au radius du système |
| **Conteneur** | `rounded-2xl border border-border overflow-hidden` — même coins que les cartes standard                 |
| **Retouche**  | Aucune — fidèle au livrable réel, pas idéalisé                                                          |

### Sujets

- **Personnes** — seulement Maxime. Pas d'équipe, de bureau, de "stock people" (portfolio individuel, pas une agence). Nouvelle photo de profil → fond uni gold ou mint, buste serré, lumière douce frontale, expression ouverte.
- **Lieux de travail** — absents. Si besoin (photo de setup) : épuré, lumière naturelle, sans désordre.
- **Nature** — non utilisée, hors sujet.

### Prompts IA (déclinaisons : bannières, réseaux sociaux)

**Uniquement pour du contenu dérivé** (visuel LinkedIn, bannière d'article). **Jamais** pour remplacer une vraie capture ou le portrait réel.

```
Professional studio headshot photography style, solid warm gold/tan
background (#EFC78A), soft frontal diffused studio lighting, no harsh
shadows, subject centered, chest-up crop, natural genuine smile,
approachable but professional, minimal color grading, high resolution,
85mm portrait lens look, shallow depth of field on background only
```

```
Clean flat-lay or overhead photo of a modern developer workspace:
laptop showing code editor, notebook, coffee cup, minimal desk
accessories, warm neutral color palette (cream, gold, deep teal
accents), soft natural window light, uncluttered, editorial tech
blog aesthetic, no visible brand logos
```

```
Wide-format UI screenshot mockup, browser chrome minimal or absent,
crisp interface capture with rounded corners (16px radius), subtle
border, placed on an off-white background, professional case-study
presentation style, no 3D device mockup, flat and honest product
photography
```

---

## 🇬🇧 English

### The 5 rules

1. **Portrait**: a single photo of a person (`maximejolivet.jpg`), the same everywhere (about, CV, open graph).
2. **Captures**: real screenshots of shipped interfaces (`public/projects/`), no staging, no retouching.
3. **No stock**, no lifestyle, no decorative illustration — "concrete proof", not "brand mood".
4. **No color filter** (no gold/mint duotone). Only the portrait background uses gold, as a studio choice, not post-processing.
5. **No capture yet?** The `--stripe` pattern in `ImagePlaceholder.vue` ("[ capture - coming soon ]") honestly shows the absence — never a fake photo texture.

### Reference portrait (analyzed from the real asset)

**Staging**

| Criterion      | Observed treatment                                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Background** | Solid **brand gold** (`#EFC78A`/`--gold`) as the studio backdrop, not a neutral gray. The portrait _wears_ the brand color. |
| **Framing**    | Tight chest-up crop, head slightly above center, square/vertical format                                                     |
| **Posture**    | Facing camera, shoulders slightly three-quarter, direct gaze                                                                |
| **Attire**     | Plain black polo — understated, professional without suit-and-tie, tech/dev rather than corporate                           |

**Rendering**

| Criterion      | Observed treatment                                                    |
| -------------- | --------------------------------------------------------------------- |
| **Expression** | Open, natural smile — approachable, no stiff corporate pose           |
| **Lighting**   | Soft, diffused, no hard shadow — frontal softbox                      |
| **Contrast**   | Moderate — skin keeps its tonal range, no crushed "direct flash" look |
| **Retouching** | Light, natural — no excessive smoothing or visible correction         |

**Mood**: warm but professional. The gold background anchors the portrait in the palette on every use (avatar, "about", CV, open graph) → instant recognition even without a logo.

### Project captures

| Rule           | Detail                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Ratio**      | Landscape, ~16:9                                                                         |
| **Framing**    | Full-bleed product — no 3D device mockup, raw capture inside a card at the system radius |
| **Container**  | `rounded-2xl border border-border overflow-hidden` — same corners as standard cards      |
| **Retouching** | None — faithful to the real deliverable, not idealized                                   |

### Subjects

- **People** — only Maxime. No team, office or "stock people" shots (individual portfolio, not an agency). New profile photo → solid gold or mint background, tight chest-up crop, soft frontal light, open expression.
- **Workspaces** — not depicted. If needed (setup photo): clean, natural light, no clutter.
- **Nature** — not used, out of scope.

### AI prompts (derivatives: banners, social media)

**Derivative content only** (LinkedIn visual, article banner). **Never** to replace a real capture or the real portrait.

The three prompts in the FR section above are identical in either language (written for AI image tools) — copy them from there.
