import { Provider } from 'jotai';
import type { PropsWithChildren } from 'react';
import { globalStore } from '../store/global';

export interface JotaiProviderProps extends PropsWithChildren {
  /**
   * Whether to enable DevTools
   *
   * @default process.env.NODE_ENV === 'development'
   */
  enableDevTools?: boolean;
}

/**
 * Jotai Provider component with optional DevTools
 *
 * @example
 *   ```tsx
 *   function App() {
 *     return (
 *       <JotaiProvider enableDevTools>
 *         <YourApp />
 *       </JotaiProvider>
 *     );
 *   }
 *   ```
 */
export function JotaiProvider({ children, enableDevTools = import.meta.env?.DEV ?? false }: JotaiProviderProps) {
  return (
    <Provider store={globalStore}>
      {enableDevTools && (
        <>
          {/*
           * DevTools should be imported dynamically in the app layer
           * to avoid build issues. This component is a placeholder
           * for the provider structure.
           */}
        </>
      )}
      {children}
    </Provider>
  );
}
