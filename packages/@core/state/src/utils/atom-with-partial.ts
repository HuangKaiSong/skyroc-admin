import { atom } from 'jotai';
import type { WritableAtom } from 'jotai';

/**
 * Create an atom that supports partial updates
 *
 * Encapsulates the common pattern of merging partial state into existing state.
 *
 * @example
 *   ```ts
 *   const adminStateAtom = atomWithPartial({ siderCollapse: false, mixSiderFixed: false });
 *
 *   // In component
 *   const [state, setState] = useAtom(adminStateAtom);
 *   setState({ siderCollapse: true }); // only updates siderCollapse
 *   ```
 */
export function atomWithPartial<T extends object>(initialValue: T): WritableAtom<T, [Partial<T>], void> {
  const baseAtom = atom(initialValue);

  return atom(
    get => get(baseAtom),
    (get, set, update: Partial<T>) => {
      set(baseAtom, { ...get(baseAtom), ...update });
    }
  );
}
