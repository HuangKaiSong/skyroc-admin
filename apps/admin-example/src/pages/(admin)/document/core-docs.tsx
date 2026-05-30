import { createFileRoute } from '@tanstack/react-router';

import { PROJECT_DOC_URLS } from './modules/shared';

const DocumentCoreDocs = () => {
  return null;
};

export const Route = createFileRoute('/(admin)/document/core-docs')({
  component: DocumentCoreDocs,
  staticData: {
    href: PROJECT_DOC_URLS.coreDocs,
    i18nKey: 'route.document_core-docs',
    menu: {
      icon: 'carbon:assembly',
      order: 4
    },
    title: 'core-docs'
  }
});
