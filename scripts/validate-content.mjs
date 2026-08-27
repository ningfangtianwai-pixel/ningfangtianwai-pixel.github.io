import { existsSync, readFileSync, statSync } from 'node:fs';

const source = readFileSync(new URL('../src/data.js', import.meta.url), 'utf8');
const requiredProjects = [
  'AI 猎头人才寻访工作站',
  '企业数字资产智能评估系统',
  'Project D AI 智能桌面 Agent',
  '企业多平台内容矩阵自动化控制台',
  'Manny Personal Workspace',
  '长期记忆型 AI 系统',
];
const requiredFacts = ['600+', '60+', '10+', "value: '176'", "value: '5'", "value: '8'", '75 / 78 / 23'];

const missing = [...requiredProjects, ...requiredFacts].filter((value) => !source.includes(value));
if (missing.length) {
  console.error(`Content validation failed. Missing: ${missing.join(', ')}`);
  process.exit(1);
}

const forbiddenClaims = [/github stars?/i, /客户收入/i, /融资金额/i, /在线 demo/i];
const forbidden = forbiddenClaims.filter((pattern) => pattern.test(source));
if (forbidden.length) {
  console.error(`Content validation failed. Review unsupported claims: ${forbidden.join(', ')}`);
  process.exit(1);
}

const resumePdf = new URL('../public/Manny-AI-Product-Resume.pdf', import.meta.url);
if (!existsSync(resumePdf) || statSync(resumePdf).size < 100_000) {
  console.error('Content validation failed. Generated resume PDF is missing or unexpectedly small.');
  process.exit(1);
}

const productVideo = new URL('../public/media/Manny-Product-Proof-Reel.mp4', import.meta.url);
const productGif = new URL('../public/media/Manny-Product-Proof-Reel.gif', import.meta.url);
if (!existsSync(productVideo) || statSync(productVideo).size < 1_000_000) {
  console.error('Content validation failed. The 30-second product reel is missing or unexpectedly small.');
  process.exit(1);
}
if (!existsSync(productGif) || statSync(productGif).size < 500_000) {
  console.error('Content validation failed. The product demo GIF is missing or unexpectedly small.');
  process.exit(1);
}

console.log('Content validation passed: 6 projects, verified evidence, resume PDF, product video, and GIF are present.');
