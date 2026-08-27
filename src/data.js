export const metrics = [
  { value: '600+', label: '简历检索与分析任务' },
  { value: '60+', label: '建立有效业务联系' },
  { value: '10+', label: '预约真实企业面试' },
  { value: '176', label: '评估数据契约字段' },
];

export const projects = [
  {
    slug: 'talentflow', number: '01', flagship: true, category: '招聘自动化',
    title: 'AI 猎头人才寻访工作站', shortTitle: 'TalentFlow',
    statement: '让 AI 先完成高重复的信息处理，把判断权留给猎头。',
    summary: '把 JD 澄清、岗位画像、搜索策略、简历匹配、沟通话术和推荐报告连接为一条可执行工作流。',
    role: ['产品定义与流程设计', 'LLM 工作流与提示词架构', '前后端 MVP 实现', '真实招聘业务验证'],
    challenge: '猎头需要反复阅读非结构化简历、对照 JD、整理候选人优势与风险，再为不同沟通阶段生成材料。这些工作高频、耗时，而且输出标准不稳定。',
    solution: '产品将职位准备拆成 4 步、候选人推进拆成 3 步；使用 LLM 提取履历信息、建立匹配评分，并把结果继续传递到沟通话术和推荐报告。关键结论保留人工确认。',
    outcome: '累计完成 600+ 次候选人简历检索与分析，与 60+ 位候选人建立有效业务联系，最终预约 10+ 场真实企业面试。',
    evidence: [
      { value: '7 步', label: '从 JD 到推荐报告的产品流程', source: '运行中的 TalentFlow MVP' },
      { value: '600+', label: '候选人检索与分析任务', source: '真实招聘业务记录' },
      { value: '60+', label: '有效候选人联系', source: '真实招聘业务记录' },
      { value: '10+', label: '真实企业面试', source: '业务闭环结果' },
    ],
    decisions: [
      '先生成猎头追问清单，避免把信息不完整的 JD 直接送入匹配。',
      '评分只作为排序证据，不替代猎头对行业、动机和风险的判断。',
      '候选人数据默认保存在本地 SQLite，公开页面不展示任何简历或个人信息。',
    ],
    screenshots: [
      { src: '/cases/talentflow/dashboard.png', alt: 'TalentFlow 项目总览', caption: '真实运行界面：寻访项目总览与进度。' },
      { src: '/cases/talentflow/workflow.png', alt: 'TalentFlow JD 追问工作流', caption: '真实运行界面：JD 追问、岗位画像、招聘文案与搜索关键词。' },
    ],
    demo: { href: '#/demo/talentflow', label: '体验产品流程 Demo', note: '使用示例职位，不连接真实候选人数据或外部 LLM。' },
    tags: ['LLM Workflow', 'Resume Parsing', 'Human in the loop'],
  },
  {
    slug: 'enterprise-evaluation', number: '02', flagship: true, category: '企业数据与规则引擎',
    title: '企业数字资产智能评估系统', shortTitle: 'Enterprise Value',
    statement: '把分散的企业数据，变成可以解释、可以复查的经营判断。',
    summary: '建立 RAW、DERIVED、ASSESSMENT 三层数据契约，以模块评分和独立风险闸门输出可追溯的企业评估结果。',
    role: ['指标体系与数据契约设计', '评分规则与风险闸门设计', 'MVP 数据联调', '评估报告产品设计'],
    challenge: '企业工商、财税和经营数据口径不一致。单一总分难以解释，也容易掩盖持续经营、审计异常或流动性等关键风险。',
    solution: '当前 v0.2 数据契约冻结为 176 个字段，分为 75 个原始字段、78 个派生字段和 23 个评估字段；评分由 5 个模块组成，并设置 8 个不依赖总分的全局风险闸门。',
    outcome: '已形成字段字典、评分规则、输入与结果 Schema、覆盖率审计和数据契约校验脚本；可交互 Demo 使用匿名示例数据呈现规则如何工作。',
    evidence: [
      { value: '176', label: 'v0.2 数据契约字段', source: '字段字典 v0.2' },
      { value: '75 / 78 / 23', label: '原始 / 派生 / 评估字段', source: '字段字典 metadata' },
      { value: '5', label: '加权评估模块', source: '评分规则 v0.2.1' },
      { value: '8', label: '独立全局风险闸门', source: '评分规则 v0.2.1' },
    ],
    decisions: [
      '把缺失、空值、不适用和非法值拆成不同数据状态，避免“没有数据”被误当成零分。',
      '总分之外保留风险闸门，重大债务违约、审计异常等信号可以直接改变结论。',
      '公开 Demo 仅使用匿名示例数据，不公开原始企业资料、税票或内部表格。',
    ],
    screenshots: [
      { src: '/cases/enterprise-evaluation/overview.png', alt: '企业评估交互 Demo 总览', caption: '基于真实 v0.2 数据契约制作的交互 Demo：模块得分与风险结论。' },
      { src: '/cases/enterprise-evaluation/rules.png', alt: '企业评估规则证据页', caption: '交互 Demo：字段分层、规则覆盖与全局风险闸门。' },
    ],
    demo: { href: '#/demo/enterprise-evaluation', label: '打开评估系统 Demo', note: '真实规则结构，匿名示例数据；不代表正式企业评估结论。' },
    tags: ['Rule Engine', 'Data Contract', 'Risk Gates'],
  },
  {
    slug: 'project-d', number: '03', flagship: true, category: 'Windows 桌面 Agent',
    title: 'Project D AI 智能桌面 Agent', shortTitle: 'Project D',
    statement: '让 AI 不只知道你的事情，也能在桌面环境里帮你处理事情。',
    summary: '连接自然语言、个人上下文和 Windows 本地工具，围绕搜索、桌面整理、行动计划与隐私确认构建可执行工作空间。',
    role: ['产品概念与交互架构', '桌面任务与工具调用设计', '上下文与记忆机制', 'Windows MVP 实现与验收'],
    challenge: '个人信息散落在文件夹、便签、会议和历史交互里。传统聊天式 AI 既看不到长期上下文，也无法安全地进入用户的桌面工作流。',
    solution: '将桌面内容组织为可检索分区，把自然语言指令路由到本地工具；高风险动作先生成行动计划和确认步骤，并提供隐私、自动规则与恢复设置。',
    outcome: '完成 Windows 桌面工作空间、文件检索、桌面收件箱、整理计划、壁纸与设置中心等功能，并公开 TypeScript 源码和 Stage 36 验收截图。',
    evidence: [
      { value: '24', label: 'Stage 36 公开验收截图', source: 'GitHub 仓库 docs/screenshots' },
      { value: 'Local-first', label: '本地桌面内容与工具调用', source: '运行界面与公开源码' },
      { value: 'Plan first', label: '执行前行动计划与确认', source: 'Action plan 验收界面' },
      { value: 'TypeScript', label: '公开实现仓库', source: 'project-d-desktop' },
    ],
    decisions: [
      '把“执行前确认”设计成产品流程，而不是只写在提示词里。',
      '搜索结果和整理建议必须能回到具体文件，避免只有抽象回答。',
      '隐私、自动规则和恢复能力进入设置中心，成为桌面 Agent 的基础能力。',
    ],
    screenshots: [
      { src: '/cases/project-d/workspace.png', alt: 'Project D 桌面工作空间', caption: '真实验收截图：桌面分区、状态面板与整理建议。' },
      { src: '/cases/project-d/search-results.png', alt: 'Project D 文件搜索结果', caption: '真实验收截图：在桌面上下文中检索 Project D。' },
      { src: '/cases/project-d/action-plan.png', alt: 'Project D 行动计划预览', caption: '真实验收截图：整理动作执行前的范围预览。' },
    ],
    demo: { href: '#/demo/project-d', label: '体验桌面交互 Demo', note: 'Web 端交互演示；真实产品为 Windows 桌面应用。' },
    repo: 'https://github.com/ningfangtianwai-pixel/project-d-desktop',
    tags: ['Desktop Agent', 'Tool Calling', 'Local-first'],
  },
  { slug: 'content-matrix', number: '04', category: '运营自动化', title: '企业多平台内容矩阵自动化控制台', statement: '统一内容、账号、数据和潜客线索。', summary: '集中处理小红书、抖音、视频号和快手的内容生产、审核、发布与评论线索识别。', tags: ['Workflow Automation', 'Lead Detection'] },
  { slug: 'manny-workspace', number: '05', category: '个人效率', title: 'Manny Personal Workspace', statement: '把信息获取、任务和自动化集中到个人工作台。', summary: '聚合热点资讯、个人财务、便签、任务与日志，验证个人信息处理闭环。', tags: ['MCP', 'Automation'] },
  { slug: 'long-term-memory', number: '06', category: '长期记忆', title: '长期记忆型 AI 系统', statement: '让对话跨越会话，保持连续和个性化。', summary: '设计多层 Prompt 与长期记忆机制，对重要对话和用户信息进行提取、存储与召回。', tags: ['Memory System', 'Context Management'] },
];

export const capabilities = [
  { index: '01', title: '业务拆解', text: '把模糊需求拆成角色、输入、流程、约束和可验证结果。' },
  { index: '02', title: '产品设计', text: '定义 MVP、人工确认点、异常路径和数据边界。' },
  { index: '03', title: '系统实现', text: '组合 LLM、Agent、规则引擎、MCP 和本地工具。' },
  { index: '04', title: '真实验证', text: '用业务结果、错误样本和反馈循环判断产品是否有效。' },
];
