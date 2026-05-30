import { Outlet, createRootRouteWithContext, useLocation } from '@tanstack/react-router';

import ErrorPage from './error';
import NotFound from './not-found';
import GlobalLoading from './loading';

const Root = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    globalConfig.nprogress.done();

    return () => {
      globalConfig.nprogress.start();
    };
  }, [pathname]);

  return <Outlet />;
};

export const Route = createRootRouteWithContext<Router.RouterContext>()({
  component: Root,
  notFoundComponent: NotFound,
  beforeLoad: async ({ context }) => {
    if (!context.isAuthInitialized) {
      await context.initAuth();
    }
  },
  staticData: {
    title: 'SkyrocAdmin'
  },
  errorComponent: ErrorPage,
  pendingComponent: GlobalLoading
});
