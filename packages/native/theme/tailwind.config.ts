import type { Config } from 'tailwindcss';

import { nativewindPreset } from './src/presets/nativewind-preset';

/**
 * Standalone Tailwind config that consumers can extend.
 *
 * Usage:
 *
 * ```ts
 * // tailwind.config.ts
 * import baseConfig from '@skyroc/native-theme/tailwind';
 * export default { ...baseConfig, content: ['./src/**\/*.{ts,tsx}'] };
 * ```
 */
const config: Config = {
  content: [],
  presets: [nativewindPreset]
};

export default config;
