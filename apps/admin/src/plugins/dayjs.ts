import { setupDayjs as setupRuntimeDayjs } from '@skyroc/web-admin-runtime';

import { setDayjsLocale } from '../locales/dayjs';

export function setupDayjs() {
  setupRuntimeDayjs({
    syncLocale: setDayjsLocale
  });
}
