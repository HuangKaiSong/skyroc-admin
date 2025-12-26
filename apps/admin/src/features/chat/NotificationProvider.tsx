import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

import { useNotification } from './use-notification';

type NotificationContextType = ReturnType<typeof useNotification>;

const NotificationContext = createContext<NotificationContextType | null>(null);

interface Props {
  children: ReactNode;
}

/** 通知 Provider - 全局管理通知状态 */
export function NotificationProvider({ children }: Props) {
  const notification = useNotification();

  return <NotificationContext.Provider value={notification}>{children}</NotificationContext.Provider>;
}

/** 使用通知上下文 */
export function useNotificationContext() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationProvider');
  }

  return context;
}
