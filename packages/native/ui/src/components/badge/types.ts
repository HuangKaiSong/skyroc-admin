import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

/** Badge position relative to children */
export type BadgePosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

export interface BadgeProps extends ViewProps {
  /** Badge background color, overrides default variant color */
  badgeClassName?: string;

  /** Badge content: number, string, or custom ReactNode */
  content?: ReactNode;

  /** Custom badge text className */
  contentClassName?: string;

  /** Render as a small dot instead of content */
  dot?: boolean;

  /** Max numeric value; shows `{max}+` when content exceeds it */
  max?: number;

  /** Horizontal and vertical offset [x, y] in pixels */
  offset?: [number, number];

  /** Badge position when wrapping children */
  position?: BadgePosition;

  /** Whether to show badge when content is zero */
  showZero?: boolean;
}
