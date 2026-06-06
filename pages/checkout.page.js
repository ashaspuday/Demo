const { BasePage } = require('./base.page');
const params = require('../global-params');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.baseUrl = params.baseUrl;
    this.agreeCheckbox = page.locator('#check');
    this.countryInput = page.locator('input[placeholder="Select Country"]');
    this.countryOptions = page.locator('.ng-option');
    this.placeOrderButton = page.locator('button[type="submit"]:visible').last();
  }

  async goto() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForURL(/.*#\/dashboard/, { timeout: 10000 });
  }

  async agreeToTerms() {
    await this.page.waitForTimeout(1000);
    await this.agreeCheckbox.scrollIntoViewIfNeeded();
    await this.agreeCheckbox.click({ force: true });
  }

  async selectCountry(countryName) {
    await this.countryInput.click();
    await this.countryInput.fill(countryName);
    await this.page.waitForTimeout(500);
    await this.countryOptions.first().click();
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async waitForOrderConfirmation() {
    await this.page.waitForURL(/.*#\/dashboard\/order/, { timeout: 10000 });
  }
}

module.exports = { CheckoutPage };
