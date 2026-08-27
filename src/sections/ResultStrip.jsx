import { metrics } from '../data';

export default function ResultStrip() {
  return <section className="result-strip" aria-label="真实成果" data-reveal>{metrics.map((item, index) => <article key={item.label} style={{ '--reveal-delay': `${index * 70}ms` }}><strong>{item.value}</strong><span>{item.label}</span></article>)}</section>;
}
