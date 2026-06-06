const { test, expect } = require('@playwright/test');
const { LoginActions } = require('../actions/login.actions');
const { CartActions } = require('../actions/cart.actions');

test('Checkout test', async ({ page }) => {
  const loginActions = new LoginActions(page);
  await loginActions.login();

  const cartActions = new CartActions(page);
  await cartActions.addProductToCart();

  // Navigate to checkout from cart page
  await page.click('button:has-text("Checkout")');
  await page.waitForURL(/.*#\/dashboard\/order/, { timeout: 10000 });

  await expect(page).toHaveURL(/.*#\/dashboard\/order/);
});
