import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/HomePage';
import { ShopPage } from '../pageObjects/ShopPage';
import { ProductPage } from '../pageObjects/ProductPage';
import { CartPage } from '../pageObjects/CartPage';
import { CheckoutPage } from '../pageObjects/CheckoutPage';

test('End-to-End Purchase Flow with Page Object Model', async ({ page }) => {
  const homePage = new HomePage(page);
  const shopPage = new ShopPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Step 1: Navigate to the website and go to the shop
  await homePage.navigate();
  await expect(page).toHaveTitle('Cozy Online Muffin Shop');
  await homePage.goToShop();
  await expect(page).toHaveURL(/.*shop/);

  // Step 2: Select a product
  await shopPage.selectFirstProduct();
  await expect(page).toHaveURL(/.*product/);

  // Step 3: Add product to cart
  await productPage.addToCart();
  await expect(page.locator('.cart-item')).toBeVisible();

  // Step 4: Go to cart and proceed to checkout
  await cartPage.proceedToCheckout();
  await expect(page).toHaveURL(/.*checkout/);

  // Step 5: Fill checkout form and submit order
  await checkoutPage.fillCheckoutForm('Test User', 'testuser@example.com', '123 Muffin Lane');
  await checkoutPage.submitOrder();

  // Step 6: Verify order confirmation
  await checkoutPage.verifyOrderConfirmation();
});