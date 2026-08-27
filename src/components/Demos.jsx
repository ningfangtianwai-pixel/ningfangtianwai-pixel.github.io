import { useMemo, useState } from 'react';
import Icon from './Icon';

function DemoNotice({ children }) {
  return <div className="demo-notice"><span>演示说明</span><p>{children}</p></div>;
}

const talentSteps = [
  ['JD 澄清', '识别职责、团队、薪酬和绩效信息缺口。'],
  ['岗位画像', '形成目标行业、公司、职能和候选人边界。'],
  ['招聘文案', '把内部 JD 转成候选人可理解的职位表达。'],
  ['搜索策略', '生成平台关键词、同义职位和排除条件。'],
  ['简历匹配', '抽取履历证据并形成结构化匹配判断。'],
  ['沟通话术', '根据候选人背景生成可人工修改的沟通框架。'],
  ['推荐报告', '汇总优势、风险、动机和岗位推荐理由。'],
];

export function TalentFlowDemo() {
  const [step, setStep] = useState(0);
  return <div className="product-demo talent-demo">
    <aside className="demo-side"><div className="demo-brand"><b>✣</b><span>TalentFlow<small>AI 猎聘工作台</small></span></div><nav>{talentSteps.map((item, index) => <button key={item[0]} className={step === index ? 'active' : ''} onClick={() => setStep(index)}><i>{index + 1}</i><span>{item[0]}</span></button>)}</nav><small>示例职位 · 零售策略负责人</small></aside>
    <section className="talent-canvas">
      <header><div><small>示例寻访项目</small><h2>新业务零售策略负责人</h2></div><span>{step + 1} / 7</span></header>
      <div className="talent-progress"><i style={{ width: `${((step + 1) / talentSteps.length) * 100}%` }}/></div>
      <article className="talent-output"><div className="output-heading"><span>步骤 {String(step + 1).padStart(2, '0')}</span><h3>{talentSteps[step][0]}</h3><p>{talentSteps[step][1]}</p></div>
        {step === 0 && <ul><li>这个岗位对零售团队是否拥有直接管理权？</li><li>核心 KPI 更偏销售增长、利润，还是体系搭建？</li><li>当前团队规模、汇报对象和跨部门协作关系是什么？</li><li>薪酬结构与长期激励的明确边界是什么？</li></ul>}
        {step === 1 && <div className="profile-grid"><span><small>目标行业</small>两轮出行 / 新零售</span><span><small>关键能力</small>策略与落地并重</span><span><small>经验区间</small>8–15 年</span><span><small>决策边界</small>人工复核</span></div>}
        {step === 2 && <blockquote>你将负责新零售体系从策略到执行的完整链路，与业务负责人共同搭建可复制的增长模型。</blockquote>}
        {step === 3 && <div className="keyword-cloud"><span>零售策略</span><span>渠道运营</span><span>用户增长</span><span>商业分析</span><span>新业务</span><span>组织搭建</span></div>}
        {step === 4 && <div className="score-demo"><strong>82</strong><div><span>行业相关度<i style={{width:'86%'}}/></span><span>岗位能力<i style={{width:'80%'}}/></span><span>履历稳定性<i style={{width:'74%'}}/></span></div></div>}
        {step === 5 && <blockquote>你好，我们正在寻找一位能把零售策略真正落地的人。你的渠道体系与增长项目经历，与这个岗位当前阶段很接近。</blockquote>}
        {step === 6 && <div className="report-demo"><span>推荐结论</span><h4>建议进入业务沟通</h4><p>优势：从策略到一线执行的完整经验。需要确认：组织管理范围与新业务风险偏好。</p></div>}
      </article>
      <footer><button disabled={step === 0} onClick={() => setStep(step - 1)}>上一步</button><button className="solid" onClick={() => setStep(step === talentSteps.length - 1 ? 0 : step + 1)}>{step === talentSteps.length - 1 ? '重新演示' : '下一步'} <Icon name="arrow"/></button></footer>
    </section>
    <DemoNotice>这是依据真实 7 步产品流程制作的交互演示，使用匿名示例职位，不连接候选人简历、业务数据库或外部 LLM。</DemoNotice>
  </div>;
}

const modules = [
  ['资产基本面', 82, 25], ['盈利质量', 76, 30], ['竞争壁垒', 84, 20], ['成长动能', 72, 15], ['治理风险', 88, 10],
];
const gates = ['持续经营疑虑', '审计意见异常', '重大债务违约', '财务造假嫌疑', '流动性危机', '重大法律风险', '商誉减值风险', '关联方资金占用'];

