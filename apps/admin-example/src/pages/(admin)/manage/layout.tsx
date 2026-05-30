import { Outlet, createFileRoute } from '@tanstack/react-router';

const ManageLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/(admin)/manage')({
  component: ManageLayout,
  staticData: {
    i18nKey: 'route.manage',
    menu: {
      icon: 'material-symbols:manage-accounts-outline',
      order: 10,
      type: 'group'
    },
    permissions: ['R_ADMIN'],
    title: 'system-manage'
  }
});
