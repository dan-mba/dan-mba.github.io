// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Homepage Common Tests', () => {
  test('Page loads', async ({ page }) => {
    await page.goto('/');
  });

  test('should pass axe wcag accessibility issues', async ({ page }) => {
    await page.goto('/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag21aaa'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Homepage Desktop Tests',() => {
  test.skip(({isMobile}) => isMobile, 'Desktop only tests');

  test('shows 4 nav elements', async ({ page }) => {
    await page.goto('/');
    const list = page.locator('#desktop-links > *');
    await expect(list).toHaveCount(5);
  });

  test('shows portfolio dropdown', async ({ page }) => {
    await page.goto('/');
    const portfolio = page.getByRole('button', { name: 'Portfolio' });
    await portfolio.click();
    const menu = page.locator('#portfolio-menu a');
    await expect(menu).toHaveCount(3);
  });
});

test.describe('Homepage Mobile Tests', () => {
  test.skip(({isMobile}) => !isMobile, 'Mobile only tests');

  test('shows menu drawer', async({ page }) => {
    await page.goto('/');
    const menuButton = page.locator('#menu-button');
    await menuButton.click();
    const drawer = page.locator('#menu-drawer');
    await expect(drawer).toBeVisible();
  });
});

