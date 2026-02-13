import { defineConfig } from 'vitest/config';
import { baseCoverageConfig, baseTestConfig } from '@skyroc/config/vitest';

export default defineConfig({
  test: {
    ...baseTestConfig,
    coverage: baseCoverageConfig
  }
});
