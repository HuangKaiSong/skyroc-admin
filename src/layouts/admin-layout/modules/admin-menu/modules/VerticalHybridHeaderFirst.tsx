import { HorizontalMenuMode } from '../enum';

import Horizontal from './Horizontal';
import VerticalMixMenu from './VerticalMix';

const VerticalHybridHeaderFirst = () => {
  return [
    <Horizontal
      key="vertical-hybrid-header-first-horizontal"
      mode={HorizontalMenuMode.FirstLevel}
    />,

    <VerticalMixMenu key="vertical-hybrid-header-first-vertical-mix" />
  ];
};

export default VerticalHybridHeaderFirst;
