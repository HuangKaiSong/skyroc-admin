import { createQueryClient } from '../../../../packages/@core/service/src/query';

export const queryClient = createQueryClient({
  onError: (error) => {
    if (import.meta.env.DEV) {
      console.error('Query/Mutation error:', error);
    }
  }
});
