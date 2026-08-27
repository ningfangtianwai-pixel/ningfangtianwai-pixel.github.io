import { useEffect, useMemo, useState } from 'react';
import { capabilities, metrics, projects } from './data';
import Icon from './components/Icon';
import { DemoForProject } from './components/Demos';

const GITHUB = 'https://github.com/ningfangtianwai-pixel';

function readRoute() {
  return window.location.hash.slice(1).split('?')[0] || '/';
}

function useRoute() {
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const onChange = () => {
      setRoute(readRoute());
      const query = window.location.hash.split('?')[1] || '';
      const section = new URLSearchParams(query).get('section');
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'auto' });
      }));
    };
    window.addEventListener('hashchange', onChange);
    onChange();
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

function usePageMotion(route) {
  useEffect(() => {
    const root = document.documentElement;
    const items = [...document.querySelectorAll('[data-reveal]')];
    root.classList.add('motion-ready');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('is-visible'));
      document.querySelectorAll('video[autoplay]').forEach(video => video.pause());
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [route]);
}

function Logo() {
  return <a className="brand" href="#/" aria-label="Manny 作品集首页"><b>M</b><span>Manny<small>AI Product Builder</small></span></a>;
}

function Header({ compact = false }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, []);
  return <header className={`site-header ${compact ? 'compact' : ''}`}><Logo/><button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? '关闭菜单' : '打开菜单'}><Icon name={open ? 'close' : 'menu'}/></button><nav className={open ? 'open' : ''}><a href="#/?section=work">项目</a><a href="#/?section=about">关于</a><a href="#/?section=contact">联系</a><a href="#/resume">履历</a><a className="github-link" href={GITHUB} target="_blank" rel="noreferrer"><Icon name="github"/> GitHub</a></nav></header>;
}

function SectionTitle({ index, title, text }) {
  return <div className="section-title" data-reveal><span>{index}</span><div><h2>{title}</h2>{text && <p>{text}</p>}</div></div>;
}

function Hero() {
  return <section className="hero" id="top"><div className="hero-copy"><span className="availability"><i/>正在构建真实业务中的 AI 产品</span><h1>把 AI 做进<br/><em>真实工作</em>里。</h1><p>我是 Manny，一名 AI Product Builder。关注 AI Agent、业务自动化、企业智能工作流与产品落地。</p><div className="hero-actions"><a className="button primary" href="#/?section=reel">观看 30 秒产品 Demo <Icon name="arrow"/></a><a className="button secondary" href="#/?section=work">查看真实项目</a><a className="hero-resume" href="#/resume">项目履历</a></div></div>
    <div className="hero-work" aria-label="三个真实产品界面"><figure className="hero-shot hero-shot-main"><img src="/cases/talentflow/dashboard.png" alt="TalentFlow 真实运行界面"/><figcaption><b>TalentFlow</b><span>真实招聘工作流</span></figcaption></figure><figure className="hero-shot hero-shot-top"><img src="/cases/project-d/workspace.png" alt="Project D 真实桌面界面"/><figcaption><b>Project D</b><span>Windows 桌面 Agent</span></figcaption></figure><figure className="hero-shot hero-shot-bottom"><img src="/cases/enterprise-evaluation/overview.png" alt="企业评估交互 Demo"/><figcaption><b>Enterprise Value</b><span>真实数据契约 Demo</span></figcaption></figure></div>
  </section>;
}

function ResultStrip() {
  return <section className="result-strip" aria-label="真实成果" data-reveal>{metrics.map((item, index) => <article key={item.label} style={{ '--reveal-delay': `${index * 70}ms` }}><strong>{item.value}</strong><span>{item.label}</span></article>)}</section>;
}

