import { tv } from 'tailwind-variants';

/** Toast 样式变体 */
export const toastVariants = tv({
  defaultVariants: {
    hasIcon: false
  },
  slots: {
    icon: 'items-center justify-center',
    message: 'text-center text-sm leading-5 text-white',
    root: 'items-center justify-center rounded-xl bg-[#000]/70'
  },
  variants: {
    hasIcon: {
      true: {
        icon: 'mb-2',
        message: 'text-sm',
        root: 'size-28 p-4'
      },
      false: {
        root: 'max-w-[85%] min-w-24 px-4 py-3'
      }
    }
  }
});

/** Toast 宿主定位变体 */
export const toastPositionVariants = tv({
  base: 'pointer-events-none absolute inset-x-0 items-center',
  defaultVariants: {
    position: 'middle'
  },
  variants: {
    position: {
      bottom: 'bottom-[20%]',
      middle: 'bottom-0 top-0 justify-center',
      top: 'top-[20%]'
    }
  }
});
