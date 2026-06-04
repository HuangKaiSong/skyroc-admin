import { createFileRoute, useMatch } from '@tanstack/react-router';

import { IframePage } from '@/features/router/components/IframePage';

import { PROJECT_DOC_URLS } from './modules/shared';

const ROUTE_PATH = '/(admin)/document/project-docs';

const DocumentProjectDocs = () => {
  const { staticData } = useMatch({ from: ROUTE_PATH });

  return <IframePage title={staticData.title} url={staticData.url} />;
};

export const Route = createFileRoute(ROUTE_PATH)({
  component: DocumentProjectDocs,
  staticData: {
    i18nKey: 'route.document_project-docs',
    menu: {
      icon: 'mdi:book-multiple-outline',
      order: 0
    },
    title: 'project-docs',
    url: PROJECT_DOC_URLS.projectDocs
  }
});
