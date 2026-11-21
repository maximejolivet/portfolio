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

  test('recommendations slider moves to the next testimonial', async ({ page }) => {
    await page.goto('/fr')

    const next = page.getByRole('button', { name: 'Recommandation suivante' })
    await next.scrollIntoViewIfNeeded()
    await next.click()

    await expect(
      page.getByRole('button', { name: 'Afficher la recommandation 2' }),
    ).toHaveAttribute('aria-current', 'true')
  })

  test('recommendations autoplay can be paused and resumed', async ({ page }) => {
    await page.goto('/fr')

    const toggle = page.getByRole('button', { name: 'Mettre en pause le défilement' })
    await toggle.scrollIntoViewIfNeeded()
    await expect(toggle).toHaveAttribute('aria-pressed', 'false')

    await toggle.click()
    await expect(
      page.getByRole('button', { name: 'Reprendre le défilement' }),
    ).toHaveAttribute('aria-pressed', 'true')
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
