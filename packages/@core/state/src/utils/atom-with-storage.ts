import { atomWithStorage as jotaiAtomWithStorage } from 'jotai/utils';
import type { AtomStorage } from '../types';
import { getStorage } from './storage-registry';

/**
 * Create a persistent atom
 *
 * Resolves storage by name from the registry (default: 'local'). Pass `options.storage` directly to bypass the
 * registry.
 *
 * @example
 *   ```ts
 *   // Uses registered 'local' storage (default)
 *   const themeAtom = createAtomWithStorage('theme', { mode: 'light' });
 *
 *   // Uses registered 'session' storage
 *   const tabAtom = createAtomWithStorage('tab', 'home', { storageName: 'session' });
 *
 *   // Bypass registry with a direct storage adapter
 *   const customAtom = createAtomWithStorage('key', val, { storage: myAdapter });
 *   ```
 */
export function createAtomWithStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    /** Registry name to resolve storage (default: 'local') */
    storageName?: string;
    /** Direct storage adapter — bypasses registry when provided */
    storage?: AtomStorage;
    /** Custom serializer */
    serialize?: (value: T) => string;
    /** Custom deserializer */
    deserialize?: (str: string) => T;
  }
) {
  const storageImpl = options?.storage ?? getStorage(options?.storageName ?? 'local');

  return jotaiAtomWithStorage<T>(
    key,
    initialValue,
    {
      getItem: (keyToGet, initialValueToGet) => {
        const value = storageImpl.getItem(keyToGet);
        if (value === null || value === undefined) {
          return initialValueToGet;
        }
        if (options?.deserialize) {
          return options.deserialize(String(value));
        }
        return value as T;
      },
      setItem: (keyToSet, value) => {
        if (options?.serialize) {
          storageImpl.setItem(keyToSet, options.serialize(value));
        } else {
          storageImpl.setItem(keyToSet, value);
        }
      },
      removeItem: keyToRemove => storageImpl.removeItem(keyToRemove)
    },
    { getOnInit: true }
  );
}
