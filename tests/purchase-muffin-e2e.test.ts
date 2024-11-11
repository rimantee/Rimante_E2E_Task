import { test, expect } from '@playwright/test';

describe('End-to-End Purchase Flow', () => {

  test('Visit the website and validate title', async ({ page }) => {
    await page.goto('https://lightgrey-antelope-m7vwozwl8xf7l3y2.builder-preview.com');
    await expect(page).toHaveTitle('Cozy Online Muffin Shop');
  });

  test('Navigate to Shop and verify product listing', async ({ page }) => {
    await page.click('text=Shop');
    await expect(page).toHaveURL(/.*shop/);
    await expect(page.locator('.product-card')).toBeVisible();
  });

  test('Select a product and verify product details', async ({ page }) => {
    await page.click('.product-card >> nth=0');
    await expect(page).toHaveURL(/.*product/);
    await expect(page.locator('.product-details')).toBeVisible();
  });

  test('Add product to cart and verify item in cart', async ({ page }) => {
    await page.click('.add-to-cart-button');
    await expect(page.locator('.cart-item')).toBeVisible();
  });

  test('Navigate to Cart and proceed to checkout', async ({ page }) => {
    await page.click('text=Cart');
    await expect(page).toHaveURL(/.*cart/);
    await expect(page.locator('.cart-item')).toBeVisible();
    await page.click('.checkout-button');
    await expect(page).toHaveURL(/.*checkout/);
  });

  test('Fill checkout form and validate input fields', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="address"]', '123 Muffin Lane');
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('input[name="email"]')).toHaveValue('testuser@example.com');
  });

  test('Submit order and verify success message', async ({ page }) => {
    await page.click('.submit-order-button');
    await expect(page.locator('text=Thank you for your purchase')).toBeVisible();
    await expect(page).toHaveURL(/.*order-confirmation/);
  });

});