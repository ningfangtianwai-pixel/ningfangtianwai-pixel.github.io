import SectionTitle from '../components/ui/SectionTitle';

export default function About() {
  return <section className="about" id="about"><SectionTitle index="03" title="关于 Manny"/><div className="about-grid" data-reveal><h2>在 AI 与真实工作<br/>之间搭一座桥。</h2><div><p className="lead">我是一名 <strong>AI Product Builder</strong>，关注 AI Agent、业务自动化、企业智能工作流和长期记忆系统。</p><p>我的项目来自招聘、企业评估、内容运营、桌面工具与个人效率场景。我习惯先理解重复劳动、信息断点和决策边界，再决定使用模型、规则、工具调用还是人工确认。</p><p>目标不是制造一个更会聊天的界面，而是做出可以进入流程、被使用、被复查并产生真实结果的产品。</p></div></div></section>;
}
