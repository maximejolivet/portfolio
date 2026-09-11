import { execSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin } from 'vite'
import routes from './routes.json'

// pdfjs-viewer-element resolves its own pdf.js core module, viewer module
// and both theme stylesheets with `new URL("./file", "" + import.meta.url)`.
// The string concatenation is deliberate upstream (it avoids bundlers that
// don't support import.meta.url at all), but it defeats Vite's static
// analysis, which only recognizes the literal `new URL(<string>,
// import.meta.url)` form - so these four never get bundled/hashed/copied,
// and 404 in production (dev works because the package isn't pre-bundled,
// see vite.optimizeDeps.exclude below, so import.meta.url still points at
// the real node_modules files). Rewriting the concatenation away lets Vite
// recognize the pattern and treat these exactly like any other bundled
// asset - copying them into the output with a normal content hash - same
// as everything else in the app. The worker file has its own explicit
// worker-src override for an unrelated Safari issue (see pages/cv.vue) and
// isn't affected by this either way.
function fixPdfjsViewerElementAssetUrls(): Plugin {
  return {
    name: 'fix-pdfjs-viewer-element-asset-urls',
    transform(code, id) {
      if (!id.includes('pdfjs-viewer-element') || !code.includes('+import.meta.url)')) return
      return code.replace(
        /new URL\("\.\/([^"]+)",\s*""\s*\+\s*import\.meta\.url\)/g,
        'new URL("./$1", import.meta.url)',
      )
    },
  }
}

// viewer.css (bundled by the plugin above) references its toolbar icons
// with plain relative `url(images/foo.svg)`, resolved by the browser
// against viewer.css's own served location - so those icons need to exist,
// unhashed, in an images/ folder next to it. Vite's CSS asset pipeline only
// rewrites url() in CSS it imports as a module; a CSS file only reached via
// new URL() (as this one is) is copied as an opaque blob, so those
// references are never seen or rewritten. Emitting the source images
// directly as build assets is the one mechanism guaranteed to land them in
// the real output next to every other bundled asset.
function copyPdfjsViewerImages(): Plugin {
  return {
    name: 'copy-pdfjs-viewer-images',
    buildStart() {
      const dir = 'node_modules/pdfjs-viewer-element/dist/images'
      for (const file of readdirSync(dir)) {
        this.emitFile({
          type: 'asset',
          fileName: `_nuxt/images/${file}`,
          source: readFileSync(`${dir}/${file}`),
        })
      }
    },
  }
}

function resolveCommitSha(): string {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA
  try {
    return execSync('git rev-parse HEAD').toString().trim()
  }
  catch {
    return ''
  }
}

// Captured once when this config is evaluated at build time (not per-request).
function resolveBuildDate(): string {
  return new Date().toISOString()
}

