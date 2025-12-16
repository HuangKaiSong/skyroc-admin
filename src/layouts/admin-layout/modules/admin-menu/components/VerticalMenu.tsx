import { SimpleScrollbar } from '@sa/materials';
import { useNavigate } from '@tanstack/react-router';
import type { MenuProps } from 'antd';

import { useSettingsTheme } from '@/features/theme/useSettingsTheme';
import { useAdminMenus } from '@/layouts/admin-layout/state/menus/use-admin-menus';
import { useAdminState } from '@/layouts/admin-layout/state/use-admin-state';

interface LevelKeysProps {
  children?: LevelKeysProps[];
  key?: string;
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach(item => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const getSelectedMenuKeyPath = (matches: Router.Route['matched']) => {
  const result = matches.reduce((acc: string[], match, index) => {
    if (index < matches.length - 1 && match.pathname) {
      acc.push(match.pathname);
    }
    return acc;
  }, []);

  return result;
};

const VerticalMenu = memo(() => {
  const { menus: allMenus, route, secondLevelMenus, selectedKey } = useAdminMenus();

  const levelKeys = useMemo(() => getLevelKeys(allMenus), [allMenus]);

  const { isOnlyExpandCurrentParentMenu, layout } = useSettingsTheme();

  const navigate = useNavigate();

  const isMix = layout.mode.includes('mix');

  const isVerticalMix = layout.mode === 'vertical-mix';

  const { siderCollapse: inlineCollapsed } = useAdminState();

  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>(
    inlineCollapsed ? [] : getSelectedMenuKeyPath(route.matched)
  );

  const handleClickMenu: MenuProps['onSelect'] = menuInfo => {
    navigate({ to: menuInfo.key });
  };

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    if (keys.includes('rc-menu-more')) {
      setStateOpenKeys(keys);
      return;
    }

    const currentOpenKey = keys.find(key => !stateOpenKeys.includes(key));

    // open
    if (currentOpenKey && isOnlyExpandCurrentParentMenu) {
      const repeatIndex = keys
        .filter(key => key !== currentOpenKey)
        .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        keys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter(key => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // // close
      setStateOpenKeys(keys);
    }
  };

  useEffect(() => {
    if (inlineCollapsed || isVerticalMix) return;
    setStateOpenKeys(getSelectedMenuKeyPath(route.matched));
  }, [route, inlineCollapsed, isVerticalMix]);

  useUpdateEffect(() => {
    if (inlineCollapsed || isVerticalMix) return;

    const names = route.matched
      .slice(isMix ? 1 : 0, -1)
      .map(item => item.pathname)
      .filter(Boolean) as string[];

    setStateOpenKeys(names || []);
  }, [isMix, inlineCollapsed]);

  return (
    <SimpleScrollbar>
      <AMenu
        className="size-full transition-300 border-0!"
        inlineCollapsed={isVerticalMix ? false : inlineCollapsed}
        inlineIndent={18}
        items={isMix ? secondLevelMenus : allMenus}
        mode="inline"
        openKeys={stateOpenKeys}
        selectedKeys={selectedKey}
        onOpenChange={onOpenChange}
        onSelect={handleClickMenu}
      />
    </SimpleScrollbar>
  );
});

export default VerticalMenu;
