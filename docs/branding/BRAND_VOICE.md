# Brand Voice — Charte éditoriale

**🇫🇷 Écrire un texte : un fait concret au lieu d'un adjectif, CTA à l'infinitif, jamais de tutoiement ni de superlatif.** · **🇬🇧 Writing copy: a concrete fact instead of an adjective, infinitive CTAs, no over-familiarity, no superlatives.**

> Analysée depuis le contenu réel / analyzed from real content: [`i18n/locales/fr.json`](../../i18n/locales/fr.json) / [`en.json`](../../i18n/locales/en.json). Personnalité sous-jacente / underlying personality: [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md).

---

## 🇫🇷 Français

### Les 5 règles

1. **Factuel** — chiffres et faits plutôt qu'adjectifs ("10 ans d'expérience", pas "expérimenté").
2. **Phrases courtes à moyennes**, peu de subordonnées empilées.
3. **CTA à l'infinitif** ("voir les projets", "me contacter").
4. **Pas d'adresse directe** — infinitif/impersonnel. "Vous" formel **uniquement** sur les pages légales/RGPD. **Jamais de tutoiement.**
5. **Nommer ce qu'on refuse, puis ce qu'on est** — le motif "pas de listicles", "pas juste code".

### Ton

Direct, confiant sans forfanterie, factuel : convaincre par la précision, pas l'enthousiasme. Exemple type (`blog.subtitle`) :

> "Retours d'expérience concrets sur les migrations, le CSS moderne, l'outillage et l'IA. **Pas de listicles**, juste des analyses, des expérimentations et des solutions éprouvées sur des projets réels."

### Style

- Auto-dérision légère, honnêteté assumée plutôt que perfection affichée (`hero.underConstructionNote` : "Site toujours en construction 🚧").
- Titres de section : majuscule à la première lettre seulement.
- Exception : les "eyebrows" (labels au-dessus des titres, ex. `PROJETS`, `BLOG - NOTES DE TERRAIN`) sont en capitales — marqueur de catégorie, pas un cri.
- Vocabulaire technique assumé sans être hermétique : "cadrage technique", "pérennité des choix techniques", "stacks PHP / JavaScript modernes", "migrations", "outillage". Littératie web minimale présupposée (public B2B/recruteur technique).

### Mots

**À privilégier**

- "Ce que le code m'apprend" (titre blog) — le savoir vient de la pratique.
- "Pas juste code" (`aboutSection.titleEnd`) — formule de contraste récurrente.
- "Retours d'expérience concrets", "solutions éprouvées sur des projets réels" — ancrage dans le réel.
- Verbes d'action à l'infinitif pour les CTA : "voir les projets", "me contacter", "télécharger le PDF".

**Interdits**

- ❌ Superlatifs marketing vides : "révolutionnaire", "disruptif", "next-gen", "world-class".
- ❌ Buzzwords creux : "synergie", "leviers de croissance", "solutions innovantes" (sans preuve).
- ❌ Auto-promotion excessive ("le meilleur", "expert incontesté") — la crédibilité vient de la preuve.
- ❌ Emoji en excès — un seul usage (🚧), voir [ICONOGRAPHY.md](./ICONOGRAPHY.md).
- ❌ Anglicismes inutiles quand un terme français aussi clair existe.

### Adresse au lecteur

- **Contenu produit/marketing** : infinitif ou impersonnel ("me contacter", "prendre rendez-vous", "voir les projets"), jamais "tu peux…" / "vous pouvez…". Évite de trancher tu/vous.
- **Pages légales (RGPD, mentions légales)** : vouvoiement formel, seul registre adapté ("les données que **vous** transmettez", "**vous** pouvez exercer **vos** droits").
- **Jamais de tutoiement** — rien dans le contenu actuel ne l'amorce ; il casserait le registre pro.

### CTA

| Contexte    | CTA existant          | Registre             |
| ----------- | --------------------- | -------------------- |
| Contact     | "me contacter"        | Infinitif, direct    |
| Rendez-vous | "Prendre rendez-vous" | Infinitif, direct    |
| Projets     | "Voir les projets"    | Infinitif, direct    |
| CV          | "Télécharger le PDF"  | Infinitif, direct    |
| Blog        | "lire l'article"      | Infinitif, minuscule |

**Règle** : toujours infinitif, toujours minuscule — sauf en début de composant UI où la casse du composant prime (bouton `pill` vs lien texte).

### Accroches & slogans

**Accroches existantes**

- "Un développeur qui pense expérience utilisateur, pas juste code." _(`aboutSection`)_
- "Ce que le code m'apprend." _(titre blog)_
- "Des sites faits pour durer : performants, accessibles, faciles à faire évoluer." _(`aboutSection.paragraph2`, reformulé)_

**Slogans proposés** _(nouveaux — à valider avant usage)_

- "Du code qui dure, pas du code qui presse."
- "Pensé produit. Écrit en PHP et JavaScript."
- "10 ans à faire tenir des projets dans le temps."

### Par canal

