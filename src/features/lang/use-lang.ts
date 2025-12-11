import { atom, useAtom } from 'jotai';

import { setLng } from '@/locales';
import { localStg } from '@/utils/storage';

const langAtom = atom(globalConfig.defaultLang);

/**
 *
 * - not complete
 * - updateTabsByLocale updateGlobalMenusByLocale updateDocumentTitleByLocale
 */
export const useLang = () => {
  const [locale, setLocale] = useAtom<I18n.LangType>(langAtom);

  function changeLocale(lang: I18n.LangType) {
    setLng(lang);

    setLocale(lang);

    localStg.set('lang', lang);
  }

  return {
    locale,
    setLocale: changeLocale,
    localeOptions: globalConfig.defaultLangOptions
  };
};
