import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/projects/$pid/edit/')({
  beforeLoad: ({ params }) => {
    throw redirect({ params: { id: 'release-plan', pid: params.pid }, to: '/projects/$pid/edit/$id' });
  },
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
