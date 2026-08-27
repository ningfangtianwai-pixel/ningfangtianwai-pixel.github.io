import { useMemo, useState } from 'react';
import DemoNotice from './DemoNotice';
import { gates, modules } from './demoData';

export default function EnterpriseDemo() {
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
