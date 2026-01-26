# @core 命名空间

## 📦 命名空间说明

`@core` 是项目的核心功能命名空间,包含所有核心基础包。

## 🗂️ 包组织结构

```
packages/@core/
├── types/              → @core/types         # 全局类型定义
├── hooks/              → @core/hooks         # React Hooks 集合(未来)
├── store/              → @core/store         # 状态管理(未来)
├── providers/          → @core/providers     # Context Providers(未来)
└── utils/              → @core/utils         # 核心工具函数(未来)
```

## 🎯 设计理念

### 为什么使用命名空间?

1. **清晰的包组织**
   - 相关功能包聚合在一起
   - 一眼就能识别核心包 vs 工具包

2. **更好的可扩展性**
   ```
   @core/types          ← 类型定义
   @core/hooks          ← React Hooks
   @core/store          ← 状态管理

   vs

   core-types           ← 难以区分
   core-hooks           ← 命名冗余
   core-store           ← 不够清晰
   ```

3. **符合社区最佳实践**
   - `@tanstack/react-query`, `@tanstack/react-router`
   - `@radix-ui/react-dialog`, `@radix-ui/react-select`
   - `@mui/material`, `@mui/icons-material`

## 📋 当前包列表

### @core/types
- **包名**: `@core/types`
- **原名**: `@skyroc/core-types`
- **职责**: 全局类型定义
- **依赖**: 零依赖
- **状态**: ✅ 已迁移

## 🚀 未来规划

### @core/hooks (规划中)
- **职责**: React Hooks 集合
- **依赖**: `react`, `@core/types`
- **导出**:
  ```typescript
  export { useAuth } from './use-auth';
  export { useTheme } from './use-theme';
  export { usePermission } from './use-permission';
  ```

### @core/store (规划中)
- **职责**: 全局状态管理
- **依赖**: `jotai`, `@core/types`
- **导出**:
  ```typescript
  export { authAtom, tokenAtom } from './auth';
  export { themeAtom, colorAtom } from './theme';
  ```

### @core/providers (规划中)
- **职责**: React Context Providers
- **依赖**: `react`, `@core/types`, `@core/store`
- **导出**:
  ```typescript
  export { AuthProvider } from './AuthProvider';
  export { ThemeProvider } from './ThemeProvider';
  ```

## 🎨 使用示例

```typescript
// 类型定义
import type { Common, StorageType } from '@core/types';

// Hooks (未来)
import { useAuth, useTheme } from '@core/hooks';

// 状态管理 (未来)
import { authAtom, themeAtom } from '@core/store';

// Providers (未来)
import { AuthProvider, ThemeProvider } from '@core/providers';
```

## 📐 命名空间 vs 独立包

### @core 命名空间下的包
- **适用场景**: 核心功能,紧密关联,频繁一起使用
- **优势**: 清晰的组织,统一的命名规范
- **示例**: `@core/types`, `@core/hooks`, `@core/store`

### 独立包(非命名空间)
- **适用场景**: 独立功能,可单独使用,跨项目复用
- **优势**: 更好的独立性,更灵活的版本管理
- **示例**: `@skyroc/axios`, `@skyroc/utils`, `@skyroc/color`

## 🔄 迁移检查清单

从 `@skyroc/core-types` → `@core/types`:

- [x] 移动包目录到 `packages/@core/types/`
- [ ] 更新 `package.json` 中的包名
- [ ] 更新 workspace 配置
- [ ] 更新所有依赖此包的引用
- [ ] 更新 tsconfig 中的 types 引用
- [ ] 更新文档

---

**最后更新**: 2026-01-25
