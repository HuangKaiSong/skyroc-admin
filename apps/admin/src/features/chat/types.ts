/** 通知类型 */
export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'message';

/** 通知优先级 */
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

/** 通知项 */
export interface NotificationItem {
  /** 内容 */
  content: string;
  /** 图标 */
  icon?: string;
  /** 唯一ID */
  id: string;
  /** 点击跳转路径 */
  link?: string;
  /** 额外数据 */
  meta?: Record<string, any>;
  /** 优先级 */
  priority?: NotificationPriority;
  /** 是否已读 */
  read: boolean;
  /** 是否播放声音 */
  silent?: boolean;
  /** 是否显示浏览器通知 */
  showBrowserNotification?: boolean;
  /** 创建时间 */
  timestamp: number;
  /** 标题 */
  title: string;
  /** 通知类型 */
  type: NotificationType;
}

/** 通知配置 */
export interface NotificationConfig {
  /** 是否启用声音 */
  soundEnabled: boolean;
  /** 是否启用浏览器通知 */
  browserNotificationEnabled: boolean;
  /** 勿扰模式 */
  doNotDisturb: boolean;
  /** 勿扰模式时间范围 */
  doNotDisturbTime?: {
    start: string; // HH:mm
    end: string; // HH:mm
  };
  /** 最大通知数量 */
  maxNotifications: number;
}

