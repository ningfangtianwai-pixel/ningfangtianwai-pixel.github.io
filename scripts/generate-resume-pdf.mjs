import { chromium } from '@playwright/test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const input = resolve(root, 'resume', 'Manny-AI-Product-Resume.html');
const output = resolve(root, 'public', 'Manny-AI-Product-Resume.pdf');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto(pathToFileURL(input).href, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.pdf({
  path: output,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
await browser.close();

console.log(`Generated ${output}`);
