import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect the page title to include the brand name.
  await expect(page).toHaveTitle(/Drawnix - Open Source Whiteboard/);
  expect(page.locator('drawnix')).toBeTruthy();
});
