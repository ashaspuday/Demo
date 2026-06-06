const POManager = require('../po.manager');

class CheckoutActions {
  constructor(page) {
    this.poManager = new POManager(page);
    this.checkoutPage = this.poManager.getCheckoutPage();
  }

  async completeCheckout(countryName = 'India') {
    await this.checkoutPage.goto();
    await this.checkoutPage.agreeToTerms();
    await this.checkoutPage.selectCountry(countryName);
    await this.checkoutPage.placeOrder();
    await this.checkoutPage.waitForOrderConfirmation();
  }
}

module.exports = { CheckoutActions };
