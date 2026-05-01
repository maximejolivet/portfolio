import tailwindcss from '@tailwindcss/vite'
import routes from './routes.json'

export default defineNuxtConfig({
  modules: [
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs'] }],
    'nuxt-security',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
  ],

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'pdfjs-viewer-element',
    },
  },

  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Maxime Jolivet - Développeur web',
      link: [{ rel: 'icon', type: 'image/ico', href: '/favicon.ico' }],
      meta: [
        { name: 'description', content: 'Développeur web, Webdesigner' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
        },
      ],
      htmlAttrs: {
        style: 'font-size: 1rem',
      },
    },
  },

  css: ['~/assets/css/main.css'],

  devServer: {
    port: 8000,
  },

  vite: {
    plugins: [tailwindcss()],
    css: {
      devSourcemap: false,
    },
    optimizeDeps: {
      exclude: ['pdfjs-viewer-element'],
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: false,
        strictNullChecks: true,
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
  i18n: {
    strategy: 'prefix',
    defaultLocale: 'fr',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', language: 'fr-FR', name: 'French', file: 'fr.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
    customRoutes: 'config', // disable custom route with page components
    pages: routes,
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
        ],
        'style-src': [
          // self           => Enables loading of stylesheets hosted on same origin
          // unsafe-inline  => Recommended default for most Nuxt apps
          '\'self\'',
          'fonts.googleapis.com',
          '\'unsafe-inline\'',
        ],
        // img-src => Add relevant https://... sources if you load images from external sources
        'base-uri': ['\'none\''],
        'img-src': ['\'self\'', 'data:'],
        'font-src': ['\'self\'', 'fonts.gstatic.com'],
        'object-src': ['\'none\''],
        'script-src-attr': ['\'none\''],
        'frame-src': ['\'self\''],
        'frame-ancestors': ['\'self\''],
        'upgrade-insecure-requests': true,
      },
      permissionsPolicy: {
        camera: ['self'],
      },
    },
  },
})
