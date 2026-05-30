import { Outlet, createFileRoute } from '@tanstack/react-router';

const ProjectsLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/(admin)/projects')({
  component: ProjectsLayout,
  staticData: {
    i18nKey: 'route.projects',
    menu: {
      icon: 'hugeicons:align-box-top-center',
      order: 7
    },
    title: 'projects'
  }
});
