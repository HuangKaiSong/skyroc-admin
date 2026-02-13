import type { RequestAdapter } from '@skyroc/service';

import { setAuth } from '@/features/auth/use-auth';
import { router } from '@/features/router';
import { $t } from '@/locales';
import { localStg } from '@/utils/storage';

import { fetchRefreshToken } from './api';

/**
 * Antd 平台适配器
 *
 * 将 antd / jotai / tanstack-router 等平台依赖注入到 @skyroc/service，
 * 使核心请求逻辑保持平台无关。
 */
export const antdAdapter: RequestAdapter = {
  getCurrentPath() {
    return router.state.location.href;
  },

  getRefreshToken() {
    return localStg.get('refreshToken') || null;
  },

  getToken() {
    return localStg.get('token') || null;
  },

  redirectToLogin(redirectPath?: string) {
    router.navigate({ search: { redirect: redirectPath }, to: '/login-out' });
  },

  resetAuth() {
    localStg.remove('token');
    localStg.remove('refreshToken');
  },

  setAuth(tokens) {
    setAuth({ refreshToken: tokens.refreshToken, token: tokens.token });
  },

  showErrorMessage(msg: string, onClose?: () => void) {
    if (onClose) {
      showErrorMessage({ content: msg, onClose });
    } else {
      showErrorMessage(msg);
    }
  },

  showErrorModal(options) {
    showErrorModal({
      content: options.content,
      keyboard: false,
      maskClosable: options.maskClosable ?? false,
      okText: $t('common.confirm'),
      onCancel() {
        options.onConfirm();
      },
      onOk() {
        options.onConfirm();
      },
      title: options.title
    });
  },

  t(key: string) {
    return $t(key);
  },

  async fetchRefreshToken(refreshToken: string) {
    const data = await fetchRefreshToken(refreshToken);
    return { refreshToken: data.refreshToken, token: data.token };
  }
};
