import { createFileRoute } from '@tanstack/react-router';

import { PROJECT_DOC_URLS } from './modules/shared';

const DocumentWebKitDocs = () => {
  return null;
};

export const Route = createFileRoute('/(admin)/document/web-kit-docs')({
  component: DocumentWebKitDocs,
  staticData: {
    href: PROJECT_DOC_URLS.webKitDocs,
    i18nKey: 'route.document_web-kit-docs',
    menu: {
      icon: 'carbon:tool-kit',
      order: 2
    },
    title: 'web-kit-docs'
  }
});
