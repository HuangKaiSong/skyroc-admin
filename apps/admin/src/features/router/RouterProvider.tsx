import { RouterProvider as TanStackRouterProvider } from '@tanstack/react-router';

import { useAuth } from '../auth/use-auth';

import { router } from '.';

const RouterProvider = memo(() => {
  const { clearAuth, initAuth, isAuthInitialized, isLoggedIn, userInfo } = useAuth();

  return (
    <TanStackRouterProvider
      context={{ initAuth, isAuthInitialized, isLoggedIn, userInfo, clearAuth }}
      router={router}
    />
  );
});

export default RouterProvider;
