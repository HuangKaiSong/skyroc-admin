import { tv } from 'tailwind-variants';

/** ActionSheet 多 slot 样式变体 */
export const actionSheetVariants = tv({
  slots: {
    root: '',
    action: 'items-center justify-center px-4 py-3.5',
    actionName: 'text-sm text-foreground font-bold',
    actionSubname: 'mt-0.5 text-xs text-muted-foreground',
    cancelGap: 'h-2 bg-muted',
    cancel: 'items-center justify-center bg-background px-4 py-3.5'
  },
  variants: {
    disabled: {
      true: {
        action: 'opacity-50'
      }
    },
    loading: {
      true: {
        action: 'opacity-70'
      }
    }
  }
});
