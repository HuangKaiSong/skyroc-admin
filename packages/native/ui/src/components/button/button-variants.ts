import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  defaultVariants: {
    color: 'primary',
    size: 'md',
    variant: 'solid'
  },
  slots: {
    root: 'flex-row items-center justify-center rounded-lg active:opacity-80',
    label: 'font-medium'
  },
  variants: {
    color: {
      accent: { label: 'text-accent-foreground', root: 'bg-accent' },
      destructive: { label: 'text-destructive-foreground', root: 'bg-destructive' },
      info: { label: 'text-info-foreground', root: 'bg-info' },
      primary: { label: 'text-primary-foreground', root: 'bg-primary' },
      secondary: { label: 'text-secondary-foreground', root: 'bg-secondary' },
      success: { label: 'text-success-foreground', root: 'bg-success' },
      warning: { label: 'text-warning-foreground', root: 'bg-warning' }
    },
    disabled: {
      true: { root: 'opacity-50' }
    },
    size: {
      lg: { label: 'text-base', root: 'h-12 px-6' },
      md: { label: 'text-sm', root: 'h-10 px-4' },
      sm: { label: 'text-xs', root: 'h-8 px-3' },
      xl: { label: 'text-lg', root: 'h-14 px-8' },
      xs: { label: 'text-xs', root: 'h-6 px-2' }
    },
    variant: {
      ghost: { root: 'bg-transparent' },
      outline: { root: 'border-2 bg-transparent' },
      solid: {}
    }
  },
  compoundVariants: [
    { class: { label: 'text-primary', root: 'border-primary' }, color: 'primary', variant: 'outline' },
    { class: { label: 'text-destructive', root: 'border-destructive' }, color: 'destructive', variant: 'outline' },
    { class: { label: 'text-primary' }, color: 'primary', variant: 'ghost' },
    { class: { label: 'text-destructive' }, color: 'destructive', variant: 'ghost' }
  ]
});

export type ButtonVariantProps = Parameters<typeof buttonVariants>[0];
