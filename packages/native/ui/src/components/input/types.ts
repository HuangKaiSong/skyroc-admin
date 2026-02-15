import type { ReactNode } from 'react';
import type { TextInputProps } from 'react-native';
import type { SlotClassNames } from '../../types';
import type { InputVariantProps } from './input-variants';

/** Input slot names for classNames override */
export type InputSlots = 'input' | 'root';

/** Input component props */
export interface InputProps extends Omit<TextInputProps, 'editable' | 'style'>, InputVariantProps {
  /** Override individual slot class names */
  classNames?: SlotClassNames<InputSlots>;

  /** Leading content (icon, label, etc.) */
  leading?: ReactNode;

  /** Trailing content (icon, button, etc.) */
  trailing?: ReactNode;
}
