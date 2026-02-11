import type { UserConfig } from 'vitest/config';

/**
 * Vitest 共享配置
 *
 * 所有子包可以继承此配置，保持测试配置的一致性。
 * 定位等同于 @skyroc/tsconfig 之于 TypeScript。
 */

// ==================== 常量配置 ====================

/** 测试环境 */
export const TEST_ENVIRONMENT = 'jsdom';

/** 覆盖率提供者 */
export const COVERAGE_PROVIDER = 'v8';

/** 测试文件匹配模式（相对于子包根目录） */
export const TEST_PATTERNS = ['__tests__/**/*.test.ts', '__tests__/**/*.test.tsx'];

/** 源文件匹配模式（用于覆盖率） */
export const SOURCE_PATTERNS = ['src/**/*.ts', 'src/**/*.tsx'];

/** 覆盖率排除模式 */
export const COVERAGE_EXCLUDE = ['**/*.test.ts', '**/*.test.tsx', '**/index.ts', '**/*.d.ts', '**/vitest.setup.ts'];

// ==================== 共享配置 ====================

/**
 * 基础测试配置
 */
export const baseTestConfig: UserConfig['test'] = {
  globals: true,
  environment: TEST_ENVIRONMENT,
  include: TEST_PATTERNS
};

/**
 * 基础覆盖率配置
 */
export const baseCoverageConfig: NonNullable<UserConfig['test']>['coverage'] = {
  provider: COVERAGE_PROVIDER,
  enabled: true,
  include: SOURCE_PATTERNS,
  exclude: COVERAGE_EXCLUDE
};
