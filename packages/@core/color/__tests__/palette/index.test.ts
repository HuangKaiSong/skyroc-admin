import { describe, expect, it } from 'vitest';
import { getColorPalette, getPaletteColorByNumber } from '../../src/palette';

const HEX_REGEX = /^#[0-9a-f]{6}$/;

// ==================== getColorPalette ====================

describe('getColorPalette', () => {
  it('默认（AntD）模式应返回 11 个颜色', () => {
    const map = getColorPalette('#1890ff');
    expect(map.size).toBe(11);
  });

  it('推荐模式应返回 11 个颜色', () => {
    const map = getColorPalette('#1890ff', true);
    expect(map.size).toBe(11);
  });

  it('所有颜色应为有效 hex', () => {
    const map = getColorPalette('#1890ff');
    map.forEach(hex => {
      expect(hex).toMatch(HEX_REGEX);
    });
  });

  it('应包含所有标准色阶', () => {
    const map = getColorPalette('#1890ff');
    const expectedNumbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    expectedNumbers.forEach(n => {
      expect(map.has(n as any)).toBe(true);
    });
  });

  it('AntD 和推荐模式应返回不同结果', () => {
    const antd = getColorPalette('#1890ff', false);
    const recommended = getColorPalette('#1890ff', true);
    // 至少某些色阶应不同
    let hasDiff = false;
    antd.forEach((hex, number) => {
      if (hex !== recommended.get(number)) {
        hasDiff = true;
      }
    });
    expect(hasDiff).toBe(true);
  });
});

// ==================== getPaletteColorByNumber ====================

describe('getPaletteColorByNumber', () => {
  it('应返回有效 hex', () => {
    expect(getPaletteColorByNumber('#1890ff', 500)).toMatch(HEX_REGEX);
  });

  it('推荐模式应返回有效 hex', () => {
    expect(getPaletteColorByNumber('#1890ff', 500, true)).toMatch(HEX_REGEX);
  });

  it('不同色阶应返回不同颜色', () => {
    const c50 = getPaletteColorByNumber('#1890ff', 50);
    const c950 = getPaletteColorByNumber('#1890ff', 950);
    expect(c50).not.toBe(c950);
  });
});
