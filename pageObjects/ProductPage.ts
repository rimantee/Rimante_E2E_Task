import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async addToCart() {
    await this.page.click('.add-to-cart-button');
  }
}