# Packages 架构设计

## 📦 包分层架构

```
┌─────────────────────────────────────────────────────────────┐
│                      Applications                            │
│                  apps/admin, apps/mobile                     │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │ depends on
┌─────────────────────────────────────────────────────────────┐
│                    Feature Packages                          │
│         (业务特性包,包含运行时逻辑和组件)                         │
├─────────────────────────────────────────────────────────────┤
│  @skyroc/core          │  核心功能包(React hooks, context)     │
│  @skyroc/materials     │  UI 物料库(业务组件)                  │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │ depends on
┌─────────────────────────────────────────────────────────────┐
│                  Foundation Packages                         │
│         (基础设施包,提供底层能力)                               │
├─────────────────────────────────────────────────────────────┤
│  @skyroc/axios         │  HTTP 客户端封装                      │
│  @skyroc/utils         │  通用工具函数                         │
│  @skyroc/color         │  颜色处理工具                         │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │ depends on
┌─────────────────────────────────────────────────────────────┐
│                    Type Definitions                          │
│              (零依赖,纯类型定义)                               │
├─────────────────────────────────────────────────────────────┤
│  @skyroc/core-types    │  全局类型定义(零运行时依赖)             │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 包职责划分

### 1️⃣ Type Layer - 类型层(零依赖)

#### `@skyroc/core-types`

- **职责**: 全局类型定义
- **包含**: `.d.ts` 文件
- **依赖**: 无
- **特点**: 零运行时依赖,纯类型声明
- **使用场景**:
  - API 响应类型
  - 全局 namespace(Common, StorageType, I18n 等)
  - 配置类型(Theme, UnionKey 等)

```typescript
// 示例:全局类型声明
declare global {
  namespace Common {
    type Option<K = string, M = string> = { label: M; value: K };
  }
}
```

---

### 2️⃣ Foundation Layer - 基础设施层

#### `@skyroc/axios`

- **职责**: HTTP 客户端封装
- **依赖**: `axios`, `axios-retry`, `@skyroc/core-types`
- **导出**:
  - 请求拦截器
  - 响应拦截器
  - 实例创建工具

#### `@skyroc/utils`

- **职责**: 通用工具函数(纯函数)
- **依赖**: `dayjs`, `nanoid`, `clsx` 等
- **导出**:
  - 日期处理(`formatDate`, `parseDate`)
  - 字符串处理(`camelCase`, `kebabCase`)
  - 数组/对象处理(`pick`, `omit`, `deepMerge`)

#### `@skyroc/color`

- **职责**: 颜色处理工具
- **依赖**: `colord`
- **导出**:
  - 颜色转换
  - 颜色混合
  - 主题色生成

---

### 3️⃣ Feature Layer - 特性层(建议新增)

#### `@skyroc/core` ⭐ **建议新增**

- **职责**: React 核心功能包(运行时逻辑)
- **依赖**: `react`, `jotai`, `@tanstack/react-query`, `@skyroc/core-types`
- **导出**:
  - React Hooks(业务 hooks)
  - Context Providers
  - 状态管理(Jotai atoms)
  - React Query 配置

```typescript
// 示例:核心 hooks
export function useAuth() {
  const token = useAtomValue(tokenAtom);
  const login = useSetAtom(loginAtom);
  return { token, login };
}

