import type { ModalProps } from 'react-native-modal';
import { tv } from 'tailwind-variants';
import type { PopupPosition } from './types';

/** Popup 内容区域样式变体 */
export const popupVariants = tv({
  base: 'bg-background overflow-hidden',
  variants: {
    position: {
      bottom: 'w-full',
      center: 'rounded-2xl',
      left: 'h-full',
      right: 'h-full',
      top: 'w-full'
    },
    round: {
      true: ''
    }
  },
  compoundVariants: [
    { position: 'bottom', round: true, className: 'rounded-t-2xl' },
    { position: 'top', round: true, className: 'rounded-b-2xl' },
    { position: 'left', round: true, className: 'rounded-r-2xl' },
    { position: 'right', round: true, className: 'rounded-l-2xl' }
  ],
  defaultVariants: {
    position: 'center',
    round: false
  }
});

/** 弹出层动画映射：position → { in, out } */
export const popupAnimationMap: Record<
  PopupPosition,
  { in: ModalProps['animationIn']; out: ModalProps['animationOut'] }
> = {
  bottom: { in: 'slideInUp', out: 'slideOutDown' },
  center: { in: 'fadeIn', out: 'fadeOut' },
  left: { in: 'slideInLeft', out: 'slideOutLeft' },
  right: { in: 'slideInRight', out: 'slideOutRight' },
  top: { in: 'slideInDown', out: 'slideOutUp' }
};
