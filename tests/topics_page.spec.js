// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Topics Page Tests', () => {
  test('Page loads', async ({ page }) => {
    await page.goto('/topics/');
  });

  test('displays topic chips', async ({ page }) => {
    await page.goto('/topics/');
    const chips = page.locator('.MuiChip-root');
    const chipsCount = await chips.count();
    await expect(chipsCount).toBeGreaterThanOrEqual(1);
  });

  test('should link to topic page', async ({ page }) => {
    await page.goto('/topics/');
    const js = page.getByRole('link', { name: /javascript/i });
    await js.click();
    await expect(page).toHaveURL(/.*\/topics\/javascript\//)
  });

  test('should pass axe wcag accessibility tests', async ({ page }) => {
    await page.goto('/topics/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag21aaa'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});



