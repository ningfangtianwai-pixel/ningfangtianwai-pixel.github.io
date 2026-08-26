import { useEffect, useMemo, useState } from 'react';
import { capabilities, metrics, projects } from './data';
import Icon from './components/Icon';
import ProductVisual from './components/ProductVisual';

const GITHUB = 'https://github.com/ningfangtianwai-pixel';

function useRoute() {
  const read = () => (window.location.hash.slice(1).split('?')[0] || '/');
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const moveToRequestedSection = () => {
      const query = window.location.hash.split('?')[1] || '';
      const section = new URLSearchParams(query).get('section');
      if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'auto' });
    };
    const onChange = () => {
      setRoute(read());
      window.requestAnimationFrame(() => window.requestAnimationFrame(moveToRequestedSection));
    };
    window.addEventListener('hashchange', onChange);
    onChange();
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

function Logo() {
  return <a className="logo" href="#/" aria-label="返回首页"><span className="logo-mark"><i/><i/><i/></span><span><strong>NING</strong><small>AI PRODUCT BUILDER</small></span></a>;
}

function Header({ compact = false }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, []);
  return (
    <header className={`site-header ${compact ? 'compact' : ''}`}>
      <Logo />
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? '关闭菜单' : '打开菜单'} aria-expanded={open}><Icon name={open ? 'close' : 'menu'} /></button>
      <nav className={open ? 'open' : ''} aria-label="主导航">
        <a href="#/?section=work">项目</a><a href="#/?section=about">关于</a><a href="#/?section=contact">联系</a><a href="#/resume">项目履历</a>
        <a className="nav-github" href={GITHUB} target="_blank" rel="noreferrer"><Icon name="github" /> GitHub</a>
      </nav>
    </header>
  );
}

function SectionLabel({ index, children }) {
  return <div className="section-label"><span>{index}</span><i/><strong>{children}</strong></div>;
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true"><span/><span/><span/><span/></div>
      <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
      <div className="hero-content">
        <div className="hero-status"><i/> AVAILABLE FOR AI PRODUCT CONVERSATIONS</div>
        <h1><span>AI Product</span><br/><em>Builder.</em></h1>
        <p className="hero-lead">将 AI 从对话工具，<br className="mobile-break"/>转化为可以进入<span>真实业务流程</span>的产品。</p>
        <p className="hero-support">聚焦 AI Agent、业务自动化、企业智能工作流与 AI 产品落地。以真实问题为起点，以可验证结果作为终点。</p>
        <div className="hero-actions"><a className="button primary" href="#/?section=work">查看项目 <Icon name="arrow" /></a><a className="button secondary" href="#/resume">项目履历</a></div>
      </div>
      <div className="hero-console" aria-hidden="true">
        <div className="console-head"><span>PRODUCT SYSTEM / 001</span><i>● ONLINE</i></div>
        <div className="console-core"><span className="core-ring ring-a"/><span className="core-ring ring-b"/><span className="core-node">AI</span><span className="node-label label-a">CONTEXT</span><span className="node-label label-b">TOOLS</span><span className="node-label label-c">DECISION</span><span className="node-label label-d">OUTCOME</span></div>
        <div className="console-foot"><span>INPUT</span><i/><span>REASON</span><i/><span>ACT</span><i/><span>VERIFY</span></div>
      </div>
      <div className="scroll-note"><span>SCROLL TO EXPLORE</span><i/></div>
    </section>
  );
}

function Metrics() {
  return <section className="metrics" aria-label="真实项目成果">{metrics.map((metric, index) => <article key={metric.label}><span>0{index + 1}</span><strong>{metric.value}</strong><p>{metric.label}</p><small>{metric.note}</small></article>)}</section>;
}

function FlagshipProject({ project, index }) {
  return (
    <article className={`flagship-card accent-${project.accent}`}>
      <div className="flagship-copy">
        <div className="project-meta"><span>{project.number}</span><i/><small>{project.category}</small></div>
        <h3>{project.title}</h3><p className="project-statement">{project.statement}</p><p className="project-summary">{project.summary}</p>
        <div className="project-mini-metrics">{project.metrics.map(metric => <span key={metric.label}><strong>{metric.value}</strong><small>{metric.label}</small></span>)}</div>
        <div className="tag-row">{project.tags.slice(0,3).map(tag => <span key={tag}>{tag}</span>)}</div>
        <a className="project-link" href={`#/project/${project.slug}`}>查看项目详情 <Icon name="arrow" /></a>
      </div>
      <div className="flagship-visual"><ProductVisual project={project}/><span className="visual-index">0{index + 1}</span></div>
    </article>
  );
}

