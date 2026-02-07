import { useTheme } from '@skyroc/web-admin-theme';

/**
 * App 级别的主题 hook（useTheme 的别名）
 *
 * 保持向后兼容，30+ 个组件引用此名称。
 * 主题初始化由本模块顶部的 setupTheme 完成，无需额外配置。
 */
export const useSettingsTheme = useTheme;
