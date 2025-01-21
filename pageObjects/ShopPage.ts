import { Page } from '@playwright/test';

export class ShopPage {
  constructor(private page: Page) {}

  async selectFirstProduct() {
    await this.page.click('.product-card >> nth=0');
  }
}