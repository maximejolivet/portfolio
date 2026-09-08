# Portfolio - Maxime JOLIVET // Nuxt 4 SSR

Portfolio personnel de Maxime Jolivet, développeur web full-stack. Site multilingue (FR/EN/BR), déployé en SSR sur Vercel.

[![License](https://img.shields.io/badge/license-MIT-b8860b?logo=opensourceinitiative&logoColor=white)](LICENSE.md)
![Deployed on Vercel](https://img.shields.io/badge/deployed_on-Vercel-black?logo=vercel&logoColor=white)
[![Lighthouse](https://www.maxime.bzh/api/lighthouse-badge.svg)](https://www.maxime.bzh)

![Node.js version](https://img.shields.io/badge/Node-24-5FA04E?logo=nodedotjs&logoColor=white)
![Nuxt version](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxtdotjs&logoColor=white)
![Vue version](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)
![TypeScript version](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite version](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind version](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Pinia version](https://img.shields.io/badge/Pinia-4-8c7731?logo=pinia&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2-1f7a54?logo=supabase&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-FR%20%2F%20EN%20%2F%20BR-21759B?logo=googletranslate&logoColor=white)

## Claude Code Skills

`.claude/skills/` :

![github-actions](https://img.shields.io/badge/skill-github--actions-2088FF?logo=githubactions&logoColor=white)
![semantic-commit-messages](https://img.shields.io/badge/skill-semantic--commit--messages-D97757?logo=conventionalcommits&logoColor=white)

`.agents/skills/` :

![brand-guidelines](https://img.shields.io/badge/skill-brand--guidelines-D97757)
![nuxt-ui](https://img.shields.io/badge/skill-nuxt--ui-00DC82?logo=nuxtdotjs&logoColor=white)
![skill-creator](https://img.shields.io/badge/skill-skill--creator-D97757)
![theme-factory](https://img.shields.io/badge/skill-theme--factory-D97757)

Look at the [Nuxt 4 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Stack technique

- **Framework** : [Nuxt 4](https://nuxt.com) (SSR en dev comme en prod, hébergé sur Vercel)
- **UI** : Vue 3, composants organisés par domaine (`components/sections`, `components/cards`, `components/layout`, `components/ui`, `components/navigation`)
- **State** : Pinia
- **i18n** : `@nuxtjs/i18n`, trois locales (`fr` par défaut, `en-US`, `br-FR`), préfixe d'URL (`/fr/...`, `/en/...`, `/br/...`)
- **Data** : Supabase (articles de blog)
- **Sécurité** : `nuxt-security` (CSP stricte avec nonce)
- **SEO** : `@nuxtjs/sitemap`, `@nuxt/image`
- **Icônes** : collections `@iconify-json/*` (devicon, devicon-plain, logos, lucide, material-icon-theme, selfhst, skill-icons), résolues via `utils/resolveIcon.ts` à partir d'un sous-ensemble généré (voir [Icônes](#icônes))

## Pages

| Route (FR)          | Route (EN)       | Route (BR)          | Contenu                                      |
| ------------------- | ---------------- | ------------------- | -------------------------------------------- |
| `/`                 | `/`              | `/`                 | Accueil (hero, à propos, expérience, stack)  |
| `/cv`               | `/cv`            | `/cv`               | Curriculum vitæ                              |
| `/projets`          | `/projects`      | `/raktresou`        | Liste des projets                            |
| `/blog`             | `/blog`          | `/blog`             | Liste des articles                           |
| `/blog/:slug`       | `/blog/:slug`    | `/blog/:slug`       | Article de blog                              |
| `/mentions-legales` | `/legal-notice`  | `/menegou-lezennel` | Mentions légales                             |
| `/accessibilite`    | `/accessibility` | `/haezadusted`      | Déclaration d'accessibilité                  |
| `/nouveautes`       | `/changelog`     | `/kemmou-nevez`     | Journal des mises à jour (généré depuis Git) |

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Copier `.env.example` en `.env` et renseigner les variables Supabase (`supabaseUrl`, `supabaseKey`).

## Update Dependencies

To update the dependencies in your Nuxt 4 project, you can use the `npm-check-updates` tool. This tool helps you to easily check for and update outdated dependencies in your `package.json` file.

```bash
# Install the tool globally
npm install -g npm-check-updates

# Check which packages can be updated
ncu

# Update the versions in package.json
ncu -u

# Reinstall dependencies with the updated versions
npm install
```

## Development Server

Start the development server on `http://localhost:8000` (non-standard port, see `nuxt.config.ts`):

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Generate a static export (manual/local use only — production on Vercel builds SSR, not this):

```bash
npm run generate
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Icônes

`utils/resolveIcon.ts` ne lit pas directement les paquets `@iconify-json/*` (chaque `icons.json` complet pèse plusieurs Mo, jusqu'à ~31 Mo cumulés) : ça faisait planter `nuxt build`/`nuxt generate` par manque de mémoire. À la place, `scripts/generate-icon-subset.mjs` scanne le code (`icon="prefix:nom"`) et génère `utils/generated/icon-subset.json`, qui ne contient que les icônes réellement utilisées.

```bash
npm run icons:generate   # ou : make icons
```

Ce script tourne automatiquement avant `dev`, `build`, `generate`, `deploy` et après `install` (hooks `pre*`/`postinstall` dans `package.json`) — pas besoin de le lancer à la main sauf pour vérifier une icône. `utils/generated/` est gitignoré et régénéré à chaque fois. Si une icône n'apparaît pas, vérifier le préfixe/nom dans le warning affiché par le script.

## Déploiement

Le site est hébergé sur [Vercel](https://vercel.com), connecté via son intégration Git (build SSR standard, pas d'export statique). Déploiement automatique au push sur `master`. La branche de travail est `develop` : pour déployer, ouvrir une PR `develop` → `master`.

## Qualité de code

### Linting & formatting

```bash
npm run lint           # ESLint only
npm run lintfix        # ESLint --fix (+ auto-format via Prettier)
npm run prettier       # Check format (fail on mismatch)
npm run prettier:fix   # Format files in-place
npx prettier --check . # Same as npm run prettier
```

Ou via `Makefile` :

```bash
make infos         # Infos projet (version, Node, branche...) et liste des commandes
make install       # npm install
make dev           # Serveur de dev
make build         # Build SSR
make generate      # Build statique (manuel/local, pas le chemin de prod)
make preview       # Prévisualiser un build généré
make deploy        # Build + generate
make lint          # ESLint only
make lintfix       # ESLint --fix
make prettier      # Check format
make prettier-fix  # Format in-place
make test          # Vitest
make icons         # Régénère utils/generated/icon-subset.json
make clean         # Supprime .nuxt, .output, node_modules
```

Pas de point-virgule, guillemets simples, indentation 2 espaces, largeur de ligne 100 (voir `CLAUDE.md` pour le détail des conventions).

## Releases (dev)

Chaque commit bump automatiquement la version patch du `package.json` et ajoute un tag ci-dessous (hook `pre-commit`, `scripts/update-release-log.mjs`). Historique généré automatiquement, ne pas éditer à la main.

<!-- releases:start -->

![v1.1.34](https://img.shields.io/badge/v1.1.34-2026--09--08-F97316)

<!-- releases:end -->
