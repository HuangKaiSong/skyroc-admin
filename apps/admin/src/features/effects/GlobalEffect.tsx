import { LangEffect } from '@skyroc/i18n';
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
