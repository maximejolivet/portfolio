# Portfolio - Maxime JOLIVET // Nuxt 4 SSR

Portfolio personnel de Maxime Jolivet, développeur web full-stack. Site multilingue (FR/EN), généré en statique et déployé sur GitHub Pages.

![Node.js version](https://img.shields.io/badge/Node-24-5FA04E)
![Nuxt version](https://img.shields.io/badge/Nuxt-4-00DC82)
![Vue version](https://img.shields.io/badge/Vue-3-4FC08D)
![TypeScript version](https://img.shields.io/badge/TypeScript-5-3178C6)
![Vite version](https://img.shields.io/badge/Vite-8-646CFF)
![Tailwind version](https://img.shields.io/badge/Tailwind-4-06B6D4)
![Pinia version](https://img.shields.io/badge/Pinia-4-FFD859)
![Supabase](https://img.shields.io/badge/Supabase-2-3ECF8E)

## Claude Code Skills

![brand-guidelines](https://img.shields.io/badge/skill-brand--guidelines-D97757)
![nuxt-ui](https://img.shields.io/badge/skill-nuxt--ui-00DC82)
![skill-creator](https://img.shields.io/badge/skill-skill--creator-D97757)
![theme-factory](https://img.shields.io/badge/skill-theme--factory-D97757)
![deploy](https://img.shields.io/badge/skill-deploy-21759B)
![add-translation](https://img.shields.io/badge/skill-add--translation-21759B)

Look at the [Nuxt 4 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Stack technique

- **Framework** : [Nuxt 4](https://nuxt.com) (SSR côté dev, généré en site statique pour la prod)
- **UI** : Vue 3, composants organisés par domaine (`components/sections`, `components/cards`, `components/layout`, `components/ui`, `components/navigation`)
- **State** : Pinia
- **i18n** : `@nuxtjs/i18n`, deux locales (`fr` par défaut, `en-US`), préfixe d'URL (`/fr/...`, `/en/...`)
- **Data** : Supabase (articles de blog)
- **Sécurité** : `nuxt-security` (CSP stricte avec nonce)
- **SEO** : `@nuxtjs/sitemap`, `@nuxt/image`

## Pages

| Route (FR)    | Route (EN)    | Contenu                                     |
| ------------- | ------------- | ------------------------------------------- |
| `/`           | `/`           | Accueil (hero, à propos, expérience, stack) |
| `/cv`         | `/cv`         | Curriculum vitæ                             |
| `/projets`    | `/projects`   | Liste des projets                           |
| `/blog`       | `/blog`       | Liste des articles                          |
| `/blog/:slug` | `/blog/:slug` | Article de blog                             |

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

Generate the static site (used for GitHub Pages deployment):

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

## Déploiement

Le site est déployé sur GitHub Pages via GitHub Actions (`npm run generate`) au push sur `master`. La branche de travail est `develop` : pour déployer, ouvrir une PR `develop` → `master`.

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
make lint          # ESLint only
make lintfix       # ESLint --fix
make prettier      # Check format
make prettier:fix  # Format in-place
make test          # Vitest
```

Pas de point-virgule, guillemets simples, indentation 2 espaces, largeur de ligne 100 (voir `CLAUDE.md` pour le détail des conventions).

## Releases (dev)

Chaque commit bump automatiquement la version patch du `package.json` (hook `pre-commit`) et ajoute un tag ci-dessous (hook `commit-msg`). Historique généré automatiquement, ne pas éditer à la main.

<!-- releases:start -->

![v1.0.2](https://img.shields.io/badge/v1.0.2-2026--07--18-F97316)
![v1.0.2](https://img.shields.io/badge/v1.0.2-2026--07--18-F97316)
![v1.0.1](https://img.shields.io/badge/v1.0.1-2026--07--18-F97316)

<!-- releases:end -->
