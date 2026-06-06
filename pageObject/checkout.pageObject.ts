import type { Page, Locator } from '@playwright/test';
import { BasePageObject } from './base.pageObject';

export class CheckoutPageObject extends BasePageObject {
  readonly agreeCheckbox: Locator;
  readonly countryInput: Locator;
  readonly countryOptions: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.agreeCheckbox = this.locator('#check');
    this.countryInput = this.locator('input[placeholder="Select Country"]');
    this.countryOptions = this.locator('.ng-option');
    this.placeOrderButton = this.locator('button[type="submit"]');
  }
}
