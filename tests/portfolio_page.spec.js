// @ts-check
const { test, expect } = require('@playwright/test');

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



