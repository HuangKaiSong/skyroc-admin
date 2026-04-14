import { useStore } from '@skyroc/hooks';
import { View } from 'react-native';
import { Toast } from './Toast';
import type { ToastEntry } from './toast-manager';
import { toastManager } from './toast-manager';
import { toastPositionVariants } from './toast-variants';

/** Toast 内部渲染逻辑，通过 Portal 自动挂载 */
const ToastRenderer = () => {
  const entries = useStore(toastManager);

  function handleRemove(entry: ToastEntry) {
    toastManager.remove(entry.id);
    entry.onClose?.();
  }

  if (entries.length === 0) return null;

  return (
    <View className="absolute inset-0 z-50" pointerEvents="box-none">
      {entries.map(entry => {
        const hasForbid = entry.forbidClick ?? false;

        return (
          <View
            key={entry.id}
            className={toastPositionVariants({ position: entry.position ?? 'middle' })}
            pointerEvents={hasForbid ? 'auto' : 'box-none'}
          >
            <Toast {...entry} show onUpdateShow={() => handleRemove(entry)} />
          </View>
        );
      })}
    </View>
  );
};

export { ToastRenderer };
