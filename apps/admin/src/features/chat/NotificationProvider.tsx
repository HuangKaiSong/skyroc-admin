import type { ReactNode } from 'react';

import { useNotification } from './use-notification';
import { NotificationContext } from './NotificationContext';

interface NotificationProviderProps {
  /** 通知上下文内容 */
  children: ReactNode;
}

/** 通知 Provider - 全局管理通知状态 */
export const NotificationProvider = (props: NotificationProviderProps) => {
  const { children } = props;

  const notification = useNotification();

  return <NotificationContext.Provider value={notification}>{children}</NotificationContext.Provider>;
};
