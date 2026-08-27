import Icon from '../components/Icon';
import { GITHUB } from '../config';

export default function Contact() {
  return <section className="contact" id="contact" data-reveal><span>04 / 联系</span><h2>一起做点真正<br/>进入工作的 AI。</h2><p>欢迎交流 AI 产品、Agent、企业工作流与业务自动化。</p><div className="contact-channels"><a href="mailto:3439536203@qq.com"><small>EMAIL</small><strong>3439536203@qq.com</strong></a><a href="mailto:ningfangtianwai@gmail.com"><small>EMAIL</small><strong>ningfangtianwai@gmail.com</strong></a><span><small>QQ</small><strong>3439536203</strong></span></div><div className="contact-actions"><a className="button light" href={GITHUB} target="_blank" rel="noreferrer"><Icon name="github"/> GitHub Profile</a><a className="button line" href="#/resume">查看履历 <Icon name="arrow"/></a></div></section>;
}
