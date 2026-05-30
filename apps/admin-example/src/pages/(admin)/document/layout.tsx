import { Outlet, createFileRoute } from '@tanstack/react-router';

const DocumentLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/(admin)/document')({
  component: DocumentLayout,
  staticData: {
    i18nKey: 'route.document',
    menu: {
      icon: 'mdi:file-document-multiple-outline',
      order: 2
    },
    title: 'document'
  }
});
