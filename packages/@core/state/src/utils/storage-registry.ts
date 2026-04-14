import type { AtomStorage } from '../types';

/**
 * Storage registry
 *
 * Decouples atom persistence from concrete storage implementations. App layer registers adapters (e.g. 'local',
 * 'session') at startup; library code resolves them by name at runtime.
 */
const registry = new Map<string, AtomStorage>();

/**
 * Register a named storage adapter
 *
 * @example
 *   ```ts
 *   registerStorage('local', {
 *     getItem: key => JSON.parse(localStorage.getItem(key) ?? 'null'),
 *     setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
 *     removeItem: key => localStorage.removeItem(key)
 *   });
 *   ```
 */
export function registerStorage(name: string, storage: AtomStorage): void {
  registry.set(name, storage);
}

/**
 * Retrieve a registered storage adapter by name
 *
 * @throws {Error} If the storage name has not been registered
 */
export function getStorage(name: string): AtomStorage {
  const storage = registry.get(name);
  if (!storage) {
    throw new Error(
      `[core-state] Storage "${name}" is not registered. Call registerStorage("${name}", adapter) before use.`
    );
  }
  return storage;
}
