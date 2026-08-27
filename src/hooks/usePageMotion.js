import { useEffect } from 'react';

export default function usePageMotion(route) {
  useEffect(() => {
    const root = document.documentElement;
    const items = [...document.querySelectorAll('[data-reveal]')];
    root.classList.add('motion-ready');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('is-visible'));
      document.querySelectorAll('video[autoplay]').forEach(video => video.pause());
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [route]);
}
