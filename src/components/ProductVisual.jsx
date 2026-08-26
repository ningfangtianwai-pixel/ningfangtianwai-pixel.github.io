function TalentVisual() {
  return (
    <div className="product-ui talent-ui" aria-hidden="true">
      <div className="ui-top"><span className="ui-brand">TF</span><span>Candidate intelligence</span><i>LIVE</i></div>
      <div className="talent-layout">
        <div className="candidate-profile"><span className="avatar">L</span><div><strong>候选人画像</strong><small>AI 产品负责人 · 8 年</small></div><b>92</b></div>
        <div className="score-labels"><span>行业匹配 <i style={{width:'92%'}}/></span><span>岗位能力 <i style={{width:'86%'}}/></span><span>成长潜力 <i style={{width:'78%'}}/></span></div>
        <div className="decision-row"><span>优势证据 <b>06</b></span><span>风险点 <b>02</b></span><span>建议动作 <b>联系</b></span></div>
      </div>
    </div>
  );
}

function EnterpriseVisual() {
  return (
    <div className="product-ui enterprise-ui" aria-hidden="true">
      <div className="ui-top"><span className="ui-brand">EI</span><span>Enterprise index</span><i>200+ SIGNALS</i></div>
      <div className="radar-wrap">
        <div className="radar"><span/><span/><span/><i/><b>78</b></div>
        <div className="dimension-list"><span><i/>经营基础 <b>81</b></span><span><i/>数字资产 <b>74</b></span><span><i/>增长能力 <b>79</b></span></div>
      </div>
      <div className="risk-bar"><span>关键风险</span><b>3 项需要优先复核</b><i/></div>
    </div>
  );
}

function DesktopVisual({ image }) {
  return (
    <div className="product-ui desktop-ui" aria-hidden="true">
      <div className="window-bar"><i/><i/><i/><span>Project D · Personal Workspace</span></div>
      <img src={image} alt="" loading="lazy" />
      <div className="memory-chip"><span>MEMORY</span><strong>上下文已连接</strong></div>
    </div>
  );
}

export default function ProductVisual({ project }) {
  if (project.slug === 'talentflow') return <TalentVisual />;
  if (project.slug === 'enterprise-evaluation') return <EnterpriseVisual />;
  return <DesktopVisual image={project.image} />;
}
