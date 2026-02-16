import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';
import type { SlotClassNames } from '../../types';
import type { ButtonVariantProps } from './button-variants';

/** Button slot names for classNames override */
export type ButtonSlots = 'label' | 'root';

/** Button component props */
export interface ButtonProps extends PressableProps, Omit<ButtonVariantProps, 'disabled'> {
  /** Button content */
  children?: ReactNode;

  /** Override individual slot class names */
  classNames?: SlotClassNames<ButtonSlots>;

  /** Show loading state */
  loading?: boolean;
}
