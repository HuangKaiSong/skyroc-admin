# @skyroc/core-state

Jotai 状态管理封装 — 跨平台、存储解耦、非 Hook 可用。

## Architecture

```
App Layer                          @core/state
─────────────                      ──────────────────────
registerStorage('local', ...)  ──► StorageRegistry (Map)
registerStorage('session', ...)    │
                                   ▼
<JotaiProvider>                    globalStore (createStore)
  └─ <Provider store={globalStore}>
                                   ▼
createAtomWithStorage(key, val) ─► getStorage('local') ─► jotaiAtomWithStorage
atomWithPartial(initialValue)  ─► atom (read) + atom (read/write, merge)
                                   ▼
getAtomValue / setAtomValue    ─► globalStore.get / globalStore.set
```

## Design Principles

1. **Storage Registry** — `registerStorage` / `getStorage` 解耦存储实现，`@core/state` 不依赖任何具体平台 API
2. **App-Layer Registration** — 应用层在入口注册 `'local'`、`'session'` 等适配器，库代码通过名称引用
3. **Escape Hatch** — `options.storage` 允许直传适配器，跳过 registry
4. **Non-Hook Access** — `globalStore` + `getAtomValue` / `setAtomValue` 用于 axios 拦截器等非组件场景

## Usage

### 1. Register Storage (app entry)

```ts
import { registerStorage } from '@skyroc/core-state';
import { storage } from '@skyroc/storage';

// localStorage adapter
registerStorage('local', {
  getItem: key => storage.get(key),
  setItem: (key, value) => storage.set(key, value),
  removeItem: key => storage.remove(key)
});

// sessionStorage adapter
registerStorage('session', {
  getItem: key => {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  },
  setItem: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
  removeItem: key => sessionStorage.removeItem(key)
});
```

### 2. Wrap with Provider

```tsx
import { JotaiProvider } from '@skyroc/core-state';

const App = () => (
  <JotaiProvider>
    <YourApp />
  </JotaiProvider>
);
```

### 3. Create Persistent Atom

```ts
import { createAtomWithStorage } from '@skyroc/core-state';

// defaults to storageName: 'local'
const themeAtom = createAtomWithStorage('theme', { mode: 'light' });

// use session storage
const tabAtom = createAtomWithStorage('activeTab', 'home', { storageName: 'session' });
```

### 4. Partial-Update Atom

```ts
import { atomWithPartial } from '@skyroc/core-state';

const uiAtom = atomWithPartial({ siderCollapse: false, mixSiderFixed: false });

// in component
const [ui, setUi] = useAtom(uiAtom);
setUi({ siderCollapse: true }); // only merges siderCollapse
```

### 5. Non-Hook Access

```ts
import { getAtomValue, setAtomValue } from '@skyroc/core-state';

// e.g. axios interceptor
const token = getAtomValue(authAtom);
setAtomValue(authAtom, { ...getAtomValue(authAtom), token: newToken });
```

## API

### Provider

| Export          | Description                       |
| --------------- | --------------------------------- |
| `JotaiProvider` | Provider 组件，内置 `globalStore` |

### Store

| Export                      | Description                 |
| --------------------------- | --------------------------- |
| `globalStore`               | 全局 Jotai store 实例       |
| `getAtomValue(atom)`        | 非 Hook 环境读取 atom       |
| `setAtomValue(atom, value)` | 非 Hook 环境写入 atom       |
| `updateAtomValue(atom, fn)` | 非 Hook 环境函数式更新 atom |

### Utils

| Export                                    | Description                          |
| ----------------------------------------- | ------------------------------------ |
| `createAtomWithStorage(key, init, opts?)` | 创建持久化 atom（registry 解析存储） |
| `atomWithPartial(init)`                   | 创建支持部分更新的 atom              |
| `registerStorage(name, adapter)`          | 注册命名存储适配器                   |
| `getStorage(name)`                        | 获取已注册的存储适配器               |

### Types

| Export        | Description                                            |
| ------------- | ------------------------------------------------------ |
| `AtomStorage` | 存储适配器接口（`getItem` / `setItem` / `removeItem`） |

## License

MIT
