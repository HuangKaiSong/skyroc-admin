import type { ViewProps } from 'react-native';

/** Generic layout container props */
export interface BoxProps extends Omit<ViewProps, 'style'> {
  /** NativeWind class name */
  className?: string;
}
