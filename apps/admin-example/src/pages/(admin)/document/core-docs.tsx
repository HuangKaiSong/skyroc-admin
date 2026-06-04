import { createFileRoute, useMatch } from '@tanstack/react-router';

import { IframePage } from '@/features/router/components/IframePage';

import { PROJECT_DOC_URLS } from './modules/shared';

const ROUTE_PATH = '/(admin)/document/core-docs';

const DocumentCoreDocs = () => {
  const { staticData } = useMatch({ from: ROUTE_PATH });

  return <IframePage title={staticData.title} url={staticData.url} />;
};

export const Route = createFileRoute(ROUTE_PATH)({
  component: DocumentCoreDocs,
  staticData: {
    i18nKey: 'route.document_core-docs',
    menu: {
      icon: 'carbon:assembly',
      order: 4
    },
    title: 'core-docs',
    url: PROJECT_DOC_URLS.coreDocs
  }
});
