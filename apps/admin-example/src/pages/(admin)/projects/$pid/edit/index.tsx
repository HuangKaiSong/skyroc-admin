import { createFileRoute } from '@tanstack/react-router';

const ProjectEdit = () => {
  return null;
};

export const Route = createFileRoute('/(admin)/projects/$pid/edit/')({
  component: ProjectEdit,
  staticData: {
    i18nKey: 'route.projects_$pid_edit',
    menu: {
      activeMenu: '/projects',
      hide: true,
      icon: 'material-symbols-light:assistant-on-hub-outline'
    },
    title: 'projects_$pid_edit'
  }
});
