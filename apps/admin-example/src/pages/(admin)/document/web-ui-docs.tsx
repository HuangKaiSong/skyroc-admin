import { createFileRoute } from '@tanstack/react-router';

import { PROJECT_DOC_URLS } from './modules/shared';

const DocumentWebUiDocs = () => {
  return null;
};

export const Route = createFileRoute('/(admin)/document/web-ui-docs')({
  component: DocumentWebUiDocs,
  staticData: {
    href: PROJECT_DOC_URLS.webUiDocs,
    i18nKey: 'route.document_web-ui-docs',
    menu: {
      icon: 'mdi:palette-swatch-outline',
      order: 3
    },
    title: 'web-ui-docs'
  }
});
