import Icon from '../components/Icon';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import DemoForProject from '../demos/DemoForProject';
import NotFoundPage from './NotFoundPage';

export default function DemoPage({ project }) {
  if (!project?.flagship) return <NotFoundPage/>;
  return <><Header compact/><main className="demo-page"><div className="demo-page-head"><a className="back" href={`#/project/${project.slug}`}><Icon name="back"/> 返回 Case Study</a><span>交互 Demo · 示例数据</span><h1>{project.shortTitle}</h1><p>{project.demo.note}</p></div><DemoForProject slug={project.slug}/></main><Footer/></>;
}
