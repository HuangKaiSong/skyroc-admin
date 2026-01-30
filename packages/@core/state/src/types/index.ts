import type { Atom, WritableAtom } from 'jotai';

/**
 * Options for creating an atom with storage
 */
export interface AtomWithStorageOptions<T> {
  /** Storage key */
  key: string;
  /** Default value */
  defaultValue: T;
  /** Custom serializer */
  serialize?: (value: T) => string;
  /** Custom deserializer */
  deserialize?: (str: string) => T;
}

/**
 * Storage interface for atom persistence
 */
export interface AtomStorage {
  /** Get item from storage */
  getItem: (key: string) => unknown;
  /** Set item in storage */
  setItem: (key: string, value: unknown) => void;
  /** Remove item from storage */
  removeItem: (key: string) => void;
}

/**
 * Options for creating an atom with reset
 */
export interface AtomWithResetOptions<T> {
  /** Default value */
  defaultValue: T;
}

/**
 * Re-export Jotai types
 */
export type { Atom, WritableAtom, PrimitiveAtom } from 'jotai';
