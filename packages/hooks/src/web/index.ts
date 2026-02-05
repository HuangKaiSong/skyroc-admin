// re-export 全部平台无关 hooks
export * from '../index';

// DOM 特定 hooks
export { useCopy } from './use-copy';
export type { ThemeName } from './use-preferred-color-scheme';
export { usePreferredColorScheme } from './use-preferred-color-scheme';
