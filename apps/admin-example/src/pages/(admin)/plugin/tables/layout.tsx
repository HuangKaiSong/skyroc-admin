import { Outlet, createFileRoute } from '@tanstack/react-router';

const TablesLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/(admin)/plugin/tables')({
  component: TablesLayout,
  staticData: {
    i18nKey: 'route.plugin_tables',
    menu: {
      icon: 'mdi:table-large',
      order: 110
    },
    title: 'plugin_tables'
  }
});
