import Icon from '../components/Icon';
import Header from '../components/layout/Header';
import { metrics, projects } from '../data';

export default function ResumePage() {
  const flagship = projects.filter(item => item.flagship);
  return <><Header compact/><main className="resume"><section className="resume-head"><a className="back" href="#/"><Icon name="back"/> 返回作品集</a><div><span>Manny · AI Product Builder</span><div className="resume-actions"><a className="resume-download" href="/Manny-AI-Product-Resume.pdf" download><Icon name="download"/> 下载项目简历 PDF</a><button onClick={() => window.print()}>打印网页版</button></div></div><h1>把 AI 做进真实工作里。</h1><p>AI Agent · 业务自动化 · 企业智能工作流 · AI 产品落地</p></section><section className="resume-intro"><h2>简介</h2><p>2004 年生。围绕招聘、企业评估、桌面工具与个人效率场景，设计并实现 AI 工作流、Agent、规则引擎与长期记忆系统。强调业务链路、人工决策边界和真实结果。</p></section><section className="resume-results"><h2>真实结果</h2><div>{metrics.map(item => <article key={item.label}><strong>{item.value}</strong><span>{item.label}</span></article>)}</div></section><section className="resume-projects"><h2>旗舰项目</h2>{flagship.map(project => <article key={project.slug}><span>{project.number} · {project.category}</span><h3>{project.title}</h3><p>{project.summary}</p><ul>{project.evidence.slice(0,3).map(item => <li key={item.label}><b>{item.value}</b> {item.label}</li>)}</ul></article>)}</section></main></>;
}
