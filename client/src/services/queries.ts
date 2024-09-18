import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getProduct,
  getProducts,
  getProjects,
  getTodo,
  getTodosIds,
} from './api';
import { IProduct } from '../types';

export function useTodosIds() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodosIds,
    refetchOnWindowFocus: false,
  });
}

export function useTodos(ids: (number | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ['todo', { id }],
        queryFn: () => getTodo(id!),
      };
    }),
  });
}

export function useProjects({ page, limit }: { page: number; limit: number }) {
  return useQuery({
    queryKey: ['projects', { page, limit }],
    queryFn: () => getProjects({ page, limit }),
    placeholderData: keepPreviousData,
  });
}

export function useProducts() {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }

      return firstPageParam - 1;
    },
  });
}

export function useProduct(id: number | null) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProduct(id!),
    enabled: !!id,
    placeholderData: () => {
      const cachedProducts = (
        queryClient.getQueryData(['products']) as {
          pages: IProduct[] | undefined;
        }
      )?.pages?.flat(2);

      if (cachedProducts) {
        return cachedProducts.find((item) => item.id === id);
      }
    },
  });
}
