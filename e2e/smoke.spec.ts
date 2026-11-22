import { expect, test } from '@playwright/test'

// Known console errors that are not regressions of this site's code:
// - @nuxt/image adds an inline `onerror` to its server-rendered <img>, which the strict CSP
//   (script-src-attr 'none') blocks. Only the client-side image fallback is affected.
// - `.env` overrides NUXT_PUBLIC_SITE_URL for local runs, so the i18n baseUrl check warns.
const KNOWN_CONSOLE_ERRORS = [/script-src-attr/, /I18n baseUrl/]

test.describe('homepage (fr)', () => {
  test('renders the main sections without console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !KNOWN_CONSOLE_ERRORS.some((re) => re.test(msg.text()))) {
        errors.push(msg.text())
      }
    })

    await page.goto('/fr')

    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.locator('#about')).toBeAttached()
    await expect(page.locator('#projects-list')).toBeAttached()
    expect(errors).toEqual([])
  })

  test('recommendations show both quotes with their signatures', async ({ page }) => {
    await page.goto('/fr')

    const articles = page.locator('#recommendations article')
    await articles.first().scrollIntoViewIfNeeded()
    await expect(articles).toHaveCount(2)
    await expect(articles.nth(1).locator('img')).toHaveAttribute('src', /id=m3x9/)
    await expect(articles.nth(0).getByRole('link', { name: /LinkedIn/ })).toBeVisible()
  })
})

test.describe('locales', () => {
  test('english homepage is served under /en', async ({ page }) => {
    const response = await page.goto('/en')

    expect(response?.status()).toBe(200)
    await expect(page.locator('#recommendations')).toBeAttached()
  })
})

test.describe('errors', () => {
  test('unknown route returns a 404 page', async ({ page }) => {
    const response = await page.goto('/fr/cette-page-n-existe-pas')

    expect(response?.status()).toBe(404)
  })
})
