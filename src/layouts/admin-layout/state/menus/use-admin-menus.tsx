import type { RouteMatch } from '@tanstack/react-router';
import { useMatch } from '@tanstack/react-router';
import { atom, useAtom } from 'jotai';

import { globalStore } from '@/features/jotai/store';

/**
 * Get active first level menu key
 *
 * @param route
 */
export function getActiveFirstLevelMenuKey(route: RouteMatch<any, any, any, any, any, any, any>) {
  const { activeMenu, hideInMenu } = route.staticData;

  const name = route.pathname;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  const [_, firstLevelRouteName] = routeName.split('/');

  return `/${firstLevelRouteName}`;
}

const menusAtom = atom<{
  activeFirstLevelMenuKey: string;
  menus: App.Global.AdminLayout.Menu[];
}>({
  menus: [],
  activeFirstLevelMenuKey: ''
});

export const useAdminMenus = () => {
  const [menuState, setMenuState] = useAtom(menusAtom);

  const { activeFirstLevelMenuKey, menus } = menuState;

  const route = useMatch({ strict: false });

  const { activeMenu, hideInMenu } = route.staticData;

  const name = route.pathname;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  const selectedKey = [routeName];

  const firstLevelMenus = useMemo(
    () =>
      menus.map(menu => {
        const { children: _, ...rest } = menu;

        return rest;
      }),
    [menus]
  );

  const secondLevelMenus = menus.find(item => item.key === activeFirstLevelMenuKey)?.children || [];

  const isActiveFirstLevelMenuHasChildren = activeFirstLevelMenuKey ? Boolean(secondLevelMenus.length) : false;

  const childLevelMenus = secondLevelMenus.find(menu => menu.key === activeFirstLevelMenuKey)?.children || [];

  /** - 可以手动指定菜单或者是默认当前路由的一级菜单 */
  function changeActiveFirstLevelMenuKey(key?: string) {
    const routeKey = key || getActiveFirstLevelMenuKey(route);

    setMenuState(prev => ({
      ...prev,
      activeFirstLevelMenuKey: routeKey
    }));
  }

  return {
    menus,
    selectedKey,
    route,
    firstLevelMenus,
    childLevelMenus,
    activeFirstLevelMenuKey,
    isActiveFirstLevelMenuHasChildren,
    secondLevelMenus,
    changeActiveFirstLevelMenuKey
  };
};

export function initMenus(menus: App.Global.AdminLayout.Menu[]) {
  globalStore.set(menusAtom, prev => ({
    ...prev,
    menus
  }));
}
