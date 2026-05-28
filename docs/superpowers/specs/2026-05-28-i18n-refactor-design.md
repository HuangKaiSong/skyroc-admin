# i18n 重构设计文档

**日期：** 2026-05-28  
**范围：** `apps/admin/src/locales/` + `packages/web/admin-i18n/src/`  
**方案：** 方案 B — 统一第三方 locale 同步入口

---

## 背景与目标

### 现状问题

1. **第三方 locale 同步分散：** dayjs 同步在 `setupI18n({ onLocaleChange })` 里，`document.lang` 在 `LangEffect` 和 `syncThirdPartyLocale` 两处重复设置，antd 走 `useLang()` reactive。
2. **死代码：** `locales/locale.ts` 无人导入；`index.ts` 导出了 `loadLocaleMessages`、`reactI18nextInstance` 但无消费者。
3. **Bug：** `locales/dayjs.ts` 第 18 行引用了未 import 的 `globalConfig`。
4. **噪音层：** `admin-i18n` 包内的 `config/i18n.ts` 和 `features/lang/use-lang.ts` 仅做 re-export，无实质内容。

### 改进目标

- `setupI18n` 只负责初始化，不挂副作用回调
- `LangEffect.onLocaleChange` 成为所有响应式第三方同步的唯一入口
- 删除全部死代码和噪音层
- 修复 `globalConfig` 未引入 bug

---

## 职责边界

```
bootstrap.tsx
  setupI18n()          → 初始化 i18next，加载首次语言资源，配置 storage

GlobalEffect.tsx
  <LangEffect onLocaleChange={syncLocales} />
                       → 每次语言切换后统一触发第三方同步

syncLocales(lang)      → 唯一的第三方同步函数（当前只有 dayjs）

AntdProvider.tsx
  useLang().locale → antdLocales[locale] → <ConfigProvider locale={...} />
                       → antd 继续走 reactive re-render（天然合理）
```

---

## 变更清单

### `apps/admin/src/locales/`

| 文件 | 操作 | 说明 |
|------|------|------|
| `locale.ts` | **删除** | 无任何消费者 |
| `dayjs.ts` | **删除** | 逻辑迁移到 `sync.ts` |
| `index.ts` | **修改** | 删死代码，删 `onLocaleChange` 参数 |
| `sync.ts` | **新建** | 统一 `syncLocales(lang)` |
| `antd.ts` | 不动 | 仍被 AntdProvider 使用 |

**`locales/index.ts` 改后：**

```ts
import { setupI18n as setupCoreI18n } from '@skyroc/web-admin-i18n';
import type { LocaleSetupOptions } from '@skyroc/web-admin-i18n';
import { globalConfig } from '@/config';
import { localStg } from '@/utils/storage';

export async function setupI18n(options: LocaleSetupOptions<I18n.LangType> = {}) {
  await setupCoreI18n({
    defaultLocale: globalConfig.defaultLang,
    fallbackLocale: 'en-US',
    localeOptions: globalConfig.defaultLangOptions,
    missingWarn: import.meta.env.DEV,
    storage: {
      getLocale: () => localStg.get('lang'),
      setLocale: lang => localStg.set('lang', lang)
    },
    ...options
  });
}

export { $t } from '@skyroc/web-admin-i18n';
```

**`locales/sync.ts`（新建）：**

```ts
// oxlint-disable import/no-unassigned-import
import { locale } from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

const localMap: Record<I18n.LangType, string> = {
  'zh-CN': 'zh-cn',
  'en-US': 'en'
};

export function syncLocales(lang: I18n.LangType) {
  locale(localMap[lang]);
}
```

**`features/effects/GlobalEffect.tsx` 改后：**

```tsx
import { LangEffect } from '@skyroc/web-admin-i18n';
import { ThemeEffect } from '@skyroc/web-admin-theme';
import { syncLocales } from '@/locales/sync';

const GlobalEffect = () => (
  <>
    <ThemeEffect />
    <LangEffect onLocaleChange={syncLocales} />
  </>
);

export default GlobalEffect;
```

### `apps/admin/src/plugins/dayjs.ts`

`setupDayjs({ syncLocale })` 在插件初始化阶段调用一次（无参数，只能用默认语言），`LangEffect` mount 后会以正确语言覆盖它。`syncLocale` 是冗余的，直接移除。

改后：

```ts
import type { SetupDayjsOptions } from '@skyroc/web-admin-runtime';

export const adminDayjsPluginOptions: SetupDayjsOptions = {
  withLocaleData: true
};
```

### `packages/web/admin-i18n/src/`

| 文件 | 操作 | 说明 |
|------|------|------|
| `config/i18n.ts` | **删除** | 纯 re-export，无实质内容 |
| `features/lang/use-lang.ts` | **删除** | 纯 re-export，无实质内容 |
| `index.ts` | **修改** | 直接从 `./i18n` 导入，不经中间层 |
| `features/lang/LangEffect.tsx` | **修改** | import 路径改为 `../../hooks/use-lang` |
| `features/lang/LangSwitch.tsx` | **修改** | import 路径改为 `../../hooks/use-lang` |
| `locales.ts` | **保留但不再导出** | 从 `index.ts` 移除导出，减少公共 API 噪音 |

**`index.ts` 相关行改动：**

```ts
// 改前
export { getCurrentLang, initI18n, loadLocaleMessages, setLng } from './config/i18n';

// 改后
export { getCurrentLang, loadLocaleMessages, setLng, setupI18n as initI18n } from './i18n';
```

---

## 不变的部分

- `antd.ts` + `AntdProvider.tsx` 的 `useLang().locale` 模式不变
- `LangSwitch.tsx`、`useLang()` hook、Jotai atoms 均不变
- `setupI18n` 的公共接口签名不变（`LocaleSetupOptions` 仍接受所有参数）
- 所有 JSON 语言文件不动

---

## 验收标准

- [ ] 切换语言后 dayjs 语言同步正常（格式化日期随语言变化）
- [ ] 切换语言后 antd 组件语言同步正常（日期选择器、分页等）
- [ ] `document.documentElement.lang` 正确更新（只由 `LangEffect` 设置一次）
- [ ] TypeScript 无新增类型错误
- [ ] 删除的文件在代码库中无残留引用
