import type { Page, Locator } from '@playwright/test';
import { BasePageObject } from './base.pageObject';

export class ProductPageObject extends BasePageObject {
  readonly productCards: Locator;
  readonly addToCartButton: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productCards = this.locator('.card');
    this.addToCartButton = this.locator('button:has-text("Add To Cart")');
    this.cartButton = this.locator('button.btn-custom:has-text("Cart")');
  }
}