function ProductReel() {
  return <section className="product-reel" id="reel" data-reveal><div className="reel-head"><div><span>00 / 产品 Demo</span><h2>30 秒，看见产品如何进入真实工作。</h2><p>一条完整叙事串联 TalentFlow、企业数字资产评估与 Project D。画面全部来自真实界面或公开交互 Demo。</p></div><div className="reel-facts"><span><b>30s</b>完整产品视频</span><span><b>3</b>旗舰案例</span><span><b>0</b>虚构业务数据</span></div></div><figure className="reel-player"><video autoPlay muted loop playsInline controls preload="metadata" poster="/media/Manny-Product-Proof-Reel-poster.png" aria-label="Manny 三个旗舰 AI 产品的 30 秒产品视频"><source src="/media/Manny-Product-Proof-Reel.mp4" type="video/mp4"/></video><figcaption><span>真实界面 · 可核验证据 · 统一 Manny 品牌</span><div><a href="/media/Manny-Product-Proof-Reel.mp4" download>下载 MP4</a><a href="/media/Manny-Product-Proof-Reel.gif" target="_blank" rel="noreferrer">查看 GIF</a></div></figcaption></figure></section>;
}

function FlagshipCard({ project, index }) {
  return <article className="project-card" data-reveal style={{ '--reveal-delay': `${index * 80}ms` }}><a className="project-image" href={`#/project/${project.slug}`}><img src={project.screenshots[0].src} alt={project.screenshots[0].alt}/><span>查看案例 <Icon name="arrow"/></span></a><div className="project-copy"><div className="project-kicker"><span>{project.number}</span><i/>{project.category}</div><h3>{project.title}</h3><p className="project-statement">{project.statement}</p><p>{project.summary}</p><div className="proof-row">{project.evidence.slice(0,3).map(item => <span key={item.label}><b>{item.value}</b>{item.label}</span>)}</div><div className="project-actions"><a href={`#/project/${project.slug}`}>完整 Case Study <Icon name="arrow"/></a><a href={project.demo.href}>交互 Demo</a></div></div></article>;
}

function Work() {
  const flagship = projects.filter(item => item.flagship);
  const more = projects.filter(item => !item.flagship);
  return <section className="work" id="work"><SectionTitle index="01" title="用作品证明，而不是用标签描述。" text="三个旗舰项目都提供真实界面、我的角色、可核验依据和交互 Demo。"/><div className="project-list">{flagship.map((project, index) => <FlagshipCard key={project.slug} project={project} index={index}/>)}</div><div className="more-projects" data-reveal><h3>其他产品探索</h3><div>{more.map(project => <a key={project.slug} href={`#/project/${project.slug}`}><span>{project.number}</span><div><small>{project.category}</small><h4>{project.title}</h4><p>{project.summary}</p></div><Icon name="arrow"/></a>)}</div></div></section>;
}

