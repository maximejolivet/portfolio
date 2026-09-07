export const GITHUB_REPO_URL = 'https://github.com/maximejolivet/portfolio'

// Keyed by the base route name (vue-router name minus @nuxtjs/i18n's
// "___<locale>" suffix) - these match routes.json's keys 1:1 since both
// come from the same file-based page structure.
export const PAGE_SOURCE_FILES: Record<string, string> = {
  'index': 'pages/index.vue',
  'cv': 'pages/cv.vue',
  'accessibilite': 'pages/accessibilite.vue',
  'changelog': 'pages/changelog.vue',
  'mentions-legales': 'pages/mentions-legales.vue',
  'projects': 'pages/projects/index.vue',
  'projects-slug': 'pages/projects/[slug].vue',
  'blog': 'pages/blog/index.vue',
  'blog-slug': 'pages/blog/[slug].vue',
}
