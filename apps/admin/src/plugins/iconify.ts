import { setupIconifyOffline as setupRuntimeIconifyOffline } from '@skyroc/web-admin-runtime';

/** Setup the iconify offline */
export function setupIconifyOffline() {
  setupRuntimeIconifyOffline({
    apiUrl: import.meta.env.VITE_ICONIFY_URL
  });
}
