# Photographie / Photography

> Références réelles : [`public/maximejolivet.jpg`](../../public/maximejolivet.jpg) (portrait), [`public/open-graph-maximejolivet.jpg`](../../public/open-graph-maximejolivet.jpg), [`public/projects/vygon.jpg`](../../public/projects/vygon.jpg) (capture projet). Voir [palette-couleurs.md](./palette-couleurs.md) pour les couleurs de fond et [iconographie.md](./iconographie.md) pour le traitement des placeholders (`ImagePlaceholder.vue`).

---

## 🇫🇷 Français

### Style photo

Deux catégories bien distinctes coexistent sur le portfolio, chacune avec ses propres règles :

1. **Portrait personnel** — studio, fond uni, cadrage serré. Une seule vraie photo de personne sur le site (`maximejolivet.jpg`), utilisée en cohérence sur toutes les pages qui présentent Maxime (about, CV, open graph).
2. **Captures de projets** — screenshots réels d'interfaces livrées (`public/projects/`), pas de mise en scène, le produit fini est la photo.

Il n'y a **pas** de photographie de stock, de lifestyle, ou d'illustration décorative sur le site — cohérent avec un positionnement "preuves concrètes" plutôt que "ambiance de marque".

### Portrait de référence (analysé depuis l'asset réel)

| Critère | Traitement observé |
|---|---|
| **Fond** | Uni, couleur pleine — **le gold de marque** (`#EFC78A`/`--gold`) directement comme fond de studio, pas un fond neutre gris. Le portrait *porte* la couleur de marque plutôt que de simplement y être posé à côté. |
| **Cadrage** | Buste serré, tête légèrement au-dessus du centre, format portrait carré/vertical |
| **Posture** | Face caméra, épaules légèrement de trois-quarts, regard direct |
| **Expression** | Sourire ouvert, naturel — approchable, pas de pose corporate rigide |
| **Lumière** | Douce, diffuse, sans ombre dure visible sur le visage — lumière de studio type softbox frontale |
| **Contraste** | Modéré — la peau garde ses nuances, pas de look "flash direct" écrasé |
| **Tenue** | Polo noir uni — sobre, professionnel sans costume-cravate, cohérent avec un profil tech/dev plutôt que corporate classique |
| **Retouche** | Légère, naturelle — pas de lissage de peau excessif ni de correction visible |

### Ambiance générale

Chaleureuse mais professionnelle. Le fond gold n'est pas un hasard : il ancre visuellement le portrait dans la palette de marque à chaque usage (avatar, section "à propos", CV, open graph social), créant une reconnaissance immédiate même sans logo visible.

### Personnes

- Seule personne représentée : Maxime lui-même. Pas de photo d'équipe, de bureau, ou de "stock people" — cohérent avec un portfolio individuel, pas une agence.
- Si une future photo de personne est ajoutée (ex. nouvelle photo de profil), respecter : fond uni en couleur de marque (gold ou mint), cadrage buste serré, lumière douce frontale, expression ouverte.

### Architecture / Lieux de travail

Non représentée actuellement. Si nécessaire à l'avenir (ex. photo de setup de travail) : privilégier une esthétique épurée, lumière naturelle, sans désordre visuel — cohérent avec la rigueur du design system.

### Nature

Non utilisée — hors sujet pour ce portfolio technique.

### Objets / Textures

Les seules "textures" du système sont **génératives, pas photographiques** : le motif de rayures diagonales (`--stripe`, voir `ImagePlaceholder.vue`) qui sert de fond de remplacement en attendant une vraie capture ("[ capture - bientôt ]"). C'est un choix assumé : plutôt qu'une fausse texture photo, le système affiche honnêtement l'absence de visuel.

### Composition et cadrage — captures de projets

| Règle | Détail |
|---|---|
| **Ratio** | Format large (paysage), type 16:9 ou proche, pour capture d'écran d'interface |
| **Cadrage** | Plein cadre du produit — pas de mockup d'appareil (téléphone/laptop en 3D) autour, capture brute présentée dans une carte au radius du design system |
| **Conteneur** | `rounded-2xl border border-border overflow-hidden` — même traitement de coin que les cartes standard |
| **Retouche** | Aucune — la capture doit représenter fidèlement le livrable réel, pas une version idéalisée |

