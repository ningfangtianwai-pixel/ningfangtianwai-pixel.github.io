import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/data.js', import.meta.url), 'utf8');
const requiredProjects = [
  'AI 猎头人才寻访工作站',
  '企业数字资产智能评估系统',
  'Project D AI 智能桌面 Agent',
  '企业多平台内容矩阵自动化控制台',
  'Manny Personal Workspace',
  '长期记忆型 AI 系统',
];
const requiredFacts = ['600+', '60+', '10+', '200+', "value: '3'", "value: '19'"];

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

console.log('Content validation passed: 6 projects and all supplied result metrics are present.');
