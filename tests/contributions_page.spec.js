// @ts-check
const { test, expect } = require('@playwright/test');

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



