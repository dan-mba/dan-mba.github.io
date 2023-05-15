// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Portfolio Page Tests', () => {
  test('Page loads', async ({ page }) => {
    await page.goto('/portfolio/');
  });

  test('shows 6 cards', async ({ page }) => {
    await page.goto('/portfolio/');
    const list = page.locator('.MuiCard-root');
    await expect(list).toHaveCount(6);
  });

  test('each card has 1 topic', async ({ page }) => {
    await page.goto('/portfolio/');
    const cards = page.locator('.MuiCard-root');
    const cardCount = await cards.count();
    for (let i=0; i < cardCount; i++) {
      const chips = await cards.nth(i).locator('.MuiChip-root');
      const count = await chips.count();
      await expect(count).toBeGreaterThanOrEqual(1)
    }
  });
});

test.describe('Portfolio - accessibility tests (light)', () => {
  test.use({ colorScheme: 'light' });

  test('should pass axe wcag accessibility tests (light)', async ({ page }) => {
    await page.goto('/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("Portfolio - accessibility tests (dark)", () => {
  test.use({ colorScheme: 'dark' });

  test('should pass axe wcag accessibility tests (dark)', async ({ page }) => {
    await page.goto('/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});



