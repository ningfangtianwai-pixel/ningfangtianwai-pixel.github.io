import { useState } from 'react';
import Icon from '../components/Icon';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import NotFoundPage from './NotFoundPage';

function Evidence({ project }) {
  return <section className="case-evidence"><div className="case-label"><span>Evidence</span><h2>可核验依据</h2></div><div className="evidence-grid">{project.evidence.map(item => <article key={item.label}><strong>{item.value}</strong><h3>{item.label}</h3><p>{item.source}</p></article>)}</div></section>;
}

function ScreenshotGallery({ project }) {
  const [active, setActive] = useState(0);
  const shot = project.screenshots[active];
  return <section className="case-screenshots"><div className="case-label"><span>Screenshots</span><h2>真实界面与产品证据</h2></div><figure className="gallery-main"><img src={shot.src} alt={shot.alt}/><figcaption>{shot.caption}</figcaption></figure><div className="gallery-thumbs">{project.screenshots.map((item,index) => <button key={item.src} className={index === active ? 'active' : ''} onClick={() => setActive(index)}><img src={item.src} alt=""/><span>{String(index + 1).padStart(2,'0')}</span></button>)}</div></section>;
}

export default function CaseDetailPage({ project }) {
  if (!project) return <NotFoundPage/>;
  if (!project.flagship) return <><Header compact/><main className="simple-case"><a className="back" href="#/"><Icon name="back"/> 返回作品集</a><span>{project.category}</span><h1>{project.title}</h1><p>{project.statement}</p><article><h2>当前状态</h2><p>{project.summary}</p><p>该项目当前作为产品方向展示。页面不会虚构客户、数据、公开 Demo 或尚未验证的能力。</p></article></main><Footer/></>;
  return <><Header compact/><main className="case-page"><section className="case-hero"><a className="back" href="#/"><Icon name="back"/> 返回作品集</a><div className="case-meta"><span>{project.number}</span><i/>{project.category}</div><h1>{project.title}</h1><p>{project.statement}</p><div className="case-links"><a className="button primary" href={project.demo.href}>{project.demo.label} <Icon name="arrow"/></a>{project.repo && <a className="button secondary" href={project.repo} target="_blank" rel="noreferrer"><Icon name="github"/> {project.repoLabel || '公开源码'}</a>}</div><figure><img src={project.screenshots[0].src} alt={project.screenshots[0].alt}/></figure></section>
    <section className="case-role"><div className="case-label"><span>Role</span><h2>我负责什么</h2></div><div>{project.role.map(item => <span key={item}><i/> {item}</span>)}</div><p>{project.summary}</p></section>
    <Evidence project={project}/>
    <section className="case-story"><article><span>问题</span><h2>为什么要做</h2><p>{project.challenge}</p></article><article><span>方案</span><h2>如何进入流程</h2><p>{project.solution}</p></article><article><span>结果</span><h2>验证了什么</h2><p>{project.outcome}</p></article></section>
    <section className="case-decisions"><div className="case-label"><span>Decisions</span><h2>关键产品判断</h2></div><ol>{project.decisions.map((item,index) => <li key={item}><span>{String(index + 1).padStart(2,'0')}</span><p>{item}</p></li>)}</ol></section>
    <ScreenshotGallery project={project}/>
    <section className="demo-cta"><div><span>Interactive Demo</span><h2>不只看截图，直接体验产品逻辑。</h2><p>{project.demo.note}</p></div><a className="button light" href={project.demo.href}>{project.demo.label} <Icon name="arrow"/></a></section>
  </main><Footer/></>;
}
