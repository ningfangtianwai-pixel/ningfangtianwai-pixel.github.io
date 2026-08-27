import { useState } from 'react';
import Icon from '../components/Icon';
import DemoNotice from './DemoNotice';
import { talentSteps } from './demoData';

export default function TalentFlowDemo() {
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
