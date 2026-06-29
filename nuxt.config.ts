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
  ],

  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Maxime Jolivet - Développeur web',
      link: [
        { rel: 'icon', type: 'image/ico', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2'
            + '?family=Inter:wght@400;500;600;700;800'
            + '&family=Space+Grotesk:wght@500;600;700&display=swap',
        },
      ],
      meta: [
        { name: 'description', content: 'Développeur web, Webdesigner' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
        },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
      htmlAttrs: {
        style: 'font-size: 1rem',
      },
    },
  },

  css: ['~/assets/css/main.css'],

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'pdfjs-viewer-element',
    },
  },

  runtimeConfig: {
    public: {
      supabaseUrl: '',
      supabaseKey: '',
    },
  },

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
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
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
        'img-src': ['\'self\'', 'data:', 'blob:', '*.supabase.co'],
        'connect-src': ['\'self\'', '*.supabase.co'],
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
