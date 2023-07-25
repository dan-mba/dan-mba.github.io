// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Technologies Page Tests', () => {
  test('Page loads', async ({ page }) => {
    await page.goto('/technologies/');
  });

  test('displays technology chips', async ({ page }) => {
    await page.goto('/technologies/');
    const chips = page.locator('.MuiChip-root');
    const chipsCount = await chips.count();
    await expect(chipsCount).toBeGreaterThanOrEqual(1);
  });

  test('should link to technology page', async ({ page }) => {
    await page.goto('/technologies/');
    const js = page.getByRole('link', { name: /javascript/i });
    await js.click();
    await expect(page).toHaveURL(/.*\/technologies\/javascript\//)
  });
});

test.describe('Technologies - accessibility tests (light)', () => {
  test.use({ colorScheme: 'light' });

  test('should pass axe wcag accessibility tests (light)', async ({ page }) => {
    await page.goto('/technologies/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Technologies - accessibility tests (dark)', () => {
  test.use({ colorScheme: 'dark' });

  test('should pass axe wcag accessibility tests (dark)', async ({ page }) => {
    await page.goto('/technologies/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});


