import { AnimatePresence, motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
  /** Duration of the animation in seconds */
  duration?: number;
  /** Unique key for AnimatePresence */
  itemKey: string;
  /** Scale value for animation (0-1) */
  scale?: number;
  /** Whether the content is visible */
  visible: boolean;
}>;

const AnimatedItem: FC<Props> = ({ children, className, duration = 0.15, itemKey, scale = 0.85, visible }: Props) => {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          layout
          animate={{ opacity: 1, scale: 1 }}
          className={className}
          exit={{ opacity: 0, scale }}
          initial={{ opacity: 0, scale }}
          key={itemKey}
          transition={{ duration, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedItem;
