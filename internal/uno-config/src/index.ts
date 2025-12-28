import type { Preset, PresetWind4Theme, Rule } from 'unocss';
import { generateCSSVars, generateGlobalStyles } from './generate';
import { allShortcuts } from './shortcuts';
import themes from './theme.json';
import type { PresetShadcnOptions, ThemeColorKey, ThemeConfig, ThemeConfigColor, ThemeOptions } from './types';

export const builtinColors = themes.map(theme => theme.name) as ThemeConfigColor[];

export const builtinColorMap = themes.reduce(
  (acc, theme) => {
    acc[theme.name as ThemeConfigColor] = theme.cssVars.light.primary;
    return acc;
  },
  {} as Record<ThemeConfigColor, string>
);

export const builtinRadiuses = [0, 0.3, 0.5, 0.75, 1] as const;

/** Theme color keys */
const themeColorKeys = ['primary', 'info', 'success', 'warning', 'error'] as const;

const ANTD_PALETTE_NAMES = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'gold',
  'lime'
] as const;

/** Color palette number scale */
const colorPaletteNumbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

function buildAntdPalettes(name: string) {
  return {
    DEFAULT: `var(--${name})`,
    50: `var(--${name}-1)`,
    100: `var(--${name}-2)`,
    200: `var(--${name}-3)`,
    300: `var(--${name}-4)`,
    400: `var(--${name}-5)`,
    500: `var(--${name}-6)`,
    600: `var(--${name}-7)`,
    700: `var(--${name}-8)`,
    800: `var(--${name}-9)`,
    900: `var(--${name}-10)`
  };
}

function buildAntdMainPalette(name: string) {
  return {
    50: `var(--color-${name}-bg)`,
    100: `var(--color-${name}-bg-hover)`,
    200: `var(--color-${name}-border)`,
    300: `var(--color-${name}-border-hover)`,
    400: `var(--color-${name}-hover)`,
    500: `var(--color-${name}-active)`,
    600: `var(--color-${name})`,
    700: `var(--color-${name}-text-hover)`,
    800: `var(--color-${name}-text)`,
    900: `var(--color-${name}-text-active)`
  };
}
/**
 * Create color palette with semantic color variables for a single color
 *
 * @description
 * - 50-950: Color palette scale (50 lightest, 950 darkest)
 * - bg-lightest (50): Very light background
 * - bg-lighter (100): Lighter background
 * - bg-light (200): Light background
 * - border-light (300): Light border
 * - border (400): Normal border
 * - text (500): Main color text
 * - hover/text-hover (600): Hover state
 * - active/text-active (700): Active state
 *
 * @param name - Color name (e.g., 'primary', 'success')
 */
function createColorsPalette(name: string) {
  const colors = buildAntdMainPalette(name);
  return {
    ...colors,
    DEFAULT: `var(--color-${name})`,
    bg: `var(--color-${name}-bg)`,
    'bg-hover': `var(--color-${name}-bg-hover)`,
    border: `var(--color-${name}-border)`,
    'border-hover': `var(--color-${name}-border-hover)`,
    hover: `var(--color-${name}-hover)`,
    active: `var(--color-${name}-active)`,

    // Semantic color aliases
    light: `var(--color-${name}-border)`,
    lighter: `var(--color-${name}-border-hover)`,
    lightest: `var(--color-${name}-bg)`,

    text: `var(--color-${name}-text)`,
    'text-active': `var(--color-${name}-text-active)`,
    'text-hover': `var(--color-${name}-text-hover)`
  };
}

/**
 * Create color palette variables for all theme colors
 *
 * @description
 * Generate nested color objects for each theme color:
 * - primary: { DEFAULT, 50, 100, ..., foreground, hover, active, ... }
 * - success: { DEFAULT, 50, 100, ..., foreground, hover, active, ... }
 * - etc.
 *
 * This allows using classes like `text-primary-50`, `bg-success-100`, etc.
 */
function createColorPaletteVars() {
  const colorPaletteVar: Record<string, Record<string, string>> = {};

  themeColorKeys.forEach(color => {
    colorPaletteVar[color] = createColorsPalette(color);
  });

  return colorPaletteVar;
}

/** Generated color palette variables */
const colorPaletteVars = createColorPaletteVars();

