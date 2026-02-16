import type { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterSetup: ['./jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  transformIgnorePatterns: ['node_modules/(?!(react-native|@react-native|nativewind|@skyroc|tailwind-variants)/)']
};

export default config;
