import { defaultThemeSettings } from './config/default';
import { themeSettingsAtom } from './hooks';
import { mergeThemeSettings } from './utils/settings';

/**
 * Storage adapter interface
 *
 * 与 createStorage 返回的对象兼容，直接传 localStg 即可。
 */
interface ThemeStorage {
  get: (...args: any[]) => any;
  set: (...args: any[]) => void;
}

interface SetupThemeOptions {
  /** 当前构建时间，用于检测缓存覆盖（生产环境需要） */
  buildTime?: string;

  /** 是否生产环境（默认 false） */
  isProd?: boolean;

  /** 主题配置覆盖项，发布新版本时可强制覆盖用户缓存的某些配置 */
  overrides?: Partial<Theme.ThemeSetting>;

  /** 存储适配器，用于读写缓存的主题配置 */
  storage: ThemeStorage;
}

/**
 * 一次调用完成主题初始化
 *
 * 在 app 入口或 AntdProvider 之前调用，自动处理： - 默认配置加载 - localStorage 缓存读取（生产环境） - 版本覆盖检测 - Jotai atom 初始化
 *
 * @example
 *   ```ts
 *   import { setupTheme } from '@skyroc/web-admin-theme';
 *   import { localStg } from '@/utils/storage';
 *
 *   setupTheme({
 *     isProd: import.meta.env.PROD,
 *     buildTime: BUILD_TIME,
 *     storage: localStg
 *   });
 *   ```
 */
export function setupTheme(options: SetupThemeOptions) {
  const { buildTime, isProd = false, overrides, storage } = options;

  // 开发环境：直接使用默认配置
  if (!isProd) {
    themeSettingsAtom.init = defaultThemeSettings;
    return;
  }

  // 生产环境：从缓存加载 + 版本覆盖检测
  const cachedSettings = storage.get('themeSettings');

  let settings = mergeThemeSettings(cachedSettings, defaultThemeSettings);

  const isOverride = storage.get('overrideThemeFlag') === buildTime;

  if (!isOverride) {
    settings = mergeThemeSettings(overrides, settings);

    storage.set('overrideThemeFlag', buildTime);
  }

  themeSettingsAtom.init = settings;
}

/**
 * 类型安全的主题覆盖配置定义辅助函数
 *
 * @example
 *   ```ts
 *   export const themeOverrides = defineThemeOverrides({
 *     themeColor: '#6366F1',
 *     themeScheme: 'dark'
 *   });
 *   ```
 */
export function defineThemeOverrides(overrides: Partial<Theme.ThemeSetting>): Partial<Theme.ThemeSetting> {
  return overrides;
}