function Work() {
  const flagship = projects.filter(project => project.flagship);
  const others = projects.filter(project => !project.flagship);
  return (
    <section className="work-section" id="work">
      <div className="section-intro"><SectionLabel index="02">SELECTED WORK</SectionLabel><div><h2>不是展示“会什么”，<br/>而是证明<span>做成了什么。</span></h2><p>每个项目都从具体业务问题出发，沿着信息、判断、执行与结果构建完整产品链路。</p></div></div>
      <div className="flagship-list">{flagship.map((project,index) => <FlagshipProject key={project.slug} project={project} index={index}/>)}</div>
      <div className="more-work-heading"><span>MORE EXPLORATIONS</span><i/><small>持续构建中的 AI 产品方向</small></div>
      <div className="more-work-grid">{others.map(project => <article key={project.slug} className={`small-project accent-${project.accent}`}><span className="small-number">{project.number}</span><small>{project.category}</small><h3>{project.title}</h3><p>{project.summary}</p><div className="tag-row">{project.tags.slice(0,2).map(tag => <span key={tag}>{tag}</span>)}</div><a href={`#/project/${project.slug}`} aria-label={`查看 ${project.title}`}>探索项目 <Icon name="arrow" /></a></article>)}</div>
    </section>
  );
}

function ProductMethod() {
  return (
    <section className="method-section">
      <SectionLabel index="03">HOW I BUILD</SectionLabel>
      <div className="method-heading"><h2>从业务问题到<br/><span>可验证的产品结果</span></h2><p>模型只是系统中的一层。真正进入业务，还需要结构化上下文、工具边界、人工决策点和结果反馈。</p></div>
      <div className="capability-grid">{capabilities.map((item,index) => <article key={item.title}><span>{item.index}</span><div className="capability-line"><i/><b>{index === capabilities.length-1 ? '' : '→'}</b></div><small>{item.title}</small><h3>{item.zh}</h3><p>{item.text}</p></article>)}</div>
      <div className="system-statement"><span>BUSINESS PROBLEM</span><i/><span>STRUCTURED CONTEXT</span><i/><span>AI REASONING</span><i/><span>TOOL EXECUTION</span><i/><span>HUMAN DECISION</span><i/><span>OUTCOME</span></div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section" id="about">
      <SectionLabel index="04">ABOUT</SectionLabel>
      <div className="about-grid"><div className="about-title"><span className="about-monogram">N</span><h2>在 AI 与真实工作<br/>之间搭一座桥。</h2></div><div className="about-copy"><p className="large">我是一名 <strong>AI Product Builder</strong>，关注 AI Agent、业务自动化、企业智能工作流和长期记忆系统。</p><p>我的项目来自招聘、企业评估、内容运营、桌面工具和个人效率等具体场景。我习惯先理解业务中的重复劳动、信息断点和决策边界，再决定应该使用模型、规则、工具调用还是人工确认。</p><p>我希望做的不是更像聊天机器人的产品，而是能被使用、被复查、产生真实结果的 AI 工作系统。</p><div className="focus-list"><span><i/>Product framing</span><span><i/>LLM workflow</span><span><i/>Agent & tools</span><span><i/>Business verification</span></div></div></div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <span className="contact-index">05 / CONTACT</span><h2>Let&apos;s build AI<br/><em>for real work.</em></h2><p>欢迎交流 AI 产品、Agent、企业工作流与业务自动化。</p>
      <div className="contact-actions"><a className="button light" href={GITHUB} target="_blank" rel="noreferrer"><Icon name="github"/> GitHub Profile <Icon name="external"/></a><a className="button line" href="#/resume">查看项目履历 <Icon name="arrow"/></a></div>
      <div className="contact-orbit" aria-hidden="true"><i/><i/><i/><span>BUILD</span></div>
    </section>
  );
}

function Footer() {
  return <footer><Logo/><p>AI Product Builder · Build, test and verify.</p><div><a href="#/?section=top">返回顶部 ↑</a><a href={GITHUB} target="_blank" rel="noreferrer">GitHub ↗</a></div></footer>;
}

