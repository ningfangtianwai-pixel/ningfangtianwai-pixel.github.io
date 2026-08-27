import { expect, test } from '@playwright/test';

async function expectNoHorizontalOverflow(page) {
  const sizes = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    page: document.documentElement.scrollWidth,
  }));
  expect(sizes.page).toBeLessThanOrEqual(sizes.viewport + 1);
}

test('home communicates positioning, evidence, and projects', async ({ page }, testInfo) => {
  await page.goto('/#/');
  await expect(page.getByRole('heading', { name: /把 AI 做进/ })).toBeVisible();
  await expect(page.getByText('600+', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('AI 猎头人才寻访工作站', { exact: true })).toBeVisible();
  await expect(page.getByText('企业数字资产智能评估系统', { exact: true })).toBeVisible();
  await expect(page.getByText('Project D AI 智能桌面 Agent', { exact: true })).toBeVisible();
  await expectNoHorizontalOverflow(page);
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
