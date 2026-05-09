import { Portal } from '@skyroc/web-ui-compose';

import { GLOBAL_HEADER_MENU_SELECTOR } from '../../../constant';

import HorizontalMenu from '../components/HorizontalMenu';
import { HorizontalMenuMode } from '../enum';

interface Props {
  /** 水平菜单显示模式 */
  readonly mode?: HorizontalMenuMode;
}

const Horizontal = (props: Props) => {
  const { mode = HorizontalMenuMode.All } = props;

  return (
    <Portal container={GLOBAL_HEADER_MENU_SELECTOR}>
      <HorizontalMenu mode={mode} />
    </Portal>
  );
};

export default Horizontal;
