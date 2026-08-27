import { expect, test } from '@playwright/test';

async function expectNoHorizontalOverflow(page) {
  const sizes = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    page: document.documentElement.scrollWidth,
  }));
  expect(sizes.page).toBeLessThanOrEqual(sizes.viewport + 1);
}

async function revealWholePage(page) {
  const { height, viewport } = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    viewport: window.innerHeight,
  }));
  const step = Math.max(320, Math.floor(viewport * 0.72));
  for (let top = 0; top < height; top += step) {
    await page.evaluate(nextTop => window.scrollTo(0, nextTop), top);
    await page.waitForTimeout(90);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(850);
}

test('home communicates positioning, evidence, and projects', async ({ page }, testInfo) => {
  await page.goto('/#/');
  await expect(page.getByRole('heading', { name: /把 AI 做进/ })).toBeVisible();
  const reelHeading = page.getByRole('heading', { name: /30 秒，穿过三个/ });
  await reelHeading.scrollIntoViewIfNeeded();
  await expect(reelHeading).toBeVisible();
  for (const text of ['600+', 'AI 猎头人才寻访工作站', '企业数字资产智能评估系统', 'Project D AI 智能桌面 Agent']) {
    const target = page.getByText(text, { exact: true }).first();
    await target.scrollIntoViewIfNeeded();
    await expect(target).toBeVisible();
  }
  await expect(page.locator('video source[src*="Manny-Product-Proof-Reel.mp4"]')).toHaveCount(1);
  const reel = page.getByLabel('Manny 三个旗舰 AI 产品的 30 秒产品视频');
  await reel.scrollIntoViewIfNeeded();
  await expect.poll(async () => reel.evaluate(video => Number.isFinite(video.duration) ? video.duration : 0)).toBeGreaterThan(29);
  await expect(page.getByRole('link', { name: '查看 GIF' })).toHaveAttribute('href', /Manny-Product-Proof-Reel\.gif\?v=2$/);
  await expectNoHorizontalOverflow(page);
  await revealWholePage(page);
  await page.screenshot({ path: `test-results/${testInfo.project.name}-home.png`, fullPage: true });
});

test('navigation, project detail, and resume routes work', async ({ page }) => {
  await page.goto('/#/');
  if (await page.getByRole('button', { name: '打开菜单' }).isVisible()) {
    await page.getByRole('button', { name: '打开菜单' }).click();
  }
  await page.getByRole('link', { name: '项目', exact: true }).click();
  await expect(page).toHaveURL(/section=work/);
  await expect(page.locator('#work')).toBeInViewport();

  await page.getByRole('link', { name: /完整 Case Study/ }).first().click();
  await expect(page).toHaveURL(/#\/project\/talentflow/);
  await expect(page.getByRole('heading', { name: '我负责什么' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '可核验依据' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '真实界面与产品证据' })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.goto('/#/resume');
  await expect(page.getByRole('heading', { name: /把 AI 做进/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /打印/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test('three flagship demos are interactive and use disclosed example data', async ({ page }) => {
  for (const slug of ['talentflow', 'enterprise-evaluation', 'project-d']) {
    await page.goto(`/#/demo/${slug}`);
    await expect(page.getByText(/演示说明/)).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
  await page.goto('/#/demo/enterprise-evaluation');
  await page.getByRole('button', { name: '规则与证据' }).click();
  await expect(page.getByText('176', { exact: true })).toBeVisible();
});
