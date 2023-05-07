// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testIsolation: false,

  timeout: 60000,
  expect: { timeout: 20000 },
  use: {
    actionTimeout: 20000,
    navigationTimeout: 60000,
  },

  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
      ['html'],
      ["line"],
      ["allure-playwright",
        {
          detail: true,
          outputFolder: "allure-results"
        }
      ],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://demoqa.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        headless: true,
        screenshot: 'on',
        video: 'on',
        ...devices['Desktop Chrome']
      },
    },

    {
      name: 'firefox',
      use: {
        headless: true,
        screenshot: 'on',
        video: 'on',
        ...devices['Desktop Firefox']
      },
    },

    {
      name: 'webkit',
      use: {
        headless: true,
        screenshot: 'on',
        video: 'on',
        ...devices['Desktop Safari']
      },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: {
        headless: true,
        screenshot: 'on',
        video: 'on',
        ...devices['Android']
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        headless: true,
        screenshot: 'on',
        video: 'on',
        ...devices['iPhone 14 Pro']
      },
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: {
        headless: true,
        screenshot: 'on',
        video: 'on',
        ...devices['Desktop Edge'], channel: 'msedge'
      },
    },
    {
      name: 'Google Chrome',
      use: {
        headless: true,
        screenshot: 'on',
        video: 'on',
        ...devices['Desktop Chrome'], channel: 'chrome'
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

