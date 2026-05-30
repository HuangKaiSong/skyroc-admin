import { createFileRoute } from '@tanstack/react-router';

import { PROJECT_DOC_URLS } from './modules/shared';

const DocumentAdminDocs = () => {
  return null;
};

export const Route = createFileRoute('/(admin)/document/admin-docs')({
  component: DocumentAdminDocs,
  staticData: {
    href: PROJECT_DOC_URLS.adminDocs,
    i18nKey: 'route.document_admin-docs',
    menu: {
      icon: 'mdi:book-open-page-variant',
      order: 1
    },
    title: 'admin-docs'
  }
});
