import { Portal } from '@skyroc/web-ui-compose';

import { GLOBAL_SIDER_MENU_SELECTOR } from '../../../constant';

import VerticalMenu from '../components/VerticalMenu';

const Vertical = () => {
  return (
    <Portal container={GLOBAL_SIDER_MENU_SELECTOR}>
      <VerticalMenu />
    </Portal>
  );
};

export default Vertical;
