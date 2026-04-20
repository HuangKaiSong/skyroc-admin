import { Provider } from 'jotai';
import type { PropsWithChildren } from 'react';
import { globalStore } from '../store/global';

export type JotaiProviderProps = PropsWithChildren;

/**
 * Jotai Provider component bound to the package-level `globalStore`.
 *
 * @example
 *   ```tsx
 *   function App() {
 *     return (
 *       <JotaiProvider>
 *         <YourApp />
 *       </JotaiProvider>
 *     );
 *   }
 *   ```
 */
export function JotaiProvider({ children }: JotaiProviderProps) {
  return <Provider store={globalStore}>{children}</Provider>;
}
