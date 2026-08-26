# Portfolio - Maxime JOLIVET // Nuxt 4 SSR

Portfolio personnel de Maxime Jolivet, développeur web full-stack. Site multilingue (FR/EN), déployé en SSR sur Vercel.

[![License](https://img.shields.io/badge/license-MIT-yellow?logo=opensourceinitiative&logoColor=black)](LICENSE.md)
![Deployed on Vercel](https://img.shields.io/badge/deployed_on-Vercel-black?logo=vercel&logoColor=white)

![Node.js version](https://img.shields.io/badge/Node-24-5FA04E?logo=nodedotjs&logoColor=white)
![Nuxt version](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxtdotjs&logoColor=white)
![Vue version](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)
![TypeScript version](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite version](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind version](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Pinia version](https://img.shields.io/badge/Pinia-4-FFD859?logo=pinia&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-2-3ECF8E?logo=supabase&logoColor=black)
![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-FR%20%2F%20EN-21759B?logo=googletranslate&logoColor=white)

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
- **i18n** : `@nuxtjs/i18n`, deux locales (`fr` par défaut, `en-US`), préfixe d'URL (`/fr/...`, `/en/...`)
- **Data** : Supabase (articles de blog)
- **Sécurité** : `nuxt-security` (CSP stricte avec nonce)
- **SEO** : `@nuxtjs/sitemap`, `@nuxt/image`
- **Icônes** : collections `@iconify-json/*` (devicon, devicon-plain, logos, lucide, material-icon-theme, selfhst, skill-icons), résolues via `utils/resolveIcon.ts` à partir d'un sous-ensemble généré (voir [Icônes](#icônes))

## Pages

| Route (FR)          | Route (EN)      | Contenu                                     |
| ------------------- | --------------- | -------------------------------------------- |
| `/`                 | `/`             | Accueil (hero, à propos, expérience, stack) |
| `/cv`               | `/cv`           | Curriculum vitæ                             |
| `/projets`          | `/projects`     | Liste des projets                           |
| `/blog`             | `/blog`         | Liste des articles                          |
| `/blog/:slug`       | `/blog/:slug`   | Article de blog                             |
| `/mentions-legales` | `/legal-notice` | Mentions légales                            |

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

![v1.0.69](https://img.shields.io/badge/v1.0.69-2026--08--26-F97316)
![v1.0.68](https://img.shields.io/badge/v1.0.68-2026--08--26-F97316)
![v1.0.67](https://img.shields.io/badge/v1.0.67-2026--08--26-F97316)
![v1.0.66](https://img.shields.io/badge/v1.0.66-2026--08--26-F97316)
![v1.0.65](https://img.shields.io/badge/v1.0.65-2026--08--24-F97316)
![v1.0.64](https://img.shields.io/badge/v1.0.64-2026--08--24-F97316)
![v1.0.63](https://img.shields.io/badge/v1.0.63-2026--08--24-F97316)
![v1.0.62](https://img.shields.io/badge/v1.0.62-2026--08--24-F97316)
![v1.0.61](https://img.shields.io/badge/v1.0.61-2026--08--24-F97316)
![v1.0.60](https://img.shields.io/badge/v1.0.60-2026--08--24-F97316)
![v1.0.59](https://img.shields.io/badge/v1.0.59-2026--08--24-F97316)
![v1.0.58](https://img.shields.io/badge/v1.0.58-2026--08--24-F97316)
![v1.0.57](https://img.shields.io/badge/v1.0.57-2026--08--24-F97316)
![v1.0.56](https://img.shields.io/badge/v1.0.56-2026--08--24-F97316)
![v1.0.55](https://img.shields.io/badge/v1.0.55-2026--08--24-F97316)
![v1.0.54](https://img.shields.io/badge/v1.0.54-2026--08--24-F97316)
![v1.0.53](https://img.shields.io/badge/v1.0.53-2026--08--24-F97316)
![v1.0.52](https://img.shields.io/badge/v1.0.52-2026--08--24-F97316)
![v1.0.51](https://img.shields.io/badge/v1.0.51-2026--08--24-F97316)
![v1.0.50](https://img.shields.io/badge/v1.0.50-2026--08--24-F97316)
![v1.0.49](https://img.shields.io/badge/v1.0.49-2026--08--24-F97316)
![v1.0.48](https://img.shields.io/badge/v1.0.48-2026--08--24-F97316)
![v1.0.47](https://img.shields.io/badge/v1.0.47-2026--08--24-F97316)
![v1.0.46](https://img.shields.io/badge/v1.0.46-2026--08--24-F97316)
![v1.0.45](https://img.shields.io/badge/v1.0.45-2026--08--24-F97316)
![v1.0.44](https://img.shields.io/badge/v1.0.44-2026--08--24-F97316)
![v1.0.43](https://img.shields.io/badge/v1.0.43-2026--08--24-F97316)
![v1.0.42](https://img.shields.io/badge/v1.0.42-2026--08--11-F97316)
![v1.0.41](https://img.shields.io/badge/v1.0.41-2026--08--11-F97316)
![v1.0.40](https://img.shields.io/badge/v1.0.40-2026--08--11-F97316)
![v1.0.39](https://img.shields.io/badge/v1.0.39-2026--08--11-F97316)
![v1.0.38](https://img.shields.io/badge/v1.0.38-2026--08--11-F97316)
![v1.0.37](https://img.shields.io/badge/v1.0.37-2026--08--10-F97316)
![v1.0.36](https://img.shields.io/badge/v1.0.36-2026--08--10-F97316)
![v1.0.35](https://img.shields.io/badge/v1.0.35-2026--08--10-F97316)
![v1.0.34](https://img.shields.io/badge/v1.0.34-2026--08--10-F97316)
![v1.0.33](https://img.shields.io/badge/v1.0.33-2026--08--10-F97316)
![v1.0.32](https://img.shields.io/badge/v1.0.32-2026--08--10-F97316)
![v1.0.31](https://img.shields.io/badge/v1.0.31-2026--08--10-F97316)
![v1.0.30](https://img.shields.io/badge/v1.0.30-2026--08--10-F97316)
![v1.0.29](https://img.shields.io/badge/v1.0.29-2026--08--10-F97316)
![v1.0.28](https://img.shields.io/badge/v1.0.28-2026--08--10-F97316)
![v1.0.27](https://img.shields.io/badge/v1.0.27-2026--08--10-F97316)
![v1.0.26](https://img.shields.io/badge/v1.0.26-2026--08--10-F97316)
![v1.0.25](https://img.shields.io/badge/v1.0.25-2026--07--21-F97316)
![v1.0.24](https://img.shields.io/badge/v1.0.24-2026--07--21-F97316)
![v1.0.23](https://img.shields.io/badge/v1.0.23-2026--07--20-F97316)
![v1.0.22](https://img.shields.io/badge/v1.0.22-2026--07--20-F97316)
![v1.0.21](https://img.shields.io/badge/v1.0.21-2026--07--20-F97316)
![v1.0.20](https://img.shields.io/badge/v1.0.20-2026--07--20-F97316)
![v1.0.19](https://img.shields.io/badge/v1.0.19-2026--07--20-F97316)
![v1.0.18](https://img.shields.io/badge/v1.0.18-2026--07--20-F97316)
![v1.0.17](https://img.shields.io/badge/v1.0.17-2026--07--20-F97316)
![v1.0.16](https://img.shields.io/badge/v1.0.16-2026--07--19-F97316)
![v1.0.15](https://img.shields.io/badge/v1.0.15-2026--07--19-F97316)
![v1.0.14](https://img.shields.io/badge/v1.0.14-2026--07--19-F97316)
![v1.0.13](https://img.shields.io/badge/v1.0.13-2026--07--18-F97316)
![v1.0.12](https://img.shields.io/badge/v1.0.12-2026--07--18-F97316)
![v1.0.11](https://img.shields.io/badge/v1.0.11-2026--07--18-F97316)
![v1.0.10](https://img.shields.io/badge/v1.0.10-2026--07--18-F97316)
![v1.0.9](https://img.shields.io/badge/v1.0.9-2026--07--18-F97316)
![v1.0.8](https://img.shields.io/badge/v1.0.7-2026--07--18-F97316)
![v1.0.7](https://img.shields.io/badge/v1.0.7-2026--07--18-F97316)
![v1.0.6](https://img.shields.io/badge/v1.0.6-2026--07--18-F97316)
![v1.0.5](https://img.shields.io/badge/v1.0.5-2026--07--18-F97316)
![v1.0.4](https://img.shields.io/badge/v1.0.4-2026--07--18-F97316)
![v1.0.3](https://img.shields.io/badge/v1.0.3-2026--07--18-F97316)
![v1.0.2](https://img.shields.io/badge/v1.0.2-2026--07--18-F97316)
![v1.0.1](https://img.shields.io/badge/v1.0.1-2026--07--18-F97316)

<!-- releases:end -->
