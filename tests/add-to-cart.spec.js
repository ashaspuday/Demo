const { test, expect } = require('@playwright/test');
const { LoginActions } = require('../actions/login.actions');
const { CartActions } = require('../actions/cart.actions');

test('Add to cart test', async ({ page }) => {
  const loginActions = new LoginActions(page);
  await loginActions.login();

  const cartActions = new CartActions(page);
  await cartActions.addProductToCart();

  await expect(page).toHaveURL(/.*#\/dashboard\/cart/);
});
