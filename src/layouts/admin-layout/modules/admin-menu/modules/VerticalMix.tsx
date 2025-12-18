import classNames from 'clsx';

import DarkModeContainer from '@/components/DarkModeContainer';
import PinToggler from '@/components/PinToggler';
import { GLOBAL_SIDER_MENU_ID } from '@/constants/app';
import { useSettingsTheme } from '@/features/theme/useSettingsTheme';
import { useAdminMenus } from '@/layouts/admin-layout/state/menus/use-admin-menus';
import { useAdminState } from '@/layouts/admin-layout/state/use-admin-state';

import AdminLogo from '../../AdminLogo';
import FirstLevelMenu from '../components/FirstLevelMenu';
import VerticalMenu from '../components/VerticalMenu';

const VerticalMix = memo(() => {
  const { t } = useTranslation();

  const { changeActiveFirstLevelMenuKey, childLevelMenus } = useAdminMenus();

  const { darkMode, header, sider } = useSettingsTheme();

  const { mixSiderFixed, toggleMixSiderFixed } = useAdminState();

  const [drawerVisible, setDrawerVisible] = useState(false);

  const siderInverted = !darkMode && sider.inverted;

  const hasMenus = childLevelMenus && childLevelMenus.length > 0;

  const showDrawer = hasMenus && (drawerVisible || mixSiderFixed);

  function handleSelectMixMenu() {
    setDrawerVisible(true);
  }

  function handleResetActiveMenu() {
    setDrawerVisible(false);

    changeActiveFirstLevelMenuKey();
  }

  return (
    <div
      className="h-full flex"
      onMouseLeave={handleResetActiveMenu}
    >
      <FirstLevelMenu
        inverted={siderInverted}
        onSelect={handleSelectMixMenu}
      >
        <AdminLogo
          showTitle={false}
          style={{ height: `${header.height}px` }}
        />
      </FirstLevelMenu>
      <div
        className="relative h-full transition-width-300"
        style={{ width: mixSiderFixed && hasMenus ? `${sider.mixChildMenuWidth}px` : '0px' }}
      >
        <DarkModeContainer
          className="absolute-lt h-full flex-col-stretch nowrap-hidden shadow-sm transition-all-300"
          inverted={siderInverted}
          style={{ width: showDrawer ? `${sider.mixChildMenuWidth}px` : '0px' }}
        >
          <header
            className="flex-y-center justify-between px-12px"
            style={{ height: `${header.height}px` }}
          >
            <h2 className="text-16px text-primary font-bold">{t('system.title')}</h2>
            <PinToggler
              className={classNames({ 'text-white:88 !hover:text-white': siderInverted })}
              pin={mixSiderFixed}
              onClick={toggleMixSiderFixed}
            />
          </header>
          <VerticalMenu />
        </DarkModeContainer>
      </div>
    </div>
  );
});

const VerticalMixMenu = () => {
  return (
    <Portal container={GLOBAL_SIDER_MENU_ID}>
      <VerticalMix />
    </Portal>
  );
};

export default VerticalMixMenu;
