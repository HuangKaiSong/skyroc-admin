import { message } from 'antd';
import { nanoid } from 'nanoid';

import wechatStyleNotification from '@/assets/audio/wechat-style-notification.wav';

import type { NotificationConfig, NotificationItem } from './types';

// 通知音效 URL (使用 data URL 编码的简短提示音)
const NOTIFICATION_SOUND = new Audio(wechatStyleNotification);

/** 默认通知配置 */
const DEFAULT_CONFIG: NotificationConfig = {
  browserNotificationEnabled: true,
  doNotDisturb: false,
  maxNotifications: 99,
  soundEnabled: true
};

/** 通知管理 Hook */
export function useNotification() {
  // 通知列表
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // 通知配置
  const [config, setConfig] = useState<NotificationConfig>(DEFAULT_CONFIG);

  // 浏览器通知权限
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  // 未读数量
  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  // 检查浏览器通知权限
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // 请求浏览器通知权限
  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      message.warning('您的浏览器不支持桌面通知');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      return permission === 'granted';
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('请求通知权限失败:', error);
      return false;
    }
  }, []);

  // 检查是否在勿扰时间内
  const isDoNotDisturbTime = useCallback(() => {
    if (!config.doNotDisturb || !config.doNotDisturbTime) return false;

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const { end, start } = config.doNotDisturbTime;

    // 简单的时间比较，不考虑跨天情况
    return currentTime >= start && currentTime <= end;
  }, [config]);

  // 播放通知声音
  const playNotificationSound = useCallback(() => {
    if (!config.soundEnabled || isDoNotDisturbTime()) return;

    try {
      NOTIFICATION_SOUND.currentTime = 0;
      NOTIFICATION_SOUND.play().catch(err => {
        // eslint-disable-next-line no-console
        console.warn('播放通知声音失败:', err);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('播放通知声音失败:', error);
    }
  }, [config.soundEnabled, isDoNotDisturbTime]);

  // 显示浏览器通知
  const showBrowserNotification = useCallback(
    (notification: NotificationItem) => {
      if (!config.browserNotificationEnabled || isDoNotDisturbTime()) return;
      if (notificationPermission !== 'granted') return;
      if (notification.silent || notification.showBrowserNotification === false) return;

      try {
        const browserNotification = new Notification(notification.title, {
          body: notification.content
        });

        browserNotification.addEventListener('click', () => {
          window.focus();
          if (notification.link) {
            window.location.href = notification.link;
          }
          browserNotification.close();
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('显示浏览器通知失败:', error);
      }
    },
    [config.browserNotificationEnabled, config.soundEnabled, isDoNotDisturbTime, notificationPermission]
  );

  // 添加通知
  const addNotification = useCallback(
    (
      notification: Omit<NotificationItem, 'id' | 'read' | 'timestamp'> &
        Partial<Pick<NotificationItem, 'id' | 'read' | 'timestamp'>>
    ) => {
      const newNotification: NotificationItem = {
        id: notification.id || nanoid(),
        read: notification.read || false,
        timestamp: notification.timestamp || Date.now(),
        ...notification
      };

      setNotifications(prev => {
        // 限制最大通知数量
        const updated = [newNotification, ...prev];
        if (updated.length > config.maxNotifications) {
          return updated.slice(0, config.maxNotifications);
        }
        return updated;
      });

      // 播放声音
      if (!newNotification.silent) {
        playNotificationSound();
      }

      // 显示浏览器通知
      if (newNotification.showBrowserNotification !== false) {
        showBrowserNotification(newNotification);
      }

      return newNotification.id;
    },
    [config.maxNotifications, playNotificationSound, showBrowserNotification]
  );

  // 标记为已读
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  // 标记所有为已读
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  // 删除通知
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // 清空所有通知
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // 清空已读通知
  const clearReadNotifications = useCallback(() => {
    setNotifications(prev => prev.filter(n => !n.read));
  }, []);

  // 更新配置
  const updateConfig = useCallback((updates: Partial<NotificationConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  // 快捷方法：添加不同类型的通知
  const addInfoNotification = useCallback(
    (title: string, content: string, options?: Partial<NotificationItem>) => {
      return addNotification({ content, title, type: 'info', ...options });
    },
    [addNotification]
  );

  const addSuccessNotification = useCallback(
    (title: string, content: string, options?: Partial<NotificationItem>) => {
      return addNotification({ content, title, type: 'success', ...options });
    },
    [addNotification]
  );

  const addWarningNotification = useCallback(
    (title: string, content: string, options?: Partial<NotificationItem>) => {
      return addNotification({ content, title, type: 'warning', ...options });
    },
    [addNotification]
  );

  const addErrorNotification = useCallback(
    (title: string, content: string, options?: Partial<NotificationItem>) => {
      return addNotification({ content, title, type: 'error', ...options });
    },
    [addNotification]
  );

  const addMessageNotification = useCallback(
    (title: string, content: string, options?: Partial<NotificationItem>) => {
      return addNotification({ content, title, type: 'message', ...options });
    },
    [addNotification]
  );

  return {
    // 状态
    config,
    notifications,
    notificationPermission,
    unreadCount,

    // 方法
    addErrorNotification,
    addInfoNotification,
    addMessageNotification,
    addNotification,
    addSuccessNotification,
    addWarningNotification,
    clearAllNotifications,
    clearReadNotifications,
    markAllAsRead,
    markAsRead,
    removeNotification,
    requestNotificationPermission,
    updateConfig
  };
}
