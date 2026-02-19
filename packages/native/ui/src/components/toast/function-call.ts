import { toastManager } from './toast-manager';
import type { ToastInstance, ToastOptions, ToastType } from './types';

/** 是否允许同时显示多个 Toast */
let allowMultiple = false;

/** 全局默认配置 */
let defaultOptions: ToastOptions = {};

/** 按类型的默认配置 */
const defaultOptionsMap = new Map<ToastType, ToastOptions>();

function parseOptions(options: ToastOptions | string): ToastOptions {
  if (typeof options === 'string') {
    return { message: options };
  }
  return options;
}

/** 显示 Toast */
function showToast(options: ToastOptions | string): ToastInstance {
  const parsed = parseOptions(options);
  const type = parsed.type ?? 'text';
  const typeDefaults = defaultOptionsMap.get(type) ?? {};
  const merged: ToastOptions = { ...defaultOptions, ...typeDefaults, ...parsed };

  let id: string;
  if (allowMultiple) {
    id = toastManager.add(merged);
  } else {
    id = toastManager.solo(merged);
  }

  return {
    close() {
      toastManager.remove(id);
    },
    update(newOptions: ToastOptions) {
      toastManager.update(id, newOptions);
    }
  };
}

/** 显示 Loading Toast */
function showLoadingToast(options: ToastOptions | string): ToastInstance {
  const parsed = parseOptions(options);
  return showToast({ duration: 0, ...parsed, type: 'loading' });
}

/** 显示成功 Toast */
function showSuccessToast(options: ToastOptions | string): ToastInstance {
  const parsed = parseOptions(options);
  return showToast({ ...parsed, type: 'success' });
}

/** 显示失败 Toast */
function showFailToast(options: ToastOptions | string): ToastInstance {
  const parsed = parseOptions(options);
  return showToast({ ...parsed, type: 'fail' });
}

/** 关闭 Toast */
function closeToast() {
  toastManager.closeAll();
}

/** 设置全局默认配置或按类型设置默认配置 */
function setToastDefaultOptions(options: ToastOptions): void;
function setToastDefaultOptions(type: ToastType, options: ToastOptions): void;
function setToastDefaultOptions(typeOrOptions: ToastOptions | ToastType, options?: ToastOptions) {
  if (typeof typeOrOptions === 'string') {
    defaultOptionsMap.set(typeOrOptions, options!);
  } else {
    defaultOptions = typeOrOptions;
  }
}

/** 重置默认配置 */
function resetToastDefaultOptions(type?: ToastType) {
  if (type) {
    defaultOptionsMap.delete(type);
  } else {
    defaultOptions = {};
    defaultOptionsMap.clear();
  }
}

/** 允许同时显示多个 Toast */
function allowMultipleToast(value = true) {
  allowMultiple = value;
}

export {
  allowMultipleToast,
  closeToast,
  resetToastDefaultOptions,
  setToastDefaultOptions,
  showFailToast,
  showLoadingToast,
  showSuccessToast,
  showToast
};
