import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { defaultLangConfig } from '../config/default';
import type { LangType } from '../types';

/**
 * Language atom with localStorage persistence
 */
export const langAtom = atomWithStorage<LangType>('app-lang', defaultLangConfig.defaultLang);

/**
 * Derived atom: Current language option
 */
export const currentLangOptionAtom = atom(get => {
  const lang = get(langAtom);
  return defaultLangConfig.langOptions.find(opt => opt.value === lang);
});
