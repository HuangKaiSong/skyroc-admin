import type { ReactNode } from 'react';
import { portalStore } from './portal-store';
import type { PortalHandle } from './types';

/** 命令式挂载一个 ReactNode 到 PortalHost，返回控制句柄 */
function mountPortal(node: ReactNode): PortalHandle {
  const id = portalStore.mount(node);

  return {
    unmount() {
      portalStore.unmount(id);
    },
    update(newNode: ReactNode) {
      portalStore.update(id, newNode);
    }
  };
}

export { mountPortal };
