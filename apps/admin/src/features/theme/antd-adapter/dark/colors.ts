import { adjustLightness, generateDarkModePalette, mixColor } from '@skyroc/color';

import type { ColorMap, GenerateColorMap, GenerateNeutralColorMap } from '../types';

/** 暗色模式默认基础色 */
export const DARK_BG_BASE = '#000';
export const DARK_TEXT_BASE = '#FFFFFF';

/**
 * 生成颜色调色板（暗色模式）
 *
 * 使用 generateOklchPaletteEx 算法替代 antd 的 @ant-design/colors
 * 参考 Ant Design 官方暗色算法，调色板映射需要特殊处理：
 *
 * 映射策略（参考 antd dark theme）：
 * - 1-4: 使用浅色段（50-300），用于背景和边框
 * - 5-7: 交叉映射中亮区（5→600, 6→500, 7→400），提升交互对比度
 * - 8-10: 复用 5-7（8→600, 9→500, 10→400），用于文字色
 */
export const generateColorPalettes: GenerateColorMap = (baseColor: string): ColorMap => {
  const { palettes } = generateDarkModePalette(baseColor);
  const [p50, p100, p200, p300, p400, p500, p600, p700, p800, p900, p950] = palettes;

  return {
    // antd 1-10 格式（暗色模式特殊映射，参考 antd 官方实现）
    1: p50.hex, // 50 - 最浅背景
    2: p100.hex, // 100 - 背景悬停
    3: p200.hex, // 200 - 边框
    4: p300.hex, // 300 - 边框悬停
    5: p600.hex, // 600 - 悬停色（暗色模式需要更亮）
    6: p500.hex, // 500 - 主色 ★
    7: p400.hex, // 400 - 激活色（暗色模式需要更亮）
    8: p600.hex, // 600 - 文字悬停
    9: p500.hex, // 500 - 文字色
    10: p400.hex, // 400 - 文字激活
    // Tailwind 50-950 格式（保持原始映射）
    50: p50.hex,
    100: p100.hex,
    200: p200.hex,
    300: p300.hex,
    400: p400.hex,
    500: p500.hex,
    600: p600.hex,
    700: p700.hex,
    800: p800.hex,
    900: p900.hex,
    950: p950.hex
  };
};

/**
 * 生成中性色调色板（暗色模式）
 *
 * 参考 Ant Design 官方暗色主题实现：
 * - 使用实色混合算法（而非透明度）
 * - 背景层级：Layout(基础) → Container(提升8) → Elevated(提升12)
 * - 文字透明度：85% / 65% / 45% / 25%
 * - 填充透明度：18% / 12% / 8% / 4%
 * - 边框使用固定亮度提升（26 / 19）
 *
 * 基础色：
 * - colorBgBase: #141414 (Ant Design 暗色背景)
 * - colorTextBase: #FFFFFF (纯白)
 */
export const generateNeutralColorPalettes: GenerateNeutralColorMap = (bgBaseColor: string, textBaseColor: string) => {
  const colorBgBase = bgBaseColor || DARK_BG_BASE;
  const colorTextBase = textBaseColor || DARK_TEXT_BASE;

  return {
    colorBgBase,
    colorTextBase,

    /**
     * 文字颜色层级
     * 参考 antd: 使用混合算法模拟透明度效果
     * 85% / 65% / 45% / 25%
     */
    colorText: mixColor(colorBgBase, colorTextBase, 0.85), // 主要文字
    colorTextSecondary: mixColor(colorBgBase, colorTextBase, 0.65), // 次要文字
    colorTextTertiary: mixColor(colorBgBase, colorTextBase, 0.45), // 占位符、禁用
    colorTextQuaternary: mixColor(colorBgBase, colorTextBase, 0.25), // 极弱文字

    /**
     * 填充颜色层级
     * 参考 antd: 18% / 12% / 8% / 4%
     * 用于按钮悬停、选中背景等
     */
    colorFill: mixColor(colorBgBase, colorTextBase, 0.18), // 主要填充
    colorFillSecondary: mixColor(colorBgBase, colorTextBase, 0.12), // 次要填充
    colorFillTertiary: mixColor(colorBgBase, colorTextBase, 0.08), // 分割线背景
    colorFillQuaternary: mixColor(colorBgBase, colorTextBase, 0.04), // 微弱填充

    /**
     * 实色背景
     * 参考 antd: 95% / 100% / 90%
     * 用于深色按钮、徽章等
     */
    colorBgSolid: mixColor(colorBgBase, colorTextBase, 0.95), // 实色背景
    colorBgSolidHover: colorTextBase, // 实色悬停（纯白）
    colorBgSolidActive: mixColor(colorBgBase, colorTextBase, 0.9), // 实色激活

    /**
     * 背景层级
     * 参考 antd: Layout(0) → Container(8) → Elevated(12)
     * 暗色模式下浮层需要更亮以体现层次
     */
    colorBgLayout: colorBgBase, // 页面底层背景（基础色）
    colorBgContainer: adjustLightness(colorBgBase, 8), // 卡片、容器背景（提升8）
    colorBgElevated: adjustLightness(colorBgBase, 12), // 弹窗、下拉框（提升12）
    colorBgSpotlight: adjustLightness(colorBgBase, 26), // 高亮聚焦（提升26）
    colorBgBlur: mixColor(colorBgBase, colorTextBase, 0.04), // 模糊背景（4%）

    /**
     * 边框颜色
     * 参考 antd: 固定亮度提升 26 / 26 / 19
     */
    colorBorder: adjustLightness(colorBgBase, 26), // 主边框
    colorBorderDisabled: adjustLightness(colorBgBase, 26), // 禁用边框（同主边框）
    colorBorderSecondary: adjustLightness(colorBgBase, 19) // 次要边框、分割线
  };
};
