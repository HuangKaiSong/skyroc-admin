/**
 * Storage type
 */
export type StorageType = 'local' | 'session';

/**
 * Storage options
 */
export interface StorageOptions {
  /**
   * Storage type
   */
  type: StorageType;

  /**
   * Prefix for keys
   */
  prefix?: string;
}

/**
 * Storage interface
 */
export interface IStorage {
  /**
   * Get a value from storage
   */
  get<T>(key: string): T | null;

  /**
   * Set a value in storage
   */
  set<T>(key: string, value: T): void;

  /**
   * Remove a value from storage
   */
  remove(key: string): void;

  /**
   * Clear all values from storage
   */
  clear(): void;

  /**
   * Check if a key exists in storage
   */
  has(key: string): boolean;
}
