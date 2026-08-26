import { defineConfig, devices } from '@playwright/test';

const liveBaseUrl = process.env.BASE_URL;

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  reporter: 'line',
  use: {
    baseURL: liveBaseUrl || 'http://127.0.0.1:4173',
    colorScheme: 'dark',
    screenshot: 'only-on-failure',
  },
  webServer: liveBaseUrl ? undefined : {
    command: 'npm run preview -- --host 127.0.0.1',
    port: 4173,
    reuseExistingServer: true,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], browserName: 'chromium' } },
  ],
});
