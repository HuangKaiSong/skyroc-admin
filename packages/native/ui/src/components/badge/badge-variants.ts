import { tv } from 'tailwind-variants';

export const badgeVariants = tv({
  slots: {
    root: 'relative self-start',
    badge: 'items-center justify-center rounded-full border border-white bg-destructive',
    content: 'text-center font-bold text-white',
    dot: 'h-2 w-2 rounded-full bg-destructive'
  }
});
