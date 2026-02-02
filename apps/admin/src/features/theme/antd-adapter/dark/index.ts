import { mixColor } from '@skyroc/color';
import type { MapToken, PresetColorType, SeedToken } from 'antd/lib/theme/interface';

import defaultAlgorithm from '../default';
import { defaultPresetColors } from '../seed';
import genColorMapToken, {
  FUNCTIONAL_SEMANTIC_CONFIG,
  genPaletteVars,
  genSemanticColors
} from '../shared/genColorMapToken';

import { generateColorPalettes, generateNeutralColorPalettes } from './colors';

// 导出生成器函数，方便外部使用
export { generateColorPalettes, generateNeutralColorPalettes };

/**
 * 暗色模式主题算法
 *
 * 参考 Ant Design 官方暗色主题实现：
 * 1. 使用 generateOklchPaletteEx 算法生成色板（替代 @ant-design/colors）
 * 2. 特殊的颜色映射策略（5→600, 6→500, 7→400）
 * 3. 定制 colorPrimaryBg 以优化选中项背景色
 *
 * 生成内容：
 * - antd 格式调色板: blue-1, blue1, ... blue-10, blue10
 * - Tailwind 格式调色板: blue-50, blue-100, ... blue-950
 * - 语义化颜色: colorBlueBg, colorBlueHover, colorBlue, colorBlueActive, ...
 * - 中性色系统: colorText, colorBgContainer, colorBorder 等
 */
export default function derivativeDark(token: SeedToken, mapToken?: MapToken): MapToken {
  // 为所有预设颜色生成调色板和语义化颜色
  const colorPalettes = Object.keys(defaultPresetColors)
    .map(colorKey => {
      const baseColor = token[colorKey as keyof PresetColorType];

      if (!baseColor) return {};

      const colors = generateColorPalettes(baseColor);

      const result = genPaletteVars(colorKey, colors);

      // 生成语义化颜色: colorBlueBg, colorBlueHover, colorBlue, ...
      const capitalizedKey = colorKey.charAt(0).toUpperCase() + colorKey.slice(1);
      const semanticColors = genSemanticColors({
        colors,
        config: FUNCTIONAL_SEMANTIC_CONFIG,
        name: capitalizedKey
      });

      // Error 色特殊处理
      if (colorKey === 'colorError') {
        result.colorErrorBgActive = colors[3];
        result.colorErrorBgFilledHover = mixColor(colors[1], colors[3], 0.5);
      }

      Object.assign(result, semanticColors);

      return result;
    })
    .reduce<MapToken>((prev, cur) => {
      return { ...prev, ...cur };
    }, {} as MapToken);

  // 生成中性色映射（背景、文字、边框等）
  const colorMapToken = genColorMapToken(token, {
    generateNeutralColorPalettes
  });

  const mergedMapToken = mapToken ?? defaultAlgorithm(token);

  return {
    ...mergedMapToken,
    ...colorPalettes,

    // 中性色映射
    ...colorMapToken,

    /**
     * 暗色模式特殊定制
     * 参考 Ant Design 官方实现：
     * https://github.com/ant-design/ant-design/issues/30524#issuecomment-871961867
     *
     * 使用 colorPrimaryBorder 作为选中项背景，提供更好的视觉反馈
     */
    colorPrimaryBg: colorMapToken.colorPrimaryBorder,
    colorPrimaryBgHover: colorMapToken.colorPrimaryBorderHover
  };
}
