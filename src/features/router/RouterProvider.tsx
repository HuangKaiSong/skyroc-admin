import { RouterProvider as TanStackRouterProvider } from '@tanstack/react-router';

import { useAuth } from '../auth/use-auth';

import { router } from '.';

const RouterProvider = () => {
  const { isLoggedIn, token } = useAuth();

  return (
    <TanStackRouterProvider
      context={{ token, isLoggedIn }}
      router={router}
    />
  );
};

export default RouterProvider;
