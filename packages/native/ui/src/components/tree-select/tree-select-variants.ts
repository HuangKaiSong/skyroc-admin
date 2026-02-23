import { tv } from 'tailwind-variants';

export const treeSelectVariants = tv({
  slots: {
    content: 'flex-2 bg-background',
    contentItem: 'flex-row items-center justify-between px-4 py-3.5 active:opacity-80 will-change-pressable',
    contentItemText: 'text-sm text-foreground',
    selectedIcon: 'text-primary'
  },
  variants: {
    active: {
      true: {
        contentItemText: 'font-semibold text-primary'
      }
    },
    disabled: {
      true: {
        contentItem: 'opacity-50',
        contentItemText: 'text-muted-foreground'
      }
    }
  }
});
