import { useState } from 'react';
import Icon from '../components/Icon';
import DemoNotice from './DemoNotice';

export default function ProjectDDemo() {
  const [query, setQuery] = useState('');
  const [plan, setPlan] = useState(false);
  const areas = [
    ['程序与快捷方式', '12', ['Manny Workspace.lnk', 'Meeting Notes.lnk', 'Project D.lnk']],
    ['文档', '26', ['产品方案.docx', '项目复盘.md', '会议纪要.txt']],
    ['图片与媒体', '8', ['dashboard.png', 'demo-recording.mp4', 'portfolio-cover.png']],
    ['代码与脚本', '14', ['build.ps1', 'agent-config.json', 'workspace.ts']],
  ];
  const visible = areas.map(area => [area[0], area[1], area[2].filter(file => file.toLowerCase().includes(query.toLowerCase()))]).filter(area => !query || area[2].length);
  return <div className="product-demo desktop-demo">
    <header><div className="desktop-brand"><b>D</b><span>Project D<small>桌面空间 · Web 交互模型</small></span></div><span>安全回退</span><b className="standby">● 待机</b></header>
    <main><section className="desktop-space"><div className="space-title"><span>桌面内容</span><h2>{query ? `“${query}” 的结果` : '虚拟分区'}</h2></div><div className="desktop-zones">{visible.map(([name,count,files]) => <article key={name}><header><h3>{name}</h3><span>{query ? files.length : count}</span></header><div>{files.map(file => <span key={file}><i>▧</i><small>{file}</small></span>)}</div></article>)}</div></section>
      <aside className="desktop-control"><span>控制中心</span><h2>桌面状态</h2><label><Icon name="external"/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索示例桌面文件"/></label><div className="desktop-suggestion"><small>智能建议</small><h3>桌面可以整理一下</h3><p>检测到 8 个可归档示例文件，执行前会先展示行动计划。</p></div><div className="desktop-actions"><button onClick={() => setPlan(true)}>启动整理</button><button onClick={() => setPlan(false)}>安全归位</button><button>纯净桌面</button></div>{plan && <div className="desktop-plan"><span>行动计划</span><h3>整理 8 个示例文件</h3><p>目标：Project D / 收件箱归档</p><button onClick={() => setPlan(false)}>确认预览，不执行</button></div>}</aside>
    </main>
    <DemoNotice>这是 Project D 的 Web 交互模型，用于体验搜索、建议与行动计划；真实产品是 Windows 桌面应用，截图与源码见案例页。</DemoNotice>
  </div>;
}
