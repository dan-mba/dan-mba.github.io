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
});

test.describe('Topics - accessibility tests (light)', () => {
  test.use({ colorScheme: 'light' });

  test('should pass axe wcag accessibility tests (light)', async ({ page }) => {
    await page.goto('/topics/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Topics - accessibility tests (dark)', () => {
  test.use({ colorScheme: 'dark' });

  test('should pass axe wcag accessibility tests (dark)', async ({ page }) => {
    await page.goto('/topics/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});


