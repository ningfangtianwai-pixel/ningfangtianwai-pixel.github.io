export default function SectionTitle({ index, title, text }) {
  return <div className="section-title" data-reveal><span>{index}</span><div><h2>{title}</h2>{text && <p>{text}</p>}</div></div>;
}
