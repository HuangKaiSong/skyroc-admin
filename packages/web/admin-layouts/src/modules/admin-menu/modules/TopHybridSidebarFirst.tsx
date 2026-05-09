import { Portal } from '@skyroc/web-ui-compose';

import { GLOBAL_SIDER_MENU_SELECTOR, LAYOUT_MODE_HORIZONTAL } from '../../../constant';

import FirstLevelMenu from '../components/FirstLevelMenu';
import { HorizontalMenuMode } from '../enum';

import Horizontal from './Horizontal';

const HorizontalMix = () => {
  return [
    <Horizontal key={LAYOUT_MODE_HORIZONTAL} mode={HorizontalMenuMode.Child} />,
    <Portal container={GLOBAL_SIDER_MENU_SELECTOR} key="first-level-menu">
      <FirstLevelMenu key="first-level-menu" />
    </Portal>
  ];
};

export default HorizontalMix;
