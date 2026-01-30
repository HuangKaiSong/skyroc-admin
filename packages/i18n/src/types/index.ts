/**
 * Language type
 */
export type LangType = 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR';

/**
 * Language option
 */
export interface LangOption {
  /** Display label */
  label: string;
  /** Language value */
  value: LangType;
}

/**
 * Language configuration
 */
export interface LangConfig {
  /** Default language */
  defaultLang: LangType;
  /** All available language options */
  langOptions: LangOption[];
  /** Fallback language */
  fallbackLang: LangType;
}

/**
 * i18n configuration
 */
export interface I18nConfig {
  /** Current language */
  lng: LangType;
  /** Fallback language */
  fallbackLng: LangType;
  /** Translation resources */
  resources: Record<LangType, unknown>;
  /** i18next options */
  [key: string]: unknown;
}
