import { expect, test, type Locator, type Page } from '@playwright/test'

// Display preferences (components/layout/PreferencesPanel.vue, composables/usePreferences.ts).
// The intro overlay is skipped through sessionStorage, the same way a returning visitor gets it.
const STORAGE_KEY = 'mj_preferences'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem('mj_intro_shown', '1')
    // The cookie banner sits over the footer on a first visit and intercepts clicks on the
    // footer button. Hiding it keeps these tests about the preferences, not the consent flow.
    document.addEventListener('DOMContentLoaded', () => {
      const style = document.createElement('style')
      style.textContent = '#tarteaucitronRoot { display: none !important; }'
      document.head.appendChild(style)
    })
  })
})

async function openPanel(page: Page) {
  await page.goto('/fr')
  // The button only responds once the client has hydrated; the theme attribute is set on mount.
  await page.waitForSelector('html[data-theme]')
  await page.getByRole('button', { name: 'Préférences d\'affichage' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
}

function option(page: Page, label: string): Locator {
  return page.getByRole('dialog').getByRole('button', { name: label, exact: true })
}

async function htmlAttr(page: Page, name: 'textScale' | 'motion' | 'contrast') {
  return page.locator('html').getAttribute(`data-${name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`)
}

test.describe('display preferences', () => {
  test('choices are applied to <html> and reflected as pressed buttons', async ({ page }) => {
    await openPanel(page)

    await option(page, 'Très grand').click()
    await option(page, 'Réduites').click()
    await option(page, 'Renforcé').click()

    await expect(option(page, 'Très grand')).toHaveAttribute('aria-pressed', 'true')
    await expect(option(page, 'Réduites')).toHaveAttribute('aria-pressed', 'true')
    await expect(option(page, 'Renforcé')).toHaveAttribute('aria-pressed', 'true')
    await expect(option(page, 'Standard').first()).toHaveAttribute('aria-pressed', 'false')

    expect(await htmlAttr(page, 'textScale')).toBe('xlarge')
    expect(await htmlAttr(page, 'motion')).toBe('reduce')
    expect(await htmlAttr(page, 'contrast')).toBe('high')

    // 'xlarge' is 20px on the root element; every rem-based size follows it.
    const rootFontSize = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize)
    expect(rootFontSize).toBe('20px')
  })

  test('choices survive a reload, and reset clears them', async ({ page }) => {
    await openPanel(page)
    await option(page, 'Grand').click()
    await option(page, 'Renforcé').click()

    await page.reload()
    expect(await htmlAttr(page, 'textScale')).toBe('large')
    expect(await htmlAttr(page, 'contrast')).toBe('high')

    // The panel is closed after a reload: reopen it to reset.
    await page.getByRole('button', { name: 'Préférences d\'affichage' }).click()
    await page.getByRole('dialog').getByRole('button', { name: 'Réinitialiser' }).click()
    expect(await htmlAttr(page, 'textScale')).toBe('default')
    expect(await htmlAttr(page, 'contrast')).toBe('default')
    expect(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY)).toBeNull()
  })

  test('Escape closes the panel', async ({ page }) => {
    await openPanel(page)

    await page.keyboard.press('Escape')

    await expect(page.getByRole('dialog')).toHaveCount(0)
  })

  test('invalid stored values fall back to the defaults', async ({ page }) => {
    await page.addInitScript((key) => {
      localStorage.setItem(key, JSON.stringify({ textScale: 'huge', motion: 'sometimes' }))
    }, STORAGE_KEY)

    await page.goto('/fr')

    expect(await htmlAttr(page, 'textScale')).toBe('default')
    expect(await htmlAttr(page, 'motion')).toBe('system')
  })
})

test.describe('forced motion preference', () => {
  test('"Réduites" stops the hero marquee even when the system asks for motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await openPanel(page)
    await option(page, 'Réduites').click()
    await page.keyboard.press('Escape')

    await page.goto('/fr')
    const marquee = page.locator('.marquee-running, .marquee-paused').first()
    await expect(marquee).toBeAttached()

    const duration = await marquee.evaluate((el) => getComputedStyle(el).animationDuration)
    // The reduced-motion rules set 0.01ms, against 26s for the looping marquee.
    expect(parseFloat(duration)).toBeLessThanOrEqual(0.01)
  })

  test('"Complètes" keeps the marquee running when the system asks to reduce motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await openPanel(page)
    await option(page, 'Complètes').click()
    await page.keyboard.press('Escape')

    await page.goto('/fr')
    const marquee = page.locator('.marquee-running').first()
    await expect(marquee).toBeAttached()

    const duration = await marquee.evaluate((el) => getComputedStyle(el).animationDuration)
    expect(parseFloat(duration)).toBeGreaterThan(1)
  })
})
