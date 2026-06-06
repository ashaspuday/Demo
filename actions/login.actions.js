const POManager = require('../po.manager');
const params = require('../global-params');

class LoginActions {
  constructor(page) {
    this.poManager = new POManager(page);
    this.loginPage = this.poManager.getLoginPage();
  }

  async login() {
    await this.loginPage.goto();
    await this.loginPage.login(params.username, params.password);
    await this.loginPage.waitForDashboard();
  }
}

module.exports = { LoginActions };
