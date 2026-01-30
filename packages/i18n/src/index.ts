// Hooks
export { useLang } from './hooks/use-lang';
export type { UseLangReturn } from './hooks/use-lang';

// Atoms
export { langAtom, currentLangOptionAtom } from './atoms/lang';

// Config
export { initI18n, setLng, getCurrentLang } from './config/i18n';
export { defaultLangConfig } from './config/default';

// Utils
export { getLangFromStorage, saveLangToStorage, getLangLabel } from './utils/helpers';

// Types
export type { LangType, LangOption, LangConfig, I18nConfig } from './types';
