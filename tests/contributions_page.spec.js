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

  test('should pass axe wcag accessibility tests', async ({ page }) => {
    await page.goto('/contributions/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag21aaa'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});



