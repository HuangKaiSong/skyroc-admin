import { tv } from 'tailwind-variants';

export const inputVariants = tv({
  defaultVariants: {
    size: 'md',
    variant: 'outline'
  },
  slots: {
    input: 'flex-1 text-foreground placeholder:text-foreground-muted',
    root: 'flex-row items-center rounded-lg border border-border bg-background'
  },
  variants: {
    disabled: {
      true: { root: 'opacity-50' }
    },
    error: {
      true: { root: 'border-destructive' }
    },
    size: {
      lg: { input: 'text-base', root: 'h-12 px-4' },
      md: { input: 'text-sm', root: 'h-10 px-3' },
      sm: { input: 'text-xs', root: 'h-8 px-2' }
    },
    variant: {
      filled: { root: 'border-transparent bg-background-muted' },
      outline: {},
      underline: { root: 'rounded-none border-x-0 border-t-0' }
    }
  }
});

export type InputVariantProps = Parameters<typeof inputVariants>[0];
