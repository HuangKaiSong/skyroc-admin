/* eslint-disable unocss/order */
import { textVariants } from '@sa/uno-config';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/manage/role/')({
  component: RouteComponent,
  staticData: {
    title: 'role',
    i18nKey: 'route.manage_role',
    menu: {
      icon: 'carbon:user-role',
      order: 2
    },
    permissions: ['R_SUPER']
  }
});

const colorKeys = [
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

type ColorKey = keyof typeof COLOR_PALETTE_MAP;
const paletteNumbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

// Predefine text variant classes for UnoCSS
const TEXT_VARIANT_MAP: Record<string, string> = {
  base: 'text-base',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  quaternary: 'text-quaternary',
  placeholder: 'text-placeholder',
  disabled: 'text-disabled',
  heading: 'text-heading',
  label: 'text-label',
  description: 'text-description',
  'light-solid': 'text-light-solid'
};

const COLOR_PALETTE_MAP = {
  blue: {
    50: 'bg-blue-50',
    100: 'bg-blue-100',
    200: 'bg-blue-200',
    300: 'bg-blue-300',
    400: 'bg-blue-400',
    500: 'bg-blue-500',
    600: 'bg-blue-600',
    700: 'bg-blue-700',
    800: 'bg-blue-800',
    900: 'bg-blue-900',
    950: 'bg-blue-950'
  },
  purple: {
    50: 'bg-purple-50',
    100: 'bg-purple-100',
    200: 'bg-purple-200',
    300: 'bg-purple-300',
    400: 'bg-purple-400',
    500: 'bg-purple-500',
    600: 'bg-purple-600',
    700: 'bg-purple-700',
    800: 'bg-purple-800',
    900: 'bg-purple-900',
    950: 'bg-purple-950'
  },
  cyan: {
    50: 'bg-cyan-50',
    100: 'bg-cyan-100',
    200: 'bg-cyan-200',
    300: 'bg-cyan-300',
    400: 'bg-cyan-400',
    500: 'bg-cyan-500',
    600: 'bg-cyan-600',
    700: 'bg-cyan-700',
    800: 'bg-cyan-800',
    900: 'bg-cyan-900',
    950: 'bg-cyan-950'
  },
  green: {
    50: 'bg-green-50',
    100: 'bg-green-100',
    200: 'bg-green-200',
    300: 'bg-green-300',
    400: 'bg-green-400',
    500: 'bg-green-500',
    600: 'bg-green-600',
    700: 'bg-green-700',
    800: 'bg-green-800',
    900: 'bg-green-900',
    950: 'bg-green-950'
  },
  magenta: {
    50: 'bg-magenta-50',
    100: 'bg-magenta-100',
    200: 'bg-magenta-200',
    300: 'bg-magenta-300',
    400: 'bg-magenta-400',
    500: 'bg-magenta-500',
    600: 'bg-magenta-600',
    700: 'bg-magenta-700',
    800: 'bg-magenta-800',
    900: 'bg-magenta-900',
    950: 'bg-magenta-950'
  },
  pink: {
    50: 'bg-pink-50',
    100: 'bg-pink-100',
    200: 'bg-pink-200',
    300: 'bg-pink-300',
    400: 'bg-pink-400',
    500: 'bg-pink-500',
    600: 'bg-pink-600',
    700: 'bg-pink-700',
    800: 'bg-pink-800',
    900: 'bg-pink-900',
    950: 'bg-pink-950'
  },
  red: {
    50: 'bg-red-50',
    100: 'bg-red-100',
    200: 'bg-red-200',
    300: 'bg-red-300',
    400: 'bg-red-400',
    500: 'bg-red-500',
    600: 'bg-red-600',
    700: 'bg-red-700',
    800: 'bg-red-800',
    900: 'bg-red-900',
    950: 'bg-red-950'
  },
  orange: {
    50: 'bg-orange-50',
    100: 'bg-orange-100',
    200: 'bg-orange-200',
    300: 'bg-orange-300',
    400: 'bg-orange-400',
    500: 'bg-orange-500',
    600: 'bg-orange-600',
    700: 'bg-orange-700',
    800: 'bg-orange-800',
    900: 'bg-orange-900',
    950: 'bg-orange-950'
  },
  yellow: {
    50: 'bg-yellow-50',
    100: 'bg-yellow-100',
    200: 'bg-yellow-200',
    300: 'bg-yellow-300',
    400: 'bg-yellow-400',
    500: 'bg-yellow-500',
    600: 'bg-yellow-600',
    700: 'bg-yellow-700',
    800: 'bg-yellow-800',
    900: 'bg-yellow-900',
    950: 'bg-yellow-950'
  },
  volcano: {
    50: 'bg-volcano-50',
    100: 'bg-volcano-100',
    200: 'bg-volcano-200',
    300: 'bg-volcano-300',
    400: 'bg-volcano-400',
    500: 'bg-volcano-500',
    600: 'bg-volcano-600',
    700: 'bg-volcano-700',
    800: 'bg-volcano-800',
    900: 'bg-volcano-900',
    950: 'bg-volcano-950'
  },
  geekblue: {
    50: 'bg-geekblue-50',
    100: 'bg-geekblue-100',
    200: 'bg-geekblue-200',
    300: 'bg-geekblue-300',
    400: 'bg-geekblue-400',
    500: 'bg-geekblue-500',
    600: 'bg-geekblue-600',
    700: 'bg-geekblue-700',
    800: 'bg-geekblue-800',
    900: 'bg-geekblue-900',
    950: 'bg-geekblue-950'
  },
  gold: {
    50: 'bg-gold-50',
    100: 'bg-gold-100',
    200: 'bg-gold-200',
    300: 'bg-gold-300',
    400: 'bg-gold-400',
    500: 'bg-gold-500',
    600: 'bg-gold-600',
    700: 'bg-gold-700',
    800: 'bg-gold-800',
    900: 'bg-gold-900',
    950: 'bg-gold-950'
  },
  lime: {
    50: 'bg-lime-50',
    100: 'bg-lime-100',
    200: 'bg-lime-200',
    300: 'bg-lime-300',
    400: 'bg-lime-400',
    500: 'bg-lime-500',
    600: 'bg-lime-600',
    700: 'bg-lime-700',
    800: 'bg-lime-800',
    900: 'bg-lime-900',
    950: 'bg-lime-950'
  }
} as const;

function ColorPaletteCard({ color }: { color: ColorKey }) {
  return (
    <div className="border border-border radius-lg bg-card p-4">
      <h3 className="mb-3 text-lg font-semibold capitalize">{color}</h3>
      {/* 色阶展示 */}
      <div className="mb-3 flex gap-1">
        {paletteNumbers.map(num => (
          <div
            className={`${COLOR_PALETTE_MAP[color][num]} h-8 w-8 radius-md flex-center text-3xs font-mono`}
            key={num}
            title={`${color}-${num}`}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}

function RouteComponent() {
  return (
    <div className="min-h-full bg-background p-6 space-y-8">
      {/* 页面标题 */}
      <div className="enter-y:nth-child(1)">
        <h1 className="mb-2 text-3xl text-foreground font-bold">🎨 UnoCSS 主题测试</h1>
        <p className="text-secondary">测试 @sa/uno-config 预设的各种颜色和样式效果</p>
        <p className="text-secondary">这是专门为antd打造的unocss预设</p>
      </div>

      {/* 主题色语义化属性 */}
      <section className="enter-y:nth-child(2)">
        <h2 className="mb-4 flex items-center gap-2 text-xl text-foreground font-semibold">
          <span className="i-carbon:color-palette text-primary" />
          主题色语义化属性 (themeColorKeys)
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          展示 primary、info、success、warning、error 五种主题色的所有语义化属性
        </p>
        <div className="space-y-6">
          {/* Primary */}
          <div className="border border-border  radius-md bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-primary">Primary 主色</h3>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 md:grid-cols-3">
              <div className="radius bg-primary p-3 text-center text-xs">
                <div className="text-white font-medium">DEFAULT</div>
                <div className="mt-1 text-white opacity-80">bg-primary</div>
              </div>
              <div className="radius bg-primary-bg p-3 text-center text-xs">
                <div className="text-primary-text font-medium">bg</div>
                <div className="mt-1 text-primary-text opacity-80">bg-primary-bg</div>
              </div>
              <div className="radius bg-primary-bg-hover p-3 text-center text-xs">
                <div className="text-primary-text font-medium">bg-hover</div>
                <div className="mt-1 text-primary-text opacity-80">bg-primary-bg-hover</div>
              </div>
              <div className="border-2 border-primary-border radius bg-card p-3 text-center text-xs">
                <div className="text-foreground font-medium">border</div>
                <div className="mt-1 text-muted-foreground">border-primary-border</div>
              </div>
              <div className="border-2 border-primary-border-hover radius bg-card p-3 text-center text-xs">
                <div className="text-foreground font-medium">border-hover</div>
                <div className="mt-1 text-muted-foreground">border-primary-border-hover</div>
              </div>
              <div className="radius bg-primary-hover p-3 text-center text-xs">
                <div className="text-white font-medium">hover</div>
                <div className="mt-1 text-white opacity-80">bg-primary-hover</div>
              </div>
              <div className="radius bg-primary-active p-3 text-center text-xs">
                <div className="text-white font-medium">active</div>
                <div className="mt-1 text-white opacity-80">bg-primary-active</div>
              </div>
              <div className="radius bg-primary-lightest p-3 text-center text-xs">
                <div className="text-primary-text font-medium">lightest</div>
                <div className="mt-1 text-primary-text opacity-80">bg-primary-lightest</div>
              </div>
              <div className="radius bg-primary-lighter p-3 text-center text-xs">
                <div className="text-primary-text font-medium">lighter</div>
                <div className="mt-1 text-primary-text opacity-80">bg-primary-lighter</div>
              </div>
              <div className="radius bg-primary-light p-3 text-center text-xs">
                <div className="text-primary-text font-medium">light</div>
                <div className="mt-1 text-primary-text opacity-80">bg-primary-light</div>
              </div>
              <div className="radius bg-card p-3 text-center text-xs text-primary-text">
                <div className="font-medium">text</div>
                <div className="mt-1 opacity-80">text-primary-text</div>
              </div>
              <div className="radius bg-card p-3 text-center text-xs text-primary-text-hover">
                <div className="font-medium">text-hover</div>
                <div className="mt-1 opacity-80">text-primary-text-hover</div>
              </div>
              <div className="radius bg-card p-3 text-center text-xs text-primary-text-active">
                <div className="font-medium">text-active</div>
                <div className="mt-1 opacity-80">text-primary-text-active</div>
              </div>
            </div>
            {/* 色阶展示 */}
            <div className="mt-4">
              <h4 className="mb-2 text-sm text-muted-foreground font-medium">色阶 (50-900)</h4>
              <div className="flex gap-1">
                <div className="bg-primary-50 h-12 flex-1 flex-center radius text-2xs font-mono text-white">50</div>
                <div className="bg-primary-100 h-12 flex-1 flex-center radius text-2xs font-mono text-white">100</div>
                <div className="bg-primary-200 h-12 flex-1 flex-center radius text-2xs font-mono text-white">200</div>
                <div className="bg-primary-300 h-12 flex-1 flex-center radius text-2xs font-mono text-white">300</div>
                <div className="bg-primary-400 h-12 flex-1 flex-center radius text-2xs font-mono text-white">400</div>
                <div className="bg-primary-500 h-12 flex-1 flex-center radius text-2xs font-mono text-white">500</div>
                <div className="bg-primary-600 h-12 flex-1 flex-center radius text-2xs font-mono text-white">600</div>
                <div className="bg-primary-700 h-12 flex-1 flex-center radius text-2xs font-mono text-white">700</div>
                <div className="bg-primary-800 h-12 flex-1 flex-center radius text-2xs font-mono text-white">800</div>
                <div className="bg-primary-900 h-12 flex-1 flex-center radius text-2xs font-mono text-white">900</div>
              </div>
            </div>
          </div>

          {/* Success */}
          <div className="border border-border radius-lg bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-success">Success 成功</h3>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 md:grid-cols-3">
              <div className="radius bg-success p-3 text-center text-xs">
                <div className="text-white font-medium">DEFAULT</div>
                <div className="mt-1 text-white opacity-80">bg-success</div>
              </div>
              <div className="radius bg-success-bg p-3 text-center text-xs">
                <div className="text-success-text font-medium">bg</div>
                <div className="mt-1 text-success-text opacity-80">bg-success-bg</div>
              </div>
              <div className="radius bg-success-hover p-3 text-center text-xs">
                <div className="text-white font-medium">hover</div>
                <div className="mt-1 text-white opacity-80">bg-success-hover</div>
              </div>
              <div className="radius bg-success-active p-3 text-center text-xs">
                <div className="text-white font-medium">active</div>
                <div className="mt-1 text-white opacity-80">bg-success-active</div>
              </div>
              <div className="radius bg-card p-3 text-center text-xs text-success-text">
                <div className="font-medium">text</div>
                <div className="mt-1 opacity-80">text-success-text</div>
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              <div className="bg-success-50 h-12 flex-1 flex-center radius text-2xs font-mono text-white">50</div>
              <div className="bg-success-100 h-12 flex-1 flex-center radius text-2xs font-mono text-white">100</div>
              <div className="bg-success-200 h-12 flex-1 flex-center radius text-2xs font-mono text-white">200</div>
              <div className="bg-success-300 h-12 flex-1 flex-center radius text-2xs font-mono text-white">300</div>
              <div className="bg-success-400 h-12 flex-1 flex-center radius text-2xs font-mono text-white">400</div>
              <div className="bg-success-500 h-12 flex-1 flex-center radius text-2xs font-mono text-white">500</div>
              <div className="bg-success-600 h-12 flex-1 flex-center radius text-2xs font-mono text-white">600</div>
              <div className="bg-success-700 h-12 flex-1 flex-center radius text-2xs font-mono text-white">700</div>
              <div className="bg-success-800 h-12 flex-1 flex-center radius text-2xs font-mono text-white">800</div>
              <div className="bg-success-900 h-12 flex-1 flex-center radius text-2xs font-mono text-white">900</div>
            </div>
          </div>

          {/* Info */}
          <div className="border border-border radius-lg bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-info">Info 信息</h3>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 md:grid-cols-3">
              <div className="radius bg-info p-3 text-center text-xs">
                <div className="text-white font-medium">DEFAULT</div>
                <div className="mt-1 text-white opacity-80">bg-info</div>
              </div>
              <div className="radius bg-info-bg p-3 text-center text-xs">
                <div className="text-info-text font-medium">bg</div>
                <div className="mt-1 text-info-text opacity-80">bg-info-bg</div>
              </div>
              <div className="radius bg-info-hover p-3 text-center text-xs">
                <div className="text-white font-medium">hover</div>
                <div className="mt-1 text-white opacity-80">bg-info-hover</div>
              </div>
              <div className="radius bg-info-active p-3 text-center text-xs">
                <div className="text-white font-medium">active</div>
                <div className="mt-1 text-white opacity-80">bg-info-active</div>
              </div>
              <div className="radius bg-card p-3 text-center text-xs text-info-text">
                <div className="font-medium">text</div>
                <div className="mt-1 opacity-80">text-info-text</div>
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              <div className="bg-info-50 h-12 flex-1 flex-center radius text font-mono text-white">50</div>
              <div className="bg-info-100 h-12 flex-1 flex-center radius text-2xs font-mono text-white">100</div>
              <div className="bg-info-200 h-12 flex-1 flex-center radius text-2xs font-mono text-white">200</div>
              <div className="bg-info-300 h-12 flex-1 flex-center radius text-2xs font-mono text-white">300</div>
              <div className="bg-info-400 h-12 flex-1 flex-center radius text-2xs font-mono text-white">400</div>
              <div className="bg-info-500 h-12 flex-1 flex-center radius text-2xs font-mono text-white">500</div>
              <div className="bg-info-600 h-12 flex-1 flex-center radius text-2xs font-mono text-white">600</div>
              <div className="bg-info-700 h-12 flex-1 flex-center radius text-2xs font-mono text-white">700</div>
              <div className="bg-info-800 h-12 flex-1 flex-center radius text-2xs font-mono text-white">800</div>
              <div className="bg-info-900 h-12 flex-1 flex-center radius text-2xs font-mono text-white">900</div>
            </div>
          </div>

          {/* Warning */}
          <div className="border border-border radius-lg bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-warning">Warning 警告</h3>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 md:grid-cols-3">
              <div className="radius bg-warning p-3 text-center text-xs">
                <div className="text-white font-medium">DEFAULT</div>
                <div className="mt-1 text-white opacity-80">bg-warning</div>
              </div>
              <div className="radius bg-warning-bg p-3 text-center text-xs">
                <div className="text-warning-text font-medium">bg</div>
                <div className="mt-1 text-warning-text opacity-80">bg-warning-bg</div>
              </div>
              <div className="radius bg-warning-hover p-3 text-center text-xs">
                <div className="text-white font-medium">hover</div>
                <div className="mt-1 text-white opacity-80">bg-warning-hover</div>
              </div>
              <div className="radius bg-warning-active p-3 text-center text-xs">
                <div className="text-white font-medium">active</div>
                <div className="mt-1 text-white opacity-80">bg-warning-active</div>
              </div>
              <div className="radius bg-card p-3 text-center text-xs text-warning-text">
                <div className="font-medium">text</div>
                <div className="mt-1 opacity-80">text-warning-text</div>
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              <div className="bg-warning-50 h-12 flex-1 flex-center radius text-2xs font-mono text-white">50</div>
              <div className="bg-warning-100 h-12 flex-1 flex-center radius text-2xs font-mono text-white">100</div>
              <div className="bg-warning-200 h-12 flex-1 flex-center radius text-2xs font-mono text-white">200</div>
              <div className="bg-warning-300 h-12 flex-1 flex-center radius text-2xs font-mono text-white">300</div>
              <div className="bg-warning-400 h-12 flex-1 flex-center radius text-2xs font-mono text-white">400</div>
              <div className="bg-warning-500 h-12 flex-1 flex-center radius text-2xs font-mono text-white">500</div>
              <div className="bg-warning-600 h-12 flex-1 flex-center radius text-2xs font-mono text-white">600</div>
              <div className="bg-warning-700 h-12 flex-1 flex-center radius text-2xs font-mono text-white">700</div>
              <div className="bg-warning-800 h-12 flex-1 flex-center radius text-2xs font-mono text-white">800</div>
              <div className="bg-warning-900 h-12 flex-1 flex-center radius text-2xs font-mono text-white">900</div>
            </div>
          </div>

          {/* Error */}
          <div className="border border-border radius-lg bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-error">Error 错误</h3>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 md:grid-cols-3">
              <div className="radius bg-error p-3 text-center text-xs">
                <div className="text-white font-medium">DEFAULT</div>
                <div className="mt-1 text-white opacity-80">bg-error</div>
              </div>
              <div className="radius bg-error-bg p-3 text-center text-xs">
                <div className="text-error-text font-medium">bg</div>
                <div className="mt-1 text-error-text opacity-80">bg-error-bg</div>
              </div>
              <div className="radius bg-error-hover p-3 text-center text-xs">
                <div className="text-white font-medium">hover</div>
                <div className="mt-1 text-white opacity-80">bg-error-hover</div>
              </div>
              <div className="radius bg-error-active p-3 text-center text-xs">
                <div className="text-white font-medium">active</div>
                <div className="mt-1 text-white opacity-80">bg-error-active</div>
              </div>
              <div className="radius bg-card p-3 text-center text-xs text-error-text">
                <div className="font-medium">text</div>
                <div className="mt-1 opacity-80">text-error-text</div>
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              <div className="bg-error-50 h-12 flex-1 flex-center radius text-2xs font-mono text-white">50</div>
              <div className="bg-error-100 h-12 flex-1 flex-center radius text-2xs font-mono text-white">100</div>
              <div className="bg-error-200 h-12 flex-1 flex-center radius text-2xs font-mono text-white">200</div>
              <div className="bg-error-300 h-12 flex-1 flex-center radius text-2xs font-mono text-white">300</div>
              <div className="bg-error-400 h-12 flex-1 flex-center radius text-2xs font-mono text-white">400</div>
              <div className="bg-error-500 h-12 flex-1 flex-center radius text-2xs font-mono text-white">500</div>
              <div className="bg-error-600 h-12 flex-1 flex-center radius text-2xs font-mono text-white">600</div>
              <div className="bg-error-700 h-12 flex-1 flex-center radius text-2xs font-mono text-white">700</div>
              <div className="bg-error-800 h-12 flex-1 flex-center radius text-2xs font-mono text-white">800</div>
              <div className="bg-error-900 h-12 flex-1 flex-center radius text-2xs font-mono text-white">900</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ant Design 色板 */}
      <section className="enter-y:nth-child(3)">
        <h2 className="mb-4 flex items-center gap-2 text-xl text-foreground font-semibold">
          <span className="i-carbon:palette text-primary" />
          Ant Design 预设色板
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {colorKeys.map(color => (
            <ColorPaletteCard
              color={color}
              key={`${color}`}
            />
          ))}
        </div>
      </section>

      {/* 快捷方式演示 */}
      <section className="enter-y:nth-child(5)">
        <h2 className="mb-4 flex items-center gap-2 text-xl text-foreground font-semibold">
          <span className="i-carbon:keyboard text-success" />
          Shortcuts 快捷方式
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Flex 快捷方式 */}
          <div className="border border-border radius-lg bg-card p-4">
            <h3 className="mb-3 text-foreground font-medium">Flex</h3>
            <div className="space-y-2">
              <div className="bg-primary-lightest border-primary-border h-16 flex-center border radius">
                flex-center
              </div>
              <div className="bg-success-lightest border-success-border h-16 flex-col-center border radius">
                flex-col-center
              </div>
              <div className="bg-info-lightest border-info-border h-12 flex-x-center border radius">flex-x-center</div>
              <div className="bg-warning-lightest border-warning-border h-12 flex-y-center border radius">
                flex-y-center
              </div>
            </div>
          </div>

          {/* Position 快捷方式 */}
          <div className="border border-border radius-lg bg-card p-4">
            <h3 className="mb-3 text-label font-medium">Position</h3>
            <div className="relative h-40 radius">
              <div className="absolute-lt z-100  bg-primary p-2 text-xs text-placeholder">LT</div>
              <div className="absolute-rt  bg-success p-2 text-xs text-white z-100">RT</div>
              <div className="absolute-lb bg-warning p-2 text-xs text-placeholder z-100">LB</div>
              <div className="absolute-rb bg-error p-2 text-xs text-placeholder z-100">RB</div>
              <div className="absolute-center  radius p-2 text-xs text-placeholder z-1">CENTER</div>
            </div>
          </div>

          {/* Text 快捷方式 */}
          <div className="border border-border radius-lg bg-card p-4">
            <h3 className="mb-3 text-foreground font-medium">Text</h3>
            <div className="flex-col col-gap-2">
              <p className="nowrap-hidden radius bg-green-400 text-secondary p-2 text-sm">
                这是一段很长很长的文本，会被截断并显示省略号...这是一段很长很长的文本
              </p>
              <p className="ellipsis-text radius bg-lime-400 text-secondary p-2 text-sm">
                这是一段很长很长的文本，会被截断并显示省略号...这是一段很长很长的文本
              </p>
              <p className="text-icon text-primary">text-icon (1.125rem)</p>
              <p className="text-icon-large text-success">text-icon-large (1.5rem)</p>
              <p className="text-icon-small text-info">text-icon-small (1rem)</p>
            </div>
          </div>

          {/* Text Variants 文本颜色变体 */}
          <div className="border border-border radius-lg bg-card p-4">
            <h3 className="mb-3 text-foreground font-medium">Text Color Variants</h3>
            <div className="space-y-2">
              {textVariants.map(variant => {
                const textClass = TEXT_VARIANT_MAP[variant];
                return (
                  <div
                    className="flex items-center gap-3"
                    key={variant}
                  >
                    <code className={`${textClass} min-w-40 font-mono text-sm`}>{textClass}</code>
                    <span className={textClass}>这是 {variant} 文本颜色示例</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 圆角与阴影 */}
      <section className="enter-y:nth-child(7)">
        <h2 className="mb-4 flex items-center gap-2 text-xl text-foreground font-semibold">
          <span className="i-carbon:box text-error" />
          圆角与阴影
        </h2>
        <div className="flex flex-wrap gap-4">
          <div className="border border-border radius-sm bg-primary p-6 text-center">
            <div className="text-sm text-#fff">radius-sm</div>
          </div>
          <div className="border border-border radius-md bg-success p-6 text-center">
            <div className="text-sm text-#fff">radius-md</div>
          </div>
          <div className="border border-border radius-lg bg-info p-6 text-center">
            <div className="text-sm text-#fff">radius-lg</div>
          </div>
          <div className="border border-border radius-xs bg-warning p-6 text-center">
            <div className="text-sm text-#fff">radius-xs</div>
          </div>
        </div>
      </section>

      {/* 按钮样式演示 */}
      <section className="enter-y:nth-child(8) ">
        <h2 className="mb-4 flex items-center gap-2 text-xl text-foreground font-semibold">
          <span className="i-carbon:touch-1 bg-lime-300 text-gray-800" />
          按钮颜色示例
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            className="bg-primary radius-md px-4 py-2 text-white hover:bg-primary-hover active:bg-primary-active capitalize transition-colors"
            type="button"
          >
            primary
          </button>
          <button
            className="bg-info radius-md px-4 py-2 text-white hover:bg-info-hover active:bg-info-active capitalize transition-colors"
            type="button"
          >
            info
          </button>

          <button
            className="bg-success radius-md px-4 py-2 text-white hover:bg-success-hover active:bg-success-active capitalize transition-colors"
            type="button"
          >
            success
          </button>

          <button
            className="bg-warning radius-md px-4 py-2 text-white hover:bg-warning-hover active:bg-warning-active capitalize transition-colors"
            type="button"
          >
            warning
          </button>

          <button
            className="bg-error radius-md px-4 py-2 text-white hover:bg-error-hover active:bg-error-active capitalize transition-colors"
            type="button"
          >
            error
          </button>
        </div>
      </section>

      {/* Card Wrapper 快捷方式 */}
      <section className="enter-y:nth-child(9) card">
        <h2 className="mb-4 flex items-center column-gap-2 text-xl text-base font-semibold">
          <span className="i-carbon:catalog text-primary" />
          Card Wrapper
        </h2>
        <div className="card-wrapper">
          <h3 className="mb-2 text-lg font-medium">这是一个 card-wrapper</h3>
          <p className="text-secondary">使用 card-wrapper 快捷类创建的卡片容器，自带圆角、背景和内边距。</p>
        </div>
      </section>
    </div>
  );
}
