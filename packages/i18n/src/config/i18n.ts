import i18n from 'i18next';
import type { I18nConfig, LangType } from '../types';
/** Initialize i18next */
export function initI18n(config: I18nConfig) {
  // Dynamic import to avoid requiring i18next at build time

  return i18n.init({
    // Common configuration
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    },

    // Spread additional options
    ...config
  });
}

/** Set language */
export async function setLng(lang: LangType) {
  const i18n = await import('i18next');
  return i18n.default.changeLanguage(lang);
}

/** Get current language */
export async function getCurrentLang(): Promise<LangType> {
  const i18n = await import('i18next');
  return i18n.default.language as LangType;
}
