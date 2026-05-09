import { setupNProgress as setupRuntimeNProgress } from '@skyroc/web-admin-runtime';

import { initNProgress } from '@/config';

/** Setup plugin NProgress */
export function setupNProgress() {
  setupRuntimeNProgress({
    easing: 'ease',
    onReady: initNProgress,
    parent: '.root',
    speed: 500
  });
}
