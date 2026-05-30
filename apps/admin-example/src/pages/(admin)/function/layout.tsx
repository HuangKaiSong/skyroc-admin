import { Outlet, createFileRoute } from '@tanstack/react-router';

const FunctionLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/(admin)/function')({
  component: FunctionLayout,
  staticData: {
    i18nKey: 'route.function',
    menu: {
      icon: 'icon-park-outline:all-application',
      order: 6
    },
    title: 'function'
  }
});
