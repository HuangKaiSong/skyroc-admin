import type { ReactNode } from 'react';
import type { ModalProps } from 'react-native-modal';

/** 弹出层位置 */
export type PopupPosition = 'bottom' | 'center' | 'left' | 'right' | 'top';

type ModalPropsWithout =
  | 'animationIn'
  | 'animationOut'
  | 'animationInTiming'
  | 'animationOutTiming'
  | 'children'
  | 'hideModalContentWhileAnimating'
  | 'useNativeDriver'
  | 'onModalShow'
  | 'onModalHide'
  | 'onBackButtonPress'
  | 'onBackdropPress'
  | 'isVisible';

/** Popup 弹出层属性 */
export interface PopupProps extends Omit<Partial<ModalProps>, ModalPropsWithout> {
  /** 弹出层内容 */
  children?: ReactNode;
  /** 自定义内容区域样式类名 */
  className?: string;
  /** 动画配置 */
  animation?: {
    in?: ModalProps['animationIn'];
    out?: ModalProps['animationOut'];
  };
  /** 是否允许点击遮罩关闭，默认 true */
  closeOnBackdropPress?: boolean;
  /** 动画时长（毫秒），默认 300 */
  duration?: number;
  /** 关闭动画完成后的回调 */
  onClosed?: () => void;
  /** 打开动画完成后的回调 */
  onOpened?: () => void;
  /** 显示状态变化回调 */
  onUpdateShow?: (show: boolean) => void;
  /** 弹出位置，默认 'center' */
  position?: PopupPosition;
  /** 是否显示圆角 */
  round?: boolean;
  /** 是否显示弹出层 */
  show: boolean;
}
