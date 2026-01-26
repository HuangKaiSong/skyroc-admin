declare namespace Router {
  type QueryClient = import('@tanstack/react-query').QueryClient;

  type RouteId = keyof import('@/features/router/routeTree.gen').FileRoutesById;

  type RoutePath = keyof import('@/features/router/routeTree.gen').FileRoutesByTo;

  type Extra = import('@/features/menus/extras').ExtraKey;
}
