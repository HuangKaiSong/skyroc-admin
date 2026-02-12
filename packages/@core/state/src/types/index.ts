/**
 * Storage interface for atom persistence
 *
 * Supports both sync and async implementations (e.g. React Native AsyncStorage)
 */
export interface AtomStorage {
  /** Get item from storage */
  getItem: (key: string) => unknown | Promise<unknown>;
  /** Set item in storage */
  setItem: (key: string, value: unknown) => void | Promise<void>;
  /** Remove item from storage */
  removeItem: (key: string) => void | Promise<void>;
}
