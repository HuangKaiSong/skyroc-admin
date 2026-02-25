import type { ReactNode } from 'react';
import type { TextInputProps } from 'react-native';
import type { SlotClassNames } from '../../types';
import type { FieldVariantProps } from './field-variants';

/** Field 输入类型 */
export type FieldType = 'digit' | 'number' | 'password' | 'tel' | 'text' | 'textarea';

/** Field 标签对齐方式 */
export type FieldLabelAlign = 'center' | 'left' | 'right' | 'top';

/** Field 输入对齐方式 */
export type FieldInputAlign = 'center' | 'left' | 'right';

/** Field 格式化触发时机 */
export type FieldFormatTrigger = 'onBlur' | 'onChange';

/** textarea 自适应高度配置 */
export interface FieldAutosizeConfig {
  /** 最大高度 */
  maxHeight?: number;
  /** 最小高度 */
  minHeight?: number;
}

/** Field slot 名称 */
export type FieldSlots =
  | 'clear'
  | 'control'
  | 'errorMessage'
  | 'label'
  | 'leftIcon'
  | 'rightIcon'
  | 'root'
  | 'wordLimit';

/** Field 组件属性 */
export interface FieldProps extends Omit<TextInputProps, 'editable' | 'style'>, FieldVariantProps {
  /** textarea 自适应高度，true 为默认配置，对象可指定最小/最大高度 */
  autosize?: boolean | FieldAutosizeConfig;

  /** 覆盖各 slot 的 className */
  classNames?: SlotClassNames<FieldSlots>;

  /** 是否可清除，聚焦且有值时显示清除按钮 */
  clearable?: boolean;

  /** 是否在标签后显示冒号 */
  colon?: boolean;

  /** 是否禁用输入 */
  disabled?: boolean;

  /** 是否显示为错误状态 */
  error?: boolean;

  /** 底部错误提示文本 */
  errorMessage?: string;

  /** 输入内容格式化函数 */
  formatter?: (value: string) => string;

  /** 格式化触发时机，默认 onChange */
  formatTrigger?: FieldFormatTrigger;

  /** 输入内容水平对齐方式 */
  inputAlign?: FieldInputAlign;

  /** 左侧标签文本 */
  label?: string;

  /** 标签对齐方式，默认 left */
  labelAlign?: FieldLabelAlign;

  /** 标签宽度（数字为 px） */
  labelWidth?: number;

  /** 左侧图标 */
  leftIcon?: ReactNode;

  /** 清除回调 */
  onClear?: () => void;

  /** 点击左侧图标回调 */
  onLeftIconPress?: () => void;

  /** 点击右侧图标回调 */
  onRightIconPress?: () => void;

  /** 是否显示必填星号 */
  required?: boolean;

  /** 右侧图标 */
  rightIcon?: ReactNode;

  /** textarea 行数 */
  rows?: number;

  /** 是否显示字数统计（需配合 maxLength 使用） */
  showWordLimit?: boolean;

  /** 右侧自定义内容区域 */
  trailing?: ReactNode;

  /** 输入类型 */
  type?: FieldType;

  /** 输入值 */
  value?: string;
}
