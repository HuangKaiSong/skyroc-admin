import type { TextProps as RNTextProps } from 'react-native';
import type { TextVariantProps } from './text-variants';

/** Typography component props */
export interface TextProps extends Omit<RNTextProps, 'style'>, TextVariantProps {
  /** NativeWind class name */
  className?: string;
}