### Couleurs dans la photo

Aucune photo n'est traitée avec un filtre couleur de marque (pas de duotone gold/mint imposé) — la photographie reste dans ses couleurs naturelles. Seul le **fond du portrait studio** utilise intentionnellement le gold de marque comme choix de mise en scène, pas de post-traitement.

### Exemples de prompts IA (pour déclinaisons futures : bannières, réseaux sociaux)

À utiliser uniquement pour du contenu dérivé (ex. visuel LinkedIn, bannière d'article) — **jamais pour remplacer une vraie capture de projet ou le portrait réel**, qui doivent rester authentiques.

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

### Photo style

Two clearly distinct categories coexist on the portfolio, each with its own rules:

1. **Personal portrait** — studio, solid background, tight crop. A single real photo of a person on the site (`maximejolivet.jpg`), used consistently across every page that introduces Maxime (about, CV, open graph).
2. **Project captures** — real screenshots of shipped interfaces (`public/projects/`), no staging, the finished product *is* the photo.

There is **no** stock photography, lifestyle imagery, or decorative illustration on the site — consistent with a "concrete proof" positioning rather than a "brand mood" one.

### Reference portrait (analyzed from the real asset)

| Criterion | Observed treatment |
|---|---|
| **Background** | Solid, flat color — **the brand's gold** (`#EFC78A`/`--gold`) used directly as the studio backdrop, not a neutral gray. The portrait *wears* the brand color rather than simply sitting next to it. |
| **Framing** | Tight chest-up crop, head slightly above center, square/vertical portrait format |
| **Posture** | Facing camera, shoulders slightly three-quarter, direct gaze |
| **Expression** | Open, natural smile — approachable, no stiff corporate pose |
| **Lighting** | Soft, diffused, no visible hard shadow on the face — frontal softbox-style studio light |
| **Contrast** | Moderate — skin retains its natural tonal range, no crushed "direct flash" look |
| **Attire** | Plain black polo — understated, professional without a suit-and-tie, consistent with a tech/dev profile rather than classic corporate |
| **Retouching** | Light, natural — no excessive skin smoothing or visible correction |

### General mood

Warm but professional. The gold background isn't accidental: it visually anchors the portrait in the brand palette on every use (avatar, "about" section, CV, social open graph), creating instant recognition even without a visible logo.

### People

- The only person depicted is Maxime himself. No team photos, office shots, or "stock people" — consistent with an individual portfolio, not an agency.
- If a future person photo is added (e.g. a new profile picture), respect: solid brand-color background (gold or mint), tight chest-up crop, soft frontal lighting, open expression.

### Architecture / workspaces

Not currently depicted. If needed in the future (e.g. a work-setup photo): favor a clean aesthetic, natural light, no visual clutter — consistent with the design system's rigor.

### Nature

Not used — out of scope for this technical portfolio.

### Objects / Textures

The system's only "textures" are **generative, not photographic**: the diagonal stripe pattern (`--stripe`, see `ImagePlaceholder.vue`) used as a placeholder background while a real capture is pending ("[ capture - bientôt ]" / "[ capture - coming soon ]"). This is a deliberate choice: rather than a fake photo texture, the system honestly displays the absence of a visual.

### Composition and framing — project captures

| Rule | Detail |
|---|---|
| **Ratio** | Wide (landscape) format, roughly 16:9, for interface screenshots |
| **Framing** | Full-bleed product frame — no 3D device mockup (phone/laptop) around it, a raw capture presented inside a card at the design system's radius |
| **Container** | `rounded-2xl border border-border overflow-hidden` — same corner treatment as standard cards |
| **Retouching** | None — the capture must faithfully represent the actual deliverable, not an idealized version |

### Color in photography

No photo is processed with a brand color filter (no imposed gold/mint duotone) — photography stays in its natural colors. Only the **studio portrait background** intentionally uses the brand gold as a staging choice, not post-processing.

### AI prompt examples (for future derivatives: banners, social media)

For derivative content only (e.g. LinkedIn visual, article banner) — **never to replace a real project capture or the real portrait**, which must stay authentic.

See the FR section above for the three ready-to-use prompts (identical in either language, written directly for AI image tools).
