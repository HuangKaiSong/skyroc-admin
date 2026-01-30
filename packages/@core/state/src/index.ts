// Provider
export { JotaiProvider } from './provider/JotaiProvider';
export type { JotaiProviderProps } from './provider/JotaiProvider';

// Store
export { globalStore, getAtomValue, setAtomValue, updateAtomValue } from './store/global';

// Utils
export { createAtomWithStorage, createAtomWithSessionStorage } from './utils/atom-with-storage';
export { createAtomWithReset, RESET, atomWithReset } from './utils/atom-with-reset';

// Types
export * from './types';

// Re-export from jotai
export { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
export {
  atomWithDefault,
  atomWithObservable,
  atomWithReset,
  atomWithStorage,
  freezeAtom,
  splitAtom
} from 'jotai/utils';
