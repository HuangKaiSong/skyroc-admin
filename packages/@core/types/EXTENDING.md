# 如何扩展全局类型

本文档说明如何在具体项目中扩展 `@core/types` 提供的全局类型定义。

## 核心概念:TypeScript 声明合并

TypeScript 允许在不同文件中对同一个 namespace 或 interface 进行**声明合并**。这意味着:

- 基础类型在 `@core/types` 中定义
- 项目特定的扩展在具体项目(如 `apps/admin`)中添加
- TypeScript 自动合并这些声明,无需手动导入

## 架构设计

```
packages/core-types/          ← 基础类型(跨项目共享)
  └── src/app/storage.d.ts

apps/admin/                   ← Admin 项目特定扩展
  └── src/types/storage.d.ts

apps/mobile/                  ← Mobile 项目特定扩展
  └── src/types/storage.d.ts
```

## 实战示例:扩展 StorageType

### 1. 基础类型定义 (`packages/core-types/src/app/storage.d.ts`)

```typescript
declare global {
  namespace StorageType {
    interface Session {
      /** The theme color */
      themeColor: string;
    }

    interface Local {
      /** The token */
      token: string;
      /** The refresh token */
      refreshToken: string;
      /** The theme color */
      themeColor: string;
    }
  }
}

export {};
```

### 2. Admin 项目扩展 (`apps/admin/src/types/storage.d.ts`)

```typescript
/**
 * Admin app specific storage type extensions
 *
 * Base types are defined in: packages/core-types/src/app/storage.d.ts
 */
declare global {
  namespace StorageType {
    /** Extend Session with admin-specific fields */
    interface Session {
      /** Admin user session ID (admin-specific) */
      adminSessionId?: string;
      /** Current workspace ID (admin-specific) */
      workspaceId?: string;
    }

    /** Extend Local with admin-specific fields */
    interface Local {
      /** Admin dashboard layout (admin-specific) */
      dashboardLayout?: 'grid' | 'list';
      /** Recently viewed items (admin-specific) */
      recentlyViewed?: string[];
    }
  }
}

export {};
```

### 3. 最终合并结果

在 `apps/admin` 项目中,`StorageType.Local` 包含:

```typescript
// 来自 core-types (基础)
token: string;
refreshToken: string;
themeColor: string;

// 来自 apps/admin (扩展)
dashboardLayout?: 'grid' | 'list';
recentlyViewed?: string[];
```

## 关键要点

### ✅ DO - 正确做法

1. **基础类型使用 `declare global`**

   ```typescript
   declare global {
     namespace StorageType {
       interface Local { ... }
     }
   }
   export {};
   ```

2. **项目扩展也使用 `declare global`**

   ```typescript
   declare global {
     namespace StorageType {
       interface Local {
         // 只添加项目特定字段
       }
     }
   }
   export {};
   ```

3. **添加清晰的注释说明**
   - 标注哪些是基础字段
   - 标注哪些是项目特定字段
   - 指明基础类型的文件位置

### ❌ DON'T - 错误做法

1. **不要在项目扩展中重复基础字段**

   ```typescript
   // ❌ 错误:重复了 core-types 中已有的字段
   interface Local {
     token: string; // 已在 core-types 中定义
     dashboardLayout?: string; // ✅ 项目特定字段
   }
   ```

2. **不要使用 `export type`(会破坏全局声明)**

   ```typescript
   // ❌ 错误:导出为模块类型,无法全局访问
   declare namespace StorageType { ... }
   export type { StorageType };
   ```

3. **不要省略 `export {}`**
   ```typescript
   // ❌ 错误:文件被视为脚本而非模块
   declare global {
     namespace StorageType { ... }
   }
   // 缺少 export {};
   ```

## 适用场景

这种模式适合:

- ✅ **跨项目共享**的基础类型(Storage, Theme, I18n 等)
- ✅ **项目特定**的扩展字段(admin 的 workspace, mobile 的设备信息等)
- ✅ **多租户/多模块**架构

不适合:

- ❌ 项目完全独立,无类型共享需求
- ❌ 需要严格的类型隔离(此时应使用显式导入)

## 其他可扩展的 Namespace

项目中所有以 `declare global` 声明的 namespace 都支持这种扩展模式:

- `Common` - 通用类型
- `StorageType` - 存储类型
- `I18n` - 国际化类型
- `Theme` - 主题类型
- `App` - 应用类型
- `UnionKey` - 联合键类型

## TypeScript 配置要求

确保 `tsconfig.json` 包含类型引用:

```json
{
  "compilerOptions": {
    "types": ["@core/types/types"]
  }
}
```

这样 TypeScript 会自动加载 core-types 的全局声明并与项目扩展合并。
