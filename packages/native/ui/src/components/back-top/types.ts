import type { ReactNode } from 'react';
import type Animated from 'react-native-reanimated';
import type { AnimatedRef } from 'react-native-reanimated';

export interface BackTopProps {
  /** Distance from the bottom edge of the screen in pixels (accounts for safe area) */
  bottom?: number;

  /** Custom content to replace the default arrow icon */
  children?: ReactNode;

  /** NativeWind className applied to the FloatingButton inner container */
  className?: string;

  /** When true, scrolls to top instantly; when false, uses animated scrolling */
  immediate?: boolean;

  /** Scroll threshold in pixels — button appears when scrollTop exceeds this value */
  offset?: number;

  /** Additional callback fired when the button is pressed, before scrolling */
  onPress?: () => void;

  /** Distance from the right edge of the screen in pixels */
  right?: number;

  /** Button diameter in pixels */
  size?: number;

  /** AnimatedRef to the Animated.ScrollView, used for scroll offset tracking and scrollTo */
  target: AnimatedRef<Animated.ScrollView>;
}