/**
 * Create Ant Design color palette variables
 *
 * @description
 * Generate nested color objects for each Ant Design preset color:
 * - blue: { 50, 100, 200, ..., 900 }
 * - purple: { 50, 100, 200, ..., 900 }
 * - etc.
 */
function createAntdPaletteVars() {
  const antdPaletteVar: Record<string, Record<string, string>> = {};

  ANTD_PALETTE_NAMES.forEach(name => {
    antdPaletteVar[name] = buildAntdPalettes(name);
  });

  return antdPaletteVar;
}

/** Generated Ant Design palette variables */
const antdPaletteVars = createAntdPaletteVars();

const textVariants = [
  'base',
  'secondary',
  'tertiary',
  'quaternary',
  'placeholder',
  'disabled',
  'heading',
  'label',
  'description',
  'light-solid'
];

const radiusVariants = ['lg', 'md', 'sm', 'xs'] as const;

const radiusVariantsRules = radiusVariants.map(variant => {
  if (variant === 'md') {
    return [`radius-${variant}`, { 'border-radius': `var(--border-radius)` }];
  }
  return [`radius-${variant}`, { 'border-radius': `var(--border-radius-${variant})` }];
}) as Rule[];

const textVariantsRules = textVariants.map(variant => {
  if (variant === 'base') {
    return [`text-${variant}`, { color: `var(--color-text)` }];
  }
  return [`text-${variant}`, { color: `var(--color-text-${variant})` }];
}) as Rule[];

/**
 * The UnoCSS preset for Soybean Admin.
 *
 * @param options - The options for the preset.
 * @param globals - Whether to generate global variables, like *.border-color, body.color, body.background.
 */
