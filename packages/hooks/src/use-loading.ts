import { useBoolean } from 'ahooks';

/**
 * Loading state hook
 *
 * @param initValue - initial loading state, defaults to false
 */
export default function useLoading(initValue = false) {
  const [loading, { setFalse: endLoading, setTrue: startLoading }] = useBoolean(initValue);

  return {
    endLoading,
    loading,
    startLoading
  };
}
