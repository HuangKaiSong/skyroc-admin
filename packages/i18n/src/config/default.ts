import type { LangConfig } from '../types';

/**
 * Default language configuration
 */
export const defaultLangConfig: LangConfig = {
  defaultLang: 'zh-CN',
  fallbackLang: 'en-US',
  langOptions: [
    { label: '简体中文', value: 'zh-CN' },
    { label: 'English', value: 'en-US' },
    { label: '日本語', value: 'ja-JP' },
    { label: '한국어', value: 'ko-KR' }
  ]
};
