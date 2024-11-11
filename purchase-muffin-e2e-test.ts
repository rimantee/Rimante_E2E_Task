import { test, expect } from '@playwright/test';

test('End-to-End Purchase Flow', async ({ page }) => {
  // Step 1: Visit the muffin shop website
  await page.goto('https://lightgrey-antelope-m7vwozwl8xf7l3y2.builder-preview.com');

  // Step 2: Navigate to the Shop section
  await page.click('text=Shop');
  await expect(page).toHaveURL(/.*shop/);  // Confirm shop page

  // Step 3: Select the first product (adjust selector as needed)
  await page.click('.product-card >> nth=0');
  await expect(page).toHaveURL(/.*product/); // Confirm product page

  // Step 4: Add the product to the cart
  await page.click('.add-to-cart-button');
  await page.waitForTimeout(2000);  // Wait for cart update

  // Step 5: Navigate to the Cart and confirm item presence
  await page.click('text=Cart');
  await expect(page).toHaveURL(/.*cart/);
  await expect(page.locator('.cart-item')).toBeVisible();  // Ensure item in cart

  // Step 6: Proceed to checkout
  await page.click('.checkout-button');
  await expect(page).toHaveURL(/.*checkout/);

  // Step 7: Fill out checkout form
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'testuser@example.com');
  await page.fill('input[name="address"]', '123 Muffin Lane');

  // Step 8: Submit the order
  await page.click('.submit-order-button');

  // Step 9: Confirm successful order submission
  await expect(page.locator('text=Thank you for your purchase')).toBeVisible();
});