function Home() {
  useEffect(() => {
    const move = event => { document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`); document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`); };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return <><div className="cursor-glow" aria-hidden="true"/><Header/><main><Hero/><Metrics/><Work/><ProductMethod/><About/><Contact/></main><Footer/></>;
}

function ProjectDetail({ project }) {
  if (!project) return <NotFound/>;
  return (
    <><Header compact/><main className={`detail-page accent-${project.accent}`}>
      <section className="detail-hero"><a className="back-link" href="#/"><Icon name="back"/> 返回作品集</a><div className="detail-meta"><span>{project.number}</span><i/><small>{project.category}</small></div><h1>{project.title}</h1><p>{project.statement}</p>{project.repo && <a className="detail-repo" href={project.repo} target="_blank" rel="noreferrer"><Icon name="github"/> 查看公开仓库 <Icon name="external"/></a>}</section>
      {project.flagship ? <>
        <section className="detail-visual"><ProductVisual project={project}/></section>
        <section className="detail-metrics">{project.metrics.map(metric => <article key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></article>)}</section>
        <section className="case-grid"><article><span>01 / CHALLENGE</span><h2>业务问题</h2><p>{project.challenge}</p></article><article><span>02 / SOLUTION</span><h2>产品方案</h2><p>{project.solution}</p></article><article><span>03 / OUTCOME</span><h2>验证结果</h2><p>{project.outcome}</p></article></section>
        <section className="detail-flow"><SectionLabel index="04">PRODUCT FLOW</SectionLabel><h2>完整产品链路</h2><div>{project.flow.map((step,index) => <span key={step}><i>{String(index+1).padStart(2,'0')}</i><strong>{step}</strong>{index < project.flow.length-1 && <b>→</b>}</span>)}</div></section>
      </> : <section className="compact-case"><div><span>PROJECT DIRECTION</span><h2>{project.summary}</h2></div><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p>该项目当前作为产品方向与工作流原型展示；主页仅呈现已经完成和可以确认的能力，不虚构客户、数据或公开 Demo。</p></section>}
      <section className="next-project"><span>NEXT</span>{(() => { const next = projects[(projects.indexOf(project)+1)%projects.length]; return <a href={`#/project/${next.slug}`}><small>下一个项目</small><strong>{next.title}</strong><Icon name="arrow"/></a>; })()}</section>
    </main><Footer/></>
  );
}

function Resume() {
  const flagship = projects.filter(project => project.flagship);
  return (
    <><Header compact/><main className="resume-page"><section className="resume-head"><a className="back-link" href="#/"><Icon name="back"/> 返回作品集</a><div><span>PROJECT RESUME / 2026</span><button onClick={() => window.print()}><Icon name="download"/> 打印 / 保存 PDF</button></div><h1>AI Product Builder</h1><p>AI Agent · 业务自动化 · 企业智能工作流 · AI 产品落地</p><blockquote>将 AI 从对话工具，转化为可以进入真实业务流程的产品。</blockquote></section>
      <section className="resume-summary"><article><span>PROFILE</span><p>围绕招聘、企业评估、内容运营、桌面工具和个人效率场景，设计并实现 AI 工作流、Agent、规则引擎与长期记忆系统。强调业务链路、人工决策边界与真实结果验证。</p></article><article><span>CONTACT</span><p><a href={GITHUB} target="_blank" rel="noreferrer">github.com/ningfangtianwai-pixel</a><br/><a href="https://ningfangtianwai-pixel.github.io">ningfangtianwai-pixel.github.io</a></p></article></section>
      <section className="resume-results"><span>SELECTED RESULTS</span><div>{metrics.map(metric => <article key={metric.label}><strong>{metric.value}</strong><p>{metric.label}</p></article>)}</div></section>
      <section className="resume-projects"><span>FLAGSHIP PROJECTS</span>{flagship.map(project => <article key={project.slug}><div><small>{project.number} / {project.category}</small><h2>{project.title}</h2></div><p>{project.summary}</p><ul><li>{project.solution}</li><li>{project.outcome}</li></ul><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</section>
      <section className="resume-other"><span>OTHER PRODUCT WORK</span>{projects.filter(project => !project.flagship).map(project => <article key={project.slug}><h3>{project.title}</h3><p>{project.summary}</p></article>)}</section>
      <section className="resume-capabilities"><span>CAPABILITY MAP</span><p>AI Product Design · LLM Workflow · AI Agent · Prompt Engineering · Tool Calling / MCP · Information Extraction · Rule Engine · Business Automation · Context & Memory</p></section>
    </main></>
  );
}

function NotFound() { return <><Header compact/><main className="not-found"><span>404</span><h1>这里还没有产品。</h1><a className="button primary" href="#/">返回作品集</a></main></>; }

export default function App() {
  const route = useRoute();
  const project = useMemo(() => route.startsWith('/project/') ? projects.find(item => item.slug === route.split('/')[2]) : null, [route]);
  if (route === '/resume') return <Resume/>;
  if (route.startsWith('/project/')) return <ProjectDetail project={project}/>;
  if (route !== '/') return <NotFound/>;
  return <Home/>;
}
