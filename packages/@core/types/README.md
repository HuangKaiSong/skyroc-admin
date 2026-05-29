# @core/types

> 全局类型定义 - 跨平台支持

## 📦 包信息

- **包名**: `@core/types`
- **命名空间**: `@core/*`
- **版本**: `1.0.0`
- **平台**: Universal (Web)
- **依赖**: 无

## 🎯 职责定位

**核心职责**:

- 提供全局类型定义
- API 响应类型
- 业务实体类型
- 通用工具类型

**设计原则**:

- 零依赖
- 类型优先
- 模块化组织

## 📐 目录结构

```
@core/types/
├── src/
│   ├── api/
│   │   ├── auth.d.ts           # 认证相关类型
│   │   ├── route.d.ts          # 路由相关类型
│   │   ├── common.d.ts         # API 通用类型
│   │   ├── service.d.ts        # 服务配置类型
│   │   └── system-manage.d.ts  # 系统管理接口类型
│   ├── app/
│   │   ├── common.d.ts         # 通用类型
│   │   ├── global.d.ts         # 全局类型
│   │   ├── menu.d.ts           # 菜单类型
│   │   ├── router.d.ts         # 路由类型
│   │   ├── storage.d.ts        # 存储类型
│   │   ├── theme.d.ts          # 主题类型
│   │   └── union-key.d.ts      # 联合类型key
│   ├── locales/
│   │   └── i18n.d.ts           # 国际化类型
│   └── index.ts                # 统一导出
├── package.json
├── tsconfig.json
└── README.md
```

## 💡 使用示例

### 示例 1: API 类型使用

```ts
// 在 service 中使用
import type { Api } from '@core/types';

async function login(params: Api.Auth.LoginParams): Promise<Api.Service.Response<Api.Auth.LoginResponse>> {
  return axios.post('/auth/login', params);
}
```

### 示例 2: 主题类型使用

```ts
// 在主题包中使用
import type { Theme } from '@core/types';

const themeSettings: Theme.ThemeSetting = {
  themeScheme: 'light',
  themeColor: '#1890ff'
  // ...
};
```

### 示例 3: 存储类型使用

```ts
// 在存储包中使用
import type { StorageType } from '@core/types';

// 扩展存储schema
declare module '@core/storage' {
  interface StorageSchema extends StorageType.Local {}
}
```

### 示例 4: 全局类型使用

```ts
// 无需导入,直接使用全局命名空间
const option: Common.Option = {
  label: 'Option 1',
  value: '1'
};

const storage: StorageType.Local = {
  token: 'xxx',
  themeColor: '#1890ff'
  // ...
};
```

## 🔌 主要导出

### API 类型

- `Api.Auth` - 认证相关类型
- `Api.Route` - 路由相关类型
- `Api.Common` - 通用 API 类型
- `Api.Service` - 服务配置类型
- `Api.SystemManage` - 系统管理接口类型

### App 类型

- `App.Global` - 全局应用类型
- `Theme` - 主题配置类型
- `UnionKey` - 联合类型键

### 全局命名空间

- `Common` - 通用类型(Option, YesOrNo 等)
- `Menu` - 菜单类型
- `Router` - 路由类型
- `StorageType` - 存储类型
- `I18n` - 国际化类型

## 🔗 相关包

作为 `@core` 命名空间的一部分,相关包:

- `@core/types` - 类型定义(当前包)
- `@core/hooks` - React Hooks(规划中)
- `@core/store` - 状态管理(规划中)
- `@core/providers` - Context Providers(规划中)

---

**最后更新**: 2026-01-25
