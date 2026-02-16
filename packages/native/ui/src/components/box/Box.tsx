import { View } from 'react-native';
import type { BoxProps } from './types';

const Box = (props: BoxProps) => {
  const { children, className, ...rest } = props;

  return (
    <View
      className={className}
      {...rest}
    >
      {children}
    </View>
  );
};

export { Box };
