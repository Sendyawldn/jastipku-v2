import { test, expect } from '@playwright/test';

test.describe('Order Flow (End-to-End)', () => {
  test('Customer should be able to view login page and explore trips', async ({ page }) => {
    // 1. Visit Home Page
    await page.goto('/');
    await expect(page).toHaveTitle(/Jastipku/i);
    
    // 2. Navigate to Explore Page
    await page.click('text=Explore Routes');
    await expect(page).toHaveURL(/.*explore/);
    await expect(page.locator('h1')).toContainText('AVAILABLE ROUTES');

    // 3. Navigate to Login Page
    await page.goto('/login');
    await expect(page.locator('h1')).toContainText('TERMINAL LOGIN');
    
    // Verify login form exists
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });
});
