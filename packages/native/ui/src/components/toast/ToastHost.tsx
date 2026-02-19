import { View } from 'react-native';
import { useStore } from '@skyroc/hooks';
import { Toast } from './Toast';
import type { ToastEntry } from './toast-manager';
import { toastManager } from './toast-manager';
import { toastPositionVariants } from './toast-variants';

/** Toast 宿主组件，挂载在应用根节点，负责渲染所有 Toast 实例 */
const ToastHost = () => {
  const entries = useStore(toastManager);

  function handleRemove(entry: ToastEntry) {
    toastManager.remove(entry.id);
    entry.onClose?.();
  }

  if (entries.length === 0) return null;

  return (
    <View
      className="absolute inset-0 z-50"
      pointerEvents="box-none"
    >
      {entries.map(entry => {
        const hasForbid = entry.forbidClick ?? false;

        return (
          <View
            key={entry.id}
            className={toastPositionVariants({ position: entry.position ?? 'middle' })}
            pointerEvents={hasForbid ? 'auto' : 'box-none'}
          >
            <Toast
              {...entry}
              show
              onUpdateShow={() => handleRemove(entry)}
            />
          </View>
        );
      })}
    </View>
  );
};

export { ToastHost };
