import type { ReactNode } from 'react';

/** Dialog 操作类型 */
export type DialogAction = 'cancel' | 'confirm';

/** Dialog 主题 */
export type DialogTheme = 'default' | 'round-button';

/** 关闭拦截器，返回 false 或 reject 则阻止关闭 */
export type DialogBeforeClose = (action: DialogAction) => boolean | Promise<boolean>;

/** Dialog 对话框属性 */
export interface DialogProps {
  /** 关闭前的拦截回调，支持异步，pending 时按钮显示 loading */
  beforeClose?: DialogBeforeClose;
  /** 取消按钮文本，默认 'Cancel' */
  cancelButtonText?: string;
  /** 自定义内容区域 */
  children?: ReactNode;
  /** 自定义样式类名 */
  className?: string;
  /** 确认按钮文本，默认 'Confirm' */
  confirmButtonText?: string;
  /** 消息文本 */
  message?: string;
  /** 消息对齐方式，默认 'center' */
  messageAlign?: 'center' | 'left' | 'right';
  /** 取消按钮回调 */
  onCancel?: () => void;
  /** 确认按钮回调 */
  onConfirm?: () => void;
  /** 显示状态变化回调 */
  onUpdateShow?: (show: boolean) => void;
  /** 是否显示对话框 */
  show: boolean;
  /** 是否显示取消按钮，默认 false */
  showCancelButton?: boolean;
  /** 是否显示确认按钮，默认 true */
  showConfirmButton?: boolean;
  /** 按钮主题，默认 'default' */
  theme?: DialogTheme;
  /** round-button 主题下的按钮排列方向，默认 'vertical' */
  themeDirection?: 'horizontal' | 'vertical';
  /** 标题 */
  title?: string;
}

/** 命令式调用 Dialog 的配置项 */
export interface DialogOptions extends Omit<DialogProps, 'onUpdateShow' | 'show'> {
  /** 操作回调，confirm 或 cancel */
  callback?: (action: DialogAction) => void;
}
