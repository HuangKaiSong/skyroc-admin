import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { DEFAULT_MUTATION_CONFIG, DEFAULT_QUERY_CONFIG } from './defaults';

export interface CreateQueryClientOptions {
  /** 全局错误回调（query + mutation 共用） */
  onError?: (error: unknown) => void;
}

/** 创建平台无关的 QueryClient 实例 */
export function createQueryClient(options: CreateQueryClientOptions = {}) {
  const { onError } = options;

  return new QueryClient({
    defaultOptions: {
      mutations: DEFAULT_MUTATION_CONFIG,
      queries: DEFAULT_QUERY_CONFIG
    },
    mutationCache: new MutationCache({
      onError
    }),
    queryCache: new QueryCache({
      onError
    })
  });
}
