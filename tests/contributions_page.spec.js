// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Contributions Page Tests', () => {
  test('Page loads', async ({ page }) => {
    await page.goto('/contributions/');
  });

  test('shows 6 cards', async ({ page }) => {
    await page.goto('/contributions/');
    const list = page.locator('.MuiCard-root');
    await expect(list).toHaveCount(6);
  });
});

test.describe('Contributions - accessibility tests (light)', () => {
  test.use({ colorScheme: 'light' });

  test('should pass axe wcag accessibility tests (light)', async ({ page }) => {
    await page.goto('/contributions/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Contributions - accessibility tests (dark)', () => {
  test.use({ colorScheme: 'dark' });

  test('should pass axe wcag accessibility tests (dark)', async ({ page }) => {
    await page.goto('/contributions/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});



