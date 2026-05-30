import { Outlet, createFileRoute } from '@tanstack/react-router';

const EditorLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/(admin)/plugin/editor')({
  component: EditorLayout,
  staticData: {
    i18nKey: 'route.plugin_editor',
    menu: {
      icon: 'mdi:file-edit-outline',
      order: 30
    },
    title: 'plugin_editor'
  }
});
