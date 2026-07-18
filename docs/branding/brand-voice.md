# Brand Voice — Charte éditoriale

> Analysée à partir du contenu réel du site ([`i18n/locales/fr.json`](../../i18n/locales/fr.json) / [`en.json`](../../i18n/locales/en.json)). Voir [charte-graphique.md](./charte-graphique.md) pour la personnalité de marque sous-jacente.

---

## 🇫🇷 Français

### Ton

Direct, confiant sans forfanterie, factuel. Le site n'essaie pas de convaincre par l'enthousiasme mais par la précision. Exemple représentatif (`blog.subtitle`) :

> "Retours d'expérience concrets sur les migrations, le CSS moderne, l'outillage et l'IA. **Pas de listicles**, juste des analyses, des expérimentations et des solutions éprouvées sur des projets réels."

Cette phrase résume la voix entière : elle nomme explicitement ce qu'elle refuse d'être (listicle, contenu creux) avant d'affirmer ce qu'elle est.

### Style

- Phrases courtes à moyennes, peu de subordonnées empilées.
- Chiffres et faits concrets plutôt qu'adjectifs vagues ("10 ans d'expérience" plutôt que "expérimenté").
- Auto-dérision légère et honnêteté assumée plutôt que perfection affichée (`hero.underConstructionNote` : "site toujours en construction 🚧").
- Titres de section en minuscule-sauf-première-lettre, pas de majuscules criardes, sauf les "eyebrows" (labels au-dessus des titres, ex. `PROJETS`, `BLOG - NOTES DE TERRAIN`) qui sont volontairement en capitales — un marqueur typographique de catégorie, pas un cri.

### Vocabulaire

Vocabulaire technique assumé sans être hermétique : "cadrage technique", "pérennité des choix techniques", "stacks PHP / JavaScript modernes", "migrations", "outillage". Le site ne vulgarise pas à outrance pour un public non-technique — il présuppose un minimum de littératie web chez le lecteur (cohérent avec un public B2B/recruteur technique).

### Expressions à privilégier

- "Ce que le code m'apprend" (titre blog) — le savoir vient de la pratique, pas de la théorie.
- "Pas juste code" (`aboutSection.titleEnd`) — formule de contraste qui revient comme motif ("pas de listicles", "pas juste code") : nommer l'attendu réducteur pour mieux s'en démarquer.
- "Retours d'expérience concrets", "solutions éprouvées sur des projets réels" — l'ancrage dans le réel plutôt que l'abstraction.
- Verbes d'action directs à l'infinitif pour les CTA : "voir les projets", "me contacter", "télécharger le PDF".

### Expressions interdites

- ❌ Superlatifs marketing vides : "révolutionnaire", "disruptif", "next-gen", "world-class".
- ❌ Jargon buzzword creux : "synergie", "leviers de croissance", "solutions innovantes" (sans backing concret).
- ❌ Formules d'auto-promotion excessive ("le meilleur", "expert incontesté") — la crédibilité vient de la preuve (études de cas, expérience chiffrée), pas de l'auto-déclaration.
- ❌ Emoji en excès — un seul usage assumé dans tout le site (🚧), voir [iconographie.md](./iconographie.md).
- ❌ Anglicismes non nécessaires quand un terme français existe et est aussi clair.

### Adresse au lecteur (tutoiement / vouvoiement)

Le site **évite majoritairement l'adresse directe** : les CTA et titres utilisent l'infinitif ou des formulations impersonnelles ("me contacter", "prendre rendez-vous", "voir les projets") plutôt que "tu peux..." ou "vous pouvez...". C'est un choix qui évite de trancher la question tutoiement/vouvoiement pour la majorité du contenu.

**Exception : les pages légales (RGPD, mentions légales)** utilisent le **vouvoiement formel**, seul registre approprié dans ce contexte réglementaire : "les données que **vous** transmettez", "**vous** pouvez exercer **vos** droits".

**Règle pour tout nouveau contenu** : rester à l'infinitif/impersonnel pour le contenu produit et marketing (cohérent avec l'existant) ; réserver le "vous" formel strictement aux pages légales/RGPD. Ne jamais introduire de tutoiement — il romprait le registre professionnel établi sans qu'aucun contenu actuel ne l'amorce.

