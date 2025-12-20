/**
 * 命名空间 Api.Route
 *
 * 后端 API 模块：路由模块
 */
declare namespace Api {
  type EnableStatus = import('@/enums').EnableStatus;

  namespace Route {
    /** 后端返回的完整路由结构 */
    interface BackendRouteResponse {
      /** 用户首页路由键 */
      home: Router.RoutePath;
      /** 用户可访问的路由列表 */
      routes: BackendRoute[];
    }

    interface BackendRoute {
      children?: BackendRoute[];

      id: string;

      iframeUrl?: string | null;

      menu?: Router.Meta['menu'];

      params?: { key: string; value: string }[];

      parentId?: string | null;

      path?: Router.RoutePath;

      query?: { key: string; value: string }[] | null;

      routeId: Router.RouteId;

      status?: EnableStatus;

      tab?: Router.Meta['tab'];
    }
  }
}
