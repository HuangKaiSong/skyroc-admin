// ───────────────────────────────────────────────
// Re-exports from `jotai` core
// Letting consumers import everything from `@skyroc/core-state`
// avoids them depending on `jotai` directly (which is now a peer dep).
// ───────────────────────────────────────────────
export {
  atom,
  createStore,
  useAtom,
  useAtomValue,
  useSetAtom,
  useStore
} from 'jotai';
export type {
  Atom,
  Getter,
  PrimitiveAtom,
  Setter,
  WritableAtom
} from 'jotai';

// ───────────────────────────────────────────────
// Re-exports from `jotai/utils`
// ───────────────────────────────────────────────
export {
  atomFamily,
  atomWithDefault,
  atomWithObservable,
  atomWithReducer,
  atomWithReset,
  loadable,
  RESET,
  selectAtom,
  splitAtom,
  unwrap,
  useHydrateAtoms,
  useResetAtom
} from 'jotai/utils';

// ───────────────────────────────────────────────
// Package-local exports
// ───────────────────────────────────────────────

// Provider
export { JotaiProvider } from './provider/JotaiProvider';
export type { JotaiProviderProps } from './provider/JotaiProvider';

// Store
export { getAtomValue, globalStore, setAtomValue, updateAtomValue } from './store/global';

// Utils
export { atomWithPartial } from './utils/atom-with-partial';
export type { PartialUpdater } from './utils/atom-with-partial';
export { createAtomWithStorage } from './utils/atom-with-storage';
export type { CreateAtomWithStorageOptions } from './utils/atom-with-storage';
export { __clearStorageRegistry, getStorage, hasStorage, registerStorage, unregisterStorage } from './utils/storage-registry';

// Types
export type { AtomStorage } from './types';
