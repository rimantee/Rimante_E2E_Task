import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://lightgrey-antelope-m7vwozwl8xf7l3y2.builder-preview.com');
  }

  async goToShop() {
    await this.page.click('text=Shop');
  }
}