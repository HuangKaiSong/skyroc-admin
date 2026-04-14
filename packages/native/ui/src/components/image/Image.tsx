import { isString } from '@skyroc/utils';
import { getImageComponent } from '../../primitives';
import type { ImageProps } from './types';

const ImageComponent = getImageComponent();

const Image = (props: ImageProps) => {
  const { src, ...rest } = props;

  const source = isString(src) ? { uri: src } : src;

  return <ImageComponent source={source} {...rest} />;
};

export { Image };
