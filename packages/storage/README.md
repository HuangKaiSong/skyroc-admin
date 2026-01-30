# @skyroc/storage

Storage utility for localStorage and sessionStorage with TypeScript type safety.

## Features

- Generic storage methods (get, set, remove, clear)
- Support for localStorage and sessionStorage
- Type-safe access using StorageType types from @skyroc/types
- Error handling
- JSON serialization/deserialization

## Installation

```bash
pnpm add @skyroc/storage
```

## Usage

```typescript
import { storage } from '@skyroc/storage'

// Set a value
storage.set('lang', 'zh-CN')

// Get a value
const lang = storage.get('lang') // Returns 'zh-CN' | null

// Remove a value
storage.remove('lang')

// Clear all values
storage.clear()
```

## API

### storage

The main storage instance that uses localStorage by default.

### createStorage(type)

Create a storage instance with a specific storage type.

```typescript
import { createStorage } from '@skyroc/storage'

const sessionStorage = createStorage('session')
```

### Methods

- `get<T>(key: string): T | null` - Get a value from storage
- `set<T>(key: string, value: T): void` - Set a value in storage
- `remove(key: string): void` - Remove a value from storage
- `clear(): void` - Clear all values from storage
- `has(key: string): boolean` - Check if a key exists in storage
