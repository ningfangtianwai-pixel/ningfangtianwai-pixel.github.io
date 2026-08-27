import { GITHUB } from '../../config';
import Logo from './Logo';

export default function Footer() {
  return <footer><Logo/><p>Build for real work. Verify with evidence.</p><div><a href="#/?section=top">返回顶部</a><a href={GITHUB} target="_blank" rel="noreferrer">GitHub ↗</a></div></footer>;
}
