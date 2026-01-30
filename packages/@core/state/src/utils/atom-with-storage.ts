import { atomWithStorage as jotaiAtomWithStorage } from 'jotai/utils';
import { storage } from '@skyroc/storage';
import type { AtomStorage } from '../types';

/**
 * Default storage implementation using @skyroc/storage
 */
const defaultStorage: AtomStorage = {
  getItem: key => storage.get(key),
  setItem: (key, value) => storage.set(key, value),
  removeItem: key => storage.remove(key)
};

/**
 * Create a persistent atom
 *
 * Automatically syncs state to storage
 */
export function createAtomWithStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    /** Custom storage implementation */
    storage?: AtomStorage;
    /** Custom serializer */
    serialize?: (value: T) => string;
    /** Custom deserializer */
    deserialize?: (str: string) => T;
  }
) {
  const storageImpl = options?.storage ?? defaultStorage;

  return jotaiAtomWithStorage<T>(
    key,
    initialValue,
    {
      getItem: key => {
        const value = storageImpl.getItem(key);
        if (options?.deserialize && value !== null) {
          return options.deserialize(String(value));
        }
        return value;
      },
      setItem: (key, value) => {
        if (options?.serialize) {
          storageImpl.setItem(key, options.serialize(value));
        } else {
          storageImpl.setItem(key, value);
        }
      },
      removeItem: key => storageImpl.removeItem(key)
    },
    { getOnInit: true }
  );
}

/**
 * Create a persistent atom using sessionStorage instead of localStorage
 */
export function createAtomWithSessionStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    /** Custom serializer */
    serialize?: (value: T) => string;
    /** Custom deserializer */
    deserialize?: (str: string) => T;
  }
) {
  const sessionStorageStorage: AtomStorage = {
    getItem: key => {
      try {
        const item = window.sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch {
        return null;
      }
    },
    setItem: (key, value) => {
      try {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      } catch {
        // Ignore errors
      }
    },
    removeItem: key => {
      try {
        window.sessionStorage.removeItem(key);
      } catch {
        // Ignore errors
      }
    }
  };

  return createAtomWithStorage(key, initialValue, {
    ...options,
    storage: sessionStorageStorage
  });
}
