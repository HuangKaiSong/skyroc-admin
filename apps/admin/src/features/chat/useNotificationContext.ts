import { useContext } from 'react';

import { NotificationContext } from './NotificationContext';

/** 使用通知上下文 */
export function useNotificationContext() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationProvider');
  }

  return context;
}
