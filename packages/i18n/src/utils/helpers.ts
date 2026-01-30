import { storage } from '@skyroc/storage';
import type { LangType, LangOption } from '../types';

/**
 * Get language from storage
 */
export function getLangFromStorage(): LangType | null {
  return storage.get<LangType>('lang');
}

/**
 * Save language to storage
 */
export function saveLangToStorage(lang: LangType): void {
  storage.set('lang', lang);
}

/**
 * Get language label
 */
export function getLangLabel(lang: LangType, options: LangOption[]): string {
  const option = options.find(opt => opt.value === lang);
  return option?.label || lang;
}
