import type { ReactNode } from 'react';
import type { TextInputProps } from 'react-native';
import type { SlotClassNames } from '../../types';
import type { InputVariantProps } from './input-variants';

/** Input slot 名称 */
export type InputSlots = 'clearable' | 'control' | 'root';

/** Input 组件属性 */
export interface InputProps extends Omit<TextInputProps, 'editable' | 'style'>, InputVariantProps {
  /** 覆盖各 slot 的 className */
  classNames?: SlotClassNames<InputSlots>;

  /** 是否可清除，显示清除按钮 */
  clearable?: boolean;

  /** 左侧内容（图标、标签等） */
  leading?: ReactNode;

  /** 清除回调 */
  onClear?: () => void;

  /** 右侧内容（图标、按钮等） */
  trailing?: ReactNode;
}
