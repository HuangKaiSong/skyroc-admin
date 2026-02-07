import LangEffect from '../lang/LangEffect';
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
