import Icon from '../components/Icon';

export default function Hero() {
  return <section className="hero" id="top"><div className="hero-copy"><span className="availability"><i/>正在构建真实业务中的 AI 产品</span><h1>把 AI 做进<br/><em>真实工作</em>里。</h1><p>我是 Manny，一名 AI Product Builder。关注 AI Agent、业务自动化、企业智能工作流与产品落地。</p><div className="hero-actions"><a className="button primary" href="#/?section=reel">观看 30 秒产品 Demo <Icon name="arrow"/></a><a className="button secondary" href="#/?section=work">查看真实项目</a><a className="hero-resume" href="#/resume">项目履历</a></div></div>
    <div className="hero-work" aria-label="三个真实产品界面"><figure className="hero-shot hero-shot-main"><img src="/cases/talentflow/dashboard.png" alt="TalentFlow 真实运行界面"/><figcaption><b>TalentFlow</b><span>真实招聘工作流</span></figcaption></figure><figure className="hero-shot hero-shot-top"><img src="/cases/project-d/workspace.png" alt="Project D 真实桌面界面"/><figcaption><b>Project D</b><span>Windows 桌面 Agent</span></figcaption></figure><figure className="hero-shot hero-shot-bottom"><img src="/cases/enterprise-evaluation/overview.png" alt="企业评估交互 Demo"/><figcaption><b>Enterprise Value</b><span>真实数据契约 Demo</span></figcaption></figure></div>
  </section>;
}
