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

  // test('each card has 1 topic', async ({ page }) => {
  //   await page.goto('/portfolio/');
  //   const list = page.locator('.MuiCard-root');
  //   const topicCount = await list.evaluateAll((cards) => {
  //     return cards.map(card => card.locator('.MuiChip-root'))
  //   });

  //   await topicCount.forEach(async topics => {
  //     await expect(topics).toBeGreaterThanOrEqual(1)
  //   });
  // });
});



