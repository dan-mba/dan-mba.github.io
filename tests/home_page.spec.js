// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Homepage Tests', () => {
  test('Page loads', async ({ page }) => {
    await page.goto('/');
  });

  test('shows 4 nav elements', async ({ page }) => {
    await page.goto('/');
    const list = page.locator('#desktop-links > *');
    await expect(list).toHaveCount(5);
  });

  test('shows Portfolio dropdown', async ({ page }) => {
    await page.goto('/');
    const portfolio = page.getByRole('button', { name: 'Portfolio' });
    await portfolio.click();
    const menu = page.locator('#portfolio-menu a');
    await expect(menu).toHaveCount(3);
  });
});
