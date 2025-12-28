import { presetSoybeanAdmin } from '@sa/uno-config';
import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss';

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.tsx($|\?)/]
    },
    filesystem: ['../../ui-kit/ui']
  },
  presets: [
    presetWind4({
      dark: 'class',
      variablePrefix: ''
    }),
    presetSoybeanAdmin()
  ],
  rules: [[/^h-calc\((.*)\)$/, ([, d]) => ({ height: `calc(${d})px` })]],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