- **Landing page** — structure : eyebrow (capitales, catégorie) → titre (accroche factuelle) → paragraphe (preuve concrète) → CTA (infinitif). Le site entier suit déjà ce schéma section par section (hero → about → stack → expérience → projets → contact).
- **Email** — direct, pas de formule ronflante, même registre que les CTA. Signature : voir [ASSETS.md](./ASSETS.md#à-produire).
- **Réseaux sociaux** — un peu plus personnel accepté (LinkedIn), jamais tutoiement généralisé ni emoji-spam. Modèle : le blog ("notes de terrain").
- **Marketing** — annoncer un fait (disponibilité, nouvelle étude de cas), pas vendre une promesse.

**Post LinkedIn ✅**

> Nouvelle étude de cas en ligne : la migration Drupal 7 → 10 d'un site e-commerce B2B, sans interruption de service. Le détail technique et les arbitrages ici : [lien]

**Post LinkedIn ❌**

> 🚀 Je révolutionne le web avec des solutions innovantes qui boostent votre business ! 🔥

---

## 🇬🇧 English

### The 5 rules

1. **Factual** — numbers and facts over adjectives ("10 years of experience", not "experienced").
2. **Short to medium sentences**, few stacked subordinate clauses.
3. **Infinitive CTAs** ("see the projects", "contact me").
4. **No direct address** — infinitive/impersonal. Formal, precise legal language **only** on legal/GDPR pages. **Never a casual, over-familiar register.**
5. **Name what you refuse, then what you are** — the "no listicles", "not just code" pattern.

### Tone

Direct, confident without bravado, factual: convince through precision, not enthusiasm. Representative example (`blog.subtitle`):

> "Practical lessons from migrations, modern CSS, tooling, and AI. **No listicles**, just real analysis, experiments, and battle-tested solutions from real projects."

### Style

- Light self-awareness, deliberate honesty over displayed perfection (`hero.underConstructionNote`: "Site still under construction 🚧").
- Section titles in sentence case.
- Exception: "eyebrows" (labels above headings, e.g. `PROJECTS`, `BLOG - FIELD NOTES`) are capitalized — a category marker, not a shout.
- Confident technical vocabulary without being hermetic: "technical scoping", "durability of technical choices", "modern PHP / JavaScript stacks", "migrations", "tooling". Baseline web literacy assumed (B2B/technical-recruiter audience).

### Words

**Preferred**

- "What code teaches me" (blog title) — knowledge comes from practice.
- "Not just code" (`aboutSection.titleEnd`) — recurring contrast formula.
- "Practical lessons", "battle-tested solutions from real projects" — grounded in the real.
- Direct action verbs for CTAs: "see the projects", "contact me", "download the PDF".

**Forbidden**

- ❌ Empty marketing superlatives: "revolutionary", "disruptive", "next-gen", "world-class".
- ❌ Hollow buzzwords: "synergy", "growth levers", "innovative solutions" (without proof).
- ❌ Excessive self-promotion ("the best", "undisputed expert") — credibility comes from proof.
- ❌ Emoji excess — one deliberate use (🚧), see [ICONOGRAPHY.md](./ICONOGRAPHY.md).
- ❌ Unnecessary anglicisms when a native term is equally clear (relevant for the French version).

### Addressing the reader

- **Product/marketing content**: infinitive or impersonal ("contact me", "book a call", "see the projects"), not "you can…". This carries over cleanly into English, which has no tu/vous distinction anyway.
- **Legal pages (GDPR, legal notice)**: formal, precise legal language — the only fitting register there.
- **Never a casual, over-familiar register** — nothing in the current content sets it up; it would break the professional tone.

### CTAs

| Context  | Existing CTA       | Register              |
| -------- | ------------------ | --------------------- |
| Contact  | "contact me"       | Direct, infinitive    |
| Booking  | "Book a call"      | Direct, infinitive    |
| Projects | "See the projects" | Direct, infinitive    |
| CV       | "Download the PDF" | Direct, infinitive    |
| Blog     | "read the article" | Infinitive, lowercase |

**Rule**: always infinitive, always lowercase — except at the start of a UI component where the component's casing wins (`pill` button vs. text link).

### Taglines & slogans

**Existing taglines**

- "A developer who thinks user experience, not just code." _(`aboutSection`)_
- "What code teaches me." _(blog title)_
- "Sites built to last: fast, accessible, easy to evolve." _(`aboutSection.paragraph2`, reworded)_

**Proposed slogans** _(new — validate before use)_

- "Code that lasts, not code that's rushed."
- "Product-minded. Written in PHP and JavaScript."
- "10 years making projects hold up over time."

### By channel

- **Landing page** — structure: eyebrow (capitals, category) → heading (factual tagline) → paragraph (concrete proof) → CTA (infinitive). The whole site already follows this, section by section (hero → about → stack → experience → projects → contact).
- **Email** — direct, no grandiose phrasing, same register as CTAs. Signature: see [ASSETS.md](./ASSETS.md#to-produce).
- **Social media** — slightly more personal is fine (LinkedIn), never blanket informality or emoji-spam. Model: the blog ("field notes").
- **Marketing** — announce a fact (availability, new case study), don't sell a promise.

**LinkedIn post ✅**

> New case study up: migrating a B2B e-commerce site from Drupal 7 to 10 with zero downtime. Technical details and trade-offs here: [link]

**LinkedIn post ❌**

> 🚀 I'm revolutionizing the web with innovative solutions that boost your business! 🔥
