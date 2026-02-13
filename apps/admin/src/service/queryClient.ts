import { createQueryClient } from '../../../../packages/@core/service/src/query';

function handleError(error: unknown) {
  if (import.meta.env.DEV) {
    console.error('Query/Mutation error:', error);
  }
}

export const queryClient = createQueryClient({
  mutationCache: { onError: handleError },
  queryCache: { onError: handleError }
});
