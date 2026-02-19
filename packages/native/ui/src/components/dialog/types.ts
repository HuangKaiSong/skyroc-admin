import type { ReactNode } from 'react';

/** Dialog 操作类型 */
export type DialogAction = 'cancel' | 'confirm';

/** Dialog 对话框属性 */
export interface DialogProps {
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
  /** 标题 */
  title?: string;
}

/** 命令式调用 Dialog 的配置项 */
export interface DialogOptions extends Omit<DialogProps, 'onUpdateShow' | 'show'> {
  /** 操作回调，confirm 或 cancel */
  callback?: (action: DialogAction) => void;
}
