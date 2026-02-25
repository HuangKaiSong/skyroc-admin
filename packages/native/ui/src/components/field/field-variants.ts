import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

/** Field 组件样式变体（布局由 Cell 负责，这里只管文本级样式） */
export const fieldVariants = tv({
  defaultVariants: {
    labelAlign: 'left',
    size: 'md'
  },
  slots: {
    clear: 'ml-2 items-center justify-center',
    control: 'flex-1 bg-transparent text-foreground placeholder:text-muted-foreground m-0 p-0',
    errorMessage: 'text-destructive',
    label: 'text-foreground',
    leftIcon: 'mr-2 items-center justify-center',
    rightIcon: 'ml-2 items-center justify-center',
    wordLimit: 'text-muted-foreground'
  },
  variants: {
    disabled: {
      true: { control: 'text-muted-foreground' }
    },
    error: {
      true: { control: 'text-destructive' }
    },
    labelAlign: {
      center: { label: 'text-center' },
      left: { label: 'text-left' },
      right: { label: 'text-right' },
      top: {}
    },
    size: {
      lg: {
        control: 'text-base',
        errorMessage: 'mt-1.5 text-sm',
        label: 'text-base',
        wordLimit: 'mt-1.5 text-sm'
      },
      md: {
        control: 'text-sm',
        errorMessage: 'mt-1 text-xs',
        label: 'text-sm',
        wordLimit: 'mt-1 text-xs'
      },
      sm: {
        control: 'text-xs',
        errorMessage: 'mt-0.5 text-2xs',
        label: 'text-xs',
        wordLimit: 'mt-0.5 text-2xs'
      }
    }
  }
});

export type FieldVariantProps = VariantProps<typeof fieldVariants>;
