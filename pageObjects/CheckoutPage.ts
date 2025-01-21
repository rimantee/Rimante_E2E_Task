import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillCheckoutForm(name: string, email: string, address: string) {
    await this.page.fill('input[name="name"]', name);
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="address"]', address);
  }

  async submitOrder() {
    await this.page.click('.submit-order-button');
  }

  async verifyOrderConfirmation() {
    await this.page.waitForSelector('text=Thank you for your purchase');
  }
}