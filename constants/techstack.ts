import type { TechCategory } from '~/types/content.types'

export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'languages',
    labelKey: 'techSection.categories.languages.label',
    descriptionKey: 'techSection.categories.languages.description',
    items: [
      { id: 'php', name: 'PHP', icon: 'logos:php' },
      { id: 'javascript', name: 'JavaScript', icon: 'logos:javascript' },
    ],
  },
  {
    id: 'frontend',
    labelKey: 'techSection.categories.frontend.label',
    descriptionKey: 'techSection.categories.frontend.description',
    items: [
      { id: 'html', name: 'HTML', icon: 'logos:html-5' },
      { id: 'css', name: 'CSS', icon: 'logos:css-3' },
      { id: 'modern-css', name: 'Modern CSS', icon: 'lucide:sparkles' },
      { id: 'vue', name: 'Vue.js', icon: 'logos:vue' },
      { id: 'nuxt', name: 'Nuxt', icon: 'logos:nuxt-icon' },
      { id: 'tailwind', name: 'Tailwind', icon: 'logos:tailwindcss-icon' },
      { id: 'bootstrap', name: 'Bootstrap', icon: 'logos:bootstrap' },
    ],
  },
  {
    id: 'backend',
    labelKey: 'techSection.categories.backend.label',
    descriptionKey: 'techSection.categories.backend.description',
    items: [
      { id: 'laravel', name: 'Laravel', icon: 'logos:laravel' },
      { id: 'symfony', name: 'Symfony', icon: 'logos:symfony' },
    ],
  },
  {
    id: 'cms',
    labelKey: 'techSection.categories.cms.label',
    descriptionKey: 'techSection.categories.cms.description',
    items: [
      { id: 'wordpress', name: 'WordPress', icon: 'logos:wordpress-icon' },
      { id: 'drupal', name: 'Drupal', icon: 'logos:drupal-icon' },
      { id: 'webflow', name: 'Webflow', icon: 'logos:webflow-icon' },
    ],
  },
  {
    id: 'database',
    labelKey: 'techSection.categories.database.label',
    descriptionKey: 'techSection.categories.database.description',
    items: [
      { id: 'mysql', name: 'MySQL', icon: 'logos:mysql' },
      { id: 'nosql', name: 'NoSQL', icon: 'lucide:database' },
    ],
  },
  {
    id: 'devops',
    labelKey: 'techSection.categories.devops.label',
    descriptionKey: 'techSection.categories.devops.description',
    items: [
      { id: 'docker', name: 'Docker', icon: 'logos:docker-icon' },
      { id: 'cicd', name: 'CI/CD', icon: 'lucide:workflow' },
      { id: 'vercel', name: 'Vercel', icon: 'logos:vercel-icon' },
      { id: 'railway', name: 'Railway', icon: 'lucide:cloud' },
      { id: 'gcp', name: 'Google Cloud', icon: 'logos:google-cloud' },
      { id: 'firebase', name: 'Firebase', icon: 'logos:firebase' },
      { id: 'supabase', name: 'Supabase', icon: 'logos:supabase-icon' },
    ],
  },
  {
    id: 'security',
    labelKey: 'techSection.categories.security.label',
    descriptionKey: 'techSection.categories.security.description',
    items: [
      { id: 'https', name: 'HTTPS / SSL', icon: 'lucide:lock' },
      { id: 'csp', name: 'CSP', icon: 'lucide:shield' },
      { id: '2fa', name: '2FA', icon: 'lucide:shield-check' },
      { id: 'snyk', name: 'Snyk', icon: 'lucide:shield-alert' },
      { id: 'eslint', name: 'ESLint', icon: 'logos:eslint' },
      { id: 'prettier', name: 'Prettier', icon: 'logos:prettier' },
    ],
  },
  {
    id: 'testing',
    labelKey: 'techSection.categories.testing.label',
    descriptionKey: 'techSection.categories.testing.description',
    items: [
      { id: 'phpunit', name: 'PHPUnit', icon: 'lucide:flask-conical' },
      { id: 'phpstan', name: 'PHPStan', icon: 'lucide:search-check' },
    ],
  },
  {
    id: 'tools',
    labelKey: 'techSection.categories.tools.label',
    descriptionKey: 'techSection.categories.tools.description',
    items: [
      { id: 'phpstorm', name: 'PhpStorm', icon: 'lucide:app-window' },
      { id: 'vscode', name: 'Visual Studio Code', icon: 'logos:visual-studio-code' },
      { id: 'git', name: 'Git', icon: 'logos:git-icon' },
      { id: 'github', name: 'GitHub', icon: 'logos:github-icon' },
      { id: 'gitlab', name: 'GitLab', icon: 'logos:gitlab' },
      { id: 'canva', name: 'Canva', icon: 'lucide:palette' },
      { id: 'figma', name: 'Figma', icon: 'logos:figma' },
      { id: 'postman', name: 'Postman', icon: 'logos:postman-icon' },
      { id: 'notion', name: 'Notion', icon: 'logos:notion-icon' },
      { id: 'jira', name: 'Jira', icon: 'logos:jira' },
      { id: 'mantis', name: 'Mantis', icon: 'lucide:bug' },
      { id: 'matomo', name: 'Matomo', icon: 'lucide:bar-chart-3' },
      { id: 'google-analytics', name: 'Google Analytics', icon: 'logos:google-analytics' },
      { id: 'chatgpt', name: 'ChatGPT', icon: 'lucide:message-circle' },
      { id: 'claude', name: 'Claude.ai', icon: 'lucide:brain' },
    ],
  },
]
