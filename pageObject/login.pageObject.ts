import type { Page, Locator } from '@playwright/test';
import { BasePageObject } from './base.pageObject';

export class LoginPageObject extends BasePageObject {
  readonly userEmail: Locator;
  readonly userPassword: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.userEmail = this.locator('#userEmail');
    this.userPassword = this.locator('#userPassword');
    this.loginButton = this.locator('#login');
  }
}
