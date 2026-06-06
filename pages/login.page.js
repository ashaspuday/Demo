const { BasePage } = require('./base.page');
const params = require('../global-params');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.baseUrl = params.baseUrl;
    this.usernameField = page.locator('#userEmail');
    this.passwordField = page.locator('#userPassword');
    this.loginButton = page.locator('#login');
  }

  async goto() {
    await this.page.goto(this.baseUrl);
  }

  async login(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async waitForDashboard() {
    await this.page.waitForURL(/.*#\/dashboard/, { timeout: 10000 });
  }
}

module.exports = { LoginPage };
