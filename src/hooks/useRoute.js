import { useEffect, useState } from 'react';

function readRoute() {
  return window.location.hash.slice(1).split('?')[0] || '/';
}

export default function useRoute() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const onChange = () => {
      setRoute(readRoute());
      const query = window.location.hash.split('?')[1] || '';
      const section = new URLSearchParams(query).get('section');
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'auto' });
      }));
    };

    window.addEventListener('hashchange', onChange);
    onChange();
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
