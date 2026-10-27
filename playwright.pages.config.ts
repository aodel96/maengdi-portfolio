import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "deployment.spec.ts",
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:4173",
    launchOptions: {
      executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    },
    trace: "retain-on-failure",
  },
  projects: [
    { name: "pages-desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "pages-mobile",
      use: { ...devices["Pixel 7"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "npm run preview:pages",
    url: "http://127.0.0.1:4173/maengdi-portfolio/",
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