export function useTheme() {
  const theme = useAtomValue(themeAtom);
  return theme;
}
```

#### `@skyroc/materials`

- **职责**: UI 物料库(业务组件)
- **依赖**: `react`, `antd`, `@skyroc/core`, `@skyroc/utils`
- **导出**:
  - 业务组件(PageContainer, ProTable, ProForm)
  - 布局组件(Layout, Header, Sidebar)

---

## 📐 为什么 @core 应该独立?

### ❌ 不要放在 core-types 中

| 原因             | 说明                                                 |
| ---------------- | ---------------------------------------------------- |
| **依赖污染**     | `core-types` 是零依赖的,加入运行时代码会破坏这一特性 |
| **职责混乱**     | 类型定义 vs 运行时逻辑是两个不同层次                 |
| **构建复杂**     | 类型包不需要构建,运行时包需要                        |
| **Tree-shaking** | 类型包全局引入,运行时包按需引入                      |

### ✅ 独立 @core 包的优势

| 优势          | 说明                              |
| ------------- | --------------------------------- |
| **清晰分层**  | 类型层 → 基础层 → 特性层 → 应用层 |
| **按需加载**  | 仅需要类型时不引入运行时代码      |
| **独立演进**  | 类型定义稳定,运行时逻辑可快速迭代 |
| **更好的 DX** | 开发者清楚知道哪个包提供什么能力  |

---

## 🚀 推荐的包创建顺序

如果要新增 `@skyroc/core` 包:

### 1. 创建包结构

```bash
packages/core/
├── src/
│   ├── hooks/              # React Hooks
│   │   ├── use-auth.ts
│   │   ├── use-theme.ts
│   │   └── index.ts
│   ├── store/              # Jotai atoms
│   │   ├── auth.ts
│   │   ├── theme.ts
│   │   └── index.ts
│   ├── providers/          # Context Providers
│   │   ├── AuthProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── index.ts
│   ├── query/              # React Query 配置
│   │   ├── client.ts
│   │   └── index.ts
│   └── index.ts            # 统一导出
├── package.json
├── tsconfig.json
└── README.md
```

### 2. package.json 配置

```json
{
  "name": "@skyroc/core",
  "version": "1.0.0",
  "description": "React 核心功能包 - hooks, store, providers",
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./hooks": "./src/hooks/index.ts",
    "./store": "./src/store/index.ts",
    "./providers": "./src/providers/index.ts",
    "./query": "./src/query/index.ts"
  },
  "peerDependencies": {
    "react": "catalog:peer",
    "react-dom": "catalog:peer"
  },
  "dependencies": {
    "@skyroc/core-types": "workspace:*",
    "@skyroc/utils": "workspace:*",
    "jotai": "catalog:core",
    "@tanstack/react-query": "catalog:core"
  }
}
```

### 3. 依赖关系

```
apps/admin
  → @skyroc/core
      → @skyroc/core-types (类型)
      → @skyroc/utils (工具)
      → react, jotai, react-query (外部依赖)
```

---

## 📊 包依赖图

```mermaid
graph TD
    A[apps/admin] --> B[@skyroc/core]
    A --> C[@skyroc/materials]

    B --> D[@skyroc/axios]
    B --> E[@skyroc/utils]
    B --> F[@skyroc/core-types]

    C --> B
    C --> D
    C --> E
    C --> F

    D --> F
    E --> F

    style F fill:#e1f5ff
    style B fill:#fff4e6
    style A fill:#f0f0f0
```

---

## 🎨 使用示例

### 在 apps/admin 中使用

```typescript
// 1. 使用类型(来自 core-types)
import type { Common, StorageType } from '@skyroc/core-types';

// 2. 使用工具函数(来自 utils)
import { formatDate, deepMerge } from '@skyroc/utils';

// 3. 使用核心功能(来自 core)
import { useAuth, useTheme } from '@skyroc/core/hooks';
import { AuthProvider } from '@skyroc/core/providers';

// 4. 使用 HTTP 客户端(来自 axios)
import { createAxiosInstance } from '@skyroc/axios';

// 5. 使用业务组件(来自 materials)
import { PageContainer, ProTable } from '@skyroc/materials';
```

---

## 💡 总结

**推荐做法**:

- ✅ 保持 `@skyroc/core-types` 专注于类型定义(零依赖)
- ✅ 创建独立的 `@skyroc/core` 包存放 React 核心功能
- ✅ 遵循分层架构:类型层 → 基础层 → 特性层 → 应用层

**不推荐做法**:

- ❌ 在 `core-types` 中混入运行时代码
- ❌ 跨层依赖(应用直接依赖类型包的运行时功能)
- ❌ 循环依赖(包之间相互引用)

---

**最后更新**: 2026-01-25
