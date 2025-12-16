import { Outlet, createRootRouteWithContext, useLocation } from '@tanstack/react-router';

import { menuGenerator } from '@/features/menus/menu-generator';
import { AUTH_QUERY_KEYS, queryUserInfoOptions } from '@/service/api';
import { localStg } from '@/utils/storage';

import ErrorPage from './error';
import GlobalLoading from './loading';
import NotFound from './not-found';

const Root = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    globalConfig.nprogress.done();
  }, [pathname]);

  return <Outlet />;
};

export const Route = createRootRouteWithContext<Router.RouterContext>()({
  component: Root,
  notFoundComponent: NotFound,
  beforeLoad: async ({ context }) => {
    globalConfig.nprogress.start();

    const isInitInfo = Boolean(context.queryClient.getQueryData(AUTH_QUERY_KEYS.USER_INFO));

    const contextData = {} as Router.RouterContext;

    if (!isInitInfo) {
      const enabled = Boolean(localStg.get('token'));

      if (enabled) {
        const data = await context.queryClient.ensureQueryData(queryUserInfoOptions(enabled));

        contextData.info = data;
      }
    }

    return contextData;
  },
  staticData: {
    title: 'skyroc-admin'
  },
  errorComponent: ErrorPage,
  pendingMs: 10,
  pendingComponent: GlobalLoading
});
