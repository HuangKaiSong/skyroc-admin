import type { RequestAdapter } from '@skyroc/service';

import { setAuth } from '@/features/auth/use-auth';
import { router } from '@/features/router';
import { $t } from '@/locales';
import { localStg } from '@/utils/storage';

function showRequestErrorMessage(msg: string, onClose?: () => void) {
  if (onClose) {
    showErrorMessage({ content: msg, onClose });
    return;
  }

  showErrorMessage(msg);
}

function showRequestErrorModal(options: Parameters<RequestAdapter['showErrorModal']>[0]) {
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
}

async function fetchAdminRefreshToken(refreshToken: string) {
  const { fetchRefreshToken } = await import('./api/auth/api');

  return fetchRefreshToken(refreshToken);
}

export const antdAdapter: RequestAdapter = {
  fetchRefreshToken: fetchAdminRefreshToken,
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
  showErrorMessage: showRequestErrorMessage,
  showErrorModal: showRequestErrorModal,
  t(key: string) {
    return $t(key);
  }
};