### Exemples de slogans

*(Nouveaux, cohérents avec la voix existante — à valider avant usage)*

- "Du code qui dure, pas du code qui presse."
- "Pensé produit. Écrit en PHP et JavaScript."
- "10 ans à faire tenir des projets dans le temps."

### Accroches

- "Un développeur qui pense expérience utilisateur, pas juste code." *(existant, `aboutSection`)*
- "Ce que le code m'apprend." *(existant, titre blog)*
- "Des sites faits pour durer : performants, accessibles, faciles à faire évoluer." *(existant, `aboutSection.paragraph2`, reformulé en accroche)*

### CTA

| Contexte | CTA existant | Registre |
|---|---|---|
| Contact | "me contacter" | Infinitif, direct |
| Rendez-vous | "Prendre rendez-vous" | Infinitif, direct |
| Projets | "Voir les projets" | Infinitif, direct |
| CV | "Télécharger le PDF" | Infinitif, direct |
| Blog | "lire l'article" | Infinitif, minuscule |

**Règle** : CTA toujours à l'infinitif, toujours minuscule sauf en début de composant UI où la casse du composant prime (bouton `pill` vs lien texte).

### Messages marketing

Le site ne fait pas de "messages marketing" au sens publicitaire — il documente et prouve. Toute future communication marketing (ex. post LinkedIn annonçant une disponibilité) doit garder ce registre factuel : annoncer un fait (disponibilité, nouvelle étude de cas) plutôt que vendre une promesse.

**Exemple de post LinkedIn cohérent avec la voix** :

> Nouvelle étude de cas en ligne : la migration Drupal 7 → 10 d'un site e-commerce B2B, sans interruption de service. Le détail technique et les arbitrages ici : [lien]

**À éviter** :

> 🚀 Je révolutionne le web avec des solutions innovantes qui boostent votre business ! 🔥

### Email

Ton direct, pas de formule ronflante. S'appuyer sur le même registre que les CTA du site. Exemple de signature cohérente : voir [assets.md](./assets.md#signature-mail).

### Landing pages

Le site entier fonctionne déjà comme une landing page unique par section (hero → about → stack → expérience → projets → contact). Toute nouvelle landing page (ex. page dédiée à une offre freelance) doit garder la structure "eyebrow (majuscules, catégorie) → titre (accroche factuelle) → paragraphe (preuve concrète) → CTA (infinitif)".

### Réseaux sociaux

Registre légèrement plus personnel est acceptable (LinkedIn, notamment) mais sans jamais basculer dans le tutoiement généralisé ou l'emoji-spam. Le blog ("notes de terrain") est le format le plus proche d'un ton "réseaux sociaux long format" déjà validé par le site lui-même — s'en inspirer en priorité.

---

## 🇬🇧 English

### Tone

Direct, confident without bravado, factual. The site doesn't try to convince through enthusiasm but through precision. Representative example (`blog.subtitle`):

> "Practical lessons from migrations, modern CSS, tooling, and AI. **No listicles**, just real analysis, experiments, and battle-tested solutions from real projects."

That sentence captures the entire voice: it explicitly names what it refuses to be (listicle, empty content) before asserting what it is.

### Style

- Short to medium sentences, few stacked subordinate clauses.
- Concrete numbers and facts rather than vague adjectives ("10 years of experience" rather than "experienced").
- Light self-awareness and deliberate honesty rather than displayed perfection (`hero.underConstructionNote`: "site still under construction 🚧").
- Section titles in sentence case, no shouty capitals, except "eyebrows" (labels above headings, e.g. `PROJECTS`, `BLOG - FIELD NOTES`) which are deliberately capitalized — a typographic category marker, not a shout.

### Vocabulary

Technical vocabulary used confidently without being hermetic: "technical scoping", "durability of technical choices", "modern PHP / JavaScript stacks", "migrations", "tooling". The site doesn't over-simplify for a non-technical audience — it assumes a baseline web literacy in the reader (consistent with a B2B/technical-recruiter audience).

