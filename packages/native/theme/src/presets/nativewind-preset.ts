import type { Config } from 'tailwindcss';
import { semanticColors, surfaceColors } from '../tokens/colors';
import { borderRadius, spacing } from '../tokens/spacing';
import { fontSize, fontWeight } from '../tokens/typography';

/**
 * NativeWind v4 preset that injects design tokens into Tailwind config.
 *
 * Usage in tailwind.config.ts:
 *
 * ```ts
 * import { nativewindPreset } from '@skyroc/native-theme/preset';
 * export default { presets: [nativewindPreset] };
 * ```
 */
export const nativewindPreset: Config = {
  content: [],
  theme: {
    extend: {
      borderRadius,
      colors: {
        ...semanticColors,
        background: surfaceColors.background,
        border: surfaceColors.border,
        foreground: surfaceColors.foreground,
        input: surfaceColors.input
      },
      fontSize,
      fontWeight,
      spacing
    }
  }
};

export default nativewindPreset;
