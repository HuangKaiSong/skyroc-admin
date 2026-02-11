import { defineConfig } from 'vitest/config';

/**
 * 根目录 Vitest 配置
 *
 * 所有子包的测试统一由根目录配置管理，
 * 各子包通过 include 模式自动发现测试文件。
 */
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['packages/**/src/**/*.test.ts', 'packages/**/src/**/*.test.tsx'],
    setupFiles: ['./packages/hooks/vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      enabled: true,
      include: ['packages/**/src/**/*.ts', 'packages/**/src/**/*.tsx'],
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/index.ts', '**/*.d.ts', '**/vitest.setup.ts']
    }
  }
});
