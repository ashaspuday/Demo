const { test, expect } = require('@playwright/test');
const { LoginActions } = require('../actions/login.actions');

test('Login test', async ({ page }) => {
  const loginActions = new LoginActions(page);

  await loginActions.login();

  await loginActions.loginPage.waitForDashboard();
  await expect(page).toHaveURL(/.*#\/dashboard/);
});
