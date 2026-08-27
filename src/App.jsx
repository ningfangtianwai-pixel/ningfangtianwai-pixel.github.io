import { useMemo } from 'react';
import { projects } from './data';
import usePageMotion from './hooks/usePageMotion';
import useRoute from './hooks/useRoute';
import CaseDetailPage from './pages/CaseDetailPage';
import DemoPage from './pages/DemoPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ResumePage from './pages/ResumePage';

export default function App() {
  const route = useRoute();
  usePageMotion(route);
  const caseProject = useMemo(() => route.startsWith('/project/') ? projects.find(item => item.slug === route.split('/')[2]) : null, [route]);
  const demoProject = useMemo(() => route.startsWith('/demo/') ? projects.find(item => item.slug === route.split('/')[2]) : null, [route]);
  if (route === '/resume') return <ResumePage/>;
  if (route.startsWith('/project/')) return <CaseDetailPage project={caseProject}/>;
  if (route.startsWith('/demo/')) return <DemoPage project={demoProject}/>;
  if (route !== '/') return <NotFoundPage/>;
  return <HomePage/>;
}