export function EnterpriseDemo() {
  const [tab, setTab] = useState('overview');
  const total = useMemo(() => modules.reduce((sum, item) => sum + item[1] * item[2] / 100, 0).toFixed(1), []);
  return <div className="product-demo enterprise-demo">
    <header className="enterprise-top"><div className="enterprise-name"><b>M</b><span>Manny 企业评估<small>匿名示例公司 · 演示数据</small></span></div><nav><button className={tab === 'overview' ? 'active' : ''} onClick={() => setTab('overview')}>评估总览</button><button className={tab === 'rules' ? 'active' : ''} onClick={() => setTab('rules')}>规则与证据</button></nav><span className="model-version">MODEL v0.2.1</span></header>
    {tab === 'overview' ? <main className="enterprise-overview">
      <section className="score-summary"><div className="score-ring"><strong>{total}</strong><small>综合得分</small></div><div><span className="status-pill">审慎积极</span><h2>经营基础稳定，增长质量需要继续验证。</h2><p>评分是模块证据的汇总；风险闸门拥有独立优先级，不会被总分覆盖。</p></div></section>
      <section className="module-panel"><div className="panel-title"><span>01</span><div><h3>五个评估模块</h3><p>权重合计 100%</p></div></div><div className="module-bars">{modules.map(([name, score, weight]) => <div key={name}><span>{name}<small>权重 {weight}%</small></span><b>{score}</b><i><em style={{width:`${score}%`}}/></i></div>)}</div></section>
      <section className="gate-panel"><div className="panel-title"><span>02</span><div><h3>全局风险闸门</h3><p>8 项独立判断</p></div></div><div className="gate-list">{gates.slice(0,5).map(name => <span key={name}><i>✓</i>{name}<small>未触发</small></span>)}</div></section>
    </main> : <main className="enterprise-rules">
      <section className="contract-head"><span>真实数据契约结构</span><h2>每一个分数，都能回到字段、计算和风险判断。</h2><p>以下数量直接来自字段字典 v0.2 与评分规则 v0.2.1；界面中的企业名称和分值仅为演示。</p></section>
      <section className="field-counts"><article><strong>75</strong><span>RAW</span><p>原始采集字段</p></article><article><strong>78</strong><span>DERIVED</span><p>派生计算字段</p></article><article><strong>23</strong><span>ASSESSMENT</span><p>评估输出字段</p></article><article className="total"><strong>176</strong><span>TOTAL</span><p>数据契约字段总数</p></article></section>
      <section className="rule-evidence"><article><span>5 个模块</span>{modules.map(([name,,weight]) => <p key={name}><b>{name}</b><small>{weight}%</small></p>)}</article><article><span>8 个风险闸门</span>{gates.map((name,index) => <p key={name}><b>{String(index + 1).padStart(2,'0')}</b><small>{name}</small></p>)}</article></section>
    </main>}
    <DemoNotice>Demo 使用真实字段分层、模块权重和风险闸门名称；示例公司和分值均为匿名演示数据，不构成正式评估结论。</DemoNotice>
  </div>;
}

export function ProjectDDemo() {
  const [query, setQuery] = useState('');
  const [plan, setPlan] = useState(false);
  const areas = [
    ['程序与快捷方式', '12', ['Manny Workspace.lnk', 'Meeting Notes.lnk', 'Project D.lnk']],
    ['文档', '26', ['产品方案.docx', '项目复盘.md', '会议纪要.txt']],
    ['图片与媒体', '8', ['dashboard.png', 'demo-recording.mp4', 'portfolio-cover.png']],
    ['代码与脚本', '14', ['build.ps1', 'agent-config.json', 'workspace.ts']],
  ];
  const visible = areas.map(area => [area[0], area[1], area[2].filter(file => file.toLowerCase().includes(query.toLowerCase()))]).filter(area => !query || area[2].length);
  return <div className="product-demo desktop-demo">
    <header><div className="desktop-brand"><b>D</b><span>Project D<small>桌面空间 · Web 交互模型</small></span></div><span>安全回退</span><b className="standby">● 待机</b></header>
    <main><section className="desktop-space"><div className="space-title"><span>桌面内容</span><h2>{query ? `“${query}” 的结果` : '虚拟分区'}</h2></div><div className="desktop-zones">{visible.map(([name,count,files]) => <article key={name}><header><h3>{name}</h3><span>{query ? files.length : count}</span></header><div>{files.map(file => <span key={file}><i>▧</i><small>{file}</small></span>)}</div></article>)}</div></section>
      <aside className="desktop-control"><span>控制中心</span><h2>桌面状态</h2><label><Icon name="external"/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索示例桌面文件"/></label><div className="desktop-suggestion"><small>智能建议</small><h3>桌面可以整理一下</h3><p>检测到 8 个可归档示例文件，执行前会先展示行动计划。</p></div><div className="desktop-actions"><button onClick={() => setPlan(true)}>启动整理</button><button onClick={() => setPlan(false)}>安全归位</button><button>纯净桌面</button></div>{plan && <div className="desktop-plan"><span>行动计划</span><h3>整理 8 个示例文件</h3><p>目标：Project D / 收件箱归档</p><button onClick={() => setPlan(false)}>确认预览，不执行</button></div>}</aside>
    </main>
    <DemoNotice>这是 Project D 的 Web 交互模型，用于体验搜索、建议与行动计划；真实产品是 Windows 桌面应用，截图与源码见案例页。</DemoNotice>
  </div>;
}

export function DemoForProject({ slug }) {
  if (slug === 'talentflow') return <TalentFlowDemo/>;
  if (slug === 'enterprise-evaluation') return <EnterpriseDemo/>;
  if (slug === 'project-d') return <ProjectDDemo/>;
  return null;
}
