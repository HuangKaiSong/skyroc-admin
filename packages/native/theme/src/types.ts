import type { ThemeColor } from '@skyroc/ui-types';

/** Color scheme mode */
export type ColorScheme = 'dark' | 'light' | 'system';

/** Theme configuration for the native app */
export interface NativeThemeConfig {
  /** Color scheme */
  colorScheme: ColorScheme;

  /** Override semantic colors (hex values) */
  colors?: Partial<Record<ThemeColor, string>>;
}

/** Resolved theme values after processing */
export interface ResolvedTheme {
  /** Active color scheme */
  colorScheme: 'dark' | 'light';

  /** Resolved semantic colors */
  colors: Record<ThemeColor, string>;
}
