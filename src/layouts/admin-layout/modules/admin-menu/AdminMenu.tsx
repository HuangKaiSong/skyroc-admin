import { useSettingsTheme } from '@/features/theme/useSettingsTheme';

import HorizontalMenu from './modules/Horizontal';
import TopHybridSidebarFirst from './modules/TopHybridSidebarFirst';

const GlobalMenu = memo(() => {
  const {
    layout: { mode }
  } = useSettingsTheme();
  if (mode === 'horizontal') return <HorizontalMenu />;

  return <TopHybridSidebarFirst />;
});

export default GlobalMenu;
