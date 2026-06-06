import type { Page, Locator } from '@playwright/test';

export class BasePageObject {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
