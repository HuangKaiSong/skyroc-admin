import { Outlet, createFileRoute } from '@tanstack/react-router';

const ChartsLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/(admin)/plugin/charts')({
  component: ChartsLayout,
  staticData: {
    i18nKey: 'route.plugin_charts',
    menu: {
      icon: 'mdi:chart-box-outline',
      order: 20
    },
    title: 'plugin_charts'
  }
});
