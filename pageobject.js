// Central exports for page object classes
const { LoginPage } = require('./pages/login.page');
const { ProductPage } = require('./pages/product.page');
const { CheckoutPage } = require('./pages/checkout.page');
const { BasePage } = require('./pages/base.page');

module.exports = {
  LoginPage,
  ProductPage,
  CheckoutPage,
  BasePage
};
