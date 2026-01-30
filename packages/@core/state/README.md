# @skyroc/core-state

Jotai 状态管理封装 - 跨平台支持 (Web + React Native).

## Features

- 全局 Jotai store
- 封装 JotaiProvider 组件
- 提供常用 atom 工具函数
- 支持非 Hook 环境使用

## Installation

```bash
pnpm add @skyroc/core-state
```

## Usage

### Basic Provider Setup

```tsx
import { JotaiProvider } from '@skyroc/core-state';

function App() {
  return (
    <JotaiProvider enableDevTools>
      <YourApp />
    </JotaiProvider>
  );
}
```

### Creating Atoms

```ts
import { atom } from '@skyroc/core-state';

const countAtom = atom(0);
const userAtom = atom({ name: '', age: 0 });
```

### Using Atoms in Components

```tsx
import { useAtom, useAtomValue, useSetAtom } from '@skyroc/core-state';

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const value = useAtomValue(countAtom);
  const setValue = useSetAtom(countAtom);
}
```

### Persistent Atom with Storage

```ts
import { createAtomWithStorage } from '@skyroc/core-state';

const themeAtom = createAtomWithStorage('theme', {
  mode: 'light',
  primaryColor: '#1890ff'
});
```

### Resettable Atom

```ts
import { createAtomWithReset, RESET, useAtom } from '@skyroc/core-state';

const counterAtom = createAtomWithReset(0);

function Counter() {
  const [count, setCount] = useAtom(counterAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={() => setCount(RESET)}>Reset</button>
    </div>
  );
}
```

### Non-Hook Environment (e.g., axios interceptors)

```ts
import { globalStore, getAtomValue } from '@skyroc/core-state';
import { authAtom } from '@skyroc/core-auth';

axios.interceptors.request.use((config) => {
  const authState = getAtomValue(authAtom);

  if (authState.token) {
    config.headers.Authorization = `Bearer ${authState.token}`;
  }

  return config;
});
```

## API

### Provider

- `JotaiProvider` - Provider component with optional DevTools support

### Store

- `globalStore` - Global Jotai store instance
- `getAtomValue(atom)` - Get atom value in non-hook environments
- `setAtomValue(atom, value)` - Set atom value in non-hook environments
- `updateAtomValue(atom, updater)` - Update atom value in non-hook environments

### Utils

- `createAtomWithStorage(key, initialValue, options?)` - Create persistent atom with localStorage
- `createAtomWithSessionStorage(key, initialValue, options?)` - Create persistent atom with sessionStorage
- `createAtomWithReset(defaultValue)` - Create resettable atom
- `RESET` - Symbol for resetting atoms

### Re-exported from Jotai

- `atom`, `useAtom`, `useAtomValue`, `useSetAtom`
- `atomWithDefault`, `atomWithObservable`, `atomWithReset`, `atomWithStorage`
- `freezeAtom`, `splitAtom`

## License

MIT
