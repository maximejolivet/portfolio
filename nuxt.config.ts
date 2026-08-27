import tailwindcss from '@tailwindcss/vite'
import routes from './routes.json'

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
      link: [{ rel: 'icon', type: 'image/ico', href: '/favicon.ico' }],
      meta: [
        { name: 'description', content: 'Développeur web, Webdesigner' },
        { name: 'robots', content: 'noindex, nofollow' },
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
    public: {
      supabaseUrl: '',
      supabaseKey: '',
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
  compatibilityDate: '2026-08-27',

  vite: {
    plugins: [tailwindcss()],
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
    // routes.json values type as plain `string` once imported, but @nuxtjs/i18n's
    // typed `pages` option expects each locale path as a `/${string}` literal.
    pages: routes as Record<string, Partial<Record<'en' | 'fr', false | `/${string}`>>>,
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
        ],
        'font-src': ['\'self\'', 'data:'],
        // worker-src => explicit, since Safari/WebKit doesn't reliably fall back
        // to script-src for Worker construction when this is left unset -
        // needed for pdf.js's worker on /cv (pdfjs-viewer-element).
        'worker-src': ['\'self\''],
        'object-src': ['\'none\''],
        'script-src-attr': ['\'none\''],
        'frame-src': ['\'self\'', 'https://app.cal.eu'],
        'frame-ancestors': ['\'self\''],
        'upgrade-insecure-requests': true,
      },
      permissionsPolicy: {
        camera: ['self'],
      },
    },
  },
})
