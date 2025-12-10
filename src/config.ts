import type { WatermarkProps } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { HookAPI as ModalHookAPI } from 'antd/es/modal/useModal';
import type { NotificationInstance } from 'antd/es/notification/interface';

const _ui = {
  message: null as MessageInstance | null,
  modal: null as ModalHookAPI | null,
  notification: null as NotificationInstance | null
};

export function initAntdProvider(message: MessageInstance, modal: ModalHookAPI, notification: NotificationInstance) {
  _ui.message = message;
  _ui.modal = modal;
  _ui.notification = notification;
}

function createConfig() {
  return {
    // ======Lang Config======
    /** - 默认语言配置 */
    defaultLang: 'zh-CN',
    /** - 默认语言选项 */
    get defaultLangOptions(): I18n.LangOption[] {
      return [
        {
          key: 'zh-CN',
          label: '中文'
        },
        {
          key: 'en-US',
          label: 'English'
        }
      ];
    },

    // ======Antd UI Config======
    /** - antd 消息实例 */
    get message(): MessageInstance {
      if (!_ui.message) {
        console.error('message is not initialized, please call AntdContextHolder component first');
        throw new Error('message is not initialized');
      }
      return _ui.message;
    },
    /** - antd 模态框实例 */
    get modal(): ModalHookAPI {
      if (!_ui.modal) {
        console.error('modal is not initialized, please call AntdContextHolder component first');
        throw new Error('modal is not initialized');
      }
      return _ui.modal;
    },
    /** - antd 通知实例 */
    get notification(): NotificationInstance {
      if (!_ui.notification) {
        console.error('notification is not initialized, please call AntdContextHolder component first');
        throw new Error('notification is not initialized');
      }
      return _ui.notification;
    },
    /** - antd 水印配置 */
    watermarkConfig: {
      font: {
        fontSize: 16
      },
      height: 128,
      offset: [12, 60],
      rotate: -15,
      width: 240,
      zIndex: 9999
    } satisfies WatermarkProps,
    /** - antd 水印文本 */
    watermarkText: 'SkyrocAdmin'
  } as const;
}

export const globalConfig = createConfig();
