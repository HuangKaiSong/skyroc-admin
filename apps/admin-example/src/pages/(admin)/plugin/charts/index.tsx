import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/plugin/charts/')({
  beforeLoad: () => {
    throw redirect({ to: '/plugin/charts/echarts' });
  }
});
