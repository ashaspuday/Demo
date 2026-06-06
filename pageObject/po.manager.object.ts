import type { Page } from '@playwright/test';
import { LoginPageObject } from './login.pageObject';
import { ProductPageObject } from './product.pageObject';
import { CheckoutPageObject } from './checkout.pageObject';

export class POManagerObject {
  private page: Page;
  private _loginPage?: LoginPageObject;
  private _productPage?: ProductPageObject;
  private _checkoutPage?: CheckoutPageObject;

  constructor(page: Page) {
    this.page = page;
  }

  get loginPage(): LoginPageObject {
    if (!this._loginPage) this._loginPage = new LoginPageObject(this.page);
    return this._loginPage;
  }

  get productPage(): ProductPageObject {
    if (!this._productPage) this._productPage = new ProductPageObject(this.page);
    return this._productPage;
  }

  get checkoutPage(): CheckoutPageObject {
    if (!this._checkoutPage) this._checkoutPage = new CheckoutPageObject(this.page);
    return this._checkoutPage;
  }
}

export default POManagerObject;
