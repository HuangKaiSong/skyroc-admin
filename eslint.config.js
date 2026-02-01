import { defineConfig } from '@soybeanjs/eslint-config';

export default defineConfig(
  {
    prettierRules: {
      singleAttributePerLine: true,
      trailingCommas: 'none'
    }
  },
  {
    rules: {
      'no-underscore-dangle': 'off'
    }
  }
);
