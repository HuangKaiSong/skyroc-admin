import { transformColorWithOpacity } from '@sa/color';
import type { ConfigProviderProps } from 'antd';
import { theme as antdTheme } from 'antd';
/**
 * Get antd theme
 *
 * @param colors Theme colors
 * @param darkMode Is dark mode
 */
export function getAntdTheme(colors: Theme.ThemeColor, darkMode: boolean, settings: Theme.ThemeSetting) {
  const { themeRadius, themeTextSize, tokens } = settings;

  const { darkAlgorithm, defaultAlgorithm } = antdTheme;

  const { error, info, primary, success, warning } = colors;

  const bgColor = transformColorWithOpacity(primary, darkMode ? 0.3 : 0.1, darkMode ? '#000000' : '#fff');
  const containerBgColor = darkMode ? tokens.dark?.colors?.container : tokens.light?.colors.container;
  const layoutBgColor = darkMode ? tokens.dark?.colors?.layout : tokens.light?.colors.layout;

  const theme: ConfigProviderProps['theme'] = {
    algorithm: [darkMode ? darkAlgorithm : defaultAlgorithm],
    cssVar: {
      prefix: ''
    },
    components: {
      Button: {
        controlHeightSM: 28
      },
      Collapse: {
        contentPadding: '16px 16px 24px 16px',
        headerBg: containerBgColor
      },
      Menu: {
        darkItemBg: 'transparent',
        darkSubMenuItemBg: 'transparent',
        itemMarginInline: 8,
        itemSelectedBg: bgColor,
        subMenuItemBg: 'transparent'
      }
    },
    token: {
      colorBgContainer: containerBgColor,
      colorBgLayout: layoutBgColor,
      colorError: error,
      colorInfo: info,
      fontSize: themeTextSize,
      colorPrimary: primary,
      borderRadius: themeRadius,
      colorSuccess: success,
      colorWarning: warning,
      blue: '#3B82F6',
      purple: '#8B5CF6',
      cyan: '#06B6D4',
      green: '#10B981',
      magenta: '#D946EF',
      pink: '#F472B6',
      red: '#EF4444',
      orange: '#F97316',
      yellow: '#EAB308',
      volcano: '#EA580C',
      geekblue: '#4F46E5',
      gold: '#D97706',
      lime: '#84CC16'
    }
  };

  return theme;
}
