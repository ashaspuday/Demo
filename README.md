# Playwright E-commerce POM Framework

This repository contains a page object model (POM) framework for a dummy ecommerce application.
It includes separate folders for page objects, actions, and test suites, with global parameters stored in a single configuration file.

## Structure

- `pages/` - Page object classes for login, product, and checkout flows.
- `actions/` - Reusable action methods that orchestrate page object interactions.
- `tests/` - Playwright test files for login, add to cart, and checkout scenarios.
- `global-params.js` - Dummy URL and credential values for the framework.
- `.github/workflows/playwright.yml` - GitHub Actions workflow for CI.
- `playwright.config.js` - Playwright configuration with HTML report output.

## Setup

1. Install dependencies:
   ```bash
   npm install
   npx playwright install --with-deps
   ```
2. Run tests:
   ```bash
   npm test
   ```
3. View report:
   ```bash
   npm run test:report
   ```

## Notes

- Replace values in `global-params.js` with your actual ecommerce URL and credentials.
- Adjust selectors in `pages/*.js` to match the real application under test.
- Push this repository to GitHub and the workflow in `.github/workflows/playwright.yml` will run on push and pull requests.
