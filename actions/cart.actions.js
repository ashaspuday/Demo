const POManager = require('../po.manager');

class CartActions {
  constructor(page) {
    this.poManager = new POManager(page);
    this.productPage = this.poManager.getProductPage();
  }

  async addProductToCart() {
    await this.productPage.goto();
    await this.productPage.addToCart();
    await this.productPage.goToCart();
  }
}

module.exports = { CartActions };
