const { LoginPage, ProductPage, CheckoutPage } = require('./pageobject');

class POManager {
  constructor(page) {
    this.page = page;
    this._loginPage = null;
    this._productPage = null;
    this._checkoutPage = null;
  }

  getLoginPage() {
    if (!this._loginPage) this._loginPage = new LoginPage(this.page);
    return this._loginPage;
  }

  getProductPage() {
    if (!this._productPage) this._productPage = new ProductPage(this.page);
    return this._productPage;
  }

  getCheckoutPage() {
    if (!this._checkoutPage) this._checkoutPage = new CheckoutPage(this.page);
    return this._checkoutPage;
  }
}

module.exports = POManager;
