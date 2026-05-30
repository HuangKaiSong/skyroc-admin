import { Outlet, createFileRoute } from '@tanstack/react-router';

const GanttLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/(admin)/plugin/gantt')({
  component: GanttLayout,
  staticData: {
    i18nKey: 'route.plugin_gantt',
    menu: {
      icon: 'mdi:timeline-clock-outline',
      order: 120
    },
    title: 'plugin_gantt'
  }
});
