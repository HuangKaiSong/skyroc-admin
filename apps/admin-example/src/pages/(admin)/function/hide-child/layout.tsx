import { Outlet, createFileRoute } from '@tanstack/react-router';

const HideChildLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/(admin)/function/hide-child')({
  component: HideChildLayout,
  staticData: {
    i18nKey: 'route.function_hide-child',
    menu: {
      icon: 'material-symbols:filter-list-off',
      order: 2
    },
    title: 'function_hide-child'
  }
});
