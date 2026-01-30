import type { RESET } from 'jotai/utils';
import { atomWithReset } from 'jotai/utils';
import type { PrimitiveAtom } from 'jotai';

/**
 * Create a resettable atom
 *
 * Provides reset method to restore to initial value
 */
export function createAtomWithReset<T>(defaultValue: T): PrimitiveAtom<T | typeof RESET> {
  return atomWithReset(defaultValue);
}

/**
 * Re-export from jotai/utils
 */
export { atomWithReset };
