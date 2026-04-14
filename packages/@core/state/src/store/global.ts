import { createStore } from 'jotai';
import type { Atom, WritableAtom } from 'jotai';

/**
 * Global Jotai store
 *
 * Purpose: 1. Access/modify atoms in non-hook environments (e.g., axios interceptors) 2. Server-side rendering (SSR) 3.
 * Testing environments
 *
 * @see https://jotai.org/docs/core/store
 */
export const globalStore = createStore();

/** Get atom value in non-hook environments */
export function getAtomValue<T>(atom: Atom<T>): T {
  return globalStore.get(atom);
}

/** Set atom value in non-hook environments */
export function setAtomValue<T>(atom: WritableAtom<T, [T], void>, value: T): void {
  globalStore.set(atom, value);
}

/** Update atom value in non-hook environments */
export function updateAtomValue<T>(atom: WritableAtom<T, [T], void>, updater: (prev: T) => T): void {
  const currentValue = globalStore.get(atom);
  globalStore.set(atom, updater(currentValue));
}
