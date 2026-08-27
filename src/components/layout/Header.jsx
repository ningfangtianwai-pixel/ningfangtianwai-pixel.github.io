import { useEffect, useState } from 'react';
import { GITHUB } from '../../config';
import Icon from '../Icon';
import Logo from './Logo';

export default function Header({ compact = false }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, []);

  return <header className={`site-header ${compact ? 'compact' : ''}`}><Logo/><button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? '关闭菜单' : '打开菜单'}><Icon name={open ? 'close' : 'menu'}/></button><nav className={open ? 'open' : ''}><a href="#/?section=work">项目</a><a href="#/?section=about">关于</a><a href="#/?section=contact">联系</a><a href="#/resume">履历</a><a className="github-link" href={GITHUB} target="_blank" rel="noreferrer"><Icon name="github"/> GitHub</a></nav></header>;
}