### Preferred expressions

- "What code teaches me" (blog title) — knowledge comes from practice, not theory.
- "Not just code" (`aboutSection.titleEnd`) — a contrast formula that recurs as a pattern ("no listicles", "not just code"): naming the reductive expectation in order to stand apart from it.
- "Practical lessons", "battle-tested solutions from real projects" — grounding in the real rather than abstraction.
- Direct action verbs in imperative/infinitive form for CTAs: "see the projects", "contact me", "download the PDF".

### Forbidden expressions

- ❌ Empty marketing superlatives: "revolutionary", "disruptive", "next-gen", "world-class".
- ❌ Hollow buzzwords: "synergy", "growth levers", "innovative solutions" (without concrete backing).
- ❌ Excessive self-promotion ("the best", "undisputed expert") — credibility comes from proof (case studies, quantified experience), not from self-declaration.
- ❌ Emoji excess — a single deliberate use across the whole site (🚧), see [iconographie.md](./iconographie.md).
- ❌ Unnecessary anglicisms when a native term is equally clear (relevant when writing the French version).

### Addressing the reader (formal / informal)

The site **mostly avoids direct address**: CTAs and headings use infinitives or impersonal phrasing ("contact me", "book a call", "see the projects") rather than "you can…". This sidesteps the formal/informal question for most of the content — a pattern that carries over cleanly into English, which doesn't grammatically distinguish "tu"/"vous" anyway.

**Exception: legal pages (GDPR, legal notice)** use **formal, precise legal language** — the only appropriate register in that regulatory context.

**Rule for any new content**: stay infinitive/impersonal for product and marketing content (consistent with existing copy); reserve careful formal phrasing strictly for legal/GDPR pages. Never introduce a casual, over-familiar register — it would break the established professional tone that nothing in the current content sets up.

### Slogan examples

*(New, consistent with the existing voice — validate before use)*

- "Code that lasts, not code that's rushed."
- "Product-minded. Written in PHP and JavaScript."
- "10 years making projects hold up over time."

### Taglines

- "A developer who thinks user experience, not just code." *(existing, `aboutSection`)*
- "What code teaches me." *(existing, blog title)*
- "Sites built to last: fast, accessible, easy to evolve." *(existing, `aboutSection.paragraph2`, reworded as a tagline)*

### CTAs

| Context | Existing CTA | Register |
|---|---|---|
| Contact | "contact me" | Direct, infinitive |
| Booking | "Book a call" | Direct, infinitive |
| Projects | "See the projects" | Direct, infinitive |
| CV | "Download the PDF" | Direct, infinitive |
| Blog | "read the article" | Infinitive, lowercase |

**Rule**: CTAs always infinitive, always lowercase except at the start of a UI component where the component's casing takes precedence (`pill` button vs. text link).

### Marketing messages

The site doesn't run "marketing messages" in the advertising sense — it documents and proves. Any future marketing communication (e.g. a LinkedIn post announcing availability) should keep this factual register: announce a fact (availability, new case study) rather than sell a promise.

**Example of a LinkedIn post consistent with the voice**:

> New case study up: migrating a B2B e-commerce site from Drupal 7 to 10 with zero downtime. Technical details and trade-offs here: [link]

**To avoid**:

> 🚀 I'm revolutionizing the web with innovative solutions that boost your business! 🔥

### Email

Direct tone, no grandiose phrasing. Rely on the same register as the site's CTAs. For a consistent signature example, see [assets.md](./assets.md#email-signature).

### Landing pages

The whole site already functions as a single landing page, one section at a time (hero → about → stack → experience → projects → contact). Any new landing page (e.g. a dedicated freelance-offer page) should keep the structure "eyebrow (capitals, category) → heading (factual tagline) → paragraph (concrete proof) → CTA (infinitive)".

### Social media

A slightly more personal register is acceptable (LinkedIn especially) but should never slide into blanket informality or emoji-spam. The blog ("field notes") is the closest format to a "long-form social" tone already validated by the site itself — draw from it first.
