import { defineConfig, devices } from '@playwright/test'

// Runs against the production build (`npm run test:e2e` builds first).
// `.env` is loaded so Supabase-backed sections render as they do in production.
const PORT = 4173

export default defineConfig({
  testDir: 'e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'node --env-file-if-exists=.env .output/server/index.mjs',
    url: `http://127.0.0.1:${PORT}/fr`,
    env: { PORT: String(PORT), HOST: '127.0.0.1' },
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
