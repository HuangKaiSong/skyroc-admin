import { createContext } from 'react';
import type { GridContextValue } from './types';

/** Context for Grid to communicate layout config to GridItem children */
const GridContext = createContext<GridContextValue | undefined>(undefined);

export { GridContext };
