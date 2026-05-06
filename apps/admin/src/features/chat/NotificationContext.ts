import { createContext } from 'react';

import type { useNotification } from './use-notification';

type NotificationContextType = ReturnType<typeof useNotification>;

export const NotificationContext = createContext<NotificationContextType | null>(null);
