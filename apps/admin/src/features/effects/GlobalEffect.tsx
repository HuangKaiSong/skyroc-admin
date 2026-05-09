import { LangEffect } from '@skyroc/web-admin-i18n';
import { ThemeEffect } from '@skyroc/web-admin-theme';

const GlobalEffect = () => {
  return (
    <>
      <ThemeEffect />
      <LangEffect />
    </>
  );
};

export default GlobalEffect;