export default defineNuxtConfig({
  modules: [
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs'] }],
    'nuxt-security',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
  ],

  components: {
    dirs: [
      {
        path: '~/components',
        ignore: ['**/ui/shadcn/**'],
      },
    ],
  },

  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Maxime Jolivet - Développeur web',
      link: [
        { rel: 'icon', type: 'image/ico', href: '/favicon.ico' },
        { rel: 'author', href: '/humans.txt' },
      ],
      meta: [
        { name: 'description', content: 'Développeur web, Webdesigner' },
      ],
    },
  },

  css: ['~/assets/css/main.css', '~/assets/css/tarteaucitron-theme.css'],

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'pdfjs-viewer-element' || tag.startsWith('swiper-'),
    },
  },

  site: {
    url: 'https://www.maxime.bzh',
  },

  runtimeConfig: {
    // NUXT_PAGESPEED_API_KEY - free key from Google Cloud Console
    // ("PageSpeed Insights API"), needed because the unauthenticated tier
    // rate-limits almost immediately.
    pagespeedApiKey: '',
    public: {
      supabaseUrl: '',
      supabaseKey: '',
      appVersion: process.env.npm_package_version ?? '',
      commitSha: resolveCommitSha(),
      buildDate: resolveBuildDate(),
    },
  },

  routeRules: {
    // pdfjs-viewer-element bootstraps its viewer by injecting unnonced inline
    // <script> tags into an internal srcdoc iframe. Chrome/Firefox allow this
    // via 'strict-dynamic' (script-inserted scripts inherit trust), but Safari
    // doesn't implement 'strict-dynamic' at all, and the global nonce disables
    // 'unsafe-inline' as a fallback per CSP2 rules - so those scripts get
    // silently blocked and the CV never renders. Drop nonce/strict-dynamic for
    // this route so 'unsafe-inline' is actually honored in Safari too.
    // Dropping 'strict-dynamic' also drops its blanket trust of scripts loaded
    // by tarteaucitron (app.vue), so the Cal.com and GTM hosts it loads
    // sitewide need to be listed explicitly here.
    '/fr/cv': {
      security: {
        headers: {
          contentSecurityPolicy: {
            'script-src': [
              '\'self\'',
              '\'unsafe-inline\'',
              'https://app.cal.eu',
              'https://www.googletagmanager.com',
              'https://ia.maxime.bzh',
            ],
          },
        },
      },
    },
    '/en/cv': {
      security: {
        headers: {
          contentSecurityPolicy: {
            'script-src': [
              '\'self\'',
              '\'unsafe-inline\'',
              'https://app.cal.eu',
              'https://www.googletagmanager.com',
              'https://ia.maxime.bzh',
            ],
          },
        },
      },
    },
  },

  devServer: {
    port: 8000,
  },

  experimental: {
    viewTransition: true,
  },
  compatibilityDate: '2026-09-11',

  nitro: {
    // Default Vercel function timeout (10s) is too short for a live
    // PageSpeed Insights audit (lighthouse-badge.svg.get.ts) - a real
    // Lighthouse run against the page routinely takes 15-40s.
    vercel: {
      functions: {
        maxDuration: 60,
      },
    },
  },

  vite: {
    plugins: [tailwindcss(), fixPdfjsViewerElementAssetUrls(), copyPdfjsViewerImages()],
    optimizeDeps: {
      exclude: ['pdfjs-viewer-element'],
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
      },
    },
  },

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: false,
        quotes: 'single',
        quoteProps: 'consistent-as-needed',
        commaDangle: 'always-multiline',
        blockSpacing: true,
        arrowParens: true,
      },
    },
  },

  googleFonts: {
    download: true,
    display: 'swap',
    families: {
      'Space Grotesk': [500, 600, 700],
      'JetBrains Mono': {
        wght: [400, 500, 700],
        ital: [400],
      },
    },
  },
  i18n: {
    baseUrl: 'https://www.maxime.bzh',
    strategy: 'prefix',
    defaultLocale: 'fr',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', language: 'fr-FR', name: 'French', file: 'fr.json' },
      { code: 'br', language: 'br-FR', name: 'Brezhoneg', file: 'br.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
    customRoutes: 'config', // disable custom route with page components
    // routes.json values type as plain `string` once imported, but @nuxtjs/i18n's
    // typed `pages` option expects each locale path as a `/${string}` literal.
    pages: routes as Record<string, Partial<Record<'en' | 'fr' | 'br', false | `/${string}`>>>,
  },

  security: {
    nonce: true,
    rateLimiter: false,
    csrf: true,
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        'script-src': [
          // self             => Fallback value, will be ignored by most modern browsers (level 3)
          // unsafe-inline    => Fallback value, will be ignored by almost any browser (level 2)
          // strict-dynamic   => Strict CSP via 'strict-dynamic', supported by most modern browsers (level 3)
          // nonce-{{nonce}}  => Enables CSP nonce support for scripts in SSR mode, supported by almost any browser (level 2)
          '\'self\'',
          '\'unsafe-inline\'',
          '\'strict-dynamic\'',
          '\'nonce-{{nonce}}\'',
          'https://ia.maxime.bzh',
        ],
        'style-src': [
          // self           => Enables loading of stylesheets hosted on same origin
          // unsafe-inline  => Recommended default for most Nuxt apps
          '\'self\'',
          '\'unsafe-inline\'',
        ],
        // img-src => Add relevant https://... sources if you load images from external sources
        'base-uri': ['\'none\''],
        'img-src': [
          '\'self\'',
          'data:',
          'blob:',
          '*.supabase.co',
          'https://www.googletagmanager.com',
        ],
        'connect-src': [
          '\'self\'',
          '*.supabase.co',
          'https://app.cal.eu',
          'https://www.googletagmanager.com',
          'https://*.google-analytics.com',
          'https://*.analytics.google.com',
          'https://ia.maxime.bzh',
        ],
        'font-src': ['\'self\'', 'data:'],
        // worker-src => explicit, since Safari/WebKit doesn't reliably fall back
        // to script-src for Worker construction when this is left unset -
        // needed for pdf.js's worker on /cv (pdfjs-viewer-element), which
        // constructs its worker from a blob: URL rather than a same-origin file.
        'worker-src': ['\'self\'', 'blob:'],
        'object-src': ['\'none\''],
        'script-src-attr': ['\'none\''],
        'frame-src': ['\'self\'', 'https://app.cal.eu', 'https://ia.maxime.bzh'],
        'frame-ancestors': ['\'self\''],
        'upgrade-insecure-requests': true,
      },
      permissionsPolicy: {
        camera: ['self'],
      },
    },
  },

  // Project case studies stay out of the sitemap - some cover client work
  // that shouldn't be indexed even though the rest of the site now is (each
  // of those pages also sets its own noindex meta, which is what actually
  // keeps them out of search results - this just avoids listing them here).
  sitemap: {
    exclude: ['/*/projets/**', '/*/projects/**', '/*/raktresou/**'],
  },
})
