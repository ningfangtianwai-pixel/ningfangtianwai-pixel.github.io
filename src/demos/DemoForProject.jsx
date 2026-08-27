import EnterpriseDemo from './EnterpriseDemo';
import ProjectDDemo from './ProjectDDemo';
import TalentFlowDemo from './TalentFlowDemo';

export default function DemoForProject({ slug }) {
  if (slug === 'talentflow') return <TalentFlowDemo/>;
  if (slug === 'enterprise-evaluation') return <EnterpriseDemo/>;
  if (slug === 'project-d') return <ProjectDDemo/>;
  return null;
}
