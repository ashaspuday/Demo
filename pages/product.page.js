const { BasePage } = require('./base.page');
const params = require('../global-params');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.baseUrl = params.baseUrl;
    this.addToCartButton = page.locator('button:has-text("Add To Cart")').first();
    this.cartButton = page.locator('button.btn-custom:has-text("Cart")');
    this.productCards = page.locator('.card');
  }

  async goto() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForURL(/.*#\/dashboard/, { timeout: 10000 });
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.page.waitForTimeout(1000);
  }

  async goToCart() {
    await this.cartButton.click();
    await this.page.waitForURL(/.*#\/dashboard\/cart/, { timeout: 10000 });
  }
}

module.exports = { ProductPage };
