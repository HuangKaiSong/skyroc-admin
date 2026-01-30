import type { IStorage, StorageOptions } from './types';

/**
 * Get the native storage object
 */
function getNativeStorage(type: StorageOptions['type']): Storage {
  if (type === 'session') {
    return window.sessionStorage;
  }

  return window.localStorage;
}

/**
 * Create a storage instance
 */
export function createStorage(options: StorageOptions = { type: 'local' }): IStorage {
  const { type, prefix = '' } = options;
  const nativeStorage = getNativeStorage(type);

  /**
   * Get the full key with prefix
   */
  function getFullKey(key: string): string {
    return prefix ? `${prefix}:${key}` : key;
  }

  return {
    /**
     * Get a value from storage
     */
    get<T>(key: string): T | null {
      try {
        const fullKey = getFullKey(key);
        const item = nativeStorage.getItem(fullKey);

        if (item === null) {
          return null;
        }

        return JSON.parse(item) as T;
      } catch {
        return null;
      }
    },

    /**
     * Set a value in storage
     */
    set<T>(key: string, value: T): void {
      try {
        const fullKey = getFullKey(key);
        const serialized = JSON.stringify(value);
        nativeStorage.setItem(fullKey, serialized);
      } catch (error) {
        console.error(`Failed to set ${key} in ${type}Storage:`, error);
      }
    },

    /**
     * Remove a value from storage
     */
    remove(key: string): void {
      try {
        const fullKey = getFullKey(key);
        nativeStorage.removeItem(fullKey);
      } catch (error) {
        console.error(`Failed to remove ${key} from ${type}Storage:`, error);
      }
    },

    /**
     * Clear all values from storage
     */
    clear(): void {
      try {
        nativeStorage.clear();
      } catch (error) {
        console.error(`Failed to clear ${type}Storage:`, error);
      }
    },

    /**
     * Check if a key exists in storage
     */
    has(key: string): boolean {
      try {
        const fullKey = getFullKey(key);
        return nativeStorage.getItem(fullKey) !== null;
      } catch {
        return false;
      }
    }
  };
}

/**
 * Default storage instance using localStorage
 */
export const storage = createStorage({ type: 'local' });

/**
 * Session storage instance
 */
export const sessionStorage = createStorage({ type: 'session' });
