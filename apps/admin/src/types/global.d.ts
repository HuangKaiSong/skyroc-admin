// oxlint-disable unicorn/require-module-specifiers
import type { MessageInstance } from 'antd/es/message/interface';

export {};

declare global {
  /** Whether current runtime is development mode */
  export const __DEV__: boolean;

  /** Build time of the project */
  export const BUILD_TIME: string;

  const IconAntDesignSettingOutlined: typeof import('~icons/ant-design/setting-outlined.tsx').default;
  const IconIcRoundDelete: typeof import('~icons/ic/round-delete.tsx').default;
  const IconIcRoundPlus: typeof import('~icons/ic/round-plus.tsx').default;
  const IconMdiDrag: typeof import('~icons/mdi/drag.tsx').default;
  const IconMdiRefresh: typeof import('~icons/mdi/refresh.tsx').default;

  interface Window {
    $message?: MessageInstance;
  }
}
