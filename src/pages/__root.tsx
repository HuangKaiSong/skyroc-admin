import { TanStackDevtools } from '@tanstack/react-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import GlobalLoading from './loading';
import NotFound from './not-found';

const Root = () => {
  return (
    <>
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right'
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />
          }
        ]}
      />
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: NotFound,
  pendingMs: 10,
  pendingComponent: GlobalLoading
});
