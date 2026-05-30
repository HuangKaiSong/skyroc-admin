import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/plugin/gantt/')({
  beforeLoad: () => {
    throw redirect({ to: '/plugin/gantt/dhtmlx' });
  }
});