export function presetSoybeanAdmin(globals = true): Preset<PresetWind4Theme> {
  return {
    name: 'unocss-preset-soybean-admin',
    preflights: [
      {
        getCSS: () => `
          @keyframes shadcn-down { from{ height: 0 } to { height: var(--radix-accordion-content-height)} }
          @keyframes shadcn-up { from{ height: var(--radix-accordion-content-height)} to { height: 0 } }
          @keyframes shadcn-collapsible-down { from{ height: 0 } to { height: var(--radix-collapsible-content-height)} }
          @keyframes shadcn-collapsible-up { from{ height: var(--radix-collapsible-content-height)} to { height: 0 } }
          @keyframes enter-x-animation { to { opacity: 1; transform: translateX(0); } }
          @keyframes enter-y-animation { to { opacity: 1; transform: translateY(0); } }



          ${globals ? generateGlobalStyles() : ''}
        `
      },
      {
        getCSS: () => `
          html.size-xs {
            font-size: 12px;
          }
          html.size-sm {
            font-size: 14px;
          }
          html.size-md {
            font-size: 16px;
          }
          html.size-lg {
            font-size: 18px;
          }
          html.size-xl {
            font-size: 20px;
          }
          html.size-2xl {
            font-size: 24px;
          }
        `
      }
    ],
    rules: [
      ...textVariantsRules,
      ...radiusVariantsRules,
      ['radius', { 'border-radius': `var(--border-radius)` }],
      // Accordion animations
      [
        'animate-accordion-down',
        {
          animation: 'shadcn-down 0.2s ease-out'
        }
      ],
      [
        'animate-accordion-up',
        {
          animation: 'shadcn-up 0.2s ease-out'
        }
      ],
      [
        'animate-collapsible-down',
        {
          animation: 'shadcn-collapsible-down 0.2s ease-out'
        }
      ],
      [
        'animate-collapsible-up',
        {
          animation: 'shadcn-collapsible-up 0.2s ease-out'
        }
      ],
      // Enter animations
      [
        /^enter-x:nth-child\((\d+)\)$/,
        ([, n]) => ({
          animation: `enter-x-animation 0.3s ease-in-out ${0.1 * Number(n)}s forwards`,
          opacity: '0',
          transform: 'translateX(50px)'
        })
      ],
      [
        /^enter-y:nth-child\((\d+)\)$/,
        ([, n]) => ({
          animation: `enter-y-animation 0.3s ease-in-out ${0.1 * Number(n)}s forwards`,
          opacity: '0',
          transform: 'translateY(50px)'
        })
      ],
      [
        /^-enter-x:nth-child\((\d+)\)$/,
        ([, n]) => ({
          animation: `enter-x-animation 0.3s ease-in-out ${0.1 * Number(n)}s forwards`,
          opacity: '0',
          transform: 'translateX(-50px)'
        })
      ],
      [
        /^-enter-y:nth-child\((\d+)\)$/,
        ([, n]) => ({
          animation: `enter-y-animation 0.3s ease-in-out ${0.1 * Number(n)}s forwards`,
          opacity: '0',
          transform: 'translateY(-50px)'
        })
      ]
    ],
    shortcuts: allShortcuts,
    theme: {
      colors: {
        // Flattened color palette variables (primary-50, success-100, etc.)
        ...colorPaletteVars,
        // Ant Design color palette variables (blue, purple, cyan, etc.)
        ...antdPaletteVars,
        // Layout colors (for admin layout)
        'base-text': 'var(--color-base-text)',
        'base-bg': 'var(--color-bg-base)',
        mask: 'var(--color-bg-mask)',
        link: {
          DEFAULT: 'var(--color-link)',
          hover: 'var(--color-link-hover)',
          active: 'var(--color-link-active)'
        },
        border: {
          DEFAULT: 'var(--color-border)',
          secondary: 'var(--color-border-secondary)',
          disabled: 'var(--color-border-disabled)'
        },
        container: {
          DEFAULT: 'var(--color-bg-container)',
          disabled: 'var(--color-bg-container-disabled)'
        },
        blur: 'var(--color-bg-blur)',
        inverted: 'var(--color-inverted)',
        layout: 'var(--color-bg-layout)',
        nprogress: 'var(--color-nprogress)'
      },
      spacing: {
        xxl: 'var(--size-xxl)',
        xl: 'var(--size-xl)',
        lg: 'var(--size-lg)',
        md: 'var(--size-md)',
        ms: 'var(--size-ms)',
        sm: 'var(--size-sm)',
        xs: 'var(--size-xs)',
        xxs: 'var(--size-xxs)'
      },
      text: {
        sm: { fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-sm)' },
        xs: { fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-sm)' },
        '2xs': { fontSize: 'var(--font-size)', lineHeight: 'var(--line-height)' },
        '3xs': { fontSize: 'var(--font-size-lg)', lineHeight: 'var(--line-height-lg)' },
        '4xs': { fontSize: 'var(--font-size-xl)', lineHeight: 'var(--line-height-lg)' },
        t1: { fontSize: 'var(--font-size-heading-1)', lineHeight: 'var(--line-height-heading-1)' },
        t2: { fontSize: 'var(--font-size-heading-2)', lineHeight: 'var(--line-height-heading-2)' },
        t3: { fontSize: 'var(--font-size-heading-3)', lineHeight: 'var(--line-height-heading-3)' },
        t4: { fontSize: 'var(--font-size-heading-4)', lineHeight: 'var(--line-height-heading-4)' },
        t5: { fontSize: 'var(--font-size-heading-5)', lineHeight: 'var(--line-height-heading-5)' },
        icon: { fontSize: '1.125rem', lineHeight: '1.125rem' },
        'icon-large': { fontSize: '1.5rem', lineHeight: '1.5rem' },
        'icon-small': { fontSize: '1rem', lineHeight: '1rem' },
        'icon-xl': { fontSize: '2rem', lineHeight: '2rem' },
        'icon-xs': { fontSize: '0.875rem', lineHeight: '0.875rem' }
      },
      shadow: {
        float: `0 6px 16px 0 rgb(0 0 0 / 8%),
          0 3px 6px -4px rgb(0 0 0 / 12%),
          0 9px 28px 8px rgb(0 0 0 / 5%)`,
        header: 'var(--header-box-shadow)',
        sider: 'var(--sider-box-shadow)',
        tab: 'var(--tab-box-shadow)'
      }
    }
  };
}

export { colorPaletteNumbers, colorPaletteVars, createColorPaletteVars, createColorsPalette, themeColorKeys };

export { antdPaletteVars, createAntdPaletteVars };

export { generateCSSVars, generateGlobalStyles };

export { textVariants };

export { allShortcuts, flexShortcuts, positionShortcuts, textShortcuts } from './shortcuts';

export default presetSoybeanAdmin;

export type { PresetShadcnOptions, ThemeColorKey, ThemeConfig, ThemeConfigColor, ThemeOptions };
