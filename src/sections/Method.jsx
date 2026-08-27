import SectionTitle from '../components/ui/SectionTitle';
import { capabilities } from '../data';

export default function Method() {
  return <section className="method"><SectionTitle index="02" title="从业务问题到可验证结果。" text="模型只是系统的一层。产品还需要数据边界、人工确认、工具执行和结果反馈。"/><div className="method-grid" data-reveal>{capabilities.map((item, index) => <article key={item.index} style={{ '--reveal-delay': `${index * 60}ms` }}><span>{item.index}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>;
}
