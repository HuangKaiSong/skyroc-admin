import { useAtom, useAtomValue } from 'jotai';
import { langAtom, currentLangOptionAtom } from '../atoms/lang';
import { defaultLangConfig } from '../config/default';
import { saveLangToStorage } from '../utils/helpers';
import type { LangType } from '../types';

export interface UseLangReturn {
  // State
  locale: LangType;
  currentOption: ReturnType<typeof useAtomValue<typeof currentLangOptionAtom>>;

  // Config
  localeOptions: typeof defaultLangConfig.langOptions;
  fallbackLang: typeof defaultLangConfig.fallbackLang;

  // Actions
  changeLocale: (lang: LangType) => void;
  setLocale: (lang: LangType) => void;

  // Utils
  isCurrentLang: (lang: LangType) => boolean;
}

/**
 * Hook for language management
 */
export function useLang(): UseLangReturn {
  const [locale, setLocale] = useAtom(langAtom);
  const currentOption = useAtomValue(currentLangOptionAtom);

  /**
   * Change language
   */
  function changeLocale(lang: LangType) {
    // Update state
    setLocale(lang);

    // Persist to storage
    saveLangToStorage(lang);

    // Update i18next (if integrated)
    if (typeof window !== 'undefined' && (window as any).i18n) {
      (window as any).i18n.changeLanguage(lang);
    }
  }

  return {
    // State
    locale,
    currentOption,

    // Config
    localeOptions: defaultLangConfig.langOptions,
    fallbackLang: defaultLangConfig.fallbackLang,

    // Actions
    changeLocale,
    setLocale: changeLocale,

    // Utils
    isCurrentLang: (lang: LangType) => locale === lang
  };
}