function Method() {
  return <section className="method"><SectionTitle index="02" title="从业务问题到可验证结果。" text="模型只是系统的一层。产品还需要数据边界、人工确认、工具执行和结果反馈。"/><div className="method-grid" data-reveal>{capabilities.map((item, index) => <article key={item.index} style={{ '--reveal-delay': `${index * 60}ms` }}><span>{item.index}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>;
}

function About() {
  return <section className="about" id="about"><SectionTitle index="03" title="关于 Manny"/><div className="about-grid" data-reveal><h2>在 AI 与真实工作<br/>之间搭一座桥。</h2><div><p className="lead">我是一名 <strong>AI Product Builder</strong>，关注 AI Agent、业务自动化、企业智能工作流和长期记忆系统。</p><p>我的项目来自招聘、企业评估、内容运营、桌面工具与个人效率场景。我习惯先理解重复劳动、信息断点和决策边界，再决定使用模型、规则、工具调用还是人工确认。</p><p>目标不是制造一个更会聊天的界面，而是做出可以进入流程、被使用、被复查并产生真实结果的产品。</p></div></div></section>;
}

function Contact() {
  return <section className="contact" id="contact" data-reveal><span>04 / 联系</span><h2>一起做点真正<br/>进入工作的 AI。</h2><p>欢迎交流 AI 产品、Agent、企业工作流与业务自动化。</p><div className="contact-channels"><a href="mailto:3439536203@qq.com"><small>EMAIL</small><strong>3439536203@qq.com</strong></a><a href="mailto:ningfangtianwai@gmail.com"><small>EMAIL</small><strong>ningfangtianwai@gmail.com</strong></a><span><small>QQ</small><strong>3439536203</strong></span></div><div className="contact-actions"><a className="button light" href={GITHUB} target="_blank" rel="noreferrer"><Icon name="github"/> GitHub Profile</a><a className="button line" href="#/resume">查看履历 <Icon name="arrow"/></a></div></section>;
}

function Footer() {
  return <footer><Logo/><p>Build for real work. Verify with evidence.</p><div><a href="#/?section=top">返回顶部</a><a href={GITHUB} target="_blank" rel="noreferrer">GitHub ↗</a></div></footer>;
}

function Home() {
  return <><Header/><main><Hero/><ResultStrip/><ProductReel/><Work/><Method/><About/><Contact/></main><Footer/></>;
}

function Evidence({ project }) {
  return <section className="case-evidence"><div className="case-label"><span>Evidence</span><h2>可核验依据</h2></div><div className="evidence-grid">{project.evidence.map(item => <article key={item.label}><strong>{item.value}</strong><h3>{item.label}</h3><p>{item.source}</p></article>)}</div></section>;
}

function ScreenshotGallery({ project }) {
  const [active, setActive] = useState(0);
  const shot = project.screenshots[active];
  return <section className="case-screenshots"><div className="case-label"><span>Screenshots</span><h2>真实界面与产品证据</h2></div><figure className="gallery-main"><img src={shot.src} alt={shot.alt}/><figcaption>{shot.caption}</figcaption></figure><div className="gallery-thumbs">{project.screenshots.map((item,index) => <button key={item.src} className={index === active ? 'active' : ''} onClick={() => setActive(index)}><img src={item.src} alt=""/><span>{String(index + 1).padStart(2,'0')}</span></button>)}</div></section>;
}

function CaseDetail({ project }) {
  if (!project) return <NotFound/>;
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

function DemoPage({ project }) {
  if (!project?.flagship) return <NotFound/>;
  return <><Header compact/><main className="demo-page"><div className="demo-page-head"><a className="back" href={`#/project/${project.slug}`}><Icon name="back"/> 返回 Case Study</a><span>交互 Demo · 示例数据</span><h1>{project.shortTitle}</h1><p>{project.demo.note}</p></div><DemoForProject slug={project.slug}/></main><Footer/></>;
}

function Resume() {
  const flagship = projects.filter(item => item.flagship);
  return <><Header compact/><main className="resume"><section className="resume-head"><a className="back" href="#/"><Icon name="back"/> 返回作品集</a><div><span>Manny · AI Product Builder</span><div className="resume-actions"><a className="resume-download" href="/Manny-AI-Product-Resume.pdf" download><Icon name="download"/> 下载项目简历 PDF</a><button onClick={() => window.print()}>打印网页版</button></div></div><h1>把 AI 做进真实工作里。</h1><p>AI Agent · 业务自动化 · 企业智能工作流 · AI 产品落地</p></section><section className="resume-intro"><h2>简介</h2><p>2004 年生。围绕招聘、企业评估、桌面工具与个人效率场景，设计并实现 AI 工作流、Agent、规则引擎与长期记忆系统。强调业务链路、人工决策边界和真实结果。</p></section><section className="resume-results"><h2>真实结果</h2><div>{metrics.map(item => <article key={item.label}><strong>{item.value}</strong><span>{item.label}</span></article>)}</div></section><section className="resume-projects"><h2>旗舰项目</h2>{flagship.map(project => <article key={project.slug}><span>{project.number} · {project.category}</span><h3>{project.title}</h3><p>{project.summary}</p><ul>{project.evidence.slice(0,3).map(item => <li key={item.label}><b>{item.value}</b> {item.label}</li>)}</ul></article>)}</section></main></>;
}

function NotFound() {
  return <><Header compact/><main className="not-found"><span>404</span><h1>这里还没有产品。</h1><a className="button primary" href="#/">返回作品集</a></main></>;
}

export default function App() {
  const route = useRoute();
  usePageMotion(route);
  const caseProject = useMemo(() => route.startsWith('/project/') ? projects.find(item => item.slug === route.split('/')[2]) : null, [route]);
  const demoProject = useMemo(() => route.startsWith('/demo/') ? projects.find(item => item.slug === route.split('/')[2]) : null, [route]);
  if (route === '/resume') return <Resume/>;
  if (route.startsWith('/project/')) return <CaseDetail project={caseProject}/>;
  if (route.startsWith('/demo/')) return <DemoPage project={demoProject}/>;
  if (route !== '/') return <NotFound/>;
  return <Home/>;
}
