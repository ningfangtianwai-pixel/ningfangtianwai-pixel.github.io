import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const baseURL = process.env.CAPTURE_BASE_URL || 'http://127.0.0.1:4173';
const output = new URL('../public/cases/enterprise-evaluation/', import.meta.url);
await mkdir(output, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1536, height: 1050 }, colorScheme: 'dark' });
await page.goto(`${baseURL}/#/demo/enterprise-evaluation`, { waitUntil: 'networkidle' });
await page.locator('.product-demo').screenshot({ path: fileURLToPath(new URL('overview.png', output)) });
await page.getByRole('button', { name: '规则与证据' }).click();
await page.locator('.product-demo').screenshot({ path: fileURLToPath(new URL('rules.png', output)) });
await browser.close();

console.log('Captured enterprise evaluation overview and rules screenshots.');
