import { Outlet, createFileRoute } from '@tanstack/react-router';

const InteractionLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/(admin)/interaction')({
  component: InteractionLayout,
  staticData: {
    i18nKey: 'route.interaction',
    menu: {
      icon: 'material-symbols:widgets-outline',
      order: 9,
      type: 'group'
    },
    permissions: ['R_ADMIN'],
    title: 'interaction'
  }
});
