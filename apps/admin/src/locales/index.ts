import {
  $t,
  loadLocaleMessages as loadCoreLocaleMessages,
  reactI18nextInstance,
  setupI18n as setupCoreI18n
} from '@skyroc/web-admin-i18n';
import type { LocaleSetupOptions } from '@skyroc/web-admin-i18n';

import { globalConfig } from '@/config';
import { localStg } from '@/utils/storage';

import { setDayjsLocale } from './dayjs';

function syncThirdPartyLocale(lang: I18n.LangType) {
  document.documentElement.lang = lang;
  setDayjsLocale(lang);
}

/** Setup plugin i18n */
export async function setupI18n(options: LocaleSetupOptions<I18n.LangType> = {}) {
  await setupCoreI18n({
    defaultLocale: globalConfig.defaultLang,
    fallbackLocale: 'en-US',
    localeOptions: globalConfig.defaultLangOptions,
    missingWarn: import.meta.env.DEV,
    onLocaleChange: syncThirdPartyLocale,
    storage: {
      getLocale() {
        return localStg.get('lang');
      },
      setLocale(lang) {
        localStg.set('lang', lang);
      }
    },
    ...options
  });
}

export async function loadLocaleMessages(lang: I18n.LangType) {
  await loadCoreLocaleMessages(lang);
}

export { $t, reactI18nextInstance };
