import Icon from '../components/Icon';
import SectionTitle from '../components/ui/SectionTitle';
import { projects } from '../data';

function FlagshipCard({ project, index }) {
  return <article className="project-card" data-reveal style={{ '--reveal-delay': `${index * 80}ms` }}><a className="project-image" href={`#/project/${project.slug}`}><img src={project.screenshots[0].src} alt={project.screenshots[0].alt}/><span>查看案例 <Icon name="arrow"/></span></a><div className="project-copy"><div className="project-kicker"><span>{project.number}</span><i/>{project.category}</div><h3>{project.title}</h3><p className="project-statement">{project.statement}</p><p>{project.summary}</p><div className="proof-row">{project.evidence.slice(0,3).map(item => <span key={item.label}><b>{item.value}</b>{item.label}</span>)}</div><div className="project-actions"><a href={`#/project/${project.slug}`}>完整 Case Study <Icon name="arrow"/></a><a href={project.demo.href}>交互 Demo</a></div></div></article>;
}

export default function Work() {
  const flagship = projects.filter(item => item.flagship);
  const more = projects.filter(item => !item.flagship);
  return <section className="work" id="work"><SectionTitle index="01" title="用作品证明，而不是用标签描述。" text="三个旗舰项目都提供真实界面、我的角色、可核验依据和交互 Demo。"/><div className="project-list">{flagship.map((project, index) => <FlagshipCard key={project.slug} project={project} index={index}/>)}</div><div className="more-projects" data-reveal><h3>其他产品探索</h3><div>{more.map(project => <a key={project.slug} href={`#/project/${project.slug}`}><span>{project.number}</span><div><small>{project.category}</small><h4>{project.title}</h4><p>{project.summary}</p></div><Icon name="arrow"/></a>)}</div></div></section>;
}
